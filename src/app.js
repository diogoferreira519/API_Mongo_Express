import express from "express";
import conectaBanco from "./config/dbConnection.js";
import routes from "./Livros/Routes/index.js";
import manipuladorErros from "./middlewares/manipuladorErros.js";
import manipulador404 from "./middlewares/manipulador404.js";
const app = express();
routes(app);

app.use(manipulador404);
app.use(manipuladorErros)

const conexao = await conectaBanco();

conexao.on("error", (erro)=> {
    console.error("Erro de conexao", erro);
})

conexao.once("open", ()=> {
    console.log("conexao feita com sucesso"); 
})

export default app;