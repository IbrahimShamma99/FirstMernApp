var router = require('express').Router();

router.use('/api', require('./api/user'));

module.exports = router;