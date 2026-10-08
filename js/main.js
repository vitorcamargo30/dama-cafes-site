// DAMA CAFÉS — site scripts

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.textContent = '☰';
    }));
  }

  /* Vitrine dinâmica — auto carousel */
  const vitrine = document.querySelector('.vitrine');
  if (vitrine) {
    const track = vitrine.querySelector('.vitrine-track');
    const slides = vitrine.querySelectorAll('.vitrine-slide');
    const dotsWrap = vitrine.querySelector('.vitrine-dots');
    let idx = 0;
    let timer;

    slides.forEach((_, i) => {
      const b = document.createElement('button');
      if (i === 0) b.classList.add('active');
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
    });
    const dots = dotsWrap.querySelectorAll('button');

    function goTo(i) {
      idx = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      dots[idx].classList.add('active');
    }
    function next() { goTo(idx + 1); }
    function startAuto() { timer = setInterval(next, 5500); }
    function stopAuto() { clearInterval(timer); }

    vitrine.querySelector('.vitrine-nav.next')?.addEventListener('click', () => { next(); stopAuto(); startAuto(); });
    vitrine.querySelector('.vitrine-nav.prev')?.addEventListener('click', () => { goTo(idx - 1); stopAuto(); startAuto(); });

    vitrine.addEventListener('mouseenter', stopAuto);
    vitrine.addEventListener('mouseleave', startAuto);
    startAuto();
  }

  /* Contact form — front-end only (no backend wired yet) */
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = form.parentElement.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.textContent = 'Mensagem pronta para envio! Conecte este formulário ao seu e-mail ou WhatsApp para receber os contatos.';
      }
      form.reset();
    });
  });

  /* Reveal-on-scroll */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

});
