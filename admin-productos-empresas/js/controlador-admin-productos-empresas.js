function mostrarProductoEmpresas(campo) {
    var titulo = campo.textContent;
    document.getElementById('panelEmpresa').style.display = 'inline-block';
    document.getElementById('tituloOpcion').innerHTML = titulo;

    document.getElementById('botonAccion').style.display = 'none';
    document.getElementById('lista-categoria').removeEventListener('change', generarAdminEmpresas, true);
    document.getElementById('lista-categoria').addEventListener('change', generarProductosEmpresas, true);
    generarProductosEmpresas();
}

function actualizarProductoEmpresa(i) {
    document.getElementById(`nombreProducto${i}`).readOnly = false;
    document.getElementById(`descripcionProducto${i}`).readOnly = false;
    document.getElementById(`precioProducto${i}`).readOnly = false;
    document.getElementById(`btn-eliminar-producto${i}`).style.display = 'none';
    document.getElementById(`btn-actualizar-producto${i}`).style.display = 'none';
    document.getElementById(`btn-guardar-producto${i}`).style.display = 'inline-block';
    document.getElementById(`nombreProducto${i}`).focus();
}