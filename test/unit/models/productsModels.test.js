const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');
const data = require('../data');

  describe('Listagem Model', () => {
    describe('Quando não existir produtos', () => {
      before(async () => {
        const result = [[],[]];

        sinon.stub(connection, 'execute').resolves(result);
      })
    
      after(async () => {
        connection.execute.restore();
      })

      it('Retorna um array vazio', async () => {
        const products = await productsModel.list();
        
        expect(products).to.be.an('array');
        expect(products).to.be.an.empty;
      })
    });

    describe('Quando existir produtos', () => {
      before(async () => {
        const result = [[data],[]];
        sinon.stub(connection, 'execute').resolves(result);
      })
    
      after(async () => {
        connection.execute.restore();
      })
  
      it('Retorna um array de objetos', async () => {
        const products = await productsModel.list();
  
        expect(products).to.be.an('array');
        expect(products).not.to.be.an.empty;
        products.forEach((p) => expect(p).to.be.an('object'));
      });
    })
  });

  