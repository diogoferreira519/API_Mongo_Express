import livro from "../models/ModelLivro.js";
import {autor} from "../models/ModelAutor.js"

class LivroController {
    
    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            console.log(listaLivros)
            res.status(200).json(listaLivros);
        }catch(erro) {
            res.status(500).json({message: `Erro ao listar livros ${erro.message}}`})
        }
    }

    static async livroById(req, res) {
        try {
            const livroEncontrado = await livro.findById(req.params.id);
            res.status(200).json(livroEncontrado);
        } catch(erro) {
            res.status(500).json({message: `Erro ao procurar livro ${erro.message}}`})
        }
    } 

    static async cadastrarLivro(req, res) {
        try {
            const livroReq = req.body;
            
            const autorEncontrado = await autor.findById(livroReq.autor);

            if (!autorEncontrado) {
                res.status(201).json({message: "autor referenciado não encontrado"});
            }
            const livroCompleto = {...livroReq, autor: { ...autorEncontrado._doc}}

            console.log('livrocompleto' + JSON.stringify(livroCompleto));
            const novoLivro = await livro.create(livroCompleto);
            
            res.status(201).json({message: "livro criado com sucesso", livro: novoLivro});
        } catch(erro) {
            res.status(500).json({message: `Erro ao cadastrar livro ${erro.message}}`})
        }
    }

    static async deleteLivro(req, res) {
        try {
            await livro.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Livro deletado com sucesso"});
        } catch(erro) {
            res.status(500).json({message: `Erro ao deletar livro ${erro.message}}`})
        }
    }

    static async atualizarLivro(req, res) {
        try {
            await livro.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({message: "Livro atualizado com sucesso"});
        } catch(erro) {
            res.status(500).json({message: `Erro ao atualizar livro ${erro.message}}`})
        }
    }
    
    static async buscaLivroByDesc(req, res) {
        try {
            const livroEncontrado = await livro.find({ titulo: req.query.titulo});

            res.status(200).json(livroEncontrado);

        } catch(erro) {
            res.status(500).json({message: `Erro ao buscar livro ${erro.message}}`})
        }
    }
}
export default LivroController;