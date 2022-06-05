/* eslint-disable sonarjs/no-duplicate-string */
import { use, expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import { layers } from '../../../app';

const { model } = layers;

use(sinonChai);
use(chaiAsPromised);

describe('MongoModel', () => {
  beforeEach(sinon.restore);

  describe('#create()', () => {
    it('gera erro caso a DB gere erro', async () => {
      sinon.stub(model.dao, 'create').rejects();
      expect(model.create({} as any)).eventually.be.rejected;
    });

    it('retorna o documento criado', async () => {
      sinon.stub(model.dao, 'create').resolves({} as any);
      const test = await model.create({} as any);
      expect(test).to.be.deep.equal({});
    });
  });

  describe('#read()', () => {
    it('gera erro caso a DB gere erro', async () => {
      sinon.stub(model.dao, 'find').rejects();
      expect(model.read()).eventually.be.rejected;
    });

    it('retorna um array com todos os documentos', async () => {
      sinon.stub(model.dao, 'find').resolves([]);
      const test = await model.read();
      expect(test).to.be.deep.equal([]);
    });
  });

  describe('#readOne()', () => {
    it('gera erro caso a DB gere erro', async () => {
      sinon.stub(model.dao, 'findOne').rejects();
      expect(model.readOne('1')).eventually.be.rejected;
    });

    it('retorna null caso a DB não tenha o documento', async () => {
      sinon.stub(model.dao, 'findOne').resolves(null);
      const test = await model.readOne('1');
      expect(test).to.be.equal(null);
    });

    it('retorna o documento na DB', async () => {
      sinon.stub(model.dao, 'findOne').resolves({} as any);
      const test = await model.readOne('1');
      expect(test).to.be.deep.equal({});
    });
  });

  describe('#update()', () => {
    it('gera erro caso a DB gere erro', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').rejects();
      expect(model.update('1', {} as any)).eventually.be.rejected;
    });

    it('retorna null caso a DB não tenha o documento', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').resolves(null);
      const test = await model.update('1', {} as any);
      expect(test).to.be.equal(null);
    });

    it('retorna o documento atualizado da DB', async () => {
      sinon.stub(model.dao, 'findByIdAndUpdate').resolves({} as any);
      const test = await model.update('1', {} as any);
      expect(test).to.be.deep.equal({});
      expect(model.dao.findByIdAndUpdate)
        .to.have.been.calledWith('1', {} as any, { new: true });
    });
  });

  describe('#delete()', () => {
    it('gera erro caso a DB gere erro', async () => {
      sinon.stub(model.dao, 'findByIdAndDelete').rejects();
      expect(model.delete('1')).eventually.be.rejected;
    });

    it('retorna null caso a DB não tenha o documento', async () => {
      sinon.stub(model.dao, 'findByIdAndDelete').resolves(null);
      const test = await model.delete('1');
      expect(test).to.be.equal(null);
    });

    it('retorna o documento removido da DB', async () => {
      sinon.stub(model.dao, 'findByIdAndDelete').resolves({} as any);
      const test = await model.delete('1');
      expect(test).to.be.deep.equal({});
    });
  });
});
