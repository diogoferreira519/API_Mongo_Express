import NaoEncontrado from "../../Erros/NãoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {
    
    static async listarAutores(req, res, next) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        }catch(erro) {
            next(erro);
        }
    }

    static async autoresById(req, res, next) {
        try {
            const autorEncontrado = await autor.findById(req.params.id);

            if (!autorEncontrado) {
                next(new NaoEncontrado('ID do autor não encontrado'));
            }
            res.status(200).json(autorEncontrado);
        } catch(erro) {
            next(erro);
        }
    } 

    static async cadastrarAutor(req, res, next) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({message: "Autor criado com sucesso", autor: novoAutor});
        } catch(erro) {
            next(erro);
        }
    }

    static async deleteAutor(req, res, next) {
        try {
            await autor.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Autor deletado com sucesso"});
        } catch(erro) {
             next(erro);
        }
    }

    static async atualizarAutor(req, res, next) {
        try {
            await autor.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({message: "Autor atualizado com sucesso"});
        } catch(erro) {
            next(erro);
        }
    } 
}
export default AutorController;