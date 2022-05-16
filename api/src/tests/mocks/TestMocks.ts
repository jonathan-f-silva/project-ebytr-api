import express from 'express';
import 'express-async-errors';

import { z } from 'zod';

import MongoModel from '../../app/models/MongoModel';
import Service from '../../app/services/Service';
import Controller from '../../app/controllers/Controller';
import ErrorMiddleware from '../../utils/ErrorMiddleware';
import ExpressRouter from '../../routes/ExpressRouter';

export const validID = '62620d6c9162997790a96412';
export const invalidID = '6262';
export const validObject = { name: 'test' };
export const invalidObject = { invalid: true };

export const TestZodSchema = z.object({
  name: z.string(),
});

export type TestType = z.infer<typeof TestZodSchema>;

export const TestMongoSchema = {
  name: String,
};

export const testModel = new MongoModel<TestType>('test', TestMongoSchema);

export const testService = new Service<TestType>(testModel);

export const testController = new Controller<TestType>(testService, TestZodSchema);

export const testRouter = new ExpressRouter('/test', testController);

const app = express();

app.use(express.json());
app.use(testRouter.router);
app.use(ErrorMiddleware);

export { app };
