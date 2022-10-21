const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/admin');

// Type Jobs
adminRouter.get('/type-jobs', adminController.getTypeJobs);
adminRouter.post('/type-jobs', adminController.postTypeJobs);

// Subtype Jobs
adminRouter.get('/sub-type-jobs', adminController.getSubTypeJobs);
adminRouter.post('/sub-type-jobs', adminController.postSubTypeJobs);

// Jobs
adminRouter.get('/jobs', adminController.getJobs);
adminRouter.post('/jobs', adminController.postJobs);

module.exports = adminRouter;
