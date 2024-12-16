# CartsRouter y sus Metodos
El carrito contiene 2 rutas, las cuales se detallan a continuación:


## La ruta raíz POST /

Crea un nuevo carrito con la siguiente estructura:
- **id**: Number
- **products**: Array vacio que contendrá objetos que representan a cada producto


```bash
http://localhost:8080/api/carts
```
## La ruta GET /:cid
Trae todos los productos que pertenezcan a el id proporcionado

```bash
http://localhost:8080/api/carts/1
```

## La ruta raíz POST /

- Agrega el producto al arreglo **products** del carrito selecciponado, agregando un objeto con el siguiente formato:
- **product**: el cual cuenta con un id unico.
-- **quantity** el cual contiene el numero de ejemplares de dicho producto, el cual se agrega de uno en uno. 
-- Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto

```bash
http://localhost:8080/api/:cid/product/:pid
```
