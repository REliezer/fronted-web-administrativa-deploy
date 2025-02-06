var indiceMotoristaSeleccionado = null;

function mostrarMotoristas(campo) {
    var titulo = campo.textContent;
    document.getElementById('panelEmpresa').style.display = 'inline-block';
    document.getElementById('tituloOpcion').innerHTML = titulo;

    //document.getElementById('botonAccion').style.display = 'inline-block';
    //document.getElementById('botonAccion').innerHTML = "Agregar Nueva Empresa";

    document.getElementById('lista-categoria').style.display = 'none';
    

    if (titulo === "Motoristas Autorizados") {
        generarMotoristasAutorizados();
    } else {
        generarMotoristasPendientes();
    }
}