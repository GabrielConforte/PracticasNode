const express = require('express');
const contenedor = require('./controladores/contenedor');
let { config } = require('./config');
const app = express();

const PORT = config.port
const server = app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
const hbs = require('express-handlebars');

//app.use(express.static('public')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", hbs.engine());
app.set("views", "./views/hbs");
app.set('view engine', 'handlebars');


app.get('/', (req, res, next) =>  {
    res.render('formulario');
});

app.get('/productos', async (req, res, next) =>  {
    let productos = await contenedor.getAll();
    productos = JSON.parse(productos);
    res.render('listado', {productos});
});

app.post("/productos", async(req,res,next)=>{
    let producto = req.body;
    await contenedor.save(producto);
    res.redirect('/')});

//mensajes para errores del servidor
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});
app.use((req, res, next) => {
    res.status(404).json({ error: '404 - not found' });
});
app.use((err, req, res, next) => {
    res.status(401).json({ error: '401 - not authorized' });
});
app.use((err, req, res, next) => {
    res.status(403).json({ error: '403 - forbidden' });
});


server.on("error", error => console.log(error));

