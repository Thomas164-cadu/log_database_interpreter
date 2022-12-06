const {Router} = require('express');
const router = Router();
const LogController = require('./controller/LogController');

router.post('/log', LogController.sinteticLog);

module.exports = router;