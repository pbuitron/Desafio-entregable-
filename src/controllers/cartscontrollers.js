import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { json } from 'express'
import { rutaProducts, leerProducts } from './productscontrollers.js'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rutaCarts = path.join(__dirname, '../carts.json')

console.log(rutaCarts);
export let contadorCarts = 1

export const inicializarArchivoCarts = async (rutaCarts) => {
    try {

        if (!existsSync(rutaCarts)) {
            await fs.writeFile(rutaCarts, JSON.stringify([]));
            contadorCarts = 1
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

export const agregarCarrito = async (req, res) => {
    const carritos = await leerCarts(rutaCarts)

    const nuevoCarrito = {
        id: contadorCarts,
        products: []
    }
    await agregar(rutaCarts, carritos, nuevoCarrito)
    res.status(201).json(nuevoCarrito)
    console.log('carrito agregado satisfactoriamente');
}

export const obtenercarritos = async (req, res) => {
    const contenido = await leerCarts(rutaCarts)
    res.status(201).json(contenido)

}

export const obtenercarritoPorId = async (req, res) => {
    const { cid } = req.params
    const contenido = await leerCarts(rutaCarts)
    const carrito = contenido.find(c => c.id == cid)
    try {
        if(carrito){
            res.status(200).json(carrito.products)
        }else{
            res.status(404).json({message: 'carrito no encontrado'})
            
        }
    } catch (error) {
        throw new Error('Error al acceder al carrito')
    }
}

export const checkearStatusProducto = async (req, res, next) => {
    const { pid } = req.params;
    const products = await leerProducts(rutaProducts); 
    const producto = products.find(p => p.id === parseInt(pid)); 

    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (!producto.status) {
        return res.status(400).json({ message: 'Producto no disponible' });
    }

    req.producto = producto; 
    next();
};

export const productoEnCarrito = async (req, res) => {
    const { cid, pid } = req.params;
    const carritos = await leerCarts(rutaCarts);
    const carrito = carritos.find(c => c.id == cid);

    if (!carrito) {
        return res.status(404).json({ message: 'carrito no encontrado' });
    }

    const productoEnCarrito = carrito.products.find(prod => prod.id === parseInt(pid));
    if (productoEnCarrito) {
        productoEnCarrito.quantity += 1;
    } else {
        carrito.products.push({ id: parseInt(pid), quantity: 1 });
    }

    await fs.writeFile(rutaCarts, JSON.stringify(carritos, null, 2));
    res.status(200).json(carrito);
}