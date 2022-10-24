const TypeJob = require('../../models/typeJob');
const SubTypeJob = require('../../models/subTypeJob');
const Job = require('../../models/job');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');

exports.getTypeJobs = (req, res, next) => {
  res.render('typeJobs');
};

exports.postTypeJobs = (req, res, next) => {
  const { name, image, subtitle } = req.body;
  const newTypeJob = new TypeJob({
    name,
    image,
    subtitle,
    status: true,
  });
  newTypeJob.save().then((data) => {
    res.status(201).json({
      message: 'Created successfully',
      data,
    });
  });
};

// Sub Type Jobs
exports.getSubTypeJobs = (req, res, next) => {
  res.render('subTypeJobs');
};

exports.postSubTypeJobs = (req, res, next) => {
  const { name, image, typeJob, description } = req.body;

  const newSubTypeJob = new SubTypeJob({
    name,
    image,
    description,
    typeJob,
    status: true,
  });

  newSubTypeJob.save().then((data) => {
    TypeJob.findById(typeJob)
      .then((_typeJob) => {
        _typeJob.subTypeJobs.push({ _id: data._id, name: data.name });

        return _typeJob.save();
      })
      .then((result) => {
        res.status(201).json({
          message: 'Created successfully',
          data,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  });
};

// Jobs
exports.getJobs = (req, res, next) => {
  res.render('jobs');
};

exports.postJobs = (req, res, next) => {
  const { type, ...rest } = req.body;
  let jobId;
  let newJob;

  // Filter type input from frontend and return respective TypeId
  TypeJob.find()
    .then((typeJobs) => {
      return (typeJobIds = typeJobs.map((item) => {
        return item._id.toString();
      }));
    })
    .then((typeJobsIds) => {
      const result = typeJobsIds.filter((id, index) => {
        if (++index === +type) {
          return id;
        }
      });
      return result;
    })
    // Create new Job
    .then((type) => {
      const job = new Job({
        ...rest,
        type,
        userCreated: req.adminId,
      });

      return job.save();
    })
    .then((result) => {
      newJob = { ...result };
      jobId = newJob._doc._id;
      return SubTypeJob.findOne({ _id: newJob._doc.subType });
    })
    .then((subType) => {
      if (!subType) {
        next();
      }
      subType.jobs.push(jobId);
      return subType.save();
    })
    .then((data) => {
      res.status(201).json(newJob);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postUser = (req, res, next) => {
  const { password, email, ...rest } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new Error('This user already exists!!');
        error.statusCode = 303;
        throw error;
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashedPw) => {
      const newUser = new User({
        ...rest,
        email,
        password: hashedPw,
      });
      return newUser.save();
    })
    .then((result) => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const { idUser } = req.params;
  let infoJobDeleted;

  User.findByIdAndRemove(idUser)
    .then((result) => {
      if (!result) {
        const error = new Error('No content');
        error.statusCode = 401;
        throw error;
      }

      return Job.find({ userCreated: result._id }); // Find jobs with matched userCreated
    })
    .then((jobs) => {
      if (jobs.length == 0) {
        return res.status(200).json({ message: 'Deleted user' });
      }

      infoJobDeleted = jobs.map((job) => {
        return {
          _id: job._id,
          subType: job.subType,
        };
      });
      return Job.deleteMany({ userCreated: idUser }); // delete jobs with matched userCreated
    })
    .then((result) => {
      //  Loop though {_id, subType} object related to Job instance that matches deleted user
      infoJobDeleted.forEach((info) => {
        SubTypeJob.findById(info.subType)
          .then((item) => {
            item.jobs.pull(info._id); // Update jobs in SubTypeJob
            return item.save();
          })
          .then((pulledSubType) => {
            return User.find();
          })
          .then((users) => {
            users.forEach((user) => {
              user.bookingJob.pull(info._id); // remove/update bookingJob in user
              user.save().then((result) => {
                // result: newly-updated user instance with new bookingJob
                return res.status(200).json({ message: 'Deleted user' });
              });
            });
          });
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  const { idUser } = req.params;
  const updatedUser = req.body;

  User.findOneAndUpdate({ _id: idUser }, updatedUser)
    .then((result) => {
      res.status(204).json({ message: 'Updated user' });
    })
    .catch((err) => next(err));
};

// const typeJobIds = async (cb) => {
//   const ids = await TypeJob.find();

//   return (result = ids.map((item) => {
//     cb(item._id.toString());
//   }));
// };
