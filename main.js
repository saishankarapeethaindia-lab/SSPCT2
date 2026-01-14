document.addEventListener('DOMContentLoaded', function() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;

  // Inject header CSS
  const headerCssHref = 'assets/css/header.css';
  if (!document.querySelector(`link[href="${headerCssHref}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = headerCssHref;
    document.head.appendChild(link);
  }

  fetch('header-component.html')
    .then(resp => {
      if (!resp.ok) throw new Error('Failed to load header-component.html');
      return resp.text();
    })
    .then(html => {
      placeholder.innerHTML = html;
      setActiveNavLink();
      adjustBodyPadding();
      window.addEventListener('resize', debounce(adjustBodyPadding, 150));
    })
    .catch(err => console.error('Header load error:', err));

  function setActiveNavLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    const nav = document.querySelector('.main-nav');
    if (!nav) return;
    nav.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href === current) a.classList.add('active');
    });
  }

  function adjustBodyPadding() {
    const topBar = document.querySelector('.top-bar');
    const mainHeader = document.querySelector('.main-header');
    let topH = topBar ? topBar.getBoundingClientRect().height : 0;
    let mainH = mainHeader ? mainHeader.getBoundingClientRect().height : 0;
    document.body.style.paddingTop = (topH + mainH) + 'px';
  }

  function debounce(fn, wait) {
    let t;
    return function() { clearTimeout(t); t = setTimeout(() => fn.apply(this, arguments), wait); };
  }

});
