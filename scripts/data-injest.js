const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const MacronutrientData = mongoose.model('MacronutrientData');

module.exports = async() => {
	fs.createReadStream(path.join(__dirname, '../data/macronutrient-data.csv'))
		.pipe(csv())
		.on('data', async row => {
			try {
				await MacronutrientData.create({
					...row
				});
			} catch (err) {
				if (err.code !== 11000) { // duplicate key, data already ingested
					console.error(err);
				}
			}
		})
		.on('end', () => {
			console.log('CSV file successfully processed');
		});
};
