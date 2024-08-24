document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      
      // Remove a classe 'active' de todas as seções
      sections.forEach(section => section.classList.remove('active'));
      
      // Adiciona a classe 'active' à seção correspondente
      const targetSection = document.getElementById(this.getAttribute('data-section'));
      targetSection.classList.add('active');
    });
  });
});

// Esconde o loader após 3 segundos
window.addEventListener('load', function() {
  setTimeout(function() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
  }, 1500);
});

// Configuração de partículas
particlesJS('particles-js', {
  particles: {
    number: { value: 100 },
    size: { value: 2 },
    color: { value: '#fff' },
    line_linked: { enable: true, color: '#fff' },
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true,
  canvas: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        particles: {
          number: { value: 50 }
        }
      }
    },
    {
      breakpoint: 425,
      options: {
        particles: {
          number: { value: 20 }
        }
      }
    }
  ]
});

// Inicializa AOS (Animação ao Rolar a Página)
AOS.init({
  duration: 1200,
});
