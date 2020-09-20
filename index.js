const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('./db');
mongoose.connect();

const route = require('./routers/index');
const router = express.Router();
route(router);

//为我们的http请求添加 /api
app.use('/api', router);

//将我们的后端发送到端口
app.listen(4500, () => console.log(`LISTENING ON PORT 4500`));
