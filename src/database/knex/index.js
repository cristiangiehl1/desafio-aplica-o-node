// importando as configurações do knex do nosso arquivo knexfile.js
const config = require("../../../knexfile");

// importando o knex.
const knex = require("knex");


// criando a conexão pegando dentro do objeto no knexfile.js o connection
const connection = knex(config.development);

module.exports = connection;
