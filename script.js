document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
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
      if (window.innerWidth < 768) {
        toggleMenu();
      }
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

  // Scroll suave mejorado para móviles
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

  // Animación de tarjetas con Intersection Observer
  const animateOnScroll = (elements, className) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
  };

  // Animación de tarjetas de servicios
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });
  animateOnScroll(serviceCards, 'card-visible');

  // Header scroll effect
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Efecto de ocultar/mostrar header
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    lastScroll = currentScroll;

    // Efecto de transparencia
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Prevenir zoom en inputs en móviles
  document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      document.body.style.zoom = "1.0";
    }
  }, false);

  // Optimizar resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove('resize-animation-stopper');
    }, 400);
  });
});

// Añadir clase touch al body para detectar dispositivos táctiles
document.addEventListener('touchstart', function addTouchClass() {
  document.body.classList.add('touch-device');
  document.removeEventListener('touchstart', addTouchClass);
});

// Añadir este código al existente
document.addEventListener('DOMContentLoaded', function() {
  // ... código existente ...

  // Fix para el viewport móvil
  let viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
  
  // Prevenir zoom en formularios
  document.addEventListener('touchstart', function(e) {
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      e.target.style.fontSize = '16px'; // Forzar tamaño de fuente para móviles
    }
  });
  
  // Optimizar renderizado en móviles
  document.body.style.webkitTransform = 'translateZ(0)';
});

// Añadir este código nuevo
window.addEventListener('resize', function() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Inicializar altura del viewport
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);