const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title : 'Test API',
            version: '1.0.0',
            description: 'Test Express API with auto generated swagger doc'
        },
        basePath: '/',
        host: 'localhost:3001/api/v1'
    },
    apis: ['./user/user.controller.js'],
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}