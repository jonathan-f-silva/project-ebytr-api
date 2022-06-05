/* eslint-disable sonarjs/no-duplicate-string */
import { expect, use, should } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import { layers } from '../../../app';

use(chaiAsPromised);
should();

const { model, service } = layers;

describe('Service', () => {
  beforeEach(sinon.restore);

  describe('#create()', () => {
    it('gera erro caso o model gere erro', async () => {
      sinon.stub(model, 'create').rejects();
      service.create({} as any)
        .should.eventually.be.rejected;
    });

    it('retorna o documento criado', async () => {
      sinon.stub(model, 'create').resolves({} as any);
      const test = await service.create({} as any);
      expect(test).to.be.deep.equal({});
    });
  });

  describe('#read()', () => {
    it('gera erro caso o model gere erro', async () => {
      sinon.stub(model, 'read').rejects();
      try {
        await service.read();
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna um array com todos os documentos', async () => {
      sinon.stub(model, 'read').resolves([]);
      const test = await service.read();
      expect(test).to.be.deep.equal([]);
    });
  });

  describe('#readOne()', () => {
    it('gera erro caso o model gere erro', async () => {
      sinon.stub(model, 'readOne').rejects();
      try {
        await service.readOne('1');
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('gera erro caso o model não tenha o documento', async () => {
      sinon.stub(model, 'readOne').resolves(null);
      try {
        await service.readOne('1');
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento na DB', async () => {
      sinon.stub(model, 'readOne').resolves({} as any);
      const test = await service.readOne('1');
      expect(test).to.be.deep.equal({});
    });
  });

  describe('#update()', () => {
    it('gera erro caso o model gere erro', async () => {
      sinon.stub(model, 'update').rejects();
      try {
        await service.update('1', {} as any);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna null caso o model não tenha o documento', async () => {
      sinon.stub(model, 'update').resolves(null);
      try {
        await service.update('1', {} as any);
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento atualizado da DB', async () => {
      sinon.stub(model, 'update').resolves({} as any);
      const test = await service.update('1', {} as any);
      expect(test).to.be.deep.equal({} as any);
    });
  });

  describe('#delete()', () => {
    it('gera erro caso o model gere erro', async () => {
      sinon.stub(model, 'delete').rejects();
      try {
        await service.delete('1');
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna null caso o model não tenha o documento', async () => {
      sinon.stub(model, 'delete').resolves(null);
      try {
        await service.delete('1');
        expect('não gerou erro').to.be.false;
      } catch (error) { expect(error).to.be.an('Error'); }
    });

    it('retorna o documento removido da DB', async () => {
      sinon.stub(model, 'delete').resolves({} as any);
      const test = await service.delete('1');
      expect(test).to.be.deep.equal({});
    });
  });
});
