import ProductManager from './productscontrollers.js';

const manager = new ProductManager();

export const getProducts = async (req, res) => {
    try {
        const productos = await manager.obtenerTodo();
        console.log(productos); // Verificar los datos obtenidos
        res.render('home', { productos, title: 'Home - Productos' });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const getRealTimeProducts = (req, res) => {
    res.render('realTimeProducts', { title: 'Real Time Products' });
};