# Aplicación de Carritos y Productos

## Descripción
Esta aplicación permite gestionar carritos de compras y productos. Los usuarios pueden crear carritos, agregar productos a ellos y consultar el contenido de cada carrito. La aplicación está construida utilizando Node.js y almacena los datos en archivos JSON.

## Estructura del Proyecto
El proyecto está organizado en las siguientes carpetas y archivos:

```
/Desafio_Entregable
│
├── /src
│   ├── /controllers
│   │   ├── cartscontrollers.js
│   │   └── productscontrollers.js
│   ├── carts.json
│   └── products.json
│
└── README.md
```

## Rutas de la API

### Productos

1. **Obtener todos los productos**
   - **Método:** GET
   - **Ruta:** `/api/products`
   - **Descripción:** Devuelve una lista de todos los productos.

2. **Obtener un producto por ID**
   - **Método:** GET
   - **Ruta:** `/api/products/:pid`
   - **Descripción:** Devuelve el producto correspondiente al ID proporcionado.

3. **Agregar un nuevo producto**
   - **Método:** POST
   - **Ruta:** `/api/products`
   - **Descripción:** Agrega un nuevo producto a la lista.
   - **Cuerpo de la solicitud:**

```json
{
  "title": "Nombre del producto",
  "description": "Descripción del producto",
  "code": "Código del producto",
  "price": 10,
  "status": true,
  "stock": 100,
  "category": "Categoría del producto",
  "thumbnails": []
}
```

4. **Actualizar un producto**
   - **Método:** PUT
   - **Ruta:** `/api/products/:pid`
   - **Descripción:** Actualiza la información de un producto existente.

5. **Eliminar un producto**
   - **Método:** DELETE
   - **Ruta:** `/api/products/:pid`
   - **Descripción:** Elimina un producto de la lista.

### Carritos

1. **Crear un nuevo carrito**
   - **Método:** POST
   - **Ruta:** `/api/carts`
   - **Descripción:** Crea un nuevo carrito vacío.

2. **Obtener productos de un carrito**
   - **Método:** GET
   - **Ruta:** `/api/carts/:cid`
   - **Descripción:** Devuelve todos los productos que pertenecen al carrito con el ID proporcionado.

3. **Agregar un producto a un carrito**
   - **Método:** POST
   - **Ruta:** `/api/carts/:cid/product/:pid`
   - **Descripción:** Agrega un producto al carrito especificado. Si el producto ya existe, incrementa la cantidad.

## Estructura de Datos

### Producto
Cada producto tiene la siguiente estructura:

```json
{
  "id": Number,
  "title": String,
  "description": String,
  "code": String,
  "price": Number,
  "status": Boolean,
  "stock": Number,
  "category": String,
  "thumbnails": Array
}
```

### Carrito
Cada carrito tiene la siguiente estructura:

```json
{
  "id": Number,
  "products": [
    {
      "id": Number,
      "quantity": Number
    }
  ]
}
```

## Instalación

1. Clona el repositorio en tu máquina local.
2. Navega a la carpeta del proyecto.
3. Instala las dependencias necesarias ejecutando:

```bash
npm install
```

4. Inicia el servidor:

```bash
npm run dev
```

La API estará disponible en `http://localhost:8080/api`. 
