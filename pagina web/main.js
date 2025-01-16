let carrito = []; 

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre: nombre, precio: precio });
    actualizarCarrito();
    actualizarContador();
    mostrarNotificacion(`${nombre} ha sido agregado al carrito.`);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    const producto = carrito[index];
    carrito.splice(index, 1);
    actualizarCarrito();
    actualizarContador();
    mostrarNotificacion(`${producto.nombre} ha sido eliminado del carrito.`);
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    let carritoHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        carritoHTML = `<p>Tu carrito está vacío.</p>`;
    } else {
        carrito.forEach((producto, index) => {
            carritoHTML += `<p>${producto.nombre} - $${producto.precio} <button onclick="eliminarDelCarrito(${index})">Eliminar</button></p>`;
            total += producto.precio;
        });

        carritoHTML += `<h3>Total: $${total.toFixed(2)}</h3>`;
    }

    document.getElementById('carrito').innerHTML = carritoHTML;
}

// Función para actualizar el contador de productos en el carrito
function actualizarContador() {
    document.getElementById('carrito-count').textContent = carrito.length;
}

// Lista de productos
const productos = [
    { nombre: "Smartphone", precio: 799.99, imagen: "producto1.jpg" },
    { nombre: "Camiseta de algodón", precio: 19.99, imagen: "producto2.jpg" },
    { nombre: "Auriculares inalámbricos", precio: 59.99, imagen: "producto3.jpg" },
    { nombre: "Mochila deportiva", precio: 49.99, imagen: "producto4.jpg" }
    // Agrega más productos aquí...
];

// Generar los productos dinámicamente en el HTML
productos.forEach((producto, index) => {
    const productoHTML = `
        <div class="producto">
            <h3>${producto.nombre}</h3>
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>Precio: $${producto.precio}</p>
            <button id="btnProducto${index}">Añadir al carrito</button>
        </div>
    `;
    document.getElementById('productos').innerHTML += productoHTML;

    // Evento para agregar productos al carrito
    document.getElementById(`btnProducto${index}`).addEventListener('click', function() {
        agregarAlCarrito(producto.nombre, producto.precio);
    });
});

// Validar formulario antes de enviarlo
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let direccion = document.getElementById('direccion').value;

    if (nombre === "" || direccion === "") {
        alert("Por favor, completa todos los campos.");
    } else {
        alert("¡Gracias por tu compra! Te enviaremos un correo con los detalles.");
        limpiarCarrito();
    }
});

// Función para limpiar el carrito después de la compra
function limpiarCarrito() {
    carrito = [];
    actualizarCarrito();
    actualizarContador();
    mostrarNotificacion("El carrito se ha vaciado después de la compra.");
}

// Función para mostrar una notificación
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion');
    notificacion.textContent = mensaje;

    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Función para calcular el total con impuestos
function calcularTotalConImpuestos(tasaImpuesto) {
    let total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    return (total * (1 + tasaImpuesto)).toFixed(2);
}

// Mostrar el total con impuestos (opcional, ejemplo de uso)
function mostrarTotalConImpuestos() {
    const tasaImpuesto = 0.15; // 15% de impuestos
    const totalConImpuestos = calcularTotalConImpuestos(tasaImpuesto);
    alert(`El total con impuestos es: $${totalConImpuestos}`);
}

// Aplicar estilos dinámicos a los botones de "Añadir al carrito"
function estilizarBotones() {
    document.querySelectorAll('button').forEach(button => {
        button.style.backgroundColor = "#333";
        button.style.color = "white";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.padding = "10px";
        button.style.cursor = "pointer";
        button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = "#555";
        });
        button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = "#333";
        });
    });
}

// Llamar a la función de estilización
estilizarBotones();

<link rel="stylesheet" href="styles.css">
