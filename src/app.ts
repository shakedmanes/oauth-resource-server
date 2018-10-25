// app

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import resourcesRoutes, { default as ResourcesRoutes } from './resources/resources.routes';

// Load environments variables
dotenv.load();

const app = express();
app.set('port', process.env.PORT);

// Used for disable https certificates validations
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Middlewares configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV || 'dev'));

// Routes
app.use('/resources/', resourcesRoutes);

export default app;
