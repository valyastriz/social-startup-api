const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// user userRoutes and thoughtRoutes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

modules.exports = router;