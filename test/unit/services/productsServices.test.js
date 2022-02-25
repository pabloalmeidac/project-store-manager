const { expect } = require("chai");
const sinon = require('sinon');
const productsServices = require('../../../services/productsServices');
const productsModels = require('../../../models/productsModels');
const productsMock = require('../mocks/productsMock');

describe('Services', () => {
  describe('productsServices', () => {
    describe('#getAll', () => {
      describe('Quando não existir dados na tabela', () => {
        before(() => {
          sinon.stub(productsModels, 'getAll').resolves(productsMock.empty[0]);
        });

        after(() => {
          productsModels.getAll.restore();
        });

        it('Retorna um array vazio', async () => {
          const products = await productsServices.getAll();
          expect(products).to.be.an('array');
          expect(products).to.be.empty;
        });
      });

      describe('Quando existir dados na tabela', () => {
        before(() => {
          sinon.stub(productsModels, 'getAll').resolves(productsMock.full);
        });

        after(() => {
          productsModels.getAll.restore();
        });

        it('Retorna um array de objetos', async () => {
          const products = await productsServices.getAll();

          expect(products).to.be.an('array');
          expect(products).not.to.be.empty;
          expect(products).to.be.deep.equal(productsMock.full);
        });
      });
    });
  })
});