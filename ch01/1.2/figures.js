/* Figures for section 1.2 Physical Quantities and Units. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.2'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, headline, hbracket, strip, car } = F;
const sim = (id, H) => F.sim(root, id, H);

/* ---------- small helpers shared by the figures ---------- */
const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const sup = (n) => String(n).split('').map((ch) => SUP[ch] ?? ch).join('');
const pow10 = (n) => '10' + sup(n);
const commas = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
/* three significant figures, never in exponent form */
const sig3 = (x) => { const s = x.toPrecision(3); return s.includes('e') ? String(Math.round(Number(s))) : s; };

/* ---------- sprites, in the colour they are handed ---------- */
/* a flashlight whose lens is at (x, y), pointing right: a ridged barrel, a switch, a flared head */
function flashlight(ctx, x, y, color) {
  ctx.save(); ctx.fillStyle = color; ctx.strokeStyle = PAL.panel; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(x - 150, y - 17, 104, 34, 6); ctx.fill();                       /* the barrel */
  ctx.beginPath(); ctx.moveTo(x - 48, y - 17); ctx.lineTo(x - 10, y - 32); ctx.lineTo(x - 10, y + 32); ctx.lineTo(x - 48, y + 17); ctx.closePath(); ctx.fill();   /* the head */
  ctx.beginPath(); ctx.roundRect(x - 12, y - 35, 12, 70, 3); ctx.fill();                          /* the rim round the lens */
  ctx.beginPath(); ctx.roundRect(x - 104, y - 25, 30, 9, 3); ctx.fill();                          /* the switch */
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - 140 + i * 8, y - 13); ctx.lineTo(x - 140 + i * 8, y + 13); ctx.stroke(); }   /* the grip */
  ctx.restore();
}
/* a school building standing on (x, y), with a flag */
function school(ctx, x, y, color) {
  ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = color; ctx.lineWidth = 4;
  ctx.fillRect(x - 50, y - 60, 100, 60); ctx.strokeRect(x - 50, y - 60, 100, 60);
  ctx.fillStyle = color; ctx.fillRect(x - 10, y - 28, 20, 28); ctx.fillRect(x - 38, y - 48, 14, 12); ctx.fillRect(x + 24, y - 48, 14, 12);
  ctx.beginPath(); ctx.moveTo(x + 40, y - 60); ctx.lineTo(x + 40, y - 100); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + 40, y - 100); ctx.lineTo(x + 68, y - 92); ctx.lineTo(x + 40, y - 84); ctx.closePath(); ctx.fill();
  ctx.restore();
}
/* a stopwatch centred on (x, y) whose dial is one hour round; the minutes gone are swept and pointed at */
function stopwatch(ctx, x, y, r, min) {
  const col = F.ref('stopwatch'), a = (min / 60) * Math.PI * 2;
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.fillStyle = PAL.panel;
  ctx.fillRect(x - 11, y - r - 18, 22, 14); ctx.strokeRect(x - 11, y - r - 18, 22, 14);
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  if (min > 0) { ctx.fillStyle = alpha(C('time'), 0.22); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r - 22, -Math.PI / 2, a - Math.PI / 2); ctx.closePath(); ctx.fill(); }
  ctx.restore();
  for (let i = 0; i < 12; i++) { const b = (i / 12) * Math.PI * 2; line(ctx, x + (r - 11) * Math.sin(b), y - (r - 11) * Math.cos(b), x + (r - 4) * Math.sin(b), y - (r - 4) * Math.cos(b), col, i % 3 ? 2 : 4); }
  [[0, '60'], [1, '15'], [2, '30'], [3, '45']].forEach(([q, s]) => text(ctx, s, x + (r - 28) * Math.sin(q * Math.PI / 2), y - (r - 28) * Math.cos(q * Math.PI / 2), PAL.muted, { size: 15, align: 'center' }));
  line(ctx, x, y, x + (r - 20) * Math.sin(a), y - (r - 20) * Math.cos(a), C('time'), 5); dot(ctx, x, y, C('time'), true, 6);
}

/* =====================================================================
   FIGURE 1.18: the meter. A flashlight at the zero end of a meter stick
   switches on and the front of its light runs along the stick at the
   speed of light for the time on the slider. The stick is one meter and
   fills the stage; at 3.34 ns, 1/299,792,458 s, the front is at its far
   end. Finite motion, so it gets the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-light-meter', 372);
  const CNS = 0.299792458;   /* the speed of light in meters per nanosecond, exact */
  const T = ctl(d.controls, { label: '\\kt', cls: 'time', min: 0.5, max: 4, step: 0.01, value: 3.34, unit: 'ns', dec: 2, specials: [{ at: 1 / CNS, label: 'one meter' }], onInput: reset, aria: 'elapsed time' });
  const cy = cycle(() => T.v, 1.2);
  function reset() { cy.reset(); }
  /* one fixed scale: 900 units to the meter, so the 4.00 ns the slider allows (1.20 m) ends inside the canvas */
  const X = (m) => 170 + 900 * m, yp = 178, st = 240, sb = 304;
  F.hover(d.stage, () => [{ x: X(0) - 80, y: yp, r: 70, name: 'flashlight' }, ...[0.1, 0.3, 0.5, 0.7, 0.9].map((m) => ({ x: X(m), y: (st + sb) / 2, r: 92, name: 'meter stick' }))]);
  function draw() {
    const { ctx } = begin(d.c);
    /* within half a step of 1/c the time is 1/299,792,458 s itself, the book's number */
    const meter = Math.abs(T.v - 1 / CNS) < 0.0045, tEnd = meter ? 1 / CNS : T.v;
    const tau = Math.min(cy.now(), tEnd), done = cy.now() >= T.v - 1e-9, dist = CNS * tau, dEnd = CNS * tEnd;
    const stick = F.ref('meter-stick'), light = F.ref('pulse');
    /* the meter stick: a tick every centimeter, longer at each 5 and each 10, numbered as the book's is */
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(X(0), st, X(1) - X(0), sb - st);
    ctx.fillStyle = alpha(stick, 0.14); ctx.strokeStyle = stick; ctx.lineWidth = 3;
    ctx.fillRect(X(0), st, X(1) - X(0), sb - st); ctx.strokeRect(X(0), st, X(1) - X(0), sb - st); ctx.restore();
    for (let cm = 1; cm < 100; cm++) line(ctx, X(cm / 100), st, X(cm / 100), st + (cm % 10 === 0 ? 24 : cm % 5 === 0 ? 17 : 10), stick, cm % 10 === 0 ? 2.5 : 1.5);
    for (let cm = 10; cm < 100; cm += 10) text(ctx, String(cm), X(cm / 100), sb - 20, PAL.ink, { size: 19, align: 'center' });
    text(ctx, 'cm', X(0) + 10, sb - 20, PAL.ink, { size: 19 }); text(ctx, '100', X(1) - 8, sb - 20, PAL.ink, { size: 19, align: 'right' });
    /* the flashlight and its light, lit as far as the front has gone */
    flashlight(ctx, X(0) - 4, yp, F.ref('flashlight'));
    if (dist > 0.004) { ctx.save(); ctx.fillStyle = alpha(light, 0.2); ctx.fillRect(X(0), yp - 24, X(dist) - X(0), 48); ctx.restore(); }
    if (dist > 0.04) arrow(ctx, X(0), yp, X(dist), yp, light, 5); else dot(ctx, X(dist), yp, light, true, 7);
    /* where the front is: dropped onto the stick, with the time it took */
    const xf = X(dist);
    line(ctx, xf, yp - 24, xf, sb + 14, C('time'), 2.5, [4, 8]);
    F.rich(ctx, ['t = ', [fmt(tau, 2) + ' ns', C('time')]], Math.min(Math.max(xf, 110), 1290), sb + 34, { align: 'center' });
    if (dist > 0.02) hbracket(ctx, X(0), xf, 112, C('position'), 'd = ' + fmt(dist, 2) + ' m');
    const gap = Math.abs(dEnd - 1);
    headline(ctx, !done ? 'After ' + fmt(tau, 2) + ' ns the light has traveled ' + fmt(dist, 2) + ' m.'
      : meter ? 'In 3.34 ns, which is 1/299,792,458 s, light travels the length of the meter stick.'
        : 'In ' + fmt(T.v, 2) + ' ns light travels ' + fmt(dEnd, 2) + ' m' + (fmt(gap, 2) === '0.00' ? ', the length of the meter stick.' : dEnd < 1 ? ', ' + fmt(gap, 2) + ' m short of the end of the meter stick.' : ', ' + fmt(gap, 2) + ' m past the end of the meter stick.'));
    tex(d.readout, meter ? `\\kd = \\kc\\,\\kt = 299{,}792{,}458\\ \\text{m/s} \\times \\tfrac{1}{299{,}792{,}458}\\ \\text{s} = 1\\ \\text{m}`
      : `\\kd = \\kc\\,\\kt = 299{,}792{,}458\\ \\text{m/s} \\times ${fmt(T.v, 2)} \\times 10^{-9}\\ \\text{s} = ${fmt(dEnd, 2)}\\ \\text{m}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T.v / 5), draw });
})();

/* =====================================================================
   SIM: orders of magnitude. A logarithmic ladder of lengths from
   10⁻¹⁸ m to 10²⁶ m with the prefixes of Table 1.2 under their powers
   and lengths of Table 1.3 above. The decade the value falls in is
   shaded and opened out below, where every length in it is read: all of
   them have the same order of magnitude. Opens on the book's 450. No motion.
===================================================================== */
(function () {
  const d = sim('sim-ladder', 590);
  const M = ctl(d.controls, { label: '\\text{factor}', cls: '', key: 'factor', min: 1, max: 9.9, step: 0.1, value: 4.5, unit: '', dec: 1, aria: 'factor in front of the power of 10' });
  const N = ctl(d.controls, { label: '\\text{power of 10}', cls: '', key: 'power', min: -18, max: 26, step: 1, value: 2, unit: '', fmt: (v) => pow10(Math.round(v)), aria: 'power of 10' });
  /* Table 1.2: power, prefix, symbol */
  const PREFIX = [[-18, 'atto', 'a'], [-15, 'femto', 'f'], [-12, 'pico', 'p'], [-9, 'nano', 'n'], [-6, 'micro', 'µ'], [-3, 'milli', 'm'], [-2, 'centi', 'c'], [-1, 'deci', 'd'],
    [1, 'deka', 'da'], [2, 'hecto', 'h'], [3, 'kilo', 'k'], [6, 'mega', 'M'], [9, 'giga', 'G'], [12, 'tera', 'T'], [15, 'peta', 'P'], [18, 'exa', 'E']];
  /* lengths of Table 1.3: power of ten, label, row above the ladder (0 nearest), and which way the label runs from its tick */
  /* rows chosen so no leader passes behind another label */
  const LENGTHS = [[-15, 'a proton', 0, 'right'], [-10, 'a hydrogen atom', 1, 'right'], [-8, 'a cell membrane', 2, 'right'], [-6, 'visible light', 3, 'right'],
    [-3, 'a grain of sand', 3, 'left'], [0, 'a child', 1, 'right'], [2, 'a football field', 2, 'left'], [7, 'the Earth', 0, 'left'], [11, 'the Earth to the Sun', 1, 'right'],
    [16, 'a light year', 1, 'left'], [21, 'the Milky Way', 2, 'right'], [26, 'the known universe', 3, 'right']];
  const L = 80, R = 1320, X = (n) => L + ((R - L) * (n + 18)) / 44;
  const yl = 262, ZL = 150, ZR = 1250, zy = 500, ZX = (f) => ZL + (ZR - ZL) * Math.log10(f);
  /* k × 10ⁿ m in the prefix nearest below n, when the number in front stays under 1000 */
  function nearest(k, n) {
    const below = PREFIX.filter((p) => p[0] <= n).map((p) => p[0]); if (!below.length) return null;
    const p = Math.max(...below), e = n - p; if (e > 2) return null;
    const pre = PREFIX.find((q) => q[0] === p), v = k * Math.pow(10, e);
    return { num: fmt(v, Number.isInteger(k) ? 0 : Math.max(0, 1 - e)), sym: pre[2], p };
  }
  /* k × 10ⁿ written out in meters, for the powers a reader writes out */
  const plain = (k, n) => n >= 0 ? commas(fmt(k * Math.pow(10, n), Number.isInteger(k) || n > 0 ? 0 : 1)) : fmt(k * Math.pow(10, n), (Number.isInteger(k) ? 0 : 1) - n);
  /* a whole-number mark of the decade as a reader would say it: 200 m, 2 km, 20 µm, 2 × 10²³ m */
  function mark(k, n) {
    if (k === 10) { k = 1; n += 1; }
    if (Math.abs(n) <= 3) return n === 3 ? k + ' km' : plain(k, n) + ' m';
    const near = nearest(k, n);
    return near ? near.num + ' ' + near.sym + 'm' : k + ' × ' + pow10(n) + ' m';
  }
  function draw() {
    const { ctx } = begin(d.c);
    const m = M.v, n = Math.round(N.v), own = PREFIX.find((p) => p[0] === n), near = nearest(m, n);
    const lit = own ? own[0] : near ? near.p : null, band = alpha(C('position'), 0.2);
    /* the decade, shaded on the ladder and opened out below; the two are joined corner to corner */
    ctx.save(); ctx.fillStyle = band; ctx.fillRect(X(n), yl - 16, X(n + 1) - X(n), 32); ctx.fillRect(ZL, zy - 18, ZR - ZL, 36); ctx.restore();
    line(ctx, X(n), yl + 16, ZL, zy - 18, alpha(PAL.ink, 0.35), 2); line(ctx, X(n + 1), yl + 16, ZR, zy - 18, alpha(PAL.ink, 0.35), 2);
    /* the ladder and its ticks */
    line(ctx, X(-18), yl, X(26), yl, PAL.ink, 3);
    for (let k = -18; k <= 26; k++) { const big = k % 3 === 0; line(ctx, X(k), yl - (big ? 12 : 7), X(k), yl + (big ? 12 : 7), PAL.ink, 2); if (big) text(ctx, pow10(k) + (k === 24 ? ' m' : ''), X(k), yl + 32, PAL.muted, { size: 18, align: k === 24 ? 'left' : 'center', bg: PAL.panel }); }
    /* the prefixes under their powers, on three rows where they crowd */
    for (const [p, name] of PREFIX) {
      const row = Math.abs(p) === 2 ? 1 : Math.abs(p) === 1 ? 2 : 0, y = yl + 70 + 28 * row, on = p === lit;
      if (row) line(ctx, X(p), yl + 14, X(p), y - 13, alpha(PAL.ink, 0.35), 1.5);
      text(ctx, name, X(p), y, on ? PAL.ink : PAL.muted, { size: 19, align: 'center', weight: on ? 600 : 400, bg: PAL.panel });
    }
    /* the known lengths above the ladder; the one whose power of 10 this is stands out */
    for (const [p, , row] of LENGTHS) line(ctx, X(p), yl - 8, X(p), yl - 33 - 30 * row, PAL.muted, 2);
    for (const [p, name, row, side] of LENGTHS) text(ctx, name, X(p) + (side === 'left' ? 6 : -6), yl - 44 - 30 * row, p === n ? PAL.ink : PAL.muted, { size: 19, align: side, weight: p === n ? 600 : 400 });
    dot(ctx, X(n + Math.log10(m)), yl, C('position'), true, 8);
    /* the decade opened out: its whole-number marks, and the value among them */
    line(ctx, ZL, zy, ZR, zy, PAL.ink, 3);
    for (let k = 1; k <= 10; k++) {
      line(ctx, ZX(k), zy - 12, ZX(k), zy + 12, PAL.ink, 2);
      if ([1, 2, 3, 4, 5, 7, 10].includes(k)) text(ctx, mark(k, n), ZX(k), zy + 38, PAL.muted, { size: 18, align: 'center' });
    }
    const xm = ZX(m), sci = fmt(m, 1) + ' × ' + pow10(n) + ' m';
    dot(ctx, xm, zy, C('position'), true, 11);
    text(ctx, sci, Math.min(Math.max(xm, ZL + 60), ZR - 60), zy - 46, C('position'), { weight: 600, size: 24, align: 'center', bg: PAL.panel });
    headline(ctx, 'Every length from ' + mark(1, n) + ' up to ' + mark(10, n) + ' is of the order of magnitude ' + pow10(n) + '.');
    /* the value written out, and with its prefix */
    const sciTex = `${fmt(m, 1)} \\times 10^{${n}}\\ \\text{m}`, pre = (o) => `${o.num}\\ \\text{${o.sym}m}`;
    let r = sciTex;
    if (Math.abs(n) <= 3) r += ` = ${plain(m, n).replace(/,/g, '{,}')}\\ \\text{m}` + (own ? ` = ${fmt(m, 1)}\\ \\text{${own[2]}m}` : '');
    else if (near) r += ' = ' + pre(near);
    else r += ` = ${fmt(m, 1)} \\times 10^{${n - 18}}\\ \\text{Em}`;
    tex(d.readout, r);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the short drive home of Example 1.1. A car drives from school to
   home along a road marked in kilometers while a stopwatch counts the
   minutes. Under the road the one average speed is read on three scales
   laid side by side, km/min, km/h and m/s, each joined to the next by
   its conversion factor. Finite motion, so it gets the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-drive', 626);
  const D = ctl(d.controls, { label: '\\kd', cls: 'position', min: 1, max: 30, step: 0.5, value: 10, unit: 'km', dec: 1, onInput: reset, aria: 'distance' });
  const T = ctl(d.controls, { label: '\\kt', cls: 'time', min: 15, max: 60, step: 1, value: 20, unit: 'min', dec: 1, onInput: reset, aria: 'time' });
  const cy = cycle(() => T.v, 1.2);
  function reset() { cy.reset(); }
  /* Fixed frames, from the slider limits: the road is 0 to 30 km, and the fastest trip, 30 km in 15 min,
     is 2 km/min = 120 km/h = 33.3 m/s, the right-hand end of all three speed scales. */
  const KM_MAX = 30, VMAX = 120;
  const L = 330, R = 1200, X = (km) => L + ((R - L) * km) / KM_MAX;
  const SL = 380, SR = 1290, S = (kmh) => SL + ((SR - SL) * kmh) / VMAX;
  const ROWS = [
    { y: 412, unit: 'km/min', per: 60, minor: 0.1, major: 0.5, dec: 1 },   /* per: km/h in one of this unit */
    { y: 490, unit: 'km/h', per: 1, minor: 10, major: 30, dec: 0 },
    { y: 568, unit: 'm/s', per: 3.6, minor: 1, major: 5, dec: 0 },
  ];
  const ys = 228, kerb = ys - 24;
  F.hover(d.stage, () => { const cx = X((D.v * cy.now()) / T.v); return [{ x: cx, y: ys, r: 46, name: 'car' }, { x: cx + 90, y: ys - 8, r: 40, name: 'average speed' }, { x: 120, y: 204, r: 70, name: 'stopwatch' }]; });
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), done = tau >= T.v - 1e-9, pos = (D.v * tau) / T.v;
    const kmMin = D.v / T.v, kmH = kmMin * 60, mS = (kmH * 1000) / 3600, vals = [kmMin, kmH, mS];
    /* the road from school to home, marked in kilometers; the buildings stand at the far kerb and the car drives in front of them */
    const hx = X(D.v);
    school(ctx, L - 62, kerb, F.ref('school')); F.house(ctx, hx + 62, kerb, 84, 1, F.ref('home'));
    text(ctx, 'school', L - 62, kerb - 118, F.ref('school'), { size: 20, weight: 600, align: 'center' });
    text(ctx, 'home', hx + 62, kerb - 112, F.ref('home'), { size: 20, weight: 600, align: 'center' });
    strip(ctx, L, R, ys, 48);
    for (let km = 0; km <= KM_MAX; km++) { line(ctx, X(km), ys + 26, X(km), ys + (km % 5 ? 34 : 42), PAL.muted, 2); if (km % 5 === 0) text(ctx, km + ' km', X(km), ys + 60, PAL.muted, { size: 17, align: 'center' }); }
    hbracket(ctx, X(0), hx, ys + 92, C('position'), 'd = ' + fmt(D.v, 1) + ' km', { side: 'below' });
    /* the car, its average speed an arrow from the front bumper, one fixed length per km/h */
    const cx = X(pos);
    car(ctx, cx, ys + 4, F.ref('car'), 1.2);
    arrow(ctx, cx + 52, ys - 8, cx + 64 + (150 * kmH) / VMAX, ys - 8, C('velocity'), 5);
    /* the stopwatch, one turn of the dial an hour */
    stopwatch(ctx, 120, 204, 62, tau);
    F.rich(ctx, ['t = ', [fmt(tau, 1) + ' min', C('time')]], 120, 300, { align: 'center', size: 24 });
    /* one speed on three scales with a common zero; a line through all three marks it */
    const xv = S(kmH), left = xv > SR - 190;
    ROWS.forEach((r, i) => {
      line(ctx, SL, r.y, SR, r.y, PAL.ink, 3);
      const top = VMAX / r.per;
      for (let k = 0; k * r.minor <= top + 1e-9; k++) {
        const v = k * r.minor, big = Math.abs(v / r.major - Math.round(v / r.major)) < 1e-9, x = S(v * r.per);
        line(ctx, x, r.y, x, r.y + (big ? 13 : 7), PAL.ink, 2);
        if (big && Math.abs(x - xv) > 1) text(ctx, fmt(v, r.dec), x, r.y + 30, PAL.muted, { size: 17, align: 'center' });
      }
      text(ctx, r.unit, SL - 22, r.y, PAL.ink, { size: 20, align: 'right' });
    });
    line(ctx, xv, ROWS[0].y - 34, xv, ROWS[2].y + 14, C('velocity'), 3);
    ROWS.forEach((r, i) => {
      dot(ctx, xv, r.y, C('velocity'), true, 8);
      text(ctx, sig3(vals[i]) + ' ' + r.unit, xv + (left ? -14 : 14), r.y - 22, C('velocity'), { weight: 600, size: 22, align: left ? 'right' : 'left', bg: PAL.panel });
    });
    /* the conversion factor that carries each scale to the next */
    text(ctx, '× 60 min/h', SL - 96, (ROWS[0].y + ROWS[1].y) / 2, PAL.muted, { size: 18, align: 'right' });
    text(ctx, '× 1,000 m/km ÷ 3,600 s/h', SL - 96, (ROWS[1].y + ROWS[2].y) / 2, PAL.muted, { size: 18, align: 'right' });
    headline(ctx, done ? fmt(D.v, 1) + ' km in ' + fmt(T.v, 1) + ' min is one average speed: ' + sig3(kmMin) + ' km/min, ' + sig3(kmH) + ' km/h or ' + sig3(mS) + ' m/s.'
      : 'After ' + fmt(tau, 1) + ' min the car has gone ' + fmt(pos, 1) + ' km of the ' + fmt(D.v, 1) + ' km.');
    const km = '\\text{km}', mn = '\\text{min}', h = '\\text{h}';
    tex(d.readout, `\\text{average speed} = \\frac{\\kd}{\\kt} = \\frac{${fmt(D.v, 1)}\\ ${km}}{${fmt(T.v, 1)}\\ ${mn}} = ${sig3(kmMin)}\\ \\frac{${km}}{${mn}} \\\\ `
      + `${sig3(kmMin)}\\ \\frac{${km}}{\\cancel{${mn}}} \\times \\frac{60\\ \\cancel{${mn}}}{1\\ ${h}} = ${sig3(kmH)}\\ \\frac{${km}}{${h}} \\\\ `
      + `${sig3(kmH)}\\ \\frac{\\cancel{${km}}}{\\cancel{${h}}} \\times \\frac{1\\ \\cancel{${h}}}{3{,}600\\ \\text{s}} \\times \\frac{1{,}000\\ \\text{m}}{1\\ \\cancel{${km}}} = ${sig3(mS)}\\ \\frac{\\text{m}}{\\text{s}}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T.v / 5), draw });
})();
};
