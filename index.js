const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection');


const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
      //Access-Control-Allow-Origin, * allows requests without credentials, from any origin.
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
    if(err){
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to MongoDB and listening on ${port}`);
    }
});