export default function initNavegacao() {
  const fotos = document.querySelectorAll('.container_imagens .foto');
  const secoes = document.querySelectorAll('.texto_site section');
  const containerImagens = document.querySelector('.container_imagens');

  if (!fotos.length || !secoes.length || !containerImagens) return;

  let indiceAtivoAtual = -1;
  let estaClicando = false;

  function ativarTab(index) {
    if (index === indiceAtivoAtual || index < 0 || index >= fotos.length) return;
    indiceAtivoAtual = index;
    fotos.forEach((foto) => foto.classList.remove('ativo'));
    secoes.forEach((secao) => secao.classList.remove('ativo'));
    const fotoSelecionada = fotos[index];
    if (fotoSelecionada) {
      fotoSelecionada.classList.add('ativo');
      const nomeSecao = fotoSelecionada.dataset.secao;

      const secaoAlvo = document.querySelector(`.texto_site section[data-secao="${nomeSecao}"]`) || secoes[index];
      if (secaoAlvo) {
        secaoAlvo.classList.add('ativo');
      }
    }
  }

  function atualizarTabPorScroll() {
    const retanguloContainer = containerImagens.getBoundingClientRect();
    const centroContainer = retanguloContainer.top + retanguloContainer.height / 2;

    let indexMaisProximo = 0;
    let menorDistancia = Infinity;

    fotos.forEach((foto, index) => {
      const retanguloFoto = foto.getBoundingClientRect();
      const centroFoto = retanguloFoto.top + retanguloFoto.height / 2;
      const distancia = Math.abs(centroContainer - centroFoto);

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        indexMaisProximo = index;
      }
    });

    ativarTab(indexMaisProximo);
  }




  ativarTab(0);

  fotos.forEach((foto, index) => {
    foto.addEventListener('click', () => {
      estaClicando = true;
      ativarTab(index);

      const topoFoto = foto.offsetTop - containerImagens.offsetTop;
      containerImagens.scrollTo({
        top: topoFoto,
        behavior: 'smooth'
      });

      setTimeout(() => {
        estaClicando = false;
      }, 600);
    });
  });

  containerImagens.addEventListener('scroll', () => {
    if (estaClicando) return;
    atualizarTabPorScroll();
  });
}
if (typeof window !== 'undefined') {
  window.initNavegacao = initNavegacao;
}