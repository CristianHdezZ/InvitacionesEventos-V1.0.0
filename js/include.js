/* ==========================================================
   HTML INCLUDE
   ==========================================================
   Arma la página a partir de los parciales de html/partials.

   Dos detalles del navegador que hay que respetar:

   1) Un <script> insertado con innerHTML/outerHTML NO se
      ejecuta. Por eso las librerías y js/script.js no se
      incluyen en un parcial: se crean aquí como elementos
      <script> reales, en orden.

   2) Para cuando terminan los fetch, el evento DOMContentLoaded
      ya pasó. Por eso los scripts se cargan DESPUÉS de que todo
      el HTML está puesto, y js/script.js arranca solo al ver
      que el documento ya está listo.
   ========================================================== */

"use strict";

class HtmlInclude {

    constructor() {

        this.elements = [
            ...document.querySelectorAll("[data-include]")
        ];

    }

    /* Descarga todos los parciales en paralelo, pero los inserta
       en el orden del documento para no alterar el diseño. */
    async load() {

        const descargas = this.elements.map(async (element) => {

            const file = element.dataset.include;

            try {

                const response = await fetch(file);

                if (!response.ok) {
                    throw new Error("HTTP " + response.status);
                }

                return { element, html: await response.text() };

            } catch (error) {

                console.error("No se pudo cargar:", file, error);

                return { element, html: null };

            }

        });

        for (const { element, html } of await Promise.all(descargas)) {

            if (html !== null) {
                element.outerHTML = html;
            }

        }

    }

}

/* Librerías por CDN + el JS de la invitación. El orden importa:
   js/script.js usa AOS, Swiper, confetti, jsPDF, etc. */
const SCRIPTS = [
    "https://unpkg.com/aos@2.3.4/dist/aos.js",
    "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
    "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js",
    "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js",
    "https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.5.0/tsparticles.confetti.bundle.min.js",
    "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.5.0/tsparticles.all.bundle.min.js",
    "https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js",
    "https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js",
    "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
    "js/script.js"
];

function cargarScript(src) {

    return new Promise((resolve) => {

        const script = document.createElement("script");

        script.src = src;
        script.async = false;

        /* Si una librería del CDN falla, se sigue igual: cada
           uso está protegido con typeof en js/script.js. */
        script.onload = resolve;
        script.onerror = () => {
            console.error("No se pudo cargar el script:", src);
            resolve();
        };

        document.body.appendChild(script);

    });

}

async function iniciar() {

    const include = new HtmlInclude();

    await include.load();

    for (const src of SCRIPTS) {
        await cargarScript(src);
    }

}

if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", iniciar);

} else {

    iniciar();

}
