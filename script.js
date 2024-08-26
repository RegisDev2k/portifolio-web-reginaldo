// Função que é executada quando o documento é carregado
document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todos os links de navegação
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Seleciona todas as seções de conteúdo
  const sections = document.querySelectorAll('.content-section');
  
  // Adiciona a classe hidden às seções
  sections.forEach(section => section.classList.add('hidden'));
  
  // Adiciona um evento de clique a cada link de navegação
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      // Previne o comportamento padrão do link
      event.preventDefault();
      
      // Remove a classe 'active' de todas as seções
      sections.forEach(section => section.classList.remove('active'));
      
      // Adiciona a classe 'active' à seção correspondente
      const targetSection = document.getElementById(this.getAttribute('data-section'));
      targetSection.classList.add('active');
      targetSection.classList.remove('hidden');
    });
  });
});

// Função que é executada quando a página é carregada
window.addEventListener('load', function() {
  // Aguarda 1,5 segundos antes de esconder o loader
  setTimeout(function() {
    // Seleciona o elemento loader
    const loader = document.getElementById('loader');
    
    // Esconde o loader
    loader.style.display = 'none';
  }, 1500);
});

// Configuração de partículas
particlesJS('particles-js', {
  // Configuração das partículas
  particles: {
    // Número de partículas
    number: { value: 150 },
    
    // Tamanho das partículas
    size: { value: 2 },
    
    // Cor das partículas
    color: { value: '#66d9ef' },
    
    // Liga as partículas com linhas
    line_linked: { enable: true, color: '#66d9ef' }
  },
  
  // Configuração de interatividade
  interactivity: {
    // Detecta eventos na janela
    detect_on: 'window',
    
    // Eventos de interatividade
    events: {
      // Evento de hover
      onhover: {
        // Ativa o evento de hover
        enable: true,
        
        // Modo de repulsão
        mode: 'repulse'
      },
      
      // Evento de clique
      onclick: {
        // Ativa o evento de clique
        enable: true,
        
        // Modo de empurrar
        mode: 'push'
      },
      
      // Evento de redimensionamento
      resize: true
    },
    
    // Modos de interatividade
    modes: {
      // Modo de repulsão
      repulse: {
        // Distância de repulsão
        distance: 100,
        
        // Duração da repulsão
        duration: 0.4
      },
      
      // Modo de empurrar
      push: {
        // Número de partículas empurradas
        particles_nb: 4
      }
    }
  },
  
  // Detecta retina
  retina_detect: true,
  
  // Configuração do canvas
  canvas: {
    // Largura do canvas
    width: window.innerWidth,
    
    // Altura do canvas
    height: window.innerHeight
  },
  
  // Configuração responsiva
  responsive: [
    {
      // Ponto de quebra para telas menores
      breakpoint: 768,
      
      // Opções para telas menores
      options: {
        // Número de partículas
        particles: {
          number: { value: 50 }
        }
      }
    },
    {
      // Ponto de quebra para telas ainda menores
      breakpoint: 425,
      
      // Opções para telas ainda menores
      options: {
        // Número de partículas
        particles: {
          number: { value: 20 }
        }
      }
    }
  ]
});

// Inicializa AOS (Animação ao Rolar a Página)
AOS.init({
  // Duração da animação
  duration: 1200,
});