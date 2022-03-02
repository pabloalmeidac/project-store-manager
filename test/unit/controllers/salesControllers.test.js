const { expect } = require("chai");
const sinon = require('sinon');
const salesControllers = require('../../../controllers/salesControllers');
const salesServices = require('../../../services/salesServices');
const salesMock = require('../mocks/salesMock');

describe('Controllers', () => {
  describe('salesControllers', () => {
    describe('#getAll', () => {
      describe('Quando não existir dados na tabela', () => {
        const req = {}, res = {}, next = {};
        const message = 'Sale not found';

        before(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(salesServices, 'getAll').resolves(salesMock.empty[0]);
        });

        after(() => {
          salesServices.getAll.restore();
        })

        it('Responder um  status "404"', async () => {
          await salesControllers.getAll(req, res, next);
          expect(res.status.calledWith(404)).to.be.true;
        });

        it('Responder um json com a mensagem "Sale not found"', async () => {
          await salesControllers.getAll(req, res, next);
          expect(res.json.calledWith({message})).to.be.true;
        });
      });

      describe('Quando existir dados na tabela', () => {
        const req = {}, res = {}, next = {};

        before(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(salesServices, 'getAll').resolves(salesMock.fullFormated);
        });

        after(() => {
          salesServices.getAll.restore();
        });

        it('Responder um  status "200"', async () => {
          await salesControllers.getAll(req, res, next);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it('Responder um json com body do objeto', async () => {
          await salesControllers.getAll(req, res, next);
          expect(res.json.calledWith(salesMock.fullFormated)).to.be.true;
        });
      });
    });
  })
});