const staticOptiEntregas = "opti-entregas-site-v1";
const assets = [
    "/",
    "/index.html",
    "/css/estilos.css",
    "/css/estilos-barra-navegacion.css",
    "/js/controlador.js",
    "/img/Banner-sfb.png",
    "/img/logo.png",
    "/img/categorias",
    "/assets/js/controlador.js",
    "/admin-empresas",
    "/admin-motoristas",
    "/admin-ordenes-pendientes",
    "/admin-productos-empresas",
    "/admin-empresas",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticOptiEntregas).then(cache => {
            cache.addAll(assets)
        })
    )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
});