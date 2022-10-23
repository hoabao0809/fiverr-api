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

// const typeJobIds = async (cb) => {
//   const ids = await TypeJob.find();

//   return (result = ids.map((item) => {
//     cb(item._id.toString());
//   }));
// };
