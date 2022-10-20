const express = require('express');
const userRouter = express.Router();
const typeJobsController = require('../controllers/user/typeJobs');

userRouter.get('/type-jobs', typeJobsController.getTypeJobs);

module.exports = userRouter;
