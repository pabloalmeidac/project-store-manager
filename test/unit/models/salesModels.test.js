const { expect } = require("chai");
const sinon = require('sinon');
const salesModels = require('../../../models/salesModels');
const connection = require('../../../models/connection');
const salesMock = require('../mocks/salesMock');

describe('Models', () => {
  describe('salesModels', () => {
    describe('#getAll', () => {
      describe('Quando não existir dados na tabela', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves(salesMock.empty);
        });

        after(() => {
          connection.execute.restore();
        });

        it('Retorna um array vazio', async () => {
          const products = await salesModels.getAll();

          expect(products).to.be.an('array');
          expect(products).to.be.empty;
        });
      });

      describe('Quando existir dados na tabela', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves([salesMock.full]);
        });

        after(() => {
          connection.execute.restore();
        });

        it('Retorna um array de objetos', async () => {
          const products = await salesModels.getAll();
          expect(products).to.be.an('array');
          expect(products).not.to.be.empty;
          expect(products).to.be.deep.equal(salesMock.full);
        });
      });
    });

    describe('#getById', () => {
      describe('Quando existir o "id" na tabela', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves([salesMock.seachrById,[]]);
        });

        after(() => {
          connection.execute.restore();
        });

        it('Retorna um objeto', async () => {
          const products = await salesModels.getById(1);
          expect(products).to.be.an('array');
          expect(products).not.to.be.empty;
          expect(products).to.be.deep.equal(salesMock.seachrById);
        });
      });
    });

    describe('#exclude', () => {
      describe('Quando excluir os do "id" na tabela', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves();
        });

        after(() => {
          connection.execute.restore();
        });

        it('Retorna um undefined', async () => {
          const products = await salesModels.exclude(2);
          
          expect(products).to.be.undefined;
        });
      });
    });
  })
});