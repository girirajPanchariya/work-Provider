import express from 'express';
import { authenticate } from '../OthreFiles/authenticat.js';
import { Application, relatedApplications } from '../Controller/Applicaiton.js';

export const ApplRouter = express.Router();

ApplRouter.post('/Apply/:id', authenticate, Application);
ApplRouter.get('/My/:id', authenticate, relatedApplications);
