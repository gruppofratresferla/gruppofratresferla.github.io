(() => {
  const unlockScroll = () => {
    document.documentElement.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("height");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("height");
    document.body.style.removeProperty("position");
  };

  const unlockAfterWelcome = (event) => {
    if (event.target.closest(".welcomeClose, .welcomeGateButton")) {
      window.setTimeout(unlockScroll, 80);
    }
  };

  window.addEventListener("pageshow", () => {
    if (!document.querySelector(".welcomeGate")) unlockScroll();
  });
  document.addEventListener("click", unlockAfterWelcome, { passive: true });

  const observer = new MutationObserver(() => {
    if (!document.querySelector(".welcomeGate")) unlockScroll();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  window.setTimeout(() => {
    if (!document.querySelector(".welcomeGate")) unlockScroll();
  }, 1200);
})();
