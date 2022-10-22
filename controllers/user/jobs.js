const SubTypeJob = require('../../models/subTypeJob');
const Job = require('../../models/job');
const User = require('../../models/user');

exports.getJobs = (req, res, next) => {
  Job.find()
    .then((jobs) => {
      if (!jobs) {
        const error = new Error('No content');
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json(jobs);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getJobsBySubType = (req, res, next) => {
  const idSubType = req.query.subType;

  SubTypeJob.findById(idSubType)
    .populate('jobs')
    .then((result) => {
      if (!result) {
        res.status(401).json({ message: 'No Content' });
      }
      res.status(200).json(result.jobs);
    });
};

exports.getJobDetail = (req, res, next) => {
  const { idJob } = req.params;

  Job.findById(idJob).then((result) => {
    if (!result) {
      const error = new Error('No content');
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json(result);
  });
};

exports.patchBookedJob = (req, res, next) => {
  const { idBookedJob } = req.params;

  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error('No Content');
        error.statusCode = 401;
        throw error;
      }
      user.bookingJob.push(idBookedJob);
      return user.save();
    })
    .then((result) => {
      console.log(result);
      res.status(202).json({ message: 'Book successfully' });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getJobByName = (req, res, next) => {
  const searchValue = req.query.name;
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(searchValue);

  Job.find({ name: searchRgx })
    .then((data) => {
      if (!data) {
        const error = new Error('No content');
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};
