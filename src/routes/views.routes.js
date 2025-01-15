import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getProducts, getRealTimeProducts } from '../controllers/view.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const viewsProducts = path.join(__dirname, '../products.json');
console.log(path.join(__dirname, '../products.json'));

const viewRouter = Router();

viewRouter.route('/products')
    .get(getProducts);

viewRouter.route('/realTimeProducts')
    .get(getRealTimeProducts);

export default viewRouter;