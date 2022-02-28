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

app.get('/products', productsControllers.getAll);
app.get('/products/:id', productsControllers.getById);

app.get('/sales', salesControllers.getAll);
app.get('/sales/:id', salesControllers.getById);

app.post('/products', productsControllers.create);
app.post('/sales', salesControllers.create);

app.put('/products/:id', productsControllers.update);

app.delete('/products/:id', productsControllers.exclude);
app.delete('/sales/:id', salesControllers.exclude);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
