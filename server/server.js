const mongoose = require('mongoose');
const MacronutrientData = mongoose.model('MacronutrientData');

module.exports = {
	getData: (req, res, next) => {
		const yearQP = parseInt(req.query.year);
		const year_fromQP = parseInt(req.query.year_from);
		const year_toQP = parseInt(req.query.year_to);
		const entityQP = req.query.entity;
		const query = {};
		if (year_fromQP && !isNaN(year_fromQP)) {
			query.year = {
				'$gte': year_fromQP
			};
		}
		if (year_toQP && !isNaN(year_toQP)) {
			query.year = {
				...query.year,
				'$lte': year_toQP
			};
		}
		if (yearQP && !isNaN(yearQP)) {
			query.year = yearQP;
		}
		if (entityQP && entityQP.length) {
			query.entity = entityQP;
		}
		MacronutrientData.find(query).sort({ year: 1, entity: 1 }).exec((err, data) => {
			if (err) {
				console.error(err);
				return res.status(500).json({
					error: 'Something bad happened but this server has no error handling so here, have a 500 status code'
				});
			}
			return res.json({ data });
		});
	},
};
