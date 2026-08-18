export default function Navigation() {
  const fotos = document.querySelectorAll('.img .foto');
  const secoes = document.querySelectorAll('.texto_site section');
  const imgContainer = document.querySelector('.img');

  if (!fotos.length || !secoes.length || !imgContainer) return;

  function activeTab(index) {
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

  // Set initial active state on first tab
  activeTab(0);

  // Click on image to scroll into view & activate tab
  fotos.forEach((foto, index) => {
    foto.addEventListener('click', () => {
      activeTab(index);
      foto.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  // IntersectionObserver to detect scroll position inside .img container
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: imgContainer,
      threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(fotos).indexOf(entry.target);
          if (index !== -1) {
            activeTab(index);
          }
        }
      });
    }, observerOptions);

    fotos.forEach((foto) => observer.observe(foto));
  } else {
    // Fallback scroll listener
    imgContainer.addEventListener('scroll', () => {
      const containerTop = imgContainer.scrollTop;
      const containerHeight = imgContainer.clientHeight;

      fotos.forEach((foto, index) => {
        const fotoTop = foto.offsetTop - imgContainer.offsetTop;
        const fotoHeight = foto.offsetHeight;

        if (containerTop >= fotoTop - containerHeight / 2 && containerTop < fotoTop + fotoHeight - containerHeight / 2) {
          activeTab(index);
        }
      });
    });
  }
}