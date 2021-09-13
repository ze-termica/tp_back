let mongoose = require('mongoose');

module.exports = function (app) {
    return function (req, res, next) {
        let firebaseAdmin = app.get('firebaseAdmin');
        let token = req.headers['x-access-token'];

        if (token) {
            firebaseAdmin.auth().verifyIdToken(token).then(function (decodedToken) {
                //console.log(decodedToken.uid);
                req.uid = decodedToken.uid;
                req.email = decodedToken.email;
                next();
            }).catch(function (err) {
                console.error(new Date(), ' error', err);
                return res.sendStatus(401);
            });
        } else {
            req.body['type'] = 'reject';
            req.body['server_time'] = new Date();
            req.body['server_ip'] = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            mongoose.model('AccessControl').create(req.body).catch(err => console.error(new Date(), ' AccessControl: ', err, ' time: ', req.body.server_time));
            return res.sendStatus(401);
        }
    };
};