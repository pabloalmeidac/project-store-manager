/* const { expect } = require("chai");
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

    describe('#getById', () => {
      describe('Quando não existir dados do "id" na tabela', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves([productsMock.empty]);
        });

        after(() => {
          connection.execute.restore();
        });

        it('Retorna um array vazio', async () => {
          const products = await productsModels.getById(5);
          expect(products).to.be.an('array');
          expect(products).to.be.empty;
        });
      });

      describe('Quando existir dados do "id" na tabela', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves([[productsMock.seachrById],[]]);
        });

        after(() => {
          connection.execute.restore();
        });

        it('Retorna um objeto', async () => {
          const products = await productsModels.getById(4);

          expect(products).not.to.be.empty;
          expect(products).to.be.deep.equal(productsMock.seachrById);
        });
      });
    });

    describe('#create', () => {
      describe('Quando criar os dados na tabela', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves([{ insertId: productsMock.inserted.id }]);
        });

        after(() => {
          connection.execute.restore();
        });

        it('Retorna um objeto com os dados "id", "name", "quantity"', async () => {
          const { name, quantity } = productsMock.inserted;
          const product = await productsModels.create({ name, quantity });

          expect(product).to.deep.equal(productsMock.inserted);
      });
    });
  });

    describe('#update', () => {
      describe('Quando atualizar os dados do "id" na tabela', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves([[productsMock.updated],[]]);
          sinon.stub(productsModels, 'getById').resolves(productsMock.updated);
        });

        after(() => {
          connection.execute.restore();
          productsModels.getById.restore();
        });

        it('Retorna um objeto atualizado', async () => {
          const { name, quantity } = productsMock.inserted;
          const products = await productsModels.update(1, { name, quantity });

          expect(products).not.to.be.empty;
          expect(products).to.be.deep.equal(productsMock.updated);
        });
      });
    });
  });
}); */