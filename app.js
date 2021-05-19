require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = { NODE_ENV, JWT_SECRET };

const router = require('./routes');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { router_signin, router_signup } = require('./routes/signin_signup');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();
app.use(cors());
app.use(requestLogger);
app.use(bodyParser.json());

app.use(router_signin);
app.use(router_signup);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
