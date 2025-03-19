document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu
  const mobileMenu = document.querySelector('.mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  function toggleMenu() {
    navMenu.classList.toggle('show');
    mobileMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
  }

  mobileMenu.addEventListener('click', toggleMenu);

  // Cerrar menú al hacer click en enlace
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) toggleMenu();
    });
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 768 && 
        !e.target.closest('.nav-menu') && 
        !e.target.closest('.mobile-menu')) {
      navMenu.classList.remove('show');
      mobileMenu.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Header scroll effect
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    lastScroll = currentScroll;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Prevenir zoom en móviles
  document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      document.body.style.zoom = "1.0";
    }
  });
});

// Funciones para servicios
function toggleCard(card) {
  const isActive = card.classList.contains('active');
  
  document.querySelectorAll('.service-card').forEach(c => {
    c.classList.remove('active');
    c.querySelector('.service-content').style.maxHeight = null;
  });

  if (!isActive) {
    card.classList.add('active');
    const content = card.querySelector('.service-content');
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}

function openModal(title, description) {
  const modal = document.getElementById('serviceModal');
  modal.style.display = 'flex';
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalDescription').textContent = description;
}

function closeModal() {
  document.getElementById('serviceModal').style.display = 'none';
}

// Cerrar modal al hacer click fuera
window.addEventListener('click', (e) => {
  const modal = document.getElementById('serviceModal');
  if (e.target === modal) closeModal();
});

// Efecto de Escritura Automática en el Título
function typeWriter(text, i, element) {
  if (i < text.length) {
    element.innerHTML += text.charAt(i);
    i++;
    setTimeout(function() {
      typeWriter(text, i, element);
    }, 100); // Velocidad de escritura
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const title = document.getElementById('contact-title');
  const text = "Contacto";
  title.textContent = '';
  typeWriter(text, 0, title);
});

// Validación en Tiempo Real del Correo Electrónico
document.getElementById('email').addEventListener('input', function() {
  const email = this.value;
  const emailError = document.getElementById('email-error');
  if (!email.includes('@')) {
    emailError.textContent = 'Ingresa un correo electrónico válido.';
  } else {
    emailError.textContent = '';
  }
});

// Efecto de Sonido al Enviar el Formulario
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const audio = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Sonido de ejemplo
  audio.play();
  alert('¡Mensaje enviado con éxito!');
});

// Animación de Partículas
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80, // Número de partículas
      density: {
        enable: true,
        value_area: 800, // Aumenta este valor para un área de interacción más grande
      },
    },
    color: {
      value: '#ffffff', // Color de las partículas (blanco)
    },
    shape: {
      type: 'triangle', // Forma de las partículas (triángulos)
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5, // Opacidad de las partículas
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3, // Tamaño de las partículas
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true, // Habilitar líneas entre partículas
      distance: 150, // Distancia entre partículas para que se conecten
      color: '#ffffff', // Color de las líneas (blanco)
      opacity: 0.4, // Opacidad de las líneas
      width: 1, // Grosor de las líneas
    },
    move: {
      enable: true, // Habilitar movimiento de partículas
      speed: 6, // Velocidad de movimiento
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'bounce', // Comportamiento al salir del área
      bounce: true,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true, // Habilitar interacción al pasar el mouse
        mode: 'repulse', // Modo de interacción (repeler)
      },
      onclick: {
        enable: true, // Habilitar interacción al hacer clic
        mode: 'push', // Modo de interacción (empujar)
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100, // Reduce este valor para que las partículas estén más cerca del puntero
        duration: 0.4,
      },
      push: {
        particles_nb: 4, // Número de partículas al hacer clic
      },
    },
  },
  retina_detect: true,
});

// Función para desplazar suavemente hacia arriba
function scrollToTop() {
  const backToTopButton = document.querySelector('.back-to-top');

  // Agrega la clase "clicked" para activar la animación
  backToTopButton.classList.add('clicked');

  // Desplaza la página hacia arriba
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // Elimina la clase "clicked" después de que termine la animación
  setTimeout(() => {
    backToTopButton.classList.remove('clicked');
  }, 500); // 500ms = duración de la animación
}

// Mostrar u ocultar el botón de "Volver arriba" según el scroll
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { // Muestra el botón después de 300px de scroll
    backToTopButton.style.display = 'flex';
  } else {
    backToTopButton.style.display = 'none';
  }
});