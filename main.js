const mostrarAlert = (msg) => {
  alert(msg);
};

const addlogs = (msg) => {
  console.log(msg);
};

const ticketOut = ticketCategorias.map((item) => {
  return (
    "(" +
    item.clase +
    ") " +
    item.sectionOrigen +
    "-" +
    item.sectionFin +
    ", " +
    item.clase +
    "° Clase, $" +
    item.precio
  );
});

// clase ticket
let ticketCompra = class {
  constructor(categoria, precio, cantidad) {
    this.categoria = categoria;
    this.precio = precio;
    this.cantidad = cantidad;
  }
};

// clase compra
let Compra = class {
  tickets = [];
  total = 0;

  verificarTicketClase = (ticketsList, categoria) => {
    ///some
    return ticketsList.some((item) => item.categoria === categoria);
  };

  obtenerPrecioTicket = (categoria) => {
    let ticketObt = ticketCategorias.find((item) => item.clase === categoria);
    return ticketObt.precio;
  };

  manejarErrorSeleccion = (ticketsIn) => {
    mostrarAlert("Opcion Incorrecta." + "\n\n" + ticketsIn.join("\n"));
  };

  agregarTicketCompra = () => {
    let cantidad = 0;
    let precio = 0;
    let seguirComprando = false;
    let ticketSeleccionado = "";

    const ticketsIn = ticketCategorias.map((item) => {
      return (
        "(" +
        item.clase +
        ") " +
        item.sectionOrigen +
        "-" +
        item.sectionFin +
        ", " +
        item.clase +
        "° Clase, $" +
        item.precio
      );
    });

    do {
      ticketSeleccionado = prompt(
        "Ingresar Ticket deseado (1), (2) o (3)" + "\n\n" + ticketsIn.join("\n")
      );
      cantidad = parseInt(prompt("Ingresar cantidad"));
      switch (ticketSeleccionado) {
        case "1":
          precio = this.obtenerPrecioTicket(ticketSeleccionado);
          break;
        case "2":
          precio = this.obtenerPrecioTicket(ticketSeleccionado);
          break;
        case "3":
          precio = this.obtenerPrecioTicket(ticketSeleccionado);
          break;
        default:
          manejarErrorSeleccion(ticketsIn);
      }

      let ticket = new ticketCompra(ticketSeleccionado, precio, cantidad);

      let ticketEncontrado = this.tickets.find(
        (item) => item.categoria === ticketSeleccionado
      );

      if (!ticketEncontrado) {
        ///push
        this.tickets.push(ticket);
      } else {
        ticketEncontrado.cantidad += cantidad;
      }

      seguirComprando = confirm("Desea seguir? ");
    } while (seguirComprando);
  };

  mostrarCompra = () => {
    let listaTickets = "";
    let total = 0;
    ///forEach
    this.tickets.forEach((item) => {
      listaTickets =
        listaTickets +
        (" " + item.cantidad + " de " + item.categoria + "° clase,");
      total += Number(item.precio) * Number(item.cantidad);
    });

    mostrarAlert(
      "el total de la compra es: " +
        total +
        ", Los tickets seleccionados son: " +
        listaTickets
    );
  };

  eliminarTicketCompra = (categoriaAEliminar) => {
    ///filter
    this.tickets = this.tickets.filter(
      (objeto) => objeto.categoria !== categoriaAEliminar
    );
  };

  calcularTotal = () => {
    let subtotales = [];
    const initialValue = 0;
    this.tickets.forEach((item) => {
      subtotales.push(item.cantidad * item.precio);
    });
    ///reduce
    this.total = subtotales.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
  };
};

let miCompra = new Compra();

miCompra.agregarTicketCompra();

miCompra.mostrarCompra();

//eliminar ticket de compra
if (confirm("Desea eliminar ticket?")) {
  const ticketsSel = miCompra.tickets.map((item) => {
    return item.cantidad + " Ticket(s) de " + item.categoria + "° Clase";
  });
  let ticAEliminar = prompt(
    "Ingresar Clase de Ticket a eliminar (1), (2) o (3)" +
      "\n\n" +
      ticketsSel.join("\n")
  );
  miCompra.eliminarTicketCompra(ticAEliminar);
}

miCompra.mostrarCompra();

miCompra.calcularTotal();

const mediosDePago = formasDePago.map((item) => {
  return "(" + item.id + ") " + item.medio;
});
let mediosDePagoInput = prompt(
  "Ingresar Medio de Pago Preferido (1), (2) o (3)" +
    "\n\n" +
    mediosDePago.join("\n")
);

let formaDePagoCur = formasDePago.find((item) => item.id === mediosDePagoInput);

let totaConVariacionPorMedioDePago =
  miCompra.total * Number(formaDePagoCur.variacion);

mostrarAlert("El total a pagar es: " + totaConVariacionPorMedioDePago);
