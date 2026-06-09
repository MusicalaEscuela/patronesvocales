export function wait(ms, signalChecker = () => false) {
  return new Promise((resolve) => {
    const startedAt = performance.now();

    function tick() {
      if (signalChecker()) {
        resolve(false);
        return;
      }

      if (performance.now() - startedAt >= ms) {
        resolve(true);
        return;
      }

      requestAnimationFrame(tick);
    }

    tick();
  });
}
