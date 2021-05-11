const express = require('express');
const mongoose = require('mongoose');

const { DB_URI, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = require('./config');

mongoose.connect(`${DB_URI}${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
).then(setup);

function setup() {
	const MacronutrientData = require('./models/MacronutrientData.js');
	MacronutrientData.countDocuments((err, count) => {
		!count && require('./scripts/data-injest.js')();
	});
	
	const app = express();
	const router = require('./server/router.js');
	
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	
	app.listen(6012, () => {
		console.log('app listening on http://localhost:6012/')
	});
	
	app.use(router);
	app.use(express.static('public'))

}
