import { Router } from "express";
import { agregarCarrito, obtenercarritos, obtenercarritoPorId, productoEnCarrito, checkearStatusProducto} from "../controllers/cartscontrollers.js";

const cartsRouter = Router();

cartsRouter.post('/', agregarCarrito)
cartsRouter.get('/', obtenercarritos)
cartsRouter.get('/:cid', obtenercarritoPorId)
cartsRouter.post('/:cid/products/:pid', checkearStatusProducto, productoEnCarrito)



export default cartsRouter