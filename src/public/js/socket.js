const socket = io();
socket.on('productos', (data) => {
    
    renderProducts(data);
    
})

const renderProducts = (productos) => {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = `
        <h2>${producto.title}</h2>
        <p>${producto.description}</p>
        <p>${producto.price}</p>
        <img src="${producto.thumbnails[0]}" alt="${producto.title}">
        `;
        contenedor.appendChild(div);
    });
}