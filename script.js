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

// js para cv download

document.querySelectorAll('.download-cv-button').forEach(button => {

  let duration = 3000,
      svg = button.querySelector('svg'),
      svgPath = new Proxy({
          y: null,
          smoothing: null
      }, {
          set(target, key, value) {
              target[key] = value;
              if(target.y !== null && target.smoothing !== null) {
                  svg.innerHTML = getPath(target.y, target.smoothing, null);
              }
              return true;
          },
          get(target, key) {
              return target[key];
          }
      });

  button.style.setProperty('--duration', duration);

  svgPath.y = 20;
  svgPath.smoothing = 0;

  button.addEventListener('click', e => {
      
      e.preventDefault();

      if(!button.classList.contains('loading')) {

          button.classList.add('loading');

          gsap.to(svgPath, {
              smoothing: .3,
              duration: duration * .065 / 1000
          });

          gsap.to(svgPath, {
              y: 12,
              duration: duration * .265 / 1000,
              delay: duration * .065 / 1000,
              ease: Elastic.easeOut.config(1.12, .4)
          });

          setTimeout(() => {
              svg.innerHTML = getPath(0, 0, [
                  [3, 14],
                  [8, 19],
                  [21, 6]
              ]);
          }, duration / 2);

      }

  });

});

function getPoint(point, i, a, smoothing) {
  let cp = (current, previous, next, reverse) => {
          let p = previous || current,
              n = next || current,
              o = {
                  length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
                  angle: Math.atan2(n[1] - p[1], n[0] - p[0])
              },
              angle = o.angle + (reverse ? Math.PI : 0),
              length = o.length * smoothing;
          return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
      },
      cps = cp(a[i - 1], a[i - 2], point, false),
      cpe = cp(point, a[i - 1], a[i + 1], true);
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, smoothing, pointsNew) {
  let points = pointsNew ? pointsNew : [
          [4, 12],
          [12, update],
          [20, 12]
      ],
      d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
  return `<path d="${d}" />`;
}

let isDownloaded = false;
let fileURL = 'curriculo/Reginaldo Nunes.pdf'; // Substitua pelo caminho correto do seu PDF

function handleButtonClick() {
    const downloadBtn = document.getElementById('downloadBtn');
    const icon = downloadBtn.querySelector('i');

    if (!isDownloaded) {
        downloadCV(downloadBtn, icon);
    } else {
        openFile();
    }
}

function downloadCV(downloadBtn, icon) {
    // Simulate downloading
    downloadBtn.classList.add('loading');
    downloadBtn.querySelector('span').innerText = 'Downloading...';
    downloadBtn.classList.add('disabled');
    icon.classList.remove('fa-download');
    icon.classList.add('fa-spinner', 'fa-spin');

    setTimeout(() => {
        // Simulate download complete
        downloadBtn.classList.remove('loading');
        downloadBtn.classList.add('open');
        downloadBtn.querySelector('span').innerText = 'Abrir Arquivo';
        downloadBtn.classList.remove('disabled');
        icon.classList.remove('fa-spinner', 'fa-spin');
        icon.classList.add('fa-folder-open');

        isDownloaded = true;

        // Download the CV
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = 'Curriculo Reginaldo Nunes.pdf';
        link.click();
    }, 3000); // Simulate 3 seconds delay for downloading
}

function openFile() {
    window.open(fileURL, '_blank'); // Abre o arquivo em uma nova aba do navegador
}

