const express = require('express');
const router = express.Router();

const dairyController = require('../controllers/dairy');

//GET
router.get('/', dairyController.getAllDairyCows);
router.get('/:id', dairyController.getSingleDairyCow);

//POST
router.post('/', dairyController.newDairyCow);

//PUT routes to update a cattle record
router.put('/:id', dairyController.updateCattleRecord);

//Delete route for removing a cattle record
router.delete('/:id', dairyController.deleteCattleRecord);

module.exports = router;