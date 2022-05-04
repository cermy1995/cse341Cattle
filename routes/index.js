const express = require('express');
const router = express.Router();

// router.use('/', require('./swagger'));
router.use('/dairy', require('./dairy'));
// router.use('/beef', require('./beef'));


module.exports = router;