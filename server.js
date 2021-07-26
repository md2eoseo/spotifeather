require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3001;
const apiRoute = require('./routes/index');

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api', apiRoute);

app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
