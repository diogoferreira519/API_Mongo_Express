import express from 'express';
import livros from '../Routes/livroRoutes.js';
import autores from '../Routes/autorRoutes.js'

const routes = (app) => {
    app.route("/").get((req,res)=> {
        res.status(200).send("Curso nodejs");
    });

    app.use(express.json(), livros, autores);
}

export default routes;
