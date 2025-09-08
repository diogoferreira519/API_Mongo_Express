import express from 'express';
import AutorController from '../Controllers/AutorController.js';

const routes = express.Router();

routes.get('/', (req,res)=> {
    res.status(200).send('opaaa');
})

routes.get('/autores',AutorController.listarAutores);

routes.get('/autores/:id', AutorController.autoresById);

routes.post('/autores', AutorController.cadastrarAutor)

routes.put('/autores/:id', AutorController.atualizarAutor)

routes.delete('/autores/:id', AutorController.deleteAutor)

export default routes;