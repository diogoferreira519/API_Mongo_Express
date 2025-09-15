import NaoEncontrado from "../Erros/NãoEncontrado.js";

async function paginacao (req, res, next) {
    try {
        let { limite = 5, paginas = 1, ordenacao = '_id:-1' } = req.query; 

        limite = parseInt(limite);
        paginas = parseInt(paginas);

        let [orderField, order] = ordenacao.split(':');

        if (paginas == 0 && limite == 0) {
            next(new NaoEncontrado('Paginação e limite errados'));
        }

        const resultadoPaginado = await req.resultado.find()
            .sort({[orderField]: order})
            .skip((paginas -1) * limite)
            .limit(limite)
            .exec();
        if (!resultadoPaginado) {
            next(new NaoEncontrado('Não encontrado lista de registros'));
        }

        res.status(200).json(resultadoPaginado);
    } catch(error) {
        next(error)
    }
}

export default paginacao;