const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const MacronutrientDataSchema = new mongoose.Schema(
	{
		entity: String,
		year: Number,
		fatSupply: Number,
		proteinSupply: Number,
		carbohydratesSupply: Number,
		caloriesFromFat: Number,
		caloriesFromProtein: Number,
		caloriesFromCarbohydrates: Number,
		shareOfCaloriesFromFat: Number,
		shareOfCaloriesFromProtein: Number,
		shareOfCaloriesFromCarbohydrates: Number,
		proteinSupplyOfAnimalOrigin: Number,
		proteinSupplyOfPlantOrigin: Number,
		caloriesFromAnimalProtein: Number,
		caloriesFromPlantProtein: Number,
		shareOfCaloriesFromAnimalProtein: Number,
		shareOfCaloriesFromPlantProtein: Number
	},
	{
		timestamps: true
	}
);

MacronutrientDataSchema.index({ year: 1, entity: 1 }, { unique: true });

const MacronutrientDataModel = mongoose.model('MacronutrientData', MacronutrientDataSchema);

module.exports = MacronutrientDataModel;
