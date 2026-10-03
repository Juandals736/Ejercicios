// 1. Extraer funciones de Anime.js
const { animate, stagger, createTimeline } = anime;

// Detectar preferencia de reducción de movimiento
const reducirMovimiento = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// 2. Animación de las barras
function animarBarras() {
  document.querySelectorAll(".card").forEach((card, i) => {
    const barra = card.querySelector(".progreso");
    const texto = card.querySelector(".porcentaje");
    const valor = Number(barra.dataset.valor);

    const contador = { n: 0 };

    animate(barra, {
      width: ["0%", `${valor}%`],
      duration: 1200,
      delay: i * 150,
      ease: "inOutQuad",
    });

    animate(contador, {
      n: valor,
      duration: 1200,
      delay: i * 150,
      ease: "inOutQuad",

      onUpdate: () => {
        texto.textContent = `${Math.round(contador.n)}%`;
      },
    });
  });
}

// 3. Detectar cuándo las tarjetas son visibles
function observarTarjetas() {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animarBarras();

          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  const grid = document.querySelector(".grid");

  observer.observe(grid);
}

// 4. Animación inicial
function iniciarAnimacion() {
  // Accesibilidad: evitar animaciones si el usuario
  // tiene activado prefers-reduced-motion
  if (reducirMovimiento) {
    document.querySelector(".titulo").style.opacity = "1";
    document.querySelector(".subtitulo").style.opacity = "1";

    document.querySelectorAll(".card").forEach((card) => {
      card.style.opacity = "1";
      card.style.transform = "none";
    });

    document.querySelectorAll(".progreso").forEach((barra) => {
      const valor = barra.dataset.valor;
      barra.style.width = `${valor}%`;
    });

    document.querySelectorAll(".porcentaje").forEach((texto) => {
      const card = texto.closest(".card");
      const valor = card.querySelector(".progreso").dataset.valor;

      texto.textContent = `${valor}%`;
    });

    return;
  }

  // Reiniciar valores
  document.querySelectorAll(".progreso").forEach((barra) => {
    barra.style.width = "0%";
  });

  document.querySelectorAll(".porcentaje").forEach((texto) => {
    texto.textContent = "0%";
  });

  // Timeline de entrada
  const tl = createTimeline({
    defaults: {
      duration: 800,
      ease: "outExpo",
    },

    onComplete: observarTarjetas,
  });

  tl.add(".titulo", {
    opacity: [0, 1],
    y: [-40, 0],
  })

    .add(
      ".subtitulo",
      {
        opacity: [0, 1],
        y: [-20, 0],
      },
      "-=500",
    )

    .add(
      ".card",
      {
        opacity: [0, 1],
        scale: [0.8, 1],

        // Las tarjetas aparecen desde el centro
        delay: stagger(150, {
          from: "center",
        }),
      },
      "-=300",
    );
}

// 5. Micro-interacción de las tarjetas
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    if (!reducirMovimiento) {
      animate(card, {
        scale: 1.05,
        borderColor: "#38bdf8",
        duration: 300,
        ease: "outQuad",
      });
    }
  });

  card.addEventListener("mouseleave", () => {
    if (!reducirMovimiento) {
      animate(card, {
        scale: 1,
        borderColor: "#334155",
        duration: 300,
        ease: "outQuad",
      });
    }
  });
});

// 6. Botón repetir
document.getElementById("btnRepetir").addEventListener("click", (e) => {
  if (!reducirMovimiento) {
    animate(e.currentTarget, {
      scale: [0.9, 1],
      duration: 600,
      ease: "outElastic(1, .5)",
    });
  }

  iniciarAnimacion();
});

// 7. Iniciar
iniciarAnimacion();
