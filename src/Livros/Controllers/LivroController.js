import { autor, livro } from "../models/index.js";
import NaoEncontrado from "../../Erros/NãoEncontrado.js";

class LivroController {
    
    static async listarLivros(req, res, next) {
        try {
            const buscaLivros = await livro.find();
            req.resultado = buscaLivros;
            next();
        }catch(erro) {
            next(erro);
        }
    }

    static async livroById(req, res, next) {
        try {
            const livroEncontrado = await livro.findById(req.params.id);

            if (!livroEncontrado) {
                next(new NaoEncontrado('Id do Autor não encontrado'))
            }
            res.status(200).json(livroEncontrado);
        } catch(erro) {
            next(erro);
        }
    } 

    static async cadastrarLivro(req, res, next) {
        try {
            const livroReq = req.body;
            
            const autorEncontrado = await autor.findById(livroReq.autor);

            if (!autorEncontrado) {
                next(new NaoEncontrado("autor referenciado não encontrado"))
            }
            const livroCompleto = {...livroReq, autor: { ...autorEncontrado._doc}}

            const novoLivro = await livro.create(livroCompleto);
            
            res.status(201).json({message: "livro criado com sucesso", livro: novoLivro});
        } catch(erro) {
            next(erro);
        }
    }

    static async deleteLivro(req, res, next) {
        try {
            const livro = await livro.findByIdAndDelete(req.params.id);

            if (!livro) {
                next(new NaoEncontrado('Id do livro não encontrado'));
            }
            res.status(200).json({message: "Livro deletado com sucesso"});
        } catch(erro) {
            next(erro);
        }
    }

    static async atualizarLivro(req, res, next) {
        try {
            const livro = await livro.findByIdAndUpdate(req.params.id, req.body);

            if (!livro) {
                next(new NaoEncontrado('Id do livro não encontrado'));
            }

            res.status(200).json({message: "Livro atualizado com sucesso"});
        } catch(erro) {
            next(erro);
        }
    }
    
    static async buscaLivroPorFiltro(req, res, next) {
        try {
            const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = req.query;

            const regex = new RegExp(titulo, "i");

            console.log(regex);

            let busca = {};

            if (editora) busca.editora = editora;
            if (titulo) busca.titulo = regex;
            if (minPaginas && maxPaginas) busca.paginas = { $gte: minPaginas, $lte: maxPaginas};
            if (minPaginas) busca.paginas = { $gte: minPaginas};
            if (maxPaginas) busca.paginas = { $lte: maxPaginas};
            if (nomeAutor) {
                const autorEncontrado = await autor.findOne({ nome: nomeAutor});
             
                if (!autorEncontrado) {
                    next(new NaoEncontrado('Descrição do autor não encontrada'));
                }

                busca.autor = autorEncontrado;
            }
            
            const livroEncontrado = await livro.find(busca);

            if (!livroEncontrado) {
                next(new NaoEncontrado('Descrição do livro não encontrada'));
            }

            res.status(200).json(livroEncontrado);

        } catch(erro) {
            next(erro);
        }
    }
}
export default LivroController;