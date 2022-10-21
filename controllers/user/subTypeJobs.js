const SubTypeJob = require('../../models/subTypeJob');

exports.getJobsBySubType = (req, res, next) => {
  const idSubType = req.query.subType;

  SubTypeJob.findById(idSubType).then((result) => {
    if (!result) {
      res.status(202).json({ message: 'No Content' });
    }
    res.status(200).json(result);
  });
};
