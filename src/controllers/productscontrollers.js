import fs from 'fs/promises'
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaProducts = path.join(__dirname, '../products.json');

export let contadorItemProducts = 1


export const inicializarArchivoProducts = async (rutaProducts) => {
    try {

        if (!existsSync(rutaProducts)) {
            await fs.writeFile(rutaProducts, JSON.stringify([]));

            console.log('Archivo creado satisfactoriamente');
            return
        }
    } catch (error) {
        throw new Error(`Error al inicializar el archivo: ${error.message}`);
    }
};


export const leerProducts = async (rutaProducts) => {
    try {
        await inicializarArchivoProducts(rutaProducts);

        const contenido = await fs.readFile(rutaProducts, 'utf-8');
        const datos = JSON.parse(contenido);

       if (datos.length > 0) {
         contadorItemProducts = Math.max(...datos.map(p => parseInt(p.id))) + 1;

        }
        if (datos.length === 0) {
            console.log('Lista vacia');
        }
        return datos;
    } catch (error) {
        console.error(`Error al leer los datos: ${error.message}`);
    }
};


export const agregar = async (rutaProducts, array, product) => {
    array.push(product);
    await fs.writeFile(rutaProducts, JSON.stringify(array, null, 2));
    console.log(product);
};

export const obtenerLimite = async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await leerProducts(rutaProducts);
        const limitNumber = parseInt(limit, 10);

        if (limit && (isNaN(limitNumber) || limitNumber < 1)) {
            return res.status(400).json({ error: 'Limit must be a positive number' });
        }
        const responseProducts = limitNumber ? products.slice(0, limitNumber) : products;
        res.json(responseProducts);

    } catch (error) {
        res
            .status(500)
            .json({ error: 'Error reading products' });
    }
}

export const obtenerPorId = async (req, res) => {
    const products = await leerProducts(rutaProducts);
    const { pid } = req.params;
    const product = products.find(p => p.id == parseInt(pid));
    if (product) {
        res
            .status(200)
            .json(product);
    } else {
        res
            .status(404)
            .send('Product not found');
    }
}

export const agregarProducto = async (req, res) => {
    const products = await leerProducts(rutaProducts);
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(406).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
    }
    const newProduct = {
        id: contadorItemProducts.toString(),
        title,
        description,
        code,
        price: parseInt(price),
        status,
        stock: parseInt(stock),
        category,
        thumbnails
    };

    await agregar(rutaProducts, products, newProduct);
    res.status(201).json(newProduct);
    console.log(`Se agregó producto a la lista `);
}

export const obtenerTodo = async (req, res) => {
    const products = await leerProducts(rutaProducts);
    res.json(products);
}
export const actualizarProducto = async (req, res) => {
    const products = await leerProducts(rutaProducts);
    const productId = parseInt(req.params.pid);
    const productIndex = products.findIndex(p => p.id == productId);

    if (productIndex === -1) {
        console.log('No se encontró el producto solicitado');
        return res.status(404).send('Producto no encontrado');

    }

    const { title, description, code, price, status, stock, category, thumbnails } = req.body;


    if (title !== undefined) products[productIndex].title = title;
    if (description !== undefined) products[productIndex].description = description;
    if (code !== undefined) products[productIndex].code = code;
    if (price !== undefined) products[productIndex].price = price;
    if (status !== undefined) products[productIndex].status = status;
    if (stock !== undefined) products[productIndex].stock = stock;
    if (category !== undefined) products[productIndex].category = category;
    if (thumbnails !== undefined) products[productIndex].thumbnails = thumbnails;

    await fs.writeFile(rutaProducts, JSON.stringify(products, null, 2));
    res.status(200).json(products[productIndex]);
};

export const borrarProducto = async (req, res) => {
    const products = await leerProducts(rutaProducts);
    const productId = parseInt(req.params.pid);
    const productIndex = products.findIndex(p => p.id == productId);
    if (productIndex === -1) {
        console.log('No se encontró el producto solicitado');
        return res.status(404).send('Producto no encontrado');
    }
    products.splice(productIndex, 1);
    await fs.writeFile(rutaProducts, JSON.stringify(products, null, 2));
    res.status(200).json(products);


}