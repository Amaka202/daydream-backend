import express from 'express';

import dotenv from 'dotenv';

import 'babel-polyfill';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.status(200).send({ message: 'You! Congratulations! Your first endpoint is working' }));

module.exports = app;
