import express from 'express';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import { engine } from 'express-handlebars';
import viewRouter from './routes/views.routes.js';
import { Server } from 'socket.io';
import ProductManager from './controllers/productscontrollers.js';

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
app.use(express.static('./src/public'))


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');


app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/', viewRouter);


app.use('*', (req, res, next) => {
    res.status(404).send('Página no existe');
    next()
});

const PUERTO = process.env.PORT || 8080;

const httpServer = app.listen(PUERTO, () => {
    console.log(`Server iniciado en  http://localhost:${PUERTO}/api`);
});
const productManager = new ProductManager('./src/products.json');

const io = new Server(httpServer);

io.on('connection', async(socket) =>{
    console.log('Nuevo cliente conectado');

socket.emit('productos', await productManager.obtenerTodo());
})


