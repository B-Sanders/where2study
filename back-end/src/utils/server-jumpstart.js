import express from 'express';
import bodyParser from 'body-parser';
import unauthenticatedRoutes from '../routes/unauthenticated-routes';
import authenticatedRoutes from '../routes/authenticated-routes';
import locationRouter from '../routes/locationsController';
import requestRouter from '../routes/requestsController';
import userRouter from '../routes/usersController';
import cors from 'cors';

const server = express();

server.use(cors({
    credentials: true
}));

// Parse all requests as json by default
server.use(bodyParser.json());

server.use('/authenticated', authenticatedRoutes);

// Register unauthenticated routes
server.use('/', unauthenticatedRoutes);

// Register locations controller
server.use('/locations', locationRouter);

// Register study requests controller
server.use('/requests', requestRouter);

// Register users controller
server.use('/user', userRouter);

export default server;