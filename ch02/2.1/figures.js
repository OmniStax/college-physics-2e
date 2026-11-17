/* Figures for section 2.1 Displacement. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.1'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, scale, person, rich, measure } = F;
const sim = (id, H) => F.sim(root, id, H);
const sgn = (n, d) => (n > 0 ? '+' : n < 0 ? '−' : '') + fmt(Math.abs(n), d);

/* A bicycle in side view, facing dir (+1 right, -1 left), its wheels on the ground line y, and its
   rider, F.silhouette in the sit pose with the hips on the saddle, the hands on the bars and the
   feet on the pedals. Both are set in the silhouette's own 150-unit frame scaled by s, with the
   bottom bracket at the origin, so the body and the machine keep one proportion: wheels of
   radius 30, a wheelbase of 88 and cranks of 15, a 1.75 m rider against a 1 m wheelbase. crank
   is the pedals' angle; the wheels turn 2.2 times as fast. Its footprint at s = 1 is about 150
   long and 147 tall. A candidate for figlib as F.bicycle, beside F.motorcycle. */
const BIKE = { r: 30, rear: [-36, -6], front: [52, -6], seat: [-14, -48], head: [40, -50], low: [44, -34], saddle: [-17, -57], bar: [48, -60], crank: 15 };
function bicycle(ctx, x, y, s, dir, crank, frame, rider) {
  const B = BIKE, oy = y - (B.r + B.rear[1]) * s, wheel = crank * 2.2;
  const pedal = (a) => ({ x: B.crank * Math.cos(a), y: B.crank * Math.sin(a) });
  ctx.save(); ctx.translate(x, oy); ctx.scale(s * dir, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = frame;
  /* the wheels: a rim over three spokes that end inside it, and a hub */
  for (const [hx, hy] of [B.rear, B.front]) {
    ctx.lineWidth = 1.5; ctx.beginPath();
    for (let k = 0; k < 3; k++) { const t = wheel + (k * 2 * Math.PI) / 3; ctx.moveTo(hx - (B.r - 3) * Math.cos(t), hy - (B.r - 3) * Math.sin(t)); ctx.lineTo(hx + (B.r - 3) * Math.cos(t), hy + (B.r - 3) * Math.sin(t)); }
    ctx.stroke(); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(hx, hy, B.r, 0, 2 * Math.PI); ctx.stroke();
  }
  /* the far pedal and its crank sit behind the frame */
  const p0 = pedal(crank), p1 = pedal(crank + Math.PI);
  ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(p1.x, p1.y); ctx.moveTo(p1.x - 5, p1.y); ctx.lineTo(p1.x + 5, p1.y); ctx.stroke();
  /* the frame: chain and seat stays to the rear hub, the seat, top and down tubes, the fork */
  ctx.lineWidth = 3.5; ctx.beginPath();
  ctx.moveTo(...B.rear); ctx.lineTo(0, 0); ctx.lineTo(...B.seat); ctx.lineTo(...B.rear);
  ctx.moveTo(0, 0); ctx.lineTo(...B.low); ctx.lineTo(...B.head); ctx.lineTo(...B.seat); ctx.lineTo(B.saddle[0], B.saddle[1] + 4);
  ctx.moveTo(...B.low); ctx.lineTo(...B.front); ctx.moveTo(...B.head); ctx.lineTo(B.head[0] + 2, B.bar[1]); ctx.lineTo(...B.bar);
  ctx.stroke();
  /* the saddle */
  ctx.fillStyle = frame; ctx.beginPath(); ctx.moveTo(B.saddle[0] - 9, B.saddle[1] + 1); ctx.quadraticCurveTo(B.saddle[0], B.saddle[1] - 4, B.saddle[0] + 9, B.saddle[1] + 2); ctx.lineTo(B.saddle[0] - 9, B.saddle[1] + 4); ctx.closePath(); ctx.fill();
  ctx.restore();
  F.silhouette(ctx, { x, y: oy, s, face: dir, pose: 'sit', color: rider,
    hip: { x: B.saddle[0], y: B.saddle[1] - 2 }, shoulder: { x: 6, y: -98 }, head: { x: 16, y: -117 },
    feet: [p0, p1], hands: [{ x: B.bar[0], y: B.bar[1] }, { x: B.bar[0] - 2, y: B.bar[1] + 1 }], kneeSide: -1, elbowSide: 1 });
  /* the near crank and pedal, over the near foot's heel */
  ctx.save(); ctx.translate(x, oy); ctx.scale(s * dir, s); ctx.lineCap = 'round'; ctx.strokeStyle = frame; ctx.fillStyle = frame;
  ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(p0.x, p0.y); ctx.moveTo(p0.x - 5, p0.y); ctx.lineTo(p0.x + 5, p0.y); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 4.5, 0, 2 * Math.PI); ctx.fill();
  ctx.restore();
}

/* a displacement arrow with its name: the words in ink and only the value in the position hue, the
   line centred on cx and kept between lo and hi; an arrow too short to draw leaves the value alone */
function named(ctx, words, value, cx, y, lo, hi) {
  const w = measure(ctx, words, { size: 22 }) + measure(ctx, value, { size: 22, weight: 600 });
  rich(ctx, [words, [value, C('position')]], Math.min(Math.max(cx, lo + w / 2), hi - w / 2), y, { size: 22, align: 'center', bg: alpha(PAL.panel, 0.85) });
}

/* =====================================================================
   FIGURE 2.4: one walk, two reference frames. The passenger walks from
   his seat at 6.0 m to the back of the cabin at 2.0 m on the airplane's
   own axis, the book's numbers, while the airplane rolls forward along
   the ground. His displacement is read twice with the same definition,
   on the axis fixed to the airplane and on the axis fixed to the ground.
   One scale for both axes and for the bodies: 59 units to the metre, the
   ground axis a fixed −2.5 to 18 m, which holds the fuselage (2 m of tail
   and 1.6 m of nose round an 8 m cabin) at the slider's greatest 8 m.
===================================================================== */
(function () {
  const d = sim('sim-displacement', 545);
  const X0 = 6, XF = 2, T = 5;                                  // the walk on the airplane's axis; one loop lasts 5 s
  const roll = ctl(d.controls, { label: '\\text{the airplane rolls forward}', cls: 'position', key: 'roll', min: 0, max: 8, step: 0.5, value: 6, unit: 'm', dec: 1, onInput: reset, aria: 'how far the airplane rolls forward during the walk', detents: [{ v: 0, label: 'parked' }, { v: 4, label: 'as far as he walks' }] });
  const cy = cycle(() => T, 1.6);
  function reset() { cy.reset(); }
  const M = 59, X = (g) => 95 + M * (g + 2.5);
  const top = 150, floor = 300, ay = 326, belly = 372, ground = 400, gy = 478;
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const k = cy.now() / T, off = roll.v * k, c = X0 + (XF - X0) * k;   // the airplane's shift and his place in the cabin
    const x = (cab) => X(off + cab);
    const pos = C('position'), body = F.ref('passenger');
    /* the ground and its axis, fixed to Earth */
    line(ctx, 40, ground, 1360, ground, PAL.muted, 3); scale(ctx, X, 0, 18, 1, ground, 'm', 2);
    /* the airplane: tail fin, fuselage and nose, on two wheels that turn as it rolls */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x(-1.1), belly); ctx.lineTo(x(8.5), belly);
    ctx.quadraticCurveTo(x(9.6), belly, x(9.6), 262); ctx.quadraticCurveTo(x(9.5), 136, x(8.2), 136);
    ctx.lineTo(x(-0.5), 136); ctx.lineTo(x(-1.25), 98); ctx.lineTo(x(-2), 98); ctx.lineTo(x(-1.85), 196);
    ctx.quadraticCurveTo(x(-1.9), 330, x(-1.1), belly); ctx.closePath(); ctx.fill(); ctx.stroke();
    /* the cabin, cut open: its wall with a row of windows, and the seats, facing the nose */
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.rule; ctx.lineWidth = 2; ctx.fillRect(x(0), top, 8 * M, floor - top); ctx.strokeRect(x(0), top, 8 * M, floor - top);
    for (let w = 0.5; w < 8; w += 1) { ctx.beginPath(); ctx.roundRect(x(w) - 13, 196, 26, 34, 9); ctx.fillStyle = PAL.soft; ctx.fill(); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(x(8.55), 196); ctx.lineTo(x(9.1), 196); ctx.lineTo(x(9.4), 232); ctx.lineTo(x(8.55), 232); ctx.closePath(); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.stroke();
    ctx.strokeStyle = PAL.rule; ctx.lineCap = 'round';
    for (const s of [3.6, 4.8, 6, 7.2]) {
      ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x(s) - 24, floor - 80); ctx.lineTo(x(s) - 15, floor - 30); ctx.lineTo(x(s) + 16, floor - 30); ctx.stroke();
      ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x(s), floor - 26); ctx.lineTo(x(s), floor - 2); ctx.stroke();
    }
    ctx.restore();
    line(ctx, x(0), floor, x(8), floor, PAL.muted, 3);
    for (const w of [0.8, 7.6]) {
      const a = off * M / 16;
      ctx.save(); ctx.fillStyle = PAL.muted; ctx.beginPath(); ctx.arc(x(w), ground - 16, 16, 0, 2 * Math.PI); ctx.fill();
      ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.arc(x(w), ground - 16, 6, 0, 2 * Math.PI); ctx.fill(); ctx.restore();
      line(ctx, x(w) - 13 * Math.cos(a), ground - 16 - 13 * Math.sin(a), x(w) + 13 * Math.cos(a), ground - 16 + 13 * Math.sin(a), PAL.panel, 3);
    }
    /* the airplane's own axis, carried along under the cabin floor */
    line(ctx, x(0) - 14, ay, x(8) + 14, ay, PAL.muted, 3); scale(ctx, x, 0, 8, 1, ay, 'm', 2);
    /* the passenger: a faint trace by his seat, and the man himself walking toward the rear */
    ctx.save(); ctx.globalAlpha = 0.3; person(ctx, x(X0), floor, body, { face: -1, s: 1.1 }); ctx.restore();
    person(ctx, x(c), floor, body, { face: -1, s: 1.1, phase: k > 0 && k < 1 ? (X0 - c) * 4.5 + 0.01 : 0 });
    /* his place dropped onto both axes, and where he started on each */
    line(ctx, x(c), floor, x(c), gy, pos, 2, [4, 8]); line(ctx, X(X0), ground, X(X0), gy, pos, 2, [4, 8]);
    dot(ctx, x(X0), ay, pos, false, 10); dot(ctx, x(c), ay, pos, true, 10);
    dot(ctx, X(X0), ground, pos, false, 10); dot(ctx, x(c), ground, pos, true, 10);
    /* the two displacements: on the airplane's axis at chest height in the cabin, on the ground's below it */
    const da = c - X0, de = off + c - X0, show = (v) => (Math.abs(v) < 0.05 ? '0.0' : sgn(v, 1));
    arrow(ctx, x(X0), floor - 64, x(c), floor - 64, pos, 5);
    named(ctx, 'relative to the airplane  ', 'Δx = ' + show(da) + ' m', (x(X0) + x(c)) / 2, 173, x(0) + 8, x(8) - 8);
    arrow(ctx, X(X0), gy, x(c), gy, pos, 5);
    named(ctx, 'relative to Earth  ', 'Δx = ' + show(de) + ' m', (X(X0) + x(c)) / 2, gy + 34, 30, 1370);
    hits = [
      { x: x(c), y: floor - 55, r: 60, name: 'the passenger' },
      { x: x(X0), y: floor - 55, r: 50, name: 'the passenger at his seat, where he started' },
      { x: x(4), y: ay + 12, r: 34, name: 'position along the airplane' },
      { x: X(13), y: ground + 14, r: 34, name: 'position along the ground' },
      { x: x(0.8), y: ground - 16, r: 20, name: 'wheel' }, { x: x(7.6), y: ground - 16, r: 20, name: 'wheel' },
    ];
    const end = roll.v + XF - X0, far = fmt(roll.v, 1) + ' m';
    topline(ctx, roll.v === 0
      ? 'The airplane is parked, so the passenger’s displacement is −4.0 m relative to the airplane and relative to Earth.'
      : 'The passenger walks 4.0 m toward the rear while the airplane rolls ' + far + ' forward, so relative to Earth he ends '
        + (Math.abs(end) < 0.05 ? 'where he started.' : fmt(Math.abs(end), 1) + ' m ' + (end > 0 ? 'ahead of' : 'behind') + ' where he started.'));
    const xfE = XF + roll.v, dE = xfE - X0;
    tex(d.readout, `\\text{relative to the airplane: }\\kdx = \\kxf - \\kxo = 2.0\\ \\text{m} - 6.0\\ \\text{m} = -4.0\\ \\text{m} \\\\ \\text{relative to Earth: }\\kdx = \\kxf - \\kxo = ${fmt(xfE, 1)}\\ \\text{m} - 6.0\\ \\text{m} = ${dE > 0 ? '+' : ''}${fmt(dE, 1)}\\ \\text{m}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 2.5: distance traveled against displacement. The cyclist of
   Check Your Understanding rides 0 → −3 → −1 km along the axis itself.
   The count of distance traveled rides above the cyclist and only ever
   grows; the two legs stack under the axis as the book stacks them; the
   displacement, under the legs, runs from the start to wherever the
   cyclist is, so it grows on the way out and shrinks on the way back.
   The axis is a fixed −5 to 5 km, the range of the three sliders.
===================================================================== */
(function () {
  const d = sim('sim-path', 596);
  const x0 = ctl(d.controls, { label: '\\kxo', cls: 'position', min: -5, max: 5, step: 0.5, value: 0, unit: 'km', dec: 1, onInput: reset });
  const xt = ctl(d.controls, { label: '\\kx_{\\text{turn}}', cls: 'position', min: -5, max: 5, step: 0.5, value: -3, unit: 'km', dec: 1, onInput: reset, aria: 'turning point' });
  const xf = ctl(d.controls, { label: '\\kxf', cls: 'position', min: -5, max: 5, step: 0.5, value: -1, unit: 'km', dec: 1, onInput: reset, aria: 'final position' });
  const leg1 = () => Math.abs(xt.v - x0.v), leg2 = () => Math.abs(xf.v - xt.v), total = () => leg1() + leg2();
  const T = () => Math.max(1.5, total() * 0.8);
  const cy = cycle(T, 1.6);
  function reset() { cy.reset(); }
  const L = 120, R = 1280, y = 290, X = (m) => L + (R - L) * (m + 5) / 10;
  const y1 = 414, y2 = 454, yd = 528;                      // leg 1, leg 2 and the displacement, top to bottom
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const pos = C('position'), s = total() * cy.now() / T();   // s = path length covered so far
    const s1 = Math.min(s, leg1()), s2 = Math.max(0, s - leg1());
    const d1 = Math.sign(xt.v - x0.v), d2 = Math.sign(xf.v - xt.v);
    const onLeg2 = s > leg1() + 1e-6 || leg1() === 0, px = onLeg2 ? xt.v + d2 * s2 : x0.v + d1 * s1;
    const dir = (onLeg2 ? d2 || d1 : d1 || d2) || 1;
    /* the road is the axis, east positive as the book's compass has it */
    line(ctx, L - 60, y, R + 60, y, PAL.muted, 3); scale(ctx, X, -5, 5, 1, y, 'km', 1);
    text(ctx, 'west (−)', 16, y - 26, PAL.muted, { size: 17 }); text(ctx, 'east (+)', 1384, y - 26, PAL.muted, { size: 17, align: 'right' });
    /* start and finish dropped to the displacement's row, under everything else */
    line(ctx, X(x0.v), y + 84, X(x0.v), yd, pos, 2, [4, 8]); if (s >= total() - 1e-6) line(ctx, X(xf.v), y + 84, X(xf.v), yd, pos, 2, [4, 8]);
    /* the path's two legs, each on its own row: a faint track, the arrow drawn as far as the ride has got */
    const gap = Math.abs(X(xt.v) - X(x0.v)) < 150 ? -1 : 0;
    if (leg1() > 0) {
      line(ctx, X(x0.v), y1, X(xt.v), y1, PAL.rule, 4); if (s1 > 0.05) arrow(ctx, X(x0.v), y1, X(x0.v + d1 * s1), y1, pos, 4);
      named(ctx, '', 'Δx_1 = ' + sgn(xt.v - x0.v, 1) + ' km', (X(x0.v) + X(xt.v)) / 2, y1 - 30, 16, 1384);
    }
    if (leg2() > 0) {
      line(ctx, X(xt.v), y2, X(xf.v), y2, PAL.rule, 4); line(ctx, X(xt.v), y1, X(xt.v), y2, PAL.rule, 4);
      if (s2 > 0.05) arrow(ctx, X(xt.v), y2, X(xt.v + d2 * s2), y2, pos, 4);
      named(ctx, '', 'Δx_2 = ' + sgn(xf.v - xt.v, 1) + ' km', (X(xt.v) + X(xf.v)) / 2, y2 + 30, 16, 1384);
    }
    /* start and finish on the axis */
    dot(ctx, X(x0.v), y, pos, false, 11); dot(ctx, X(xf.v), y, pos, true, 11);
    const apart = Math.abs(X(xf.v) - X(x0.v)) > 60;
    text(ctx, 'x_0', X(x0.v) + (apart ? 0 : -24), y + 64, pos, { align: 'center', weight: 600, size: 24 });
    text(ctx, 'x_f', X(xf.v) + (apart ? 0 : 24), y + 64, pos, { align: 'center', weight: 600, size: 24 });
    /* the displacement so far, from the start to the cyclist */
    const dx = px - x0.v, show = (v) => (Math.abs(v) < 0.05 ? '0.0' : sgn(v, 1));
    arrow(ctx, X(x0.v), yd, X(px), yd, pos, 7);
    named(ctx, 'displacement  ', 'Δx = ' + show(dx) + ' km', (X(x0.v) + X(px)) / 2, yd + 36, 16, 1384);
    /* the cyclist, and the count of distance traveled riding above */
    bicycle(ctx, X(px), y, 0.85, dir, s * 15, PAL.ink, F.ref('cyclist'));
    named(ctx, 'distance traveled  ', fmt(s, 1) + ' km', X(px), y - 150, 16, 1384);
    hits = [{ x: X(px), y: y - 60, r: 60, name: 'the cyclist' }, { x: X(xt.v), y: (y1 + y2) / 2, r: 26, name: 'the turning point' }];
    /* A ride that never doubles back is a straight run, so the path length and the magnitude of
       the displacement are the same number and the headline says why. */
    const D = xf.v - x0.v, straight = (xt.v - x0.v) * (xf.v - xt.v) >= 0;
    topline(ctx, total() < 0.25
      ? 'The cyclist never leaves the start, so the distance traveled and the displacement are both zero.'
      : straight
      ? 'The cyclist never turns back, so the ' + fmt(total(), 1) + ' km traveled is also the magnitude of the ' + sgn(D, 1) + ' km displacement.'
      : 'The cyclist travels ' + fmt(total(), 1) + ' km, but ' + (Math.abs(D) < 0.05 ? 'ends at the start, so the displacement is zero.' : 'the displacement is only ' + sgn(D, 1) + ' km, whose magnitude is ' + fmt(Math.abs(D), 1) + ' km.'));
    const km = (v) => `${v < 0 ? '-' : ''}${fmt(Math.abs(v), 1)}\\ \\text{km}`, neg = (v) => (v < 0 ? `(${km(v)})` : km(v));
    tex(d.readout, `\\kdx = \\kxf - \\kxo = ${km(xf.v)} - ${neg(x0.v)} = ${D > 0 ? '+' : ''}${km(D)} \\\\ \\text{distance traveled} = |\\kdx_1| + |\\kdx_2| = ${km(leg1())} + ${km(leg2())} = ${km(total())}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 3: the book's four paths for the problems. A figure that serves
   exercises is a faithful copy (rule 14): no sliders, no motion and no
   transport, and all four paths stand drawn at once so a problem about
   path C can be read without waiting for a cycle to come round to it.
   Against the book's small image it adds a tick at every metre and a
   drop line from every start, turn and finish, so each number a problem
   needs is read off the axis and not judged between two ticks.
===================================================================== */
(function () {
  const d = sim('fig-paths', 500);
  const PATHS = [{ n: 'A', p: [0, 7] }, { n: 'B', p: [12, 7] }, { n: 'C', p: [2, 10, 8, 11] }, { n: 'D', p: [9, 3, 5] }];
  const rows = [70, 130, 205, 305];                        // top row of each path
  function draw() {
    const { ctx } = begin(d.c);
    const L = 150, R = 1250, y = 400; const X = (m) => L + (R - L) * m / 12;   // the axis is the problems' own 0 to 12 m
    const pos = C('position');
    PATHS.forEach((P, i) => {
      const row = rows[i], last = P.p.length - 1;
      /* every start, turn and finish dropped to the axis, faint, under the paths */
      P.p.forEach((m, j) => line(ctx, X(m), row + Math.max(0, Math.min(j, last) - (j === last ? 1 : 0)) * 22, X(m), y, alpha(pos, 0.45), 2, [4, 8]));
    });
    line(ctx, L - 30, y, R + 30, y, PAL.ink, 3); scale(ctx, X, 0, 12, 1, y, '', 1);
    text(ctx, 'position x (m)', (L + R) / 2, y + 66, pos, { align: 'center', weight: 600, size: 24 });
    PATHS.forEach((P, i) => {
      const row = rows[i], last = P.p.length - 1;
      text(ctx, P.n, X(P.p[0]) + (P.p[1] > P.p[0] ? -36 : 36), row, PAL.ink, { align: 'center', weight: 600, size: 26 });
      for (let j = 1; j < P.p.length; j++) {
        const from = P.p[j - 1], to = P.p[j]; const ry = row + (j - 1) * 22;
        if (j > 1) line(ctx, X(from), ry - 22, X(from), ry, pos, 4);
        arrow(ctx, X(from), ry, X(to), ry, pos, 5);
      }
      dot(ctx, X(P.p[0]), row, pos, false, 9);
      dot(ctx, X(P.p[last]), row + (last - 1) * 22, pos, true, 9);
    });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
