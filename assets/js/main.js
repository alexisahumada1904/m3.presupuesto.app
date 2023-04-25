class Productos {
  constructor(nombre, precio) {
    this.id = Date.now(); // id generado automaticamente
    this.nombre = nombre;
    this.precio = precio;
  }
}

let presupuesto = 0;
let total = 0;
let saldo = 0;

//JQuery para obtener presupuesto ingresado.
$("#btnCalcular").on("click", function () {
  presupuesto = document.getElementById("inputPresupuesto").value;
  document.getElementById("pantallaPresupuesto").innerText = `$ ${presupuesto}`;
  document.getElementById("pantallaSaldo").innerText = "$ 0";
  actualizarTotal();
});
//JQuery para obtener nombre y valor/precio del gasto. 
$("#btnGasto").on("click", function () {
  let nombre = document.getElementById("inputNombreGasto").value;
  let precio = document.getElementById("inputPrecioGasto").value;
  if (nombre === "") {
    alert("Ingresa el nombre del gasto.");
    return;
  } else if (precio === "" || isNaN(precio)) {
    alert("Ingresa la cantidad del gasto correcta.");
    return;
  } else {
    let producto = new Productos(nombre, parseInt(precio));
    agregarProducto(producto);
  }
});

let listaProductos = []; // arreglo para almacenar los productos

function agregarProducto(producto) {
  if (producto.precio <= presupuesto - total) {
    listaProductos.push(producto); // agregar el nuevo producto al arreglo
    actualizarLista(); // actualizar la lista en el HTML
    actualizarTotal(); // actualizar el total en el HTML
  } else {
    return alert("El monto ingresado supera el saldo y/o presupuesto.");
  }
}

function actualizarLista() {
  const tabla = document.getElementById("lista");
  tabla.innerHTML = ""; // limpiar la lista antes de actualizarla
  listaProductos.forEach((producto) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    td1.innerHTML = `${producto.nombre}`;
    td2.innerHTML = `$${producto.precio}`;
    td3.innerHTML = `<i class="bi bi-trash3 text-warning"></i>`;
    td3.addEventListener("click", () => {
      borrarProducto(producto.id);
    });
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tabla.appendChild(tr);
  });
}

function borrarProducto(id) {
  listaProductos = listaProductos.filter((producto) => producto.id !== id); // filtrar el producto que se quiere borrar y dejando el resto en el arreglo.
  actualizarLista(); // actualizar la lista en el HTML.
  actualizarTotal(); // actualizar el total en el HTML.
}

function actualizarTotal() {
  total = listaProductos.reduce((suma, producto) => suma + producto.precio, 0);
  saldo = presupuesto - total;
  document.getElementById("pantallaGasto").innerHTML = `$ ${total}`;
  document.getElementById("pantallaSaldo").innerHTML = `$ ${saldo} `;
}
