import mongoose from "mongoose";
import 'dotenv/config'; 

const url = process.env.URL_LIVRARIA_CONNECTION;

async function conectaBanco() {
    mongoose.connect(url);

    return mongoose.connection;
};

export default conectaBanco;
