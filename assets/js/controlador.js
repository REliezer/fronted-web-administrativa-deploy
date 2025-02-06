var indiceCategoriaSeleccionada = null;
var indiceEmpresaSeleccionada = null;
var idPedido = null;
let administradores;
let ordenes;
let motoristas;
let categorias;
let empresasCategorias;
let productosEmpresas;

const obtenerCategorias = async () => {
    const result = await fetch('https://backend-optientregas.vercel.app/categorias',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' //mime type
            },
        }
    );
    categorias = await result.json();
    console.log('Categorias MongoDB', categorias);
}

const obtenerEmpresasCategorias = async () => {
    const result = await fetch('https://backend-optientregas.vercel.app/empresasCategorias',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );
    empresasCategorias = await result.json();
    console.log('Empresas Categorias MongoDB', empresasCategorias);
}

const obtenerProductosEmpresas = async () => {
    const result = await fetch('https://backend-optientregas.vercel.app/productos',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );
    productosEmpresas = await result.json();
    console.log('Productos Empresas MongoDB', productosEmpresas);
}

const obtenerOrdenes = async () => {
    const orden = await fetch('https://backend-optientregas.vercel.app/ordenes/',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );
    ordenes = await orden.json();
    console.log('Ordenes disponibles en MongoDB', ordenes);
}

const obtenerAdministradores = async () => {
    const admin = await fetch('https://backend-optientregas.vercel.app/admin/',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );
    administradores = await admin.json();
    console.log('Administradores en MongoDB', administradores);
}

const obtenerMotoristas = async () => {
    const result = await fetch('https://backend-optientregas.vercel.app/motoristas/',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );
    motoristas = await result.json();
    console.log('Motoristas registrados MongoDB', motoristas);
}

const iniciarSesion = async () => {
    const myModalLogin = new bootstrap.Modal(document.getElementById('modalLoginConfirmacion'), {
        keyboard: false
    });

    var correo = document.getElementById('correoElectronico').value;
    var contrasena = document.getElementById('contrasena').value;
    var url = `https://backend-optientregas.vercel.app/admin/${correo}`;

    const buscarAdmin = await fetch(url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

    const resultado = await buscarAdmin.json();
    var primerNombre = resultado[0].nombre.split(' ');
    var primerApellido = resultado[0].apellidos.split(' ');

    if ((resultado[0].correoElectronico === correo) && (resultado[0].contrasena === contrasena)) {
        console.log(`Bienvenido ${resultado[0].nombre}`);
        document.getElementById('nombreAdmin').innerHTML = primerNombre[0] + " " + primerApellido[0]; //arreglar

        document.getElementById('modalMensajeLogin').innerHTML =
            `<i class="fa-solid fa-circle-check fa-2x fa-pull-right" style="color: #316120"></i>
            Bienvenido ${resultado[0].nombre} ${resultado[0].apellidos}<br>
            Hay ${ordenes.length} ordenes disponibles.
            `;

        document.getElementById('modalPieLogin').innerHTML =
            `<button type="button" class="btn btn-success" data-bs-dismiss="modal" onclick="mostrarEmpresas();">Aceptar</button>`;
    } else {
        console.log('Usuario Incorrecto');
        document.getElementById('modalMensajeLogin').innerHTML =
            `<i class="fa-solid fa-circle-exclamation fa-2x fa-pull-left" style="color: #A0333C"></i>
        ¡Correo Electronico o Contraseña incorrecto!`;

        document.getElementById('modalPieLogin').innerHTML =
            `<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Aceptar</button>`;
    }

    myModalLogin.show();
}

//admin empresas
var myModal = new bootstrap.Modal(document.getElementById('modalInformacionProducto'), {
    keyboard: false
})

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
    toastTrigger.addEventListener('click', () => {
        const toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
    })
}

const generarCategorias = async () => {
    for (let i = 0; i < categorias.length; i++) {
        document.getElementById('lista-categoria').innerHTML +=
            `<option value="${i}">${categorias[i].nombreCategoria}</option>`;

        document.getElementById('categoriaEmpresa').innerHTML +=
            `<option value="${i}">${categorias[i].nombreCategoria}</option>`;
    }
}

const generarAdminEmpresas = async () => {
    indiceCategoriaSeleccionada = document.getElementById('lista-categoria').value;
    console.log("Cargar empresas de la categoria: ", indiceCategoriaSeleccionada);
    document.getElementById('mostrarOpciones').innerHTML = '';

    for (let i = 0; i < empresasCategorias[indiceCategoriaSeleccionada].empresas.length; i++) {
        document.getElementById('mostrarOpciones').innerHTML +=
            `<div class="col-6">
                <div class="card" style="height: 13rem;">
                    <img src="./${empresasCategorias[indiceCategoriaSeleccionada].empresas[i].logoEmpresa}" class="card-img-top">
                    <div style="position: absolute; right: 15px;">
                        <i class="fa-solid fa-trash fa-xs icono-accion" style="color: #A0333C;" onclick="eliminarEmpresa('${empresasCategorias[indiceCategoriaSeleccionada]._id}', '${empresasCategorias[indiceCategoriaSeleccionada].empresas[i].idEmpresa}');"></i>
                        <i class="fa-solid fa-pen-to-square fa-xs icono-accion" style="color: #195E95;" onclick="editarEmpresa('${empresasCategorias[indiceCategoriaSeleccionada]._id}', '${empresasCategorias[indiceCategoriaSeleccionada].empresas[i].idEmpresa}');"></i>
                    </div>
                    <div class="card-body">
                        <h6 class="">${empresasCategorias[indiceCategoriaSeleccionada].empresas[i].nombreEmpresa}</h6>
                        <p class="texto-general">${empresasCategorias[indiceCategoriaSeleccionada].empresas[i].direccionEmpresa}</p>                        
                    </div>
                </div>
            </div>`;
    }
}

const eliminarEmpresa = async (idCategoria, idEmpresa) => {
    let idEmpresaEliminar = {
        idEmpresa: idEmpresa
    }

    const eliminarEmpresaCategoria = await fetch(`https://backend-optientregas.vercel.app/empresasCategorias/${idCategoria}/empresas/`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(idEmpresaEliminar),
        });
    console.log('Empresa Eliminada =(');

    obtenerEmpresasCategorias().then(() => {
        generarAdminEmpresas();
        generarProductosEmpresas();
    });

}

const editarEmpresa = async (idCategoria, idEmpresa) => {
    var index = document.getElementById('lista-categoria').value;
    document.getElementById('modalInformacionProductoLabel').innerHTML = '';
    document.getElementById('btn-actualizar').style.display = 'none';
    document.getElementById('modalInformacionProductoLabel').innerHTML = "Editar Información de la empresa";

    const result = await fetch(`https://backend-optientregas.vercel.app/empresasCategorias/${idCategoria}/`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );
    empresaProducto = await result.json();
    console.log(empresaProducto);

    for (let i = 0; i < empresaProducto[0].empresas.length; i++) {
        if (empresaProducto[0].empresas[i].idEmpresa === idEmpresa) {            
            document.getElementById('nombreEmpresa').value = empresaProducto[0].empresas[i].nombreEmpresa;
            document.getElementById('logoEmpresa').src = empresaProducto[0].empresas[i].logoEmpresa;
            document.getElementById('direccionEmpresa').value = empresaProducto[0].empresas[i].direccionEmpresa;
            document.getElementById('telefonoEmpresa').value = empresaProducto[0].empresas[i].telefonoEmpresa;
            document.getElementById('categoriaEmpresa').value = index;
            document.getElementById('liveToastBtn').style.display = 'none';
            document.getElementById('btn-actualizar').style.display = 'inline-block';
            document.getElementById('btn-actualizar').style.display = 'inline-block';
            document.getElementById('btn-actualizar').addEventListener('click', function () { actualizarEmpresa(`${empresaProducto[0]._id}`, `${empresaProducto[0].empresas[i].idEmpresa}`) });
            break;
        }        
    }
    myModal.show();
}

const guardarNuevaEmpresa = async () => {
    var categoria = document.getElementById('categoriaEmpresa').value;

    const empresaNueva = {
        nombreEmpresa: document.getElementById('nombreEmpresa').value,
        logoEmpresa: document.getElementById('logoEmpresa').src,
        direccionEmpresa: document.getElementById('direccionEmpresa').value,
        telefonoEmpresa: document.getElementById('telefonoEmpresa').value
    };

    const nuevaEmpresaCategoria = await fetch(`https://backend-optientregas.vercel.app/empresasCategorias/${empresasCategorias[categoria]._id}/empresas/`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empresaNueva),
        });
    const resultado = await nuevaEmpresaCategoria.json();
    console.log('Nueva empresa agregada', resultado);


    obtenerEmpresasCategorias().then(() => {
        generarAdminEmpresas();
        generarProductosEmpresas();
    });

    const productosEmpresaNueva = {
        idEmpresa: (empresasCategorias[categoria].empresas[empresasCategorias[categoria].empresas.length - 1].idEmpresa),
        productos: []
    };
    const nuevaProductoEmpresa = await fetch(`https://backend-optientregas.vercel.app/productos`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productosEmpresaNueva),
        });
    const resultado2 = await nuevaProductoEmpresa.json();
console.log(resultado2);

    myModal.hide();
    obtenerEmpresasCategorias();

}

const actualizarEmpresa = async (idCategoria, idEmpresa) => {
    console.log(idCategoria);
    console.log(idEmpresa);    
    var imagen = '';

    let url = `https://backend-optientregas.vercel.app/empresasCategorias/${idCategoria}/empresas/`;
    const result = await fetch(`https://backend-optientregas.vercel.app/empresasCategorias/${idCategoria}/`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );
    empresaA = await result.json();

    for (let i = 0; i < empresaA[0].empresas.length; i++) {
        if (empresaA[0].empresas[i].idEmpresa === idEmpresa) {
            imagen = empresaA[0].empresas[i].logoEmpresa;
        break;
        }
    }

    const empresaActualizar = {
        idEmpresa: idEmpresa,
        nombreEmpresa: document.getElementById('nombreEmpresa').value,
        logoEmpresa: imagen,
        direccionEmpresa: document.getElementById('direccionEmpresa').value,
        telefonoEmpresa: document.getElementById('telefonoEmpresa').value
    };

    const empresaEliminar = {
        idEmpresa: idEmpresa
    };
    
    const eliminar = await fetch(url,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(empresaEliminar),
        }
    );

    const resultado = await fetch(url,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(empresaActualizar),
        }
    );

    empresaModificada = await resultado.json();
    console.log('Empresas Modificada MongoDB', empresaModificada);

    obtenerEmpresasCategorias().then(() => {
        generarAdminEmpresas();
        generarProductosEmpresas();
    });
    myModal.hide();
}

//motoristas
function generarMotoristasAutorizados() {
    document.getElementById('mostrarOpciones').innerHTML = '';

    motoristas.forEach(motoristas => {
        let estado = '';
        if (motoristas.disponible) {
            estado = `<i class="fa-solid fa-circle" style="color: green"></i> Disponible`;
        } else {
            estado = `<i class="fa-solid fa-circle" style="color: gray"></i> Ocupado`;
        }
        if (motoristas.verificada) {
            document.getElementById('mostrarOpciones').innerHTML +=
                `<div class="col-12">
                <div class="card" style="height: 10rem;">
                    <div style="position: absolute; top: 40px; left: 20px; display: flex; align-items: center;">
                        <img src="./${motoristas.imagen}" width="80" height="80" style="border-radius: 100%;">
                    </div>
                    <div class="card-body" style="position: absolute; top: 0; left: 100px;">
                        <h6>${motoristas.nombre} ${motoristas.apellidos}</h6>
                        <p class="texto-general">${motoristas.dni}</p>
                        <p class="texto-general">${motoristas.correoElectronico}</p>
                        <p class="texto-general">${motoristas.telefono}</p>
                        <p class="texto-general">${estado}</p>
                    </div>
                </div>
            </div>`;
        }
    });
}

function generarMotoristasPendientes() {
    document.getElementById('mostrarOpciones').innerHTML = '';
    motoristas.forEach((motoristas, i) => {
        let estado = '';
        if (motoristas.disponible) {
            estado = `<i class="fa-solid fa-circle" style="color: green"></i> Disponible`;
        } else {
            estado = `<i class="fa-solid fa-circle" style="color: gray"></i> Ocupado`;
        }

        if (!motoristas.verificada) {
            document.getElementById('mostrarOpciones').innerHTML +=
                `<div class="col-12">
                <div class="card" style="height: 12rem;">
                    <div style="position: absolute; top: 40px; left: 20px; display: flex; align-items: center;">
                        <img src="./${motoristas.imagen}" width="80" height="80" style="border-radius: 100%;">
                    </div>
                    <div class="card-body" style="position: absolute; top: 0; left: 100px;">
                        <h6>${motoristas.nombre} ${motoristas.apellidos}</h6>
                        <p class="texto-general">${motoristas.dni}</p>
                        <p class="texto-general">${motoristas.correoElectronico}</p>
                        <p class="texto-general">${motoristas.telefono}</p>
                        <p class="texto-general">${estado}</p>
                        <div class="d-flex mb-2 mt-2" style="weight: 250px">
                            <button type="button" class="btn btn-danger boton-opti" id="btnAprobarMotorista${i}" onclick="aprobarMotorista('${motoristas._id}');">Aprobar</button>
                        </div>
                    </div>
                    
                </div>
            </div>`;
        }
    });
}

const aprobarMotorista = async (idMotorista) => {
    var url = `https://backend-optientregas.vercel.app/motoristas/${idMotorista}`;

    motoristasAprobado = {
        verificada: true
    };

    const motoristaAprobado = await fetch(url,
        {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(motoristasAprobado),
        });
    const nuevoMotorista = await motoristaAprobado.json();
    console.log('True:', nuevoMotorista);

    obtenerMotoristas().then(() => {
        generarMotoristasAutorizados();
        generarMotoristasPendientes();
    });
}

//ordenes-pendientes
const generarOrdenesPendientes = async () => {
    document.getElementById('mostrarOpciones').innerHTML = '';


    ordenes.forEach((orden, i) => {
        document.getElementById('mostrarOpciones').innerHTML +=
            `<div class="col-4">
            <div class="card mb-3 fondo" style="width: 15rem;">                
                <div class="card-body" id="div${i}">
                    <h6>Orden ${i + 1}</h6>
                    <form class="row">
                        <div class="col-auto mb-2">
                            <label class="form-label">Cliente:</label>
                            <input class="form-control" type="text" value="${orden.nombreCliente}" readonly>
                        </div>
                        <div class="col-auto mb-2">
                            <label class="form-label">Dirección:</label>
                            <input class="form-control" type="text" value="${orden.direccion}" readonly>
                        </div>
                        <div class="col-auto mb-2">
                            <label class="form-label">Teléfono:</label>
                            <input class="form-control" type="text" value="${orden.telefono}" readonly>
                        </div>
                    </form>
                    <button type="button" class="btn btn-primary" onclick="mostralModalInformacion('${orden._id}');">Mas información</button>
                    
                </div>
            </div>
        </div>`;

    });
}

const mostralModalInformacion = async (idOrden) => {
    var myModal = new bootstrap.Modal(document.getElementById('modalInformacionProducto'), {
        keyboard: false
    })
    idPedido = idOrden;
    console.log(idPedido);

    document.getElementById('modalCuerpoInformacion').innerHTML = '';
    document.getElementById('modalInformacionProductoLabel').innerHTML = '';
    document.getElementById('btnAsignar').style.display = 'inline-block';
    document.getElementById('modalInformacionProductoLabel').innerHTML = "Detalles del Pedido";

    let url = `https://backend-optientregas.vercel.app/ordenes/${idOrden}`;

    const buscarOrden = await fetch(url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );
    const ordenEncontrada = await buscarOrden.json();

    console.log('Orden encontrada en MongoDB', ordenEncontrada);

    var descripcion = '';
    let pedido = ordenEncontrada[0].detallePedido;

    for (let i = 0; i < pedido.length; i++) {
        descripcion += `${ordenEncontrada[0].detallePedido[i].cantidad} ${ordenEncontrada[0].detallePedido[i].nombreProducto} x ${ordenEncontrada[0].detallePedido[i].precioProducto}\n`;
    }
    document.getElementById('modalCuerpoInformacion').innerHTML +=
        `<div class="col-6 mb-3 shadow-sm p-3 bg-body rounded texto-general" style="margin-right: auto; margin-left: auto;">
            <div>
                <label class="form-label">Productos</label>
                <textarea class="form-control" id="textArea" readonly>${descripcion}</textarea>
            </div>
            <form>
                <div class="mb-2">
                    <label class="form-label">Tipo de Pago</label>
                    <input type="text" class="form-control" id="tipoPago" value="${ordenEncontrada[0].tipoPago}" readonly>
                </div>
                <div class="mb-2">
                    <label class="form-label">Subtotal</label>
                    <input type="text" class="form-control" id="subtotal" value="Lps. ${ordenEncontrada[0].subtotal}" readonly>
                </div>
                <div class="mb-2">
                    <label class="form-label">Impuesto</label>
                    <input type="text" class="form-control" id="isv" value="Lps. ${ordenEncontrada[0].impuesto}" readonly>
                </div>
                <div class="mb-2">
                    <label class="form-label">Comision</label>
                    <input type="text" class="form-control" id="comision" value="Lps. ${ordenEncontrada[0].comision}" readonly>
                </div>
                <div class="mb-2">
                    <label class="form-label">Total a pagar</label>
                    <input type="text" class="form-control" id="totalPagar" value="Lps. ${ordenEncontrada[0].totalPagar}" readonly>
                </div>
            </form>
    </div>`;
    var opciones = '';
    var contador = 0;
    motoristas.forEach((motoristas, i) => {
        if ((motoristas.verificada) && (motoristas.disponible)) {
            if (contador === 0) {
                opciones =
                    `<li class="list-group-item">
                    <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="${motoristas._id}" id="radio${contador}" checked>
                    <label class="form-check-label" for="radio${contador}">${motoristas.nombre} ${motoristas.apellidos}</label>
                </li>`;
                contador++;
            } else {
                opciones +=
                    `<li class="list-group-item">
                    <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="${motoristas._id}" id="radio${contador}">
                    <label class="form-check-label" for="radio${contador}">${motoristas.nombre} ${motoristas.apellidos}</label>
                </li>`;
                contador++;
            }
        }
    });
    document.getElementById('modalCuerpoInformacion').innerHTML +=
        `<div class="col-6 mb-3 shadow-sm p-3 bg-body rounded texto-general" style="margin-right: auto; margin-left: auto;">
            <h6>Motoristas Disponibles</h6>   
            <ul class="list-group">
                ${opciones}
            </ul>
        </div>`;

    myModal.show();
}

const asignarOrden = async () => {
    var selected = false;
    var radios = document.getElementsByName('listGroupRadio');
    for (var radio of radios) {
        if (radio.type === 'radio' && radio.checked) {
            let url = `https://backend-optientregas.vercel.app/motoristas/${radio.value}/ordenesTomadas`;

            const buscarOrden = await fetch(`https://backend-optientregas.vercel.app/ordenes/${idPedido}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
            const ordenEncontrada = await buscarOrden.json();

            let ordenActualizar = {
                estado: "Tomada"
            }
            //guardamos los datos en un array
            let ordenAgregar = {
                id: ordenEncontrada[0]._id,
                nombreCliente: ordenEncontrada[0].nombreCliente,
                direccion: ordenEncontrada[0].direccion,
                telefono: ordenEncontrada[0].telefono,
                detallePedido: ordenEncontrada[0].detallePedido,
                tipoPago: ordenEncontrada[0].tipoPago,
                subtotal: ordenEncontrada[0].subtotal,
                impuesto: ordenEncontrada[0].impuesto,
                comision: ordenEncontrada[0].comision,
                totalPagar: ordenEncontrada[0].totalPagar,
                estado: "Tomada"
            }
            //insertamos la orden en el motorista
            const nuevaOrdenTomada = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ordenAgregar),
            });

            const actualizarOrden = await fetch(`https://backend-optientregas.vercel.app/ordenes/${idPedido}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ordenActualizar),
            });

            obtenerOrdenes().then(() => {
                generarOrdenesPendientes();
            });
            alert('Pedido asignado');
            selected = true;
        }
    }

    if (!selected) {
        alert('Selecciona un motorista');
    }
}

//productos-empresa
var modal = new bootstrap.Modal(document.getElementById('modalProductoEmpresa'), {
    keyboard: false
})

const generarProductosEmpresas = async () => {
    var index = document.getElementById('lista-categoria').value;
    var longitud = empresasCategorias[index].empresas.length;
    
    console.log("Empresas de la categoria: ", index);
    document.getElementById('mostrarOpciones').innerHTML = '';
    
    for (let i = 0; i < longitud; i++) {
        var idEmpresaCategoria = empresasCategorias[index].empresas[i].idEmpresa;        
            const result = await fetch(`https://backend-optientregas.vercel.app/productos/${idEmpresaCategoria}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
            const resultaProductos = await result.json();
            document.getElementById('mostrarOpciones').innerHTML +=
                `<div class="col-6">
                    <div class="card" style="height: 15rem;">
                        <img src="./${empresasCategorias[index].empresas[i].logoEmpresa}" class="card-img-top">
                        <div class="card-body">
                            <h6 class="">${empresasCategorias[index].empresas[i].nombreEmpresa}</h6>
                            <p class="texto-empresa" onclick="mostrarProductos('${idEmpresaCategoria}');">${resultaProductos[0].productos.length} productos registrados.</p>
                        </div>
                    </div>
                </div>`;
    }
}

const mostrarProductos = async (idEmpresa) => {    
    document.getElementById('modalContenido').innerHTML = '';
    for (let i = 0; i < empresasCategorias.length; i++) {
        for (let j = 0; j < empresasCategorias[i].empresas.length; j++) {
            if ((empresasCategorias[i].empresas[j].idEmpresa) === idEmpresa) {
                document.getElementById('modalTitulo').innerHTML = `Productos de ${empresasCategorias[i].empresas[j].nombreEmpresa}`;
                break;
            }
            break;
        }        
    }

    const result = await fetch(`https://backend-optientregas.vercel.app/productos/${idEmpresa}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );
    const productosEmpresaSeleccionada = await result.json();

    for (let i = 0; i < productosEmpresaSeleccionada[0].productos.length; i++) {
        document.getElementById('modalContenido').innerHTML +=
            `<div class="col-4 mb-3 shadow-sm p-3 bg-body rounded texto-general" style="margin-right: auto; margin-left: auto; width: 30%;">
                <form>
                    <div class="mb-3">
                        <label class="form-label vineta">Nombre del producto</label>
                        <input type="text" class="form-control" id="nombreProducto${i}" value="${productosEmpresaSeleccionada[0].productos[i].nombreProducto}" readonly>
                    </div>
                    <div class="mb-3">
                        <label class="form-label vineta">Descripción</label>
                        <textarea class="form-control" id="descripcionProducto${i}" rows="4" readonly>${productosEmpresaSeleccionada[0].productos[i].descripcion}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label vineta">Precio</label>
                        <input type="text" class="form-control" id="precioProducto${i}" value="${(parseInt(productosEmpresaSeleccionada[0].productos[i].precio)).toFixed(2)}" readonly>
                    </div>
                    <div class="mb-3" id="imagenSelecionada${i}">
                        <label class="form-label vineta">Imagen del Producto</label>
                        <input type="file" class="form-control form-control-sm seleccionar-archivo" onchange="imagenPrevia(event);">
                    </div>
                    <div class="d-flex mb-2 mt-2" style="justify-content: center">
                        <img src="${productosEmpresaSeleccionada[0].productos[i].imagen}" width="180" id="logoEmpresa">
                    </div>
                    <div class="d-flex mb-2 mt-2" >
                        <button type="button" class="btn btn-danger btn-opti-red" id="btn-actualizar-producto${i}" onclick="actualizarProductoEmpresa(${i});">Actualizar</button>
                        <button type="button" class="btn btn-danger btn-opti-red" id="btn-guardar-producto${i}" onclick="guardarProductoEmpresa(${i}, '${idEmpresa}');" style="display: none;">Guardar</button>
                        <button type="button" class="btn btn-danger btn-opti-red" id="btn-eliminar-producto${i}" onclick="eliminarProductoEmpresa('${productosEmpresaSeleccionada[0]._id}', ${productosEmpresaSeleccionada[0].productos[i].idProducto});">Eliminar</button>
                    </div>
                </form>
            </div>`;
    }

    modal.show();
}

const guardarProductoEmpresa = async (indice, idEmpresa) => {
    var text = document.getElementById(`descripcionProducto${indice}`);

    const result = await fetch(`https://backend-optientregas.vercel.app/productos/${idEmpresa}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );
    const productosEmpresaSeleccionada = await result.json();
    var idProductosEmpresa = productosEmpresaSeleccionada[0]._id;
    const actualizarProducto = {
        idProducto: productosEmpresaSeleccionada[0].productos[indice].idProducto,
        nombreProducto: document.getElementById(`nombreProducto${indice}`).value,
        imagen: productosEmpresaSeleccionada[0].productos[indice].imagen,
        imagenLarge: productosEmpresaSeleccionada[0].productos[indice].imagenLarge,
        descripcion: text.value,
        precio: parseInt(document.getElementById(`precioProducto${indice}`).value),        
        otros: []
    };

    if (productosEmpresaSeleccionada[0].productos[indice].otros != ' ') {
        for (let i = 0; i < productosEmpresaSeleccionada[0].productos[indice].otros.length; i++) {
            let productosOtros = {
                descripcionOtro: productosEmpresaSeleccionada[0].productos[indice].otros[i].descripcionOtro,
                precioExtra: productosEmpresaSeleccionada[0].productos[indice].otros[i].precioExtra
            };
            actualizarProducto.otros.push(productosOtros);
        }
    }

    console.log(actualizarProducto);

    const productoEliminar = {
        idProducto: productosEmpresaSeleccionada[0].productos[indice].idProducto
    };

    const eliminar = await fetch(`https://backend-optientregas.vercel.app/productos/${idProductosEmpresa}/productos`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoEliminar),
        }
    );

    const resultado = await fetch(`https://backend-optientregas.vercel.app/productos/${idProductosEmpresa}/`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actualizarProducto),
        }
    );

    productoActualizado = await resultado.json();
    console.log('Producto Modificada MongoDB', productoActualizado);

    obtenerProductosEmpresas();    
    generarProductosEmpresas();
    modal.hide();
}

const eliminarProductoEmpresa = async (idProductosEmpresa, idProducto) => {
    const productoEliminar = {
        idProducto: idProducto
    };

    const eliminar = await fetch(`https://backend-optientregas.vercel.app/productos/${idProductosEmpresa}/productos`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoEliminar),
        }
    );
    
    generarProductosEmpresas();
    modal.hide();
}

obtenerCategorias().then(() => {
    generarCategorias();
});

obtenerEmpresasCategorias().then(() => {
    generarAdminEmpresas();
    //generarProductosEmpresas();
});

obtenerProductosEmpresas();

obtenerOrdenes().then(() => {
    generarOrdenesPendientes();
});

obtenerAdministradores();
obtenerMotoristas().then(() => {
    generarMotoristasAutorizados();
    generarMotoristasPendientes();
});