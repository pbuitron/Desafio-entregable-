const socket = io();

socket.on('productos', (data) => {
    renderProducts(data);
});

const renderProducts = (productos) => {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('product-card')
        div.innerHTML = `
            <h2 class="product-title">${producto.title}</h2>
            <p class="product-description">${producto.description}</p>
            <p class="product-price">${producto.price}</p>
            <p class="product-status">${producto.status ? 'Activo' : 'Inactivo'}</p>
            <img src="${producto.thumbnails[0]}" alt="${producto.title}" class="product-image">
            <button class="delete-button" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
}

document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = parseFloat(document.getElementById('price').value);
    const stock = parseInt(document.getElementById('stock').value);
    const category = document.getElementById('category').value;
    const thumbnails = document.getElementById('thumbnails').value.split(',');
    const status = document.getElementById('status').value === 'true';

    const newProduct = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
        status
    };

    // Emitir el nuevo producto al servidor
    socket.emit('nuevoProducto', newProduct);

    // Limpiar el formulario
    document.getElementById('productForm').reset();
});

function eliminarProducto(id) {
    socket.emit('eliminarProducto', id);
}