const Router = require('express').Router;
const router = Router();
const server = require('./server.js');


router.get('/api/v1/data', server.getData);



module.exports = router;