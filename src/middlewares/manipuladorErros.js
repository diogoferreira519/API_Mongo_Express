/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import ErroBase from "../Erros/ErroBase.js";
import RequisicaoIncorreta from "../Erros/RequisicaoIncorreta.js";
import ErroValidacao from "../Erros/ErroValidacao.js";
import NaoEncontrado from "../Erros/NãoEncontrado.js";

function manipuladorErros(erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError) {
       new RequisicaoIncorreta('Um ou mais dados estão incorretos').enviarResposta(res);
    }
    else if (erro instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(erro).enviarResposta(res);
    }
    else if (erro instanceof NaoEncontrado) {
        erro.enviarResposta(res);
    }

    new ErroBase(`Erro do servidor ${erro.message}}`, 500).enviarResposta(res);
}

export default manipuladorErros;