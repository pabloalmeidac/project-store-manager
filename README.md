# Store Manager API

Este repositório foi criado para colocar em prática os conhecimentos adquiridos no curso de Desenvolvimento Web da Trybe de um projeto do bloco de Back-end.

# Objetivo do projeto
Construir um sistema de gerenciamento de vendas utilizando arquitetura MSC, onde será possível criar, visualizar, deletar e atualizar produtos e vendas.
Sendo capaz de:

- Entender o funcionamento da camada de Model;
- Delegar responsabilidades específicas para essa camada;
- Conectar sua aplicação com diferentes bancos de dados;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do seu app;
- Melhorar manutenibilidade e reusabilidade do seu código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis.

# Instruções para rodar localmente:

1. Clone o repositório
  * `git clone git@github.com:pabloalmeidac/project-store-manager.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `project-store-manager`

2. Instale as dependências 
  * `npm install`

3. Conexão com o Banco:

**⚠️ IMPORTANTE! ⚠️**

```javascript
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
```
Para os testes rodarem corretamente, na raiz do projeto **renomeie o arquivo `.env.example` para `.env`** com as variáveis de ambiente. Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo ficará desta forma:

```sh
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3000
```

**Nota**: A variável **PORT** do arquivo `.env` deve ser utilizada para a conexão com o servidor. É importante utilizar essa variável para os testes serem executados corretamente na máquina local

Existe um arquivo chamado `StoreManager` que tem o codigo completo para criar e inserir dados na banco.

4. Para iniciar a api é só rodar o comando:
  * `npm run start`

# Tecnologias utilizadas
  * `Nodejs`
  * `Javascript`
  * `MySQL`
  * `Express`
  * `Mocha`
  * `Chai`
  * `Sinon`
  * `Joi`
  * `Dotenv`
  
# Autor
  Pablo Almeida
