# cs573-final-project

Link to working example: https://cs573-final-project.ryanlamarche.dev/

Link to video: https://www.youtube.com/watch?v=3Kup9t8jjlw

## Data

`public/macronutrient-data.csv` - macronutrients over time

`public/overweight.csv` - BMI over time

`public/world-110m2.json` - geoJSON

`public/world-country-names.csv` - names of countries

## Code

All of the front end code will be found in `public/index.html`

External libraries include jquery, d3.js, dc.js, and crossfilter.js.

## Serverside Data API

We built a server side API for querying the macro nutrient data.

Data is sorted by year in ascending order, then by country in ascending order

`/api/v1/data`

### Query params:

#### Specify a year range

`year_from=1970` - get data with year greater than or equal to

`year_to=1970` - get data with year less than or equal to

#### Specify a specific year

`year=1970` - get data by year **Note: Overrides `year_from` and `year_to`**

#### Specify a country

`entity=Albania` - get data for Albania

### Examples

Get data for the United Kingdom from 2011-2012

`/api/v1/data?entity=United%20Kingdom&year_from=2011&year_to=2012`

Get data for all countries for the year 1968

`/api/v1/data?year=1968`
