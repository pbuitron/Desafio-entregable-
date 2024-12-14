# Productos y sus Metodos

Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:


## La ruta raíz GET /

Lista todos los productos de la base. (Incluyendo la limitación ?limit)


```bash
http://localhost:8080/api/products
```
## La ruta GET /:pid
Trae sólo el producto con el id proporcionado

```bash
http://localhost:8080/api/products/1
```

## La ruta raíz POST /
```bash
http://localhost:8080/api/products
```
Agregar un nuevo producto con los campos:
- **id**: Number/String (A tu elección, el id NO se manda desde body, se autogenera asegurando que NUNCA se repetirán los ids en el archivo.
- **title**:String,
- **description**:String
- **code**:String
- **price**:Number
-**status**:Boolean
- **stock**:Number
- **category**:String
- **thumbnails**: Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
- **status es true por defecto.
Todos los campos son obligatorios, a excepción de thumbnails**

## La ruta PUT /:pid
```bash
http://localhost:8080/api/products/5
```

Toma un producto y lo actualiza por los campos enviados desde body. **NUNCA** se debe actualizar o eliminar el id al momento de hacer dicha actualización.

## La ruta DELETE POST /
```bash
http://localhost:8080/api/products/1
```
elimina el producto con el pid indicado.

