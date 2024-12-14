import { Router } from 'express';
import { obtenerLimite, obtenerPorId, agregarProducto, obtenerTodo, actualizarProducto, borrarProducto } from '../controllers/productscontrollers.js';

const productsRouter = Router();

productsRouter.get('/', obtenerTodo);
productsRouter.get('/', obtenerLimite);
productsRouter.get('/:pid', obtenerPorId);
productsRouter.post('/', agregarProducto);
productsRouter.put('/:pid', actualizarProducto);
productsRouter.delete('/:pid', borrarProducto);

export default productsRouter;