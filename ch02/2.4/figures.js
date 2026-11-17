/* Figures for section 2.4 Acceleration. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.4'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, headline, hbracket, vbracket, strip, scale, axes, nice, curve, car, topline, labeller, LW, FONT } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- small helpers shared by the figures ---------- */
const TAU = Math.PI * 2;
/* a number with a real minus sign for the canvas, and with an explicit plus when asked */
const num = (x, d) => (x < 0 && Math.abs(x) >= Math.pow(10, -d) / 2 ? '−' : '') + fmt(Math.abs(x), d);
const signed = (x, d) => (x > 0 && Math.abs(x) >= Math.pow(10, -d) / 2 ? '+' : '') + num(x, d);
/* the same number for KaTeX, where the hyphen is the minus */
const tnum = (x, d) => fmt(x, d);
const tsigned = (x, d) => (x > 0 && Math.abs(x) >= Math.pow(10, -d) / 2 ? '+' : '') + fmt(x, d);
/* three significant figures, as the book prints an acceleration, with a real minus sign for the canvas and a hyphen for KaTeX */
const tsig3 = (x) => String(Number(x.toPrecision(3)));
const sig3 = (x) => tsig3(x).replace('-', '−');
const sig3s = (x) => (x > 0 ? '+' : '') + sig3(x);
const tsig3s = (x) => (x > 0 ? '+' : '') + tsig3(x);
/* a symbol followed by a small subscript, such as v with an f */
function sub(ctx, base, sfx, x, y, color, size = 24, align = 'left') {
  const wb = F.measure(ctx, base, { size, weight: 600 }), ws = F.measure(ctx, sfx, { size: size * 0.7, weight: 600 });
  const x0 = align === 'center' ? x - (wb + ws) / 2 : align === 'right' ? x - wb - ws : x;
  text(ctx, base, x0, y, color, { weight: 600, size }); text(ctx, sfx, x0 + wb, y + size * 0.3, color, { weight: 600, size: size * 0.7 });
}
/* a label in ink followed by a value in a colour, on one line */
function pair(ctx, left, right, x, y, color, size = 22) {
  const w = F.measure(ctx, left, { size });
  text(ctx, left, x, y, PAL.ink, { size }); text(ctx, right, x + w + 8, y, color, { weight: 600, size: size + 2 });
}
/* the range a function takes over [0, T], sampled */
function span(f, T, n = 80) { let lo = Infinity, hi = -Infinity; for (let i = 0; i <= n; i++) { const v = f((T * i) / n); lo = Math.min(lo, v); hi = Math.max(hi, v); } return [lo, hi]; }

/* ---------- sprites ---------- */
/* a subway car standing on the rail at y, about 150 units long, its cab to the right */
function train(ctx, x, y, color, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(-75, -62, 150, 46, [10, 18, 4, 4]); ctx.fill(); ctx.fillRect(-50, -68, 96, 8);
  ctx.fillStyle = PAL.panel;
  [-66, -16, 34].forEach((wx) => { ctx.beginPath(); ctx.roundRect(wx, -54, 24, 16, 3); ctx.fill(); });
  ctx.beginPath(); ctx.roundRect(62, -54, 9, 18, 3); ctx.fill();
  ctx.fillStyle = alpha(PAL.panel, 0.6); [-36, 14].forEach((wx) => ctx.fillRect(wx, -55, 14, 34));
  ctx.fillStyle = color; ctx.fillRect(-62, -16, 124, 6); ctx.beginPath();
  [-50, -30, 30, 50].forEach((wx) => { ctx.moveTo(wx + 8, -7); ctx.arc(wx, -7, 8, 0, TAU); }); ctx.fill();
  ctx.restore();
}
/* the library car, facing dir */
function carDir(ctx, x, y, color, s, dir) { ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1); car(ctx, 0, 0, color, s); ctx.restore(); }
/* a car seen from above, its nose pointing along heading (0 is to the right, a positive heading turns toward the top of the canvas) */
function topCar(ctx, x, y, heading, color) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-heading); ctx.fillStyle = color;
  /* four tyres under a rounded body, the windscreen and rear window as light bands, the bonnet forward */
  ctx.fillRect(-30, -24, 14, 48); ctx.fillRect(16, -24, 14, 48);
  ctx.beginPath(); ctx.roundRect(-40, -19, 80, 38, 9); ctx.fill();
  ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.roundRect(8, -14, 10, 28, 3); ctx.fill(); ctx.beginPath(); ctx.roundRect(-28, -13, 7, 26, 3); ctx.fill();
  ctx.fillStyle = alpha(PAL.panel, 0.5); ctx.fillRect(-12, -15, 18, 30); ctx.restore();
}

/* =====================================================================
   SIM: the definition. A car whose velocity changes by ā every second
   for 5.0 s. Under the road the velocity is drawn once per second, each
   arrow the one before plus the same piece, so "meters per second per
   second" is read off the picture. Finite motion, scrubber.
===================================================================== */
(function () {
  const d = sim('sim-average-acceleration', 736);
  /* 0 to 10 m/s and −3 to 3 m/s² over 5 s keep the velocity inside −15 to 25 m/s and the car inside −45 to 95 m, the two fixed scales below */
  const v0 = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 0, max: 10, step: 0.5, value: 5, unit: 'm/s', dec: 1, onInput: reset });
  const a = ctl(d.controls, { label: '\\kab', cls: 'acceleration', min: -3, max: 3, step: 0.1, value: 2.5, unit: 'm/s²', dec: 1, onInput: reset });
  const T = 5;
  const cy = cycle(() => T, 1.6);
  function reset() { cy.reset(); }
  const vel = (s) => v0.v + a.v * s, pos = (s) => v0.v * s + 0.5 * a.v * s * s;
  const KL = 26, XV = (v) => 640 + KL * v, ROW = (k) => 356 + 52 * k;
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), done = tau >= T - 1e-9, vv = vel(tau), flat = Math.abs(a.v) < 0.05;
    const tr = done ? T : Math.floor(tau * 10) / 10, vr = vel(tr);
    /* the road */
    const y = 236, X = (m) => 190 + 7.6 * (m + 45);
    strip(ctx, 80, 1320, y, 52);
    scale(ctx, X, -40, 80, 20, y + 26, 'm', 1);
    const px = X(pos(tau));
    /* where the car was at each whole second so far */
    let last = -1e9;
    for (let k = 0; k <= Math.floor(tau + 1e-9); k++) {
      const gx = X(pos(k));
      line(ctx, gx, y - 36, gx, y - 16, C('time'), 3);
      if (Math.abs(gx - px) > 78 && Math.abs(gx - last) > 46) { text(ctx, k + ' s', gx, y - 52, C('time'), { size: 17, align: 'center' }); last = gx; }
    }
    carDir(ctx, px, y - 6, F.ref('car'), 1.2, vv >= 0 ? 1 : -1);
    if (Math.abs(vv) > 0.3) arrow(ctx, px, y - 110, px + vv * 10, y - 110, C('velocity'), 5);
    text(ctx, 'v', px + vv * 10 + (vv >= 0 ? 18 : -18), y - 110, C('velocity'), { size: 24, weight: 600, align: 'center' });
    if (!flat) {
      arrow(ctx, px, y - 76, px + a.v * 30, y - 76, C('acceleration'), 5);
      text(ctx, 'ā', px + a.v * 30 + (a.v >= 0 ? 18 : -18), y - 76, C('acceleration'), { size: 24, weight: 600, align: 'center' });
    }
    /* the velocity once a second, on one fixed scale */
    for (let v = -15; v <= 25; v += 5) {
      line(ctx, XV(v), 326, XV(v), 656, v === 0 ? PAL.muted : PAL.rule, v === 0 ? 2 : 1.5);
      text(ctx, num(v, 0), XV(v), 682, PAL.muted, { size: 17, align: 'center' });
    }
    line(ctx, XV(-15), 656, XV(25), 656, PAL.muted, 2);
    text(ctx, 'v (m/s)', XV(25), 714, C('velocity'), { size: 20, weight: 600, align: 'right' });
    const full = Math.floor(tau + 1e-9);
    for (let k = 0; k <= T; k++) {
      const yk = ROW(k), shown = k <= full, live = !done && k === full + 1 && tau - full > 1e-6;
      text(ctx, 't = ' + k + ' s', 125, yk, shown || live ? C('time') : alpha(C('time'), 0.4), { size: 20, weight: 600, align: 'right' });
      if (!shown && !live) continue;
      const vk = live ? vv : vel(k), vp = k > 0 ? vel(k - 1) : vk, x0 = XV(0), x1 = XV(vk), xp = XV(vp);
      if (Math.abs(x1 - x0) > 6) arrow(ctx, x0, yk, x1, yk, C('velocity'), 5); else dot(ctx, x0, yk, C('velocity'), true, 6);
      if (k > 0 && !flat) {
        /* the piece this second added, starting where the arrow above ended */
        line(ctx, xp, yk - 46, xp, yk - 16, alpha(PAL.ink, 0.35), 2, [4, 6]);
        if (Math.abs(x1 - xp) > 12) arrow(ctx, xp, yk - 16, x1, yk - 16, C('acceleration'), 3); else line(ctx, xp, yk - 16, x1, yk - 16, C('acceleration'), 3);
        if (!live) text(ctx, signed(a.v, 1), (xp + x1) / 2, yk - 31, C('acceleration'), { size: 16, weight: 600, align: 'center' });
      }
      const out = vk > 0 || (vk === 0 && a.v >= 0) ? 1 : -1;
      text(ctx, num(live ? vr : vk, 1) + ' m/s', out > 0 ? Math.max(x0, x1, xp) + 14 : Math.min(x0, x1, xp) - 14, yk, C('velocity'), { size: 20, weight: 600, align: out > 0 ? 'left' : 'right' });
    }
    topline(ctx, flat ? 'The velocity stays at ' + num(v0.v, 1) + ' m/s, so the acceleration is zero.'
      : 'The velocity changes by ' + signed(a.v, 1) + ' m/s every second: after ' + fmt(tr, 1) + ' s it is ' + num(vr, 1) + ' m/s.');
    readout(d.readout, `\\kab = \\frac{\\kdv}{\\kdt} = \\frac{${tnum(vel(T), 1)}\\ \\text{m/s} - ${tnum(v0.v, 1)}\\ \\text{m/s}}{${fmt(T, 1)}\\ \\text{s}} = ${tsigned(a.v, 1)}\\ \\text{m/s}^2`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T / 6), draw });
})();

/* =====================================================================
   SIM: the turning car. A car rounds a bend at constant speed; the
   velocity at the start of the turn and the velocity now are set tail
   to tail beside the road, and their difference points to the inside
   of the bend. Endless loop over the whole run.
===================================================================== */
(function () {
  const d = sim('sim-turning', 600);
  const v = ctl(d.controls, { label: '\\kv', cls: 'velocity', min: 5, max: 15, step: 0.5, value: 10, unit: 'm/s', dec: 1, onInput: reset });
  const Rm = ctl(d.controls, { label: '\\text{radius}', cls: 'position', min: 20, max: 60, step: 5, value: 40, unit: 'm', dec: 0, onInput: reset, aria: 'radius of the bend' });
  const K = 2.75;                                     /* canvas units per meter */
  const x0 = 200, xb = 480, yroad = 480, ytop = 300;   /* the straight in, the start of the bend, the road's level and the top of the exit */
  const Rpx = () => Rm.v * K, Lin = xb - x0, arc = () => (Math.PI / 2) * Rpx(), Lout = () => yroad - Rpx() - ytop;
  const total = () => (Lin + arc() + Lout()) / K;    /* the run in meters */
  const T = () => total() / v.v;
  const cy = cycle(T, 0.6);
  function reset() { cy.reset(); }
  /* where the car is and which way it points after s meters */
  function place(s) {
    const p = s * K, R = Rpx(), cx = xb, cyy = yroad - R;
    if (p <= Lin) return { x: x0 + p, y: yroad, h: 0, phase: 'in' };
    if (p <= Lin + arc()) { const th = (p - Lin) / R; return { x: cx + R * Math.sin(th), y: cyy + R * Math.cos(th), h: th, phase: 'bend' }; }
    return { x: cx + R, y: cyy - (p - Lin - arc()), h: Math.PI / 2, phase: 'out' };
  }
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), s = v.v * tau, R = Rpx(), cx = xb, cyy = yroad - R, at = place(s);
    /* the road: two straights and the bend, drawn as a wide soft band */
    ctx.save(); ctx.strokeStyle = PAL.soft; ctx.lineWidth = 64; ctx.lineCap = 'butt'; ctx.beginPath();
    ctx.moveTo(x0 - 40, yroad); ctx.lineTo(cx, yroad); ctx.arc(cx, cyy, R, Math.PI / 2, 0, true); ctx.lineTo(cx + R, ytop - 20); ctx.stroke();
    ctx.setLineDash([22, 18]); ctx.strokeStyle = PAL.panel; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(x0 - 40, yroad); ctx.lineTo(cx, yroad); ctx.arc(cx, cyy, R, Math.PI / 2, 0, true); ctx.lineTo(cx + R, ytop - 20); ctx.stroke(); ctx.restore();
    /* the centre of the bend and its radius */
    dot(ctx, cx, cyy, PAL.muted, true, 5);
    line(ctx, cx, cyy, cx + R * Math.sin(Math.PI / 4), cyy + R * Math.cos(Math.PI / 4), C('position'), 2, [4, 8]);
    text(ctx, 'radius ' + fmt(Rm.v, 0) + ' m', cx - 14, cyy - 6, C('position'), { size: 17, align: 'right' });
    /* the car and its velocity */
    topCar(ctx, at.x, at.y, at.h, F.ref('turning-car'));
    /* the arrow on the exit straight is cut short of the headline band, and its label stands beside the car */
    const vl = v.v * 12, up = at.h >= Math.PI / 3, va = vl;   /* 15 m/s is 180 units, which clears the headline from the end of the road */
    const ux = Math.cos(at.h), uy = -Math.sin(at.h), tx = at.x + ux * va, ty = at.y + uy * va;
    arrow(ctx, at.x, at.y, tx, ty, C('velocity'), 5);
    if (!up) text(ctx, 'v = ' + fmt(v.v, 1) + ' m/s', tx + 14, Math.max(100, ty), C('velocity'), { weight: 600, size: 20 });
    else text(ctx, 'v = ' + fmt(v.v, 1) + ' m/s', at.x + 44, (at.y + ty) / 2, C('velocity'), { weight: 600, size: 20, align: 'left' });
    /* the two velocities tail to tail, and their difference */
    const ox = 960, oy = 440, hb = at.phase === 'in' ? 0 : at.h, dvx = Math.cos(hb) - 1, dvy = -Math.sin(hb), dvm = 2 * v.v * Math.sin(hb / 2);
    const tb = at.phase === 'in' ? 0 : Math.min(s * K - Lin, arc()) / K / v.v;   /* the time spent on the bend so far */
    const abar = tb > 0.02 ? dvm / tb : 0;
    /* On the bend the average acceleration is drawn along Δv, which is what this section defines it to
       be. Its length runs on a fixed scale from the fastest, tightest bend the sliders allow, about
       12 m/s²; the centripetal result that would give its size from the speed and the radius belongs
       to a later chapter and is not used here. */
    const AMAX = 12;
    if (at.phase === 'bend' && abar > 0.05) {
      const dl = Math.hypot(dvx, dvy) || 1, al = (140 * Math.min(abar, AMAX)) / AMAX;
      const ux2 = dvx / dl, uy2 = dvy / dl;
      arrow(ctx, at.x + ux2 * 30, at.y + uy2 * 30, at.x + ux2 * (30 + al), at.y + uy2 * (30 + al), C('acceleration'), 5);
      text(ctx, 'ā', at.x + ux2 * (al + 50), at.y + uy2 * (al + 50), C('acceleration'), { weight: 600, size: 24, align: 'center' });
    }
    arrow(ctx, ox, oy, ox + vl, oy, C('velocity'), 4); text(ctx, 'v at the start of the bend', ox + vl / 2, oy + 28, C('velocity'), { size: 20, align: 'center' });
    if (hb > 0.01) {
      arrow(ctx, ox, oy, ox + Math.cos(hb) * vl, oy - Math.sin(hb) * vl, C('velocity'), 5);
      text(ctx, 'v now', ox + Math.cos(hb) * vl - 26, oy - Math.sin(hb) * vl - 6, C('velocity'), { size: 20, align: 'right' });
      arrow(ctx, ox + vl, oy, ox + vl + dvx * vl, oy + dvy * vl, C('velocity'), 6);
      text(ctx, 'Δv = ' + fmt(dvm, 1) + ' m/s', ox + vl + (dvx * vl) / 2 + 16, oy + (dvy * vl) / 2, C('velocity'), { weight: 600, size: 22 });
    }
    dot(ctx, ox, oy, PAL.ink, true, 5);
    const deg = fmt((hb * 180) / Math.PI, 0);
    topline(ctx, at.phase === 'in' ? 'On the straight the velocity is ' + fmt(v.v, 1) + ' m/s to the right and is not changing, so the acceleration is zero.'
      : at.phase === 'bend' ? 'On the bend the speed stays ' + fmt(v.v, 1) + ' m/s while the direction has turned ' + deg + '°, so the velocity has changed by ' + fmt(dvm, 1) + ' m/s and the car is accelerating.'
        : 'After the bend the velocity is ' + fmt(v.v, 1) + ' m/s upward, and although the speed never changed, the velocity changed by ' + fmt(dvm, 1) + ' m/s.');
    readout(d.readout, tb > 0.01 ? `\\kab = \\frac{\\kdv}{\\kdt} = \\frac{${fmt(dvm, 1)}\\ \\text{m/s}}{${fmt(tb, 2)}\\ \\text{s}} = ${fmt(dvm / tb, 1)}\\ \\text{m/s}^2` : `\\kab = \\frac{\\kdv}{\\kdt} = 0\\ \\text{m/s}^2`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T() / 5), draw });
})();

/* =====================================================================
   FIGURE 2.14: the four cars, set out as the book letters them: (a) and
   (b) move right, (c) and (d) move left; (a) and (c) accelerate to the
   right, (b) and (d) to the left. The choice turns the x-axis round:
   the signs change, the cars that slow down do not. Finite motion.
===================================================================== */
(function () {
  const d = sim('sim-four-cars', 700);
  const dirc = F.choice(d.controls, { label: '\\text{positive direction}', options: [{ value: 'right', label: 'right' }, { value: 'left', label: 'left' }], value: 'right', aria: 'positive direction of the x-axis' });
  /* every car starts at 15 m/s and has 3.0 m/s² for 3.5 s, so the two that slow down are still moving at the end */
  const V0 = 15, A = 3, T = 3.5, KX = 4, KV = 6, KA = 24;
  const cy = cycle(() => T, 1.6);
  const CARS = [['(a)', 1, 1, 'car-a'], ['(b)', 1, -1, 'car-b'], ['(c)', -1, 1, 'car-c'], ['(d)', -1, -1, 'car-d']];   /* letter, way it moves, way it accelerates (1 is to the right), referent */
  const COL = [{ l: 200, r: 760 }, { l: 820, r: 1380 }], ROWY = [262, 496];
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), sgn = dirc.value === 'left' ? -1 : 1;
    const gt = (s) => (s * sgn > 0 ? '> 0' : '< 0');
    /* the axis, the two columns and the two rows */
    arrow(ctx, sgn > 0 ? 40 : 150, 150, sgn > 0 ? 150 : 40, 150, PAL.ink, 3); text(ctx, '+x', 95, 124, PAL.ink, { size: 22, weight: 600, align: 'center' });
    COL.forEach((c, j) => F.rich(ctx, ['acceleration to the ' + (j ? 'left' : 'right') + ', ', ['a ' + gt(j ? -1 : 1), C('acceleration')]], (c.l + c.r) / 2, 138, { size: 22, align: 'center' }));
    ROWY.forEach((y, i) => {
      text(ctx, 'moving', 30, y - 30, PAL.ink, { size: 22 }); text(ctx, i ? 'left' : 'right', 30, y - 2, PAL.ink, { size: 22 });
      text(ctx, 'v ' + gt(i ? -1 : 1), 30, y + 30, C('velocity'), { size: 22, weight: 600 });
    });
    const next = [];
    CARS.forEach(([lab, sv, sa, id], n) => {
      const c = COL[n % 2], y = ROWY[n >> 1], speeding = sv * sa > 0;
      const vel = sv * V0 + sa * A * tau, x = sv * V0 * tau + 0.5 * sa * A * tau * tau;
      const px = (sv > 0 ? c.l + 60 : c.r - 60) + x * KX;
      strip(ctx, c.l, c.r, y, 44);
      F.rich(ctx, [[lab, F.ref(id)], speeding ? ' speeding up' : ' slowing down: decelerating'], c.l, y - 92, { size: 22, weight: 600 });
      carDir(ctx, px, y - 6, F.ref(id), 1, sv);
      /* the velocity it started with, dashed, under the velocity it has now */
      const xs = px + sv * V0 * KV;
      line(ctx, px, y - 56, xs, y - 56, alpha(C('velocity'), 0.6), 2, [4, 6]); line(ctx, xs, y - 67, xs, y - 45, alpha(C('velocity'), 0.6), 2);
      arrow(ctx, px, y - 56, px + vel * KV, y - 56, C('velocity'), 5);
      arrow(ctx, px, y + 46, px + sa * A * KA, y + 46, C('acceleration'), 5);
      F.rich(ctx, ['v = ', [signed(sgn * vel, 1) + ' m/s', C('velocity')], '     a = ', [signed(sgn * sa * A, 1) + ' m/s²', C('acceleration')]], (c.l + c.r) / 2, y + 88, { size: 20, align: 'center' });
      next.push({ x: px, y: y - 14, r: 50, name: 'Car ' + lab + ', moving ' + (sv > 0 ? 'right' : 'left') + ' and ' + (speeding ? 'speeding up' : 'slowing down') });
    });
    hits = next;
    F.legend(ctx, { l: 200, r: 1380, t: 628, b: 690 }, [{ s: 'velocity', color: C('velocity'), w: 5 }, { s: 'velocity at the start', color: alpha(C('velocity'), 0.6), w: 2, dash: [4, 6] }, { s: 'acceleration', color: C('acceleration'), w: 5 }], { corner: 'bottom', row: true, panel: false });
    const neg = CARS.filter(([, , sa]) => sa * sgn < 0).map(([lab]) => lab);
    topline(ctx, 'With +x to the ' + (sgn > 0 ? 'right' : 'left') + ', ' + neg[0] + ' and ' + neg[1] + ' have negative acceleration, but the cars slowing down are (b) and (c).');
    /* the two decelerating cars over the whole run, by the section's definition */
    const row = ([lab, sv, sa]) => `\\text{${lab}}\\ \\ \\kab &= \\frac{\\kdv}{\\kdt} = \\frac{(${tsigned(sgn * (sv * V0 + sa * A * T), 1)}\\ \\text{m/s}) - (${tsigned(sgn * sv * V0, 1)}\\ \\text{m/s})}{${fmt(T, 1)}\\ \\text{s}} = ${tsigned(sgn * sa * A, 1)}\\ \\text{m/s}^2`;
    readout(d.readout, `\\begin{aligned} ${row(CARS[1])} \\\\ ${row(CARS[2])} \\end{aligned}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T / 5), draw });
})();

/* =====================================================================
   FIGURE 2.17: instantaneous acceleration. The book's two a–t graphs on
   one vertical scale, as the book prints them; an interval is chosen,
   its average is a dashed level on each, and the bracket marks how far
   the acceleration gets from that average. Still: it answers its sliders.
===================================================================== */
(function () {
  const d = sim('sim-instantaneous', 566);
  const t1 = ctl(d.controls, { label: '\\kt_{1}', cls: 'time', key: 'time', min: 0, max: 4.9, step: 0.1, value: 0, unit: 's', dec: 1, detents: [1, 3], aria: 'start of the interval' });
  const t2 = ctl(d.controls, { label: '\\kt_{2}', cls: 'time', key: 'time-2', min: 0.1, max: 5, step: 0.1, value: 3, unit: 's', dec: 1, detents: [1, 3], aria: 'end of the interval' });
  /* (a): the book's curve through its turning points, read off the image, joined by half cosines */
  const KN = [[0, 1.47], [0.63, 2.07], [1.97, 1.47], [3.58, 2.07], [5, 1.33]];
  const aA = (t) => { let i = 0; while (i < KN.length - 2 && t > KN[i + 1][0]) i++; const [ta, ya] = KN[i], [tb, yb] = KN[i + 1]; return ya + ((yb - ya) * (1 - Math.cos((Math.PI * (t - ta)) / (tb - ta)))) / 2; };
  /* (b): the book's steps, each from its time to the next */
  const STEPS = [[0, 3], [1, -2], [3, 0], [4.2, 1.5], [4.8, 5], [5.5, -4], [6, 0]];
  const aB = (t) => STEPS.reduce((v, [from, s]) => (t >= from ? s : v), 3);
  /* the change in velocity over [p, q], the average, and where the acceleration is farthest from it */
  function statsA(p, q) {
    const n = 400, h = (q - p) / n; let s = 0;
    for (let i = 0; i < n; i++) s += aA(p + (i + 0.5) * h);
    const dv = s * h, ab = dv / (q - p); let far = p, gap = 0;
    for (let i = 0; i <= n; i++) { const t = p + i * h, g = Math.abs(aA(t) - ab); if (g > gap) { gap = g; far = t; } }
    return { dv, ab, far, gap };
  }
  function statsB(p, q) {
    const parts = STEPS.slice(0, -1).map(([from, s], i) => ({ l: Math.max(p, from), r: Math.min(q, STEPS[i + 1][0]), s })).filter((z) => z.r - z.l > 1e-9);
    const dv = parts.reduce((sum, z) => sum + z.s * (z.r - z.l), 0), ab = dv / (q - p);
    const worst = parts.reduce((m, z) => (Math.abs(z.s - ab) > Math.abs(m.s - ab) + 1e-9 ? z : m));
    return { dv, ab, far: (worst.l + worst.r) / 2, gap: Math.abs(worst.s - ab) };
  }
  const GRAPHS = [
    { name: '(a)', f: aA, st: statsA, tmax: 5, box: { l: 110, r: 620, t: 136, b: 436 } },
    { name: '(b)', f: aB, st: statsB, tmax: 6, box: { l: 780, r: 1330, t: 136, b: 436 } },
  ];
  function draw() {
    const { ctx } = begin(d.c);
    const p = Math.min(t1.v, t2.v), q = Math.max(t1.v, t2.v, p + 0.1);
    const res = GRAPHS.map((g) => {
      /* both graphs run from −5 to 5 m/s², so their heights compare as they do in the book */
      const { X, Y } = axes(ctx, g.box, [0, g.tmax], [-5, 5], { xl: 't (s)', xc: C('time'), yl: 'a (m/s²)', yc: C('acceleration'), nx: g.tmax, ny: 10 });
      const r = g.st(p, q);
      ctx.save(); ctx.fillStyle = alpha(C('time'), 0.1); ctx.fillRect(X(p), g.box.t, X(q) - X(p), g.box.b - g.box.t); ctx.restore();
      line(ctx, X(p), g.box.t, X(p), g.box.b, C('time'), 2, [4, 8]); line(ctx, X(q), g.box.t, X(q), g.box.b, C('time'), 2, [4, 8]);
      curve(ctx, g.f, 0, g.tmax, X, Y, C('acceleration'), 5, 720);
      line(ctx, X(p), Y(r.ab), X(q), Y(r.ab), PAL.ink, 3, [10, 10]);
      if (r.gap > 0.005) { const bx = X(r.far); line(ctx, bx, Y(r.ab), bx, Y(g.f(r.far)), PAL.ink, 2); line(ctx, bx - 9, Y(g.f(r.far)), bx + 9, Y(g.f(r.far)), PAL.ink, 2); }
      const below = r.ab > 3.6 || (r.ab > -4 && g.f(Math.min(q + 0.2, g.tmax - 0.01)) > r.ab + 0.2);
      text(ctx, 'ā', X(q) + (q > g.tmax - 0.4 ? -18 : 18), Y(r.ab) + (below ? 18 : -18), PAL.ink, { size: 24, weight: 600, align: 'center' });
      F.rich(ctx, [g.name + '  ā = ', [num(r.ab, 2) + ' m/s²', C('acceleration')], r.gap > 0.005 ? ', and a gets as far as ' : ', and a equals it throughout', r.gap > 0.005 ? [num(r.gap, 2) + ' m/s²', C('acceleration')] : '', r.gap > 0.005 ? ' from it' : ''], (g.box.l + g.box.r) / 2, g.box.b + 100, { size: 20, align: 'center' });
      return r;
    });
    headline(ctx, 'From ' + fmt(p, 1) + ' s to ' + fmt(q, 1) + ' s the acceleration stays within ' + num(res[0].gap, 2) + ' m/s² of its average in (a), and within ' + num(res[1].gap, 2) + ' m/s² in (b).');
    const row = (name, r) => `\\text{${name}}\\ \\ \\kab &= \\frac{\\kdv}{\\kdt} = \\frac{${tsigned(r.dv, 2)}\\ \\text{m/s}}{${fmt(q - p, 1)}\\ \\text{s}} = ${tsigned(r.ab, 2)}\\ \\text{m/s}^2`;
    readout(d.readout, `\\begin{aligned} ${row('(a)', res[0])} \\\\ ${row('(b)', res[1])} \\end{aligned}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 2.21: the train of Examples 2.4 and 2.5 on one clock. It speeds
   up to 30.0 km/h, holds that for 20 s and brakes to rest, while its
   position, velocity and acceleration are drawn against the same time
   axis; the tangent on the position graph has the velocity for its
   slope, and the slope of the velocity graph is the acceleration.
   Finite motion, scrubber.
===================================================================== */
(function () {
  const d = sim('sim-subway-graphs', 1030);
  /* 10 to 25 s of speeding up and 5 to 15 s of stopping, with 20 s between at 30.0 km/h, never pass
     60 s, 333 m, 0.833 m/s² and −1.67 m/s², so the four axes below are fixed */
  const t1 = ctl(d.controls, { label: '\\kdt\\ \\text{speeding up}', cls: 'time', key: 'time', min: 10, max: 25, step: 0.5, value: 20, unit: 's', dec: 1, onInput: reset, aria: 'time spent speeding up' });
  const t3 = ctl(d.controls, { label: '\\kdt\\ \\text{stopping}', cls: 'time', key: 'time-2', min: 5, max: 15, step: 0.5, value: 8, unit: 's', dec: 2, onInput: reset, aria: 'time spent stopping' });
  const VT = 30, TS = 20, V = VT / 3.6;
  const T = () => t1.v + TS + t3.v;
  const cy = cycle(T, 1.6);
  function reset() { cy.reset(); }
  const a1 = () => V / t1.v, a3 = () => -V / t3.v;
  function vel(s) { if (s <= t1.v) return a1() * s; if (s <= t1.v + TS) return V; return Math.max(0, V + a3() * (s - t1.v - TS)); }
  function acc(s) { if (s < t1.v) return a1(); if (s <= t1.v + TS) return 0; return a3(); }
  function pos(s) {
    const x1 = 0.5 * a1() * t1.v * t1.v, x2 = x1 + V * TS;
    if (s <= t1.v) return 0.5 * a1() * s * s; if (s <= t1.v + TS) return x1 + V * (s - t1.v);
    const u = Math.min(s - t1.v - TS, t3.v); return x2 + V * u + 0.5 * a3() * u * u;
  }
  const BOX = [{ l: 170, r: 1250, t: 356, b: 526 }, { l: 170, r: 1250, t: 570, b: 740 }, { l: 170, r: 1250, t: 784, b: 954 }];
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), done = tau >= T() - 1e-9, vv = vel(tau), aa = done ? a3() : acc(tau);
    const phase = tau < t1.v ? 'up' : tau <= t1.v + TS ? 'steady' : 'stop';
    /* the track, 0 to 350 m */
    const y = 232, X = (m) => 230 + (1060 * m) / 350;
    strip(ctx, 60, 1340, y, 52);
    scale(ctx, X, 0, 350, 50, y + 26, 'm', 1);
    const px = X(pos(tau));
    train(ctx, px, y + 6, F.ref('train'), 1);
    if (vv > 0.02) arrow(ctx, px, y - 116, px + vv * 18, y - 116, C('velocity'), 5);
    text(ctx, 'v = ' + fmt(vv, 2) + ' m/s', px - 14, y - 116, C('velocity'), { weight: 600, align: 'right' });
    if (phase !== 'steady') arrow(ctx, px, y - 86, px + aa * 100, y - 86, C('acceleration'), 5);
    text(ctx, phase === 'steady' ? 'a = 0' : 'a = ' + sig3s(aa) + ' m/s²', px + (aa > 0 || phase === 'steady' ? -14 : 14), y - 86, C('acceleration'), { weight: 600, align: aa > 0 || phase === 'steady' ? 'right' : 'left' });
    /* the three graphs on one time axis: 0 to 60 s, 0 to 400 m, 0 to 10 m/s, −2 to 1 m/s² */
    const G = [
      { yl: 'x (m)', yc: C('position'), yr: [0, 400], ny: 4, f: pos },
      { yl: 'v (m/s)', yc: C('velocity'), yr: [0, 10], ny: 5, f: vel },
      { yl: 'a (m/s²)', yc: C('acceleration'), yr: [-2, 1], ny: 6, f: acc },
    ];
    const AX = G.map((g, i) => {
      const box = BOX[i], bottom = i === 2;
      const ax = axes(ctx, box, [0, 60], g.yr, { xl: bottom ? 't (s)' : '', xc: C('time'), yl: g.yl, yc: g.yc, nx: bottom ? 6 : 0, ny: g.ny });
      if (!bottom) for (let s = 10; s <= 60; s += 10) line(ctx, ax.X(s), box.t, ax.X(s), box.b, PAL.rule, 1.5);
      [t1.v, t1.v + TS].forEach((s) => line(ctx, ax.X(s), box.t, ax.X(s), box.b, PAL.muted, 1.5, [6, 6]));
      curve(ctx, g.f, 0, T(), ax.X, ax.Y, g.yc, 5, 480);
      line(ctx, ax.X(tau), box.t, ax.X(tau), box.b, C('time'), 2, [4, 8]);
      return ax;
    });
    /* the tangent to the position graph: its slope is the velocity */
    const sx = 1080 / 60, sy = 170 / 400, tx = sx, ty = -vv * sy, tl = Math.hypot(tx, ty), hx = (95 * tx) / tl, hy = (95 * ty) / tl;
    const gx = AX[0].X(tau), gy = AX[0].Y(pos(tau));
    line(ctx, gx - hx, gy - hy, gx + hx, gy + hy, C('velocity'), 3);
    G.forEach((g, i) => dot(ctx, AX[i].X(tau), AX[i].Y(i === 2 ? aa : g.f(tau)), PAL.ink, true, 9));
    F.rich(ctx, ['slope = v = ', [fmt(vv, 2) + ' m/s', C('velocity')]], 1250, BOX[0].t - 24, { size: 20, align: 'right' });
    F.rich(ctx, ['slope = a = ', [phase === 'steady' ? '0' : sig3s(aa) + ' m/s²', C('acceleration')]], 1250, BOX[1].t - 24, { size: 20, align: 'right' });
    const GX = AX[0].X;
    text(ctx, 'speeding up', GX(t1.v / 2), 318, PAL.muted, { size: 18, align: 'center' });
    text(ctx, 'constant velocity', GX(t1.v + TS / 2), 318, PAL.muted, { size: 18, align: 'center' });
    text(ctx, 'stopping', GX(t1.v + TS + t3.v / 2), 318, PAL.muted, { size: 18, align: 'center' });
    topline(ctx, done ? 'After ' + fmt(T(), 1) + ' s the train is at rest again, ' + fmt(pos(T()), 0) + ' m down the track.'
      : phase === 'up' ? 'Speeding up: the velocity rises ' + sig3(a1()) + ' m/s every second, and the position graph steepens.'
        : phase === 'steady' ? 'Constant velocity: the acceleration is zero, and the position graph is a straight line.'
          : 'Stopping: the velocity falls ' + sig3(-a3()) + ' m/s every second, and the position graph flattens.');
    /* Examples 2.4 and 2.5, with the conversion factors carried so that km/h over s comes out in m/s² */
    const row = (name, dv, dt, dec, res) => `\\text{${name}}\\ \\ \\kab &= \\frac{\\kdv}{\\kdt} = \\left(\\frac{${dv}\\ \\text{km/h}}{${fmt(dt, dec)}\\ \\text{s}}\\right)\\left(\\frac{10^{3}\\ \\text{m}}{1\\ \\text{km}}\\right)\\left(\\frac{1\\ \\text{h}}{3600\\ \\text{s}}\\right) = ${tsig3s(res)}\\ \\text{m/s}^2`;
    readout(d.readout, `\\begin{aligned} ${row('speeding up', '+30.0', t1.v, 1, a1())} \\\\ ${row('stopping', '-30.0', t3.v, 2, a3())} \\end{aligned}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T() / 6), draw });
})();
};
