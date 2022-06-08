import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import makeTodoRouter from './factories/TodoFactory';
import ErrorMiddleware from './utils/ErrorMiddleware';

const { router, ...layers } = makeTodoRouter();
const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(ErrorMiddleware);

app.get('/coffee', (_req, res) => {
  res.sendStatus(418);
});

app.get('/', (_req, res) => {
  res.sendStatus(200);
});

export default app;

export { layers };
