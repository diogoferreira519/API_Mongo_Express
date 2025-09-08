import http from 'http';
import app from './src/app.js';
// const rotas = {
//     "/" : "meu curso de nodsss",
//     "/rota" : "essa e uma rota"
// }

// const server = http.createServer((req, res)=> {
//     res.writeHead(200, {
//         "Content-Type": "text/plain"
//     });

//     res.end(rotas[req.url]);
// });

app.listen(3001, ()=> {
    console.log("servidor escutando");
})