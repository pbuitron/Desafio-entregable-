import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rutaCarts = path.join(__dirname, '../carts.json')

console.log(rutaCarts);
export let contadorCarts = 1

export const inicializarArchivoCarts = async (rutaCarts) => {
    try {

        if (!existsSync(rutaCarts)) {
             await fs.writeFile(rutaCarts, JSON.stringify([]));

            console.log('Archivo creado satisfactoriamente');
            return
        }
    } catch (error) {
        throw new Error(`Error al inicializar el archivo: ${error.message}`);
    }
};

export const leerCarts = async (rutaCarts) => {
    try {
        await inicializarArchivoCarts(rutaCarts);

        const contenido = await fs.readFile(rutaCarts, 'utf-8');
        const datos = JSON.parse(contenido);

       if (datos.length > 0) {
        contadorCarts = Math.max(...datos.map(p => parseInt(p.id))) + 1;

        }
        if (datos.length === 0) {
            console.log('Lista vacia');
        }
        return datos;
    } catch (error) {
        console.error(`Error al leer los datos: ${error.message}`);
    }
};


export const agregar = async (rutaCarts, array, carrito) => {
    array.push(carrito);
    await fs.writeFile(rutaCarts, JSON.stringify(array, null, 2));
    console.log(carrito);
};

export const agregarCarrito = async(req, res)=>{
const carritos = await leerCarts(rutaCarts)

const nuevoCarrito = {
    id: contadorCarts.toString(),
    products : []
}
await agregar(rutaCarts, carritos, nuevoCarrito)
res.status(201).json(nuevoCarrito)
console.log('carrito agregado satisfactoriamente');
}

export const  obtenercarritos = async(req, res)=>{
const contenido =await leerCarts(rutaCarts)
res.status(200).json(contenido)

}