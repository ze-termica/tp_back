console.log('—'.repeat(80));

require('dotenv').config({ path: '/opt/lavan-back/.env' });
let app = require('./app.js');
let fs = require('fs');

process.on('unhandledRejection', err => {
	console.error(new Date(), ' custom unhandledRejection', err);
	return;
});

let options = null;
if (process.env.NODE_ENV === 'production') {
	options = {
		// key: fs.readFileSync('/opt/lavan-back/keys/lavan-api.key'),
		// cert: fs.readFileSync('/opt/lavan-back/keys/269eb28f89ea361d.crt'),
		// ca: [fs.readFileSync('/opt/lavan-back/keys/gd1.crt'), fs.readFileSync('/opt/lavan-back/keys/gd2.crt'), fs.readFileSync('/opt/lavan-back/keys/gd3.crt')]
		key: fs.readFileSync('/etc/letsencrypt/live/api.lavan.app/privkey.pem'),
		cert: fs.readFileSync('/etc/letsencrypt/live/api.lavan.app/fullchain.pem')		
	};
	require('./../persistence/mongo')('mongodb+srv://lavan:oLG8R2d3OehnIkYM@cluster0-fnukz.gcp.mongodb.net/lavan?retryWrites=true&w=majority');
} else if (process.env.NODE_ENV === 'development') {
	options = {
		key: fs.readFileSync('/etc/letsencrypt/live/dev.lavan.app/privkey.pem'),
		cert: fs.readFileSync('/etc/letsencrypt/live/dev.lavan.app/fullchain.pem')
	};
	require('./../persistence/mongo')('mongodb+srv://lavan:Ptl0H9LQrmqD7HQe@lavan-br-dev-remcn.gcp.mongodb.net/lavan?retryWrites=true&w=majority');
} else if (process.env.NODE_ENV === 'local') {
	options = {
		key: fs.readFileSync('/Users/ms/files/mobile/node/localhost_key/localhost.key'),
		cert: fs.readFileSync('/Users/ms/files/mobile/node/localhost_key/localhost.crt')
	};
	require('./../persistence/mongo')('mongodb+srv://lavan:Ptl0H9LQrmqD7HQe@lavan-br-dev-remcn.gcp.mongodb.net/lavan?retryWrites=true&w=majority');
}

let https = require('https');
https.createServer(options, app).listen(process.env.PORT, function () {
	console.log('Lavan backend started');
	console.log('PORT:' + process.env.PORT);
	console.log('NODE_ENV: ', process.env.NODE_ENV);
	console.log('—'.repeat(80));
});
