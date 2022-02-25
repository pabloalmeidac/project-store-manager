const { expect } = require("chai");
const sinon = require('sinon');
const productsModels = require('../../../models/productsModels');
const connection = require('../../../models/connection');
const productsMock = require('../mocks/productsMock');

describe('Models', () => {
  describe('productsModels', () => {
    describe('#getAll', () => {
      describe('Quando não existir dados na tabela', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves(productsMock.empty);
        });

        after(() => {
          connection.execute.restore();
        });

        it('Retorna um array vazio', async () => {
          const products = await productsModels.getAll();
          expect(products).to.be.an('array');
          expect(products).to.be.empty;
        });
      });

      describe('Quando existir dados na tabela', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves([productsMock.full]);
        });

        after(() => {
          connection.execute.restore();
        });

        it('Retorna um array de objetos', async () => {
          const products = await productsModels.getAll();

          expect(products).to.be.an('array');
          expect(products).not.to.be.empty;
          expect(products).to.be.deep.equal(productsMock.full);
        });
      });
    });
  })
});