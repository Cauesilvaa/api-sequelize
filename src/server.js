const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// aq tbm faz referencia para index.js por padrão
require('./database'); //require('./database/idex.js'); 

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(routes);

app.listen(8080)