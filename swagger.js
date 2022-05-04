const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'cse341 Cattle API',
        description: 'Record of cows API'
    },
    host: 'cse341cattle.herokuapp.com',
    schemes:['https'],

};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, doc);