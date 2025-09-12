import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
    validator: (valor) => valor.trim() != "",
    message: ({ path }) => `O campo ${path} fornecido está em branco`
})