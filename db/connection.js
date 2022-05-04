//dotenv loads variables for .env files
const dotenv = require('dotenv');
dotenv.config();
//connect to mongo db
const MongoClient = require('mongodb').MongoClient;

//initilize a variable to keep track of your db connection
let _db;

//function to connect to mongodb (callback functions, are functions passed into another function as an argument)
const initDb = (callback) => {
    //check to see if db is already initialized
    if(_db){
        console.log('Db is already initialized.');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if(!_db) {
        throw Error('DB is not initilized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb,
};
