const express = require('express');
const userRouter = express.Router();
const typeJobsController = require('../controllers/user/typeJobs');
const subTypeJobsController = require('../controllers/user/subTypeJobs');
const jobsController = require('../controllers/user/jobs');

// Type Jobs
userRouter.get('/type-jobs', typeJobsController.getTypeJobs); // fetch type jobs
userRouter.get('/type-jobs/:idTypejob', typeJobsController.getTypeJobDetail); // get details of type job

// Sub Type Jobs
userRouter.get(
  '/sub-type-jobs/:idSubType',
  subTypeJobsController.getSubTypeJobs
); // fetch type jobs

// Jobs
userRouter.get('/jobs/by-sub-type', jobsController.getJobsBySubType); //lấy danh sách công việc theo loại công việc phụ
userRouter.get('/jobs/:idJob', jobsController.getJobDetail)
module.exports = userRouter;
