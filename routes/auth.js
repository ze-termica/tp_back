// const firebaseMiddleware = require('express-firebase-middleware');

module.exports = function (app) {
    app.use('/*', app.middlewares.validateFBToken);
};