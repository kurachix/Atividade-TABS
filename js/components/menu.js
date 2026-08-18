function initNavegacao() {
  const fotos = document.querySelectorAll('.container_imagens .foto');
  const secoes = document.querySelectorAll('.texto_site section');
  const container = document.querySelector('.container_imagens');

  if (!fotos.length || !secoes.length || !container) return;

  function mostrarSecao(index) {
    if (index < 0 || index >= secoes.length) return;

    secoes.forEach((secao) => secao.classList.remove('ativo'));
    fotos.forEach((foto) => foto.classList.remove('ativo'));

    if (secoes[index]) secoes[index].classList.add('ativo');
    if (fotos[index]) fotos[index].classList.add('ativo');
  }

  function aoRolar() {
    const alturaFoto = (fotos[0] && fotos[0].offsetHeight > 0) ? fotos[0].offsetHeight : 480;
    const gap = 15;
    const index = Math.round(container.scrollTop / (alturaFoto + gap));
    mostrarSecao(index);
  }

  container.addEventListener('scroll', aoRolar);

  fotos.forEach((foto, index) => {
    foto.addEventListener('click', () => {
      mostrarSecao(index);
      foto.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  mostrarSecao(0);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavegacao);
  } else {
    initNavegacao();
  }
}