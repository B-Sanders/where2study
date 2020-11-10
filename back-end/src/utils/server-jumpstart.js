import express from 'express';
import bodyParser from 'body-parser';
import unauthenticatedRoutes from '../routes/unauthenticated-routes';

const server = express();

// Parse all requests as json by default
server.use(bodyParser.json());

// Register unauthenticated routes
server.use('/', unauthenticatedRoutes);

export default server;