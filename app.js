const express = require('express');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const authRoute = require('./src/routes/authRouth');
const enteriesRoute = require('./src/routes/enteriesRoutes');
const remindersRoute = require('./src/routes/remindersRoute');
const userRoute = require('./src/routes/userRoute');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(json({ limit: '50mb' }));
app.use(urlencoded({ limit: '50mb', extended: true }));

app.use('/api/v1', authRoute);

app.use('/api/v1', enteriesRoute);

app.use('/api/v1', remindersRoute);

app.use('/api/v1', userRoute);

app.get('/', (req, res) => res.status(200).json({ message: 'welcome to my api' }));

app.all('*', (req, res) => res.status(404).json({
  status: 'error',
  message: 'route not found'
}));

module.exports = app;
