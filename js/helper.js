localStorage.setItem("categorias", JSON.stringify(ticketCategorias));
localStorage.setItem("formsDdPago", formasDePago);
localStorage.setItem("puertos", puertos);

const selectOrigen = document.getElementById("origenSelect");
selectOrigen.setAttribute("option", "hola");

localStorage.getItem("puertos");

// opciones de selects
const puertosArray = localStorage.getItem("puertos").split(",");
puertosArray.forEach(function (opcion) {
  const puertosItems = document.createElement("option");
  puertosItems.value = opcion;
  puertosItems.textContent = opcion;
  origenSelect.appendChild(puertosItems);
});
puertosArray.forEach(function (opcion) {
  const puertosItems = document.createElement("option");
  puertosItems.value = opcion;
  puertosItems.textContent = opcion;
  destinoSelect.appendChild(puertosItems);
});
const categoriasList = JSON.parse(localStorage.getItem("categorias"));
categoriasList.forEach((opcion) => {
  const categoriaItem = document.createElement("option");
  categoriaItem.value = opcion.clase;
  categoriaItem.textContent = opcion.descripcion;
  categoriaSelect.appendChild(categoriaItem);
});

//contruir cards
const cards = document.getElementById("div-card");
categoriasList.forEach((item) => {
  const cardTicket = document.createElement("div");

  cardTicket.className = "card-ticket";
  const parrafoCategoria = document.createElement("p");
  parrafoCategoria.className = "note";
  parrafoCategoria.textContent = item.descripcion;
  cardTicket.appendChild(parrafoCategoria);

  const parrafoPrecio = document.createElement("p");
  parrafoPrecio.className = "price";
  parrafoPrecio.textContent = "£" + item.precio;
  cardTicket.appendChild(parrafoPrecio);

  const parrafoNota = document.createElement("p");
  parrafoNota.textContent = "(El precio es aprox. por tramo)";
  cardTicket.appendChild(parrafoNota);

  cards.appendChild(cardTicket);
});
