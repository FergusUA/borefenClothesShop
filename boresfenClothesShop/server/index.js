require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const PORT = process.env.PORT || 5000;
const app = express();
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const models = require("./models/models");
const cors = require("cors");
const ErrorMiddleware = require("./middleware/ErrorMiddleware");
const path = require('path')


app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Middleware з обробки помилок завжди йде останній. НЕ РУХАТИ!!!
app.use(ErrorMiddleware)


const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
