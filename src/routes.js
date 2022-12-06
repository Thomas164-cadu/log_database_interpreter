const {Router} = require('express');
const router = Router();
const Logs = require('./models/logs');

router.post('/log', async (req, res) => {
    const {descricao} = req.body;

    const log = await Logs.create({descricao});

    res.json({log});
});

module.exports = router;