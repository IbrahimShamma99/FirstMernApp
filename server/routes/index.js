var router = require('express').Router();

router.use('/api', require('./api/user'));
console.log("API IMPORTED");

module.exports = router;