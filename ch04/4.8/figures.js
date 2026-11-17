/* Figures for section 4.8 Extended Topic: The Four Basic Forces—An Introduction.
   Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.8'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, choice, ctl, cycle, register, begin, line, arrow, dot, text, headline, hbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- small helpers shared by the figures ---------- */
const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const sup = (n) => String(n).split('').map((ch) => SUP[ch] ?? ch).join('');
const pow10 = (n) => '10' + sup(n);
const ease = (u) => 1 - Math.pow(1 - Math.max(0, Math.min(1, u)), 3);

/* =====================================================================
   SIM: the ladder of relative strengths. The four basic forces of Table
   4.1 are four marks on one logarithmic axis of relative strength, and a
   bracket counts the powers of ten between the two the reader picks. A
   comparison of four numbers has no time in it, so the figure registers
   no cycle and carries no transport.
===================================================================== */
(function () {
  const d = sim('sim-strengths', 490);
  const FORCE = [
    { name: 'gravitational', p: -38, tex: '10^{-38}' },
    { name: 'electromagnetic', p: -2, tex: '10^{-2}' },
    { name: 'weak nuclear', p: -6, tex: '10^{-6}' },
    { name: 'strong nuclear', p: 0, tex: '1' },
  ];
  const OPTS = FORCE.map((f, i) => ({ value: String(i), label: f.name }));
  /* it opens on the pair the text turns to next: electromagnetism against gravity */
  const A = F.select(d.controls, { label: '\\text{force A}', aria: 'the first force', options: OPTS, value: '1' });
  const B = F.select(d.controls, { label: '\\text{force B}', aria: 'the second force', options: OPTS, value: '0' });
  const LO = -40, L = 110, R = 1290, X = (p) => L + ((R - L) * (p - LO)) / -LO;
  const rowY = (i) => 128 + i * 56, YA = 356, YB = 434;
  const WORD = { 1: 'ten', 2: 'a hundred', 3: 'a thousand', 4: 'ten thousand', 6: 'a million' };
  function draw() {
    const { ctx } = begin(d.c);
    const a = +A.value, b = +B.value, fa = FORCE[a], fb = FORCE[b], e = fa.p - fb.p;
    /* the axis */
    line(ctx, X(LO), YA, X(0), YA, PAL.muted, 2);
    for (let p = LO; p <= 0; p += 2) {
      const big = p % 10 === 0;
      line(ctx, X(p), YA - (big ? 9 : 4), X(p), YA + (big ? 9 : 4), PAL.muted, 2);
      if (big) text(ctx, p === 0 ? '1' : pow10(p), X(p), YA + 28, PAL.muted, { size: 17, align: 'center' });
    }
    text(ctx, 'relative strength (strong nuclear force = 1)', X(-20), 468, PAL.muted, { size: 17, align: 'center' });
    /* one mark per force, standing over its own strength */
    FORCE.forEach((f, i) => {
      const y = rowY(i), w = Math.max(A.a(String(i)), B.a(String(i))), on = i === a || i === b;
      line(ctx, X(f.p), y, X(f.p), YA, alpha(PAL.ink, 0.18 + 0.5 * w), 2, on ? undefined : [4, 8]);
      dot(ctx, X(f.p), y, PAL.ink, on, 10);
      const right = f.p < -20;
      F.rich(ctx, right ? [[f.p === 0 ? '1' : pow10(f.p), on ? PAL.ink : PAL.muted, on ? 600 : 400], ['   ' + f.name + ' force', PAL.ink, on ? 600 : 400]]
        : [[f.name + ' force   ', PAL.ink, on ? 600 : 400], [f.p === 0 ? '1' : pow10(f.p), on ? PAL.ink : PAL.muted, on ? 600 : 400]],
      X(f.p) + (right ? 20 : -20), y, { align: right ? 'left' : 'right', size: 21, weight: on ? 600 : 400, bg: PAL.panel });
    });
    /* the bracket that counts the powers of ten between the two picked forces; its ends slide from the old pick to the new */
    const xa = A.mix((v) => X(FORCE[+v].p)), xb = B.mix((v) => X(FORCE[+v].p));
    if (a !== b) {
      const lo = Math.min(xa, xb), hi = Math.max(xa, xb);
      line(ctx, xa, YA + 12, xa, YB, PAL.ink, 2, [4, 8]);
      line(ctx, xb, YA + 12, xb, YB, PAL.ink, 2, [4, 8]);
      hbracket(ctx, lo, hi, YB, PAL.ink);
      const n = Math.abs(e), lab = n + (n === 1 ? ' power of ten' : ' powers of ten');
      const wide = hi - lo > F.measure(ctx, lab, { size: 21, weight: 600 }) + 40;
      text(ctx, lab, wide ? (lo + hi) / 2 : lo - 18, wide ? YB - 20 : YB, PAL.ink, { size: 21, weight: 600, align: wide ? 'center' : 'right', bg: PAL.panel });
    }
    const n = Math.abs(e), words = ': a 1 followed by ' + n + ' zeros';
    headline(ctx, a === b ? 'Pick two different forces to compare them'
      : e > 0 ? 'The ' + fa.name + ' force is ' + pow10(e) + ' times the ' + fb.name + ' force' + (n > 6 ? words : WORD[n] ? ', or ' + WORD[n] + ' times' : '')
        : 'The ' + fa.name + ' force is ' + pow10(e) + ' of the ' + fb.name + ' force' + (n > 6 ? ', ' + n + ' powers of ten weaker' : ''));
    readout(d.readout, `\\frac{\\text{${fa.name}}}{\\text{${fb.name}}} = \\frac{${fa.tex}}{${fb.tex}} = 10^{${fa.p} - (${fb.p})} = 10^{${e}}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 4.24: the electric force field. A positive charge and a
   negative charge fill the space around them with a field, and a test
   charge dragged anywhere in it feels a force along the field line
   through that point: with the line for a positive test charge, against
   it for a negative one. The field answers nothing but its own two
   charges, so the picture is still: no cycle, no transport.
===================================================================== */
(function () {
  const d = sim('sim-field', 640);
  const TX = ctl(d.controls, { label: '\\kx', cls: 'position', min: -3, max: 3, step: 0.05, value: 0.4, unit: 'm', dec: 2, aria: 'the test charge across the field' });
  const TY = ctl(d.controls, { label: '\\ky', cls: 'position', min: -1.25, max: 1.25, step: 0.05, value: 0.8, unit: 'm', dec: 2, aria: 'the test charge up the field' });
  const TQ = ctl(d.controls, { label: '\\kq', cls: 'charge', min: -4, max: 4, step: 0.5, value: 2, unit: 'nC', dec: 1, detents: [0], aria: 'the test charge' });
  const P = F.drag(d, { x: TX, y: TY });
  /* 200 units to the metre; the two charges are ±1.0 nC and stand 2.0 m apart */
  const S = 200, CX = 700, CY = 356, SEP = 1, XM = 3.3, YM = 1.35, K = 8.99;
  const px = (x) => CX + x * S, py = (y) => CY - y * S;
  const BOX = { l: px(-XM), r: px(XM), t: py(YM), b: py(-YM) };
  const AX = { X: px, Y: py, box: BOX, xr: [-XM, XM], yr: [-YM, YM] };
  /* the field of the two charges in N/C: 8.99 N/C one metre from 1.0 nC */
  function field(x, y) {
    const ax = x + SEP, bx = x - SEP;
    const r1 = Math.max(0.02, Math.hypot(ax, y)), r2 = Math.max(0.02, Math.hypot(bx, y));
    const c1 = K / (r1 * r1 * r1), c2 = K / (r2 * r2 * r2);
    return [ax * c1 - bx * c2, y * c1 - y * c2];
  }
  /* a field line followed from (x, y), with the field (dir 1) or against it (dir −1), until it meets a charge or leaves the drawing */
  function follow(x, y, dir) {
    const pts = [[x, y]];
    for (let i = 0; i < 1600; i++) {
      const [ex, ey] = field(x, y), m = Math.hypot(ex, ey) || 1e-9;
      x += (dir * ex / m) * 0.02; y += (dir * ey / m) * 0.02;
      pts.push([x, y]);
      if (Math.hypot(x - SEP, y) < 0.13 || Math.hypot(x + SEP, y) < 0.13) return { pts, met: true };
      if (Math.abs(x) > XM + 0.2 || Math.abs(y) > YM + 0.2) break;
    }
    return { pts, met: false };
  }
  /* sixteen lines leave the positive charge; those that leave the drawing have a mirror image arriving at the negative charge */
  const LINES = [];
  for (let k = 0; k < 16; k++) {
    const th = (k / 16) * Math.PI * 2, l = follow(-SEP + 0.13 * Math.cos(th), 0.13 * Math.sin(th), 1);
    LINES.push(l.pts);
    if (!l.met) LINES.push(l.pts.map(([x, y]) => [-x, y]).reverse());
  }
  const stroke = (ctx, pts, color, w) => {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.beginPath();
    pts.forEach(([ax, ay], i) => (i ? ctx.lineTo(px(ax), py(ay)) : ctx.moveTo(px(ax), py(ay))));
    ctx.stroke(); ctx.restore();
  };
  const head = (ctx, pts, f, color, w) => {
    /* the head sits on a chord of nine steps, long enough for the arrow to show */
    const i = Math.max(9, Math.min(pts.length - 1, Math.round(pts.length * f)));
    if (pts.length > 10) arrow(ctx, px(pts[i - 9][0]), py(pts[i - 9][1]), px(pts[i][0]), py(pts[i][1]), color, w);
  };
  let spots = [];
  F.hover(d.stage, () => spots);
  function draw() {
    const { ctx } = begin(d.c);
    const x = TX.v, y = TY.v, q = TQ.v;
    const d1 = Math.hypot(x + SEP, y), d2 = Math.hypot(x - SEP, y), near = Math.min(d1, d2) < 0.16;
    /* the field is rounded as the readout shows it, so the product on the line is the product of the numbers on it */
    const [ex, ey] = field(x, y), E0 = Math.hypot(ex, ey), E = +E0.toFixed(E0 < 100 ? 1 : 0), Fm = q * E;
    const guide = alpha(PAL.ink, 0.4);
    ctx.save();
    ctx.beginPath(); ctx.rect(BOX.l, BOX.t, BOX.r - BOX.l, BOX.b - BOX.t); ctx.clip();
    LINES.forEach((pts) => { stroke(ctx, pts, guide, 2.5); head(ctx, pts, 0.52, PAL.muted, 3); });
    /* the one line that runs through the test charge, both ways from it */
    if (!near) {
      const fw = follow(x, y, 1).pts, bw = follow(x, y, -1).pts, through = bw.slice().reverse().concat(fw.slice(1));
      stroke(ctx, through, PAL.ink, 4);
      if (bw.length > 30) head(ctx, bw.slice().reverse(), 0.5, PAL.ink, 4);
      if (fw.length > 30) head(ctx, fw, 0.6, PAL.ink, 4);
    }
    ctx.restore();
    /* the two charges that make the field */
    dot(ctx, px(-SEP), py(0), F.ref('positive-charge'), true, 24);
    dot(ctx, px(SEP), py(0), F.ref('negative-charge'), false, 24);
    text(ctx, '+', px(-SEP), py(0) - 1, PAL.panel, { size: 28, weight: 600, align: 'center' });
    text(ctx, '−', px(SEP), py(0) - 1, F.ref('negative-charge'), { size: 28, weight: 600, align: 'center' });
    const below = y > -0.1 ? 46 : -46;
    text(ctx, '+1.0 nC', px(-SEP), py(0) + below, F.ref('positive-charge'), { size: 19, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, '−1.0 nC', px(SEP), py(0) + below, F.ref('negative-charge'), { size: 19, weight: 600, align: 'center', bg: PAL.panel });
    /* the force on the test charge, 6 units to the nanonewton, cut short past 300 units */
    const ux = ex / (E0 || 1), uy = ey / (E0 || 1), sg = Math.sign(q);
    let tip = [px(x), py(y)], cut = false;
    if (!near && q !== 0) {
      /* the arrow stops short of the edge of the drawing as well */
      const dx = sg * ux, dy = -sg * uy, m = 34;
      const room = Math.min(dx > 0 ? (BOX.r - m - px(x)) / dx : dx < 0 ? (BOX.l + m - px(x)) / dx : 1e9, dy > 0 ? (BOX.b - m - py(y)) / dy : dy < 0 ? (BOX.t + m - py(y)) / dy : 1e9);
      const full = 6 * Math.abs(Fm), len = Math.max(0, Math.min(300, full, room));
      cut = len < full - 0.5;
      tip = [px(x) + sg * ux * len, py(y) - sg * uy * len];
      arrow(ctx, px(x), py(y), tip[0], tip[1], C('force'), 5);
      if (cut && len > 60) {
        /* two strokes across the shaft say the arrow is longer than it is drawn */
        [0.42, 0.5].forEach((k) => {
          const mx = px(x) + sg * ux * len * k, my = py(y) - sg * uy * len * k;
          line(ctx, mx - uy * 12 - ux * 5, my - ux * 12 + uy * 5, mx + uy * 12 + ux * 5, my + ux * 12 - uy * 5, PAL.panel, 9);
          line(ctx, mx - uy * 12 - ux * 5, my - ux * 12 + uy * 5, mx + uy * 12 + ux * 5, my + ux * 12 - uy * 5, C('force'), 3);
        });
      }
      const lx = Math.max(40, Math.min(1360, tip[0] + sg * ux * 24)), ly = Math.max(BOX.t + 14, Math.min(BOX.b - 14, tip[1] - sg * uy * 24));
      text(ctx, 'F', lx, ly, C('force'), { weight: 600, size: 24, align: 'center', bg: PAL.panel });
    }
    P.draw(ctx, AX, F.ref('test-charge'));
    dot(ctx, px(x), py(y), F.ref('test-charge'), true, 14);
    if (q !== 0) text(ctx, q > 0 ? '+' : '−', px(x), py(y) - 1, PAL.panel, { size: 22, weight: 600, align: 'center' });
    /* the charge's name sits on the side the force does not point to */
    let side = (sg || 1) * uy >= 0 ? 1 : -1;
    const clear = (sd) => [-SEP, SEP].every((cx) => Math.abs(px(x) - px(cx)) > 110 || Math.abs(py(y) + sd * 38 - (py(0) + below / 2)) > 52);
    if (!clear(side) && clear(-side)) side = -side;
    const ny = Math.max(BOX.t + 14, Math.min(BOX.b - 14, py(y) + side * 38));
    text(ctx, 'q = ' + (q > 0 ? '+' : '') + fmt(q, 1).replace('-', '−') + ' nC', Math.max(110, Math.min(1290, px(x))), ny, C('charge'), { size: 19, weight: 600, align: 'center', bg: PAL.panel });
    spots = [
      { x: px(-SEP), y: py(0), r: 26, name: 'the positive charge that makes the field' },
      { x: px(SEP), y: py(0), r: 26, name: 'the negative charge that makes the field' },
      { x: px(x), y: py(y), r: 18, name: 'the test charge: drag it' },
      { x: (px(x) + tip[0]) / 2, y: (py(y) + tip[1]) / 2, r: 22, name: cut ? 'the force on the test charge, drawn cut short' : 'the force on the test charge' },
    ];
    headline(ctx, near ? 'Right at a charge the field has no single direction'
      : q === 0 ? 'With no charge on it the test object feels no force, and the field is still there'
        : q > 0 ? 'The force on a positive test charge points along the field line through it'
          : 'The force on a negative test charge points against the field line through it');
    const m = (v, n) => fmt(v, n).replace('-', '−');
    readout(d.readout, `\\kF = \\kq\\kE = (${m(q, 1)}\\ \\text{nC})(${fmt(E, E < 100 ? 1 : 0)}\\ \\text{N/C}) = ${m(Fm, Math.abs(Fm) < 100 ? 1 : 0)}\\ \\text{nN}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 4.25: the exchange of a particle. Two people pass a basketball
   and are pushed apart by it, or one pulls it from the other and they are
   drawn together; below them a proton and a neutron exchange a meson in
   the same way. An exchange takes time, so the figure runs a finite loop
   and gets the transport.
===================================================================== */
(function () {
  const d = sim('sim-exchange', 570);
  const MODE = choice(d.controls, { label: '\\text{the ball is}', aria: 'how the ball is exchanged', value: 'throw', onInput: reset,
    options: [{ value: 'throw', label: 'thrown and caught' }, { value: 'pull', label: 'pulled away' }] });
  const FA = ctl(d.controls, { label: '\\kF', cls: 'force', min: 50, max: 200, step: 10, value: 100, unit: 'N', dec: 0, onInput: reset, aria: 'the force of the exchange' });
  /* the throw lasts from T1 to T2, the flight to T3, the catch to T4 */
  const T = 4.6, T1 = 0.3, T2 = 1.1, T3 = 2.9, T4 = 3.7;
  const cy = cycle(() => T, 1.2);
  function reset() { cy.reset(); }
  const PS = 1.25, GY = 340, NY = 490, BR = 20;
  const u01 = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
  /* a basketball centred on (x, y) */
  function ball(ctx, x, y, color) {
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = color; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(x, y, BR, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - BR, y); ctx.lineTo(x + BR, y); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x, y, BR * 0.42, BR, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }
  /* a force arrow of 0.8 units to the newton with its name above it, faded by k */
  function force(ctx, x1, y, dirn, f, name, k) {
    if (k <= 0) return;
    F.faded(ctx, k, [0, 0], () => {
      arrow(ctx, x1, y, x1 + dirn * 0.8 * f, y, C('force'), 5);
      text(ctx, name, x1 + dirn * 0.4 * f, y - 24, C('force'), { weight: 600, size: 22, align: 'center' });
    });
  }
  const body = (ctx, x, face, color, hold) => F.silhouette(ctx, { x, y: GY, s: PS, face, pose: 'stand', color,
    hands: hold ? [{ x: face * (hold[0] - x) / PS - 4, y: (hold[1] - GY) / PS + 7 }, { x: face * (hold[0] - x) / PS - 4, y: (hold[1] - GY) / PS - 7 }] : [{ x: 34, y: -112 }, { x: 30, y: -104 }], elbowSide: 1 });
  let spots = [];
  F.hover(d.stage, () => spots);
  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), f = FA.v, pull = MODE.value === 'pull';
    const HY = GY - 108 * PS;                                  /* the height the ball is held at */
    let xa, xb, bx, by = HY, mx, hold1 = null, hold2 = null, x0a, x0b, said;
    const shown = (a, b) => (t < a ? 0 : t <= b ? 1 : 1 - u01(t, b, b + 0.5));
    if (!pull) {
      x0a = 430; x0b = 970;
      const back = 0.5 * f;                                    /* how far one push carries a person, in units */
      xa = x0a - back * ease(u01(t, T1, T1 + 1.4)); xb = x0b + back * ease(u01(t, T3, T3 + 1.4));
      const rel = xa + 78, got = xb - 78;                      /* where the ball leaves the hands and where it is met */
      if (t < T2) { const k = u01(t, T1, T2); bx = xa + 54 + 24 * k * k; hold1 = [bx - BR, by]; }
      else if (t < T3) { const k = u01(t, T2, T3); bx = rel + (got - rel) * k; by = HY - 46 * Math.sin(Math.PI * k); }
      else { const k = u01(t, T3, T4); bx = got + 24 * (1 - (1 - k) * (1 - k)); hold2 = [bx + BR, by]; }
      mx = xa + 34 + (xb - xa - 68) * u01(t, T2, T3);
      said = t < T1 ? 'Person 1 is about to throw the ball to person 2'
        : t < T2 ? 'Pushing the ball forward with ' + fmt(f, 0) + ' N, person 1 is pushed back with ' + fmt(f, 0) + ' N'
          : t < T3 ? 'The ball crosses, and nothing else passes between the two'
            : t < T4 ? 'Stopping the ball with ' + fmt(f, 0) + ' N, person 2 is pushed back with ' + fmt(f, 0) + ' N'
              : 'One exchange has pushed the two apart, though they never touched';
    } else {
      x0a = 700 - 96; x0b = 700 + 96;
      const k = ease(u01(t, T1, T4)), inw = 0.15 * f * k;
      xa = x0a + inw; xb = x0b - inw; bx = 700;
      hold1 = [bx - BR, by]; hold2 = [bx + BR, by];
      mx = xa + 34 + (xb - xa - 68) * u01(t, T1, T4);
      said = t < T1 ? 'Both hold the ball: person 1 keeps hold as person 2 starts to pull'
        : t < T4 ? 'Person 2 pulls the ball away and person 1 holds on, so the ball pulls each toward the other with ' + fmt(f, 0) + ' N'
          : 'One exchange has drawn the two together';
    }
    /* the people on their ground line, a hollow mark where each began */
    text(ctx, pull ? 'A basketball pulled from one person by the other' : 'A basketball thrown by one person and caught by the other', 50, 104, PAL.muted, { size: 19 });
    line(ctx, 60, GY, 1340, GY, PAL.rule, 3);
    if (Math.abs(xa - x0a) > 16) { dot(ctx, x0a, GY, PAL.muted, false, 7); dot(ctx, x0b, GY, PAL.muted, false, 7); }
    body(ctx, xa, 1, F.ref('thrower'), hold1);
    body(ctx, xb, -1, F.ref('catcher'), hold2);
    ball(ctx, bx, by, PAL.ink);
    text(ctx, '1', xa, GY + 24, F.ref('thrower'), { size: 21, weight: 600, align: 'center' });
    text(ctx, '2', xb, GY + 24, F.ref('catcher'), { size: 21, weight: 600, align: 'center' });
    const fy = GY - 62 * PS;
    if (!pull) {
      force(ctx, xa - 24, fy, -1, f, 'F_B', shown(T1, T2));
      if (t >= T1 && t < T2) force(ctx, bx + BR + 6, by, 1, f, 'F_{p1}', 1);
      force(ctx, xb + 24, fy, 1, f, 'F′_B', shown(T3, T4));
      if (t >= T3 && t < T4) force(ctx, bx - BR - 6, by, -1, f, 'F_{p2}', 1);
    } else {
      /* drawn behind each person, the head at the body, so the two arrows never cross in the gap */
      force(ctx, xa - 24 - 0.8 * f, fy, 1, f, 'F_B', shown(T1, T4));
      force(ctx, xb + 24 + 0.8 * f, fy, -1, f, 'F′_B', shown(T1, T4));
    }
    /* the proton and the neutron, doing the same thing with a meson */
    text(ctx, 'A meson exchanged between a proton and a neutron', 50, NY - 76, PAL.muted, { size: 19 });
    if (Math.abs(xa - x0a) > 2) { dot(ctx, x0a, NY, PAL.muted, false, 30); dot(ctx, x0b, NY, PAL.muted, false, 30); }
    dot(ctx, xa, NY, F.el('p+'), true, 30); dot(ctx, xb, NY, F.el('n0'), true, 30);
    text(ctx, 'p', xa, NY - 1, PAL.panel, { size: 24, weight: 600, align: 'center' });
    text(ctx, 'n', xb, NY - 1, PAL.panel, { size: 24, weight: 600, align: 'center' });
    dot(ctx, mx, NY, PAL.ink, true, 9);
    if (!pull) {
      if (t >= T2 && t < T3) text(ctx, 'exchange meson', mx, NY - 28, PAL.muted, { size: 17, align: 'center' });
      force(ctx, xa - 38, NY, -1, f, 'F_{exch}', shown(T1, T2));
      force(ctx, xb + 38, NY, 1, f, 'F′_{exch}', shown(T3, T4));
    } else {
      force(ctx, xa - 38 - 0.8 * f, NY, 1, f, 'F_{exch}', shown(T1, T4));
      force(ctx, xb + 38 + 0.8 * f, NY, -1, f, 'F′_{exch}', shown(T1, T4));
    }
    spots = [
      { x: xa, y: GY - 90, r: 60, name: 'person 1' }, { x: xb, y: GY - 90, r: 60, name: 'person 2' },
      { x: bx, y: by, r: 24, name: 'the basketball' },
      { x: x0a, y: GY, r: 12, name: 'where person 1 began' }, { x: x0b, y: GY, r: 12, name: 'where person 2 began' },
      { x: xa, y: NY, r: 32, name: 'the proton' }, { x: xb, y: NY, r: 32, name: 'the neutron' }, { x: mx, y: NY, r: 14, name: 'the meson they exchange' },
      { x: x0a, y: NY, r: 32, name: 'where the proton began' }, { x: x0b, y: NY, r: 32, name: 'where the neutron began' },
      
    ];
    headline(ctx, said);
    const N = `${fmt(f, 0)}\\ \\text{N}`;
    readout(d.readout, pull ? `\\kF_{\\text{B}} = \\kF'_{\\text{B}} = ${N}`
      : t < T3 ? `\\kF_{\\text{B}} = \\kF_{\\text{p1}} = ${N}` : `\\kF'_{\\text{B}} = \\kF_{\\text{p2}} = ${N}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T / 5), draw });
})();
};
