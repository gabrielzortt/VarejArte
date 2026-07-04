// VarejArte — small interactions
(function(){
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const links = document.querySelector('.nav__links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  });

  burger?.addEventListener('click', () => links.classList.toggle('is-open'));
  links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('is-open')));

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section, .card, .steps li, .staff__item, .hero__content, .hero__media').forEach(el => {
    el.classList.add('reveal');
    io.observe(el);
  });

  // Phone mask
  const tel = document.querySelector('input[name=telefone]');
  tel?.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g,'').slice(0,11);
    if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    e.target.value = v;
  });

  // Form submit -> WhatsApp
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nome = (data.get('nome')||'').toString().trim();
    const email = (data.get('email')||'').toString().trim();
    const telf = (data.get('telefone')||'').toString().trim();
    if (!nome || !email || !telf) {
      status.textContent = 'Preencha nome, e-mail e WhatsApp para continuar.';
      status.className = 'form__status is-err';
      return;
    }
    const msg = `Olá VarejArte! Meu nome é ${nome}.\nEmpresa: ${data.get('empresa')||'-'}\nE-mail: ${email}\nWhatsApp: ${telf}\nMensagem: ${data.get('mensagem')||'-'}`;
    const url = `https://wa.me/5592993534072?text=${encodeURIComponent(msg)}`;
    status.textContent = 'Redirecionando para o WhatsApp...';
    status.className = 'form__status is-ok';
    window.open(url, '_blank');
    form.reset();
  });

  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
