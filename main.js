
//envuelve esto en un main asincrono


const express = require('express');
const moment = require('moment');
const contenedor = require('./contenedor');
const app = express();
const PORT = 3000;
let contador = 0;
app.get("/", (req, res, next) => {
    console.log(req)
    res.send("<h1 style='color:blue'> hola mundillo </h1>");
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


app.get("/productos", (req, res, next) => {
    contenedor.getAll().then(data => {
        let productos = JSON.parse(data);
        res.send(`<h1>Productos</h1>
        <ul>
            ${productos.map(producto => `<li>${producto.title} $${producto.price}</li>`).join('')}
        </ul>`);

    });

});
            
//la pagina productosRandom debe entregar un producto al azar del archivo contenedor.txt
app.get("/productosRandom", (req, res, next) => {
    contenedor.getAll().then(data => {
        let productos = JSON.parse(data);
        let random = Math.floor(Math.random() * productos.length);
        res.send(`<h1>Producto al azar</h1>
        <ul>
            <li>${productos[random].title} $${productos[random].price}</li>
        </ul>`);
    });
}); 

server.on("error", error => console.log(error));

