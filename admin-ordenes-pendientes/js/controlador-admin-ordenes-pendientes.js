function mostrarOrdenesPendientes(campo) {
    var titulo = campo.textContent;

    // 🔴 Limpia el contenido anterior
    document.getElementById('mostrarOpciones').innerHTML = '';
    
    document.getElementById('panelEmpresa').style.display = 'inline-block';
    document.getElementById('tituloOpcion').innerHTML = titulo;

    //document.getElementById('botonAccion').style.display = 'inline-block';
    //document.getElementById('botonAccion').innerHTML = "Agregar Nueva Empresa";

    document.getElementById('lista-categoria').style.display = 'none';
    document.getElementById('lista-categoria-producto').style.display = 'none';

    generarOrdenesPendientes();
}