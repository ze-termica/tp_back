let DAO = require('./../persistence/dao');
// let ServerUtil = require('./../util/serverUtil');

module.exports = function (app) {
    let api = {};
    let appFbAdmin = app.get('firebaseAdmin');
    let dao = new DAO(appFbAdmin);

    api.getCertificates = function (req, res) {
        let orders = new Array();
        dao.getFirestoreDataById('user', req.uid).then((resp) => {
            res.status(200).send(resp)
            return;
        });
    }, function (result) {
        console.error("erro?: " + result);
        res.status(500).send({ status: 'ERROR' });
        return;
    };

    return api;
}