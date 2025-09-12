import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor(erro) {

        const msgErro = Object.values(erro.errors).map(err => err.message).join("; ");

        super(`Erro de validação de dados: ${msgErro} `);
    }
}

export default ErroValidacao;