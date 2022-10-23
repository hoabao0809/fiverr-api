const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/admin');
const authMiddleware = require('../middleware/is-auth');

// Type Jobs
adminRouter.get('/type-jobs', adminController.getTypeJobs);
adminRouter.post('/type-jobs', adminController.postTypeJobs);

// Subtype Jobs
adminRouter.get('/sub-type-jobs', adminController.getSubTypeJobs);
adminRouter.post('/sub-type-jobs', adminController.postSubTypeJobs);

// Jobs
adminRouter.get('/jobs', adminController.getJobs);
adminRouter.post('/jobs', authMiddleware, adminController.postJobs);

// Users
adminRouter.post('/users', authMiddleware, adminController.postUser);

module.exports = adminRouter;
