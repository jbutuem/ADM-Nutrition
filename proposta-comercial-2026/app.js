/* Commercial values and billing schedule approved by the owner on 2026-10-29. */
const proposal = Object.freeze({
  status: 'client-ready',
  base: { hours: 65, price: 8690, general: 50, video: 15, splitConfirmed: true },
  expanded: { hours: 100, price: 13350, general: 80, video: 20, confirmed: true },
  additional2027: { general: 108, video: 152 },
  contact: 'j.butuem@gmail.com'
});
const formatBR = new Intl.NumberFormat('pt-BR');
for (const key of ['base', 'expanded']) {
  const values = {Hours: proposal[key].hours, Price: formatBR.format(proposal[key].price), General: `${proposal[key].general}h`, Video: `${proposal[key].video}h`};
  for (const [field, value] of Object.entries(values)) {
    const node = document.querySelector(`[data-value="${key}${field}"]`);
    if (node) node.textContent = value;
  }
}
// Content is always visible. Observation adds only a modest, optional visual accent.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('in-view'); observer.unobserve(entry.target);}});
  }, {threshold: .15});
  document.querySelectorAll('.plan, .timeline').forEach(node => observer.observe(node));
  const links = [...document.querySelectorAll('.wayfinder a')];
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(link => {
        if(link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-15% 0px -60% 0px'});
  links.forEach(link => {const section = document.querySelector(link.hash); if(section) navObserver.observe(section);});
}
