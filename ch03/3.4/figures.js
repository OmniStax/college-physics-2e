/* Figures for section 3.4 Projectile Motion. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['3.4'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, headline, topline, hbracket, vbracket, axes, nice, curve, labeller } = F;
const sim = (id, H) => F.sim(root, id, H);

/* ---------- small helpers shared by the figures ---------- */
const G = 9.80, TAU = 2 * Math.PI, RAD = Math.PI / 180;
const commas = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const sgn = (v) => (v < 0 ? '−' : '');
/* three significant figures, never in exponent form, with commas */
const texc = (s) => s.replace(/,/g, '{,}');
const sig3 = (x) => { const s = Math.abs(x).toPrecision(3); return sgn(x) + (s.includes('e') || Math.abs(x) >= 1000 ? commas(String(Math.round(Number(s)))) : s); };
/* three significant figures as a number, the way a worked example carries a value forward */
const r3 = (x) => Number(x.toPrecision(3));
/* the launch velocity arrow from (x, y) at th degrees, its label to the left of the launch point where the path is not */
function launch(ctx, x, y, L, th, label, lab) {
  const hx = x + L * Math.cos(th * RAD), hy = y - L * Math.sin(th * RAD);
  arrow(ctx, x, y, hx, hy, C('velocity'), 5);
  lab.add(label, hx, hy, -Math.sin(th * RAD) * 0.4 - 0.2, -Math.cos(th * RAD) - 0.2, C('velocity'), 20, 24);
}
/* the trajectory of a projectile launched from the origin with speed v0 at angle th (degrees) */
const flight = (v0, th) => {
  const vx = v0 * Math.cos(th * RAD), vy0 = v0 * Math.sin(th * RAD);
  return { vx, vy0, x: (t) => vx * t, y: (t) => vy0 * t - 0.5 * G * t * t, vy: (t) => vy0 - G * t, T: (2 * vy0) / G, R: (2 * vx * vy0) / G, h: (vy0 * vy0) / (2 * G), tTop: vy0 / G };
};
/* the path of a flight drawn through the scales X, Y from t0 to t1 */
function path(ctx, f, t0, t1, X, Y, color, w = 4, dash, n = 90) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; if (dash) ctx.setLineDash(dash); ctx.beginPath();
  for (let i = 0; i <= n; i++) { const t = t0 + ((t1 - t0) * i) / n; if (i) ctx.lineTo(X(f.x(t)), Y(f.y(t))); else ctx.moveTo(X(f.x(t)), Y(f.y(t))); }
  ctx.stroke(); ctx.restore();
}
/* a flat piece of ground through the scene at the height y */
function ground(ctx, x1, x2, y) { line(ctx, x1, y, x2, y, PAL.muted, 3); }

/* ---------- sprites, in the colour they are given ---------- */
/* a rock centred on (x, y) */
function rock(ctx, x, y, color, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = color; ctx.beginPath();
  ctx.moveTo(-14, 2); ctx.lineTo(-8, -10); ctx.lineTo(4, -12); ctx.lineTo(14, -3); ctx.lineTo(10, 9); ctx.lineTo(-4, 11); ctx.closePath(); ctx.fill(); ctx.restore();
}
/* a fireworks shell centred on (x, y), its fuse trailing */
function shell(ctx, x, y, color) {
  ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, 9, 0, TAU); ctx.fill();
  ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y + 9); ctx.quadraticCurveTo(x - 8, y + 18, x - 4, y + 26); ctx.stroke(); ctx.restore();
}
/* the burst of a shell at (x, y), f from 0 to 1 as it opens, at the strength k */
function burst(ctx, x, y, f, color, k = 1) {
  const r = 22 + 30 * f;
  ctx.save(); ctx.strokeStyle = alpha(color, (0.85 - 0.4 * f) * k); ctx.lineWidth = 3;
  for (let i = 0; i < 12; i++) { const a = (i * TAU) / 12 + 0.2; ctx.beginPath(); ctx.moveTo(x + 8 * Math.cos(a), y + 8 * Math.sin(a)); ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a)); ctx.stroke(); dot(ctx, x + r * Math.cos(a), y + r * Math.sin(a), alpha(color, k), true, 4); }
  ctx.restore();
}
/* a tower standing on (x, y), h tall */
function tower(ctx, x, y, h, color) {
  ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 3; ctx.beginPath();
  ctx.moveTo(x - 12, y); ctx.lineTo(x - 5, y - h); ctx.lineTo(x + 5, y - h); ctx.lineTo(x + 12, y);
  for (let k = 1; k < 4; k++) { const yy = y - (h * k) / 4, w = 12 - (7 * k) / 4; ctx.moveTo(x - w, yy); ctx.lineTo(x + w, yy); }
  ctx.stroke(); ctx.fillRect(x - 9, y - h - 8, 18, 8); ctx.restore();
}

/* =====================================================================
   FIGURE 3.35: the velocity and its components along the trajectory.
   The projectile leaves a mark every 0.50 s; each mark is projected on a
   track under the ground (the horizontal motion alone, the book's part b)
   and on two columns beside the y-axis (the vertical motion alone, rising
   and falling, its part c). Finite motion, so it gets the scrubber.
===================================================================== */
(function () {
  const H = 730, d = sim('sim-components', H);
  const v0 = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 15, max: 25, step: 0.5, value: 25, unit: 'm/s', dec: 1, onInput: reset, aria: 'initial speed' });
  const th = ctl(d.controls, { label: '\\kthetao', cls: 'angle', min: 30, max: 75, step: 1, value: 60, unit: '°', dec: 0, onInput: reset, aria: 'launch angle' });
  const fl = () => flight(v0.v, th.v);
  const cy = cycle(() => fl().T, 1.2);
  function reset() { cy.reset(); }
  /* one fixed scale, 14 units to the metre: the farthest flight the sliders allow is 63.8 m (25 m/s at 45°)
     and the highest 29.8 m (25 m/s at 75°). Velocity arrows are 4.5 units per m/s, a mark every 0.50 s. */
  const SC = 14, K = 4.5, DT = 0.5, X0 = 250, Y0 = 560, YT = 640, XU = 105, XD = 172;
  const X = (m) => X0 + m * SC, Y = (m) => Y0 - m * SC;
  function draw() {
    const { ctx } = begin(d.c);
    const f = fl(), tau = Math.min(cy.now(), f.T), done = tau >= f.T - 1e-9;
    const x = f.x(tau), y = Math.max(0, f.y(tau)), vy = f.vy(tau), v = Math.hypot(f.vx, vy), thv = Math.atan2(vy, f.vx) / RAD;
    const cv = C('velocity'), soft = alpha(cv, 0.45), ink3 = alpha(PAL.ink, 0.3);
    const lab = labeller(ctx, H); lab.block(0, 0, 1400, 96);
    line(ctx, X0 - 12, Y0, 1330, Y0, PAL.muted, 3); text(ctx, 'x', 1350, Y0, PAL.ink, { size: 22, weight: 600, align: 'center' });
    line(ctx, X0, Y0 + 8, X0, 122, PAL.muted, 2); text(ctx, 'y', X0 - 22, 126, PAL.ink, { size: 22, weight: 600, align: 'center' });
    line(ctx, X0, YT, 1330, YT, alpha(PAL.ink, 0.15), 2); line(ctx, XU, Y0, XU, 150, alpha(PAL.ink, 0.15), 2); line(ctx, XD, Y0, XD, 150, alpha(PAL.ink, 0.15), 2);
    path(ctx, f, 0, f.T, X, Y, PAL.muted, 3, [8, 8]);
    path(ctx, f, 0, tau, X, Y, PAL.ink, 4);
    /* a shadow on each track: its dot and the component it moves with */
    const shadowX = (px, col, w) => { arrow(ctx, px + 9, YT, px + 9 + f.vx * K, YT, col, w); };
    const shadowY = (py, vyk, col, w) => { const cx = vyk >= 0 ? XU : XD, s = vyk >= 0 ? -1 : 1; if (Math.abs(vyk) * K > 6) arrow(ctx, cx, py + s * 9, cx, py + s * 9 - vyk * K, col, w); return cx; };
    for (let k = 0; k * DT <= tau + 1e-9; k++) {
      const tk = k * DT, px = X(f.x(tk)), py = Y(f.y(tk)), vyk = f.vy(tk);
      dot(ctx, px, py, PAL.ink, false, 6);
      shadowX(px, soft, 3); dot(ctx, px, YT, PAL.muted, false, 7);
      const cx = shadowY(py, vyk, soft, 3); dot(ctx, cx, py, PAL.muted, false, 7);
    }
    /* the projectile now: its two shadows, its velocity with both components, and g */
    const px = X(x), py = Y(y), cxn = vy >= 0 ? XU : XD;
    line(ctx, px, py, px, YT, ink3, 2, [4, 8]); line(ctx, px, py, cxn, py, ink3, 2, [4, 8]);
    shadowX(px, cv, 4); dot(ctx, px, YT, PAL.ink, true, 8);
    shadowY(py, vy, cv, 4); dot(ctx, cxn, py, PAL.ink, true, 8);
    arrow(ctx, px - 30, py, px - 30, py + G * K, C('acceleration'), 5);
    arrow(ctx, px, py, px + f.vx * K, py, alpha(cv, 0.6), 3.5);
    if (Math.abs(vy) * K > 6) arrow(ctx, px, py, px, py - vy * K, alpha(cv, 0.6), 3.5);
    arrow(ctx, px, py, px + f.vx * K, py - vy * K, cv, 5);
    if (Math.abs(thv) > 12) {
      ctx.save(); ctx.strokeStyle = C('angle'); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(px, py, 40, 0, -thv * RAD, thv > 0); ctx.stroke(); ctx.restore();
    }
    lab.add('v', px + f.vx * K, py - vy * K, f.vx / v, -vy / v, cv, 22, 16);
    lab.add('v_x', px + f.vx * K, py, 0.6, vy > 0 ? 1 : -1, cv, 20, 16);
    if (Math.abs(vy) * K > 24) lab.add('v_y', px, py - vy * K, -1, 0, cv, 20, 14);
    dot(ctx, px, py, PAL.ink, true, 10);
    lab.flush();
    text(ctx, 'horizontal motion alone', X0, YT + 40, PAL.ink, { size: 19 });
    text(ctx, 'vertical motion alone', (XU + XD) / 2, Y0 + 36, PAL.ink, { size: 19, align: 'center' });
    text(ctx, 'rising', XU, 134, PAL.muted, { size: 17, align: 'center' }); text(ctx, 'falling', XD, 134, PAL.muted, { size: 17, align: 'center' });
    F.legend(ctx, { l: 0, r: 1380, t: 100, b: Y0 }, [{ s: 'velocity v', color: cv, w: 5 }, { s: 'its components v_x and v_y', color: alpha(cv, 0.6), w: 3.5 },
      { s: 'acceleration, a_y = −g', color: C('acceleration'), w: 5 }, { s: 'one mark every 0.50 s', kind: 'dot', hollow: true, color: PAL.ink }], { corner: 'tr' });
    topline(ctx, done ? 'At landing, ' + fmt(f.T, 2) + ' s after launch, $\\kvy = −' + fmt(f.vy0, 1) + '$ m/s, the negative of its first value, and $\\kvx$ is still ' + fmt(f.vx, 1) + ' m/s.'
      : Math.abs(vy) < 0.6 ? 'At the highest point, ' + fmt(tau, 2) + ' s after launch, $\\kvy = 0$ and the velocity is horizontal, $\\kv = \\kvx = ' + fmt(f.vx, 1) + '$ m/s.'
      : vy > 0 ? 'After ' + fmt(tau, 2) + ' s $\\kvx$ is still ' + fmt(f.vx, 1) + ' m/s, and $\\kvy$ has fallen from ' + fmt(f.vy0, 1) + ' m/s to ' + fmt(vy, 1) + ' m/s.'
      : 'After ' + fmt(tau, 2) + ' s $\\kvx$ is still ' + fmt(f.vx, 1) + ' m/s, and $\\kvy$ is −' + fmt(-vy, 1) + ' m/s, pointing down.');
    const sv = (q) => sgn(q) + fmt(Math.abs(q), 1);
    tex(d.readout, `\\kvx = \\kvo\\cos\\kthetao = (${fmt(v0.v, 1)}\\ \\text{m/s})\\cos ${th.v}^\\circ = ${fmt(f.vx, 1)}\\ \\text{m/s} \\\\ `
      + `\\kvy = \\kvo\\sin\\kthetao - \\kg\\kt = ${fmt(f.vy0, 1)}\\ \\text{m/s} - (9.80\\ \\text{m/s}^2)(${fmt(tau, 2)}\\ \\text{s}) = ${sv(vy)}\\ \\text{m/s} \\\\ `
      + `\\kv = \\sqrt{\\kvx^2 + \\kvy^2} = \\sqrt{(${fmt(f.vx, 1)}\\ \\text{m/s})^2 + (${sv(vy)}\\ \\text{m/s})^2} = ${fmt(v, 1)}\\ \\text{m/s}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => fl().T / 5), draw });
})();

/* =====================================================================
   FIGURE 3.36: the fireworks shell of Example 3.4, beside three shells
   with the same vertical component of initial velocity launched at 90°,
   60° and 45°. All four are level at every instant and burst together at
   h = v0y²/2g. The sliders are v0y and the angle, so the example's 70.0 m/s
   at 75° is the opening state. One run to the top per loop.
===================================================================== */
(function () {
  const H = 760, d = sim('sim-fireworks', H);
  const vy0 = ctl(d.controls, { label: '\\kvoy', cls: 'velocity', min: 40, max: 75, step: 0.1, value: 67.6, unit: 'm/s', dec: 1, onInput: reset, aria: 'vertical component of the initial velocity' });
  const th = ctl(d.controls, { label: '\\kthetao', cls: 'angle', min: 45, max: 90, step: 1, value: 75, unit: '°', dec: 0, onInput: reset, aria: 'launch angle' });
  const tTop = () => vy0.v / G;
  const cy = cycle(() => tTop() + 0.6, 1.4);   /* the climb, then the bursts open */
  function reset() { cy.reset(); }
  /* one fixed scale, 1.68 units to the metre: the highest burst the sliders allow is 287 m (75 m/s) and the
     farthest 574 m along (the 45° shell). Launch arrows are 1.6 units per m/s. */
  const SC = 1.68, KV = 1.6, X0 = 240, Y0 = 640;
  const X = (m) => X0 + m * SC, Y = (m) => Y0 - m * SC;
  function draw() {
    const { ctx } = begin(d.c);
    const tT = tTop(), tau = cy.now(), t = Math.min(tau, tT), atTop = tau >= tT - 1e-9, open = Math.max(0, Math.min(1, (tau - tT) / 0.6));
    const h = (vy0.v * vy0.v) / (2 * G), y = vy0.v * t - 0.5 * G * t * t;
    const vxOf = (a) => (a >= 90 ? 0 : vy0.v / Math.tan(a * RAD)), spOf = (a) => vy0.v / Math.sin(a * RAD);
    const cs = F.ref('shell'), cv = C('velocity'), cp = C('position');
    const lab = labeller(ctx, H); lab.block(0, 0, 1400, 96);
    ground(ctx, 60, 1340, Y0);
    line(ctx, X0, Y0 + 6, X0, 116, PAL.muted, 2); text(ctx, 'y', X0 + 22, 122, PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, 'x', 1356, Y0, PAL.ink, { size: 22, weight: 600, align: 'center' });
    const others = [90, 60, 45].filter((a) => Math.abs(a - th.v) > 5);
    const pathOf = (a, color, w, dash, t1) => { const vx = vxOf(a); ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; if (dash) ctx.setLineDash(dash); ctx.beginPath(); for (let i = 0; i <= 60; i++) { const s = (t1 * i) / 60; const qx = X(vx * s), qy = Y(vy0.v * s - 0.5 * G * s * s); if (i) ctx.lineTo(qx, qy); else ctx.moveTo(qx, qy); } ctx.stroke(); ctx.restore(); };
    /* the level every shell shares, and the height of the bursts */
    const far = Math.max(vxOf(th.v), ...others.map(vxOf)) * tT;
    line(ctx, X0, Y(h), X(far) + 70, Y(h), alpha(PAL.ink, 0.3), 2, [4, 8]);
    if (!atTop && y > 2) line(ctx, X0, Y(y), X(vxOf(Math.min(th.v, ...others)) * t) + 30, Y(y), alpha(cp, 0.6), 2, [10, 10]);
    vbracket(ctx, 150, Y(h), Y0, cp, 'h = ' + fmt(h, 0) + ' m', -1);
    /* the launch velocities, drawn to one scale: their heads are level because v0y is the same */
    const headY = Y0 - vy0.v * KV, lowest = Math.min(th.v, ...others);
    line(ctx, X0, headY, X0 + vxOf(lowest) * KV + 36, headY, alpha(cv, 0.6), 2, [4, 8]);
    text(ctx, 'v_{0y} = ' + fmt(vy0.v, 1) + ' m/s for all', X0 + vxOf(lowest) * KV + 46, headY, cv, { size: 19, weight: 600, bg: PAL.panel });
    for (const a of others) {
      pathOf(a, alpha(PAL.muted, 0.7), 3, [8, 8], tT); pathOf(a, PAL.muted, 3, null, t);
      arrow(ctx, X0, Y0, X0 + vxOf(a) * KV, headY, alpha(PAL.muted, 0.9), 4);
      const bx = X(vxOf(a) * tT);
      if (atTop) burst(ctx, bx, Y(h), open, PAL.muted, 0.7); else shell(ctx, X(vxOf(a) * t), Y(y), PAL.muted);
      text(ctx, a + '° at ' + fmt(spOf(a), 1) + ' m/s', a === 90 ? bx + 14 : bx, a === 90 ? Y(h) + 74 : Y(h) + 74, PAL.muted, { size: 18, align: a === 90 ? 'left' : 'center', bg: PAL.panel });
    }
    /* the shell of the example */
    const vx = vxOf(th.v), xT = vx * tT;
    pathOf(th.v, alpha(cs, 0.5), 3, [8, 8], tT); pathOf(th.v, cs, 5, null, t);
    arrow(ctx, X0, Y0, X0 + vx * KV, headY, cv, 6);
    if (th.v < 86) F.angleArc(ctx, { x: X0, y: Y0 }, 60, 0, th.v * RAD, 'θ₀ = ' + th.v + '°', lab, C('angle'));
    if (xT > 30) { hbracket(ctx, X0, X(xT), Y0 + 52, cp, ''); text(ctx, 'x = ' + fmt(xT, 0) + ' m', (X0 + X(xT)) / 2, Y0 + 82, cp, { weight: 600, align: 'center' }); line(ctx, X(xT), Y(h), X(xT), Y0, alpha(PAL.ink, 0.3), 2, [4, 8]); }
    if (atTop) burst(ctx, X(xT), Y(h), open, cs, 1); else shell(ctx, X(vx * t), Y(y), cs);
    F.rich(ctx, [[th.v + '° at ' + fmt(spOf(th.v), 1) + ' m/s', cs]], th.v > 86 ? X(xT) + 14 : X(xT), Y(h) + 74, { size: 19, align: th.v > 86 ? 'left' : 'center', bg: PAL.panel });
    lab.flush();
    topline(ctx, atTop ? 'After ' + fmt(tT, 2) + ' s every shell bursts ' + fmt(h, 0) + ' m up. The one fired at ' + th.v + '° is ' + fmt(xT, 0) + ' m along.'
      : 'After ' + fmt(t, 2) + ' s every shell is ' + fmt(y, 0) + ' m up, whatever its angle.');
    tex(d.readout, `\\kh = \\frac{\\kvoy^2}{2\\kg} = \\frac{(${fmt(vy0.v, 1)}\\ \\text{m/s})^2}{2(9.80\\ \\text{m/s}^2)} = ${fmt(h, 0)}\\ \\text{m} \\\\ `
      + `\\kt = \\frac{2\\ky}{\\kvoy + \\kvy} = \\frac{2(${fmt(h, 0)}\\ \\text{m})}{${fmt(vy0.v, 1)}\\ \\text{m/s} + 0} = ${fmt(tT, 2)}\\ \\text{s} \\\\ `
      + `\\kx = \\kvox\\kt = (${fmt(vx, 1)}\\ \\text{m/s})(${fmt(tT, 2)}\\ \\text{s}) = ${fmt(xT, 0)}\\ \\text{m}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => (tTop() + 0.6) / 5), draw });
})();

/* =====================================================================
   FIGURE 3.37: the hot rock of Example 3.5. The rock leaves the rim,
   rises and falls to the ground below; at impact its velocity is drawn
   with its components and its angle. The graph below is y against t, the
   parabola crossing the landing level twice, the earlier crossing hollow.
   Finite motion, so it gets the scrubber.
===================================================================== */
(function () {
  const H = 900, d = sim('sim-rock', H);
  const v0 = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 15, max: 30, step: 0.5, value: 25, unit: 'm/s', dec: 1, onInput: reset, aria: 'initial speed' });
  const th = ctl(d.controls, { label: '\\kthetao', cls: 'angle', min: 0, max: 50, step: 0.5, value: 35, unit: '°', dec: 1, onInput: reset, aria: 'launch angle' });
  const yl = ctl(d.controls, { label: '\\ky', cls: 'position', min: -25, max: -5, step: 0.5, value: -20, unit: 'm', dec: 1, onInput: reset, aria: 'height of the landing point' });
  const fl = () => flight(v0.v, th.v);
  const roots = () => { const f = fl(), disc = Math.sqrt(f.vy0 * f.vy0 - 2 * G * yl.v); return [(f.vy0 + disc) / G, (f.vy0 - disc) / G]; };
  const cy = cycle(() => roots()[0], 1.4);
  function reset() { cy.reset(); }
  /* one fixed scale, 7.5 units to the metre: the farthest landing the sliders allow is 114 m along (30 m/s
     near 40°, 25 m down), the highest rise 26.9 m (30 m/s at 50°). Velocity arrows are 3 units per m/s. */
  const SC = 7.5, K = 3, X0 = 230, YR = 322;
  const X = (m) => X0 + m * SC, Y = (m) => YR - m * SC;
  function draw() {
    const { ctx } = begin(d.c);
    const f = fl(), [tp, tn] = roots(), tau = Math.min(cy.now(), tp), done = tau >= tp - 1e-9;
    const x = f.x(tau), y = f.y(tau), vy = f.vy(tau), v = Math.hypot(f.vx, vy);
    /* at impact, each number follows from the rounded ones shown before it, as the example works them */
    const xl = f.x(tp), vxS = r3(f.vx), vyS = r3(r3(f.vy0) - G * Number(tp.toFixed(2))), vS = r3(Math.hypot(vxS, vyS)), thS = Math.atan2(vyS, vxS) / RAD;
    const cv = C('velocity'), cp = C('position'), ck = F.ref('volcano');
    const lab = labeller(ctx, H); lab.block(0, 0, 1400, 96); lab.block(1130, Y(0) + 10, 1320, Y(yl.v) - 10);
    /* Kilauea: a crater behind the rim, a flank that stays under every path, and level ground at the landing height */
    const gy = Y(yl.v), fx = X(0.35 * xl);
    const prof = [[30, YR + 150], [X0 - 150, YR + 14], [X0 - 118, YR - 6], [X0 - 84, YR + 24], [X0 - 30, YR + 24], [X0, YR], [X0 + (fx - X0) * 0.45, YR + (gy - YR) * 0.5], [fx, gy], [1370, gy]];
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.beginPath(); prof.forEach(([sx, sy], i) => (i ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy))); ctx.lineTo(1370, 640); ctx.lineTo(30, 640); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = ck; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); prof.forEach(([sx, sy], i) => (i ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy))); ctx.stroke(); ctx.restore();
    F.rich(ctx, [['Kilauea', ck]], X0 - 60, YR + 70, { size: 19, align: 'center' });
    text(ctx, 'crater', X0 - 57, YR - 2, ck, { size: 16, align: 'center' });
    /* the level of the rim, the drop to the landing point, and the trajectory */
    line(ctx, X0, YR, 1330, YR, alpha(PAL.ink, 0.35), 2, [8, 8]);
    vbracket(ctx, 1300, YR, gy, cp, 'y = ' + sgn(yl.v) + fmt(Math.abs(yl.v), 1) + ' m', -1);
    path(ctx, f, 0, tp, X, Y, PAL.muted, 3, [8, 8]);
    path(ctx, f, 0, tau, X, Y, PAL.ink, 4);
    launch(ctx, X0, YR, v0.v * K, th.v, 'v₀ = ' + fmt(v0.v, 1) + ' m/s', lab);
    if (th.v > 12) F.angleArc(ctx, { x: X0, y: YR }, 50, 0, th.v * RAD, 'θ₀ = ' + fmt(th.v, 1) + '°', lab, C('angle'));
    dot(ctx, X(xl), gy, cp, false, 8);
    /* the rock and its velocity; at impact the components and the angle below the horizontal */
    const px = X(x), py = Y(y);
    if (done) {
      arrow(ctx, px, py, px + vxS * K, py, alpha(cv, 0.6), 3.5); lab.add('v_x = ' + fmt(vxS, 1) + ' m/s', px + vxS * K, py, 0.6, -1, cv, 19, 14);
      arrow(ctx, px, py, px, py - vyS * K, alpha(cv, 0.6), 3.5); lab.add('v_y = ' + sgn(vyS) + fmt(Math.abs(vyS), 1) + ' m/s', px, py - vyS * K * 0.7, -1, 0, cv, 19, 16);
      arrow(ctx, px, py, px + vxS * K, py - vyS * K, cv, 5);
      lab.add('v = ' + fmt(vS, 1) + ' m/s', px + vxS * K, py - vyS * K, 0.5, 1, cv, 20, 16);
      ctx.save(); ctx.strokeStyle = C('angle'); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(px, py, 44, 0, -thS * RAD, false); ctx.stroke(); ctx.restore();
      lab.add('θ_v = ' + sgn(thS) + fmt(Math.abs(thS), 1) + '°', px + 44 * Math.cos((thS * RAD) / 2), py - 44 * Math.sin((thS * RAD) / 2), 1, 0.25, C('angle'), 19, 18);
    } else if (tau > 0.05) {
      arrow(ctx, px, py, px + f.vx * K, py - vy * K, cv, 4);
      lab.add('v = ' + fmt(v, 1) + ' m/s', px + f.vx * K, py - vy * K, f.vx / v, -vy / v, cv, 19, 16);
    }
    rock(ctx, px, py, F.ref('rock'), 1.3);
    lab.flush();
    /* y against t on fixed axes, both roots of the quadratic: the latest landing the sliders allow is 5.6 s
       and the earliest crossing −2.3 s; the rise is at most 26.9 m and the drop 25 m */
    const bx = { l: 180, r: 1240, t: 680, b: 840 };
    const g = axes(ctx, bx, [-3, 6], [-40, 40], { xl: 't (s)', xc: C('time'), yl: 'y (m)', yc: cp, nx: 9, ny: 4, fx: (s) => sgn(s) + fmt(Math.abs(s), 0), fy: (s) => sgn(s) + fmt(Math.abs(s), 0) });
    ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.1); ctx.fillRect(g.X(-3), bx.t, g.X(0) - g.X(-3), bx.b - bx.t); ctx.restore();
    text(ctx, 'before the launch', g.X(-3) + 12, bx.t + 16, PAL.muted, { size: 17 });
    ctx.save(); ctx.beginPath(); ctx.rect(bx.l, bx.t, bx.r - bx.l, bx.b - bx.t); ctx.clip();
    curve(ctx, f.y, -3, 0, g.X, g.Y, alpha(cp, 0.45), 4, 60); curve(ctx, f.y, 0, 6, g.X, g.Y, cp, 5, 120); ctx.restore();
    line(ctx, g.X(-3), g.Y(yl.v), g.X(6), g.Y(yl.v), cp, 3, [10, 10]);
    text(ctx, 'landing level', g.X(6) - 10, g.Y(yl.v) + 20, cp, { size: 17, weight: 600, align: 'right' });
    line(ctx, g.X(tp), g.Y(0), g.X(tp), g.Y(yl.v), C('time'), 3, [4, 8]); line(ctx, g.X(tn), g.Y(0), g.X(tn), g.Y(yl.v), PAL.muted, 3, [4, 8]);
    dot(ctx, g.X(tp), g.Y(yl.v), C('time'), true, 10); dot(ctx, g.X(tn), g.Y(yl.v), PAL.muted, false, 10);
    dot(ctx, g.X(tau), g.Y(y), PAL.ink, true, 9);
    text(ctx, 't = ' + fmt(tp, 2) + ' s', g.X(tp) + 16, g.Y(yl.v) - 22, C('time'), { size: 18, weight: 600, bg: PAL.panel });
    text(ctx, 't = −' + fmt(-tn, 2) + ' s', g.X(tn) + 16, g.Y(yl.v) + 24, PAL.muted, { size: 18, weight: 600 });
    topline(ctx, done ? 'After ' + fmt(tp, 2) + ' s the rock lands ' + fmt(-yl.v, 1) + ' m below the rim at ' + fmt(vS, 1) + ' m/s, ' + fmt(-thS, 1) + '° below the horizontal.'
      : 'After ' + fmt(tau, 2) + ' s the rock is ' + fmt(Math.abs(y), 1) + ' m ' + (y >= 0 ? 'above' : 'below') + ' the rim and ' + fmt(x, 1) + ' m along, moving at ' + fmt(v, 1) + ' m/s.');
    tex(d.readout, `(${fmt(G / 2, 2)}\\ \\text{m/s}^2)\\kt^2 - (${fmt(f.vy0, 1)}\\ \\text{m/s})\\kt - (${fmt(-yl.v, 1)}\\ \\text{m}) = 0 \\;\\Rightarrow\\; \\kt = ${fmt(tp, 2)}\\ \\text{s}\\ \\text{or}\\ -${fmt(-tn, 2)}\\ \\text{s} \\\\ `
      + `\\kvy = \\kvoy - \\kg\\kt = ${fmt(r3(f.vy0), 1)}\\ \\text{m/s} - (9.80\\ \\text{m/s}^2)(${fmt(tp, 2)}\\ \\text{s}) = -${fmt(-vyS, 1)}\\ \\text{m/s} \\\\ `
      + `\\kv = \\sqrt{\\kvx^2 + \\kvy^2} = \\sqrt{(${fmt(vxS, 1)}\\ \\text{m/s})^2 + (-${fmt(-vyS, 1)}\\ \\text{m/s})^2} = ${fmt(vS, 1)}\\ \\text{m/s}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => roots()[0] / 5), draw });
})();

/* =====================================================================
   FIGURE 3.38: the range on level ground, with R against θ₀ beneath.
   It opens on the book's part (b): 50 m/s at 75°, the dashed 15° path
   landing at the same 128 m and the faint 45° path at 255 m. The speeds of
   part (a), 30, 40 and 50 m/s, are detents. 45° is a special value on the
   angle: as the angle nears it the dashed complementary path closes on the
   chosen one, and on it sin 2θ₀ becomes 1, the range equation drops that
   term, and the dashed path bends into the chosen one.
===================================================================== */
(function () {
  const H = 940, d = sim('sim-range', H);
  const v0 = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 30, max: 50, step: 1, value: 50, unit: 'm/s', dec: 0, detents: [30, 40, 50], onInput: reset, aria: 'initial speed' });
  const th = ctl(d.controls, { label: '\\kthetao', cls: 'angle', min: 5, max: 85, step: 1, value: 75, unit: '°', dec: 0, specials: [{ at: 45, label: '45°' }], onInput: reset, aria: 'launch angle' });
  const eqHost = el('div');
  d.readout.append(eqHost);
  const fl = () => flight(v0.v, th.v);
  const cy = cycle(() => fl().T, 1.2);
  const merge = F.tween(d, 1), reveal = F.tween(d, 1);
  let at45 = false, lastComp = 15;
  function reset() {
    cy.reset();
    const on = th.v === 45;
    if (on === at45) return;
    at45 = on;
    if (on) { merge.set(0); merge.to(1, 900); } else { merge.set(0); reveal.set(0); reveal.to(1, 900); }
  }
  const range = (v, a) => (v * v * Math.sin(2 * a * RAD)) / G;
  const ptsOf = (f, t1 = f.T, n = 90) => Array.from({ length: n + 1 }, (_, i) => { const t = (t1 * i) / n; return [f.x(t), Math.max(0, f.y(t))]; });
  function pline(ctx, pts, X, Y, color, w, dash) {
    if (pts.length < 2) return;
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; if (dash) ctx.setLineDash(dash); ctx.beginPath();
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)))); ctx.stroke(); ctx.restore();
  }
  /* one fixed scale, 3.4 units to the metre: the farthest range is 255 m (50 m/s at 45°) and the highest
     path 127 m (50 m/s at 85°) */
  const SC = 3.4, X0 = 230, Y0 = 560;
  const X = (m) => X0 + m * SC, Y = (m) => Y0 - m * SC;
  function draw() {
    const { ctx } = begin(d.c); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const f = fl(), tau = cy.now(), comp = 90 - th.v, f45 = flight(v0.v, 45);
    if (!at45) lastComp = comp;
    const x = f.x(tau), y = Math.max(0, f.y(tau)), cp = C('position');
    ground(ctx, 60, 1340, Y0);
    const near45 = Math.abs(th.v - 45) < 6;
    const apex = (g, s, color, w) => text(ctx, s, X(g.x(g.tTop)), Math.max(112, Y(g.h) - 22), color, { size: 19, weight: w, align: 'center', bg: PAL.panel });
    if (at45) {
      /* the complement bends into the chosen path and is gone once they coincide */
      if (merge.v < 1) pline(ctx, ptsOf(flight(v0.v, lastComp + (45 - lastComp) * F.ease.smooth(merge.v))), X, Y, alpha(PAL.muted, 1 - merge.v), 4, [12, 12]);
    } else {
      pline(ctx, F.partial(ptsOf(f45), reveal.v), X, Y, alpha(PAL.muted, 0.5), 4);
      pline(ctx, F.partial(ptsOf(flight(v0.v, comp)), reveal.v), X, Y, PAL.muted, 4, [12, 12]);
      if (!near45 && reveal.v > 0.99) { apex(f45, '45°', PAL.muted, 400); apex(flight(v0.v, comp), comp + '°', PAL.muted, 600); }
    }
    pline(ctx, ptsOf(f), X, Y, alpha(PAL.ink, 0.3), 4);
    pline(ctx, ptsOf(f, tau), X, Y, PAL.ink, 6);
    apex(f, th.v + '°', C('angle'), 600);
    const L = v0.v * 2.4;
    arrow(ctx, X0, Y0, X0 + L * Math.cos(th.v * RAD), Y0 - L * Math.sin(th.v * RAD), C('velocity'), 6);
    text(ctx, 'v₀ = ' + v0.v + ' m/s', X0 - 16, Y0 - Math.max(30, L * Math.sin(th.v * RAD) * 0.6), C('velocity'), { size: 20, weight: 600, align: 'right' });
    /* the range of the chosen angle, and under it the farthest this speed reaches */
    hbracket(ctx, X0, X(f.R), Y0 + 46, cp, '');
    text(ctx, 'R = ' + sig3(f.R) + ' m', X(f.R / 2), Y0 + 74, cp, { weight: 600, align: 'center' });
    if (!at45) {
      hbracket(ctx, X0, X(f45.R), Y0 + 112, alpha(PAL.muted, 0.9), '');
      text(ctx, 'farthest, ' + sig3(f45.R) + ' m at 45°', X(f45.R / 2), Y0 + 140, PAL.muted, { size: 20, align: 'center' });
    }
    dot(ctx, X(f.R), Y0, cp, true, 9);
    dot(ctx, X(x), Y(y), PAL.ink, true, 11);
    /* R against θ₀ for the set speed, on fixed axes: 255 m is the farthest range */
    const g = axes(ctx, { l: 230, r: 1240, t: 740, b: 880 }, [0, 90], [0, 300], { xl: 'θ₀ (°)', xc: C('angle'), yl: 'R (m)', yc: cp, nx: 6, ny: 3, fx: (a) => fmt(a, 0) });
    ctx.save(); ctx.fillStyle = alpha(cp, 0.12); ctx.beginPath(); ctx.moveTo(g.X(0), g.Y(0));
    for (let i = 0; i <= 90; i++) ctx.lineTo(g.X(i), g.Y(range(v0.v, i))); ctx.lineTo(g.X(90), g.Y(0)); ctx.fill(); ctx.restore();
    curve(ctx, (a) => range(v0.v, a), 0, 90, g.X, g.Y, cp, 6, 90);
    line(ctx, g.X(th.v), g.Y(0), g.X(th.v), g.Y(f.R), PAL.ink, 3, [4, 10]);
    if (!at45) { line(ctx, g.X(comp), g.Y(0), g.X(comp), g.Y(f.R), PAL.muted, 3, [4, 10]); line(ctx, g.X(th.v), g.Y(f.R), g.X(comp), g.Y(f.R), alpha(PAL.ink, 0.35), 2, [4, 8]); dot(ctx, g.X(comp), g.Y(f.R), cp, false, 10); }
    dot(ctx, g.X(th.v), g.Y(f.R), cp, true, 11);
    topline(ctx, at45 ? 'At 45° a ' + v0.v + ' m/s launch lands ' + sig3(f.R) + ' m away, the farthest this speed can reach.'
      : 'At ' + th.v + '° a ' + v0.v + ' m/s launch lands ' + sig3(f.R) + ' m away, and so does a launch at ' + comp + '°.');
    const s = at45 ? '' : '\\,\\mk{s}{\\sin 2\\kthetao}', sv = at45 ? '' : `\\,\\mk{sval}{\\sin ${2 * th.v}^\\circ}`;
    F.morph(eqHost, `\\mk{R}{\\kR} = \\frac{\\mk{v0}{\\kvo^2}${s}}{\\mk{g}{\\kg}} = \\frac{\\mk{v0val}{(${v0.v}\\ \\text{m/s})^2}${sv}}{\\mk{gval}{9.80\\ \\text{m/s}^2}} = \\mk{Rval}{${sig3(f.R)}\\ \\text{m}}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => fl().T / 5), draw });
})();

/* =====================================================================
   FIGURE 3.39: the tower and the satellite. The whole Earth stays in one
   fixed view, as the book draws it, with the paths of launches at 2, 4
   and 6 km/s and the circular orbit left faint behind the chosen launch.
   The circular-orbit speed is a special value on the slider; on it the
   readout turns from the level-ground range into the orbit condition.
===================================================================== */
(function () {
  const H = 770, d = sim('sim-orbit', H);
  const RE = 6.37e6, GM = G * RE * RE, HT = 1.5e6, VC = Math.sqrt(GM / (RE + HT)) / 1000;   /* a 1,500 km tower: circular orbit at 7.11 km/s */
  const v0 = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 1, max: 7.6, step: 0.1, value: 6, unit: 'km/s', dec: 1, onInput: reset, aria: 'launch speed',
    specials: [{ at: () => VC, label: 'circular orbit' }] });
  v0.refresh();
  const ro = F.readout(d);
  function integrate(v) {
    const r0 = RE + HT; let x = 0, y = r0, vx = v * 1000, vy = 0, t = 0, swept = 0, last = Math.PI / 2;
    const acc = (px, py) => { const r = Math.hypot(px, py), a = -GM / (r * r * r); return [a * px, a * py]; };
    const pts = [{ x, y, t, swept, r: r0 }];
    const dt = Math.max(2, Math.min(8, 40000 / (v * 1000)));
    const out = (landed) => ({ pts, landed, T: pts[pts.length - 1].t });
    for (let i = 0; i < 60000; i++) {
      const [a1x, a1y] = acc(x, y);
      const x2 = x + 0.5 * dt * vx, y2 = y + 0.5 * dt * vy, vx2 = vx + 0.5 * dt * a1x, vy2 = vy + 0.5 * dt * a1y; const [a2x, a2y] = acc(x2, y2);
      const x3 = x + 0.5 * dt * vx2, y3 = y + 0.5 * dt * vy2, vx3 = vx + 0.5 * dt * a2x, vy3 = vy + 0.5 * dt * a2y; const [a3x, a3y] = acc(x3, y3);
      const x4 = x + dt * vx3, y4 = y + dt * vy3, vx4 = vx + dt * a3x, vy4 = vy + dt * a3y; const [a4x, a4y] = acc(x4, y4);
      x += (dt / 6) * (vx + 2 * vx2 + 2 * vx3 + vx4); y += (dt / 6) * (vy + 2 * vy2 + 2 * vy3 + vy4);
      vx += (dt / 6) * (a1x + 2 * a2x + 2 * a3x + a4x); vy += (dt / 6) * (a1y + 2 * a2y + 2 * a3y + a4y); t += dt;
      const ang = Math.atan2(y, x); let da = last - ang; if (da < -Math.PI) da += TAU; if (da > Math.PI) da -= TAU; swept += da; last = ang;
      const r = Math.hypot(x, y);
      if (r <= RE) { const p = pts[pts.length - 1], k = (p.r - RE) / (p.r - r); pts.push({ x: p.x + k * (x - p.x), y: p.y + k * (y - p.y), t: p.t + k * dt, swept: p.swept + k * (swept - p.swept), r: RE }); return out(true); }
      pts.push({ x, y, t, swept, r });
      if (swept >= TAU) return out(false);
    }
    return out(false);
  }
  /* one fixed view: the Earth's radius is 200 units, its centre at (700, 387), so the tower's top is at
     y = 140 and the longest ellipse the slider allows (7.6 km/s, 10,500 km from the centre at its far end) ends at y = 717 */
  const S = 200 / RE, OX = 700, OY = 387, RPX = 200;
  const X = (m) => OX + m * S, Y = (m) => OY - m * S;
  const GHOSTS = [2, 4, 6].map((v) => ({ v, run: integrate(v) }));
  let run = null, key = '';
  function paths() { const k = String(v0.v); if (k === key) return; key = k; run = integrate(v0.v); }
  const cy = cycle(() => { paths(); return run.T; }, 1.4);
  function reset() { cy.reset(); }
  const at = (tau) => { const p = run.pts; let lo = 0, hi = p.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (p[m].t < tau) lo = m + 1; else hi = m; } return Math.max(0, Math.min(lo, p.length - 1)); };
  let form = '', hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    paths();
    const { ctx } = begin(d.c); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const tau = cy.now(), done = tau >= run.T - 1e-9, pi = at(tau), p = run.pts[pi], end = run.pts[run.pts.length - 1];
    const lab = labeller(ctx, H); lab.block(0, 0, 1400, 96);
    const ce = F.ref('earth'), cp = C('position'), cv = C('velocity');
    hits = [];
    ctx.save(); ctx.fillStyle = alpha(ce, 0.18); ctx.strokeStyle = ce; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(OX, OY, RPX, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    F.rich(ctx, [['Earth', ce]], OX, OY, { size: 24, align: 'center' });
    /* the slower launches of the book's drawing and the circular orbit, faint */
    const faint = alpha(PAL.ink, 0.32);
    ctx.save(); ctx.strokeStyle = faint; ctx.lineWidth = 2.5; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.arc(OX, OY, (RE + HT) * S, 0, TAU); ctx.stroke(); ctx.restore();
    for (const gh of GHOSTS) {
      if (Math.abs(gh.v - v0.v) < 0.05) continue;
      const q = gh.run.pts, e = q[q.length - 1], b = q[Math.max(0, q.length - 6)];
      ctx.save(); ctx.strokeStyle = faint; ctx.lineWidth = 2.5; ctx.beginPath(); q.forEach((w, i) => (i ? ctx.lineTo(X(w.x), Y(w.y)) : ctx.moveTo(X(w.x), Y(w.y)))); ctx.stroke(); ctx.restore();
      const ux = X(e.x) - X(b.x), uy = Y(e.y) - Y(b.y), un = Math.hypot(ux, uy) || 1;
      arrow(ctx, X(e.x) - (ux / un) * 16, Y(e.y) - (uy / un) * 16, X(e.x), Y(e.y), faint, 2.5);
      const m = q[q.length >> 1]; hits.push({ x: X(m.x), y: Y(m.y), r: 26, name: 'launched at ' + gh.v + ' km/s' });
    }
    hits.push({ x: OX, y: OY + (RE + HT) * S, r: 30, name: 'circular orbit, ' + fmt(VC, 2) + ' km/s' }, { x: OX - (RE + HT) * S, y: OY, r: 30, name: 'circular orbit, ' + fmt(VC, 2) + ' km/s' });
    /* the ground covered, the path ahead and the path flown */
    const arcTo = run.landed ? end.swept : Math.min(p.swept, TAU);
    ctx.save(); ctx.strokeStyle = cp; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(OX, OY, RPX + 3, -Math.PI / 2, -Math.PI / 2 + Math.min(p.swept, arcTo), false); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = alpha(PAL.muted, 0.9); ctx.lineWidth = 3; ctx.setLineDash([2, 10]); ctx.beginPath(); run.pts.forEach((q, i) => (i ? ctx.lineTo(X(q.x), Y(q.y)) : ctx.moveTo(X(q.x), Y(q.y)))); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 5; ctx.beginPath(); for (const q of run.pts) { if (q.t > tau) break; ctx.lineTo(X(q.x), Y(q.y)); } ctx.stroke(); ctx.restore();
    const top = Y(RE + HT);
    tower(ctx, OX, Y(RE), HT * S, F.ref('tower'));
    lab.add('tower, 1,500 km', OX - 14, Y(RE) - (HT * S) / 2, -1, -0.2, F.ref('tower'), 18, 22);
    const L = v0.v * 16;
    arrow(ctx, OX, top, OX + L, top, cv, 6);
    lab.add('v₀ = ' + fmt(v0.v, 2) + ' km/s', OX + L / 2, top, 0.3, -1, cv, 20, 18);
    /* the projectile, its velocity and the acceleration, which points at the Earth's centre wherever it is */
    const px = X(p.x), py = Y(p.y), r = Math.hypot(p.x, p.y), ga = (RE * RE) / (r * r);
    if (tau > 0 && !(done && run.landed) && pi + 1 < run.pts.length) {
      const q = run.pts[pi + 1], qx = X(q.x) - px, qy = Y(q.y) - py, qn = Math.hypot(qx, qy) || 1;
      const sp = Math.hypot(q.x - p.x, q.y - p.y) / Math.max(1e-6, q.t - p.t) / 1000;
      arrow(ctx, px, py, px + (qx / qn) * sp * 16, py + (qy / qn) * sp * 16, cv, 5);
    }
    const u = Math.hypot(OX - px, OY - py) || 1;
    if (!(done && run.landed)) {
      arrow(ctx, px, py, px + ((OX - px) / u) * 60 * ga, py + ((OY - py) / u) * 60 * ga, C('acceleration'), 5);
      if (tau > 0) lab.add('a', px + ((OX - px) / u) * 60 * ga, py + ((OY - py) / u) * 60 * ga, (OX - px) / u, (OY - py) / u, C('acceleration'), 20, 14);
    }
    dot(ctx, px, py, F.ref('projectile'), true, 10);
    const along = (arcTo * RE) / 1000, flat = (v0.v * 1000 * Math.sqrt((2 * HT) / G)) / 1000, sofar = (Math.min(p.swept, arcTo) * RE) / 1000;
    if (run.landed) { const a = -Math.PI / 2 + end.swept; lab.add(sig3(along) + ' km along the surface', OX + (RPX + 8) * Math.cos(a), OY + (RPX + 8) * Math.sin(a), Math.cos(a), Math.sin(a), cp, 20, 22); }
    lab.flush();
    F.legend(ctx, { l: 20, r: 1380, t: 100, b: H - 10 }, [{ s: 'launches at 2, 4 and 6 km/s', color: faint, w: 2.5 }, { s: 'circular orbit, ' + fmt(VC, 2) + ' km/s', color: faint, w: 2.5, dash: [10, 10] }], { corner: 'bl' });
    const min = (q) => fmt(q / 60, 1) + ' min';
    const circ = Math.abs(v0.v - VC) <= 1e-9 * 7;
    topline(ctx, done && run.landed ? 'After ' + min(run.T) + ' it lands ' + sig3(along) + ' km along the curved surface. On level ground it would land ' + sig3(flat) + ' km away.'
      : done ? 'At ' + fmt(v0.v, 2) + ' km/s the Earth curves away as fast as the projectile falls, so after ' + min(run.T) + ' it is back at the tower, in orbit.'
      : 'After ' + min(tau) + ' the projectile is ' + sig3((r - RE) / 1000) + ' km up and has passed over ' + sig3(sofar) + ' km of the surface.');
    /* the level-ground range, or the orbit condition: v₀, g and h are the same quantities in both */
    const gv = '\\mk{gval}{(9.80\\ \\text{m/s}^2)}', hv = `\\mk{hval}{${texc(commas(fmt(HT, 0)))}\\ \\text{m}}`, re = '6.37 \\times 10^6\\ \\text{m}';
    const orbit = `\\sqrt{\\frac{\\mk{g}{\\kg}\\mk{RE}{R_E^2}}{\\mk{RE2}{R_E} + \\mk{h}{h}}} = \\sqrt{\\frac{${gv}\\mk{REval}{(${re})^2}}{\\mk{REval2}{${re}} + ${hv}}}`;
    const vc = `\\ \\text{km/s}`;
    ro.set(run.landed
      ? `\\mk{R}{\\kR} = \\mk{v0}{\\kvo}\\sqrt{\\frac{2\\mk{h}{h}}{\\mk{g}{\\kg}}} = \\mk{v0val}{(${fmt(v0.v, 1)}\\ \\text{km/s})}\\sqrt{\\frac{2(${hv})}{${gv}}} = \\mk{Rval}{${texc(sig3(flat))}\\ \\text{km}}`
      : circ ? `\\mk{v0}{\\kvo} = ${orbit} = \\mk{v0val}{${fmt(VC, 2)}${vc}}`
      : `\\mk{v0}{\\kvo} ${v0.v > VC ? '\\mk{gt}{>}' : '\\mk{lt}{<}'} ${orbit} = \\mk{vc}{${fmt(VC, 2)}${vc}}`,
      run.landed ? 'That is the range on level ground. Over the curved Earth it went ' + fmt(along / flat, 1) + ' times as far.'
      : circ ? 'At this speed the path is a circle, ' + fmt(run.T / 60, 0) + ' min round.'
      : v0.v > VC ? 'Above the circular speed the path is an ellipse, ' + fmt(run.T / 60, 0) + ' min round.'
      : 'This close to the circular speed the path is an ellipse that clears the surface, ' + fmt(run.T / 60, 0) + ' min round.',
      { keyMap: form === 'circ' && !run.landed && !circ ? { v0val: 'vc' } : form === 'off' && circ ? { vc: 'v0val' } : undefined });
    form = run.landed ? 'range' : circ ? 'circ' : 'off';
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => run.T / 5), draw });
})();
};
