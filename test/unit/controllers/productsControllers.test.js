const { expect } = require("chai");
const sinon = require('sinon');
const productsControllers = require('../../../controllers/productsControllers');
const productsServices = require('../../../services/productsServices');
const productsMock = require('../mocks/productsMock');

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
  })
});