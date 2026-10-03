import {
    animate,
    stagger,
    createTimeline
} from "https://cdn.jsdelivr.net/npm/animejs@4.2.2/+esm";

const logo = document.querySelector(".logo");
const menu = document.querySelectorAll("nav a");
const heroText = document.querySelector(".hero-text");
const product = document.querySelector(".product");
const features = document.querySelectorAll(".feature");
const startButton = document.querySelector("#startButton");
const contactButton = document.querySelector("#contactButton");

/*
    Esta línea crea una secuencia de animaciones.
    La animación será lenta para que se pueda
    observar cada elemento.
*/

const intro = createTimeline({
    defaults: {
        duration: 1200
    }
});


/*
    Primero aparece el logo.
    outExpo:
    El elemento comienza rápido y termina suavemente.
*/
intro.add(logo, {

    opacity: [0, 1],

    translateY: [-40, 0],

    ease: "outExpo"

});


/*
    Los enlaces aparecen uno por uno.
    delay: stagger(300)
    significa que cada enlace empieza
    300 milisegundos después del anterior.
*/

intro.add(
    menu,
    {
        opacity: [0, 1],
        translateY: [-30, 0],
        ease: "outExpo",
        delay: stagger(300)
    }, "-=500"
);

intro.add(
    heroText,
    {

        opacity: [0, 1],

        translateX: [-80, 0],

        ease: "outExpo"

    },

    "-=500"
);

/*
    El producto aparece desde abajo.
    outElastic produce un pequeño rebote
    al terminar la animación.
*/

animate(product, {
    opacity: [0, 1],
    scale: [0.4, 1],
    translateY: [100, 0],
    duration: 2000,
    ease: "outElastic(1, .6)"
});

/*
    Las tarjetas aparecen una después de otra.
    Aquí también utilizamos stagger().
*/

animate(
    features,
    {
        opacity: [0, 1],
        translateY: [60, 0],
        duration: 1000,
        delay: stagger(250),
        ease: "outExpo"
    }
);


/*
    El botón aparece ligeramente desde abajo.
    Esto hace que el usuario pueda observar
    que el botón también está animado.
*/

animate(startButton, {
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 1200,
    delay: 1800,
    ease: "outExpo"
});


/*
    Cuando el usuario hace clic en "Descubrir":
    - El botón se hace más pequeño.
    - Después vuelve a su tamaño.
    - El producto gira.
    - El producto aumenta de tamaño.
    - La página baja hasta las características.
*/

startButton.addEventListener("click", () => {
    animate(startButton, {
        scale: [
            {
                to: 0.85,
                duration: 150
            },
            {
                to: 1.15,
                duration: 250
            },
            {
                to: 1,
                duration: 350
            }
        ],

        ease: "outElastic(1, .6)"

    });

    animate(product, {

        scale: [
            {
                to: 1.3,
                duration: 400
            },
            {
                to: 1,
                duration: 600
            }
        ],
        rotate: "1turn",
        ease: "outElastic(1, .5)"

    });
    document
        .querySelector("#caracteristicas")
        .scrollIntoView({
            behavior: "smooth"
        });

});

/*
    Al hacer clic, el botón realiza un pequeño
    rebote para demostrar otra interacción.
*/

contactButton.addEventListener("click", () => {

    animate(contactButton, {

        scale: [
            {
                to: 1.2,
                duration: 200
            },

            {
                to: 1,
                duration: 500
            }
        ],
        ease: "outElastic(1, .5)"

    });

});