class ErroBase extends Error {
    constructor(message = 'Erro interno do servidor', status) {
        super();
        this.message = message;
        this.status = status;
    }
    
    enviarResposta(res) {
        res.status(this.status).send({mensagem: this.message, status: this.status});
    }
}

export default ErroBase;