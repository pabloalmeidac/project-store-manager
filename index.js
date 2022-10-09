require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');
const { productsRouter } = require('./controllers/productsControllers');
const { salesRouter } = require('./controllers/salesControllers');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
