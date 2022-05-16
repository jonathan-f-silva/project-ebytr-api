/* eslint-disable sonarjs/no-duplicate-string */
import { expect } from 'chai';
import sinon from 'sinon';

import { testController, testService, validObject } from '../../mocks/TestMocks';

const validID = '62620d6c9162997790a96412';

describe('Controller', () => {
  beforeEach(sinon.restore);

  describe('#create()', () => {
    it('gera erro caso o service gere erro', async () => {
      sinon.stub(testService, 'create').rejects();
      try {
        await testController.create(validObject);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento criado', async () => {
      sinon.stub(testService, 'create').resolves(validObject);
      const test = await testController.create(validObject);
      expect(test).to.be.deep.equal(validObject);
    });
  });

  describe('#read()', () => {
    it('gera erro caso o service gere erro', async () => {
      sinon.stub(testService, 'read').rejects();
      try {
        await testController.read();
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna um array com todos os documentos', async () => {
      sinon.stub(testService, 'read').resolves([]);
      const test = await testController.read();
      expect(test).to.be.deep.equal([]);
    });
  });

  describe('#readOne()', () => {
    it('gera erro caso o service gere erro', async () => {
      sinon.stub(testService, 'readOne').rejects();
      try {
        await testController.readOne(validID);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento na DB', async () => {
      sinon.stub(testService, 'readOne').resolves(validObject as any);
      const test = await testController.readOne(validID);
      expect(test).to.be.deep.equal(validObject);
    });
  });

  describe('#update()', () => {
    it('gera erro caso o service gere erro', async () => {
      sinon.stub(testService, 'update').rejects();
      try {
        await testController.update(validID, validObject);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento atualizado da DB', async () => {
      sinon.stub(testService, 'update').resolves(validObject as any);
      const test = await testController.update(validID, validObject);
      expect(test).to.be.deep.equal(validObject);
    });
  });

  describe('#delete()', () => {
    it('gera erro caso o service gere erro', async () => {
      sinon.stub(testService, 'delete').rejects();
      try {
        await testController.delete(validID);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento removido da DB', async () => {
      sinon.stub(testService, 'delete').resolves(validObject as any);
      const test = await testController.delete(validID);
      expect(test).to.be.deep.equal(validObject);
    });
  });
});
