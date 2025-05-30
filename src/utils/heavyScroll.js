// Heavy scroll implementation with JavaScript
export const addHeavyScroll = () => {
  let isScrolling = false;

  document.addEventListener(
    "wheel",
    (e) => {
      if (isScrolling) return;

      isScrolling = true;

      // Reduce scroll speed for heavier feel
      const scrollAmount = e.deltaY * 0.5; // Adjust multiplier for heaviness

      window.scrollTo({
        top: window.scrollY + scrollAmount,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling = false;
      }, 100);

      e.preventDefault();
    },
    { passive: false }
  );
};
