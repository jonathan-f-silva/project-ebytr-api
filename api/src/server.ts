import 'express-async-errors';

import App from './app';
import ErrorMiddleware from './utils/ErrorMiddleware';

const server = new App();

// server.addRouter(makeCarRouter());

server.app.use('/', (_req, res) => {
  res.sendStatus(200);
});

server.app.use(ErrorMiddleware);

export default server;
