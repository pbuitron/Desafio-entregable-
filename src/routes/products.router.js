import { Router } from 'express';
import { obtenerLimite, obtenerPorId, agregarProducto, obtenerTodo, actualizarProducto, borrarProducto } from '../controllers/productscontrollers.js';

const productsRouter = Router();

productsRouter.get('/', obtenerLimite);
productsRouter.get('/:pid', obtenerPorId);
productsRouter.get('/', obtenerTodo);
productsRouter.post('/', agregarProducto);
productsRouter.put('/:pid', actualizarProducto);
productsRouter.delete('/:pid', borrarProducto);

export default productsRouter;