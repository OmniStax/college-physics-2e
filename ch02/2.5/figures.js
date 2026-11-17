/* Figures for section 2.5. Boots against a root element (the section's text article). */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.5'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, headline, hbracket, vbracket, strip, axes, person, car, plane, dragster, plot, shade, rich, legend } = F;
const sim = (id, H) => F.sim(root, id, H);
const sgn = (s) => String(s).replace('-', '−');   /* a true minus sign in canvas text */

/* =====================================================================
   SIM: the average velocity under constant acceleration. Two cars: one
   changes its velocity steadily from v₀ to v, the other holds v̄ the whole
   time, and they arrive level. Opens on the text's 30 and 60 km/h.
   Time runs as a fraction of t, and distance in units of (km/h)·t.
===================================================================== */
(function () {
  const d = sim('sim-avg', 690);
  const v0 = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 0, max: 80, step: 5, value: 30, unit: 'km/h', dec: 0, onInput: reset });
  const v = ctl(d.controls, { label: '\\kv', cls: 'velocity', min: 0, max: 80, step: 5, value: 60, unit: 'km/h', dec: 0, onInput: reset });
  const cy = cycle(() => 1, 1.4);
  function reset() { cy.reset(); }
  function draw() {
    const { ctx } = begin(d.c);
    const f = cy.now(), vb = (v0.v + v.v) / 2, dv = v.v - v0.v, n = (q) => fmt(q, q % 1 ? 1 : 0);
    const vel = (s) => v0.v + dv * s, pos = (s) => v0.v * s + 0.5 * dv * s * s;
    const L = 250, R = 1250, X = (m) => L + ((R - L) * m) / 80, yA = 168, yB = 262, K = 1.6;
    headline(ctx, dv === 0 ? 'Both cars hold ' + n(vb) + ' km/h, so they stay level the whole way.'
      : 'A car holding $\\kvb$ = ' + n(vb) + ' km/h arrives level with one that ' + (dv > 0 ? 'speeds up' : 'slows') + ' steadily from ' + n(v0.v) + ' to ' + n(v.v) + ' km/h.');
    [[yA, dv < 0 ? 'slows down' : 'speeds up', pos(f), vel(f)], [yB, 'holds v̄', vb * f, vb]].forEach(([y, name, x, vv]) => {
      strip(ctx, 190, 1350, y, 50);
      text(ctx, name, 176, y, PAL.ink, { align: 'right', size: 18, weight: 600 });
      const px = X(x), tip = px + vv * K, far = tip + 110 > 1390;
      car(ctx, px, y - 2, PAL.ink, 1);
      arrow(ctx, px, y - 42, tip, y - 42, C('velocity'), 5);
      text(ctx, n(Math.round(vv * 10) / 10) + ' km/h', far ? px - 10 : tip + 10, y - 42, C('velocity'), { align: far ? 'right' : 'left', weight: 600, size: 20 });
    });
    line(ctx, X(0), yA - 25, X(0), yB + 25, PAL.muted, 3);
    if (vb > 0) {
      line(ctx, X(vb), yA - 25, X(vb), yB + 25, C('position'), 4);
      text(ctx, 'both are here at time t', X(vb), yB + 48, C('position'), { align: 'center', weight: 600, size: 18 });
    }
    if (vb > 12 || vb === 0) text(ctx, 'start', X(0), yB + 48, PAL.muted, { align: 'center', size: 17 });
    /* velocity against time: the sloped line and the level v̄, 0 to 80 km/h, the sliders' range */
    const box = { l: 200, r: 1240, t: 372, b: 610 };
    const ax = axes(ctx, box, [0, 1], [0, 80], { xl: 'time', xc: C('time'), yl: 'v (km/h)', yc: C('velocity'), nx: 2, ny: 4, fx: (q) => (q === 0 ? '0' : q === 1 ? 't' : 't/2') });
    const { X: GX, Y: GY } = ax;
    if (dv !== 0 && f > 0) { shade(ctx, ax, vel, vb, 0, Math.min(f, 0.5), C('velocity'), { alpha: 0.22 }); if (f > 0.5) shade(ctx, ax, vel, vb, 0.5, f, C('velocity'), { alpha: 0.22 }); }
    plot(ctx, ax, () => vb, C('velocity'), { w: 3, dash: [10, 10] });
    plot(ctx, ax, vel, C('velocity'));
    line(ctx, GX(f), box.b, GX(f), GY(Math.max(vb, vel(f))), C('time'), 3, [4, 8]);
    dot(ctx, GX(0), GY(v0.v), C('velocity'), false, 10); dot(ctx, GX(1), GY(v.v), C('velocity'), true, 10);
    dot(ctx, GX(f), GY(vb), PAL.ink, true, 7); dot(ctx, GX(f), GY(vel(f)), PAL.ink, true, 7);
    const close = Math.abs(dv) < 25, up = dv >= 0;
    text(ctx, 'v̄ = ' + n(vb) + ' km/h', GX(1) + 16, GY(vb), C('velocity'), { weight: 600, size: 20 });
    if (dv !== 0) {
      text(ctx, 'v', close ? GX(1) - 14 : GX(1) + 16, close ? GY(v.v) + (up ? -26 : 26) : GY(v.v), C('velocity'), { weight: 600, size: 22, align: close ? 'right' : 'left' });
      text(ctx, 'v₀', GX(0) + 22, GY(v0.v) + ((up ? v0.v >= 10 : v0.v > 70) ? 28 : -28), C('velocity'), { weight: 600, size: 22, bg: alpha(PAL.panel, 0.8) });
      if (Math.abs(dv) >= 15) {
      const yl = Math.min(box.b - 16, Math.max(box.t + 16, GY(vel(0.25)) + (up ? 42 : -42))), yr = Math.min(box.b - 16, Math.max(box.t + 16, GY(vel(0.75)) + (up ? -42 : 42)));
      text(ctx, (up ? 'slower' : 'faster') + ' than v̄ for the first half', GX(0.25), yl, PAL.ink, { align: 'center', size: 18, bg: alpha(PAL.panel, 0.8) });
      text(ctx, (up ? 'faster' : 'slower') + ' by as much for the second', GX(0.75), yr, PAL.ink, { align: 'center', size: 18, bg: alpha(PAL.panel, 0.8) });
      }
    }
    tex(d.readout, `\\kvb = \\frac{\\kvo + \\kv}{2} = \\frac{${n(v0.v)}\\ \\text{km/h} + ${n(v.v)}\\ \\text{km/h}}{2} = ${n(vb)}\\ \\text{km/h}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1 / 5), draw });
})();

/* =====================================================================
   Figure 2.25 + 2.26: the jogger of Example 2.8 beside a runner twice as
   fast, x = x₀ + v̄t, and the book's line of displacement against v̄.
===================================================================== */
(function () {
  const d = sim('sim-jogger', 660);
  const vb = ctl(d.controls, { label: '\\kvb', cls: 'velocity', min: 1, max: 5, step: 0.05, value: 4, unit: 'm/s', dec: 2, onInput: reset });
  const t = ctl(d.controls, { label: '\\kt', cls: 'time', min: 30, max: 120, step: 1, value: 120, unit: 's', dec: 0, onInput: reset });
  const cy = cycle(() => t.v, 1.4); let ph = 0;
  function reset() { cy.reset(); }
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), x = vb.v * t.v, xm = vb.v * tau, col = F.ref('jogger');
    /* the road is a fixed 0 to 1200 m, as far as the faster runner gets at the sliders' maxima */
    const L = 90, R = 1310, y = 232, X = (m) => L + ((R - L) * m) / 1200;
    headline(ctx, 'After ' + fmt(tau, 0) + ' s the jogger is at $\\kx$ = ' + fmt(xm, 0) + ' m, and a runner twice as fast is twice as far, at ' + fmt(2 * xm, 0) + ' m.');
    strip(ctx, L - 40, R + 40, y, 50);
    for (let m = 0; m <= 1200; m += 100) { line(ctx, X(m), y + 25, X(m), y + 41, PAL.muted, 2); if (m % 200 === 0) text(ctx, m + ' m', X(m), y + 62, PAL.muted, { size: 17, align: 'center' }); }
    dot(ctx, X(0), y + 25, C('position'), false, 8); dot(ctx, X(x), y + 25, C('position'), true, 9); dot(ctx, X(2 * x), y + 25, PAL.muted, true, 9);
    if (X(x) - X(0) >= 230) {
      text(ctx, 'x₀ = 0', X(0), y + 98, C('position'), { align: 'center', weight: 600, size: 20 });
      text(ctx, 'x = ' + fmt(x, 0) + ' m', X(x), y + 98, C('position'), { align: 'center', weight: 600, size: 20 });
      text(ctx, 'twice as far, ' + fmt(2 * x, 0) + ' m', Math.min(X(2 * x), 1260), y + 98, PAL.muted, { align: 'center', weight: 600, size: 20 });
    } else rich(ctx, [['x = ' + fmt(x, 0) + ' m', C('position')], ' and, twice as far, ', [fmt(2 * x, 0) + ' m', PAL.muted]], L - 30, y + 98, { size: 20 });
    const run = tau < t.v ? ph : 0, K = 14;
    person(ctx, X(2 * xm), y + 25, PAL.muted, { face: 1, phase: run ? run * 1.3 : 0 });
    person(ctx, X(xm), y + 25, col, { face: 1, phase: run });
    const o2 = Math.min(X(2 * xm), 1385 - 2 * vb.v * K), fa = o2 + 2 * vb.v * K + 170 > 1390;
    arrow(ctx, o2, y - 112, o2 + 2 * vb.v * K, y - 112, alpha(C('velocity'), 0.55), 5);
    text(ctx, '2v̄ = ' + fmt(2 * vb.v, 2) + ' m/s', fa ? o2 - 10 : o2 + 2 * vb.v * K + 10, y - 112, alpha(C('velocity'), 0.75), { weight: 600, size: 19, align: fa ? 'right' : 'left' });
    arrow(ctx, X(xm), y - 84, X(xm) + vb.v * K, y - 84, C('velocity'), 5);
    text(ctx, 'v̄', X(xm) + vb.v * K + 10, y - 84, C('velocity'), { weight: 600, size: 22 });
    /* position against average velocity at this instant: a line through the origin whose slope is the time so far */
    const box = { l: 170, r: 1240, t: 420, b: 590 };
    const ax = axes(ctx, box, [0, 10], [0, 1200], { xl: 'v̄ (m/s)', xc: C('velocity'), yl: 'x (m)', yc: C('position'), nx: 5, ny: 4 });
    const { X: GX, Y: GY } = ax;
    plot(ctx, ax, (u) => u * tau, C('position'));
    [[vb.v, col, 'the jogger'], [2 * vb.v, PAL.muted, 'twice as fast']].forEach(([u, c, name]) => {
      line(ctx, GX(u), box.b, GX(u), GY(u * tau), alpha(PAL.ink, 0.4), 2, [4, 8]); line(ctx, box.l, GY(u * tau), GX(u), GY(u * tau), alpha(PAL.ink, 0.4), 2, [4, 8]);
      dot(ctx, GX(u), GY(u * tau), c, true, 10);
      const hi = GY(u * tau) - 32 < box.t + 14;
      text(ctx, name, hi ? GX(u) + 16 : GX(u), hi ? GY(u * tau) + 28 : GY(u * tau) - 32, c, { align: hi ? 'left' : 'center', weight: 600, size: 18 });
    });
    rich(ctx, ['slope = time so far = ', [fmt(tau, 0) + ' s', C('time')]], box.l + 18, box.t + 20, { size: 18 });
    tex(d.readout, `\\kx = \\kxo + \\kvb\\kt = 0\\ \\text{m} + (${fmt(vb.v, 2)}\\ \\text{m/s})(${t.v}\\ \\text{s}) = ${fmt(x, 0)}\\ \\text{m}`);
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => t.v / 5); if (cy.tau < t.v) ph += dt * 12; }, draw });
})();

/* =====================================================================
   Figure 2.27 + 2.28: the airplane of Example 2.9, v = v₀ + at. The
   equation is drawn as arrows over the plane: v₀, then at laid back from
   its head, landing on the head of v. Held long enough, the same
   acceleration turns the velocity negative, as the Discussion says.
===================================================================== */
(function () {
  const d = sim('sim-plane', 770);
  const v0 = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 50, max: 80, step: 1, value: 70, unit: 'm/s', dec: 1, onInput: reset });
  const a = ctl(d.controls, { label: '\\ka', cls: 'acceleration', min: -2, max: 0, step: 0.05, value: -1.5, unit: 'm/s²', dec: 2, onInput: reset });
  const t = ctl(d.controls, { label: '\\kt', cls: 'time', min: 5, max: 48, step: 0.5, value: 40, unit: 's', dec: 1, onInput: reset });
  const cy = cycle(() => t.v, 1.4);
  function reset() { cy.reset(); }
  const pos = (s) => v0.v * s + 0.5 * a.v * s * s, vel = (s) => v0.v + a.v * s;
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), vv = vel(tau), at = a.v * tau, vend = vel(t.v), col = F.ref('airplane');
    /* the runway is a fixed 0 to 4000 m, the farthest the sliders reach (80 m/s for 48 s) */
    const L = 220, R = 1320, y = 292, X = (m) => L + ((R - L) * m) / 4000, KV = 3.2, KA = 60;
    headline(ctx, a.v === 0 ? 'With no acceleration the airplane keeps its ' + fmt(v0.v, 1) + ' m/s.'
      : vv < 0 ? 'After ' + fmt(tau, 1) + ' s the same acceleration has the airplane rolling backward at ' + fmt(-vv, 1) + ' m/s.'
        : 'After ' + fmt(tau, 1) + ' s the airplane has lost ' + fmt(-at, 1) + ' m/s of its ' + fmt(v0.v, 1) + ' m/s.');
    strip(ctx, L - 70, R + 50, y, 56);
    for (let m = 0; m <= 4000; m += 500) { line(ctx, X(m), y + 28, X(m), y + 44, PAL.muted, 2); if (m % 1000 === 0) text(ctx, m + ' m', X(m), y + 64, PAL.muted, { size: 17, align: 'center' }); }
    plane(ctx, X(0), y - 2, alpha(col, 0.3), 1.1);
    text(ctx, 't₀ = 0', L - 80, y, C('time'), { align: 'right', weight: 600, size: 20 });
    const px = X(pos(tau)), ox = Math.min(px, 1390 - v0.v * KV - 165), y1 = y - 172, y2 = y - 141, y3 = y - 110;
    plane(ctx, px, y - 2, col, 1.1);
    /* v₀ + at = v, tip to tail */
    arrow(ctx, ox, y1, ox + v0.v * KV, y1, alpha(C('velocity'), 0.5), 5);
    text(ctx, 'v₀ = ' + fmt(v0.v, 1) + ' m/s', ox - 12, y1, alpha(C('velocity'), 0.8), { align: 'right', weight: 600, size: 20 });
    arrow(ctx, ox + v0.v * KV, y2, ox + vv * KV, y2, C('acceleration'), 4);
    text(ctx, 'at = ' + sgn(fmt(at, 1)) + ' m/s', ox + v0.v * KV + 12, y2, C('acceleration'), { weight: 600, size: 20 });
    line(ctx, ox + v0.v * KV, y1 + 6, ox + v0.v * KV, y2 - 6, alpha(PAL.ink, 0.4), 2, [4, 6]); line(ctx, ox + vv * KV, y2 + 6, ox + vv * KV, y3 - 6, alpha(PAL.ink, 0.4), 2, [4, 6]);
    arrow(ctx, ox, y3, ox + vv * KV, y3, C('velocity'), 5);
    text(ctx, 'v = ' + sgn(fmt(vv, 1)) + ' m/s', vv >= 0 ? ox - 12 : ox + 12, y3, C('velocity'), { align: vv >= 0 ? 'right' : 'left', weight: 600, size: 20 });
    /* the acceleration, the same arrow at every instant */
    const af = px + 12 + 190 > 1390;
    arrow(ctx, px, y + 104, px + a.v * KA, y + 104, C('acceleration'), 5);
    text(ctx, 'a = ' + sgn(fmt(a.v, 2)) + ' m/s²', af ? px + a.v * KA - 12 : px + 12, y + 104, C('acceleration'), { align: af ? 'right' : 'left', weight: 600, size: 20 });
    /* v against t on axes fixed at 0 to 48 s and −60 to 90 m/s, which hold every state */
    const box = { l: 220, r: 1240, t: 474, b: 694 };
    const ax = axes(ctx, box, [0, 48], [-60, 90], { xl: 't (s)', xc: C('time'), yl: 'v (m/s)', yc: C('velocity'), nx: 4, ny: 5, fy: (q) => sgn(fmt(q, 0)) });
    const { X: GX, Y: GY } = ax;
    line(ctx, GX(0), GY(v0.v), GX(t.v), GY(v0.v), alpha(C('velocity'), 0.5), 3, [10, 10]);
    plot(ctx, ax, vel, C('velocity'), { x: [0, t.v] });
    dot(ctx, GX(0), GY(v0.v), C('velocity'), false, 10); dot(ctx, GX(t.v), GY(vend), C('velocity'), true, 10);
    if (Math.abs(GY(vv) - GY(v0.v)) > 4) vbracket(ctx, GX(tau), GY(v0.v), GY(vv), C('acceleration'), 'at', 1, { size: 20 });
    dot(ctx, GX(tau), GY(vv), PAL.ink, true, 7);
    text(ctx, 'v₀', GX(0) + 18, GY(v0.v) + 30, C('velocity'), { weight: 600, size: 22, bg: alpha(PAL.panel, 0.85) });
    text(ctx, 'v = ' + sgn(fmt(vend, 1)) + ' m/s', GX(t.v) - 16, GY(vend) + 28, C('velocity'), { align: 'right', weight: 600, size: 20, bg: alpha(PAL.panel, 0.85) });
    tex(d.readout, `\\kv = \\kvo + \\ka\\kt = ${fmt(v0.v, 1)}\\ \\text{m/s} + (${fmt(a.v, 2)}\\ \\text{m/s}^2)(${fmt(t.v, 1)}\\ \\text{s}) = ${fmt(vend, 1)}\\ \\text{m/s}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => t.v / 6), draw });
})();

/* =====================================================================
   Figure 2.31 + 2.32: the dragster of Examples 2.10 and 2.11. Marks fall
   at each quarter of the time, and the gaps between them grow: from rest
   they are as 1 : 3 : 5 : 7. Starting from rest is a special value on v₀;
   there v₀t leaves the equation (x₀ = 0 on this road and is not written), which is the book's x = ½at².
===================================================================== */
(function () {
  const d = sim('sim-dragster', 720);
  const v0 = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 0, max: 20, step: 0.5, value: 0, unit: 'm/s', dec: 1, specials: [{ at: 0, label: 'from rest' }], onInput: reset });
  const a = ctl(d.controls, { label: '\\ka', cls: 'acceleration', min: 10, max: 30, step: 0.1, value: 26, unit: 'm/s²', dec: 1, onInput: reset });
  const t = ctl(d.controls, { label: '\\kt', cls: 'time', min: 3, max: 6, step: 0.01, value: 5.56, unit: 's', dec: 2, onInput: reset });
  const ro = F.readout(d);
  const cy = cycle(() => t.v, 1.4);
  function reset() { cy.reset(); }
  const pos = (s) => v0.v * s + 0.5 * a.v * s * s;
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), xe = pos(t.v), vv = v0.v + a.v * tau, ve = v0.v + a.v * t.v, col = F.ref('dragster');
    /* the track is a fixed 0 to 700 m, which holds the farthest run the sliders allow, 660 m */
    const L = 110, R = 1310, y = 240, X = (m) => L + ((R - L) * m) / 700, KV = 1.2, KA = 4;
    headline(ctx, 'After ' + fmt(tau, 2) + ' s the dragster has gone ' + fmt(pos(tau), 0) + ' m, and each quarter of the time carries it farther than the last.');
    strip(ctx, 30, 1370, y, 60);
    for (let m = 0; m <= 700; m += 100) { line(ctx, X(m), y + 30, X(m), y + 46, PAL.muted, 2); text(ctx, m + ' m', X(m), y + 66, PAL.muted, { size: 17, align: 'center' }); }
    line(ctx, X(0), y - 30, X(0), y + 30, PAL.muted, 3);
    const names = ['t/4', 't/2', '3t/4', 't = ' + fmt(t.v, 2) + ' s'];
    for (let k = 1; k <= 4; k++) {
      const tk = (t.v * k) / 4; if (tau < tk - 1e-9) break;
      const x1 = X(pos(tk - t.v / 4)), x2 = X(pos(tk));
      line(ctx, x2, y - 30, x2, y + 30, C('position'), k === 4 ? 5 : 3);
      if (x2 - x1 >= 40 || k === 4) text(ctx, names[k - 1], x2, y - 48, C('time'), { align: 'center', weight: 600, size: 18 });
      hbracket(ctx, x1, x2, y + 102, C('position'), x2 - x1 >= 40 ? fmt(pos(tk) - pos(tk - t.v / 4), 0) + ' m' : '', { side: 'below', size: 18 });
    }
    const px = X(pos(tau)), ox = Math.min(px, 1390 - Math.max(vv * KV, a.v * KA) - 190);
    dragster(ctx, px, y + 2, col, 0.8);
    arrow(ctx, ox, y - 114, ox + vv * KV, y - 114, C('velocity'), 5); text(ctx, 'v = ' + fmt(vv, 0) + ' m/s', ox + vv * KV + 12, y - 114, C('velocity'), { weight: 600, size: 20 });
    arrow(ctx, ox, y - 82, ox + a.v * KA, y - 82, C('acceleration'), 5); text(ctx, 'a = ' + fmt(a.v, 1) + ' m/s²', ox + a.v * KA + 12, y - 82, C('acceleration'), { weight: 600, size: 20 });
    /* x against t */
    const box = { l: 170, r: 1240, t: 430, b: 640 };
    const ax = axes(ctx, box, [0, 6], [0, 700], { xl: 't (s)', xc: C('time'), yl: 'x (m)', yc: C('position'), nx: 6, ny: 7 });
    const { X: GX, Y: GY } = ax, th = t.v / 2, xh = pos(th);
    [[th, xh], [t.v, xe]].forEach(([s, q]) => { line(ctx, GX(s), box.b, GX(s), GY(q), alpha(PAL.ink, 0.4), 2, [4, 8]); line(ctx, box.l, GY(q), GX(s), GY(q), alpha(PAL.ink, 0.4), 2, [4, 8]); });
    plot(ctx, ax, pos, C('position'), { x: [0, t.v] });
    for (let k = 1; k <= 3; k++) dot(ctx, GX((t.v * k) / 4), GY(pos((t.v * k) / 4)), C('position'), false, 7);
    dot(ctx, GX(t.v), GY(xe), C('position'), true, 10); dot(ctx, GX(tau), GY(pos(tau)), PAL.ink, true, 7);
    rich(ctx, ['at t/2, ', [fmt(xh, 0) + ' m', C('position')], ': ' + fmt((100 * xh) / xe, 0) + '% of the way'], Math.max(GX(th) - 16, box.l + 300), GY(xh) - 26, { align: 'right', size: 18, bg: alpha(PAL.panel, 0.85) });
    text(ctx, 'x = ' + fmt(xe, 0) + ' m', GX(t.v) + 16, GY(xe), C('position'), { weight: 600, size: 20 });
    const rest = v0.v === 0, U = (q, u) => `${q}\\ \\text{${u}}`;
    const half = `\\mk{half}{\\tfrac{1}{2}\\ka\\kt^2}`, halfN = `\\mk{halfn}{\\tfrac{1}{2}(${fmt(a.v, 1)}\\ \\text{m/s}^2)(${fmt(t.v, 2)}\\ \\text{s})^2}`, res = `\\mk{xv}{${U(fmt(xe, 0), 'm')}}`;
    const l1 = rest ? `\\mk{x}{\\kx} = ${half} = ${halfN} = ${res}`
      : `\\mk{x}{\\kx} = \\mk{v0t}{\\kvo\\kt} + ${half} = \\mk{v0tn}{(${U(fmt(v0.v, 1), 'm/s')})(${U(fmt(t.v, 2), 's')})} + ${halfN} = ${res}`;
    const l2 = `\\kv = \\sqrt{\\kvo^2 + 2\\ka(\\kx - \\kxo)} = \\sqrt{(${U(fmt(v0.v, 1), 'm/s')})^2 + 2(${fmt(a.v, 1)}\\ \\text{m/s}^2)(${U(fmt(xe, 0), 'm')})} = ${U(fmt(ve, 0), 'm/s')}`;
    ro.set(l1 + ' \\\\ ' + l2, '', { form: rest });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   Figure 2.33 + 2.34: Example 2.12. The same car on dry and on wet
   concrete, the reaction distance apart from the braking distance, and
   below them the speed against position on the road's own scale:
   v² = v₀² + 2a(x − x₀), with no time in it.
===================================================================== */
(function () {
  const d = sim('sim-braking', 690);
  const v0 = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 10, max: 35, step: 0.5, value: 30, unit: 'm/s', dec: 1, detents: [15, 30], onInput: reset });
  const tr = ctl(d.controls, { label: '\\kt_{\\text{reaction}}', cls: 'time', min: 0, max: 1, step: 0.05, value: 0.5, unit: 's', dec: 2, onInput: reset, aria: 'reaction time' });
  const ROADS = [{ name: 'dry', a: -7, y: 176 }, { name: 'wet', a: -5, y: 306 }];
  const brake = (a) => (v0.v * v0.v) / (2 * -a), tstop = (a) => tr.v + v0.v / -a;
  function pos(a, s) { if (s <= tr.v) return v0.v * s; const tb = Math.min(s - tr.v, v0.v / -a); return v0.v * tr.v + v0.v * tb + 0.5 * a * tb * tb; }
  const vel = (a, s) => (s <= tr.v ? v0.v : Math.max(0, v0.v + a * (s - tr.v)));
  const cy = cycle(() => tstop(-5), 1.6);
  function reset() { cy.reset(); }
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), rd = v0.v * tr.v, col = F.ref('braking-car');
    /* one scale for the road and the graph, a fixed 0 to 160 m: the longest stop the sliders allow is 157.5 m */
    const L = 170, R = 1310, X = (m) => L + ((R - L) * m) / 160;
    const vw = Math.sqrt(v0.v * v0.v - 10 * brake(-7));
    headline(ctx, 'Where the car on dry concrete has stopped, the car on wet concrete is still moving at ' + fmt(vw, 1) + ' m/s.');
    if (rd > 0) { ctx.save(); ctx.fillStyle = alpha(C('time'), 0.1); ctx.fillRect(X(0), 130, X(rd) - X(0), 258); ctx.restore(); line(ctx, X(rd), 130, X(rd), 388, PAL.muted, 2, [4, 8]); }
    rich(ctx, rd > 0 ? ['light turns red; ', [fmt(tr.v, 2) + ' s', C('time')], ' to react covers ', [fmt(rd, 1) + ' m', C('position')]] : ['light turns red and the brakes go on at once'], X(0), 112, { size: 18 });
    ROADS.forEach(({ name, a, y }) => {
      const b = brake(a), stop = rd + b, far = X(stop) + 56 + 100 > 1390;
      text(ctx, name, 24, y - 22, PAL.ink, { weight: 600, size: 22 });
      text(ctx, sgn(fmt(a, 2)) + ' m/s²', 24, y + 4, C('acceleration'), { weight: 600, size: 17 });
      line(ctx, 150, y + 16, 1370, y + 16, PAL.muted, 3);
      line(ctx, X(stop), y + 6, X(stop), y + 34, C('position'), 4);
      hbracket(ctx, X(rd), X(stop), y + 46, C('position'));
      const wide = X(stop) - X(rd) >= 190;
      text(ctx, 'braking ' + fmt(b, 1) + ' m', wide ? (X(rd) + X(stop)) / 2 : X(rd) + 8, y + 70, C('position'), { align: wide ? 'center' : 'left', weight: 600, size: 19 });
      rich(ctx, ['stops at ', [fmt(stop, 1) + ' m', C('position')]], far ? X(stop) : X(stop) + 56, far ? y - 62 : y - 6, { size: 19, align: far ? 'center' : 'left' });
      const px = X(pos(a, tau));
      car(ctx, px, y - 2, col, 1);
      arrow(ctx, px, y - 40, px + vel(a, tau) * 2.6, y - 40, C('velocity'), 4);
    });
    /* speed against position */
    const box = { l: L, r: R, t: 444, b: 612 };
    const ax = axes(ctx, box, [0, 160], [0, 40], { xl: 'x (m)', xc: C('position'), yl: 'v (m/s)', yc: C('velocity'), nx: 8, ny: 4 });
    const { X: GX, Y: GY } = ax;
    const vx = (a) => (q) => (q <= rd ? v0.v : Math.sqrt(Math.max(0, v0.v * v0.v + 2 * a * (q - rd))));
    if (rd > 0) line(ctx, GX(rd), box.t, GX(rd), box.b, PAL.muted, 2, [4, 8]);
    const xs = rd + brake(-7);
    line(ctx, GX(xs), box.b, GX(xs), GY(vw), alpha(PAL.ink, 0.4), 2, [4, 8]);
    [ROADS[1], ROADS[0]].forEach(({ a }) => plot(ctx, ax, [{ f: vx(a), x: [0, rd + brake(a)] }], C('velocity'), a === -5 ? { dash: [10, 10] } : {}));
    dot(ctx, GX(xs), GY(vw), C('velocity'), true, 9);
    rich(ctx, ['wet: still ', [fmt(vw, 1) + ' m/s', C('velocity')]], GX(xs) + 16, GY(vw) - 24, { size: 19, bg: alpha(PAL.panel, 0.85) });
    ROADS.forEach(({ a }) => dot(ctx, GX(pos(a, tau)), GY(vel(a, tau)), PAL.ink, true, 7));
    legend(ctx, ax, [{ s: 'dry concrete', color: C('velocity'), f: vx(-7) }, { s: 'wet concrete', color: C('velocity'), dash: [10, 10], f: vx(-5) }], { avoid: [{ l: GX(xs), r: GX(xs) + 260, t: GY(vw) - 40, b: GY(vw) }] });
    const one = (n, a) => `\\kx_{\\text{${n}}} - \\kxo = \\frac{\\kv^2 - \\kvo^2}{2\\ka} = \\frac{0^2 - (${fmt(v0.v, 1)}\\ \\text{m/s})^2}{2(${fmt(a, 2)}\\ \\text{m/s}^2)} = ${fmt(brake(a), 1)}\\ \\text{m}`;
    tex(d.readout, one('dry', -7) + ' \\\\ ' + one('wet', -5));
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   Figure 2.35: Example 2.13, the car on the ramp. The clock runs from the
   negative root to the positive one, so the reader sees what the discarded
   root describes: the parabola carried back before the motion began.
===================================================================== */
(function () {
  const d = sim('sim-merge', 700);
  const x = ctl(d.controls, { label: '\\kx', cls: 'position', min: 100, max: 300, step: 10, value: 200, unit: 'm', dec: 0, onInput: reset });
  const v0 = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 0, max: 14, step: 0.5, value: 10, unit: 'm/s', dec: 1, onInput: reset });
  const a = ctl(d.controls, { label: '\\ka', cls: 'acceleration', min: 1, max: 4, step: 0.05, value: 2, unit: 'm/s²', dec: 2, onInput: reset });
  const roots = () => { const disc = Math.sqrt(v0.v * v0.v + 2 * a.v * x.v); return [(-v0.v + disc) / a.v, (-v0.v - disc) / a.v]; };
  const cy = cycle(() => roots()[0] - roots()[1], 1.6);
  function reset() { cy.reset(); }
  function draw() {
    const { ctx } = begin(d.c);
    const [rp, rm] = roots(), tau = rm + cy.now(), pos = (s) => v0.v * s + 0.5 * a.v * s * s, vv = v0.v + a.v * tau, past = tau < -1e-9, col = F.ref('merging-car');
    /* the road is a fixed −100 to 300 m: the ramp is at most 300 m, and the parabola dips at most 98 m behind its start */
    const L = 110, R = 1310, y = 226, X = (m) => L + ((R - L) * (m + 100)) / 400;
    headline(ctx, past ? 'Carried back to ' + sgn(fmt(tau, 1)) + ' s, the equation puts the car at ' + sgn(fmt(pos(tau), 0)) + ' m, before the motion began.'
      : 'After ' + fmt(tau, 1) + ' s the car is ' + fmt(pos(tau), 0) + ' m up the ramp, and it reaches the end at ' + fmt(rp, 1) + ' s.');
    strip(ctx, X(0), X(x.v), y, 50);
    line(ctx, X(-100), y + 25, X(0), y + 25, PAL.muted, 2, [6, 8]);
    for (let m = -100; m <= 300; m += 50) { line(ctx, X(m), y + 25, X(m), y + 41, PAL.muted, 2); if (m % 100 === 0) text(ctx, sgn(m) + ' m', X(m), y + 62, PAL.muted, { size: 17, align: 'center' }); }
    line(ctx, X(0), y - 34, X(0), y + 25, C('position'), 3); line(ctx, X(x.v), y - 34, X(x.v), y + 25, C('position'), 4);
    text(ctx, 'x₀ = 0', X(0), y - 100, C('position'), { align: 'center', weight: 600, size: 20 });
    text(ctx, 'x = ' + x.v + ' m', X(x.v), y - 100, C('position'), { align: 'center', weight: 600, size: 20 });
    const px = X(pos(tau)), ox = Math.min(px, 1385 - Math.max(0, vv) * 4), tip = ox + vv * 4, cc = past ? alpha(col, 0.35) : col, vc = past ? alpha(C('velocity'), 0.5) : C('velocity');
    car(ctx, px, y - 4, cc, 1);
    arrow(ctx, ox, y - 62, tip, y - 62, vc, 5);
    const s = 'v = ' + sgn(fmt(vv, 1)) + ' m/s', right = vv >= 0 ? tip + 10 + 160 < 1390 : tip - 10 - 160 < 16;
    text(ctx, s, right ? Math.max(ox, tip) + 10 : Math.min(ox, tip) - 10, y - 62, vc, { align: right ? 'left' : 'right', weight: 600, size: 20 });
    /* x against t on axes fixed at −45 to 30 s, which hold every root the sliders give, and the road's −100 to 300 m */
    const box = { l: 170, r: 1240, t: 380, b: 620 };
    const ax = axes(ctx, box, [-45, 30], [-100, 300], { xl: 't (s)', xc: C('time'), yl: 'x (m)', yc: C('position'), nx: 5, ny: 4, fx: (q) => sgn(fmt(q, 0)), fy: (q) => sgn(fmt(q, 0)) });
    const { X: GX, Y: GY } = ax;
    ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.1); ctx.fillRect(box.l, box.t, GX(0) - box.l, box.b - box.t); ctx.restore();
    text(ctx, 'before the motion began', box.l + 14, box.b - 20, PAL.muted, { size: 17 });
    plot(ctx, ax, [{ f: pos, x: [-45, 0] }], alpha(C('position'), 0.4));
    plot(ctx, ax, [{ f: pos, x: [0, 30] }], C('position'));
    line(ctx, box.l, GY(x.v), box.r, GY(x.v), C('position'), 3, [10, 10]);
    text(ctx, 'x = ' + x.v + ' m', GX(-v0.v / a.v), GY(x.v) - 22, C('position'), { align: 'center', weight: 600, size: 18, bg: alpha(PAL.panel, 0.85) });
    line(ctx, GX(rp), box.b, GX(rp), GY(x.v), C('time'), 3, [4, 8]); line(ctx, GX(rm), box.b, GX(rm), GY(x.v), PAL.muted, 3, [4, 8]);
    dot(ctx, GX(rp), GY(x.v), C('time'), true, 11);
    /* the discarded root: a muted marker with a cross through it */
    dot(ctx, GX(rm), GY(x.v), PAL.muted, true, 11);
    line(ctx, GX(rm) - 8, GY(x.v) - 8, GX(rm) + 8, GY(x.v) + 8, PAL.panel, 3); line(ctx, GX(rm) - 8, GY(x.v) + 8, GX(rm) + 8, GY(x.v) - 8, PAL.panel, 3);
    dot(ctx, GX(tau), GY(pos(tau)), PAL.ink, true, 8);
    text(ctx, 't = ' + fmt(rp, 1) + ' s', GX(rp) + 20, GY(x.v) + 28, C('time'), { weight: 600, size: 20, bg: alpha(PAL.panel, 0.85) });
    /* the discarded root's time stands left of its drop line; where the axis leaves no room there, it goes
       above the level on the right, the one side the curve and the drop line both leave free */
    const tight = GX(rm) - 20 < box.l + 130, high = GY(x.v) - 24 < box.t + 14;   /* high: level with the axis title, so it starts past it */
    text(ctx, 't = ' + sgn(fmt(rm, 1)) + ' s', tight ? Math.max(GX(rm) + 20, high ? box.l + 95 : 0) : GX(rm) - 20, GY(x.v) + (tight ? -24 : 28), PAL.muted, { align: tight ? 'left' : 'right', weight: 600, size: 20, bg: alpha(PAL.panel, 0.85) });
    tex(d.readout, `\\kt = \\frac{-\\kvo \\pm \\sqrt{\\kvo^2 + 2\\ka\\kx}}{\\ka} = \\frac{-${fmt(v0.v, 1)}\\ \\text{m/s} \\pm \\sqrt{(${fmt(v0.v, 1)}\\ \\text{m/s})^2 + 2(${fmt(a.v, 2)}\\ \\text{m/s}^2)(${x.v}\\ \\text{m})}}{${fmt(a.v, 2)}\\ \\text{m/s}^2} = ${fmt(rp, 1)}\\ \\text{s}\\ \\text{or}\\ {${fmt(rm, 1)}}\\ \\text{s}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => (roots()[0] - roots()[1]) / 7), draw });
})();
};
