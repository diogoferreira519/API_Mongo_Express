import express from 'express';
import LivroController from '../Controllers/LivroController.js';

const routes = express.Router();

routes.get('/', (req,res)=> {
    res.status(200).send('opaaa');
})

routes.get('/livros',LivroController.listarLivros);

routes.get('/livros/busca',LivroController.buscaLivroByDesc);

routes.get('/livros/:id', LivroController.livroById);

routes.post('/livros', LivroController.cadastrarLivro)

routes.put('/livros/:id', LivroController.atualizarLivro)

routes.delete('/livros/:id', LivroController.deleteLivro)

export default routes;