let totalClientes = 0;
let clientesSophie = 0;
let clientesHowl = 0;
let clientesCalcifer = 0;
let valorTSophie = 0;
let valorTHowl = 0;
let valorTCalcifer = 0;
let valorDescuentoSophie = 0;
let valorDescuentoHowl = 0;
let valorDescuentoCalcifer = 0;


function calcularCosto(categoria, duracion) {
    const costoDiario = 45;
    let descuento = 0;

    switch (categoria) {
        case "1": // Sophie
            descuento = duracion > 4 ? 0.24 : 0.18;
            clientesSophie++;
            valorTSophie += costoDiario * duracion * (1 - descuento);
            valorDescuentoSophie += (costoDiario * duracion)-(costoDiario * duracion * (1 - descuento));
            break;
        case "2": // Howl
            descuento = duracion > 3 ? 0.15 : 0.10;
            clientesHowl++;
            valorTHowl += costoDiario * duracion * (1 - descuento);
            valorDescuentoHowl += (costoDiario * duracion)-(costoDiario * duracion * (1 - descuento));
            break;
        case "3": // Calcifer
            descuento = duracion > 2 ? 0.09 : 0.05;
            clientesCalcifer++;
            valorTCalcifer += costoDiario * duracion * (1 - descuento);
            valorDescuentoCalcifer += (costoDiario * duracion)-(costoDiario * duracion * (1 - descuento));

            break;
        default:
            console.error("Categoría de membresía no válida.");
            return 0;
    }

    let costoCliente = costoDiario * duracion * (1 - descuento);

    if (costoCliente < 0) {
        costoCliente = 0; // Si el costo es negativo, establecerlo a cero
    }

    return costoCliente;
}

function registrarCliente() {
    const nombre = document.getElementById("nombre").value;
    const cedula = document.getElementById("cedula").value;
    const categoria = document.getElementById("categoria").value;
    const duracionCrucero = parseFloat(document.getElementById("duracionCrucero").value);

    // Validar la duración del crucero
    if (isNaN(duracionCrucero) || duracionCrucero <= 0) {
        console.error("La duración del crucero no es válida.");
        return;
    }

    totalClientes++;

    const costoCliente = calcularCosto(categoria, duracionCrucero);
    const costoDiario = 45;
    const porcentajeDescuento = ((duracionCrucero * costoDiario - costoCliente) / (duracionCrucero * costoDiario)) * 100;

    
    // Mostrar resultados en la tabla de clientes registrados
    const tablaClientes = document.getElementById("clientesRegistrados");
    const fila = tablaClientes.insertRow();
    const celdaNombre = fila.insertCell(0);
    const celdaCedula = fila.insertCell(1);
    const celdaCategoria = fila.insertCell(2);
    const celdaCostoCrucero = fila.insertCell(3);
    const celdaDescuento = fila.insertCell(4);
    const celdaCostoPagar = fila.insertCell(5);
    const celdaDescuentoAplicado = fila.insertCell(6);
    
    celdaNombre.innerHTML = nombre;
    celdaCedula.innerHTML = cedula;
    celdaCategoria.innerHTML = categoria;
    celdaCostoCrucero.innerHTML = (duracionCrucero * costoDiario).toFixed(2);
    celdaDescuento.innerHTML = (duracionCrucero * costoDiario - costoCliente).toFixed(2);
    celdaCostoPagar.innerHTML = costoCliente.toFixed(2);
    celdaDescuentoAplicado.innerHTML = porcentajeDescuento.toFixed(2) + "%";

    // Mostrar resultados en la tabla de total de descuentos por membresía
    const tablaDescuentos = document.getElementById("totalDescuentos");
    tablaDescuentos.innerHTML = "";
    const filaSophie = tablaDescuentos.insertRow();
    const filaHowl = tablaDescuentos.insertRow();
    const filaCalcifer = tablaDescuentos.insertRow();
    const filaTotalClientes = tablaDescuentos.insertRow();

    const celdaCategoriaSophie = filaSophie.insertCell(0);
    const celdaDescuentoSophie = filaSophie.insertCell(1);
    const celdaPorcentajeSophie = filaSophie.insertCell(2);
    const celdaCantidadSophie = filaSophie.insertCell(3);

    const celdaCategoriaHowl = filaHowl.insertCell(0);
    const celdaDescuentoHowl = filaHowl.insertCell(1);
    const celdaPorcentajeHowl = filaHowl.insertCell(2);
    const celdaCantidadHowl = filaHowl.insertCell(3);


    const celdaCategoriaCalcifer = filaCalcifer.insertCell(0);
    const celdaDescuentoCalcifer = filaCalcifer.insertCell(1);
    const celdaPorcentajeCalcifer = filaCalcifer.insertCell(2);
    const celdaCantidadCalcifer = filaCalcifer.insertCell(3);

    const celdaCategoriaTotal = filaTotalClientes.insertCell(0);
    const celdaDescuentoTotal = filaTotalClientes.insertCell(1);
    const celdaPorcentajeTotal = filaTotalClientes.insertCell(2);
    const celdaCantidadTotal = filaTotalClientes.insertCell(3);

    celdaCategoriaSophie.innerHTML = "Sophie";
    celdaDescuentoSophie.innerHTML = (valorDescuentoSophie).toFixed(1);
    celdaPorcentajeSophie.innerHTML = (((valorDescuentoSophie) / (valorDescuentoSophie+valorDescuentoHowl+valorDescuentoCalcifer)*100)).toFixed(1) + "%";
    celdaCantidadSophie.innerHTML = (clientesSophie).toFixed(0);

    celdaCategoriaHowl.innerHTML = "Howl";
    celdaDescuentoHowl.innerHTML = (valorDescuentoHowl).toFixed(1);
    celdaPorcentajeHowl.innerHTML = (((valorDescuentoHowl) / (valorDescuentoSophie+valorDescuentoHowl+valorDescuentoCalcifer)*100)).toFixed(1) + "%";
    celdaCantidadHowl.innerHTML = (clientesHowl).toFixed(0);
    

    celdaCategoriaCalcifer.innerHTML = "Calcifer";
    celdaDescuentoCalcifer.innerHTML = (valorDescuentoCalcifer).toFixed(1);
    celdaPorcentajeCalcifer.innerHTML = (((valorDescuentoCalcifer) / (valorDescuentoSophie+valorDescuentoHowl+valorDescuentoCalcifer)*100)).toFixed(1) + "%";
    celdaCantidadCalcifer.innerHTML = (clientesCalcifer).toFixed(0);

    celdaCategoriaTotal.innerHTML = "TOTALES";
    const totalDescuentosPorMembresia = valorDescuentoSophie+valorDescuentoHowl+valorDescuentoCalcifer;
    celdaDescuentoTotal.innerHTML = totalDescuentosPorMembresia.toFixed(1);
    
    const porcentajeTotalDescuentos = ((valorDescuentoSophie) / (valorDescuentoSophie+valorDescuentoHowl+valorDescuentoCalcifer)+(valorDescuentoHowl) / (valorDescuentoSophie+valorDescuentoHowl+valorDescuentoCalcifer)+(valorDescuentoCalcifer) / (valorDescuentoSophie+valorDescuentoHowl+valorDescuentoCalcifer)) * 100;
    celdaPorcentajeTotal.innerHTML = porcentajeTotalDescuentos.toFixed(1) + "%";
    
    celdaCantidadTotal.innerHTML = totalClientes.toFixed(0);


}

// Manejo de errores y validación de datos
window.onerror = function (message, source, lineno, colno, error) {
    console.error("Error: " + message);
    return true;
};
