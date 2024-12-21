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

        // Agregar eventos a los botones "Comprar" después de que los productos sean renderizados
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


// Array para almacenar los productos en el carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar un producto al carrito
function agregarAlCarrito(id, nombre, precio) {
    carrito.push({ id, nombre, precio });
    console.log("hola",carrito)
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
}

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
    const listaCarrito = document.getElementById("carrito-lista");
    const total = document.getElementById("total");

    // Limpiar la lista antes de agregar los productos
    listaCarrito.innerHTML = '';

    let totalCarrito = 0;

    // Recorrer los productos en el carrito y agregarlos a la lista
    carrito.forEach(producto => {
        console.log("Producto:", producto);
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        listaCarrito.appendChild(li);
        totalCarrito += producto.precio;
    });

    // Mostrar el total actualizado
    total.textContent = totalCarrito;
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
}

// Guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Restaurar el carrito al cargar la página
function cargarCarritoDeLocalStorage() {
    try {
        carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    } catch {
        carrito = [];
    }
    actualizarCarrito();
}

// Mostrar/ocultar el carrito
document.getElementById('toggle-carrito').addEventListener('click', () => {
    const carritoContent = document.getElementById('carrito-content');
    carritoContent.classList.toggle('oculto');
});

// Agregar evento a los botones de "Comprar"
document.querySelectorAll(".boton-comprar").forEach(boton => {
    boton.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const nombre = e.target.getAttribute("data-nombre");
        const precio = parseFloat(e.target.getAttribute("data-precio"));

        agregarAlCarrito(id, nombre, precio);
    });
});

// Agregar evento para vaciar el carrito
document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);

// Cargar el carrito al cargar la página
cargarCarritoDeLocalStorage();