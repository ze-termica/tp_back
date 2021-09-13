let DAO = require('./../persistence/dao');
let dao = null;

module.exports = class OrderMatch {
    constructor(app) {
        dao = new DAO(app.get('firebaseAdmin'));
    }

    setServerError(err) {
        dao.setFirestoreDataWithoutId('err', { app: 'server', code: 'mongo01', uid: 'back', dev_uid: 'back', dt_created: new Date().toISOString(), msg: err, version: 'back' });
    }
};