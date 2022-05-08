const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const {postSchema} = require('../helpers/dairySchemaValidation');
const {putSchema} = require('../helpers/dairySchemaValidation');


//function for getting all cattle records from mongodb
const getAllDairyCows = async (req, res, next) => {
  try{
    const payload = await mongodb
    .getDb()
    .db()
    .collection('DairyHerd')
    .find();
    payload.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
    console.log(payload);
  } catch (error) {
    res.status(400).json(res.error || 'An error occured fetching cattle records.');
  }
    
};

//function for getting a single cattle record from mongodb via id
const getSingleDairyCow = async (req, res, next) => {
  try{
    const userId = new ObjectId(req.params.id);
    const payload = await mongodb
    .getDb()
    .db()
    .collection('DairyHerd')
    .find({ _id: userId});
    payload.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(400).json(res.error || 'An error occured fetching cattle record. Please check record Id.');
  }
    
};

//function for createing a new cattle record
const newDairyCow = async (req, res) => {
  try{
    //POST request body
    //data validation here to replace the cow object
    // const cow = {
    //     name: req.body.name,
    //     sex: req.body.sex,
    //     birthDate: req.body.birthDate,
    //     birthWeight: req.body.birthWeight,
    //     sireBreed: req.body.sireBreed,
    //     damBreed: req.body.damBreed,
    //     currentWeight: req.body.currentWeight
    // };
    const cow = await postSchema.validateAsync(req.body);
    console.log("made it here!");
    console.log(req.body);
    const response = await mongodb
        .getDb()
        .db()
        .collection('DairyHerd')
        .insertOne(cow);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An Error has occurred creating new Dairy record.');
    }
  } catch(error) {
    res.status(400).json(res.error || 'An Error has occurred creating new Dairy record. Please check required fields.');
  }
    
};

//function for updating a current cattle record
const updateCattleRecord = async (req, res) => {
  try{
    const userId = new ObjectId(req.params.id);
    //Request body
    // const cattleRecord = {
    //     name: req.body.name,
    //     sex: req.body.sex,
    //     birthDate: req.body.birthDate,
    //     birthWeight: req.body.birthWeight,
    //     sireBreed: req.body.sireBreed,
    //     damBreed: req.body.damBreed,
    //     currentWeight: req.body.currentWeight
    // };
    const cattleRecord = await putSchema.validateAsync(req.body);
    const response = await mongodb
      .getDb()
      .db()
      .collection('DairyHerd')
      .replaceOne({ _id: userId }, cattleRecord);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the record.');
    }
  } catch (error) {
    res.status(400).json(res.error || 'An error occurred attempting to update cattle record. Please check your Record Id, and that current weight is included.');
  }
    
  };

  //function to delete a single cattle record via Id
  const deleteCattleRecord = async (req, res) => {
    try{
      const userId = new ObjectId(req.params.id);
      const response = await mongodb
          .getDb()
          .db()
          .collection('DairyHerd')
          .remove({ _id: userId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'An error occured attempting to delete cattle record.');
      }
    } catch(error) {
      res.status(400).json(res.error || 'An error occured attempting to delete cattle record. Please check your record Id.');
    }
    
  };


module.exports = {
    getAllDairyCows, 
    getSingleDairyCow,
    newDairyCow,
    updateCattleRecord,
    deleteCattleRecord
};