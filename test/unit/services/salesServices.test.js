const { expect } = require("chai");
const sinon = require('sinon');
const salesServices = require('../../../services/salesServices');
const salesModels = require('../../../models/salesModels');
const salesMock = require('../mocks/salesMock');

describe('Services', () => {
  describe('salesServices', () => {
    describe('#getAll', () => {
      describe('Quando não existir dados na tabela', () => {
        before(() => {
          sinon.stub(salesModels, 'getAll').resolves(salesMock.empty[0]);
        });

        after(() => {
          salesModels.getAll.restore();
        });

        it('Retorna um array vazio', async () => {
          const sales = await salesServices.getAll();
          expect(sales).to.be.an('array');
          expect(sales).to.be.empty;
        });
      });

      describe('Quando existir dados na tabela', () => {
        before(() => {
          sinon.stub(salesModels, 'getAll').resolves(salesMock.full);
        });

        after(() => {
          salesModels.getAll.restore();
        });
  
        it('Retorna um array de objetos', async () => {
          const sales = await salesServices.getAll();

          expect(sales).to.be.an('array');
          expect(sales).not.to.be.empty;
          expect(sales).to.be.deep.equal(salesMock.fullFormated);
        });
      });
    });

    describe('#getById', () => {
      describe('Quando não existir dados na tabela', () => {
        before(() => {
          sinon.stub(salesModels, 'getById').resolves(salesMock.empty[0]);
        });

        after(() => {
          salesModels.getById.restore();
        });

        it('Retorna um array vazio', async () => {
          const sales = await salesServices.getById(1);
          expect(sales).to.be.an('array');
          expect(sales).to.be.empty;
        });
      });

      describe('Quando existir dados na tabela', () => {
        before(() => {
          sinon.stub(salesModels, 'getById').resolves(salesMock.seachrByIdNotFormated);
        });

        after(() => {
          salesModels.getById.restore();
        });
  
        it('Retorna um array de objetos', async () => {
          const sales = await salesServices.getById(1);

          expect(sales).to.be.an('array');
          expect(sales).not.to.be.empty;
          expect(sales).to.be.deep.equal(salesMock.seachrById);
        });
      });
    });
  })
});