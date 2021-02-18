import express from 'express';

import dotenv from 'dotenv';

import 'babel-polyfill';

import cors from 'cors';

import { json, urlencoded } from 'body-parser';

import authRoute from './src/routes/authRouth';

import enteriesRoute from './src/routes/enteriesRoutes';

import remindersRoute from './src/routes/remindersRoute';

import userRoute from './src/routes/userRoute';

const app = express();

dotenv.config();

app.use(cors());

app.use(json({ limit: '50mb' }));
app.use(urlencoded({ limit: '50mb', extended: true }));

app.use('/api/v1', authRoute);

app.use('/api/v1', enteriesRoute);

app.use('/api/v1', remindersRoute);

app.use('/api/v1', userRoute);

app.get('/', (req, res) => res.status(200).json({ message: 'welcome to my api' }));

app.all('*', (req, res) => res.status(404).json({
  message: 'route not found'
}));

module.exports = app;
