/*
    Utilizando o AppError.js para padronizar qual 
    tipo de mensagem será exibida quando determinado
    erro acontecer.

    Lembrar de instalar a biblioteca express-async-errors
    para que os erros possam ser lidos. 
*/

class AppError {
    message;
    statusCode;

    constructor(message, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;