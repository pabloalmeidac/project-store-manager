const swaggerAutogen = require('swagger-autogen')();

const output = './swagger/swagger_output.json';
const endpoint = ['index.js'];

swaggerAutogen(output, endpoint);