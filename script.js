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
        console.log(entry); // Depuración: Verifica si las entradas se están detectando
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
    card.style.opacity = '1'; // Cambiado a 1 para evitar que desaparezcan
    card.style.transform = 'translateY(0)'; // Cambiado a 0 para evitar que se muevan
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