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

// Función para expandir/colapsar la tarjeta
function toggleCard(card) {
    const isActive = card.classList.contains('active');
    
    // Cerrar todas las tarjetas
    document.querySelectorAll('.service-card').forEach(c => {
        c.classList.remove('active');
        c.querySelector('.service-content').style.maxHeight = null;
    });

    // Abrir solo si no estaba activa
    if (!isActive) {
        card.classList.add('active');
        const content = card.querySelector('.service-content');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
}

// Cerrar al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.service-card')) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.classList.remove('active');
            card.querySelector('.service-content').style.maxHeight = null;
        });
    }
});