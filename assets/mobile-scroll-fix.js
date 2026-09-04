(() => {
  const isPageHashLink = (link) => {
    if (!link || !link.hash || link.hash === "#") return false;
    return link.origin === window.location.origin &&
      link.pathname.replace(/\/$/, "") === window.location.pathname.replace(/\/$/, "");
  };

  const unlockScroll = () => {
    if (document.querySelector(".welcomeGate")) return;

    document.documentElement.style.setProperty("overflow-x", "hidden", "important");
    document.documentElement.style.setProperty("overflow-y", "auto", "important");
    document.documentElement.style.setProperty("height", "auto", "important");
    document.body.style.setProperty("overflow-x", "hidden", "important");
    document.body.style.setProperty("overflow-y", "auto", "important");
    document.body.style.setProperty("height", "auto", "important");
    document.body.style.setProperty("position", "static", "important");
    document.body.style.removeProperty("top");
    document.body.style.removeProperty("left");
    document.body.style.removeProperty("right");
    document.body.style.removeProperty("width");
  };

  const scrollToHash = (hash, updateAddress = true) => {
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;

    unlockScroll();
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        unlockScroll();
        target.scrollIntoView({ behavior: "auto", block: "start" });
        if (updateAddress) history.replaceState(null, "", hash);
        window.setTimeout(unlockScroll, 100);
        window.setTimeout(unlockScroll, 500);
      });
    });
  };

  const handleClick = (event) => {
    const clicked = event.target instanceof Element ? event.target : null;
    const link = clicked?.closest("a[href]");

    if (clicked?.closest(".welcomeClose, .welcomeGateButton")) {
      window.setTimeout(unlockScroll, 80);
      window.setTimeout(unlockScroll, 350);
    }

    if (!isPageHashLink(link)) return;
    const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    scrollToHash(link.hash);

    const menuPanel = link.closest(".mobileMenuPanel");
    if (menuPanel) {
      menuPanel.hidden = true;
      link.closest(".mobileMenu")?.classList.remove("isOpen");
    }
  };

  window.addEventListener("pageshow", () => {
    unlockScroll();
    if (window.location.hash) window.setTimeout(() => scrollToHash(window.location.hash, false), 50);
  });
  window.addEventListener("hashchange", () => {
    unlockScroll();
    if (window.location.hash) scrollToHash(window.location.hash, false);
  });
  document.addEventListener("click", handleClick, { passive: false });

  const observer = new MutationObserver(() => {
    unlockScroll();
  });
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["style"],
    childList: true,
    subtree: false
  });

  [250, 800, 1600].forEach((delay) => window.setTimeout(unlockScroll, delay));
})();
