/*
  Primeiro devemos instalar o framework do knex.js 
  > npm install knex --save
  Depois o arquivo será criado automaticamente após 
  rodar o comando abaixo no terminal
  > npx knex init
  Usando o path de novo para resolver o caminho que está
  o arquivo de nossa database.

  Para utilizar as migrations devemos configurar dentro 
  deste arquivo.
  Para criar uma migrate para uma tabela devemos rodar o comando abaixo:
  > npx knex migrate:make createUsers
  > npx knex migrate:make createMovies_notes
  > npx knex migrate:make createMovies_tags

  Para habilitar a função de cascata das tabelas devemos colocar abaixo a config.
  do 'pool'.
*/

const path = require("path")

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")      
    },
    useNullAsDefault: true
  },
};
