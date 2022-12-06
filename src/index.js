const express = require('express');
const routes = require('./routes');

require('./database');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3030);

/*(async ()=>{
    const database = require('./db');
    const Log = require('./log');
    await database.sync();


})();*/