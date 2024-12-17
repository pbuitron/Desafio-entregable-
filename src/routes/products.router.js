

import { Router } from 'express';
import ProductManager from '../controllers/productscontrollers.js';

const productsRouter = Router();
const productManager = new ProductManager();

productsRouter.get('/', productManager.obtenerLimite.bind(productManager)); 
productsRouter.get('/:pid', productManager.obtenerPorId.bind(productManager)); 
productsRouter.post('/', productManager.agregarProducto.bind(productManager)); 
productsRouter.get('/all', productManager.obtenerTodo.bind(productManager)); 
productsRouter.put('/:pid', productManager.actualizarProducto.bind(productManager)); 
productsRouter.delete('/:pid', productManager.borrarProducto.bind(productManager)); 

export default productsRouter;