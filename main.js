const express = require('express');
const moment = require('moment');
const app = express();//crea una instancia de express, lo inicializa
const PORT = 9000;
let contador = 0;
app.get("/", (req, res, next) => {
    console.log(req)
    res.send("<h1 style='color:blue'> hola mundo </h1>");
    });
app.get("/visitas",(req,res,next)=>{
    contador++;
    res.send(`Hoy tuvimos ${contador} visitas`);
    });

app.get("/fyh", (req, res, next) => {
    res.json({fyh: moment().format("YYYY-MM-DD HH:mm:ss")});
    });


const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on("error", error => console.log(error));

