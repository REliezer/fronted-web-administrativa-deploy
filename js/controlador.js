
function muestraReloj() {
    var fechaHora = new Date();
    var horas = fechaHora.getHours();
    var minutos = fechaHora.getMinutes();
    var segundos = fechaHora.getSeconds();
    var dia = fechaHora.getDate();
    var mes = fechaHora.getMonth();
    var ano = fechaHora.getFullYear()

    var sufijo = ' am';
    if (horas > 12) {
        horas = horas - 12;
        sufijo = ' pm';
    }

    if (horas < 10) { 
        horas = '0' + horas;
    }
    if (minutos < 10) { 
        minutos = '0' + minutos;
    }
    if (segundos < 10) { 
        segundos = '0' + segundos; 
    }

    document.getElementById('horaActual').innerHTML = `${dia}/${mes + 1}/${ano} ${horas}:${minutos}:${segundos} ${sufijo}`;
}

window.onload = function () {
    setInterval(muestraReloj, 1000);
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}