/* CARRITO */ 

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


function agregarAlCarrito(id, nombre, precio) {
    const productoExistente = carrito.find(producto => producto.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    actualizarCarritoCount();
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("carrito-lista");
    const total = document.getElementById("total");

    listaCarrito.innerHTML = '';

    let totalCarrito = 0;

    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} (x${producto.cantidad}) - $${producto.precio * producto.cantidad}`;
        listaCarrito.appendChild(li);

        totalCarrito += producto.precio * producto.cantidad;
    });

    total.textContent = totalCarrito.toFixed(2);
}



function vaciarCarrito() {
    carrito = [];
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
    actualizarCarritoCount();
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
    actualizarCarritoCount();
}


document.getElementById('toggle-carrito').addEventListener('click', () => {
    const carritoContent = document.getElementById('carrito-content');
    carritoContent.classList.toggle('oculto');
});

/* BOTON COMPRAR*/


document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);

function actualizarCarritoCount() {
    const carritoCount = document.getElementById("carrito-count");
    const totalProductos = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    carritoCount.textContent = totalProductos;
}

const btnComprar = document.getElementById("btn-comprar");

btnComprar.addEventListener("click", () => {
    window.location.href = "comprar.html";
});

window.addEventListener('load', () => {
    cargarCarritoDeLocalStorage();
});