const productos = [
  { id: 1, nombre: "LECTURA DE HORÓSCOPO NATAL", descripcion: "Las estrellas te regalan un camino que mereces conocer", precio: 30, fondo: "img/natal.jfif" },
  { id: 2, nombre: "PREGUNTA HOROSCÓPICA", descripcion: "Saber es poder! El cielo te ayuda a conocer la respuesta a tu respuesta", precio: 10, fondo: "img/pregunta.jpg" },
  { id: 3, nombre: "HORÓSCOPO ELECTIVO", descripcion: "Las estrellas están a tu favor, comenzá en el mejor momento tus proyectos", precio: 20, fondo: "img/electiva.jpg" },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];  
const imagenes = [
  "img/astro1.jpg",
  "img/constellations.jpg",
  
];
let indiceActual = 0;

const cambiarFondo = () => {
  indiceActual = (indiceActual + 1) % imagenes.length;
  document.body.style.backgroundImage = `url(${imagenes[indiceActual]})`;
};


const cargarProductos = () => {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = ""; 

  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <div class="card" style="background-image: url(${producto.fondo});">
        <div class="card__content">
          <p class="card__title">${producto.nombre}</p>
          <p class="card__description">${producto.descripcion}</p>
          <p class="card__price">$${producto.precio}</p>
        </div>
        <div class="card__button">
          <button class="btn agregarCarrito" data-id="${producto.id}">
            Contratar
          </button>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });

  document.querySelectorAll(".agregarCarrito").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const productoId = e.target.dataset.id;
      agregarAlCarrito(parseInt(productoId));
    });
  });
};

const agregarAlCarrito = (id) => {
  const producto = productos.find((p) => p.id === id);
  if (producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  }
};

const renderCarrito = () => {
  const contenedor = document.getElementById("carrito");
  const total = document.getElementById("total");
  contenedor.innerHTML = ""; 
  let totalCarrito = 0;

  carrito.forEach((producto, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td><button class="btn btn-eliminar" data-index="${index}">BORRAR</button></td>
    `;
    contenedor.appendChild(tr);
    totalCarrito += producto.precio;
  });

  total.textContent = totalCarrito;


  document.querySelectorAll(".btn-eliminar").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      eliminarDelCarrito(index);
    });
  });
};


const eliminarDelCarrito = (index) => {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito)); 
  renderCarrito();
};

// Inicializar funciones
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  renderCarrito(); 
  setInterval(cambiarFondo, 5000); 
});
