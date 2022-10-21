const TypeJob = require('../../models/typeJob');

exports.getTypeJobs = (req, res, next) => {
  TypeJob.find().then((result) => {
    // if (result.length == 0) {
    //   const newTypeJob = new TypeJob({
    //     name: 'Graphics & Design',
    //     status: true,
    //     image:
    //       'https://fiverr-res.cloudinary.com/mobile/categories_images/graphics_design.png',
    //     subTypeJobs: [],
    //     subtitle: 'A single place, millions of creative talents',
    //   });
    //   newTypeJob.save();
    // }
    return res.status(200).json(result);
  });
};

exports.getTypeJobDetail = (req, res, next) => {
  const { idTypejob } = req.params;

  TypeJob.findById(idTypejob).then((result) => {
    if (!result) {
      res.status(204).json({
        message: 'No Content',
      });
    }
    res.status(200).json(result);
  });
};
