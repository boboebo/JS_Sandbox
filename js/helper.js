localStorage.setItem("categorias", JSON.stringify(ticketCategorias));
localStorage.setItem("formsDePago", formasDePago);
localStorage.setItem("puertos", puertos);

const selectOrigen = document.getElementById("origenSelect");
localStorage.getItem("puertos");

// opciones de selects
let puertosArray = [];
fetch("/js/Data/puertos.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      const puertosItems = document.createElement("option");
      puertosItems.value = item;
      puertosItems.textContent = item;
      origenSelect.appendChild(puertosItems);
    });
  });

fetch("/js/Data/puertos.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      const puertosItems = document.createElement("option");
      puertosItems.value = item;
      puertosItems.textContent = item;
      destinoSelect.appendChild(puertosItems);
    });
  });

fetch("/js/Data/categorias.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      const categoriaItem = document.createElement("option");
      categoriaItem.value = item.clase;
      categoriaItem.textContent = item.descripcion;
      categoriaSelect.appendChild(categoriaItem);
    });
  });

//contruir cards
const categoriasList = JSON.parse(localStorage.getItem("categorias"));
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

// section dolar
let contenedorDolar = document.getElementById("div-dolar");
//peticion a api
fetch("https://dolarapi.com/v1/dolares")
  .then((response) => response.json())
  .then((data) => {
    let dataFiltrada = data.filter(
      (item) => item.nombre == "Oficial" || item.nombre == "Blue"
    );
    let tituloDolar = document.createElement("h2");
    tituloDolar.textContent = "Cotizacion del Dolar ";

    dataFiltrada.forEach((item) => {
      const cardDolar = document.createElement("div");

      cardDolar.className = "card-dolar";
      const parrafoNombre = document.createElement("p");
      parrafoNombre.className = "price";
      parrafoNombre.textContent = item.nombre;
      cardDolar.appendChild(parrafoNombre);

      const parrafoVenta = document.createElement("p");
      parrafoVenta.textContent = "Venta: $" + item.venta;
      cardDolar.appendChild(parrafoVenta);
      contenedorDolar.appendChild(cardDolar);

      const parrafoCompra = document.createElement("p");
      parrafoCompra.textContent = "Compra $" + item.compra;
      cardDolar.appendChild(parrafoCompra);
      contenedorDolar.appendChild(cardDolar);
    });
  });
