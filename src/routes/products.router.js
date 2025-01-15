

import { Router } from 'express';
import ProductManager from '../controllers/productscontrollers.js';

const productsRouter = Router();
const productManager = new ProductManager();

productsRouter.route('/')
.get(productManager.obtenerLimite.bind(productManager))
.post(productManager.agregarProducto.bind(productManager))

productsRouter.route('/:pid')
.get(productManager.obtenerPorId.bind(productManager))
.put(productManager.actualizarProducto.bind(productManager))
.delete(productManager.borrarProducto.bind(productManager))


productsRouter
.get('/all', productManager.obtenerTodo.bind(productManager))

export default productsRouter;