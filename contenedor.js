/*
    Implementar programa que contenga una clase llamada contened
    el nombre del archivo con el que va a trabajar e implemente los siguinetes
    metodos

    save(Object): number - Recibe un objeto y lo guarda en el archivo, devuelve el id del objeto
    getById(number): Object - Recibe un id y devuelve el objeto que corresponde o null si no existe
    getAll(): Object[] - Devuelve un arreglo con todos los objetos
    deleteById(number): void - Recibe un id y elimina el objeto que corresponde o false si no existe
    deleteAll(): void - Elimina todos los objetos
*/


const fs = require('fs');
const archivoTxt = 'productos.txt';

class Contenedor {

    //guarda un objeto en el archivo
    async save(objeto) {
        try{
            let contenedor = await this.getAll();
                contenedor = JSON.parse(contenedor);
                //agrega un id al objeto a partir del id del ultimo objeto de contenedor
                const max = contenedor.reduce((a,b) => a.id > b.id ? a:b, {id: 0} )
                objeto.id = max.id + 1;
                contenedor.push(objeto);
                let json = JSON.stringify(contenedor);
                await fs.promises.writeFile(archivoTxt, json);
            return objeto.id;
        }catch(error){
            console.log(error);
        }
    }

    //devuelve un objeto por id
    async getById(id) {
        try{
            let contenedor = await this.getAll();
            contenedor = JSON.parse(contenedor);
            let objeto = contenedor.find(obj => obj.id == id);

            if(objeto!=undefined){
                return objeto;
            }
            else{
                return 'no existe el objeto';
            }
        }catch(error){
            console.log(error);
        }
        
    }

    //devuelve un arreglo con todos los objetos
    async getAll() { if (!fs.existsSync(archivoTxt)) {
        fs.promises.writeFile(archivoTxt, '[]');
    }try{
        let dato = await fs.promises.readFile(archivoTxt, 'utf8')
        return dato;
    }catch(error){
        console.log(error);
    }
    }

    //elimina un objeto por id
    async deleteById(id) {
        let contenedor = await this.getAll();
        contenedor = JSON.parse(contenedor);
        let objeto = contenedor.find(obj => obj.id == id);
        contenedor = contenedor.filter(obj => obj.id != id);
        if(objeto!=undefined){
            let json = JSON.stringify(contenedor);
            fs.promises.writeFile(archivoTxt, json);
            console.log('objeto eliminado');}
        else{
            console.log('no existe el objeto');
        }
    }

    //elimina todos los objetos
    async deleteAll() {
        await fs.promises.writeFile(archivoTxt, '[]');
        console.log('todos los objetos fueron eliminados');
    }
}


async function main() {
    //envia los metodos a main.js
    const contenedor = new Contenedor();
    const data = await contenedor.getAll();


}

main();

// importa todos los metodos
module.exports = {
    save: Contenedor.prototype.save,
    getById: Contenedor.prototype.getById,
    getAll: Contenedor.prototype.getAll,
    deleteById: Contenedor.prototype.deleteById,
    deleteAll: Contenedor.prototype.deleteAll
}