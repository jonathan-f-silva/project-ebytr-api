/* eslint-disable sonarjs/no-duplicate-string */

import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app, { layers } from '../../../src/app';
import { validAddTodo, validEditTodo, validID, validTodo } from '../../mocks/TodoMocks';

const { model } = layers;

use(chaiHttp);

describe('Router', () => {
  beforeEach(sinon.restore);

  describe('POST /todos (#create)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(model.dao, 'create').rejects();

      const result = await request(app)
        .post('/todos')
        .send(validTodo);

      expect(result).to.have.status(500);
    });

    it('retorna erro 400 caso receba dados inválidos', async () => {
      sinon.stub(model.dao, 'create').rejects();

      const result = await request(app)
        .post('/todos')
        .send({});

      expect(result).to.have.status(400);
    });

    it('retorna status 201 caso tenha sucesso', async () => {
      sinon.stub(model.dao, 'create').resolves(validTodo);

      const result = await request(app)
        .post('/todos')
        .send(validAddTodo);

      expect(result).to.have.status(201);
      expect(result.body).to.be.deep.equal(validTodo);
    });
  });

  describe('GET /todos (#read)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(model.dao, 'find').rejects();

      const result = await request(app)
        .get('/todos');

      expect(result).to.have.status(500);
    });

    it('retorna status 200 caso tenha sucesso', async () => {
      sinon.stub(model.dao, 'find').resolves([]);

      const result = await request(app)
        .get('/todos');

      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal([]);
    });
  });

  describe('GET /todos/:id (#readOne)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(model.dao, 'findOne').rejects();

      const result = await request(app)
        .get(`/todos/${validID}`);

      expect(result).to.have.status(500);
    });

    it('retorna erro 400 caso receba id inválido', async () => {
      sinon.stub(model.dao, 'findOne').rejects();

      const result = await request(app)
        .get('/todos/99999');

      expect(result).to.have.status(400);
    });

    it('retorna status 200 caso tenha sucesso', async () => {
      sinon.stub(model.dao, 'findOne').resolves(validTodo as any);

      const result = await request(app)
        .get(`/todos/${validID}`);

      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal(validTodo);
    });
  });

  describe('UPDATE /todos/:id (#update)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').rejects();

      const result = await request(app)
        .put(`/todos/${validID}`)
        .send(validEditTodo);

      expect(result).to.have.status(500);
    });

    it('retorna erro 400 caso receba id inválido', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').rejects();

      const result = await request(app)
        .put('/todos/99999')
        .send(validEditTodo);

      expect(result).to.have.status(400);
    });

    it('retorna erro 400 caso receba dados inválidos', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').rejects();

      const result = await request(app)
        .put(`/todos/${validID}`)
        .send({ description: 1111 });

      expect(result).to.have.status(400);
    });

    it('retorna status 200 caso tenha sucesso', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').resolves(validTodo as any);

      const result = await request(app)
        .put(`/todos/${validID}`)
        .send(validEditTodo);

      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal(validTodo);
    });
  });

  describe('DELETE /todos/:id (#delete)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(model.dao, 'findByIdAndDelete').rejects();

      const result = await request(app)
        .delete(`/todos/${validID}`);

      expect(result).to.have.status(500);
    });

    it('retorna erro 400 caso receba id inválido', async () => {
      sinon.stub(model.dao, 'findByIdAndDelete').rejects();

      const result = await request(app)
        .delete('/todos/99999');

      expect(result).to.have.status(400);
    });

    it('retorna status 204 caso tenha sucesso', async () => {
      sinon.stub(model.dao, 'findByIdAndDelete').resolves(validTodo as any);

      const result = await request(app)
        .delete(`/todos/${validID}`);

      expect(result).to.have.status(204);
    });
  });
});
