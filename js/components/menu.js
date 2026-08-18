export default function Fotos_Site() {
  const imagens = document.querySelectorAll('.foto');
  const texto = document.querySelector('.texto_site');

  const secoes = {
    natureza: document.querySelector('.secao_natureza'),
    praias: document.querySelector('.secao_praias'),
    montanhas: document.querySelector('.secao_montanhas'),
    florestas: document.querySelector('.secao_florestas')
  };

  imagens.forEach((imagem) => {
    imagem.addEventListener('click', () => {
      const secao = imagem.dataset.secao;

      if (secoes[secao] && texto) {
        texto.innerHTML = secoes[secao].innerHTML;
      }
    });
  });
} 