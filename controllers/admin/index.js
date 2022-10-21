const TypeJob = require('../../models/typeJob');
const SubTypeJob = require('../../models/subTypeJob');
const Job = require('../../models/job');

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
  let jobId;
  let newJob;
  const job = new Job({
    ...req.body,
  });
  job
    .save()
    .then((result) => {
      newJob = { ...result };
      jobId = newJob._doc._id
      return SubTypeJob.findOne({ _id: newJob._doc.subType });
    })
    .then((subType) => {
      if (!subType) {
        next();
      }
      subType.jobs.push({ _id: jobId });
      return subType.save();
    })
    .then((data) => {
      res.status(201).json(newJob);
    })
    .catch((err) => {
      next(err);
    });
};
