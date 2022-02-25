const { expect } = require('chai');
const sinon = require('sinon');
const productsServices = require('../../../services/productsServices');
const productsModel = require('../../../models/productsModel');
const data = require('../data');

describe('Listagem Services', () => {
  describe('Quando não existir produtos', () => {
    before(() => {
      sinon.stub(productsModel, 'list').resolves([]);
    });

    after(() => {
      productsModel.list.restore();
    });

    it('Retorna um array vazio', async () => {
      const products = await productsServices.list();
      
      expect(products).to.be.an('array');
      expect(products).to.be.an.empty;
    })
  });

  describe('Quando existir produtos', () => {
    before(() => {
      sinon.stub(productsModel, 'list').resolves([data]);
    });

    after(() => {
      productsModel.list.restore();
    });

    it('Retorna um array de objetos', async () => {
      const products = await productsServices.list();

      expect(products).to.be.an('array');
      expect(products).not.to.be.an.empty;
      products.forEach((p) => expect(p).to.be.an('object'));
    });
  })
});