/* CARRUSEL*/ 

const imagenes = document.querySelector('.imagenes');
    const totalImagenes = document.querySelectorAll('.imagenes img').length;
    let indiceActual = 0;

    function actualizarCarrusel() {
        const desplazamiento = -indiceActual * 100;
        imagenes.style.transform = `translateX(${desplazamiento}%)`;
    }

    function siguiente() {
        indiceActual = (indiceActual + 1) % totalImagenes;
        actualizarCarrusel();
    }

    function anterior() {
        indiceActual = (indiceActual - 1 + totalImagenes) % totalImagenes;
        actualizarCarrusel();
    }


/*OFERTAS*/

    fetch('./ofertas.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar las ofertas: ${response.statusText}`);
        }
        return response.json();
    })
    .then(ofertas => {
        const ofertasLista = document.getElementById('ofertas-lista');

        ofertas.forEach(oferta => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${oferta.imagen}" alt="${oferta.descripcion}">
                <div>
                    <span class="descripcion-product">${oferta.title}</span>
                    <span class="price">$${oferta.price}</span>
                    <button class="boton-comprar" data-id="${oferta.id}" data-nombre="${oferta.title}" data-precio="${oferta.price}">Comprar</button>
                </div>
            `;
            ofertasLista.appendChild(li);
        });

        document.querySelectorAll('.boton-comprar').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const nombre = e.target.getAttribute('data-nombre');
                const precio = parseFloat(e.target.getAttribute('data-precio'));
                agregarAlCarrito(id, nombre, precio);
            });
        });
    })
    .catch(error => console.error('Hubo un problema al cargar las ofertas:', error));
