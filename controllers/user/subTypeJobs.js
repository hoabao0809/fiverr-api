const SubTypeJob = require('../../models/subTypeJob');

exports.getSubTypeJobs = (req, res, next) => {
  const { idSubType } = req.params;

  SubTypeJob.findOne({ _id: idSubType })
    .then((result) => {
      if (!result) {
        const error = new Error('No data');
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json(result);
    })
    .catch((err) => next(err));
};
