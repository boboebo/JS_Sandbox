const mostrarAlert = (msg) => {
  alert(msg);
};

const addlogs = (msg) => {
  console.log(msg);
};

// clase ticket
let ticketCompra = class {
  constructor(origen, destino, categoria, fecha, precio, cantidad) {
    this.id = Math.floor(Math.random() * 10000000 + 1);
    this.origen = origen;
    this.destino = destino;
    this.categoria = categoria;
    this.fecha = fecha;
    this.precio = precio;
    this.cantidad = cantidad;
  }
};

tickets = [];
total = 0;

const agregarTicketCompra = () => {
  let origen = document.getElementById("origenSelect").value;
  let destino = document.getElementById("destinoSelect").value;
  let categoria = document.getElementById("categoriaSelect").value;
  let fecha = document.getElementById("fecha").value;
  let precio = document.getElementById("precio").value;
  let cantidad = document.getElementById("cantidad").value;
  let ticketCur = new ticketCompra(
    origen,
    destino,
    categoria,
    fecha,
    precio,
    cantidad
  );

  tickets = JSON.parse(localStorage.getItem("ticketsInStorage")) || [];
  tickets.push(ticketCur);
  addlogs("this.tickets -> " + this.tickets);
  localStorage.setItem("ticketsInStorage", JSON.stringify(this.tickets));
};

const formatCategoria = (ticketCategoria) => {
  switch (ticketCategoria) {
    case "1":
      return "1ra Clase";
    case "2":
      return "2da Clase";
    case "3":
      return "3ra Clase";
    default:
      return "1ra Clase";
  }
};

//const formatPrecio

const mostrarCompra = () => {
  if (!localStorage.getItem("ticketsInStorage")) {
  } else {
    addlogs(JSON.parse(localStorage.getItem("ticketsInStorage")));

    let ticketsInStorage = JSON.parse(localStorage.getItem("ticketsInStorage"));
    let tableBody = document.getElementById("tbody");
    tableBody.innerHTML = "";
    for (let ticket of ticketsInStorage) {
      let tablaFila = document.createElement("tr");
      // columna Tramo
      let tablaOrigen = document.createElement("td");
      tablaOrigen.textContent = ticket.origen + "-" + ticket.destino;
      tablaOrigen.className = "tabla-text";
      // columna Categoria
      let tablaCategoria = document.createElement("td");
      tablaCategoria.textContent = formatCategoria(ticket.categoria);
      tablaCategoria.className = "tabla-text";
      // columna Fecha
      let tablaFecha = document.createElement("td");
      let fecha = new Date(ticket.fecha).toDateString();
      tablaFecha.textContent = !ticket.fecha ? "Ticket Abierto" : fecha;
      tablaFecha.className = "tabla-text";
      // columna Precio
      let tablaPrecio = document.createElement("td");
      addlogs(ticket.precio);
      tablaPrecio.textContent = !ticket.precio
        ? 0
        : "£ " + Number.parseFloat(ticket.precio).toFixed(2);
      tablaPrecio.className = "tabla-text";
      let tablaCantidad = document.createElement("td");
      // columna Cantidad
      tablaCantidad.textContent = !ticket.cantidad
        ? 0
        : Number(ticket.cantidad);
      tablaCantidad.className = "tabla-text";
      // columna Operaciones
      let tablaOps = document.createElement("td");
      tablaOps.className = "tabla-text";
      let borrar = document.createElement("button");
      borrar.textContent = "Borrar";
      borrar.className = "btn btn-danger text-center";
      borrar.id = ticket.id;
      borrar.addEventListener("click", (e) => borrarTicket(e.target.id));
      tablaOps.appendChild(borrar);

      tablaFila.appendChild(tablaOrigen);
      tablaFila.appendChild(tablaCategoria);
      tablaFila.appendChild(tablaFecha);
      tablaFila.appendChild(tablaPrecio);
      tablaFila.appendChild(tablaCantidad);
      tablaFila.appendChild(tablaOps);
      tableBody.appendChild(tablaFila);
    }
  }
};

const borrarTicket = (id) => {
  addlogs(`Eliminando ticket ${id}`);
  let tickets = JSON.parse(localStorage.getItem("ticketsInStorage"));
  let ticketsLimpio = tickets.filter((item) => item.id != id);
  localStorage.setItem("ticketsInStorage", JSON.stringify(ticketsLimpio));
  mostrarCompra();
};

const calcularTotal = () => {
  let tickets = JSON.parse(localStorage.getItem("ticketsInStorage"));
  total = 0;
  tickets.forEach((item) => {
    total += Number(item.precio);
  });
};

const terminaCompra = () => {
  calcularTotal();
  // Alert con SweetAlert
  Swal.fire({
    icon: "success",
    title: "La compra se realizo con exito",
    text: `El total de la compra es £ ${Number.parseFloat(total).toFixed(
      2
    )}. Gracias por su Compra!`,
  });
};

const formulario = document.getElementById("formulario");

//agregando tickets a la compra
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarTicketCompra();
  mostrarCompra();
});

mostrarCompra();
// mostrando tickets en tabla

const botonComprar = document.getElementById("boton-comprar");
addlogs(`El total de la compra es ${total}`);
botonComprar.addEventListener("click", (e) => terminaCompra(e));
