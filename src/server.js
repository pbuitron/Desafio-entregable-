import express, { urlencoded } from 'express';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';

const app = express();
app.use(express.json()); 
app.use(express({urlencoded:true}))


app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.get('/api', (req, res)=>{
    res.send('Desafio Entregable Número 1')
});
app.use('*', (req, res, next) => {
    res.status(404).send('Página no existe');
    next()
});

const PUERTO = process.env.PORT || 8080;
app.listen(PUERTO, () => {
    console.log(`Server iniciado en  http://localhost:${PUERTO}/api`);
});