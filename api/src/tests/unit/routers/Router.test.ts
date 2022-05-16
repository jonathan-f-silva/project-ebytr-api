/* eslint-disable sonarjs/no-duplicate-string */

import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import {
  app, invalidID, validID, invalidObject, validObject, testModel,
} from '../../mocks/TestMocks';

use(chaiHttp);

describe('Router', () => {
  beforeEach(sinon.restore);

  describe('POST /test (#create)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(testModel.dao, 'create').rejects();

      const result = await request(app)
        .post('/test')
        .send(validObject);

      expect(result).to.have.status(500);
    });

    it('retorna erro 400 caso receba dados inválidos', async () => {
      sinon.stub(testModel.dao, 'create').rejects();

      const result = await request(app)
        .post('/test')
        .send(invalidObject);

      expect(result).to.have.status(400);
    });

    it('retorna status 201 caso tenha sucesso', async () => {
      sinon.stub(testModel.dao, 'create').resolves(validObject);

      const result = await request(app)
        .post('/test')
        .send(validObject);

      expect(result).to.have.status(201);
      expect(result.body).to.be.deep.equal(validObject);
    });
  });

  describe('GET /test (#read)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(testModel.dao, 'find').rejects();

      const result = await request(app)
        .get('/test');

      expect(result).to.have.status(500);
    });

    it('retorna status 200 caso tenha sucesso', async () => {
      sinon.stub(testModel.dao, 'find').resolves([]);

      const result = await request(app)
        .get('/test');

      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal([]);
    });
  });

  describe('GET /test/:id (#readOne)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(testModel.dao, 'findOne').rejects();

      const result = await request(app)
        .get(`/test/${validID}`);

      expect(result).to.have.status(500);
    });

    it('retorna erro 400 caso receba id inválido', async () => {
      sinon.stub(testModel.dao, 'findOne').rejects();

      const result = await request(app)
        .get(`/test/${invalidID}`);

      expect(result).to.have.status(400);
    });

    it('retorna status 200 caso tenha sucesso', async () => {
      sinon.stub(testModel.dao, 'findOne').resolves(validObject as any);

      const result = await request(app)
        .get(`/test/${validID}`);

      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal(validObject);
    });
  });

  describe('UPDATE /test/:id (#update)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(testModel.dao, 'findByIdAndUpdate').rejects();

      const result = await request(app)
        .put(`/test/${validID}`)
        .send(validObject);

      expect(result).to.have.status(500);
    });

    it('retorna erro 400 caso receba id inválido', async () => {
      sinon.stub(testModel.dao, 'findByIdAndUpdate').rejects();

      const result = await request(app)
        .put(`/test/${invalidID}`)
        .send(validObject);

      expect(result).to.have.status(400);
    });

    it('retorna erro 400 caso receba dados inválidos', async () => {
      sinon.stub(testModel.dao, 'findByIdAndUpdate').rejects();

      const result = await request(app)
        .put(`/test/${validID}`)
        .send(invalidObject);

      expect(result).to.have.status(400);
    });

    it('retorna status 200 caso tenha sucesso', async () => {
      sinon.stub(testModel.dao, 'findByIdAndUpdate').resolves(validObject as any);

      const result = await request(app)
        .put(`/test/${validID}`)
        .send(validObject);

      expect(result).to.have.status(200);
      expect(result.body).to.be.deep.equal(validObject);
    });
  });

  describe('DELETE /test/:id (#delete)', () => {
    it('retorna erro 500 caso DB gere erro', async () => {
      sinon.stub(testModel.dao, 'findByIdAndDelete').rejects();

      const result = await request(app)
        .delete(`/test/${validID}`);

      expect(result).to.have.status(500);
    });

    it('retorna erro 400 caso receba id inválido', async () => {
      sinon.stub(testModel.dao, 'findByIdAndDelete').rejects();

      const result = await request(app)
        .delete(`/test/${invalidID}`);

      expect(result).to.have.status(400);
    });

    it('retorna status 204 caso tenha sucesso', async () => {
      sinon.stub(testModel.dao, 'findByIdAndDelete').resolves(validObject as any);

      const result = await request(app)
        .delete(`/test/${validID}`);

      expect(result).to.have.status(204);
    });
  });
});
