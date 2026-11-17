/* Figures for section 2.6 Problem-Solving Basics for One-Dimensional Kinematics. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.6'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, axes, person, topline, labeller, hover } = F;
const sim = (id, H) => F.sim(root, id, H);
const WORDS = ['', '', 'twice', 'three times', 'four times', 'five times', 'six times'];

/* =====================================================================
   SIM: the runner of Unreasonable Results. A person accelerates at a for
   t seconds. Above, the runner's velocity arrow is drawn to one scale
   with the arrow of what a person can run (10 m/s: the book's 89 mph is
   "about four times greater than a person can run"), so "four times" is
   a length the reader sees. Below, v = v0 + at is drawn up to the present
   moment on axes read in m/s on the left and, by the book's chain of
   factors, in mph on the right; the line passes 10 m/s at t = 10/a.
   Finite motion, one loop per set time, so it gets the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-runner', 670);
  const A = ctl(d.controls, { label: '\\ka', cls: 'acceleration', min: 0.1, max: 0.5, step: 0.05, value: 0.4, unit: 'm/s²', dec: 2, onInput: reset, aria: 'acceleration' });
  const T = ctl(d.controls, { label: '\\kt', cls: 'time', min: 10, max: 120, step: 5, value: 100, unit: 's', dec: 0, onInput: reset, aria: 'time' });
  const RUN = 10;                       /* about what a person can run, in m/s */
  const MPH = (3.28 / 5280) * 60 * 60;     /* the book's chain of factors from m/s to mph */
  const mphOf = (v) => String(Math.round(v * MPH));
  const cy = cycle(() => T.v, 1.2);
  function reset() { cy.reset(); }
  let stride = 0, hits = [];
  /* Fixed scales from the slider maxima: 0.50 m/s² for 120 s gives 60 m/s, so the velocity axis and
     the arrows both run 0 to 60 m/s; the time axis holds the slider's 120 s. Nothing rescales. */
  const TMAX = 120, VMAX = 60;
  const X0 = 250, PX = 16;              /* the arrows' tail, and canvas units per m/s: 60 m/s is 960 units */
  const box = { l: 120, r: 1250, t: 334, b: 594 };
  function draw() {
    const { ctx } = begin(d.c);
    const a = A.v, tEnd = T.v, tau = cy.now(), done = tau >= tEnd - 1e-9;
    const v = a * tau, vEnd = a * tEnd;
    /* the runner on the ground, the stride quickening with the speed */
    const gy = 268;
    line(ctx, 110, gy, 1290, gy, alpha(PAL.ink, 0.35), 2);
    if (!done && v > 0) stride += 0.25 + 0.3 * Math.min(1, v / RUN);
    person(ctx, 170, gy, F.ref('runner'), { face: 1, phase: done || v <= 0 ? 0 : stride, lean: 0.12, s: 1.35 });
    /* the two arrows from one tail, to one scale: the runner's velocity, and what a person can run */
    const yv = 162, yr = 222;
    if (v > 0.6) arrow(ctx, X0, yv, X0 + PX * v, yv, C('velocity'), 6);
    else dot(ctx, X0, yv, C('velocity'), true, 5);
    F.rich(ctx, ['the runner: ', ['v = ' + fmt(v, 1) + ' m/s', C('velocity')], ', about ' + mphOf(v) + ' mph'], X0, yv - 28, { size: 21, align: 'left' });
    arrow(ctx, X0, yr, X0 + PX * RUN, yr, PAL.ink, 4);
    text(ctx, 'about what a person can run: 10 m/s, 22 mph', X0 + PX * RUN + 16, yr, PAL.muted, { size: 19, align: 'left' });
    hits = [{ x: 170, y: gy - 70, r: 65, name: 'the runner' }, { x: X0 + (PX * v) / 2, y: yv, r: 22, name: 'the runner’s velocity' }, { x: X0 + (PX * RUN) / 2, y: yr, r: 22, name: 'about what a person can run' }];
    /* the graph of v against t, read in mph down the right side */
    const { X: GX, Y: GY } = axes(ctx, box, [0, TMAX], [0, VMAX], { xl: 't (s)', xc: C('time'), yl: 'v (m/s)', yc: C('velocity'), nx: 6, ny: 6 });
    for (let vv = 0; vv <= VMAX; vv += 10) text(ctx, mphOf(vv), box.r + 14, GY(vv), PAL.muted, { size: 17, align: 'left' });
    text(ctx, 'mph', box.r + 14, box.t - 30, PAL.muted, { size: 17, align: 'left' });
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(box.l, box.t, box.r - box.l, GY(RUN) - box.t); ctx.restore();
    line(ctx, box.l, GY(RUN), box.r, GY(RUN), PAL.ink, 3, [10, 10]);
    text(ctx, 'faster than a person can run', box.l + 14, box.t + 22, PAL.muted, { size: 18, align: 'left' });
    /* the whole planned run dashed, the part run so far solid */
    line(ctx, GX(0), GY(0), GX(tEnd), GY(vEnd), C('velocity'), 3, [4, 8]);
    if (tau > 0) line(ctx, GX(0), GY(0), GX(tau), GY(v), C('velocity'), 5);
    /* where the line passes the level: a hollow mark, dropped to the time axis */
    const tc = RUN / a, crosses = tc < tEnd - 1e-9;
    const lab = labeller(ctx, 670);
    lab.block(box.l, box.b, box.r, box.b + 40);
    lab.block(box.l, box.t, box.l + 300, box.t + 40);
    if (crosses) {
      line(ctx, GX(tc), GY(RUN), GX(tc), box.b, alpha(PAL.ink, 0.4), 2, [4, 8]);
      dot(ctx, GX(tc), GY(RUN), C('velocity'), false, 10);
      lab.block(GX(tc) + 8, GY(RUN) + 8, GX(tc) + 250, GY(RUN) + 40);
      hits.push({ x: GX(tc), y: GY(RUN), r: 18, name: 'the velocity passes 10 m/s' });
    }
    lab.block(box.l, GY(RUN) - 6, box.r, GY(RUN) + 6);
    line(ctx, GX(tau), GY(v), GX(tau), box.b, C('time'), 2, [4, 8]);
    if (crosses) text(ctx, 'reasonable until t = ' + fmt(tc, 0) + ' s', GX(tc) + 16, GY(RUN) + 24, C('time'), { size: 18, weight: 600, align: 'left', bg: PAL.panel });
    dot(ctx, GX(tau), GY(v), C('velocity'), true, 9);
    lab.add('t = ' + fmt(tau, 0) + ' s', GX(tau), GY(v), GX(tau) + 130 > box.r ? -0.6 : 0.6, -1, C('time'), 20, 24);
    lab.flush();
    /* what the numbers say */
    const ratio = v / RUN, n = Math.round(ratio);
    const verdict = ratio >= 1.75 ? 'about ' + (WORDS[n] ?? n + ' times') + ' what a person can run' : ratio > 1.05 ? 'faster than a person can run' : 'a speed a person can run';
    topline(ctx, 'Gaining ' + fmt(a, 2) + ' m/s each second, the runner ' + (v > RUN * 1.05 ? 'would be' : 'is') + ' at ' + fmt(v, 1) + ' m/s after ' + fmt(tau, 0) + ' s, ' + verdict + '.');
    tex(d.readout, `\\kv = \\kvo + \\ka\\kt = 0 + (${fmt(a, 2)}\\ \\text{m/s}^2)(${fmt(tEnd, 0)}\\ \\text{s}) = ${fmt(vEnd, 1)}\\ \\text{m/s} \\\\ (${fmt(vEnd, 1)}\\ \\text{m/s})\\left(\\frac{3.28\\ \\text{ft}}{\\text{m}}\\right)\\left(\\frac{1\\ \\text{mi}}{5280\\ \\text{ft}}\\right)\\left(\\frac{60\\ \\text{s}}{\\text{min}}\\right)\\left(\\frac{60\\ \\text{min}}{1\\ \\text{h}}\\right) = ${mphOf(vEnd)}\\ \\text{mph}`);
  }
  hover(d.stage, () => hits);
  register(d.fig, { update: (dt) => cy.step(dt, () => T.v / 5), draw });
})();
};
