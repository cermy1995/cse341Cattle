const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

//function for getting all contacts from mongodb
const getAllDairyCows = async (req, res, next) => {
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
};

//function for getting a single contact from mongodb via id
const getSingleDairyCow = async (req, res, next) => {
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
};

//function for createing a new contact
const newDairyCow = async (req, res) => {
    //POST request body
    const cow = {
        name: req.body.name,
        sex: req.body.sex,
        birthDate: req.body.birthDate,
        birthWeight: req.body.birthWeight,
        sireBreed: req.body.sireBreed,
        damBreed: req.body.damBreed,
        currentWeight: req.body.currentWeight
    };
    console.log("made it here!")
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
};

// const updateContact = async (req, res) => {
//     const userId = new ObjectId(req.params.id);
//     //Request body
//     const contact = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       favoriteColor: req.body.favoriteColor,
//       birthday: req.body.birthday
//     };
//     const response = await mongodb
//       .getDb()
//       .db()
//       .collection('contacts')
//       .replaceOne({ _id: userId }, contact);
//     console.log(response);
//     if (response.modifiedCount > 0) {
//       res.status(204).send();
//     } else {
//       res.status(500).json(response.error || 'Some error occurred while updating the contact.');
//     }
//   };

//   const deleteContact = async (req, res) => {
//     const userId = new ObjectId(req.params.id);
//     const response = await mongodb
//         .getDb()
//         .db()
//         .collection('contacts')
//         .remove({ _id: userId }, true);
//     console.log(response);
//     if (response.deletedCount > 0) {
//       res.status(204).send();
//     } else {
//       res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
//     }
//   };


module.exports = {
    getAllDairyCows, 
    getSingleDairyCow,
    newDairyCow
};