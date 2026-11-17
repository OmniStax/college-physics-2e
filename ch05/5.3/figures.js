/* Figures for section 5.3 Elasticity: Stress and Strain. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['5.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, hover, ctl, register, begin, line, arrow, dot, text, headline, hbracket, vbracket, strip, axes, pinned, spring, block, fixed, view, face } = F;
const sim = (id, H) => F.sim(root, id, H);
const G = 9.80;
function readout(host, main, small) { tex(host, main); if (small) { const n = el('small', null, small); host.appendChild(n); F.renderMath(n); } }

/* ---------- helpers shared by the figures ---------- */
/* a rectangle outlined in a dashed line: the shape the object had before the force was applied */
/* a face of a locked-view solid outlined in the colour given rather than in ink */
function rface(ctx, pts, k, w, col) {
  face(ctx, pts, k);
  if (!w) return;
  ctx.save(); ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
}
function ghost(ctx, x, y, w, h) { line(ctx, x, y, x + w, y, PAL.muted, 2, [8, 8]); line(ctx, x + w, y, x + w, y + h, PAL.muted, 2, [8, 8]); line(ctx, x + w, y + h, x, y + h, PAL.muted, 2, [8, 8]); line(ctx, x, y + h, x, y, PAL.muted, 2, [8, 8]); }
/* a value in units of 10^9, written the way the book writes a modulus */
const giga = (v) => fmt(v, v < 10 ? 1 : 0) + ' × 10⁹ N/m²';
/* a number in scientific form for a readout, "5.00 \times 10^{7}" */
function sci(v, d) {
  if (v === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(v))), m = v / Math.pow(10, e);
  return `${fmt(m, d)} \\times 10^{${e}}`;
}
/* the same number for a headline or a note drawn on the canvas, "5.0 × 10⁷" */
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
function plain(v, d) {
  if (v === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(v))), m = v / Math.pow(10, e);
  if (e >= 0 && e <= 3) return fmt(v, Math.max(0, d - e));
  return fmt(m, d) + ' × 10' + String(e).split('').map((ch) => SUP[ch] ?? ch).join('');
}
/* how many times larger than life a deformation is drawn: the units it takes on the canvas against the units the object itself takes */
const timesLarger = (unitsPerMetreDrawn, unitsPerMetreScene) => (unitsPerMetreDrawn > 0 ? plain(unitsPerMetreDrawn / unitsPerMetreScene, 1) : '0');

/* =====================================================================
   FIGURE 5.11: deformation against applied force, with the curve of the
   book's image. The spring stands beside the graph, held at the bottom
   and pulled up, so its free end is at the height of the point on the
   curve. Let go, and the spring shows what the regions mean: inside the
   elastic region it returns to its original length, past it it does not.
===================================================================== */
(function () {
  const d = sim('sim-hooke-graph', 750);
  /* read off the book's image as fractions of the force and the deformation at fracture: the straight
     segment ends at (0.375, 0.375), the elastic region at (0.80, 0.575), and the curve bends up to (1, 1).
     The book prints no numbers, so the spring is given k = 200 N/m and a fracture at 20 N and 10 cm. */
  const KK = 200, FFR = 20, DMAX = 10, HOOKE = 7.5, ELAST = 16;
  const KN = [[0.375, 0.375], [0.44, 0.44], [0.57, 0.494], [0.70, 0.531], [0.80, 0.575], [0.90, 0.654], [0.95, 0.78], [1, 1]];
  /* slopes for a monotone cubic through the knots (Fritsch and Carlson), the first one the slope of the straight segment */
  const DS = KN.slice(1).map((p, i) => (p[1] - KN[i][1]) / (p[0] - KN[i][0]));
  const MS = KN.map((p, i) => (i === 0 ? 1 : i === KN.length - 1 ? DS[i - 1] * 1.4 : (2 * DS[i - 1] * DS[i]) / (DS[i - 1] + DS[i])));
  function shape(u) {
    if (u <= KN[0][0]) return u;
    let i = 0; while (i < KN.length - 2 && u > KN[i + 1][0]) i++;
    const h = KN[i + 1][0] - KN[i][0], t = Math.min(1, (u - KN[i][0]) / h), t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * KN[i][1] + (t3 - 2 * t2 + t) * h * MS[i] + (-2 * t3 + 3 * t2) * KN[i + 1][1] + (t3 - t2) * h * MS[i + 1];
  }
  const dl = (f) => DMAX * shape(Math.min(f, FFR) / FFR);              /* centimetres */
  /* what stays when the force is removed: nothing inside the elastic region, and past it the stretch gained beyond that region's end */
  const set = (f) => Math.max(0, dl(f) - dl(ELAST));
  const Fa = ctl(d.controls, { label: '\\kF', cls: 'force', min: 0, max: 20, step: 0.1, value: 5, unit: 'N', dec: 1, aria: 'applied force',
    specials: [{ at: () => HOOKE, label: 'end of the straight segment' }, { at: () => ELAST, label: 'end of the elastic region' }] });
  const hold = F.choice(d.controls, { label: '\\text{the force is}', options: [{ value: 'on', label: 'applied' }, { value: 'off', label: 'removed' }], value: 'on', aria: 'whether the force is applied or removed' });
  const ro = F.readout(d);
  function draw() {
    const { ctx } = begin(d.c);
    const f = Fa.v, x = dl(f), broken = f >= FFR, off = hold.value === 'off', left = set(f);
    const reg = f <= HOOKE ? 0 : f <= ELAST ? 1 : broken ? 3 : 2;
    const on = hold.mix((v) => (v === 'on' ? 1 : 0));                 /* 1 while the force is applied, easing to 0 when it is removed */
    const now = left + (x - left) * on;                               /* the deformation the spring shows at this instant */
    const box = { l: 400, r: 1320, t: 130, b: 520 };
    const ax = axes(ctx, box, [0, FFR], [0, DMAX], { xl: 'applied force F (N)', xc: C('force'), yl: 'deformation ΔL (cm)', yc: C('position'), nx: 4, ny: 5, fy: (v) => fmt(v, 0) });
    const { X, Y } = ax, cp = C('position'), cf = C('force'), csp = F.ref('spring');
    /* the limits of the regions, dropped from the curve to the axis as the book drops them */
    [HOOKE, ELAST, FFR].forEach((v) => line(ctx, X(v), Y(dl(v)), X(v), box.b + 100, alpha(PAL.ink, 0.4), 2, [6, 6]));
    F.plot(ctx, ax, dl, cp, { w: 5 });
    text(ctx, 'slope 1/k', X(4.6) + 14, Y(dl(4.6)) + 28, C('stiffness'), { size: 20, weight: 600 });
    const fx = X(FFR), fy = Y(DMAX);
    line(ctx, fx - 13, fy - 13, fx + 13, fy + 13, PAL.ink, 4); line(ctx, fx - 13, fy + 13, fx + 13, fy - 13, PAL.ink, 4);
    text(ctx, 'fracture', fx - 24, fy + 2, PAL.ink, { size: 19, weight: 600, align: 'right' });
    /* the regions, bracketed under the axis as in the book's figure */
    hbracket(ctx, X(0), X(HOOKE), box.b + 100, PAL.ink, 'Hooke’s law obeyed', { side: 'below' });
    hbracket(ctx, X(ELAST), X(FFR), box.b + 100, PAL.ink, 'permanent deformation', { side: 'below' });
    hbracket(ctx, X(0), X(ELAST), box.b + 156, PAL.ink, 'elastic region', { side: 'below' });
    /* the spring: held to the floor below the level ΔL = 0 and pulled upward, so its free end stands at the height of the point */
    const sx = 190, floor = box.b + 190, yEnd = Y(now);
    fixed(ctx, sx - 90, floor, 180, 30);
    line(ctx, sx - 110, Y(0), box.l, Y(0), PAL.muted, 2, [6, 6]);
    text(ctx, 'original length', sx + 50, Y(0) + 22, PAL.muted, { size: 17 });
    if (!broken) {
      spring(ctx, sx, floor, sx, yEnd, 12, 26, csp, 4);
      line(ctx, sx - 40, yEnd, sx + 40, yEnd, csp, 7);
      if (on > 0.02 && f > 0) {
        const aL = (20 + 3.4 * f) * on;
        arrow(ctx, sx, yEnd - 10, sx, yEnd - 10 - aL, cf, 5);
        text(ctx, 'F', sx + 18, yEnd - 14 - aL / 2, cf, { weight: 600, size: 24 });
      }
      if (Y(0) - yEnd > 10) vbracket(ctx, sx + 78, yEnd, Y(0), cp, 'ΔL', 1);
    } else {
      spring(ctx, sx, floor, sx, floor - 120, 5, 26, csp, 4);
      spring(ctx, sx, Y(0) - 60, sx, Y(0) - 180, 5, 26, csp, 4);
      line(ctx, sx - 40, Y(0) - 180, sx + 40, Y(0) - 180, csp, 7);
      text(ctx, 'broken', sx + 56, Y(0) - 30, PAL.muted, { size: 19, weight: 600 });
    }
    /* the point on the curve, level with the end of the spring; once the force is off, the point the spring comes back to */
    if (!broken) {
      line(ctx, sx + 40, yEnd, X(f * on), yEnd, cp, 2, [4, 8]);
      if (on > 0.5) line(ctx, X(f), box.b, X(f), Y(x), cf, 2, [4, 8]);
      if (off) dot(ctx, X(f), Y(x), PAL.ink, false, 10);
      dot(ctx, X(f * on), Y(now), PAL.ink, true, 10);
    }
    const nx = fmt(x, 2) + ' cm';
    headline(ctx, broken ? 'At ' + fmt(FFR, 0) + ' N the spring fractures.'
      : off ? (reg < 2 ? 'With the force removed the spring is back at its original length: a stretch of ' + nx + ' was elastic.'
        : 'With the force removed the spring stays ' + fmt(left, 2) + ' cm longer than it was: the deformation is permanent.')
        : reg === 0 ? 'A force of ' + fmt(f, 1) + ' N stretches the spring ' + nx + ', on the straight segment where Hooke’s law holds.'
          : reg === 1 ? 'A force of ' + fmt(f, 1) + ' N stretches the spring ' + nx + ': off the straight segment, but still elastic.'
            : 'A force of ' + fmt(f, 1) + ' N stretches the spring ' + nx + ', past the elastic region.');
    const pred = (100 * f) / KK, rel = reg === 0 ? '=' : Math.abs(x - pred) < 0.005 ? '\\approx' : x < pred ? '<' : '>';
    ro.set(`\\mk{dL}{\\kdL} = \\mk{nx}{${fmt(x, 2)}}\\ \\text{cm} \\mk{rel}{${rel}} \\mk{Fk}{\\frac{\\kF}{\\kk}} = \\mk{fk}{\\frac{${fmt(f, 1)}\\ \\text{N}}{${KK}\\ \\text{N/m}}} = \\mk{nfk}{${fmt(pred, 2)}}\\ \\text{cm}`, undefined, { form: rel });
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 5.12: the same weight on three guitar strings of the same
   length. The thicker string and the steel one have larger force
   constants, so the same weight stretches them less. Still.
===================================================================== */
(function () {
  const d = sim('sim-strings', 790);
  const w = ctl(d.controls, { label: '\\kwgt', cls: 'force', min: 2, max: 40, step: 1, value: 20, unit: 'N', dec: 0, aria: 'weight hung from each string' });
  const L0 = ctl(d.controls, { label: '\\kLo', cls: 'position', min: 0.2, max: 1.2, step: 0.05, value: 0.65, unit: 'm', dec: 2, aria: 'original length of the strings' });
  /* the book gives the strings no sizes: the thin ones are taken 1.0 mm across and the thicker one 2.0 mm, with Young's moduli from Table 5.3 */
  const STR = [
    { name: 'thin nylon', id: 'string-thin', Y: 5e9, r: 0.5e-3, lw: 5 },
    { name: 'thicker nylon', id: 'string-thick', Y: 5e9, r: 1.0e-3, lw: 11 },
    { name: 'steel', id: 'string-steel', Y: 210e9, r: 0.5e-3, lw: 5 },
  ];
  const kOf = (s) => (s.Y * Math.PI * s.r * s.r) / L0.v;              /* the force constant of a string, k = YA/L₀, in N/m */
  const dl = (s, force) => force / kOf(s);                             /* metres */
  function draw() {
    const { ctx } = begin(d.c);
    /* fixed exaggeration: seven thousand units per metre of stretch, whatever the sliders are set to,
       so a longer string really is drawn stretching farther. The longest stretch the sliders allow,
       12.2 mm, still draws inside its 90 units. */
    const MAG = 7000, cp = C('position'), cf = C('force');
    const yTop = 210, len = 110 + 230 * (L0.v / 1.2);
    fixed(ctx, 150, yTop - 44, 620, 44);
    STR.forEach((s, i) => {
      const x = 250 + i * 210, dL = dl(s, w.v), grow = Math.min(90, dL * MAG), yb = yTop + len + grow, col = F.ref(s.id);
      line(ctx, x, yTop, x, yTop + len, col, s.lw);
      line(ctx, x, yTop + len, x, yb, cp, s.lw);
      /* the weight: a hook and a slotted mass, as the book hangs one */
      ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, yb + 9, 8, 0, 2 * Math.PI); ctx.stroke();
      ctx.fillStyle = PAL.soft; ctx.beginPath(); ctx.moveTo(x - 30, yb + 18); ctx.lineTo(x + 30, yb + 18); ctx.lineTo(x + 42, yb + 70); ctx.lineTo(x - 42, yb + 70); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
      arrow(ctx, x, yb + 74, x, yb + 74 + 16 + w.v * 1.1, cf, 5);
      text(ctx, 'w', x + 16, yb + 74 + (16 + w.v * 1.1) / 2, cf, { size: 22, weight: 600 });
      text(ctx, s.name, x, yTop - 98, col, { size: 20, align: 'center', weight: 600 });
      text(ctx, 'k = ' + plain(kOf(s), 2) + ' N/m', x, yTop - 70, C('stiffness'), { size: 18, align: 'center', weight: 600 });
      text(ctx, 'ΔL = ' + fmt(dL * 1000, 2) + ' mm', x + 16 + s.lw / 2, yTop + len + grow / 2 - (grow < 20 ? 14 : 0), cp, { size: 18, weight: 600 });
    });
    vbracket(ctx, 120, yTop, yTop + len, cp, 'L₀', -1);
    /* the graph beside the scene: the stretch each string takes against the weight hung on it. The range is fixed: at the
       slider maxima (w = 40 N and L₀ = 1.20 m) the thin nylon string stretches 12.2 mm, so the axis holds 0 to 15 mm. */
    const YHI = 15;
    const box = { l: 880, r: 1320, t: 180, b: 600 };
    const { X, Y } = axes(ctx, box, [0, 40], [0, YHI], { xl: 'weight w (N)', xc: cf, yl: 'stretch ΔL (mm)', yc: cp, nx: 4, ny: 5, fy: (v) => fmt(v, 0) });
    line(ctx, X(w.v), box.b, X(w.v), Y(dl(STR[0], w.v) * 1000), cf, 2, [4, 8]);
    STR.forEach((s) => {
      line(ctx, X(0), Y(0), X(40), Y(dl(s, 40) * 1000), F.ref(s.id), 4);
      dot(ctx, X(w.v), Y(dl(s, w.v) * 1000), PAL.ink, true, 9);
    });
    text(ctx, 'thin nylon', X(40) - 8, Y(dl(STR[0], 40) * 1000) - 24, F.ref('string-thin'), { size: 18, align: 'right', weight: 600 });
    text(ctx, 'thicker nylon', X(40) - 8, Y(dl(STR[1], 40) * 1000) - 20, F.ref('string-thick'), { size: 18, align: 'right', weight: 600 });
    text(ctx, 'steel', X(40) - 8, Y(dl(STR[2], 40) * 1000) + 20, F.ref('string-steel'), { size: 18, align: 'right', weight: 600 });
    text(ctx, 'The stretch is drawn ' + timesLarger(MAG, len / L0.v) + ' times larger than it is.', 880, 740, PAL.muted, { size: 18 });
    headline(ctx, 'A ' + fmt(w.v, 0) + ' N weight stretches the thin nylon string ' + fmt(dl(STR[0], w.v) * 1000, 2) + ' mm, the thicker nylon string ' + fmt(dl(STR[1], w.v) * 1000, 2) + ' mm and the steel string ' + fmt(dl(STR[2], w.v) * 1000, 2) + ' mm.');
    readout(d.readout, `\\text{thin nylon: }\\ \\kdL = \\frac{\\kwgt}{\\kk} = \\frac{${fmt(w.v, 0)}\\ \\text{N}}{${fmt(kOf(STR[0]), 0)}\\ \\text{N/m}} = ${fmt(dl(STR[0], w.v) * 1000, 2)}\\ \\text{mm}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 5.15: the stress a mammalian tendon carries against its strain,
   with the shape of the book's curve, and above it the tendon's fibers
   doing what the text says they do in each region: uncrimping in the toe
   region, stretching in the linear region, breaking in the failure
   region. Still: the slider walks along the curve.
===================================================================== */
(function () {
  const d = sim('sim-tendon', 740);
  const eps = ctl(d.controls, { label: '\\text{strain}', cls: '', min: 0, max: 0.1, step: 0.001, value: 0.045, unit: '', dec: 3, aria: 'strain of the tendon',
    specials: [{ at: () => 0.03, label: 'end of the toe region' }, { at: () => 0.065, label: 'end of the linear region' }] });
  const ro = F.readout(d);
  /* Table 5.3 gives Young's modulus for tendon as 1 × 10⁹ N/m²: the slope of the linear region. The book's curve prints no
     numbers; read as fractions of its strain axis, the toe region ends at 0.29, the linear region at 0.65, the curve peaks
     at 0.72 and has fallen to a level at 0.93. The strain axis runs to the 10% the text gives for a support tendon. */
  const Y = 1000, TOE = 0.03, LIN = 0.065;                            /* MN/m² per unit strain */
  const sToe = (Y * TOE) / 2, sLin = sToe + Y * (LIN - TOE);
  const KN = [[LIN, sLin, Y], [0.072, sLin + 3.4, 0], [0.083, 38, -2300], [0.093, 25.5, -350], [0.1, 24.5, 0]];
  const seg = (e) => { let i = 0; while (i < KN.length - 2 && e > KN[i + 1][0]) i++; return i; };
  const stress = (e) => {
    if (e <= TOE) return (Y * e * e) / (2 * TOE);
    if (e <= LIN) return sToe + Y * (e - TOE);
    const i = seg(e), [x0, y0, m0] = KN[i], [x1, y1, m1] = KN[i + 1], h = x1 - x0, t = (e - x0) / h, t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * y0 + (t3 - 2 * t2 + t) * h * m0 + (-2 * t3 + 3 * t2) * y1 + (t3 - t2) * h * m1;
  };
  const slope = (e) => (e <= TOE ? (Y * e) / TOE : e <= LIN ? Y : (stress(Math.min(0.1, e + 1e-4)) - stress(e - 1e-4)) / (Math.min(0.1, e + 1e-4) - e + 1e-4));
  const NF = 7, breaksAt = (i) => LIN + ((0.1 - LIN) * [4, 1, 6, 2.2, 5, 3, 7][i]) / 9;   /* the strain at which each fiber breaks; two hold to the end */
  function draw() {
    const { ctx } = begin(d.c);
    const e = eps.v, s = stress(e), m = slope(e), reg = e <= TOE ? 0 : e <= LIN ? 1 : 2;
    const ctd = F.ref('tendon'), cs = C('stress'), cp = C('position');
    /* the tendon, clamped at the left and pulled to the right, drawn at its true proportions: a strain of 0.1 is a tenth of its length */
    const y = 190, x0 = 200, base = 800, grow = base * e, xe = x0 + base + grow;
    fixed(ctx, x0 - 54, y - 70, 54, 140);
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(x0, y - 44, base + grow, 88); ctx.restore();
    line(ctx, x0, y - 44, xe, y - 44, ctd, 3); line(ctx, x0, y + 44, xe, y + 44, ctd, 3); line(ctx, xe, y - 44, xe, y + 44, ctd, 6);
    const crimp = 5.5 * Math.max(0, 1 - e / TOE);
    let broken = 0;
    for (let i = 0; i < NF; i++) {
      const fy = y - 33 + i * 11, cut = e > breaksAt(i), wave = (xa, xb, amp) => {
        ctx.save(); ctx.strokeStyle = ctd; ctx.lineWidth = 2.5; ctx.beginPath();
        for (let k = 0; k <= 160; k++) { const xx = xa + ((xb - xa) * k) / 160, yy = fy + amp * Math.sin(((xx - x0) / (base + grow)) * 36 * Math.PI + i); if (k) ctx.lineTo(xx, yy); else ctx.moveTo(xx, yy); }
        ctx.stroke(); ctx.restore();
      };
      if (!cut) wave(x0, xe, crimp);
      else { broken++; const mid = x0 + (base + grow) * (0.3 + 0.07 * ((i * 3) % 7)), gap = 26 + 600 * (e - breaksAt(i)); wave(x0, mid - gap, 4); wave(mid + gap, xe, 4); }
    }
    line(ctx, x0 + base, y - 62, x0 + base, y + 62, PAL.muted, 2, [6, 6]);
    arrow(ctx, xe + 14, y, xe + 14 + 34 + s * 2.4, y, cs, 5);
    text(ctx, 'stress', xe + 20, y - 30, cs, { weight: 600, size: 21 });
    hbracket(ctx, x0, x0 + base, y + 78, cp, 'L₀', { side: 'below' });
    if (grow > 8) hbracket(ctx, x0 + base, xe, y + 78, cp, 'ΔL', { side: 'below' });
    /* the graph: the stress against the strain, with the three regions the book names */
    const box = { l: 200, r: 1280, t: 370, b: 650 };
    const ax = axes(ctx, box, [0, 0.1], [0, 60], { xl: 'strain ΔL/L₀', xc: PAL.ink, yl: 'tensile stress (MN/m²)', yc: cs, nx: 5, ny: 3, fx: (v) => fmt(v, 2) });
    const { X, Y: Yg } = ax;
    [TOE, LIN].forEach((v) => line(ctx, X(v), Yg(stress(v)), X(v), box.b, alpha(PAL.ink, 0.4), 2, [6, 6]));
    F.plot(ctx, ax, stress, cs, { w: 5 });
    text(ctx, 'toe region', X(TOE / 2), box.b - 20, PAL.muted, { size: 19, align: 'center' });
    text(ctx, 'linear region', X((TOE + LIN) / 2), box.b - 20, PAL.muted, { size: 19, align: 'center' });
    text(ctx, 'failure region', X((LIN + 0.1) / 2), box.b - 20, PAL.muted, { size: 19, align: 'center' });
    /* the tangent at the point: its slope is what the tendon's stiffness is at this strain */
    const half = 0.011, ea = Math.max(0, e - half), eb = Math.min(0.1, e + half);
    line(ctx, X(ea), Yg(s + m * (ea - e)), X(eb), Yg(s + m * (eb - e)), C('elastic-modulus'), 3, [10, 10]);
    line(ctx, box.l, Yg(s), X(e), Yg(s), cs, 2, [4, 8]);
    dot(ctx, X(e), Yg(s), PAL.ink, true, 10);
    const at = 'At a strain of ' + fmt(e, 3) + ' the stress is ' + fmt(s, 1) + ' MN/m²';
    headline(ctx, reg === 0 ? at + ': the crimped fibers are still straightening, so the tendon stretches easily.'
      : reg === 1 ? at + ': the fibers are straight and stretch together.'
        : at + ': ' + (broken ? broken + ' of the ' + NF + ' fibers drawn have broken.' : 'the fibers are about to break.'));
    const rel = reg === 1 ? '=' : '<';
    ro.set(`\\text{slope} = \\mk{m}{${fmt(m / 1000, 2)}} \\times 10^{9}\\ \\text{N/m}^2 \\mk{rel}{${rel}} \\kY = 1 \\times 10^{9}\\ \\text{N/m}^2`, undefined, { form: rel });
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 5.17: the nail a picture hangs from, seen from the side as the
   book draws it and opening on the numbers of Example 5.5. The nail, its
   thickness and the length outside the wall share one scale (70 units to
   the millimetre); only the flex is drawn larger than it is. Still.
===================================================================== */
(function () {
  const d = sim('sim-nail', 640);
  const mm = ctl(d.controls, { label: '\\km', cls: 'mass', min: 1, max: 15, step: 0.1, value: 5.2, unit: 'kg', dec: 1, aria: 'mass of the picture' });
  const rr = ctl(d.controls, { label: '\\krad', cls: 'position', min: 0.5, max: 1.25, step: 0.05, value: 0.75, unit: 'mm', dec: 2, aria: 'radius of the nail' });
  const L0 = ctl(d.controls, { label: '\\kLo', cls: 'position', min: 2, max: 12, step: 0.25, value: 5, unit: 'mm', dec: 2, aria: 'length of nail outside the wall' });
  const S = 80e9;                                                     /* steel, from Table 5.3, as Example 5.5 takes it */
  const area = () => Math.PI * Math.pow(rr.v / 1000, 2);
  const force = () => mm.v * G;
  const dx = () => (force() * (L0.v / 1000)) / (S * area());
  const SC = 70;                                                      /* units per millimetre of nail */
  function draw() {
    const { ctx } = begin(d.c);
    const x = dx(), w = force();
    const len = SC * L0.v, half = SC * rr.v;
    const cn = F.ref('nail'), cw = F.ref('wall'), cpic = F.ref('picture'), cp = C('position'), cf = C('force');
    /* the flex: 20 units to the micrometre, held at 100 units, so the nail never bends out of the picture; the note states the magnification */
    const wallL = 300, wallR = 420, y = 270, flex = Math.min(100, x * 2e7), MAG = x > 0 ? flex / x : 0;
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(wallL, 96, wallR - wallL, 520); ctx.restore();
    line(ctx, wallL, 96, wallL, 616, cw, 3); line(ctx, wallR, 96, wallR, 616, cw, 3);
    text(ctx, 'wall', (wallL + wallR) / 2, 590, cw, { size: 20, align: 'center', weight: 600 });
    /* the nail: a point left of the wall, a shank straight through the wall and bent outside it, and a head past the picture */
    const x0 = 70, taper = 150, px = wallR + len, hx = px + 62;
    const cen = (xx) => (xx <= wallR ? y : y + flex * Math.pow((xx - wallR) / len, 2));
    const wid = (xx) => (xx < x0 + taper ? half * ((xx - x0) / taper) : half);
    const path = (xa, xb, bend) => {
      const n = 60; ctx.beginPath();
      for (let i = 0; i <= n; i++) { const xx = xa + ((xb - xa) * i) / n, c = bend ? cen(xx) : y; if (i) ctx.lineTo(xx, c - wid(xx)); else ctx.moveTo(xx, c - wid(xx)); }
      for (let i = n; i >= 0; i--) { const xx = xa + ((xb - xa) * i) / n, c = bend ? cen(xx) : y; ctx.lineTo(xx, c + wid(xx)); }
      ctx.closePath();
    };
    /* the picture, edge on: a board hanging against the nail just inside its head */
    const pTop = y - half - 46, pBot = 500, pw = 44;
    ctx.save(); ctx.lineJoin = 'round';
    ctx.fillStyle = alpha(cpic, 0.22); ctx.strokeStyle = cpic; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(px, pTop, pw, pBot - pTop, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = cn; ctx.lineWidth = 3;
    path(x0, hx, true); ctx.fill(); ctx.stroke();
    /* a band of shading along the underside, for the roundness of the shank */
    ctx.strokeStyle = alpha(cn, 0.2); ctx.lineWidth = half * 0.36;
    ctx.beginPath(); for (let i = 0; i <= 60; i++) { const xx = x0 + taper + ((hx - x0 - taper) * i) / 60; if (i) ctx.lineTo(xx, cen(xx) + half * 0.55); else ctx.moveTo(xx, cen(xx) + half * 0.55); } ctx.stroke();
    const hy = cen(hx), hh = half + 34;
    ctx.fillStyle = alpha(cn, 0.3); ctx.strokeStyle = cn; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(hx - 2, hy - hh, 26, 2 * hh, 9); ctx.fill(); ctx.stroke();
    ctx.restore();
    /* where the nail lay before the picture was hung */
    if (flex > 3) { line(ctx, wallR, y - half, hx + 80, y - half, PAL.muted, 2, [8, 8]); line(ctx, wallR, y + half, px, y + half, PAL.muted, 2, [8, 8]); }
    text(ctx, 'steel nail', x0 + taper + 10, y - half - 22, cn, { size: 20, weight: 600 });
    text(ctx, 'picture', px + pw / 2, pBot - 28, cpic, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
    /* the two equal and opposite forces across the nail: the wall's push up on the buried part, the picture's weight down */
    const aL = 46 + 4 * mm.v;
    const ux = (wallL + wallR) / 2;
    arrow(ctx, ux, y + half + 12 + aL, ux, y + half + 12, cf, 5);
    text(ctx, 'w', ux - 22, y + half + 16 + aL / 2, cf, { weight: 600, size: 24, align: 'right' });
    arrow(ctx, px + pw / 2, pBot + 8, px + pw / 2, pBot + 8 + aL, cf, 5);
    text(ctx, 'w = ' + fmt(w, 1) + ' N', px + pw / 2 + 18, pBot + 12 + aL / 2, cf, { weight: 600, size: 22 });
    /* the measures */
    vbracket(ctx, wallL - 40, y - half, y + half, cp, '2r = ' + fmt(2 * rr.v, 2) + ' mm', -1);
    hbracket(ctx, wallR, px, y - half - 86, cp, 'L₀ = ' + fmt(L0.v, 2) + ' mm');
    line(ctx, px, y - half - 86, px, pTop, alpha(PAL.ink, 0.4), 2, [4, 8]);
    if (flex > 3) vbracket(ctx, hx + 70, y - half, hy - half, cp, 'Δx = ' + fmt(x * 1e6, 2) + ' µm', 1);
    text(ctx, 'The flex is drawn ' + plain(MAG / (SC * 1000), 1) + ' times larger than it is.', 1340, 610, PAL.muted, { size: 18, align: 'right' });
    headline(ctx, 'A ' + fmt(mm.v, 1) + ' kg picture weighs ' + fmt(w, 0) + ' N and bends the nail ' + fmt(x * 1e6, 2) + ' µm.');
    readout(d.readout, `\\kdx = \\frac{1}{\\kS}\\frac{\\kF}{\\karea}\\kLo = \\frac{(${fmt(w, 1)}\\ \\text{N})(${sci(L0.v / 1000, 2)}\\ \\text{m})}{(${sci(S, 0)}\\ \\text{N/m}^2)(${sci(area(), 2)}\\ \\text{m}^2)} = ${sci(x, 2)}\\ \\text{m}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 5.18: a cube squeezed by the same force per unit area on every
   surface. The change in volume is proportional to the stress and to the
   original volume, and the constant is the bulk modulus. Still.
===================================================================== */
(function () {
  const d = sim('sim-cube', 690);
  const st = ctl(d.controls, { label: '\\frac{\\kF}{\\karea}', cls: 'stress', min: 0, max: 100, step: 1, value: 50, unit: '× 10⁶ N/m²', dec: 0, aria: 'force per unit area applied on every surface' });
  /* every bulk modulus Table 5.3 prints is a tick on the slider, and the tenth the slider steps by
     lands on each of them exactly; two are named, and naming more would crowd the track */
  const BDET = [0.7, 0.9, { v: 2.2, label: 'water' }, 4.5, 8, 25, 30, 45, 50, 70, 75, 90, { v: 130, label: 'steel' }];
  const BB = ctl(d.controls, { label: '\\kBb', cls: 'elastic-modulus', min: 0.7, max: 130, step: 0.1, value: 2.2, unit: '× 10⁹ N/m²', dec: 1, aria: 'bulk modulus', detents: BDET });
  const LIQ = [{ n: 'acetone', B: 0.7 }, { n: 'ethanol', B: 0.9 }, { n: 'water', B: 2.2 }, { n: 'glycerin', B: 4.5 }, { n: 'mercury', B: 25 }];
  const stress = () => st.v * 1e6;
  const frac = (Bg) => Math.min(0.6, stress() / (Bg * 1e9));
  const TOPY = 15;
  function draw() {
    const { ctx } = begin(d.c);
    const f = frac(BB.v);
    const side = 330, MAG = 20;
    const shrink = Math.min(0.45, (1 - Math.pow(1 - f, 1 / 3)) * MAG);
    /* the book's viewpoint for this cube: the same locked view the bookcase of Figure 5.16 uses, a little to the left of the solid and a little above it, so its left side, its top and its front all show */
    const V = view({ yaw: -0.42, pitch: 0.2, dist: 2400, cx: 370, cy: 365 });
    const h0 = side / 2, h2 = h0 * (1 - shrink);                      /* half the original edge and half the squeezed edge, in scene units */
    /* the six faces of a cube, each as its outward normal and the four corners in units of the half-edge */
    const FACES = [
      { n: [0, 1, 0], q: [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1]] },
      { n: [0, -1, 0], q: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]] },
      { n: [-1, 0, 0], q: [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]] },
      { n: [1, 0, 0], q: [[1, -1, -1], [1, -1, 1], [1, 1, 1], [1, 1, -1]] },
      { n: [0, 0, 1], q: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]] },
      { n: [0, 0, -1], q: [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1]] },
    ];
    const seen = (n) => n[1] > 0 || n[0] < 0 || n[2] > 0;             /* from this viewpoint the top, the left side and the front are the faces in view */
    const pt = (h) => (c) => V.P([c[0] * h, c[1] * h, c[2] * h]);
    /* the ghost of the original volume: the cube the material filled before the force was applied, left as a wireframe */
    FACES.filter((g) => seen(g.n)).forEach((g) => face(ctx, g.q.map(pt(h0)), null, 2));
    const far = pt(h0)([1, -1, -1]);
    [[-1, -1, -1], [1, 1, -1], [1, -1, 1]].forEach((c) => { const e = pt(h0)(c); line(ctx, far[0], far[1], e[0], e[1], PAL.muted, 2, [8, 8]); });
    /* an arrow pressing inward on the middle of a face, drawn in scene units so the perspective carries it */
    const al = 26 + st.v * 0.55;
    const push = (n, w) => {
      const c = [n[0] * h2, n[1] * h2, n[2] * h2];
      const tail = V.P([c[0] + n[0] * (al + 16), c[1] + n[1] * (al + 16), c[2] + n[2] * (al + 16)]);
      const head = V.P([c[0] + n[0] * 10, c[1] + n[1] * 10, c[2] + n[2] * 10]);
      arrow(ctx, tail[0], tail[1], head[0], head[1], w ? alpha(C('stress'), 0.45) : C('stress'), 5);
      return tail;
    };
    FACES.filter((g) => !seen(g.n)).forEach((g) => push(g.n, 1));     /* the three faces turned away from us press inward too, so they are drawn muted and behind the solid */
    /* the squeezed cube inside the ghost, each face in view lit by the lamp */
    const ccu = F.ref('cube');
    FACES.filter((g) => seen(g.n)).forEach((g) => rface(ctx, g.q.map(pt(h2)), V.shade(g.n), 3, ccu));
    const tops = FACES.filter((g) => seen(g.n)).map((g) => push(g.n, 0));
    const topTail = tops[0];
    text(ctx, 'F/A on every surface', topTail[0], topTail[1] - 34, C('stress'), { size: 20, align: 'center', weight: 600 });
    const lo = pt(h0)([-1, -1, 1]), ctr = pt(h2)([0, 0, 1]);   /* the ghost's front bottom left corner, whose foot has room for the volume label */
    const aq = pt(h0)([-0.55, 1, -0.55]);
    text(ctx, 'A', aq[0], aq[1] + 2, C('area'), { size: 20, align: 'center', weight: 600 });
    text(ctx, 'V₀', lo[0] - 10, lo[1] + 6, C('volume'), { size: 22, align: 'right', weight: 600 });
    text(ctx, 'V₀ − ΔV', ctr[0], ctr[1] + 44, C('volume'), { size: 21, align: 'center', weight: 600 });   /* below the centre, off the arrow pressing on the hidden back face */
    text(ctx, 'The shrinking is drawn ' + MAG + ' times larger than it is.', 110, 650, PAL.muted, { size: 18 });
    /* the graph beside the scene: the fractional change against the force per unit area, for the five liquids of Table 5.3 */
    const box = { l: 800, r: 1310, t: 160, b: 580 };
    const { X, Y } = axes(ctx, box, [0, 100], [0, TOPY], { xl: 'force per unit area F/A (× 10⁶ N/m²)', xc: C('stress'), yl: 'fractional change ΔV / V₀ (%)', yc: PAL.ink, nx: 4, ny: 3, fy: (v) => fmt(v, 0) });
    LIQ.forEach((q) => {
      const e = Math.min(100, (TOPY / 100) * q.B * 1e9 / 1e6);
      line(ctx, X(0), Y(0), X(e), Y(Math.min(TOPY, (e * 1e6 / (q.B * 1e9)) * 100)), PAL.rule, 3);
      text(ctx, q.n, X(e) - 10, Y(Math.min(TOPY, (e * 1e6 / (q.B * 1e9)) * 100)) - 16, PAL.muted, { size: 16, align: 'right' });
    });
    const ec = Math.min(100, (TOPY / 100) * BB.v * 1e9 / 1e6);
    line(ctx, X(0), Y(0), X(ec), Y(Math.min(TOPY, (ec * 1e6 / (BB.v * 1e9)) * 100)), C('elastic-modulus'), 5);
    if (f * 100 <= TOPY) { line(ctx, X(st.v), box.b, X(st.v), Y(f * 100), C('stress'), 2, [4, 8]); dot(ctx, X(st.v), Y(f * 100), PAL.ink, true, 10); }
    const liq = LIQ.find((q) => Math.abs(q.B - BB.v) < 0.01);
    headline(ctx, 'A force per unit area of ' + plain(stress(), 1) + ' N/m² compresses ' + (liq ? liq.n : 'a material of bulk modulus ' + giga(BB.v)) + ' by ' + fmt(f * 100, 1) + '% of its volume.');
    readout(d.readout, `\\frac{\\kdvol}{\\kvolo} = \\frac{1}{\\kBb}\\frac{\\kF}{\\karea} = \\frac{${sci(stress(), 2)}\\ \\text{N/m}^2}{${sci(BB.v * 1e9, 1)}\\ \\text{N/m}^2} = ${fmt(f, 3)} = ${fmt(f * 100, 1)}\\%`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
