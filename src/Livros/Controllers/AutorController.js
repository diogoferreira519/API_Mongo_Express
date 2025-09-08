import { autor } from "../models/ModelAutor.js";

class AutorController {
    
    static async listarAutores(req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        }catch(erro) {
            res.status(500).json({message: `Erro ao listar autores ${erro.message}}`})
        }
    }

    static async autoresById(req, res) {
        try {
            const autorEncontrado = await autor.findById(req.params.id);
            res.status(200).json(autorEncontrado);
        } catch(erro) {
            res.status(500).json({message: `Erro ao procurar Autor ${erro.message}}`})
        }
    } 

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = autor.create(req.body);
            res.status(201).json({message: "Autor criado com sucesso", autor: novoAutor});
        } catch(erro) {
            res.status(500).json({message: `Erro ao cadastrar Autor ${erro.message}}`})
        }
    }

    static async deleteAutor(req, res) {
        try {
            await autor.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Autor deletado com sucesso"});
        } catch(erro) {
            res.status(500).json({message: `Erro ao deletar Autor ${erro.message}}`})
        }
    }

    static async atualizarAutor(req, res) {
        try {
            await autor.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({message: "Autor atualizado com sucesso"});
        } catch(erro) {
            res.status(500).json({message: `Erro ao atualizar Autor ${erro.message}}`})
        }
    } 
}
export default AutorController;