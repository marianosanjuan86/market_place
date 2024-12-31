fetch('https://fakestoreapi.com/products/category/electronics')
    .then(response => response.json())
    .then(data => {
        const contenedor = document.getElementById('contenedorProductos');

        data.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.className = 'producto';

            divProducto.innerHTML = `
                <img src="${producto.image}" alt="${producto.title}">
                <h3>${producto.title}</h3>
                <p>Precio: ${producto.price}</p>
                <button class="boton-comprar" data-id="${producto.id}" data-nombre="${producto.title}" data-precio="${producto.price}">Comprar</button>
            `;

            contenedor.appendChild(divProducto);
        });

        
        document.querySelectorAll(".boton-comprar").forEach(boton => {
            boton.addEventListener("click", (e) => {
                const id = e.target.dataset.id;
                const nombre = e.target.dataset.nombre;
                const precio = parseFloat(e.target.dataset.precio);
                
                agregarAlCarrito(id, nombre, precio);
            });
        });
    })
    .catch(error => console.error('Error al cargar los productos:', error));
;



