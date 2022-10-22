const SubTypeJob = require('../../models/subTypeJob');
const Job = require('../../models/job');

exports.getJobsBySubType = (req, res, next) => {
  const idSubType = req.query.subType;

  SubTypeJob.findById(idSubType)
    .populate('jobs._id')
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
