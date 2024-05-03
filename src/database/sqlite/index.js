/*
    Lembrar de instalar o sqlite3 sqlite para poder utilizar.
    > npm install sqlite3 sqlite --save.
    Depois disso importar as bibliotecas do sqlite.
*/

const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path")

async function sqliteConneciton() {
    /*
        Com a função '.open' devemos passar um objeto com as 
        configs. da nossa conexão:
        1) onde quero salvar o arquivo da database utilizando a
        propriedade 'filename'. Vamos utilizar a biblioteca 'path' nativa d
        o node para que não aja conflito na hora de achar o caminho de criação do arquivo com a
        mudança de sistema operacional.
        2) Qual a versão que será utilizada do driver.
    */ 
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database      
    });
    return database    
}

module.exports = sqliteConneciton;

