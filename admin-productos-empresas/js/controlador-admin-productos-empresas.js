function mostrarProductoEmpresas(campo) {
    var titulo = campo.textContent;
    document.getElementById('lista-categoria').style.display = 'none';
    document.getElementById('lista-categoria-producto').style.display = 'block';
    
    var panel = document.getElementById('panelEmpresa');
    if (!panel) {
        console.error("Error: 'panelEmpresa' no encontrado en el DOM.");
        return;
    }

    panel.style.display = 'inline-block';

    document.getElementById('tituloOpcion').innerHTML = titulo;
    document.getElementById('botonAccion').style.display = 'none';
    //document.getElementById('lista-categoria').removeEventListener('change', generarAdminEmpresas, true);
    //document.getElementById('lista-categoria').addEventListener('change', generarProductosEmpresas, true);

    document.getElementById('mostrarOpciones').innerHTML = '';
   
    //Cargar productos
    obtenerProductosEmpresas().then(() => {
        if (productosEmpresas && productosEmpresas.length > 0) {
            generarProductosEmpresas();
        } else {
            console.error("No se pudieron cargar los productos.");
        }
    });
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