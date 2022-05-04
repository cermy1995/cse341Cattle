const express = require('express');
const router = express.Router();

const dairyController = require('../controllers/dairy');

//GET
router.get('/', dairyController.getAllDairyCows);
router.get('/:id', dairyController.getSingleDairyCow);

//POST
router.post('/', dairyController.newDairyCow);


module.exports = router;