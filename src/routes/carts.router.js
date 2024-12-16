import { Router } from "express";
import { agregarCarrito, obtenercarritos } from "../controllers/cartscontrollers.js";

const cartsRouter = Router();

cartsRouter.post('/', agregarCarrito)
cartsRouter.get('/', obtenercarritos)

export default cartsRouter