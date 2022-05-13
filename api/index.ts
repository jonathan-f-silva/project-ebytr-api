import express from 'express';

const server = express();

server.get('/', (_req, res) => {
  res.sendStatus(200);
});

server.listen(3001, () => {
  console.log('API rodando na porta 3001!');
});
