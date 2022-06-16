/* eslint-disable sonarjs/no-duplicate-string */

import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import { 
  validAddTodo, validEditTodo, validID, validTodo, validTodoStatusUpdate,
} from '../../mocks/TodoMocks';

import app, { layers } from '../../../app';

const { model } = layers;

const ENDPOINT = '/api/todos';

use(chaiHttp);

describe('Router', () => {
  beforeEach(sinon.restore);

  describe('POST /todos (#create)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(model.dao, 'create').rejects();

      const result = await request(app)
        .post(ENDPOINT)
        .send(validTodo);

      expect(result).to.have.status(500);
    });

    it('retorna erro 400 caso receba dados inválidos', async () => {
      sinon.stub(model.dao, 'create').rejects();

      const result = await request(app)
        .post(ENDPOINT)
        .send({});

      expect(result).to.have.status(400);
    });

    it('retorna status 201 caso tenha sucesso', async () => {
      sinon.stub(model.dao, 'create').resolves(validTodo);

      const result = await request(app)
        .post(ENDPOINT)
        .send(validAddTodo);

      expect(result).to.have.status(201);
      expect(result.body).to.be.deep.equal(validTodo);
    });
  });

  describe('GET /todos (#read)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(model.dao, 'find').rejects();

      const result = await request(app)
        .get(ENDPOINT);

      expect(result).to.have.status(500);
    });

    it('retorna status 200 caso tenha sucesso', async () => {
      sinon.stub(model.dao, 'find').resolves([]);

      const result = await request(app)
        .get(ENDPOINT);

      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal([]);
    });
  });

  describe('GET /todos/:id (#readOne)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(model.dao, 'findOne').rejects();

      const result = await request(app)
        .get(`${ENDPOINT}/${validID}`);

      expect(result).to.have.status(500);
    });

    it('retorna erro 400 caso receba id inválido', async () => {
      sinon.stub(model.dao, 'findOne').rejects();

      const result = await request(app)
        .get(`${ENDPOINT}/99999`);

      expect(result).to.have.status(400);
    });

    it('retorna status 200 caso tenha sucesso', async () => {
      sinon.stub(model.dao, 'findOne').resolves(validTodo as any);

      const result = await request(app)
        .get(`${ENDPOINT}/${validID}`);

      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal(validTodo);
    });
  });

  describe('UPDATE /todos/:id (#update)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').rejects();

      const result = await request(app)
        .put(`${ENDPOINT}/${validID}`)
        .send(validEditTodo);

      expect(result).to.have.status(500);
    });

    it('retorna erro 400 caso receba id inválido', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').rejects();

      const result = await request(app)
        .put(`${ENDPOINT}/99999`)
        .send(validEditTodo);

      expect(result).to.have.status(400);
    });

    it('retorna erro 400 caso receba dados inválidos', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').rejects();

      const result = await request(app)
        .put(`${ENDPOINT}/${validID}`)
        .send({ description: 1111 });

      expect(result).to.have.status(400);
    });

    it('retorna status 200 caso tenha sucesso', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').resolves(validTodo as any);

      const result = await request(app)
        .put(`${ENDPOINT}/${validID}`)
        .send(validEditTodo);

      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal(validTodo);
    });
  });

  describe('PATCH /todos/:id (#updateStatus)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').rejects();

      const result = await request(app)
        .patch(`${ENDPOINT}/${validID}/status`)
        .send(validTodoStatusUpdate);

      expect(result).to.have.status(500);
    });

    it('retorna erro 400 caso receba id inválido', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').rejects();

      const result = await request(app)
        .patch(`${ENDPOINT}/99999/status`)
        .send(validTodoStatusUpdate);

      expect(result).to.have.status(400);
    });

    it('retorna erro 400 caso receba status inválido', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').rejects();

      const result = await request(app)
        .patch(`${ENDPOINT}/${validID}/status`)
        .send({ status: 'oi' });

      expect(result).to.have.status(400);
    });

    it('retorna status 200 caso tenha sucesso', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').resolves(validTodo as any);

      const result = await request(app)
        .patch(`${ENDPOINT}/${validID}/status`)
        .send(validTodoStatusUpdate);

      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal(validTodo);
    });
  });

  describe('DELETE /todos/:id (#delete)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(model.dao, 'findByIdAndDelete').rejects();

      const result = await request(app)
        .delete(`${ENDPOINT}/${validID}`);

      expect(result).to.have.status(500);
    });

    it('retorna erro 400 caso receba id inválido', async () => {
      sinon.stub(model.dao, 'findByIdAndDelete').rejects();

      const result = await request(app)
        .delete(`${ENDPOINT}/99999`);

      expect(result).to.have.status(400);
    });

    it('retorna status 204 caso tenha sucesso', async () => {
      sinon.stub(model.dao, 'findByIdAndDelete').resolves(validTodo as any);

      const result = await request(app)
        .delete(`${ENDPOINT}/${validID}`);

      expect(result).to.have.status(204);
    });
  });
});
