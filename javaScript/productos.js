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
                <p>Precio: $${producto.price}</p>
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



let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


function agregarAlCarrito(id, nombre, precio) {
    carrito.push({ id, nombre, precio });
    console.log("hola",carrito)
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
}


function actualizarCarrito() {
    const listaCarrito = document.getElementById("carrito-lista");
    const total = document.getElementById("total");

    
    listaCarrito.innerHTML = '';

    let totalCarrito = 0;

    
    carrito.forEach(producto => {
        console.log("Producto:", producto);
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        listaCarrito.appendChild(li);
        totalCarrito += producto.precio;
    });

    
    total.textContent = totalCarrito;
}


function vaciarCarrito() {
    carrito = [];
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
}


function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


function cargarCarritoDeLocalStorage() {
    try {
        carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    } catch {
        carrito = [];
    }
    actualizarCarrito();
}


document.getElementById('toggle-carrito').addEventListener('click', () => {
    const carritoContent = document.getElementById('carrito-content');
    carritoContent.classList.toggle('oculto');
});


document.querySelectorAll(".boton-comprar").forEach(boton => {
    boton.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const nombre = e.target.getAttribute("data-nombre");
        const precio = parseFloat(e.target.getAttribute("data-precio"));

        agregarAlCarrito(id, nombre, precio);
    });
});


document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);


cargarCarritoDeLocalStorage();