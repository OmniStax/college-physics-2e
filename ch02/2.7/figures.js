/* Figures for section 2.7 Falling Objects. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.7'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, hbracket, vbracket, axes, curve, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) { const n = el('small', null, small); host.appendChild(n); F.renderMath(n); } }
/* a signed number for a label: "+3.20" or "−6.60" */
const signed = (v, d) => (Math.abs(v) < Math.pow(10, -d) / 2 ? '0' : (v < 0 ? '−' : '+') + fmt(Math.abs(v), d));
/* a signed number in TeX, with the minus sign KaTeX draws */
const stex = (v, d) => (v < -Math.pow(10, -d) / 2 ? '-' + fmt(-v, d) : fmt(Math.abs(v), d));
const cl = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
const G = 9.8;

/* a vertical scale: an axis line at x with a tick and a label every step from lo to hi */
function vscale(ctx, x, Y, lo, hi, step, dec, unit) {
  line(ctx, x, Y(hi), x, Y(lo), PAL.muted, 2);
  for (let v = lo; v <= hi + 1e-9; v += step) {
    line(ctx, x - 8, Y(v), x + 8, Y(v), PAL.muted, 2);
    text(ctx, fmt(v, dec) + (unit ? ' ' + unit : ''), x - 14, Y(v), PAL.muted, { size: 17, align: 'right' });
  }
}
/* the edge of a cliff: a rock face from x0 to the edge, its top at `top`, running down to `bottom` */
function cliff(ctx, x0, edge, top, bottom) {
  ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x0, top); ctx.lineTo(edge, top); ctx.lineTo(edge - 5, top + 20); ctx.lineTo(edge - 20, top + 46); ctx.lineTo(edge - 13, top + 130);
  ctx.lineTo(edge - 26, bottom); ctx.lineTo(x0, bottom); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(edge, top); ctx.lineTo(edge - 5, top + 20); ctx.lineTo(edge - 20, top + 46); ctx.lineTo(edge - 13, top + 130); ctx.lineTo(edge - 26, bottom); ctx.stroke();
  ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.muted, 0.6);
  [[0.3, 30, 0.34, 0.5], [0.62, 60, 0.56, 0.8], [0.8, 150, 0.84, 0.95]].forEach(([a, dy, b, f]) => { ctx.beginPath(); ctx.moveTo(x0 + (edge - x0) * a, top + dy); ctx.lineTo(x0 + (edge - x0) * b, top + (bottom - top) * f); ctx.stroke(); });
  ctx.restore();
  line(ctx, x0, top, edge, top, PAL.ink, 4);
}
/* a claw hammer hanging head up, the end of its handle at (x, y), about 104 tall at s = 1 */
function hammer(ctx, x, y, color, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = color; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.lineWidth = 2.5;
  /* the grip, banded as the book draws it */
  ctx.fillStyle = alpha(color, 0.3); ctx.beginPath(); ctx.roundRect(-9, -58, 18, 58, 5); ctx.fill(); ctx.stroke();
  ctx.lineWidth = 1.5; for (let yy = -50; yy <= -8; yy += 7) { ctx.beginPath(); ctx.moveTo(-8, yy); ctx.lineTo(8, yy); ctx.stroke(); }
  /* the steel: the neck, the head with its flared face to the right and the claw curving down to the left */
  ctx.fillStyle = color; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-5, -58); ctx.lineTo(5, -58); ctx.lineTo(6, -84); ctx.lineTo(-6, -84); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-8, -106); ctx.lineTo(18, -106); ctx.lineTo(21, -109); ctx.lineTo(35, -109); ctx.lineTo(35, -79); ctx.lineTo(21, -79); ctx.lineTo(18, -83); ctx.lineTo(-8, -85);
  ctx.quadraticCurveTo(-30, -84, -45, -54); ctx.quadraticCurveTo(-50, -100, -8, -106); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}
/* a feather standing on its quill at (x, y), about 96 tall at s = 1 */
function feather(ctx, x, y, color, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = color; ctx.fillStyle = alpha(color, 0.28); ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(2, -24); ctx.bezierCurveTo(-24, -40, -22, -76, 10, -96); ctx.bezierCurveTo(30, -70, 26, -40, 2, -24); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-1, -50, 10, -96); ctx.stroke();
  ctx.lineWidth = 1.5;
  [[-34, -12, -46], [-48, -14, -62], [-62, -10, -76], [-36, 16, -50], [-52, 20, -66], [-68, 20, -80]].forEach(([y0, dx, y1]) => { const x0 = 1 + (-y0 - 24) * 0.11; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + dx, y1); ctx.stroke(); });
  ctx.restore();
}

/* =====================================================================
   FIGURE 2.37: the hammer and the feather, in the book's three panels:
   in air, in a vacuum, and on the Moon. All three run on one clock from
   one release height. Finite motion, so it gets the scrubber.
===================================================================== */
(function () {
  const H = 690;
  const d = sim('sim-hammer-feather', H);
  const h = ctl(d.controls, { label: 'h', cls: 'position', min: 0.5, max: 2, step: 0.1, value: 1.5, unit: 'm', dec: 1, onInput: reset, aria: 'height of the drop' });
  const GM = 1.67;
  const tE = () => Math.sqrt((2 * h.v) / G), tM = () => Math.sqrt((2 * h.v) / GM);
  /* A feather in air stops gaining speed within a few centimetres and then drifts down steadily. The
     book gives no number for it, so none is printed: the drift is drawn at 0.8 m/s. */
  const VT = 0.8, TC = VT / G;
  const airFall = (t) => (t <= TC ? 0.5 * G * t * t : 0.5 * VT * TC + VT * (t - TC));
  const tAir = () => TC + (h.v - 0.5 * VT * TC) / VT;
  const T = () => Math.max(tM(), tAir());
  const cy = cycle(T, 1.6);
  function reset() { cy.reset(); }
  /* one height scale for the three panels, fixed from the slider's maximum of 2 m */
  const floorY = 560, topY = 220, Y = (m) => floorY - ((floorY - topY) * m) / 2;
  const P = [{ l: 120, r: 500, name: 'in air', g: G }, { l: 540, r: 920, name: 'in a vacuum', g: G }, { l: 960, r: 1340, name: 'in a vacuum, on the Moon', g: GM }];
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), te = tE(), tm = tM();
    const fall = (g) => Math.min(h.v, 0.5 * g * tau * tau);
    hits = [];
    vscale(ctx, 96, Y, 0, 2, 0.5, 1, 'm');
    P.forEach((p, i) => {
      const xh = p.l + 168, xf = p.r - 112, fh = fall(p.g), ff = i === 0 ? Math.min(h.v, airFall(tau)) : fh;
      ctx.save(); ctx.strokeStyle = PAL.rule; ctx.lineWidth = 2; ctx.strokeRect(p.l, 116, p.r - p.l, floorY - 116); ctx.restore();
      line(ctx, p.l, floorY, p.r, floorY, PAL.ink, 4);
      line(ctx, p.l, Y(h.v), p.r, Y(h.v), PAL.muted, 2, [8, 8]);
      hammer(ctx, xh, Y(h.v - fh), F.ref('hammer'), 0.85); feather(ctx, xf, Y(h.v - ff), F.ref('feather'), 0.85);
      hits.push({ x: xh, y: Y(h.v - fh) - 45, r: 48, name: 'the hammer' }, { x: xf, y: Y(h.v - ff) - 40, r: 44, name: 'the feather' });
      /* the acceleration due to gravity, drawn to one scale in all three panels */
      const ax = p.r - 34, ay = 300, L = p.g * 11;
      arrow(ctx, ax, ay, ax, ay + L, C('acceleration'), 5);
      text(ctx, 'g', ax, ay - 22, C('acceleration'), { size: 24, weight: 600, align: 'center', italic: true });
      text(ctx, p.name, (p.l + p.r) / 2, floorY + 34, PAL.ink, { size: 22, align: 'center', weight: 600 });
      F.rich(ctx, ['g = ', [fmt(p.g, 2) + ' m/s²', C('acceleration')]], (p.l + p.r) / 2, floorY + 68, { size: 20, align: 'center' });
      /* the landing time stands over each thing that fell freely */
      const tl = i === 2 ? tm : te;
      if (tau >= tl - 1e-9) { text(ctx, fmt(tl, 2) + ' s', xh, floorY - 108, C('time'), { size: 20, weight: 600, align: 'center', bg: PAL.panel }); if (i) text(ctx, fmt(tl, 2) + ' s', xf, floorY - 104, C('time'), { size: 20, weight: 600, align: 'center', bg: PAL.panel }); }
    });
    text(ctx, 'h = ' + fmt(h.v, 1) + ' m', P[0].l + 10, Y(h.v) - 20, C('position'), { size: 20, weight: 600 });
    topline(ctx, tau >= tm - 1e-9 ? 'With no air the hammer and the feather land together, after ' + fmt(te, 2) + ' s on Earth and ' + fmt(tm, 2) + ' s on the Moon.'
      : tau >= te - 1e-9 ? 'At ' + fmt(tau, 2) + ' s the pair in the vacuum has landed together, and on the Moon the two are still side by side, ' + fmt(h.v - fall(GM), 2) + ' m up.'
      : 'At ' + fmt(tau, 2) + ' s the hammer and the feather are side by side wherever there is no air. In air the feather is left behind.');
    const row = (name, g, t) => `\\text{${name}:}\\quad \\kt &= \\sqrt{\\frac{2h}{\\kg}} = \\sqrt{\\frac{2(${fmt(h.v, 1)}\\ \\text{m})}{${fmt(g, 2)}\\ \\text{m/s}^2}} = ${fmt(t, 2)}\\ \\text{s}`;
    readout(d.readout, `\\begin{aligned} ${row('Earth', G, te)} \\\\ ${row('Moon', GM, tm)} \\end{aligned}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T() / 5.5), draw });
})();

/* =====================================================================
   FIGURE 2.38 + 2.39: the rock thrown upward. The rock rises and falls
   on one vertical line beside the cliff; the position graph stands on
   the same height scale, so the rock's height is carried straight across
   to its point on the curve. Velocity and acceleration against time
   beside it. The flight is the example's 3.00 s, so it gets the scrubber.
===================================================================== */
(function () {
  const H = 850;
  const d = sim('sim-rock-up', H);
  /* 10 to 15 m/s keeps every value of the 3.00 s flight on the fixed scales: y −15 to 15 m, v −20 to 20 m/s */
  const v0 = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 10, max: 15, step: 0.1, value: 13, unit: 'm/s', dec: 1, onInput: reset, aria: 'initial velocity', detents: [{ v: 13, label: 'Example 2.14' }], snap: true });
  const TMAX = 3, YLO = -15, YHI = 15;
  const cy = cycle(() => TMAX, 1.6);
  function reset() { cy.reset(); }
  const pos = (s) => v0.v * s - 0.5 * G * s * s, vel = (s) => v0.v - G * s;
  const sTop = 150, sBot = 750, SX = 92, RX = 310, PS = 0.45;
  const Y = (m) => sBot - ((sBot - sTop) * (cl(m, YLO, YHI) - YLO)) / (YHI - YLO);
  const HAND = { x: 54, y: -112 }, ground = Y(0) - HAND.y * PS, PX = RX - 14 - HAND.x * PS, EDGE = RX - 26;
  const B1 = { l: 450, r: 930, t: sTop, b: sBot }, B2 = { l: 1040, r: 1340, t: 150, b: 400 }, B3 = { l: 1040, r: 1340, t: 520, b: 750 };
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), ttop = v0.v / G, ytop = (v0.v * v0.v) / (2 * G), y = pos(tau), v = vel(tau);
    /* the scene */
    vscale(ctx, SX, Y, YLO, YHI, 5, 0);
    text(ctx, 'y (m)', SX - 40, sTop - 30, C('position'), { size: 20, weight: 600 });
    cliff(ctx, 112, EDGE, ground, H - 14);
    line(ctx, RX, Y(YHI), RX, Y(YLO), PAL.rule, 1.5);
    F.silhouette(ctx, { x: PX, y: ground, s: PS, face: 1, pose: 'stand', color: F.ref('thrower'), hands: [HAND, { x: -6, y: -76 }], elbowSide: 1 });
    /* the three graphs; the first shares the scene's height scale */
    const G1 = axes(ctx, B1, [0, TMAX], [YLO, YHI], { xl: 't (s)', xc: C('time'), nx: 3, ny: 6, fy: () => '' });
    const G2 = axes(ctx, B2, [0, TMAX], [-20, 20], { xl: 't (s)', xc: C('time'), yl: 'v (m/s)', yc: C('velocity'), nx: 3, ny: 4 });
    const G3 = axes(ctx, B3, [0, TMAX], [-12, 0], { xl: 't (s)', xc: C('time'), yl: 'a (m/s²)', yc: C('acceleration'), nx: 3, ny: 6 });
    text(ctx, 'y against t', B1.l + 8, B1.t - 24, C('position'), { size: 20, weight: 600 });
    /* the highest point: one level across the scene and the position graph */
    line(ctx, SX + 10, Y(ytop), B1.r, Y(ytop), C('position'), 2, [8, 8]);
    const hl = 'highest point, ' + fmt(ytop, 2) + ' m at ' + fmt(ttop, 2) + ' s', hw = F.measure(ctx, hl, { size: 20, weight: 600 });
    text(ctx, hl, cl(G1.X(ttop), B1.l + 12 + hw / 2, B1.r - 12 - hw / 2), Y(ytop) - 22, C('position'), { size: 20, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, 'y₀ = 0', SX + 22, Y(0) - 20, C('position'), { size: 20, weight: 600 });
    line(ctx, SX + 10, Y(0), B1.l, Y(0), C('position'), 2, [8, 8]);
    curve(ctx, pos, 0, TMAX, G1.X, G1.Y, C('position'), 5);
    line(ctx, G2.X(0), G2.Y(v0.v), G2.X(TMAX), G2.Y(vel(TMAX)), C('velocity'), 5);
    line(ctx, G3.X(0), G3.Y(-G), G3.X(TMAX), G3.Y(-G), C('acceleration'), 5);
    text(ctx, 'slope −' + fmt(G, 2) + ' m/s²', B2.r - 8, B2.t + 22, C('acceleration'), { size: 20, weight: 600, align: 'right', bg: PAL.panel });
    dot(ctx, G2.X(ttop), G2.Y(0), C('velocity'), false, 8);
    text(ctx, 'v = 0 at ' + fmt(ttop, 2) + ' s', B2.l + 12, B2.b - 24, C('velocity'), { size: 20, weight: 600, bg: PAL.panel });
    text(ctx, 'a = −' + fmt(G, 2) + ' m/s² throughout', B3.l + 12, B3.t + 60, C('acceleration'), { size: 20, weight: 600, bg: PAL.panel });
    /* the times of Table 2.1 */
    hits = [];
    [1, 2, 3].forEach((k) => {
      dot(ctx, G1.X(k), G1.Y(pos(k)), C('position'), false, 7); dot(ctx, G2.X(k), G2.Y(vel(k)), C('velocity'), false, 7);
      hits.push({ x: G1.X(k), y: G1.Y(pos(k)), r: 13, name: 'at ' + fmt(k, 2) + ' s, y = ' + signed(pos(k), 2) + ' m' }, { x: G2.X(k), y: G2.Y(vel(k)), r: 13, name: 'at ' + fmt(k, 2) + ' s, v = ' + signed(vel(k), 2) + ' m/s' });
    });
    /* now: the rock, its height carried across to the curve, and the two arrows */
    line(ctx, RX + 12, Y(y), G1.X(tau), Y(y), C('position'), 2.5, [5, 7]);
    [[G1, y, B1], [G2, v, B2], [G3, -G, B3]].forEach(([Gk, val, b]) => { line(ctx, Gk.X(tau), b.b, Gk.X(tau), Gk.Y(val), C('time'), 2, [4, 8]); dot(ctx, Gk.X(tau), Gk.Y(val), PAL.ink, true, 9); });
    const vx = RX + 30, ax = RX + 72, vL = v * 4.4, aL = G * 6;
    if (Math.abs(v) > 0.25) arrow(ctx, vx, Y(y), vx, Y(y) - vL, C('velocity'), 5);
    text(ctx, 'v', vx, Math.abs(v) > 0.25 ? Y(y) - vL - Math.sign(v) * 18 : Y(y) - 18, C('velocity'), { size: 22, weight: 600, align: 'center', italic: true });
    arrow(ctx, ax, Y(y), ax, Y(y) + aL, C('acceleration'), 5);
    text(ctx, 'a', ax + 20, Y(y) + aL / 2, C('acceleration'), { size: 22, weight: 600, align: 'center', italic: true });
    dot(ctx, RX, Y(y), F.ref('rock'), true, 11);
    hits.push({ x: RX, y: Y(y), r: 16, name: 'the rock' }, { x: PX, y: ground - 34, r: 36, name: 'the thrower' }, { x: 200, y: ground + 120, r: 90, name: 'the cliff' },
      { x: vx, y: Y(y) - vL / 2, r: 22, name: 'velocity, ' + signed(v, 2) + ' m/s' }, { x: ax, y: Y(y) + aL / 2, r: 22, name: 'acceleration, −' + fmt(G, 2) + ' m/s²' });
    topline(ctx, Math.abs(tau - ttop) < 0.02
      ? 'At ' + fmt(ttop, 2) + ' s the rock is at its highest point, ' + fmt(ytop, 2) + ' m. Its velocity is zero and its acceleration is still −' + fmt(G, 2) + ' m/s².'
      : 'After ' + fmt(tau, 2) + ' s the rock is ' + (Math.abs(y) < 0.005 ? 'level with' : fmt(Math.abs(y), 2) + ' m ' + (y > 0 ? 'above' : 'below')) + ' its starting point and ' + (v > 0 ? 'still rising' : 'moving down') + ' at ' + fmt(Math.abs(v), 2) + ' m/s.');
    readout(d.readout, `\\begin{aligned} \\ky &= \\kyo + \\kvo\\kt - \\tfrac{1}{2}\\kg\\kt^2 = 0 + (${fmt(v0.v, 1)}\\ \\text{m/s})(${fmt(tau, 2)}\\ \\text{s}) - \\tfrac{1}{2}(${fmt(G, 2)}\\ \\text{m/s}^2)(${fmt(tau, 2)}\\ \\text{s})^2 = ${stex(y, 2)}\\ \\text{m} \\\\ \\kv &= \\kvo - \\kg\\kt = ${fmt(v0.v, 1)}\\ \\text{m/s} - (${fmt(G, 2)}\\ \\text{m/s}^2)(${fmt(tau, 2)}\\ \\text{s}) = ${stex(v, 2)}\\ \\text{m/s} \\end{aligned}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => TMAX / 6), draw });
})();

/* =====================================================================
   FIGURE 2.40 + 2.41: a rock thrown up and a rock thrown down with the
   same speed. The second rock is thrown down at the instant the first
   comes back past the hand, so the two fall side by side; beside them v
   against y, the one curve v² = v0² − 2g(y − y0) on the scene's height
   scale. Finite flight, so it gets the scrubber.
===================================================================== */
(function () {
  const H = 820;
  const d = sim('sim-rock-down', H);
  const v0 = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 8, max: 15, step: 0.1, value: 13, unit: 'm/s', dec: 1, onInput: reset, aria: 'initial speed', detents: [{ v: 13, label: 'Example 2.15' }], snap: true });
  const yE = ctl(d.controls, { label: '\\ky', cls: 'position', min: -10, max: -1, step: 0.1, value: -5.1, unit: 'm', dec: 2, onInput: reset, aria: 'level reached' });
  const vmax = () => Math.sqrt(v0.v * v0.v - 2 * G * yE.v);
  const t0 = () => (2 * v0.v) / G, tA = () => (v0.v + vmax()) / G;
  const cy = cycle(tA, 1.8);
  function reset() { cy.reset(); }
  /* fixed scales: height −12 to 12 m, shared by the scene and the graph; velocity −24 to 24 m/s */
  const YLO = -12, YHI = 12, VM = 24, sTop = 150, sBot = 710, SX = 92, xa = 330, xb = 392, PS = 0.45, K = 4;
  const Y = (m) => sBot - ((sBot - sTop) * (cl(m, YLO, YHI) - YLO)) / (YHI - YLO);
  const HAND = { x: 54, y: -112 }, ground = Y(0) - HAND.y * PS, PX = xa - 14 - HAND.x * PS, EDGE = xa - 26;
  const box = { l: 660, r: 1340, t: sTop, b: sBot };
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), ta = tA(), tr = t0(), vm = vmax(), ytop = (v0.v * v0.v) / (2 * G), both = tau >= tr - 1e-9, done = tau >= ta - 1e-9;
    const yA = v0.v * tau - 0.5 * G * tau * tau, vA = v0.v - G * tau;
    const sB = Math.max(0, tau - tr), yB = -v0.v * sB - 0.5 * G * sB * sB, vB = -v0.v - G * sB;
    const ys = fmt(yE.v, 2), vs = signed(-vm, 1);
    hits = [];
    vscale(ctx, SX, Y, YLO, YHI, 4, 0);
    text(ctx, 'y (m)', SX - 40, sTop - 30, C('position'), { size: 20, weight: 600 });
    cliff(ctx, 112, EDGE, ground, H - 14);
    F.silhouette(ctx, { x: PX, y: ground, s: PS, face: 1, pose: 'stand', color: F.ref('thrower'), hands: [HAND, { x: -6, y: -76 }], elbowSide: 1 });
    const A = axes(ctx, box, [-VM, VM], [YLO, YHI], { xl: 'v (m/s)', xc: C('velocity'), nx: 6, ny: 6, fy: () => '' });
    text(ctx, 'v at each height', box.l + 8, box.t - 24, C('velocity'), { size: 20, weight: 600 });
    /* the two levels, across the scene and the graph */
    line(ctx, SX + 10, Y(0), box.l, Y(0), C('position'), 2, [8, 8]); text(ctx, 'y₀ = 0', SX + 22, Y(0) - 20, C('position'), { size: 20, weight: 600 });
    line(ctx, EDGE + 4, Y(yE.v), box.r, Y(yE.v), C('position'), 2, [8, 8]);
    text(ctx, 'y = ' + ys + ' m', box.r - 10, Y(yE.v) - 20, C('position'), { size: 20, weight: 600, align: 'right', bg: PAL.panel });
    line(ctx, xa, Y(YHI), xa, Y(YLO), PAL.rule, 1.5); line(ctx, xb, Y(YHI), xb, Y(YLO), PAL.rule, 1.5);
    text(ctx, 'thrown up', xa + 14, sTop - 30, F.ref('rock'), { size: 20, weight: 600, align: 'right' }); text(ctx, 'thrown down', xb - 14, sTop - 30, F.ref('rock-down'), { size: 20, weight: 600 });
    /* the marks the rock thrown up leaves each second, with its velocity at each */
    for (let k = 0; k <= Math.floor(tau + 1e-9); k += 1) {
      const yk = v0.v * k - 0.5 * G * k * k, vk = v0.v - G * k;
      dot(ctx, xa, Y(yk), F.ref('rock'), false, 7);
      if (Math.abs(vk) > 0.3) arrow(ctx, xa - 22, Y(yk), xa - 22, Y(yk) - vk * K, alpha(C('velocity'), 0.55), 3);
      hits.push({ x: xa, y: Y(yk), r: 13, name: 'at ' + fmt(k, 2) + ' s, y = ' + signed(yk, 2) + ' m and v = ' + signed(vk, 1) + ' m/s' });
    }
    /* the graph: the one curve both rocks follow, from +v₀ over the top and down to the level */
    ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t); ctx.clip();
    curve(ctx, (v) => (v0.v * v0.v - v * v) / (2 * G), -vm, v0.v, A.X, A.Y, C('position'), 5, 160);
    ctx.restore();
    dot(ctx, A.X(v0.v), Y(0), F.ref('rock'), false, 9); dot(ctx, A.X(-v0.v), Y(0), F.ref('rock-down'), false, 9);
    text(ctx, '+' + fmt(v0.v, 1) + ' m/s', A.X(v0.v) + 14, Y(0) - 22, C('velocity'), { size: 20, weight: 600 });
    text(ctx, '−' + fmt(v0.v, 1) + ' m/s', A.X(-v0.v) - 14, Y(0) - 22, C('velocity'), { size: 20, weight: 600, align: 'right', bg: PAL.panel });
    dot(ctx, A.X(-vm), Y(yE.v), C('velocity'), false, 9);
    text(ctx, vs + ' m/s', A.X(-vm) + 16, Y(yE.v) + 24, C('velocity'), { size: 20, weight: 600, bg: PAL.panel });
    /* now */
    if (both) { line(ctx, xa + 12, Y(yA), A.X(vA), Y(yA), C('position'), 2.5, [5, 7]); dot(ctx, A.X(vB), Y(yB), F.ref('rock-down'), false, 15); }
    else line(ctx, xb + 12, Y(yA), A.X(vA), Y(yA), C('position'), 2.5, [5, 7]);
    dot(ctx, A.X(vA), Y(yA), F.ref('rock'), true, 9);
    if (Math.abs(vA) > 0.25) arrow(ctx, xa + 22, Y(yA), xa + 22, Y(yA) - vA * K, C('velocity'), 5);
    dot(ctx, xa, Y(yA), F.ref('rock'), true, 11); dot(ctx, xb, Y(yB), F.ref('rock-down'), both, 11);
    if (both) arrow(ctx, xb + 22, Y(yB), xb + 22, Y(yB) - vB * K, C('velocity'), 5);
    text(ctx, (both ? 'both ' : '') + signed(vA, 1) + ' m/s', xb + 40, Y(yA) - (vA * K) / 2, C('velocity'), { size: 20, weight: 600, bg: PAL.panel });
    hits.push({ x: xa, y: Y(yA), r: 15, name: 'the rock thrown up' }, { x: xb, y: Y(yB), r: 15, name: both ? 'the rock thrown down' : 'the second rock, held until the first comes back past the hand' }, { x: PX, y: ground - 34, r: 36, name: 'the thrower' }, { x: 200, y: ground + 120, r: 90, name: 'the cliff' });
    topline(ctx, done ? 'At y = ' + ys + ' m both rocks move at ' + vs + ' m/s, whichever way they were thrown.'
      : both ? 'The first rock came back past y₀ at −' + fmt(v0.v, 1) + ' m/s, the velocity the second is thrown down with, so they fall side by side.'
      : 'After ' + fmt(tau, 2) + ' s the rock thrown up at +' + fmt(v0.v, 1) + ' m/s is at ' + signed(yA, 2) + ' m and ' + (vA > 0 ? 'still rising.' : 'on its way back down.'));
    const v2 = v0.v * v0.v - 2 * G * yE.v;
    readout(d.readout, `\\begin{aligned} \\kv^2 &= \\kvo^2 - 2\\kg(\\ky - \\kyo) = (\\pm${fmt(v0.v, 1)}\\ \\text{m/s})^2 - 2(${fmt(G, 2)}\\ \\text{m/s}^2)(${stex(yE.v, 2)}\\ \\text{m} - 0) = ${fmt(v2, 1)}\\ \\text{m}^2\\text{/s}^2 \\\\ \\kv &= -\\sqrt{${fmt(v2, 1)}\\ \\text{m}^2\\text{/s}^2} = ${stex(-vm, 1)}\\ \\text{m/s} \\end{aligned}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => tA() / 6), draw });
})();

/* =====================================================================
   FIGURE 2.42 + 2.43: finding g from a falling ball. The ball leaves the
   hand and is marked every 0.1 s as in the book's strobe picture, its
   readings beside each mark and its position graph on the same height
   scale. Under them, the g that the measured distance and time give, on
   a scale that carries the range found on Earth. Finite drop, so it gets
   the scrubber.
===================================================================== */
(function () {
  const H = 850;
  const d = sim('sim-drop', H);
  /* both measurements move in their last figures, since that is where g is decided; each range is
     offset so that the example's value sits on the step grid */
  const yF = ctl(d.controls, { label: '\\ky', cls: 'position', min: -1.01, max: -0.99, step: 0.0001, value: -1, unit: 'm', dec: 4, onInput: reset, aria: 'position at the end of the fall', detents: [{ v: -1, label: 'Example 2.16' }], snap: true });
  const tF = ctl(d.controls, { label: '\\kt', cls: 'time', min: 0.44173, max: 0.46173, step: 0.0001, value: 0.45173, unit: 's', dec: 5, onInput: reset, aria: 'time of the fall', detents: [{ v: 0.45173, label: 'Example 2.16' }], snap: true,
    specials: [{ at: () => Math.sqrt((-2 * yF.v) / 9.83), label: 'g = 9.83' }, { at: () => Math.sqrt((-2 * yF.v) / 9.78), label: 'g = 9.78' }] });
  const cy = cycle(() => tF.v, 1.8);
  function reset() { cy.reset(); }
  const YLO = -1.2, TMAX = 0.5, sTop = 160, sBot = 640, SX = 112, bx = 235, KV = 12;
  const Y = (m) => sBot - ((sBot - sTop) * (cl(m, YLO, 0) - YLO)) / -YLO;
  const box = { l: 730, r: 1340, t: sTop, b: sBot }, cols = [372, 478, 596];
  const GL = 9.3, GH = 10.3, gy = 782, GX = (g) => 112 + ((cl(g, GL, GH) - GL) / (GH - GL)) * (1340 - 112);
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), a = (2 * yF.v) / (tF.v * tF.v), gg = -a, done = tau >= tF.v - 1e-9;
    const pos = (s) => 0.5 * a * s * s, vel = (s) => a * s, y = pos(tau), v = vel(tau);
    hits = [];
    vscale(ctx, SX, Y, YLO, 0, 0.2, 1);
    text(ctx, 'y (m)', SX - 40, sTop - 64, C('position'), { size: 20, weight: 600 });
    line(ctx, bx - 60, Y(0) - 15, bx + 60, Y(0) - 15, PAL.ink, 5);
    line(ctx, bx, Y(0), bx, Y(YLO), PAL.rule, 1.5);
    const A = axes(ctx, box, [0, TMAX], [YLO, 0], { xl: 't (s)', xc: C('time'), nx: 5, ny: 6, fy: () => '' });
    text(ctx, 'y against t', box.l + 8, box.t - 24, C('position'), { size: 20, weight: 600 });
    /* where the fall is timed to */
    line(ctx, bx - 46, Y(yF.v), bx + 46, Y(yF.v), C('position'), 4);
    /* the readings every 0.1 s, each on the level of its mark, as the book tabulates them */
    [['t (s)', 'time'], ['y (m)', 'position'], ['v (m/s)', 'velocity']].forEach(([s, k], i) => text(ctx, s, cols[i], sTop - 64, C(k), { size: 20, weight: 600, align: 'center' }));
    const rows = [0, 0.1, 0.2, 0.3, 0.4].filter((t) => t < tF.v - 0.02).map((t) => ({ t, ry: Y(pos(t)) + (t === 0 ? -16 : t === 0.1 ? 12 : 0), td: 1, yd: 3 }));
    rows.push({ t: tF.v, ry: Y(yF.v), td: 5, yd: 4, end: true });
    ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t); ctx.clip();
    curve(ctx, pos, 0, tF.v, A.X, A.Y, C('position'), 5);
    ctx.restore();
    rows.forEach((r) => {
      if (tau < r.t - 1e-9) return;
      const yk = pos(r.t), vk = vel(r.t), w = r.end ? 600 : 400;
      if (r.t > 0) { line(ctx, cols[2] + 52, Y(yk), A.X(r.t), Y(yk), alpha(C('position'), 0.45), 1.5, [4, 7]); if (!r.end) dot(ctx, bx, Y(yk), F.ref('ball'), false, 11); arrow(ctx, bx + 30, Y(yk), bx + 30, Y(yk) - vk * KV, alpha(C('velocity'), r.end ? 1 : 0.6), r.end ? 5 : 3); }
      dot(ctx, A.X(r.t), Y(yk), C('position'), !!r.end, r.end ? 9 : 7);
      text(ctx, fmt(r.t, r.td), cols[0], r.ry, C('time'), { size: 20, align: 'center', weight: w });
      text(ctx, r.t === 0 ? '0' : fmt(yk, r.yd), cols[1], r.ry, C('position'), { size: 20, align: 'center', weight: w });
      text(ctx, r.t === 0 ? '0' : fmt(vk, 2), cols[2], r.ry, C('velocity'), { size: 20, align: 'center', weight: w });
      hits.push({ x: A.X(r.t), y: Y(yk), r: 13, name: 'at ' + fmt(r.t, r.td) + ' s, y = ' + fmt(yk, r.yd) + ' m' });
    });
    if (!done) { line(ctx, bx + 14, Y(y), A.X(tau), Y(y), C('position'), 2.5, [5, 7]); dot(ctx, A.X(tau), Y(y), PAL.ink, true, 9); if (-v > 0.2) arrow(ctx, bx + 30, Y(y), bx + 30, Y(y) - v * KV, C('velocity'), 5); }
    dot(ctx, bx, Y(y), F.ref('ball'), true, 12);
    hits.push({ x: bx, y: Y(y), r: 16, name: 'the ball' }, { x: bx - 40, y: Y(0) - 15, r: 14, name: 'the ball is let go from rest here' }, { x: bx, y: Y(yF.v), r: 14, name: 'the level the fall is timed to' });
    /* the g these two measurements give, against the range found on Earth */
    line(ctx, GX(GL), gy, GX(GH), gy, PAL.muted, 2);
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.16); ctx.fillRect(GX(9.78), gy - 14, GX(9.83) - GX(9.78), 28); ctx.restore();
    for (let k = 0; k <= 10; k++) { const gv = GL + k * 0.1; line(ctx, GX(gv), gy - 8, GX(gv), gy + 8, PAL.muted, 2); if (k % 2 === 1 && k !== 5) text(ctx, fmt(gv, 1), GX(gv), gy + 30, PAL.muted, { size: 17, align: 'center' }); }
    text(ctx, 'on Earth, 9.78 to 9.83', GX(9.805), gy + 30, PAL.ink, { size: 18, align: 'center' });
    text(ctx, 'g (m/s²)', 112, gy - 40, C('acceleration'), { size: 20, weight: 600 });
    const px = GX(gg), out = gg < GL || gg > GH;
    ctx.save(); ctx.fillStyle = out ? PAL.panel : C('acceleration'); ctx.strokeStyle = C('acceleration'); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, gy - 3); ctx.lineTo(px - 11, gy - 24); ctx.lineTo(px + 11, gy - 24); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    const gl = 'g = ' + fmt(gg, 4) + ' m/s²', gw = F.measure(ctx, gl, { size: 22, weight: 600 });
    text(ctx, gl, cl(px, 330 + gw / 2, 1340 - gw / 2), gy - 44, C('acceleration'), { size: 22, weight: 600, align: 'center' });
    const where = gg > 9.83 ? ', more than anywhere on Earth' : gg < 9.78 ? ', less than anywhere on Earth' : '';
    topline(ctx, done ? 'A fall of ' + fmt(-yF.v, 4) + ' m in ' + fmt(tF.v, 5) + ' s gives g = ' + fmt(gg, 4) + ' m/s²' + where + '.'
      : 'After ' + fmt(tau, 2) + ' s the ball has fallen ' + fmt(-y, 3) + ' m and is moving at ' + fmt(v, 2) + ' m/s.');
    readout(d.readout, `\\ka = \\dfrac{2(\\ky - \\kyo)}{\\kt^2} = \\dfrac{2(${stex(yF.v, 4)}\\ \\text{m} - 0)}{(${fmt(tF.v, 5)}\\ \\text{s})^2} = ${stex(a, 4)}\\ \\text{m/s}^2`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => tF.v / 5), draw });
})();

/* =====================================================================
   SIM: the depth of a mine shaft. The reader sets what is measured, the
   time from letting the rock go to hearing it land; the rock falls, the
   sound climbs back, and beside the shaft the height of each against
   time on the shaft's own scale. The parabola carried on to the whole
   time shows the depth that forgetting the sound would give. Finite round
   trip, so it gets the scrubber.
===================================================================== */
(function () {
  const H = 790;
  const d = sim('sim-well', H);
  const Th = ctl(d.controls, { label: '\\kt', cls: 'time', min: 1, max: 5, step: 0.1, value: 3, unit: 's', dec: 1, onInput: reset, aria: 'time until the sound is heard' });
  const VS = 340;
  /* the depth whose fall time and sound time add up to the time heard: √(2d/g) + d/v_s = t, solved for √d */
  const depth = () => { const k = Math.sqrt(2 / G), s = ((-k + Math.sqrt(k * k + (4 * Th.v) / VS)) * VS) / 2; return s * s; };
  const cy = cycle(() => Th.v, 1.8);
  function reset() { cy.reset(); }
  /* fixed scales from the slider's maximum of 5 s: 125 m of depth, which holds ½g(5 s)² = 122.5 m */
  const DMAX = 125, TMAX = 5, box = { l: 660, r: 1340, t: 240, b: 700 }, wl = 345, wr = 405, sx = 375;
  const Y = (m) => box.b - ((box.b - box.t) * (m + DMAX)) / DMAX;
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    /* the fall time to the millisecond, and the depth that fall gives, so the readout is true as written */
    const tau = cy.now(), tf = Math.round(Math.sqrt((2 * depth()) / G) * 1000) / 1000, dd = 0.5 * G * tf * tf, ts = Th.v - tf, naive = 0.5 * G * Th.v * Th.v, done = tau >= Th.v - 1e-9;
    const falling = tau < tf, yRock = falling ? -0.5 * G * tau * tau : -dd, ySound = falling ? null : Math.min(0, -dd + VS * (tau - tf));
    const A = axes(ctx, box, [0, TMAX], [-DMAX, 0], { xl: 't (s)', xc: C('time'), yl: 'height (m)', yc: C('position'), nx: 5, ny: 5 });
    /* the ground, and the shaft cut into it down to the bottom */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(92, Y(0), 478, H - 14 - Y(0)); ctx.fillStyle = PAL.panel; ctx.fillRect(wl, Y(0) - 2, wr - wl, Y(-dd) - Y(0) + 2); ctx.restore();
    line(ctx, 92, Y(0), wl, Y(0), PAL.ink, 4); line(ctx, wr, Y(0), 570, Y(0), PAL.ink, 4);
    line(ctx, wl, Y(0), wl, Y(-dd), PAL.muted, 3); line(ctx, wr, Y(0), wr, Y(-dd), PAL.muted, 3); line(ctx, wl, Y(-dd), wr, Y(-dd), PAL.muted, 3);
    F.silhouette(ctx, { x: wl - 44, y: Y(0), s: 0.5, face: 1, pose: 'lean', color: F.ref('listener') });
    /* the depth, and the depth the whole time would give as fall time */
    vbracket(ctx, wl - 30, Y(0), Y(-dd), C('position'), undefined, -1);
    text(ctx, 'd = ' + fmt(dd, 1) + ' m', wl - 46, Math.max(Y(0) + 26, (Y(0) + Y(-dd)) / 2), C('position'), { size: 20, weight: 600, align: 'right', bg: PAL.panel });
    line(ctx, wl - 20, Y(-naive), 570, Y(-naive), C('position'), 2, [8, 8]);
    text(ctx, '½gt² = ' + fmt(naive, 1) + ' m', 560, Y(-naive) + 24, C('position'), { size: 20, weight: 600, align: 'right', bg: PAL.panel });
    /* the rock, and after it lands the sound on its way up */
    if (falling && tau > 0.05) arrow(ctx, sx + 24, Y(yRock), sx + 24, Y(yRock) + G * tau * 2.2, C('velocity'), 4);
    dot(ctx, sx, Math.min(Y(yRock), Y(-dd) - 10), F.ref('shaft-rock'), true, 9);
    if (ySound !== null && !done) {
      ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
      for (let k = 0; k < 3; k++) { ctx.globalAlpha = 1 - k * 0.3; ctx.beginPath(); ctx.arc(sx, Y(ySound) + 34 + k * 13, 34, Math.PI * 1.25, Math.PI * 1.75); ctx.stroke(); }
      ctx.restore();
      text(ctx, 'sound, ' + fmt(VS, 0) + ' m/s', wr + 14, Y(ySound) + 16, PAL.ink, { size: 20, bg: PAL.panel });
      hits.push({ x: sx, y: Y(ySound) + 10, r: 30, name: 'the sound of the landing, climbing at ' + fmt(VS, 0) + ' m/s' });
    }
    /* the graph: the fall, the sound's climb, and the fall carried on to the time heard */
    curve(ctx, (s) => -0.5 * G * s * s, 0, tf, A.X, A.Y, C('position'), 5);
    ctx.save(); ctx.setLineDash([3, 9]); curve(ctx, (s) => -0.5 * G * s * s, tf, Th.v, A.X, A.Y, alpha(C('position'), 0.7), 3); ctx.restore();
    line(ctx, A.X(tf), Y(-dd), A.X(Th.v), Y(0), PAL.ink, 4, [10, 8]);
    line(ctx, box.l, Y(-dd), A.X(tf), Y(-dd), C('position'), 2, [8, 8]);
    dot(ctx, A.X(Th.v), Y(-naive), C('position'), false, 8);
    const nl = '½gt² = ' + fmt(naive, 1) + ' m';
    const tight = A.X(Th.v) < box.l + 340;
    text(ctx, nl, A.X(Th.v) + (tight ? 16 : -16), Y(-naive) + (!tight && naive - dd < 9 ? 26 : 2), C('position'), { size: 20, weight: 600, align: tight ? 'left' : 'right', bg: PAL.panel });
    text(ctx, 'd = ' + fmt(dd, 1) + ' m', box.l + 12, Y(-dd) + 24, C('position'), { size: 20, weight: 600, bg: PAL.panel });
    /* the two legs of the time, above the graph */
    const by = 172;
    hbracket(ctx, A.X(0), A.X(tf), by, C('time'), 'fall, ' + fmt(tf, 2) + ' s');
    hbracket(ctx, A.X(tf), A.X(Th.v), by, PAL.ink);
    const sl = 'sound, ' + fmt(ts, 2) + ' s', sw = F.measure(ctx, sl, { size: 22, weight: 600 });
    text(ctx, sl, Math.min(A.X(Th.v) + 14, 1386 - sw), A.X(Th.v) + 14 + sw > 1386 ? by + 26 : by, PAL.ink, { size: 22, weight: 600 });
    line(ctx, A.X(tf), by + 10, A.X(tf), Y(-dd), PAL.muted, 2, [4, 8]);
    dot(ctx, A.X(tau), Y(falling ? yRock : ySound), PAL.ink, true, 9);
    hits.push({ x: sx, y: Y(yRock), r: 15, name: 'the rock' }, { x: wl - 30, y: Y(0) - 36, r: 40, name: 'the listener' }, { x: A.X(Th.v), y: Y(-naive), r: 14, name: 'where the rock would be if it had fallen the whole ' + fmt(Th.v, 1) + ' s' });
    topline(ctx, done ? 'The rock is heard ' + fmt(Th.v, 2) + ' s after it is let go: ' + fmt(tf, 2) + ' s of fall and ' + fmt(ts, 2) + ' s for the sound to climb ' + fmt(dd, 1) + ' m.'
      : falling ? 'After ' + fmt(tau, 2) + ' s the rock is still falling, ' + fmt(dd + yRock, 1) + ' m above the bottom.'
      : 'The rock landed at ' + fmt(tf, 2) + ' s. Its sound is on the way up, ' + fmt(-ySound, 1) + ' m below the listener.');
    readout(d.readout, `\\begin{aligned} d &= \\tfrac{1}{2}\\kg\\kt_{\\text{fall}}^2 = \\tfrac{1}{2}(${fmt(G, 2)}\\ \\text{m/s}^2)(${fmt(tf, 3)}\\ \\text{s})^2 = ${fmt(dd, 1)}\\ \\text{m} \\\\ \\kt_{\\text{sound}} &= \\frac{d}{\\kv_{\\text{s}}} = \\frac{${fmt(dd, 1)}\\ \\text{m}}{${fmt(VS, 0)}\\ \\text{m/s}} = ${fmt(ts, 2)}\\ \\text{s} \\end{aligned}`,
      'Taking the whole ' + fmt(Th.v, 1) + ' s as the fall gives $\\tfrac{1}{2}\\kg\\kt^2$ = ' + fmt(naive, 1) + ' m, which is ' + fmt(naive - dd, 1) + ' m too deep.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => Th.v / 5.5), draw });
})();
};
