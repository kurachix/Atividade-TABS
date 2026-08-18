export default function initNavegacao() {
  const fotos = document.querySelectorAll('.container_imagens .foto');
  const secoes = document.querySelectorAll('.texto_site section');
  const containerImagens = document.querySelector('.container_imagens');

  if (!fotos.length || !secoes.length || !containerImagens) return;

  function ativarTab(index) {
    secoes.forEach((secao) => {
      secao.classList.remove('ativo');
    });
    fotos.forEach((foto) => {
      foto.classList.remove('ativo');
    });

    if (secoes[index]) {
      secoes[index].classList.add('ativo');
    }
    if (fotos[index]) {
      fotos[index].classList.add('ativo');
    }
  }

  // Define a primeira tab como ativa
  ativarTab(0);

  // Clique na foto para rolar ate ela e ativar a tab
  fotos.forEach((foto, index) => {
    foto.addEventListener('click', () => {
      ativarTab(index);
      foto.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  // IntersectionObserver para detectar qual foto esta visivel durante a rolagem
  if ('IntersectionObserver' in window) {
    const opcoesObservador = {
      root: containerImagens,
      threshold: 0.6
    };

    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const index = Array.from(fotos).indexOf(entrada.target);
          if (index !== -1) {
            ativarTab(index);
          }
        }
      });
    }, opcoesObservador);

    fotos.forEach((foto) => observador.observe(foto));
  } else {
    // Fallback de rolagem
    containerImagens.addEventListener('scroll', () => {
      const topoContainer = containerImagens.scrollTop;
      const alturaContainer = containerImagens.clientHeight;

      fotos.forEach((foto, index) => {
        const topoFoto = foto.offsetTop - containerImagens.offsetTop;
        const alturaFoto = foto.offsetHeight;

        if (topoContainer >= topoFoto - alturaContainer / 2 && topoContainer < topoFoto + alturaFoto - alturaContainer / 2) {
          ativarTab(index);
        }
      });
    });
  }
}