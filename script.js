const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? '✕' : '☰';
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    });
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 980 && mainNav && menuButton) {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  }
});

// Blocco YouTube proveniente dal progetto Fratres originale.
// Viene aggiunto solo alla vecchia pagina provvisoria, se non è già presente.
if (!document.querySelector('#video')) {
  const introSection = document.querySelector('.intro');

  if (introSection) {
    const videoSection = document.createElement('section');
    videoSection.className = 'videoSection';
    videoSection.id = 'video';
    videoSection.innerHTML = `
      <div class="container videoGrid">
        <div class="videoCopy">
          <div class="videoKicker">Il valore del dono</div>
          <h2>Un gesto semplice.<br>Un aiuto concreto.</h2>
          <p>Guarda il video e scopri perché la donazione di sangue è un gesto di solidarietà capace di fare la differenza.</p>
          <a class="videoLink" href="https://www.youtube.com/watch?v=JME4geaKC4E" target="_blank" rel="noreferrer">Guarda su YouTube →</a>
        </div>
        <div class="videoPlayer">
          <iframe
            src="https://www.youtube-nocookie.com/embed/JME4geaKC4E"
            title="Video sulla donazione di sangue"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
        </div>
      </div>`;

    introSection.insertAdjacentElement('afterend', videoSection);

    const videoStyles = document.createElement('style');
    videoStyles.textContent = `
      .videoSection{padding:92px 0;background:linear-gradient(120deg,#191c28 0%,#242735 100%);color:#fff;position:relative;overflow:hidden}
      .videoSection:before{content:"";position:absolute;width:340px;height:340px;border-radius:50%;background:rgba(216,24,53,.14);left:-170px;bottom:-210px}
      .videoGrid{display:grid;grid-template-columns:.72fr 1.28fr;gap:70px;align-items:center;position:relative;z-index:1}
      .videoKicker{font-size:.78rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#ffd8df}
      .videoCopy h2{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.2rem,4vw,3.2rem);line-height:1.08;margin:15px 0 23px}
      .videoCopy p{color:#bfc1c8;font-size:1rem;line-height:1.75;margin:0 0 25px}
      .videoLink{color:#ff8fa1;font-size:.9rem;font-weight:800;display:inline-flex;align-items:center;gap:13px}
      .videoPlayer{position:relative;aspect-ratio:16/9;background:#0d0f16;box-shadow:0 28px 60px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.1);border-radius:18px;overflow:hidden}
      .videoPlayer iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
      @media(max-width:900px){.videoGrid{grid-template-columns:1fr;gap:38px}}
      @media(max-width:640px){.videoSection{padding:68px 0}.videoGrid{gap:30px}.videoPlayer{border-radius:12px}}
    `;
    document.head.appendChild(videoStyles);
  }
}
