// combines all API routes

const router = require('express').Router();
const apiRoutes = require('./api');

// user the api routes
router.use('/api', apiRoutes);

module.exports = router;