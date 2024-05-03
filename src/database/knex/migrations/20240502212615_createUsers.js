/*
    Criado após rodar o comando abaixo no terminal:
    > npx knex migrate:make createUsers

    Para criar a migration dentro da database devemos rodar o
    terminal abaixo:
    > npx knex migrate:latest
*/

exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("id");
    table.text("name");
    table.text("email");
    table.text("password");
    table.text("avatar").nullable();

    table.timestamp("create_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());  
});

exports.down = knex => knex.schema.dropTable("users");
