require('dotenv').config();
const express = require('express');
const productsControllers = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesControllers');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsControllers.list);
app.get('/products/:id', productsControllers.getById);

app.get('/sales', salesControllers.list);
app.get('/sales/:id', salesControllers.getById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
