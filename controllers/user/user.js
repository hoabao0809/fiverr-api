const User = require('../../models/user');

exports.getUserById = (req, res, next) => {
  const { idUser } = req.params;

  if (!idUser) {
    const error = new Error('No content');
    error.statusCode = 401;
    throw error;
  }

  User.findById(idUser).then((user) => {
    if (!user) {
      const error = new Error('No content');
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json(user);
  });
};
