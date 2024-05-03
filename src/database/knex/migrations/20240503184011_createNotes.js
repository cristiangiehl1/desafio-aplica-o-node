/*
    Criado após rodar o comando abaixo no terminal:
    > npx knex migrate:make createUsers

    Para criar a migration dentro da database devemos rodar o
    terminal abaixo:
    > npx knex migrate:latest
*/

exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("rating");

    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");

    table.timestamp("create_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());  
});

exports.down = knex => knex.schema.dropTable("notes");
