import express from "express";
import conectaBanco from "./config/dbConnection.js";
import routes from "./Livros/Routes/index.js";
const app = express();
routes(app);

const conexao = await conectaBanco();

conexao.on("error", (erro)=> {
    console.error("Erro de conexao", erro);
})

conexao.once("open", ()=> {
    console.log("conexao feita com sucesso"); 
})

export default app;