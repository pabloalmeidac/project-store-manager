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

    describe('#getById', () => {
      describe('Quando não existir dados do "id" na tabela', () => {
        before(() => {
          sinon.stub(productsModels, 'getById').resolves(productsMock.empty[0]);
        });

        after(() => {
          productsModels.getById.restore();
        });

        it('Retorna um array vazio', async () => {
          const products = await productsServices.getById(5);
          expect(products).to.be.an('array');
          expect(products).to.be.empty;
        });
      });

      describe('Quando existir dados do "id" na tabela', () => {
        before(() => {
          sinon.stub(productsModels, 'getById').resolves([productsMock.seachrById]);
        });

        after(() => {
          productsModels.getById.restore();
        });

        it('Retorna um array de objetos', async () => {
          const products = await productsServices.getById(4);
          
          expect(products).to.be.an('array');
          expect(products).not.to.be.empty;
          expect(products).to.be.deep.equal([productsMock.seachrById]);
        });
      });
    });

    describe('#create', () => {
      describe('Quando criar os dados na tabela', () => {
        before(() => {
          sinon.stub(productsModels, 'getAll').resolves(productsMock.full);
          sinon.stub(productsModels, 'create').resolves([productsMock.inserted]);
        });

        after(() => {
          productsModels.getAll.restore();
          productsModels.create.restore();
        });

        it('Retorna um objeto com os dados "id", "name", "quantity"', async () => {
          const { name, quantity } = productsMock.inserted;
          const product = await productsServices.create({ name, quantity });
          
          expect(product).to.deep.equal([productsMock.inserted]);
        });
      });
      describe('Quando não criar os dados na tabela', () => {
        before(() => {
          sinon.stub(productsModels, 'getAll').resolves(productsMock.full);
          sinon.stub(productsModels, 'create').resolves([productsMock.repeatName]);
        });

        after(() => {
          productsModels.getAll.restore();
          productsModels.create.restore();
        });

        it('Retorna um undefined', async () => {
          const { name, quantity } = productsMock.repeatName;
          const product = await productsServices.create({ name, quantity });
          
          expect(product).undefined;
        });
      });
    });

    describe('#update', () => {
      describe('Quando atualizar os dados do "id" na tabela', () => {
        before(() => {
          sinon.stub(productsModels, 'update').resolves(productsMock.updated);
        });

        after(() => {
          productsModels.update.restore();
        });

        it('Retorna um objeto atualizado', async () => {
          const { name, quantity } = productsMock.inserted;
          const products = await productsServices.update(1, { name, quantity });

          expect(products).not.to.be.empty;
          expect(products).to.be.deep.equal(productsMock.updated);
        });
      });
    });
  })
});