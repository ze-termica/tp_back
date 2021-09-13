module.exports = function (app) {
    let api = app.api.order;

    app.route('/user')
        .get(api.getCertificates)
}