(() => {
  const supported = ['en', 'ko'];
  const url = new URL(window.location.href);
  const requested = url.searchParams.get('lang');
  const locale = supported.includes(requested) ? requested : 'en';
  document.documentElement.lang = locale;
  document.querySelectorAll('[data-locale]').forEach(section => {
    section.hidden = section.dataset.locale !== locale;
  });
  document.querySelectorAll('[data-language]').forEach(link => {
    const language = link.dataset.language;
    if (language === locale) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
    const target = new URL(link.href);
    const anchor = window.location.hash.replace(/-(en|ko)$/, '');
    if (anchor) target.hash = /^#(deletion|international)$/.test(anchor) ? `${anchor}-${language}` : anchor;
    link.href = target.href;
  });
  if (/^#(deletion|international)$/.test(url.hash)) {
    url.hash += `-${locale}`;
    history.replaceState(null, '', url);
  }
  if (url.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView());
})();
