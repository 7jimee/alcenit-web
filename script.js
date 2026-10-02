// =========================================================
// ALCENIT TURISMO - JAVASCRIPT
// =========================================================

// ---------- CARRUSEL ----------

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
let autoPlay;

function showSlide(index) {

  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function previousSlide() {
  showSlide(currentSlide - 1);
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  reiniciarCarrusel();
});

prevBtn.addEventListener("click", () => {
  previousSlide();
  reiniciarCarrusel();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    reiniciarCarrusel();
  });
});

// Cambia automáticamente cada 5 segundos
function iniciarCarrusel() {
  autoPlay = setInterval(nextSlide, 5000);
}

function reiniciarCarrusel() {
  clearInterval(autoPlay);
  iniciarCarrusel();
}

iniciarCarrusel();


// ---------- MENÚ CELULAR ----------

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");

  if (nav.classList.contains("open")) {
    menuBtn.textContent = "✕";
  } else {
    menuBtn.textContent = "☰";
  }
});

// Cerrar menú cuando se toca un enlace
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});


// ---------- BOTONES DE CONSULTA ----------

function consultar(viaje) {

  const numero = "543413634545";

  const mensaje =
    "Hola Alcenit Turismo 👋%0A%0A" +
    "Quiero consultar por: " + viaje + "%0A%0A" +
    "¿Me pueden brindar más información?";

  window.open(
    "https://wa.me/" + numero + "?text=" + mensaje,
    "_blank"
  );
}

function abrirWhatsApp() {
  consultar("un viaje");
}


// ---------- ANIMACIÓN AL APARECER ----------

const elementos = document.querySelectorAll(
  ".service-card, .trip-card, .destination-card, .about-content, .package-box"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

elementos.forEach((elemento) => {
  elemento.style.opacity = "0";
  elemento.style.transform = "translateY(25px)";
  elemento.style.transition = "opacity .7s ease, transform .7s ease";
  observer.observe(elemento);
});


// Clase agregada por el observer
const style = document.createElement("style");

style.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;

document.head.appendChild(style);

// ---------- GALERÍA / VISOR ----------

const galleryImages = document.querySelectorAll(".gallery-image");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImage = 0;

// ABRIR IMAGEN
function abrirGaleria(index) {

  currentImage = index;

  lightboxImage.src = galleryImages[currentImage].src;
  lightboxImage.alt = galleryImages[currentImage].alt;

  lightbox.classList.add("active");

  document.body.style.overflow = "hidden";
}

// CERRAR IMAGEN
function cerrarGaleria() {

  lightbox.classList.remove("active");

  document.body.style.overflow = "";
}

// SIGUIENTE
function siguienteImagen() {

  currentImage = currentImage + 1;

  if (currentImage >= galleryImages.length) {
    currentImage = 0;
  }

  lightboxImage.src = galleryImages[currentImage].src;
  lightboxImage.alt = galleryImages[currentImage].alt;
}

// ANTERIOR
function anteriorImagen() {

  currentImage = currentImage - 1;

  if (currentImage < 0) {
    currentImage = galleryImages.length - 1;
  }

  lightboxImage.src = galleryImages[currentImage].src;
  lightboxImage.alt = galleryImages[currentImage].alt;
}

// HACER CLIC EN LAS FOTOS
galleryImages.forEach(function(image, index) {

  image.addEventListener("click", function() {
    abrirGaleria(index);
  });

});

// BOTÓN CERRAR
lightboxClose.addEventListener("click", function() {
  cerrarGaleria();
});

// BOTÓN SIGUIENTE
lightboxNext.addEventListener("click", function() {
  siguienteImagen();
});

// BOTÓN ANTERIOR
lightboxPrev.addEventListener("click", function() {
  anteriorImagen();
});

// CERRAR HACIENDO CLIC AFUERA
lightbox.addEventListener("click", function(event) {

  if (event.target === lightbox) {
    cerrarGaleria();
  }

});

// TECLADO
document.addEventListener("keydown", function(event) {

  if (!lightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    cerrarGaleria();
  }

  if (event.key === "ArrowRight") {
    siguienteImagen();
  }

  if (event.key === "ArrowLeft") {
    anteriorImagen();
  }

});

// ---------- DESTINOS ----------

const destinationModal =
  document.getElementById("destinationModal");

const destinationModalClose =
  document.getElementById("destinationModalClose");

const destinationModalImage =
  document.getElementById("destinationModalImage");

const destinationModalTitle =
  document.getElementById("destinationModalTitle");

const destinationModalText =
  document.getElementById("destinationModalText");

const destinationModalWhatsApp =
  document.getElementById("destinationModalWhatsApp");


function abrirDestino(destino) {

  let titulo = "";
  let texto = "";
  let imagen = "";


  if (destino === "misiones") {

    titulo = "Misiones";

    texto =
      "Un destino lleno de naturaleza y aventuras. " +
      "Conocé las Cataratas del Iguazú, Puerto Iguazú, " +
      "Minas de Wanda y otros lugares increíbles.";

    imagen = "cataratas.jpeg";
  }


  if (destino === "buenos aires") {

    titulo = "Buenos Aires";

    texto =
      "Descubrí una ciudad llena de cultura, " +
      "historia y diferentes experiencias para disfrutar en grupo.";

    imagen = "imagen 2.png";
  }


  if (destino === "san lorenzo") {

    titulo = "San Lorenzo";

    texto =
      "Disfrutá de excursiones, actividades y momentos " +
      "para compartir junto a tu grupo.";

    imagen = "imagen 3.png";
  }


  destinationModalImage.src = imagen;

  destinationModalImage.alt = titulo;

  destinationModalTitle.textContent = titulo;

  destinationModalText.textContent = texto;

  destinationModal.classList.add("active");

  document.body.style.overflow = "hidden";


  destinationModalWhatsApp.onclick = function() {

    consultar("Destino " + titulo);

  };

}


function cerrarDestino() {

  destinationModal.classList.remove("active");

  document.body.style.overflow = "";

}


destinationModalClose.addEventListener(
  "click",
  function() {

    cerrarDestino();

  }
);


destinationModal.addEventListener(
  "click",
  function(event) {

    if (event.target === destinationModal) {

      cerrarDestino();

    }

  }
);


document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      cerrarDestino();

    }

  }
);