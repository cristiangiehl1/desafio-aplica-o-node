/*
    Devemos instalar no terminal a biblioteca hash para criptografar a 
    senha.
    > npm install bcryptjs --save
*/

// Importando a função hash do bcryptjs
const { hash, compare } = require("bcryptjs");
 
const AppError = require("../utils/AppError")

const sqliteConneciton = require("../database/sqlite")

class UsersController {

    async create(request, response) {
        const { name, email, password } = request.body;

        if(!name || !email || !password) {            
            throw new AppError("Preencha os campos obrigatórios.")
        }

        // criando a conexão com o banco de dados.
        const database = await sqliteConneciton();
        const checkUserExists = await database
            .get("SELECT * FROM users WHERE email = (?)", [email]);

        if(checkUserExists) {            
            throw new AppError("Este e-mail já está em uso.");
        };

        // para a função hash devemos passar a senha e o fator de complexidade
        const hashedPassword = await hash(password, 8)

        await database
            .run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
            [name, email, hashedPassword]);

        return response.status(201).json();
    };

    async delete(request, response) {
        const { id } = request.query;

        const database = await sqliteConneciton();
        const checkUserExists = await database
        .get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!checkUserExists) {            
            throw new AppError("Usuário não encontrado.")
        }

        await database.run("DELETE FROM users WHERE id = (?)", [id])

        return response.status(201).json();
    };

    async update(request, response) {
        const { name, email, avatar, password, old_password } = request.body;
        const { id } = request.query;

        const database = await sqliteConneciton();

        // Seleciona o usuário na database com o id informado.
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

        // Se o usuário não existir emite uma mensagem de erro.
        if(!user) {
            throw new AppError("Usuário não encontrado.")
        }

        // Seleciona na database os dados do usuário com o e-mail informado.
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        /*
            Verifica se o e-mail que está sendo atualizado está 
            cadastrado em outro usuário caso o id do e-mail informado
            no request.body seja diferente do id do objeto 
            userWithUpdatedEmail.
        */ 
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Esse e-mail já está em uso.")
        }

        user.name = name ?? user.name;
        user.email = email ?? email.name;

        if(password && !old_password) {
            throw new AppError("A senha antiga precisa ser informada.")
        };

        if(password && old_password) {
            /* 
                compara a senha antiga informada 
                pelo usuário com a senha registrada na tabela users
            */ 
            const checkOldPassword = await compare(old_password, user.password)

            // se a senha não coincidir emite um error.
            if(!checkOldPassword) {
                throw new AppError("A senha antiga não confere.")
            }

            /* 
                compara a senha nova informada 
                pelo usuário com a senha registrada na tabela users
            */ 
            const checkNewPassword = await compare(password, user.password)
            
            // se as senhas conincidirem emite um error.
            if(checkNewPassword) {
                throw new AppError("A senha nova deve ser diferente da antiga.")
            }
            user.password = await hash(password, 8)
        };

        let dotIndex = avatar.lastIndexOf('.')
        const avatarFileType = avatar.substring(dotIndex + 1);        

        // só executa o segundo if se o arquivo  de foto for passado
        if (avatarFileType) {
            if(avatarFileType !== 'jpeg' && avatarFileType !== 'png') {
                throw new AppError("A foto precisa ser um arquivo jpeg ou png")
            };
        };

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')   
            WHERE id = ?`,
            [user.name, user.email, user.password, id]
        );
        return response.json();
    };
}

module.exports = UsersController;