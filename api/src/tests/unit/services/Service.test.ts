/* eslint-disable sonarjs/no-duplicate-string */
import { expect } from 'chai';
import sinon from 'sinon';

import { testModel, testService, validID, validObject } from '../../mocks/TestMocks';

describe('Service', () => {
  beforeEach(sinon.restore);

  describe('#create()', () => {
    it('gera erro caso o model gere erro', async () => {
      sinon.stub(testModel, 'create').rejects();
      try {
        await testService.create(validObject);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento criado', async () => {
      sinon.stub(testModel, 'create').resolves(validObject);
      const test = await testService.create(validObject);
      expect(test).to.be.deep.equal(validObject);
    });
  });

  describe('#read()', () => {
    it('gera erro caso o model gere erro', async () => {
      sinon.stub(testModel, 'read').rejects();
      try {
        await testService.read();
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna um array com todos os documentos', async () => {
      sinon.stub(testModel, 'read').resolves([]);
      const test = await testService.read();
      expect(test).to.be.deep.equal([]);
    });
  });

  describe('#readOne()', () => {
    it('gera erro caso o model gere erro', async () => {
      sinon.stub(testModel, 'readOne').rejects();
      try {
        await testService.readOne(validID);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('gera erro caso o model não tenha o documento', async () => {
      sinon.stub(testModel, 'readOne').resolves(null);
      try {
        await testService.readOne(validID);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento na DB', async () => {
      sinon.stub(testModel, 'readOne').resolves({} as any);
      const test = await testService.readOne(validID);
      expect(test).to.be.deep.equal({});
    });
  });

  describe('#update()', () => {
    it('gera erro caso o model gere erro', async () => {
      sinon.stub(testModel, 'update').rejects();
      try {
        await testService.update(validID, validObject);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna null caso o model não tenha o documento', async () => {
      sinon.stub(testModel, 'update').resolves(null);
      try {
        await testService.update(validID, validObject);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento atualizado da DB', async () => {
      sinon.stub(testModel, 'update').resolves(validObject);
      const test = await testService.update(validID, validObject);
      expect(test).to.be.deep.equal(validObject);
    });
  });

  describe('#delete()', () => {
    it('gera erro caso o model gere erro', async () => {
      sinon.stub(testModel, 'delete').rejects();
      try {
        await testService.delete(validID);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna null caso o model não tenha o documento', async () => {
      sinon.stub(testModel, 'delete').resolves(null);
      try {
        await testService.delete(validID);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento removido da DB', async () => {
      sinon.stub(testModel, 'delete').resolves({} as any);
      const test = await testService.delete(validID);
      expect(test).to.be.deep.equal({});
    });
  });
});
