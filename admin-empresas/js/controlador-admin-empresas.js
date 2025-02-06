var indiceCategoriaSeleccionada = null;
var indiceEmpresaSeleccionada = null;

var myModal = new bootstrap.Modal(document.getElementById('modalInformacionProducto'), {
    keyboard: false
})

function mostrarEmpresas() {
    document.getElementById('iniciarSesion').style.display = 'none';
    document.getElementById('adminEmpresas').style.display = 'inline-block';
    document.getElementById('barraEncabezado').style.display = 'inline-block'
}

function agregarNuevaEmpresa() {
    indiceEmpresaSeleccionada = null;
    indiceCategoriaSeleccionada = null;

    document.getElementById('modalInformacionProductoLabel').innerHTML = '';
    document.getElementById('liveToastBtn').style.display = 'inline-block';
    document.getElementById('btn-actualizar').style.display = 'none';
    document.getElementById('nombreEmpresa').value = '';
    document.getElementById('logoEmpresa').src = '';
    document.getElementById('direccionEmpresa').value = '';
    document.getElementById('telefonoEmpresa').value = '';
    document.getElementById('nombreEmpresa').focus();

    document.getElementById('modalInformacionProductoLabel').innerHTML = "Ingreso de una nueva empresa";
    
    myModal.show();
}

function mostrarAdminEmpresas(campo) {
    var titulo = campo.textContent;
    document.getElementById('panelEmpresa').style.display = 'inline-block';
    document.getElementById('tituloOpcion').innerHTML = titulo;

    document.getElementById('botonAccion').style.display = 'inline-block';
    document.getElementById('botonAccion').innerHTML = "Agregar Nueva Empresa";

    //document.getElementById('lista-categoria').removeEventListener('change', generarProductosEmpresas, true);
    document.getElementById('lista-categoria').addEventListener('change', generarAdminEmpresas, true);
    generarAdminEmpresas();
}

function imagenPrevia(event) {
    const input = event.target;
    var img = document.getElementById('logoEmpresa');

	if(!input.files.length) return
	
	file = input.files[0];
    objectURL = URL.createObjectURL(file);
	
	img.src = objectURL;
}