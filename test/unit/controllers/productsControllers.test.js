const sinon = require('sinon');
const { expect } = require('chai');
const productsControllers = require('../../../controllers/productsControllers');
const productsServices = require('../../../services/productsServices');
const data = require('../data');

describe('Listagem Controllers', () => {
  let request = {}, response = {}, next = {};
  
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe('Quando não existir produtos', async () => {
    before(() => {
      sinon.stub(productsServices, 'list').resolves([]);
    })

    after(() => {
      productsServices.list.restore();
    });

    it('Deve responder um status 404', async () => {
      await productsControllers.list(request, response, next);
      
      expect(response.status.calledWith(404)).to.be.equal(true);
    })
    it('Deve responder um json "Product not found"', async () => {
      const message = 'Product not found';
      await productsControllers.list(request, response, next);

      expect(response.json.calledWith({ message })).to.be.equal(true);
    })
  });

  describe('Quando existir produtos', () => {
    before(() => {
      sinon.stub(productsServices, 'list').resolves([data]);
    });

    after(() => {
      productsServices.list.restore();
    });

    it('Deve responder um status 200', async () => {
      await productsControllers.list(request, response, next);
      
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Deve responder um json com o(s) objeto(s)', async () => {
      await productsControllers.list(request, response, next);
      
      expect(response.json.calledWith('array')).to.be.equal(true);
    });
  })
});