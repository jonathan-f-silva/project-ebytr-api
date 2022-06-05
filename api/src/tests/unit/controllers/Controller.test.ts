/* eslint-disable sonarjs/no-duplicate-string */
import { expect } from 'chai';
import sinon from 'sinon';
import { layers } from '../../../app';
import { validTodo, validID } from '../../mocks/TodoMocks';

const { service, controller } = layers;

describe('Controller', () => {
  beforeEach(sinon.restore);

  describe('#create()', () => {
    it('gera erro caso o service gere erro', async () => {
      sinon.stub(service, 'create').rejects();
      try {
        await controller.create(validTodo);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento criado', async () => {
      sinon.stub(service, 'create').resolves(validTodo);
      const test = await controller.create(validTodo);
      expect(test).to.be.deep.equal(validTodo);
    });
  });

  describe('#read()', () => {
    it('gera erro caso o service gere erro', async () => {
      sinon.stub(service, 'read').rejects();
      try {
        await controller.read();
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna um array com todos os documentos', async () => {
      sinon.stub(service, 'read').resolves([]);
      const test = await controller.read();
      expect(test).to.be.deep.equal([]);
    });
  });

  describe('#readOne()', () => {
    it('gera erro caso o service gere erro', async () => {
      sinon.stub(service, 'readOne').rejects();
      try {
        await controller.readOne(validID);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento na DB', async () => {
      sinon.stub(service, 'readOne').resolves(validTodo as any);
      const test = await controller.readOne(validID);
      expect(test).to.be.deep.equal(validTodo);
    });
  });

  describe('#update()', () => {
    it('gera erro caso o service gere erro', async () => {
      sinon.stub(service, 'update').rejects();
      try {
        await controller.update(validID, validTodo);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento atualizado da DB', async () => {
      sinon.stub(service, 'update').resolves(validTodo as any);
      const test = await controller.update(validID, validTodo);
      expect(test).to.be.deep.equal(validTodo);
    });
  });

  describe('#delete()', () => {
    it('gera erro caso o service gere erro', async () => {
      sinon.stub(service, 'delete').rejects();
      try {
        await controller.delete(validID);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento removido da DB', async () => {
      sinon.stub(service, 'delete').resolves(validTodo as any);
      const test = await controller.delete(validID);
      expect(test).to.be.deep.equal(validTodo);
    });
  });
});
