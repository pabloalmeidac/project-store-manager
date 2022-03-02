const { expect } = require("chai");
const sinon = require('sinon');
const productsControllers = require('../../../controllers/productsControllers');
const productsServices = require('../../../services/productsServices');
const productsMock = require('../mocks/productsMock');
const productsSchema = require('../../../schemas/productsSchema');

describe('Controllers', () => {
  describe('productsControllers', () => {
    describe('#getAll', () => {
      describe('Quando não existir dados na tabela', () => {
        const req = {}, res = {}, next = {};
        const message = 'Product not found';

        before(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(productsServices, 'getAll').resolves(productsMock.empty[0]);
        });

        after(() => {
          productsServices.getAll.restore();
        })

        it('Responder um  status "404"', async () => {
          await productsControllers.getAll(req, res, next);
          expect(res.status.calledWith(404)).to.be.true;
        });

        it('Responder um json com a mensagem "Product not found"', async () => {
          await productsControllers.getAll(req, res, next);
          expect(res.json.calledWith({message})).to.be.true;
        });
      });

      describe('Quando existir dados na tabela', () => {
        const req = {}, res = {}, next = {};

        before(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(productsServices, 'getAll').resolves(productsMock.full);
        });

        after(() => {
          productsServices.getAll.restore();
        });

        it('Responder um  status "200"', async () => {
          await productsControllers.getAll(req, res, next);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it('Responder um json com body do objeto', async () => {
          await productsControllers.getAll(req, res, next);
          expect(res.json.calledWith(productsMock.full)).to.be.true;
        });
      });
    });
    
    describe('#getById', () => {
      describe('Quando não existir dados do "id" na tabela', () => {
        const req = {};
        const res = {};

        before(() => {
          const { id } = productsMock.inserted;
          req.params = { id };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(productsServices, 'getById').resolves();
        });

        after(() => {
          productsServices.getById.restore();
        });

        it('Responder um  status "404"', async () => {
          await productsControllers.getById(req, res);
          expect(res.status.calledWith(404)).to.be.true;
        });

        it('Responder um json com a mensagem "Product not found"', async () => {
          const message = 'Product not found';
          await productsControllers.getById(req, res);
          
          expect(res.json.calledWith({ message })).to.be.true;
        });
      });

      describe('Quando existir dados do "id" na tabela', () => {
        const req = {};
        const res = {};

        before(() => {
          const { id } = productsMock.inserted;
          req.params = { id };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(productsServices, 'getById').resolves(productsMock.inserted);
        });

        after(() => {
          productsServices.getById.restore();
        });

        it('Responder um  status "200"', async () => {
          await productsControllers.getById(req, res);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it('Responder um json com body do objeto', async () => {
          await productsControllers.getById(req, res);
          
          expect(res.json.calledWith(productsMock.inserted)).to.be.true;
        });
      });
    });
    
    describe('#create', () => {
      describe('Quando criar os dados na tabela', () => {
        const req = {};
        const res = {};

        before(() => {
          const { name, quantity } = productsMock.inserted;
          req.body = { name, quantity};

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(productsServices, 'create').resolves(productsMock.inserted);
        });

        after(() => {
          productsServices.create.restore();
        });

        it('Retorna um status code "201"', async () => {
          await productsControllers.create(req, res);
          expect(res.status.calledWith(201)).to.be.true;
        });
        it('Retorna um json contendo o objeto', async () => {
          await productsControllers.create(req, res);
          
          expect(res.json.calledWith(productsMock.inserted)).to.be.true;
        });
    });
      describe('Quando não criar os dados na tabela', async () => {
        const req = {};
        const res = {};

        before(() => {
          const { name, quantity } = productsMock.inserted;
          req.body = { name, quantity};

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(productsServices, 'create').resolves();
        });

        after(() => {
          productsServices.create.restore();
        });

        it('Retorna um status code "409"', async () => {
          await productsControllers.create(req, res);
          expect(res.status.calledWith(409)).to.be.true;
        });
        
        it('Retorna um json contendo a menssagem "Product already exists"', async () => {
          const message = 'Product already exists';
          await productsControllers.create(req, res);
          
          expect(res.json.calledWith({ message })).to.be.true;
        });
      });
    });

    /* describe('#update', () => {
      describe('Quando os dados do "id" não forem atualizados', () => {
        const req = {};
        const res = {};

        before(() => {
          const { id, name, quantity } = productsMock.inserted;

          req.params = { id };
          req.body = { name, quantity };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(productsServices, 'update').resolves(false);
        });

        after(() => {
          productsServices.update.restore();
        });

        it('Responder um  status "404"', async () => {
          await productsControllers.update(req, res);
          expect(res.status.calledWith(404)).to.be.true;
        });

        it('Responder um json com a mensagem "Product not found"', async () => {
          const message = 'Product not found';
          await productsControllers.update(req, res);
          
          expect(res.json.calledWith({ message })).to.be.true;
        });
      });
      describe('Quando existir dados do "id" na tabela', () => {
        const req = {};
        const res = {};

        before(() => {
          const { id, name, quantity } = productsMock.updated;
          req.params = { id };
          req.body = { name, quantity };
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(productsServices, 'update').resolves(productsMock.updated);
        });

        after(() => {
          productsServices.update.restore();
        });

        it('Responder um  status "200"', async () => {
          await productsControllers.update(req, res);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it('Responder um json com body do objeto', async () => {
          await productsControllers.update(req, res);
          
          expect(res.json.calledWith(productsMock.updated)).to.be.true;
        });
      });
    }); */
  })
});