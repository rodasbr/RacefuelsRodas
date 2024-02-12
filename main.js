//productos racefuels
const productos = [
    { id: 1, nombre: "metanol", precio: 15000 },
    { id: 2, nombre: "buzo", precio: 12000 },
    { id: 3, nombre: "bandera", precio: 8000 },
    { id: 4, nombre: "remera", precio: 10000 },
];

const carrito = [];
//agregar al carrito
const agregar = (id) => {
    let producto = productos.find((item) => item.id === id);
    carrito.push(producto);
    console.log(carrito);
    guardarEnStorage();
};
//eliminar del carrito
const eliminar = (id) => {
    let index = carrito.findIndex((item) => item.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
        console.log(carrito);
    } else {
        console.log("Producto no encontrado en el carrito");
    }
    guardarEnStorage();
};

//ver productos
productos.forEach(item => {
    let div = document.createElement("div");
    div.innerHTML = `
    <h2 class="styleId">Id: ${item.id}</h2>
    <p class="styleNombre">Nombre: ${item.nombre}</p>
    <b class="stylePrecio"> Precio: $${item.precio}</b>
    <button class="styleBoton" id="boton${item.id}">Agregar</button>
    <button class="styleEliminar" id="botonEliminar${item.id}">Eliminar</button>
    `;
    document.body.append(div);
    //botones
    let boton = document.getElementById(`boton${item.id}`);
    boton.addEventListener("click", () => agregar(item.id));

    let botonEliminar = document.getElementById(`botonEliminar${item.id}`);
    botonEliminar.addEventListener("click", () => eliminar(item.id));
});

// guardar el carrito 
const guardarEnStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Traer carrito
let carritoStorage = localStorage.getItem("carrito");
if (carritoStorage) {
    carrito.push(...JSON.parse(carritoStorage));
}

// vaciar el carrito
let vaciar = document.getElementById("vaciar");
vaciar.addEventListener("click", () => {
    carrito.length = 0;
    guardarEnStorage();
    alert("Carrito eliminado");
});


// calcular el envío
const envio = (precioProducto) => {
    const sumaEnvio = 0.15;
    return precioProducto * sumaEnvio;
};
//total del carrito
const totalCompra = () => {
    return carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
};

// Botón para mostrar el total de la compra en alert
let verTotal = document.getElementById("verTotal");
verTotal.addEventListener("click", () => {
    //ingresar valor de la compra
    let precioProducto = parseFloat(document.getElementById("calcularEnvio").value);

    //valor total
    let finalPrecio = envio(precioProducto);

    let totalCarrito = totalCompra();

    //alerta del total de la compra
    alert(`El precio total de la compra es de: $${totalCarrito}`);

    // alerta precio final con envío
    if (!isNaN(finalPrecio)) {
        alert(`Su valor adicional de envio es de: $${finalPrecio}`);
    } else {
        console.log("Error al calcular");
    }
});
