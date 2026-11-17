/* Figures for section 2.3 Time, Velocity, and Speed. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, label, hbracket, vbracket, strip, scale, axes, person, car, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) { const n = el('small', null, small); host.appendChild(n); F.renderMath(n); } }

/* ---------- small helpers shared by the figures ---------- */
/* a signed value, with the minus sign the book prints */
const signed = (x, d) => (x < 0 ? '−' : '+') + fmt(Math.abs(x), d);
/* the same number for a readout, where TeX sets the minus sign itself */
const tx = (s) => s.replace('−', '-');

/* the fuselage of an airplane between x = l and x = r, centred on y, the nose to the right, with a fin at the tail */
function fuselage(ctx, l, r, y, h, color) {
  const fin = h * 0.42;
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.fillStyle = PAL.panel;
  ctx.beginPath(); ctx.moveTo(l + 40, y - h / 2); ctx.lineTo(r - 140, y - h / 2); ctx.quadraticCurveTo(r + 30, y - h / 2, r + 30, y);
  ctx.quadraticCurveTo(r + 30, y + h / 2, r - 140, y + h / 2); ctx.lineTo(l + 40, y + h / 2); ctx.quadraticCurveTo(l - 10, y + h / 2, l - 10, y);
  ctx.quadraticCurveTo(l - 10, y - h / 2, l + 40, y - h / 2); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(l + 108, y - h / 2); ctx.lineTo(l + 50, y - h / 2 - fin); ctx.lineTo(l + 12, y - h / 2 - fin); ctx.lineTo(l + 36, y - h / 2); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = color; for (let wx = l + 200; wx < r - 180; wx += 60) ctx.fillRect(wx, y - h / 2 + 16, 18, 12);
  ctx.restore();
}
/* The airplane both passenger figures share: the aisle is 10 m long, x increasing toward the front as in
   the book, 100 units to the metre. Returns the aisle's y and the floor the passenger's feet stand on. */
const AL = 200, AR = 1200, AX = (m) => AL + ((AR - AL) * m) / 10;
function cabin(ctx, y) {
  const ys = y + 42;
  fuselage(ctx, 90, 1310, y, 150, PAL.ink);
  strip(ctx, AL, AR, ys, 36);
  scale(ctx, AX, 0, 10, 1, y + 120, 'm', 2);
  text(ctx, 'rear', 104, y + 120, PAL.muted, { size: 17, align: 'center' }); text(ctx, 'front', 1310, y + 120, PAL.muted, { size: 17, align: 'center' });
  return { ys, feet: ys + 10 };
}
/* The passenger's trip of Figure 2.9, read off the book's image: from x₀ = 6.0 m he moves −1.20 m, −1.25 m,
   +1.05 m and −2.60 m (the book's Δx_a to Δx_d, measured against its Δx_tot = −4.0 m), one after the other.
   The book gives the segments no times, so each takes a quarter of the 5.0 s. Between those points the
   position is a smooth curve that turns round at the ends of b and c. */
const KNOT = [6.0, 4.8, 3.55, 4.6, 2.0], SLOPE = [-1.2, -1.0, 0, 0, -2.6], KH = 1.25;
function trip(u) {
  const i = Math.min(3, Math.max(0, Math.floor(u / KH))), s = Math.min(1, Math.max(0, (u - i * KH) / KH));
  const p0 = KNOT[i], p1 = KNOT[i + 1], m0 = SLOPE[i] * KH, m1 = SLOPE[i + 1] * KH, s2 = s * s, s3 = s2 * s;
  const x = (2 * s3 - 3 * s2 + 1) * p0 + (s3 - 2 * s2 + s) * m0 + (-2 * s3 + 3 * s2) * p1 + (s3 - s2) * m1;
  const v = ((6 * s2 - 6 * s) * p0 + (3 * s2 - 4 * s + 1) * m0 + (-6 * s2 + 6 * s) * p1 + (3 * s2 - 2 * s) * m1) / KH;
  return { x, v };
}

/* =====================================================================
   SIM: elapsed time. The book's lecture, 11:00 to 11:50, on two scales
   that share one line: the clock's readings above and, below, a stopwatch
   whose zero sits under t₀. The same bracket is Δt on both. Still: it
   answers its sliders and has no clock of its own.
===================================================================== */
(function () {
  const d = sim('sim-elapsed-time', 430);
  /* minutes after midnight, shown as the clock shows them */
  const hm = (m) => { const h = Math.floor(m / 60), mm = Math.round(m - 60 * h); return (h > 12 ? h - 12 : h) + ':' + String(mm).padStart(2, '0'); };
  const clock = (m) => hm(m) + (m < 720 ? ' A.M.' : ' P.M.');
  const t0 = ctl(d.controls, { label: '\\kto', cls: 'time', min: 630, max: 680, step: 5, value: 660, unit: '', fmt: clock, aria: 'clock reading when the lecture starts' });
  const tf = ctl(d.controls, { label: '\\ktf', cls: 'time', min: 690, max: 750, step: 5, value: 710, unit: '', fmt: clock, aria: 'clock reading when the lecture ends' });
  /* both scales are fixed at 10:30 to 12:30, the reach of the two sliders */
  const L = 250, R = 1290, X = (m) => L + ((R - L) * (m - 630)) / 120;
  function draw() {
    const { ctx } = begin(d.c);
    const dt = tf.v - t0.v, yc = 190, ys = 330, xa = X(t0.v), xb = X(tf.v), col = C('time');
    /* the clock's scale */
    text(ctx, 'clock', L - 30, yc, PAL.ink, { align: 'right', weight: 600 });
    line(ctx, L, yc, R, yc, PAL.muted, 3);
    for (let m = 630; m <= 750; m += 10) { line(ctx, X(m), yc - 8, X(m), yc + 8, PAL.muted, 2); if (m % 30 === 0) text(ctx, hm(m), X(m), yc - 28, PAL.muted, { size: 17, align: 'center' }); }
    /* the stopwatch's scale, its zero under t₀ */
    text(ctx, 'stopwatch', L - 30, ys, PAL.ink, { align: 'right', weight: 600 });
    line(ctx, xa, ys, R, ys, PAL.muted, 3);
    for (let m = 0; xa + ((R - L) * m) / 120 <= R + 1; m += 10) { const x = xa + ((R - L) * m) / 120; line(ctx, x, ys - 8, x, ys + 8, PAL.muted, 2); text(ctx, m + (m ? '' : ' min'), x, ys + 28, PAL.muted, { size: 17, align: m ? 'center' : 'left' }); }
    /* the two instants, one above the other on the two scales, and the elapsed time between them */
    line(ctx, xa, yc, xa, ys, alpha(col, 0.5), 3, [4, 8]); line(ctx, xb, yc, xb, ys, alpha(col, 0.5), 3, [4, 8]);
    hbracket(ctx, xa, xb, (yc + ys) / 2 + 22, col, 'Δt = ' + fmt(dt, 0) + ' min');
    for (const y of [yc, ys]) { dot(ctx, xa, y, col, false, 11); dot(ctx, xb, y, col, true, 11); }
    const apart = xb - xa > 240, al = apart ? 'center' : 'right', ar = apart ? 'center' : 'left', gap = apart ? 0 : 14;
    text(ctx, 't_0 = ' + hm(t0.v), xa - gap, yc - 64, col, { align: al, weight: 600, size: 24 }); text(ctx, 't_f = ' + hm(tf.v), xb + gap, yc - 64, col, { align: ar, weight: 600, size: 24 });
    text(ctx, 't_0 = 0', xa - gap, ys + 68, col, { align: al, weight: 600, size: 24 }); text(ctx, 't = ' + fmt(dt, 0) + ' min', xb + gap, ys + 68, col, { align: ar, weight: 600, size: 24 });
    topline(ctx, 'A lecture from ' + hm(t0.v) + ' to ' + hm(tf.v) + ' lasts ' + fmt(dt, 0) + ' min, and a stopwatch started with it ends on ' + fmt(dt, 0) + ' min.');
    tex(d.readout, `\\text{clock:}\\quad \\kdt = \\ktf - \\kto = \\text{${hm(tf.v)}} - \\text{${hm(t0.v)}} = ${fmt(dt, 0)}\\ \\text{min} \\\\ \\text{stopwatch:}\\quad \\kdt = \\ktf - \\kto = ${fmt(dt, 0)}\\ \\text{min} - 0\\ \\text{min} = ${fmt(dt, 0)}\\ \\text{min}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: average velocity. The book's passenger walks the aisle from x₀ to
   x_f in a time t, at the speed the numbers give; below, position against
   time, where the rise Δx over the run t is the slope v̄. Finite motion,
   so it gets the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-average-velocity', 720);
  const x0 = ctl(d.controls, { label: '\\kxo', cls: 'position', min: 0, max: 10, step: 0.5, value: 6, unit: 'm', dec: 1, onInput: reset });
  const xf = ctl(d.controls, { label: '\\kxf', cls: 'position', min: 0, max: 10, step: 0.5, value: 2, unit: 'm', dec: 1, onInput: reset });
  /* no shorter than 2.5 s, so the fastest walk, 10 m in 2.5 s, still draws its velocity arrow to scale */
  const t = ctl(d.controls, { label: '\\kt', cls: 'time', min: 2.5, max: 10, step: 0.5, value: 5, unit: 's', dec: 1, onInput: reset });
  const cy = cycle(() => t.v, 1.2); let ph = 0;
  function reset() { cy.reset(); }
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), done = tau >= t.v - 1e-9, dx = xf.v - x0.v, vb = dx / t.v, xm = x0.v + vb * tau, face = dx < 0 ? -1 : 1;
    const pc = C('position'), vc = C('velocity'), tc = C('time');
    const { ys, feet } = cabin(ctx, 215);
    /* the displacement, bracketed over the plane from where he starts to where he ends */
    if (Math.abs(dx) >= 0.5) hbracket(ctx, AX(x0.v), AX(xf.v), 120, pc, 'Δx = ' + signed(dx, 1) + ' m');
    else text(ctx, 'Δx = 0 m', AX(x0.v), 104, pc, { align: 'center', weight: 600 });
    line(ctx, AX(x0.v), 132, AX(x0.v), ys, alpha(pc, 0.4), 2, [4, 8]); line(ctx, AX(xf.v), 132, AX(xf.v), ys, alpha(pc, 0.4), 2, [4, 8]);
    dot(ctx, AX(x0.v), ys, pc, false, 10); dot(ctx, AX(xf.v), ys, pc, true, 10);
    const apart = Math.abs(AX(xf.v) - AX(x0.v)) > 190, lo = xf.v < x0.v ? 'x_f' : 'x_0';
    for (const [name, v] of [['x_0', x0.v], ['x_f', xf.v]]) text(ctx, name + ' = ' + fmt(v, 1) + ' m', AX(v) + (apart ? 0 : name === lo ? -10 : 10), 392, pc, { align: apart ? 'center' : name === lo ? 'right' : 'left', weight: 600, size: 22 });
    /* the passenger, facing the way he goes, and his average velocity as an arrow, 50 units to the metre per second */
    person(ctx, AX(xm), feet, F.ref('passenger'), { face, phase: done || dx === 0 ? 0 : ph });
    const ay = feet - 62, ax = AX(xm) + face * 26, len = vb * 50;
    if (Math.abs(len) > 6) { arrow(ctx, ax, ay, ax + len, ay, vc, 5); label(ctx, 'v̄ = ' + signed(vb, 2) + ' m/s', ax + len, ay, { side: len > 0 ? 'right' : 'left', gap: 12, color: vc, size: 20, leader: false }); }
    else text(ctx, 'v̄ = 0 m/s', AX(xm), feet - 122, vc, { weight: 600, size: 20, align: 'center', bg: PAL.panel });
    /* Position against time. The axes are fixed at 0 to 10 s, the time slider's maximum, and 0 to 10 m, the
       aisle's length, so a slider moves the line and never the ticks. */
    const box = { l: 170, r: 1250, t: 470, b: 650 };
    const { X: GX, Y: GY } = axes(ctx, box, [0, 10], [0, 10], { xl: 't (s)', xc: tc, yl: 'x (m)', yc: pc, nx: 10, ny: 2 });
    /* the run t and the rise Δx, the two legs under the line */
    line(ctx, GX(0), GY(x0.v), GX(t.v), GY(x0.v), tc, 3, [10, 10]);
    if (dx !== 0) line(ctx, GX(t.v), GY(x0.v), GX(t.v), GY(xf.v), pc, 3, [10, 10]);
    line(ctx, GX(0), GY(x0.v), GX(t.v), GY(xf.v), pc, 5);
    dot(ctx, GX(0), GY(x0.v), pc, false, 10); dot(ctx, GX(t.v), GY(xf.v), pc, true, 10);
    line(ctx, GX(tau), box.b, GX(tau), GY(xm), alpha(tc, 0.6), 3, [4, 8]); dot(ctx, GX(tau), GY(xm), PAL.ink, true, 9);
    const up = dx > 0 ? 1 : -1;   /* the legs' labels go on the far side of the run from the line */
    text(ctx, 't = ' + fmt(t.v, 1) + ' s', GX(t.v / 2), Math.min(box.b - 16, Math.max(box.t + 16, GY(x0.v) + up * 24)), tc, { align: 'center', weight: 600, size: 20, bg: alpha(PAL.panel, 0.85) });
    text(ctx, 'Δx = ' + signed(dx, 1) + ' m', GX(t.v) + 16, GY((x0.v + xf.v) / 2), pc, { align: 'left', weight: 600, size: 20 });
    text(ctx, 'slope = v̄ = ' + signed(vb, 2) + ' m/s', box.r, box.t - 24, vc, { align: 'right', weight: 600, size: 20 });
    topline(ctx, !done ? 'After ' + fmt(tau, 1) + ' s the passenger is at x = ' + fmt(xm, 1) + ' m.'
      : dx === 0 ? 'He ends where he began, so his average velocity is zero.'
      : 'He moves ' + signed(dx, 1) + ' m in ' + fmt(t.v, 1) + ' s, an average velocity of ' + signed(vb, 2) + ' m/s, toward the ' + (dx < 0 ? 'rear' : 'front') + ' of the plane.');
    readout(d.readout, `\\kvb = \\frac{\\kdx}{\\kt} = \\frac{${tx(signed(dx, 1))}\\ \\text{m}}{${fmt(t.v, 1)}\\ \\text{s}} = ${tx(signed(vb, 2))}\\ \\text{m/s}`);
  }
  F.hover(d.stage, () => [{ x: AX(x0.v + ((xf.v - x0.v) * cy.now()) / t.v), y: 220, r: 55, name: 'the passenger' }]);
  /* the walk is played at one and a half times its real speed, so a shorter time is seen as a faster walk */
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1.5); if (cy.tau < t.v) ph += dt * 12; }, draw });
})();

/* =====================================================================
   FIGURE 2.9: the passenger's trip in detail. Under the aisle, on the
   same x scale, a record of the trip with time running down: the trip is
   cut into intervals of the width set, and each interval's displacement
   is an arrow in its row, as the book stacks Δx_a to Δx_d. Its average
   velocity stands beside it. Finite motion, so it gets the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-segments', 800);
  /* The widths that divide the 5.0 s evenly; 1.25 s gives the book's four segments. The slider walks the list. */
  const WID = [0.1, 0.25, 0.5, 1, 1.25, 2.5, 5], TOT = 5;
  const W = ctl(d.controls, { label: '\\kdt', cls: 'time', min: 0, max: 6, step: 1, value: 4, unit: 's', fmt: (i) => fmt(WID[Math.round(i)], 2) + ' s', onInput: reset, aria: 'length of one time interval' });
  const cy = cycle(() => TOT, 1.2); let ph = 0;
  function reset() { cy.reset(); }
  const T0 = 430, TY = (s) => T0 + 58 * s, XL = 170, XR = 1290;
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), done = tau >= TOT - 1e-9, w = WID[Math.round(W.v)], n = Math.round(TOT / w), row = TY(w) - TY(0);
    const now = trip(tau), x0 = KNOT[0], xe = KNOT[4], dxt = xe - x0;
    const k = Math.min(n - 1, Math.floor(tau / w + 1e-9)), ta = k * w, tb = (k + 1) * w, xa = trip(ta).x, xb = trip(tb).x, vb = (xb - xa) / w;
    const pc = C('position'), vc = C('velocity'), tc = C('time');
    const { ys, feet } = cabin(ctx, 205);
    /* where he starts and where he ends, carried down through the record as the book's x₀ and x_f */
    for (const [name, v, filled] of [['x_0', x0, false], ['x_f', xe, true]]) {
      dot(ctx, AX(v), ys, pc, filled, 10); line(ctx, AX(v), 340, AX(v), TY(TOT) + 52, alpha(pc, 0.4), 2, [4, 8]);
      text(ctx, name, AX(v) + (filled ? -12 : 12), 386, pc, { align: filled ? 'right' : 'left', weight: 600, size: 24 });
    }
    /* the passenger and his velocity at this instant, 50 units to the metre per second */
    const face = now.v < 0 ? -1 : 1, px = AX(now.x);
    person(ctx, px, feet, F.ref('passenger'), { face, phase: done || Math.abs(now.v) < 0.05 ? 0 : ph });
    const ay = feet - 62, ax = px + face * 26, len = now.v * 50;
    if (!done && Math.abs(len) > 6) { arrow(ctx, ax, ay, ax + len, ay, vc, 5); label(ctx, 'v = ' + signed(now.v, 2) + ' m/s', ax + len, ay, { side: len > 0 ? 'right' : 'left', gap: 12, color: vc, size: 20, leader: false }); }
    /* the record: time runs down the page, one row to an interval */
    line(ctx, XL, TY(0), XL, TY(TOT), PAL.muted, 2);
    for (let s = 0; s <= TOT; s++) { line(ctx, XL - 8, TY(s), XL, TY(s), PAL.muted, 2); text(ctx, String(s), XL - 16, TY(s), PAL.muted, { size: 17, align: 'right' }); }
    text(ctx, 't (s)', XL - 16, TY(0) - 34, tc, { align: 'right', weight: 600, size: 20 });
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(XL + 1, TY(ta), XR - XL - 1, row); ctx.restore();
    if (n <= 20) for (let i = 0; i <= n; i++) line(ctx, XL, TY(i * w), XR, TY(i * w), PAL.rule, 1.5);
    if (row >= 30) vbracket(ctx, 222, TY(ta), TY(tb), tc, 'Δt = ' + fmt(w, 2) + ' s', 1, { size: 20 });
    else { vbracket(ctx, 222, TY(ta), TY(tb), tc); text(ctx, 'Δt = ' + fmt(w, 2) + ' s', 240, TY(ta) > TY(0) + 30 ? TY(ta) - 18 : TY(tb) + 18, tc, { weight: 600, size: 20 }); }
    /* the path he really took, and each interval's displacement in its row */
    ctx.save(); ctx.strokeStyle = alpha(pc, 0.45); ctx.lineWidth = 2.5; ctx.beginPath();
    for (let i = 0; i <= 200; i++) { const s = (TOT * i) / 200; ctx[i ? 'lineTo' : 'moveTo'](AX(trip(s).x), TY(s)); } ctx.stroke(); ctx.restore();
    const named = n === 4, listed = n <= 5;
    const say = (i, y, a, b) => {
      F.rich(ctx, [[(named ? 'Δx_' + 'abcd'[i] : 'Δx') + ' = ' + signed(b - a, 2) + ' m', pc]], 860, y, { size: 20, weight: 600, align: 'left' });
      F.rich(ctx, [['v̄ = ' + signed((b - a) / w, 2) + ' m/s', vc]], 1070, y, { size: 20, weight: 600, align: 'left' });
    };
    for (let i = 0; i < n; i++) {
      const a = trip(i * w).x, b = trip((i + 1) * w).x, y = TY((i + 0.5) * w), cur = i === k, col = cur || listed ? pc : alpha(pc, 0.7);
      if (row >= 14) arrow(ctx, AX(a), y, AX(b), y, col, row >= 40 ? 5 : 3); else line(ctx, AX(a), y, AX(b), y, col, 3);
      if (listed) say(i, y, a, b);
    }
    if (!listed) say(k, Math.min(TY(TOT) - 14, Math.max(TY(0) + 14, TY((k + 0.5) * w))), xa, xb);
    /* the whole trip, under the record, as the book draws Δx_tot under its segments */
    const yt = TY(TOT) + 40;
    arrow(ctx, AX(x0), yt, AX(xe), yt, pc, 5);
    F.rich(ctx, [['Δx_{tot} = ' + signed(dxt, 2) + ' m', pc]], 860, yt, { size: 20, weight: 600, align: 'left' });
    F.rich(ctx, [['v̄ = ' + signed(dxt / TOT, 2) + ' m/s', vc]], 1070, yt, { size: 20, weight: 600, align: 'left' });
    /* this instant: straight under the passenger, on the path */
    line(ctx, px, 340, px, TY(tau), alpha(PAL.ink, 0.35), 2, [4, 8]);
    line(ctx, XL, TY(tau), px, TY(tau), alpha(tc, 0.6), 3, [4, 8]); dot(ctx, px, TY(tau), PAL.ink, true, 9);
    topline(ctx, done ? (n === 1 ? 'One interval of 5.00 s records only the whole trip, ' + signed(dxt, 1) + ' m at ' + signed(dxt / TOT, 2) + ' m/s.' : n + ' intervals of ' + fmt(w, 2) + ' s record a trip that averages ' + signed(dxt / TOT, 2) + ' m/s over the whole 5.0 s.')
      : 'From ' + fmt(ta, 2) + ' s to ' + fmt(tb, 2) + ' s he moves ' + signed(xb - xa, 2) + ' m, an average of ' + signed(vb, 2) + ' m/s. At ' + fmt(tau, 2) + ' s, v = ' + signed(now.v, 2) + ' m/s.');
    readout(d.readout, `\\kvb = \\frac{\\kdx}{\\kdt} = \\frac{${tx(signed(xb - xa, 2))}\\ \\text{m}}{${fmt(w, 2)}\\ \\text{s}} = ${tx(signed(vb, 2))}\\ \\text{m/s} \\\\ \\text{at } ${fmt(tau, 2)}\\ \\text{s:}\\quad \\kv = ${tx(signed(now.v, 2))}\\ \\text{m/s}`,
      w <= 0.25 ? 'Over an interval this short, $\\kvb$ is close to the instantaneous velocity $\\kv$ all the way through it.' : '');
  }
  F.hover(d.stage, () => { const s = cy.now(); return [{ x: AX(trip(s).x), y: 210, r: 55, name: 'the passenger' }, { x: AX(trip(s).x), y: TY(s), r: 30, name: 'where he is at this instant' }, { x: 600, y: TY(2.5), r: 40, name: 'the path he takes' }]; });
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); if (cy.tau < TOT) ph += dt * 12; }, draw });
})();

/* =====================================================================
   FIGURE 2.10: the round trip to the store, 3 km away. Under the road the
   car's path is laid out as it is driven, out and back, and under that
   the displacement from home. Where the car ends is the slider: at home
   the displacement is zero, as in the book. Finite motion, so it gets
   the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-store', 520);
  const XF = ctl(d.controls, { label: '\\kxf', cls: 'position', min: 0, max: 3, step: 0.5, value: 0, unit: 'km', dec: 1, specials: [{ at: 0, label: 'home' }], onInput: reset, aria: 'where the trip ends, measured from home' });
  /* in steps of 3 min, so the time in hours has two decimals and the quotients shown are exact */
  const T = ctl(d.controls, { label: '\\kt', cls: 'time', min: 12, max: 60, step: 3, value: 30, unit: 'min', dec: 0, onInput: reset, aria: 'time of the whole trip' });
  const cy = cycle(() => T.v, 1.2);
  function reset() { cy.reset(); }
  /* the store is 3 km from home, the book's distance, and the road is drawn that long */
  const DS = 3, L = 280, R = 1120, X = (km) => L + ((R - L) * km) / DS, G = 232;
  const state = () => {
    const tau = cy.now(), xf = XF.v, path = DS + (DS - xf), hours = T.v / 60, sp = path / hours, gone = Math.min(path, (sp * tau) / 60), back = gone > DS + 1e-9;
    return { tau, xf, path, hours, sp, gone, back, pos: back ? 2 * DS - gone : gone, done: tau >= T.v - 1e-9 };
  };
  function draw() {
    const { ctx } = begin(d.c);
    const { tau, xf, path, hours, sp, gone, back, pos, done } = state(), vbar = xf / hours, pc = C('position'), vc = C('velocity');
    /* home, the road and the store */
    strip(ctx, L - 62, R + 62, G - 12, 40);
    F.house(ctx, 140, G, 116, 1, PAL.ink); F.shopfront(ctx, 1283, G, 170, 124, 'STORE', PAL.ink);
    text(ctx, 'home', 140, G + 36, PAL.muted, { size: 17, align: 'center' });
    scale(ctx, X, 0, DS, 1, G + 36, 'km', 1);
    for (const km of [0, DS]) line(ctx, X(km), G + 78, X(km), 486, PAL.rule, 1.5);
    /* the car, facing the way it drives, and its velocity as an arrow, 4 units to the km/h */
    const cx = X(pos), dir = back ? -1 : 1;
    ctx.save(); ctx.translate(cx, 0); ctx.scale(dir, 1); car(ctx, 0, G - 22, F.ref('car'), 1.4); ctx.restore();
    if (!done) { const len = dir * sp * 4; arrow(ctx, cx, G - 76, cx + len, G - 76, vc, 5); label(ctx, 'v = ' + signed(dir * sp, 1) + ' km/h', cx + len, G - 76, { side: dir > 0 ? 'right' : 'left', gap: 12, color: vc, size: 20, leader: false }); }
    /* the path driven so far: out along one line, round at the store, back along the next */
    const y1 = 352, y2 = 394, out = Math.min(gone, DS);
    ctx.save(); ctx.strokeStyle = pc; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(0), y1); ctx.lineTo(X(out), y1);
    if (back) { ctx.arc(X(DS), (y1 + y2) / 2, (y2 - y1) / 2, -Math.PI / 2, Math.PI / 2); ctx.lineTo(X(pos) + 10, y2); }
    ctx.stroke(); ctx.restore();
    if (back) arrow(ctx, X(pos) + 24, y2, X(pos), y2, pc, 4); else if (out > 0.05) arrow(ctx, X(out) - 24, y1, X(out), y1, pc, 4);
    if (out > 0.4) text(ctx, fmt(out, 1) + ' km', X(out / 2), y1 - 22, pc, { align: 'center', weight: 600, size: 20 });
    if (gone - DS > 0.4) text(ctx, fmt(gone - DS, 1) + ' km', X((DS + pos) / 2), y2 + 24, pc, { align: 'center', weight: 600, size: 20 });
    text(ctx, 'distance traveled', 30, 358, PAL.ink, { size: 20 }); text(ctx, fmt(gone, 1) + ' km', 30, 388, pc, { weight: 600, size: 24 });
    /* the displacement: from home straight to where the car is now */
    const y3 = 466;
    dot(ctx, X(0), y3, pc, false, 10);
    if (pos > 0.03) arrow(ctx, X(0) + 10, y3, X(pos), y3, pc, 5);
    text(ctx, 'displacement', 30, 452, PAL.ink, { size: 20 }); text(ctx, 'Δx = ' + (pos > 0.03 ? signed(pos, 1) : '0') + ' km', 30, 482, pc, { weight: 600, size: 24 });
    topline(ctx, !done ? 'After ' + fmt(tau, 0) + ' min the car has driven ' + fmt(gone, 1) + ' km and is ' + fmt(pos, 1) + ' km from home.'
      : xf === 0 ? fmt(path, 1) + ' km driven in ' + fmt(T.v, 0) + ' min and the car is home again: average speed ' + fmt(sp, 1) + ' km/h, average velocity 0.'
      : fmt(path, 1) + ' km driven in ' + fmt(T.v, 0) + ' min, ending ' + fmt(xf, 1) + ' km from home: average speed ' + fmt(sp, 1) + ' km/h, average velocity ' + signed(vbar, 1) + ' km/h.');
    readout(d.readout, `\\text{average speed} = \\frac{\\text{distance traveled}}{\\kt} = \\frac{${fmt(path, 1)}\\ \\text{km}}{${fmt(hours, 2)}\\ \\text{h}} = ${fmt(sp, 1)}\\ \\text{km/h} \\\\ \\kvb = \\frac{\\kdx}{\\kt} = \\frac{${xf === 0 ? '0' : tx(signed(xf, 1))}\\ \\text{km}}{${fmt(hours, 2)}\\ \\text{h}} = ${xf === 0 ? '0' : tx(signed(vbar, 1))}\\ \\text{km/h}`);
  }
  F.hover(d.stage, () => [{ x: X(state().pos), y: G - 22, r: 50, name: 'the car' }, { x: 140, y: G - 60, r: 70, name: 'home' }, { x: 1283, y: G - 60, r: 90, name: 'the store' }]);
  /* 7.5 min of the trip to a second of play, so the 30 min trip takes 4 s and a quicker trip is seen to be quicker */
  register(d.fig, { update: (dt) => cy.step(dt, () => 7.5), draw });
})();

/* =====================================================================
   FIGURE 2.11: the trip drawn three ways, position, velocity and speed
   against time, stacked on one time axis as the book stacks them, with
   one time cursor through all three and the car on its road above. The
   speed each way and a stop at the store are the sliders; the book's
   model, 12 km/h each way and no stop, is the opening state. Finite
   motion, so it gets the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-trip-graphs', 900);
  /* speeds whose 3 km leg takes a round time: 0.30, 0.25, 0.20 and 0.15 h */
  const SP = [10, 12, 15, 20], sp = (c) => SP[Math.round(c.v)], kmh = (i) => SP[Math.round(i)] + ' km/h';
  const VO = ctl(d.controls, { label: '\\text{speed out}', cls: 'velocity', min: 0, max: 3, step: 1, value: 1, unit: 'km/h', fmt: kmh, onInput: reset, aria: 'speed on the way to the store' });
  const ST = ctl(d.controls, { label: '\\text{stop at the store}', cls: 'time', min: 0, max: 12, step: 3, value: 0, unit: 'min', dec: 0, onInput: reset, aria: 'time stopped at the store' });
  const VB = ctl(d.controls, { label: '\\text{speed back}', cls: 'velocity', key: 'velocity-2', min: 0, max: 3, step: 1, value: 1, unit: 'km/h', fmt: kmh, onInput: reset, aria: 'speed on the way home' });
  const DS = 3, legs = () => { const t1 = DS / sp(VO), ts = ST.v / 60, t2 = DS / sp(VB); return { t1, ts, t2, H: t1 + ts + t2 }; };
  const cy = cycle(() => legs().H, 1.2);
  function reset() { cy.reset(); }
  /* where the car is and how fast, at time u in hours */
  const at = (u) => { const { t1, ts } = legs(), vo = sp(VO), vb = sp(VB); return u < t1 ? { leg: 0, x: vo * u, v: vo } : u < t1 + ts ? { leg: 1, x: DS, v: 0 } : { leg: 2, x: Math.max(0, DS - vb * (u - t1 - ts)), v: -vb }; };
  /* Every scale is fixed from the slider ends: the longest trip is 0.30 + 0.20 + 0.30 = 0.80 h, the store is
     3 km away, and the fastest leg is 20 km/h, inside axes that reach 30 km/h. */
  const TMAX = 0.8, GL = 190, GR = 1250, RL = 330, RR = 1090, RX = (km) => RL + ((RR - RL) * km) / DS, G = 206;
  function draw() {
    const { ctx } = begin(d.c);
    const { t1, ts, t2, H } = legs(), vo = sp(VO), vb = sp(VB), th = cy.now(), done = th >= H - 1e-9, me = at(Math.min(th, H - 1e-9));
    const pc = C('position'), vc = C('velocity'), tc = C('time'), avg = (2 * DS) / H;
    /* the road, with the car on it */
    strip(ctx, RL - 58, RR + 58, G - 10, 34);
    F.house(ctx, 200, G, 100, 1, PAL.ink); F.shopfront(ctx, 1240, G, 150, 106, 'STORE', PAL.ink);
    text(ctx, 'home', 200, G + 24, PAL.muted, { size: 17, align: 'center' });
    const cx = RX(me.x), dir = me.leg === 2 ? -1 : 1;
    ctx.save(); ctx.translate(cx, 0); ctx.scale(dir, 1); car(ctx, 0, G - 20, F.ref('car'), 1.25); ctx.restore();
    if (done || me.leg === 1) text(ctx, 'v = 0', cx, G - 70, vc, { weight: 600, size: 20, align: 'center' });
    else { arrow(ctx, cx, G - 70, cx + me.v * 4, G - 70, vc, 5); label(ctx, 'v = ' + signed(me.v, 0) + ' km/h', cx + me.v * 4, G - 70, { side: dir > 0 ? 'right' : 'left', gap: 12, color: vc, size: 20, leader: false }); }
    /* the three graphs on one time axis */
    const P = axes(ctx, { l: GL, r: GR, t: 290, b: 410 }, [0, TMAX], [0, DS], { yl: 'x (km)', yc: pc, nx: 0, ny: 3 });
    const V = axes(ctx, { l: GL, r: GR, t: 470, b: 650 }, [0, TMAX], [-30, 30], { yl: 'v (km/h)', yc: vc, nx: 0, ny: 6 });
    const S = axes(ctx, { l: GL, r: GR, t: 710, b: 830 }, [0, TMAX], [0, 30], { xl: 't (h)', xc: tc, yl: 'speed (km/h)', yc: vc, nx: 8, ny: 3, fx: (v) => fmt(v, 1) });
    for (const A of [P, V]) for (let i = 1; i <= 8; i++) line(ctx, A.X(i / 10), A.box.t, A.X(i / 10), A.box.b, PAL.rule, 1.5);
    text(ctx, 'store', GR + 12, P.Y(DS), PAL.muted, { size: 17 }); text(ctx, 'home', GR + 12, P.Y(0), PAL.muted, { size: 17 });
    const a = t1, b = t1 + ts, X = P.X, seg = (A, u0, u1, v) => line(ctx, X(u0), A.Y(v), X(u1), A.Y(v), vc, 5), jump = (A, u, v0, v1) => { if (v0 !== v1) line(ctx, X(u), A.Y(v0), X(u), A.Y(v1), alpha(vc, 0.45), 2, [6, 6]); };
    /* position: out to the store, the stop, and home again */
    ctx.save(); ctx.strokeStyle = pc; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(X(0), P.Y(0)); ctx.lineTo(X(a), P.Y(DS)); ctx.lineTo(X(b), P.Y(DS)); ctx.lineTo(X(H), P.Y(0)); ctx.stroke(); ctx.restore();
    for (const [u, x] of [[0, 0], [a, DS], [b, DS], [H, 0]]) dot(ctx, X(u), P.Y(x), pc, true, 6);
    /* velocity: positive out, zero at the stop, negative back */
    seg(V, 0, a, vo); seg(V, b, H, -vb); if (ts > 0) { seg(V, a, b, 0); jump(V, a, vo, 0); jump(V, b, 0, -vb); } else jump(V, a, vo, -vb);
    for (const [u, v] of [[0, vo], [a, vo], [b, -vb], [H, -vb]]) dot(ctx, X(u), V.Y(v), vc, true, 6);
    text(ctx, '+' + vo + ' km/h', X(a / 2), V.Y(vo) - 20, vc, { align: 'center', weight: 600, size: 20 }); text(ctx, '−' + vb + ' km/h', X(b + t2 / 2), V.Y(-vb) + 22, vc, { align: 'center', weight: 600, size: 20 });
    /* speed: the velocity without its sign, and the average over the whole trip as a dashed level */
    seg(S, 0, a, vo); seg(S, b, H, vb); if (ts > 0) { seg(S, a, b, 0); jump(S, a, vo, 0); jump(S, b, 0, vb); } else jump(S, a, vo, vb);
    for (const [u, v] of [[0, vo], [a, vo], [b, vb], [H, vb]]) dot(ctx, X(u), S.Y(v), vc, true, 6);
    text(ctx, vo + ' km/h', X(a / 2), S.Y(vo) - 20, vc, { align: 'center', weight: 600, size: 20 }); text(ctx, vb + ' km/h', X(b + t2 / 2), S.Y(vb) - 20, vc, { align: 'center', weight: 600, size: 20 });
    line(ctx, X(0), S.Y(avg), X(H), S.Y(avg), vc, 3, [10, 10]);
    text(ctx, 'average speed ' + fmt(avg, 1) + ' km/h', Math.min(X(H) + 20, GR - 250), S.Y(avg) + 18, vc, { align: 'left', weight: 600, size: 20, bg: alpha(PAL.panel, 0.85) });
    /* this instant, on all three */
    const u = Math.min(th, H);
    line(ctx, X(u), P.box.t, X(u), S.box.b, alpha(tc, 0.7), 3, [4, 8]);
    for (const [A, v] of [[P, me.x], [V, done ? -vb : me.v], [S, Math.abs(done ? vb : me.v)]]) dot(ctx, X(u), A.Y(v), PAL.ink, true, 9);
    topline(ctx, done ? 'Home after ' + fmt(H, 2) + ' h: ' + fmt(2 * DS, 1) + ' km at an average speed of ' + fmt(avg, 1) + ' km/h, and an average velocity of 0.'
      : me.leg === 1 ? 'At ' + fmt(th, 2) + ' h the car is stopped at the store, ' + fmt(DS, 1) + ' km from home.'
      : 'At ' + fmt(th, 2) + ' h the car is ' + fmt(me.x, 1) + ' km from home, driving ' + (me.leg ? 'back' : 'out') + ' at ' + signed(me.v, 0) + ' km/h.');
    const [dxl, dtl, v] = me.leg === 0 ? [DS, t1, vo] : me.leg === 1 ? [0, ts, 0] : [-DS, t2, -vb], sv = v === 0 ? '0' : (v < 0 ? '{-}' : '+') + Math.abs(v);
    readout(d.readout, `\\kv = \\frac{\\kdx}{\\kdt} = \\frac{${dxl === 0 ? '0' : tx(signed(dxl, 1))}\\ \\text{km}}{${fmt(dtl, 2)}\\ \\text{h}} = ${sv}\\ \\text{km/h} \\\\ \\text{speed} = |\\kv| = |${sv}\\ \\text{km/h}| = ${Math.abs(v)}\\ \\text{km/h}`);
  }
  F.hover(d.stage, () => { const { H } = legs(); return [{ x: RX(at(Math.min(cy.now(), H - 1e-9)).x), y: G - 20, r: 46, name: 'the car' }, { x: 200, y: G - 50, r: 60, name: 'home' }, { x: 1240, y: G - 50, r: 80, name: 'the store' }]; });
  /* a tenth of an hour to a second of play: the book's half-hour trip takes 5 s */
  register(d.fig, { update: (dt) => cy.step(dt, () => 0.1), draw });
})();
};
