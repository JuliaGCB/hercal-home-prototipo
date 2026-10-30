'use strict';
// Interações locais: nenhum formulário ou coleta de dados.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navegacao');
function closeMenu() { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const segments = {
  mineracao: ['Mineração', 'Peças para aplicações sujeitas a desgaste e impacto na operação mineral.', 'Chapas de desgaste · Barras de grelha · Pontas e suportes'],
  siderurgia: ['Siderurgia', 'Componentes para processos industriais com exposição a impacto e altas temperaturas.', 'Revestimentos internos · Martelos e grelhas · Placas de impacto'],
  construcao: ['Construção civil', 'Peças de reposição para equipamentos de carga e movimentação em condições abrasivas.', 'Dentes e entredentes · Unhas e adaptadores · Revestimentos de caçamba'],
  cimenteiras: ['Cimenteiras', 'Peças de reposição para britadores e moinhos utilizados no segmento cimenteiro.', 'Grelhas · Mandíbulas fixas · Placas de revestimento'],
  ferroviario: ['Ferroviário', 'Componentes fundidos destinados a aplicações ferroviárias, conforme os requisitos do projeto.', 'Cunhas de fricção · Placas de apoio · Talas'],
  reciclagem: ['Britagem e reciclagem', 'Componentes para as exigências de desgaste de moinhos, britadores e equipamentos de reciclagem.', 'Martelos e bigornas · Revestimentos e mandíbulas · Grelhas']
};
document.querySelectorAll('[data-segment]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-segment]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const [title, description, examples] = segments[button.dataset.segment];
  document.querySelector('#segment-title').textContent = title;
  document.querySelector('#segment-description').textContent = description;
  document.querySelector('#segment-examples').textContent = examples;
}));
const dialog = document.querySelector('#privacy-dialog');
document.querySelector('#privacy-open').addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  document.documentElement.classList.add('motion-ready');
}
