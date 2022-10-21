const express = require('express');
const userRouter = express.Router();
const typeJobsController = require('../controllers/user/typeJobs');
const subTypeJobsController = require('../controllers/user/subTypeJobs');

// Type Jobs
userRouter.get('/type-jobs', typeJobsController.getTypeJobs); // fetch type jobs
userRouter.get('/type-jobs/:idTypejob', typeJobsController.getTypeJobDetail); // get details of type job

// Sub Type Jobs
userRouter.get('/jobs/by-sub-type', subTypeJobsController.getJobsBySubType); //lấy danh sách công việc theo loại công việc phụ

module.exports = userRouter;
