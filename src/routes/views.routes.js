import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ProductManager from '../controllers/productscontrollers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const viewsProducts = path.join(__dirname, '../products.json');
console.log(path.join(__dirname, '../products.json'));

const viewRouter = Router();
const manager = new ProductManager();

viewRouter.route('/products')
    .get(async (req, res) => {
        try {
            const productos = await manager.obtenerTodo();
            console.log(productos); // Verificar los datos obtenidos
            res.render('home', { productos, title: 'Home - Productos' });
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).send('Error interno del servidor');
        }
    });

viewRouter.route('/realTimeProducts')
    .get((req, res) => {
        res.render('realTimeProducts', { title: 'Real Time Products' })
    
});

export default viewRouter;