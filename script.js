function alternarAlerta(){
    const alerta = document.getElementById('miAlerta');
            
          alert("Gracias por contactarnos, en breve nos contactaremos contigo.");

          }
// CATÁLOGO DE PRODUCTOS
const productos = [
    mod_rr2,
    mod_zd6,
    mod_skyL2,
    mod_an6Sy,
    mod_bon9,
    mod_BES5,
    mod_NYmarE,
    mod_PegPlus2,
    mod_sur5,
    mod_OnCl3
];

// CARRITO
let carrito = [];

let promocionMostrada = false;

// FORMATO DE MONEDA
function formatoMoneda(cantidad) {
    return cantidad.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN"
    });
}

// AGREGAR PRODUCTOS
function agregarAlCarrito(id) {

    const producto = productos.find(p => String(p.id) === String(id));

    if (!producto) {
        alert("No se encontró el producto.");
        return;
    }

    const productoEnCarrito = carrito.find(p => p.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: Number(producto.precio),
            cantidad: 1
        });
    }

    actualizarCarrito();
    revisarPromocion();
}

// CONECTAR BOTONES DE PRODUCTOS
document.addEventListener("click", function(event) {

    const boton = event.target.closest(".btn-agregar");

    if (boton) {
        const id = boton.dataset.id;
        agregarAlCarrito(id);
    }

});

// MOSTRAR PRODUCTOS DEL CARRITO
function mostrarCarrito() {

    const lista = document.getElementById("listaCarrito");

    if (carrito.length === 0) {
        lista.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }

    lista.innerHTML = "";

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        lista.innerHTML += `
            <div class="border-bottom py-3">

                <h6>${producto.nombre}</h6>

                <p>Precio: ${formatoMoneda(producto.precio)}</p>

                <p>
                    Cantidad: ${producto.cantidad}
                </p>

                <p>
                    Subtotal: ${formatoMoneda(subtotal)}
                </p>

                <button class="btn btn-sm btn-secondary"
                    data-accion="restar"
                    data-id="${producto.id}">
                    -
                </button>

                <button class="btn btn-sm btn-secondary"
                    data-accion="sumar"
                    data-id="${producto.id}">
                    +
                </button>

                <button class="btn btn-sm btn-danger"
                    data-accion="eliminar"
                    data-id="${producto.id}">
                    Eliminar
                </button>

            </div>
        `;
    });
}

// CALCULAR SUBTOTAL
function calcularSubtotal() {

    let subtotal = 0;

    carrito.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;
    });

    return subtotal;
}

// CALCULAR ENVÍO
function calcularEnvio(subtotal) {

    if (subtotal >= 2000) {
        return 0;
    } else {
        return 199;
    }
}

// ACTUALIZAR CONTADOR Y TOTALES
function actualizarCarrito() {

    const contador = document.getElementById("contadorCarrito");

    const cantidadTotal = carrito.reduce(
        (total, producto) => total + producto.cantidad, 0
    );

    contador.textContent = cantidadTotal;

    mostrarCarrito();

    const subtotal = calcularSubtotal();
    const envio = calcularEnvio(subtotal);
    const total = subtotal + envio;

    document.getElementById("subtotalCarrito").textContent =
        formatoMoneda(subtotal);

    document.getElementById("envioCarrito").textContent =
        envio === 0 ? "Gratis" : formatoMoneda(envio);

    document.getElementById("totalCarrito").textContent =
        formatoMoneda(total);
}

// AUMENTAR, DISMINUIR Y ELIMINAR PRODUCTOS
document.addEventListener("click", function(event) {

    const boton = event.target.closest("[data-accion]");

    if (!boton) return;

    const id = Number(boton.dataset.id);
    const accion = boton.dataset.accion;

    const producto = carrito.find(p => p.id === id);

    if (!producto) return;

    if (accion === "sumar") {
        producto.cantidad++;
    }

    if (accion === "restar") {
        producto.cantidad--;

        if (producto.cantidad <= 0) {
            carrito = carrito.filter(p => p.id !== id);
        }
    }

    if (accion === "eliminar") {
        carrito = carrito.filter(p => p.id !== id);
    }

    actualizarCarrito();
});

// VACIAR CARRITO
document.getElementById("vaciarCarrito").addEventListener("click", function() {

    carrito = [];

    actualizarCarrito();

});

// REVISAR PROMOCIÓN
function revisarPromocion() {

    const subtotal = calcularSubtotal();

    if (subtotal >= 1300 && !promocionMostrada) {

        alert(
            "¡Felicidades! Tu compra ya alcanzó $1,300. " +
            "Sigue comprando y consigue envío gratis al llegar a $2,000."
        );

        promocionMostrada = true;
    }
}

// INICIAR CARRITO
actualizarCarrito();
