/* Figures for section 2.8 Graphical Analysis of One-Dimensional Motion. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.8'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, dot, text, headline, axes, curve, labeller, drag, hover, rich } = F;
const sim = (id, H) => F.sim(root, id, H);
const neg = (s) => s.replace('-', '−');

/* a dashed drop line in the hue of the axis it drops to */
const drop = (ctx, x1, y1, x2, y2, color) => line(ctx, x1, y1, x2, y2, color, 3, [4, 8]);
/* draw inside a graph box only */
function clipped(ctx, box, f) { ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t); ctx.clip(); f(); ctx.restore(); }
/* The two ends of a tangent, kept on the part of the line that lies inside the graph: a slider left past the
   edge is brought back to it, so the rise and the run are always read between two points the reader can see.
   The line is y = yq + s (t − tq) with s ≥ 0; the box holds y from ylo to yhi; the ends step by 0.5. */
function onGraph(A, B, tq, yq, s, ylo, yhi, gap) {
  let lo = -Infinity, hi = Infinity;
  if (s > 1e-9) { lo = Math.ceil((tq + (ylo - yq) / s) * 2 - 1e-9) / 2; hi = Math.floor((tq + (yhi - yq) / s) * 2 + 1e-9) / 2; }
  const cl = (v) => Math.min(hi, Math.max(lo, v));
  let a = cl(A.v), b = cl(B.v);
  if (b - a < gap) { if (a + gap <= hi) b = a + gap; else a = b - gap; }
  if (Math.abs(a - A.v) > 1e-9) A.set(a);
  if (Math.abs(b - B.v) > 1e-9) B.set(b);
  return [a, b];
}

/* the rise and the run between the two ends of a tangent, each labelled where the triangle leaves room: the
   run under its line (above it at the right-hand corner when the line lies along the time axis), the rise to
   the right of its line (inside the corner when there is no room to the right, above the line when it is level) */
function riseRun(ctx, X, Y, box, p1, p2, runLabel, riseLabel, runColor, riseColor, rightLimit, flatRight) {
  const xa = X(p1[0]), xb = X(p2[0]), ya = Y(p1[1]), yb = Y(p2[1]);
  drop(ctx, xa, ya, xb, ya, runColor); drop(ctx, xb, ya, xb, yb, riseColor);
  const o = { weight: 600, bg: alpha(PAL.panel, 0.85) };
  const low = ya + 26 > box.b - 12, flat = ya - yb < 34;
  const right = xb + 16 + F.measure(ctx, riseLabel, { size: 22, weight: 600 }) <= rightLimit;
  if (flat && flatRight) text(ctx, riseLabel, xb + 18, yb - 26, riseColor, { ...o, align: 'left' });
  else if (flat) text(ctx, riseLabel, Math.min(xb, rightLimit - 10), yb - 26, riseColor, { ...o, align: 'right' });
  else if (right) text(ctx, riseLabel, xb + 16, (ya + yb) / 2, riseColor, { ...o, align: 'left' });
  else text(ctx, riseLabel, xb - 16, ya - (low ? 52 : 24), riseColor, { ...o, align: 'right' });
  if (low && flat) text(ctx, runLabel, (xa + xb) / 2, yb - 26, runColor, { ...o, align: 'center' });
  else if (low) text(ctx, runLabel, xb - 16, ya - 24, runColor, { ...o, align: 'right' });
  else text(ctx, runLabel, (xa + xb) / 2, ya + 26, runColor, { ...o, align: 'center' });
}

/* =====================================================================
   FIGURE 2.45: the jet car's position against time at constant velocity.
   A straight line with the intercept x₀ and the slope v̄ on sliders, and
   two points the reader drags along it; their rise over their run is the
   slope wherever they sit. Example 2.17's two points are the opening
   state. A still picture.
===================================================================== */
(function () {
  const d = sim('sim-jet-xt', 600);
  const x0 = ctl(d.controls, { label: '\\kxo', cls: 'position', min: 0, max: 800, step: 25, value: 400, unit: 'm', dec: 0, aria: 'initial position' });
  const vb = ctl(d.controls, { label: '\\kvb', cls: 'velocity', min: 0, max: 300, step: 5, value: 250, unit: 'm/s', dec: 0, aria: 'average velocity' });
  const t1 = ctl(d.controls, { label: '\\kt_{1}', cls: 'time', min: 0, max: 4, step: 0.1, value: 0.5, unit: 's', dec: 2, aria: 'time of the first point' });
  const t2 = ctl(d.controls, { label: '\\kt_{2}', cls: 'time', min: 4.5, max: 8, step: 0.1, value: 6.4, unit: 's', dec: 2, aria: 'time of the second point' });
  const pos = (t) => x0.v + vb.v * t;
  const P1 = drag(d, { x: t1, y: pos }), P2 = drag(d, { x: t2, y: pos });
  const box = { l: 170, r: 1230, t: 110, b: 510 };
  function draw() {
    const { ctx } = begin(d.c);
    const xa = pos(t1.v), xb = pos(t2.v), dx = xb - xa, dt = t2.v - t1.v;
    /* the x axis is fixed at 0 to 3200 m, the farthest the two sliders reach in 8 s (800 m + 300 m/s × 8 s),
       with the book's ticks every 800 m, so a faster car draws a steeper line */
    const ax = axes(ctx, box, [0, 8], [0, 3200], { xl: 't (s)', xc: C('time'), yl: 'x (m)', yc: C('position'), nx: 8, ny: 4, fx: (v) => fmt(v, 0), fy: (v) => fmt(v, 0) });
    const { X, Y } = ax;
    line(ctx, X(0), Y(pos(0)), X(8), Y(pos(8)), C('position'), 5);
    dot(ctx, X(0), Y(x0.v), C('position'), false, 10);
    const lab = labeller(ctx, 600);
    lab.block(box.l, box.b, box.r, box.b + 40); lab.block(box.l - 70, box.t - 30, box.l, box.b);
    /* the intercept's label is dropped when the first point sits on the intercept and already names it */
    if (t1.v > 0.3) lab.add('x₀ = ' + fmt(x0.v, 0) + ' m', X(0), Y(x0.v), 0.4, -1, C('position'), 22, 30);
    riseRun(ctx, X, Y, box, [t1.v, xa], [t2.v, xb], 'Δt = ' + fmt(dt, 2) + ' s', 'Δx = ' + fmt(dx, 0) + ' m', C('time'), C('position'), box.r + 150, true);
    drop(ctx, X(t1.v), Y(xa), X(t1.v), box.b, C('time')); drop(ctx, X(t2.v), Y(xb), X(t2.v), box.b, C('time'));
    P1.draw(ctx, ax, C('position')); P2.draw(ctx, ax, C('position'));
    const lowP = Y(xa) > box.b - 80;   /* near the time axis the first point is named above the line */
    lab.add('(' + fmt(t1.v, 2) + ' s, ' + fmt(xa, 0) + ' m)', X(t1.v), Y(xa), 0.6, lowP ? -1 : 1, PAL.ink, 20, 30);
    lab.add('(' + fmt(t2.v, 2) + ' s, ' + fmt(xb, 0) + ' m)', X(t2.v), Y(xb), -0.6, -1, PAL.ink, 20, 30);
    lab.flush();
    headline(ctx, vb.v > 0 ? 'Any two points on the line give the same slope: ' + fmt(dx, 0) + ' m ÷ ' + fmt(dt, 2) + ' s = ' + fmt(vb.v, 0) + ' m/s.'
      : 'A car at rest draws a level line: no rise over any run, so the slope is 0 m/s.');
    tex(d.readout, `\\kvb = \\frac{\\kdx}{\\kdt} = \\frac{${fmt(xb, 0)}\\ \\text{m} - ${fmt(xa, 0)}\\ \\text{m}}{${fmt(t2.v, 2)}\\ \\text{s} - ${fmt(t1.v, 2)}\\ \\text{s}} = ${fmt(vb.v, 0)}\\ \\text{m/s}`
      + ` \\\\ \\kx = \\kxo + \\kvb\\kt = ${fmt(x0.v, 0)}\\ \\text{m} + (${fmt(vb.v, 0)}\\ \\text{m/s})(${fmt(t2.v, 2)}\\ \\text{s}) = ${fmt(xb, 0)}\\ \\text{m}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 2.46: position, velocity and acceleration of the jet car under
   constant acceleration, on one time axis. As the clock runs a tangent
   slides along the position curve and its slope is plotted below as the
   velocity; every 5 s (the times of the book's markers) the tangent
   leaves a stub on the curve and a point on the velocity graph, with the
   book's P at 10 s and Q at 25 s named on both. The slope of the velocity
   line is plotted as the acceleration. Moving: one sweep of 30 s in about
   6 real seconds, then a hold.
===================================================================== */
(function () {
  const d = sim('sim-jet-graphs', 920);
  /* the ranges stop where the fixed axes do: 400 m + 20 m/s × 30 s + ½ × 6 m/s² × (30 s)² = 3700 m and
     20 m/s + 6 m/s² × 30 s = 200 m/s, so the book's case (2900 m, 165 m/s, 5.0 m/s²) fills most of each graph */
  const x0 = ctl(d.controls, { label: '\\kxo', cls: 'position', min: 0, max: 400, step: 10, value: 200, unit: 'm', dec: 0, onInput: reset, aria: 'initial position' });
  const v0 = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 0, max: 20, step: 1, value: 15, unit: 'm/s', dec: 0, onInput: reset, aria: 'initial velocity' });
  const a = ctl(d.controls, { label: '\\ka', cls: 'acceleration', min: 0, max: 6, step: 0.1, value: 5, unit: 'm/s²', dec: 1, onInput: reset, aria: 'acceleration' });
  const T = 30, MARKS = [0, 5, 10, 15, 20, 25, 30], NAME = { 10: 'P', 25: 'Q' };
  const cy = cycle(() => T, 1.4);
  function reset() { cy.reset(); }
  const pos = (t) => x0.v + v0.v * t + 0.5 * a.v * t * t, vel = (t) => v0.v + a.v * t;
  const L = 190, R = 1230, b1 = { l: L, r: R, t: 130, b: 440 }, b2 = { l: L, r: R, t: 510, b: 700 }, b3 = { l: L, r: R, t: 770, b: 860 };
  let hits = [];
  hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    /* the clock is read to the tenth of a second it is printed to, so every number on the page agrees */
    const tau = Math.round(cy.now() * 10) / 10, xt = pos(tau), vt = vel(tau), done = tau >= T - 1e-9;
    const none = () => '', whole = (v) => fmt(v, 0);
    const g1 = axes(ctx, b1, [0, 30], [0, 4000], { yl: 'x (m)', yc: C('position'), nx: 6, ny: 4, fx: none, fy: whole });
    const g2 = axes(ctx, b2, [0, 30], [0, 200], { yl: 'v (m/s)', yc: C('velocity'), nx: 6, ny: 4, fx: none, fy: whole });
    const g3 = axes(ctx, b3, [0, 30], [0, 6], { xl: 't (s)', xc: C('time'), yl: 'a (m/s²)', yc: C('acceleration'), nx: 6, ny: 3, fx: whole, fy: whole });
    hits = [];
    /* (a) the whole position curve; the tangents already taken, as stubs; the tangent now */
    curve(ctx, pos, 0, T, g1.X, g1.Y, C('position'), 5);
    const stub = (t, half, color, w) => clipped(ctx, b1, () => line(ctx, g1.X(t - half), g1.Y(pos(t) - half * vel(t)), g1.X(t + half), g1.Y(pos(t) + half * vel(t)), color, w));
    const taken = MARKS.filter((t) => t <= tau + 1e-9);
    for (const t of taken) {
      stub(t, 1.7, alpha(PAL.ink, 0.6), 3);
      const who = NAME[t] ? ' (' + NAME[t] + ')' : '';
      hits.push({ x: g1.X(t), y: g1.Y(pos(t)), r: 22, name: 'tangent at ' + t + ' s' + who + ', slope ' + fmt(vel(t), 0) + ' m/s' });
      hits.push({ x: g2.X(t), y: g2.Y(vel(t)), r: 22, name: 'velocity at ' + t + ' s' + who + ', ' + fmt(vel(t), 0) + ' m/s' });
    }
    stub(tau, 4, PAL.ink, 3);
    drop(ctx, g1.X(tau), b1.t, g1.X(tau), b3.b, C('time'));
    for (const t of taken) if (t > 0) dot(ctx, g1.X(t), g1.Y(pos(t)), C('position'), true, 6);
    dot(ctx, g1.X(0), g1.Y(x0.v), C('position'), false, 9);
    dot(ctx, g1.X(tau), g1.Y(xt), PAL.ink, true, 9);
    /* (b) the velocity line, drawn as far as the tangents have been taken */
    if (tau > 0) line(ctx, g2.X(0), g2.Y(v0.v), g2.X(tau), g2.Y(vt), C('velocity'), 5);
    for (const t of taken) if (t > 0) dot(ctx, g2.X(t), g2.Y(vel(t)), C('velocity'), true, 6);
    dot(ctx, g2.X(0), g2.Y(v0.v), C('velocity'), false, 9);
    dot(ctx, g2.X(tau), g2.Y(vt), C('velocity'), true, 9);
    /* (c) the acceleration, level, drawn as far as the velocity line has been plotted */
    if (tau > 0) line(ctx, g3.X(0), g3.Y(a.v), g3.X(tau), g3.Y(a.v), C('acceleration'), 5);
    dot(ctx, g3.X(tau), g3.Y(a.v), C('acceleration'), true, 9);
    hits.push({ x: g3.X(tau), y: g3.Y(a.v), r: 22, name: 'acceleration, ' + fmt(a.v, 1) + ' m/s²' });
    /* the book's P and Q, named on the curve and on the velocity line once their tangents are taken */
    for (const t of taken) if (NAME[t]) {
      text(ctx, NAME[t], g1.X(t) - 16, g1.Y(pos(t)) - 24, PAL.ink, { align: 'right', weight: 600, size: 24 });
      text(ctx, NAME[t], g2.X(t) - 14, g2.Y(vel(t)) - 24, PAL.ink, { align: 'right', weight: 600, size: 24 });
    }
    /* what each graph's slope is, with its value now, in the corner the graph leaves free */
    rich(ctx, ['slope of the tangent = ', [fmt(vt, 1) + ' m/s', C('velocity')]], b1.l + 28, b1.t + 30, { size: 22 });
    rich(ctx, ['v = ', [fmt(vt, 1) + ' m/s', C('velocity')]], b2.l + 28, b2.t + 26, { size: 22 });
    rich(ctx, ['slope of the line = ', [fmt(a.v, 1) + ' m/s²', C('acceleration')]], b2.l + 28, b2.t + 58, { size: 22 });
    rich(ctx, ['a = ', [fmt(a.v, 1) + ' m/s²', C('acceleration')]], b3.l + 28, g3.Y(a.v) + (a.v > 3 ? 26 : -26), { size: 22 });
    headline(ctx, a.v === 0 ? 'With no acceleration the position graph is a straight line: every tangent has the same slope, ' + fmt(v0.v, 0) + ' m/s.'
      : done ? 'The slopes of the tangents, plotted against time, are the velocity graph, and its slope is the acceleration.'
      : 'At ' + fmt(tau, 1) + ' s the tangent has slope ' + fmt(vt, 1) + ' m/s, which is the velocity plotted below it.');
    tex(d.readout, `\\kv = \\kvo + \\ka\\kt = ${fmt(v0.v, 0)}\\ \\text{m/s} + (${fmt(a.v, 1)}\\ \\text{m/s}^2)(${fmt(tau, 1)}\\ \\text{s}) = ${fmt(vt, 1)}\\ \\text{m/s}`
      + (tau >= 1 ? ` \\\\ \\ka = \\frac{\\kdv}{\\kdt} = \\frac{${fmt(vt, 1)}\\ \\text{m/s} - ${fmt(v0.v, 0)}\\ \\text{m/s}}{${fmt(tau, 1)}\\ \\text{s} - 0\\ \\text{s}} = ${fmt(a.v, 1)}\\ \\text{m/s}^2` : ''));
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T / 6), draw });
})();

/* =====================================================================
   FIGURE 2.48: the tangent at Q. The position curve of Example 2.18 with
   the book's table beside it. The reader drags Q along the curve and the
   two ends of its tangent along the tangent, and the slope is read
   between the ends. The table has a column for the velocity, which the
   example's text reads from it: a row is filled once Q has stood on it.
   The book's P stays marked at 10 s. A still picture.
===================================================================== */
(function () {
  const d = sim('sim-tangent', 640);
  const TABLE = [0, 5, 10, 15, 20, 25, 30];
  const tQ = ctl(d.controls, { label: '\\kt_{Q}', cls: 'time', min: 0, max: 30, step: 0.5, value: 25, unit: 's', dec: 1, detents: TABLE, aria: 'time of the point Q' });
  const t1 = ctl(d.controls, { label: '\\kt_{1}', cls: 'time', min: 0, max: 20, step: 0.5, value: 19, unit: 's', dec: 1, aria: 'time of the first end of the tangent' });
  const t2 = ctl(d.controls, { label: '\\kt_{2}', cls: 'time', min: 21, max: 35, step: 0.5, value: 32, unit: 's', dec: 1, aria: 'time of the second end of the tangent' });
  const pos = (t) => 200 + 15 * t + 2.5 * t * t, vel = (t) => 15 + 5 * t;
  const tan = (t) => pos(tQ.v) + vel(tQ.v) * (t - tQ.v);
  const PQ = drag(d, { x: tQ, y: pos }), E1 = drag(d, { x: t1, y: tan }), E2 = drag(d, { x: t2, y: tan });
  const box = { l: 160, r: 900, t: 110, b: 550 };
  const seen = new Set();
  function draw() {
    const { ctx } = begin(d.c);
    const xQ = pos(tQ.v), vQ = vel(tQ.v);
    /* 0 to 4000 m holds the tangent at 30 s out to 35 s (3725 m) */
    const [ta, tb] = onGraph(t1, t2, tQ.v, xQ, vQ, 0, 4000, 1);
    const x1 = tan(ta), x2 = tan(tb), dt = tb - ta, dx = x2 - x1;
    if (TABLE.includes(tQ.v)) seen.add(tQ.v);
    const ax = axes(ctx, box, [0, 35], [0, 4000], { xl: 't (s)', xc: C('time'), yl: 'x (m)', yc: C('position'), nx: 7, ny: 4, fx: (v) => fmt(v, 0), fy: (v) => fmt(v, 0) });
    const { X, Y } = ax;
    curve(ctx, pos, 0, 30, X, Y, C('position'), 5);
    for (const t of TABLE) dot(ctx, X(t), Y(pos(t)), C('position'), true, 5);
    /* the book's P, at 10 s */
    if (Math.abs(tQ.v - 10) > 2) text(ctx, 'P', X(10) - 14, Y(pos(10)) - 24, PAL.ink, { align: 'right', weight: 600, size: 24 });
    /* the tangent, drawn a little past its ends and through Q */
    const lo = Math.min(ta, tQ.v) - 1.2, hi = Math.max(tb, tQ.v) + 1.2;
    clipped(ctx, box, () => line(ctx, X(lo), Y(tan(lo)), X(hi), Y(tan(hi)), PAL.ink, 3));
    riseRun(ctx, X, Y, box, [ta, x1], [tb, x2], 'Δt = ' + fmt(dt, 1) + ' s', 'Δx = ' + fmt(dx, 0) + ' m', C('time'), C('position'), 1000);
    E1.draw(ctx, ax, PAL.ink); E2.draw(ctx, ax, PAL.ink);
    PQ.draw(ctx, ax, F.ref('point-q'));
    text(ctx, 'Q', X(tQ.v) - 18, Y(xQ) - 28, F.ref('point-q'), { align: 'right', weight: 600, size: 24 });
    rich(ctx, ['slope at Q = ', [fmt(vQ, 0) + ' m/s', C('velocity')]], box.l + 28, box.t + 30, { size: 22 });
    /* the book's table of positions, with the velocity each tangent gives; the row Q stands on is in ink */
    const c1 = 1090, c2 = 1230, c3 = 1370, ty = 150, rowH = 46;
    text(ctx, 't (s)', c1, ty, C('time'), { align: 'right', weight: 600, size: 20 });
    text(ctx, 'x (m)', c2, ty, C('position'), { align: 'right', weight: 600, size: 20 });
    text(ctx, 'v (m/s)', c3, ty, C('velocity'), { align: 'right', weight: 600, size: 20 });
    line(ctx, c1 - 70, ty + 22, c3 + 10, ty + 22, PAL.rule, 2); line(ctx, c1 + 24, ty - 16, c1 + 24, ty + 34 + rowH * TABLE.length, PAL.rule, 2);
    TABLE.forEach((t, i) => {
      const on = Math.abs(t - tQ.v) < 1e-9, y = ty + 54 + rowH * i, o = { align: 'right', weight: on ? 600 : 400, size: 20 };
      text(ctx, fmt(t, 0), c1, y, on ? PAL.ink : PAL.muted, o);
      text(ctx, fmt(pos(t), 0), c2, y, on ? PAL.ink : PAL.muted, o);
      text(ctx, seen.has(t) ? fmt(vel(t), 0) : '?', c3, y, seen.has(t) ? (on ? C('velocity') : PAL.muted) : alpha(PAL.muted, 0.6), o);
    });
    headline(ctx, 'The tangent at Q rises ' + fmt(dx, 0) + ' m in ' + fmt(dt, 1) + ' s, so the velocity at ' + fmt(tQ.v, 1) + ' s is ' + fmt(vQ, 0) + ' m/s.');
    tex(d.readout, `\\kv_{Q} = \\frac{\\kdx_{Q}}{\\kdt_{Q}} = \\frac{${fmt(x2, 0)}\\ \\text{m} - ${fmt(x1, 0)}\\ \\text{m}}{${fmt(tb, 1)}\\ \\text{s} - ${fmt(ta, 1)}\\ \\text{s}} = ${fmt(vQ, 0)}\\ \\text{m/s}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 2.49: the jet car reaching its top velocity. The velocity
   levels out at 250 m/s while the acceleration below falls to zero; a
   tangent at the chosen time is read between two ends, as in Example
   2.19. The acceleration runs in straight pieces through the points read
   off the book's graph (b), set so that the velocity passes through the
   book's 228 m/s at 20 s and the example's tangent, 210 m/s at 1.0 s and
   260 m/s at 51 s, exactly. A still picture.
===================================================================== */
(function () {
  const d = sim('sim-jet-top', 820);
  const tQ = ctl(d.controls, { label: '\\kt', cls: 'time', min: 0, max: 70, step: 0.5, value: 25, unit: 's', dec: 1, aria: 'time of the tangent' });
  const t1 = ctl(d.controls, { label: '\\kt_{1}', cls: 'time', min: 0, max: 40, step: 0.5, value: 1, unit: 's', dec: 1, aria: 'time of the first end of the tangent' });
  const t2 = ctl(d.controls, { label: '\\kt_{2}', cls: 'time', min: 10, max: 70, step: 0.5, value: 51, unit: 's', dec: 1, aria: 'time of the second end of the tangent' });
  const A = [[0, 5], [10, 3.1], [20, 1.4], [25, 1], [30, 0.8], [40, 0.5], [50, 0.3], [55, 0]];
  function acc(t) {
    if (t >= 55) return 0;
    for (let i = 0; i < A.length - 1; i++) { const [ta, aa] = A[i], [tb, ab] = A[i + 1]; if (t <= tb) return aa + ((ab - aa) * (t - ta)) / (tb - ta); }
    return 0;
  }
  function vel(t) {
    let v = 165;
    for (let i = 0; i < A.length - 1; i++) {
      const [ta, aa] = A[i], [tb, ab] = A[i + 1]; if (t <= ta) break;
      const s = Math.min(t, tb) - ta; v += aa * s + (0.5 * (ab - aa) * s * s) / (tb - ta);
    }
    return v;
  }
  const tan = (t) => vel(tQ.v) + acc(tQ.v) * (t - tQ.v);
  const PQ = drag(d, { x: tQ, y: vel }), E1 = drag(d, { x: t1, y: tan }), E2 = drag(d, { x: t2, y: tan });
  const L = 190, R = 1230, b1 = { l: L, r: R, t: 130, b: 500 }, b2 = { l: L, r: R, t: 570, b: 760 };
  const MARKS = [0, 10, 20, 30, 40, 50, 60, 70];
  function draw() {
    const { ctx } = begin(d.c);
    const vQ = vel(tQ.v), aQ = acc(tQ.v);
    /* 160 to 280 m/s: the book's 160 to 260 with one more step, so the example's tangent, which ends at 260 m/s, has room above it */
    const [ta, tb] = onGraph(t1, t2, tQ.v, vQ, aQ, 160, 280, 2);
    const v1 = tan(ta), v2 = tan(tb), dt = tb - ta, dv = v2 - v1;
    const g1 = axes(ctx, b1, [0, 70], [160, 280], { yl: 'v (m/s)', yc: C('velocity'), nx: 7, ny: 6, fx: () => '', fy: (v) => fmt(v, 0) });
    const g2 = axes(ctx, b2, [0, 70], [-1, 6], { xl: 't (s)', xc: C('time'), yl: 'a (m/s²)', yc: C('acceleration'), nx: 7, ny: 7, fx: (v) => fmt(v, 0), fy: (v) => fmt(v, 0) });
    /* (a) the velocity curve with the book's markers, and the tangent at the chosen time */
    curve(ctx, vel, 0, 70, g1.X, g1.Y, C('velocity'), 5, 140);
    for (const t of MARKS) dot(ctx, g1.X(t), g1.Y(vel(t)), C('velocity'), true, 5);
    const lo = Math.min(ta, tQ.v) - 2, hi = Math.max(tb, tQ.v) + 2;
    clipped(ctx, b1, () => line(ctx, g1.X(lo), g1.Y(tan(lo)), g1.X(hi), g1.Y(tan(hi)), PAL.ink, 3));
    riseRun(ctx, g1.X, g1.Y, b1, [ta, v1], [tb, v2], 'Δt = ' + fmt(dt, 1) + ' s', 'Δv = ' + fmt(dv, 0) + ' m/s', C('time'), C('velocity'), b1.r + 150);
    drop(ctx, g1.X(tQ.v), b1.t, g1.X(tQ.v), b2.b, C('time'));
    E1.draw(ctx, g1, PAL.ink); E2.draw(ctx, g1, PAL.ink);
    PQ.draw(ctx, g1, C('velocity'));
    rich(ctx, ['slope of the tangent = ', [fmt(aQ, 1) + ' m/s²', C('acceleration')]], g1.X(tQ.v) > b1.r - 420 ? g1.X(tQ.v) - 22 : b1.r - 24, b1.b - 30, { size: 22, align: 'right' });   /* clear of the drop line */
    /* (b) the acceleration with the book's markers, falling to zero at 55 s */
    curve(ctx, acc, 0, 70, g2.X, g2.Y, C('acceleration'), 5, 140);
    for (const t of MARKS) dot(ctx, g2.X(t), g2.Y(acc(t)), C('acceleration'), true, 5);
    dot(ctx, g2.X(tQ.v), g2.Y(aQ), C('acceleration'), true, 9);
    text(ctx, 'a = ' + fmt(aQ, 1) + ' m/s²', g2.X(tQ.v) + (tQ.v > 45 ? -20 : 20), g2.Y(aQ) - (tQ.v < 6 ? 4 : 28), C('acceleration'), { weight: 600, size: 22, align: tQ.v > 45 ? 'right' : 'left', bg: alpha(PAL.panel, 0.85) });
    headline(ctx, tQ.v >= 55 ? 'From 55 s on the velocity stays at 250 m/s: the tangent is level and the acceleration is zero.'
      : 'The tangent at ' + fmt(tQ.v, 1) + ' s rises ' + fmt(dv, 0) + ' m/s in ' + fmt(dt, 1) + ' s; that slope is the acceleration plotted below it.');
    tex(d.readout, `\\ka = \\frac{\\kdv}{\\kdt} = \\frac{${fmt(v2, 0)}\\ \\text{m/s} - ${fmt(v1, 0)}\\ \\text{m/s}}{${fmt(tb, 1)}\\ \\text{s} - ${fmt(ta, 1)}\\ \\text{s}} = ${fmt(aQ, 1)}\\ \\text{m/s}^2`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
