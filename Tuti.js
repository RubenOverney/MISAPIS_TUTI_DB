const API_URL = "http://localhost:3000/api/tuti"; // Cambia si tu ruta es otra

const formSection = document.getElementById("formulario-section");
const form = document.getElementById("form-tuti");
const listaProductos = document.getElementById("lista-productos");
const carritoLista = document.getElementById("carrito-lista");
const totalSpan = document.getElementById("total");

let carrito = [];
let total = 0;

// ==========================
// Mostrar / Ocultar Formulario
// ==========================
document.getElementById("btn-agregar").onclick = () => {
    formSection.classList.remove("oculto");
};
document.getElementById("btn-cerrar-form").onclick = () => {
    formSection.classList.add("oculto");
};

// ==========================
// Cargar Productos
// ==========================
document.addEventListener("DOMContentLoaded", cargarProductos);

async function cargarProductos() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        listaProductos.innerHTML = "";

        if (!data.producciones || data.producciones.length === 0) {
            listaProductos.innerHTML = "<p>No hay productos registrados.</p>";
            return;
        }

        data.producciones.forEach(prod => {
            listaProductos.innerHTML += crearCard(prod);
        });

    } catch (err) {
        listaProductos.innerHTML = "<p>Error al cargar los productos.</p>";
    }
}

function crearCard(prod) {
    return `
        <div class="card">
            <img src="${prod.img || 'https://via.placeholder.com/300x180?text=Sin+Imagen'}">
            <h3>${prod.producto}</h3>
            <p>Precio: $${prod.precio}</p>
            <p>Año: ${prod.año}</p>
            <p>Caducidad: ${prod.caducidad || 'No aplica'}</p>
            <button class="btn-carrito" onclick="agregarCarrito('${prod._id}', ${prod.precio}, '${prod.producto}')">
                🛒 Añadir al carrito
            </button>
        </div>
    `;
}

// ==========================
// Agregar Producto
// ==========================
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        img: document.getElementById("img").value,
        producto: document.getElementById("producto").value,
        precio: Number(document.getElementById("precio").value),
        año: Number(document.getElementById("año").value),
        caducidad: document.getElementById("caducidad").value,
        clasificacion: document.getElementById("clasificacion").value,
        descripcion: document.getElementById("descripcion").value
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        console.log(result);
        form.reset();
        formSection.classList.add("oculto");
        cargarProductos();
    } catch (err) {
        alert("Error al guardar el producto");
    }
});

// ==========================
// Carrito
// ==========================
function agregarCarrito(id, precio, nombre) {
    carrito.push({ id, nombre, precio });
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    carritoLista.innerHTML = "";
    carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        carritoLista.appendChild(li);
    });
    totalSpan.textContent = total;
}

// ==========================
// Buscador
// ==========================
document.getElementById("buscador").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let nombre = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = nombre.includes(texto) ? "block" : "none";
    });
});
