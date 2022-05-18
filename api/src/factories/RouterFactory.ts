import { Router } from 'express';
import { ZodSchema } from 'zod';

import { MongooseSchema } from '../app/interfaces/MongooseSchema';
import MongoModel from '../app/models/MongoModel';
import Controller from '../app/controllers/Controller';
import Service from '../app/services/Service';
import ExpressRouter from '../routes/ExpressRouter';

type MongoRouterParams<T> = {
  route: string,
  tableName: string,
  zodSchema: ZodSchema<T>,
  mongooseSchema: MongooseSchema<T>,
};

type MongoFactoryReturn<T> = {
  router: Router,
  model: MongoModel<T>,
  service: Service<T>,
  controller: Controller<T>,
  expressRouter: ExpressRouter<T>,
};

export default function makeMongoRouter<T>(
  { route, tableName, zodSchema, mongooseSchema }: MongoRouterParams<T>,
): MongoFactoryReturn<T> {
  const model = new MongoModel<T>(tableName, mongooseSchema);
  const service = new Service<T>(model);
  const controller = new Controller<T>(service, zodSchema);
  const expressRouter = new ExpressRouter<T>(route, controller);

  return {
    router: expressRouter.router,
    model,
    service,
    controller,
    expressRouter,
  };
}
