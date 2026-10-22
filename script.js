'use strict';
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigasi');
const pages = [...document.querySelectorAll('[data-page]')];
const categories = ['mingguan', 'bulanan', 'tahunan'];
function closeMenu() {
  navigation.classList.remove('is-open');
  document.querySelectorAll('.about-menu').forEach(menu => { menu.open = false; });
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Buka menu navigasi');
}
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
});
function showPage(focus = false) {
  const hash = location.hash.slice(1) || 'beranda';
  const requested = categories.includes(hash) ? 'program' : hash === 'konsultasi' ? 'kontak' : ['santri','kegiatan'].includes(hash) ? 'beranda' : hash;
  const page = pages.some(p => p.dataset.page === requested) ? requested : 'beranda';
  const programTitles = {mingguan:'Program Mingguan',bulanan:'Program Bulanan',tahunan:'Program Tahunan'};
  const programDescriptions = {mingguan:'Muhadoroh serta Tahlil dan Yasinan.',bulanan:'Belum ada program bulanan yang diinformasikan.',tahunan:'Walimahan, Isra Mikraj, dan Maulid Nabi.'};
  document.querySelector('#hero-title-program').textContent = programTitles[hash] || 'Program Pondok';
  document.querySelector('[data-page="program"] .inner-hero-description').textContent = programDescriptions[hash] || 'Mengenal program mingguan, bulanan, dan tahunan pondok.';

  pages.forEach(p => {
    p.hidden = p.dataset.page !== page;
    p.classList.remove('page-enter');
    if (!p.hidden) { void p.offsetWidth; p.classList.add('page-enter'); }
  });
  document.querySelector('.header').classList.remove('header-hidden');
  document.querySelector('#konsultasi').hidden = !['beranda', 'kontak'].includes(page);
  const chart = document.querySelector('.org-chart');
  chart.classList.remove('org-enter');
  if (page === 'pengurus') {
    void chart.offsetWidth;
    chart.classList.add('org-enter');
  }
  document.querySelector('.about-menu').classList.toggle('is-current', ['profil','pengurus'].includes(page));
  document.querySelector('.program-menu').classList.toggle('is-current', page === 'program');
  navigation.querySelectorAll('a').forEach(a => {
    if (a.hash === '#' + (categories.includes(hash) ? hash : page)) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  document.querySelectorAll('.program-tabs a').forEach(a => {
    if (a.hash === '#' + hash) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
  });
  closeMenu();
  const active = pages.find(p => p.dataset.page === page);
  const target = ['santri','kegiatan','konsultasi'].includes(hash) ? document.getElementById(hash) : active;
  if (focus) {
    const heading = target.querySelector('h1,h2,h3');
    if (heading) { heading.tabIndex = -1; heading.focus({preventScroll:true}); }
    target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  }
}
window.addEventListener('hashchange', () => showPage(true));
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  closeMenu();
  if (a.hash === location.hash) showPage(true);
}));
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-wrap')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.querySelector('.about-menu[open]')) {
    const expanded = document.querySelector('.about-menu[open]');
    expanded.open = false;
    expanded.querySelector('summary').focus();
  } else if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu(); menuButton.focus();
  }
});
window.matchMedia('(min-width: 1051px)').addEventListener('change', closeMenu);
showPage();
if (location.hash && !['#beranda','#santri','#kegiatan','#konsultasi'].includes(location.hash)) {
  requestAnimationFrame(() => { window.scrollTo({top:0,behavior:'instant'}); });
}

// Jam pondok menggunakan zona waktu WIB, bukan zona perangkat pengunjung.
const clock = document.querySelector('#pondok-clock');
const dateLabel = document.querySelector('#pondok-date');
const timeFormat = new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Jakarta',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
const dateFormat = new Intl.DateTimeFormat('id-ID', {timeZone:'Asia/Jakarta',weekday:'long',day:'numeric',month:'long',year:'numeric'});
function updateClock() {
  const now = new Date();
  clock.textContent = timeFormat.format(now);
  clock.dateTime = now.toISOString();
  dateLabel.textContent = dateFormat.format(now);
}
updateClock();
setInterval(updateClock, 1000);
const counters = [...document.querySelectorAll('[data-count]')];
let counted = false;
function animateCounters() {
  if (counted) return;
  counted = true;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / 850, 1);
    counters.forEach(el => el.textContent = Math.round(Number(el.dataset.count) * (1 - Math.pow(1-progress, 3))));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) { animateCounters(); observer.disconnect(); }
  }, {threshold:0.25});
  observer.observe(document.querySelector('#santri'));
}
const form = document.querySelector('#consult-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.elements.nama.value.trim();
  const message = form.elements.pesan.value.trim();
  form.elements.nama.setCustomValidity(name ? '' : 'Silakan isi nama Anda.');
  form.elements.pesan.setCustomValidity(message ? '' : 'Silakan isi pesan Anda.');
  if (!form.reportValidity()) return;
  const text = 'Assalamu’alaikum, saya ' + name + '. Saya ingin berkonsultasi tentang Pondok Pesantren Darul Mutaallimin.\n\nTopik: ' + form.elements.topik.value + '\nPesan: ' + message + '\n\nTerima kasih.';
  window.open('https://wa.me/6285811124518?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
});
form.addEventListener('input', event => { if (event.target.setCustomValidity) event.target.setCustomValidity(''); });

// Keep only one navigation submenu open at a time.
document.querySelectorAll('.about-menu').forEach(menu => {
  menu.addEventListener('toggle', () => {
    if (menu.open) document.querySelectorAll('.about-menu').forEach(other => { if (other !== menu) other.open = false; });
  });
});

// Gentle entrance for shared content as it reaches the viewport.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.08});
  document.querySelectorAll('.home-about, .stats-section, .activity-section, #konsultasi, .footer-grid').forEach(el => {
    el.classList.add('scroll-reveal');
    revealObserver.observe(el);
  });
}
// Hide on downward scrolling; show on upward scrolling or keyboard focus.
const header = document.querySelector('.header');
let lastScroll = Math.max(0, window.scrollY);
let direction = 0;
let travelled = 0;
let scrollScheduled = false;
function updateHeader() {
  const current = Math.max(0, window.scrollY);
  const delta = current - lastScroll;
  const nextDirection = Math.sign(delta);
  if (nextDirection && nextDirection !== direction) { travelled = 0; direction = nextDirection; }
  travelled += Math.abs(delta);
  const interacting = navigation.classList.contains('is-open') || !!header.querySelector('details[open]') || header.contains(document.activeElement);
  if (current < 90 || interacting) {
    header.classList.remove('header-hidden');
    travelled = 0;
  } else if (travelled >= 10) {
    header.classList.toggle('header-hidden', direction > 0);
    travelled = 0;
  }
  lastScroll = current;
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateHeader); }
}, {passive:true});
header.addEventListener('focusin', () => header.classList.remove('header-hidden'));
window.addEventListener('hashchange', () => {
  header.classList.remove('header-hidden');
  lastScroll = Math.max(0, window.scrollY);
  travelled = 0;
});
