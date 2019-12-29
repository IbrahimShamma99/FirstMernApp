var router = require('express').Router();

router.use('/api', require('./api/user'));
router.use('/api', require('./api/product'));

module.exports = router;