import mongoose from "mongoose";
import { autorSchema } from "./ModelAutor.js";
const minPag = 10;
const maxPage = 5000;
const msgErroPag = `É preciso estar entre ${minPag} e ${maxPage} paginas`;
const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId},
    titulo: {type: String, required: [true, "O titulo do livro é obrigatório"]},
    editora: {type: String, enum: {values: ["Casa", "Alura"], message: "Editora {VALUE} não permitida"}},
    preco: { type: Number},
    paginas: {type: Number, min: [minPag, msgErroPag], max: [maxPage, msgErroPag], required: [true, 'É preciso informar o número de páginas']},
    autor: autorSchema
}, {versionKey: false});

const livro = mongoose.model("livros", livroSchema);

export default livro;