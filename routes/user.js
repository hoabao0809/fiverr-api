const express = require('express');
const userRouter = express.Router();
const typeJobsController = require('../controllers/user/typeJobs');
const subTypeJobsController = require('../controllers/user/subTypeJobs');
const jobsController = require('../controllers/user/jobs');
const userController = require('../controllers/user/user');
const authMiddleware = require('../middleware/is-auth');

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
userRouter.get('/jobs/by-name', jobsController.getJobByName);
userRouter.get('/jobs/:idJob', jobsController.getJobDetail);
userRouter.patch(
  '/jobs/booking/:idBookedJob',
  authMiddleware,
  jobsController.patchBookedJob
);

// User
userRouter.get('/users/:idUser', userController.getUserById);
module.exports = userRouter;
