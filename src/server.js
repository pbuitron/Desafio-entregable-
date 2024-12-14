import express, { urlencoded } from 'express';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';

const app = express();
app.use(express.json()); // Middleware para parsear JSON
app.use(express({urlencoded:true}))

// Usar los routersS
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.get('/api', (req, res)=>{
    res.send('Desafio Entregable Número 1')
});
app.use('*', (req, res, next) => {
    res.status(404).send('Página no existe');
});

const PUERTO = process.env.PORT || 8080;
app.listen(PUERTO, () => {
    console.log(`Server is running on  http://localhost:${PUERTO}`);
});