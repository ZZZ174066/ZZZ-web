(function () {
  const SKY_RGB = '110, 197, 255';
  const PARTICLE_COUNT = 92;
  const LINK_DIST = 145;
  const MOUSE_LINK_DIST = 210;
  const GRID_SIZE = 44;

  const app = document.getElementById('app');
  const canvas = document.getElementById('app-bg-canvas');
  if (!app || !canvas) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;
  let rafId = 0;
  let running = false;
  let gridOffset = 0;
  let particles = [];
  let ripples = [];

  const pointer = {
    x: 0,
    y: 0,
    active: false,
    inside: false
  };

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function resize() {
    const rect = app.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function initParticles() {
    const pad = Math.min(48, width * 0.06, height * 0.06);
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: rand(pad, Math.max(pad + 1, width - pad)),
      y: rand(pad, Math.max(pad + 1, height - pad)),
      vx: rand(-0.22, 0.22),
      vy: rand(-0.22, 0.22),
      r: rand(1.6, 3.4)
    }));
  }

  function drawGrid() {
    if (reducedMotion) gridOffset = 0;
    else gridOffset = (gridOffset + 0.28) % GRID_SIZE;

    ctx.strokeStyle = 'rgba(' + SKY_RGB + ', 0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = -GRID_SIZE; x <= width + GRID_SIZE; x += GRID_SIZE) {
      const px = x + gridOffset;
      ctx.moveTo(px, 0);
      ctx.lineTo(px, height);
    }
    for (let y = -GRID_SIZE; y <= height + GRID_SIZE; y += GRID_SIZE) {
      const py = y + gridOffset * 0.6;
      ctx.moveTo(0, py);
      ctx.lineTo(width, py);
    }
    ctx.stroke();
  }

  function dist(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }

  function drawLinks() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const d = dist(particles[i], particles[j]);
        if (d > LINK_DIST) continue;
        const alpha = (1 - d / LINK_DIST) * 0.48;
        ctx.strokeStyle = 'rgba(' + SKY_RGB + ', ' + alpha + ')';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }

    if (!pointer.inside) return;
    particles.forEach((p) => {
      const d = dist(pointer, p);
      if (d > MOUSE_LINK_DIST) return;
      const alpha = (1 - d / MOUSE_LINK_DIST) * 0.92;
      ctx.strokeStyle = 'rgba(' + SKY_RGB + ', ' + alpha + ')';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(pointer.x, pointer.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    });
  }

  function drawParticles() {
    particles.forEach((p) => {
      ctx.fillStyle = 'rgba(' + SKY_RGB + ', 0.18)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(' + SKY_RGB + ', 1)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    if (pointer.inside) {
      ctx.strokeStyle = 'rgba(' + SKY_RGB + ', 0.72)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 16, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(' + SKY_RGB + ', 0.35)';
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawRipples() {
    ripples = ripples.filter((ripple) => {
      ripple.r += ripple.speed;
      ripple.alpha -= 0.02;
      if (ripple.alpha <= 0 || ripple.r > ripple.maxR) return false;
      ctx.strokeStyle = 'rgba(' + SKY_RGB + ', ' + ripple.alpha + ')';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
      ctx.stroke();
      return true;
    });
  }

  function tickParticles() {
    if (reducedMotion) return;
    const pad = Math.min(48, width * 0.06, height * 0.06);

    particles.forEach((p) => {
      p.vx += rand(-0.018, 0.018);
      p.vy += rand(-0.018, 0.018);

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < pad) {
        p.x = pad;
        p.vx = Math.abs(p.vx) * 0.82 + 0.06;
      } else if (p.x > width - pad) {
        p.x = width - pad;
        p.vx = -Math.abs(p.vx) * 0.82 - 0.06;
      }

      if (p.y < pad) {
        p.y = pad;
        p.vy = Math.abs(p.vy) * 0.82 + 0.06;
      } else if (p.y > height - pad) {
        p.y = height - pad;
        p.vy = -Math.abs(p.vy) * 0.82 - 0.06;
      }

      const speed = Math.hypot(p.vx, p.vy);
      const maxSpeed = 0.7;
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      p.vx *= 0.992;
      p.vy *= 0.992;
    });
  }

  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);
    drawGrid();
    tickParticles();
    drawLinks();
    drawParticles();
    drawRipples();
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    resize();
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function addRipple(x, y, strong) {
    const spread = Math.min(width, height) * (strong ? 0.32 : 0.26);
    ripples.push({
      x,
      y,
      r: 0,
      maxR: spread,
      alpha: strong ? 0.95 : 0.78,
      speed: strong ? 3.6 : 3
    });
  }

  function setPointer(clientX, clientY) {
    const rect = app.getBoundingClientRect();
    pointer.x = clientX - rect.left;
    pointer.y = clientY - rect.top;
    pointer.inside = clientX >= rect.left && clientX <= rect.right &&
      clientY >= rect.top && clientY <= rect.bottom;
  }

  function onPointerMove(e) {
    setPointer(e.clientX, e.clientY);
  }

  function onPointerDown(e) {
    if (!app.classList.contains('visible')) return;
    const rect = app.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
    addRipple(x, y, true);
  }

  function onVisibilityChange() {
    if (document.hidden) stop();
    else if (app.classList.contains('visible')) start();
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', onVisibilityChange);

  const observer = new MutationObserver(() => {
    if (app.classList.contains('visible')) start();
    else stop();
  });
  observer.observe(app, { attributes: true, attributeFilter: ['class'] });

  if (app.classList.contains('visible')) start();
})();
