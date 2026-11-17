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
    [HOOKE, ELAST, FFR].forEach((v) => line(ctx, X(v), Y(dl(v)), X(v), box.b + 112, alpha(PAL.ink, 0.4), 2, [6, 6]));
    F.plot(ctx, ax, dl, cp, { w: 5 });
    text(ctx, 'slope 1/k', X(4.6) + 14, Y(dl(4.6)) + 28, C('stiffness'), { size: 20, weight: 600 });
    const fx = X(FFR), fy = Y(DMAX);
    line(ctx, fx - 13, fy - 13, fx + 13, fy + 13, PAL.ink, 4); line(ctx, fx - 13, fy + 13, fx + 13, fy - 13, PAL.ink, 4);
    text(ctx, 'fracture', fx - 24, fy + 2, PAL.ink, { size: 19, weight: 600, align: 'right' });
    /* the regions, bracketed under the axis as in the book's figure */
    hbracket(ctx, X(0), X(HOOKE), box.b + 112, PAL.ink, 'Hooke’s law obeyed');
    hbracket(ctx, X(ELAST), X(FFR), box.b + 112, PAL.ink, 'permanent deformation');
    hbracket(ctx, X(0), X(ELAST), box.b + 166, PAL.ink, 'elastic region');
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
  const d = sim('sim-strings', 780);
  const w = ctl(d.controls, { label: '\\kwgt', cls: 'force', min: 2, max: 40, step: 1, value: 20, unit: 'N', dec: 0, aria: 'weight hung from each string' });
  const L0 = ctl(d.controls, { label: '\\kLo', cls: 'position', min: 0.2, max: 1.2, step: 0.05, value: 0.65, unit: 'm', dec: 2, aria: 'original length of the strings' });
  const STR = [
    { name: 'thin nylon', id: 'string-thin', Y: 5e9, r: 0.5e-3 },
    { name: 'thicker nylon', id: 'string-thick', Y: 5e9, r: 1.0e-3 },
    { name: 'steel', id: 'string-steel', Y: 210e9, r: 0.5e-3 },
  ];
  const area = (s) => Math.PI * s.r * s.r;
  const dl = (s, force) => (force * L0.v) / (s.Y * area(s));       /* metres */
  function draw() {
    const { ctx } = begin(d.c);
    /* fixed exaggeration: seven thousand units per metre of stretch, whatever the sliders are set to,
       so a longer string really is drawn stretching farther instead of the picture rescaling itself
       around it. The longest stretch the sliders allow, 12.2 mm, still draws inside its 90 units. */
    const MAG = 7000;
    const yTop = 240, len = 130 + 200 * (L0.v / 1.2);
    fixed(ctx, 200, yTop - 44, 560, 44);
    STR.forEach((s, i) => {
      const x = 270 + i * 190, dL = dl(s, w.v), grow = Math.min(90, dL * MAG);
      line(ctx, x, yTop, x, yTop + len, F.ref(s.id), i === 1 ? 7 : 4);
      line(ctx, x, yTop + len, x, yTop + len + grow, C('position'), i === 1 ? 7 : 4);
      block(ctx, x, yTop + len + grow + 30, 74, 46, PAL.ink);
      arrow(ctx, x, yTop + len + grow + 58, x, yTop + len + grow + 58 + 16 + w.v * 1.1, C('force'), 5);
      /* the middle string's name and modulus sit a row higher, so the three moduli never run into one another */
      const up = i === 1 ? 26 : 0;
      text(ctx, s.name, x, yTop - 100 - up, F.ref(s.id), { size: 19, align: 'center', weight: 600 });
      text(ctx, 'Y = ' + giga(s.Y / 1e9), x, yTop - 74 - up, C('elastic-modulus'), { size: 17, align: 'center' });
      text(ctx, fmt(dL * 1000, 2) + ' mm', x + 46, yTop + len + grow / 2 - 12, C('position'), { size: 17, weight: 600 });
    });
    text(ctx, 'w = ' + fmt(w.v, 0) + ' N on each string', 830, 700, C('force'), { size: 20, weight: 600 });
    text(ctx, 'the stretch is drawn about ' + timesLarger(MAG, len / L0.v) + ' times larger than it is', 830, 728, PAL.muted, { size: 17 });
    vbracket(ctx, 176, yTop, yTop + len, C('position'), 'L₀ = ' + fmt(L0.v, 2) + ' m', -1);
    /* the graph beside the vertical scene: the stretch each string takes against the weight hung on it */
    /* The range is fixed: at the slider maxima (w = 40 N and L₀ = 1.20 m) the thin nylon string, the
       one that gives most, stretches 12.2 mm, so the axis holds 0 to 15 mm in ticks of 3 mm and never
       rescales; a stretch past 15 mm is drawn with pinned(). */
    const YHI = 15, YN = 5;
    const box = { l: 830, r: 1310, t: 190, b: 600 };
    const { X, Y } = axes(ctx, box, [0, 40], [0, YHI], { xl: 'weight w (N)', xc: C('force'), yl: 'stretch ΔL (mm)', yc: C('position'), nx: 4, ny: YN, fy: (v) => fmt(v, 1) });
    STR.forEach((s, i) => {
      const e = Math.min(40, (YHI / 1000) * s.Y * area(s) / L0.v);
      line(ctx, X(0), Y(0), X(e), Y(dl(s, e) * 1000), C('position'), i === 1 ? 5 : 3);
      const yv = dl(s, w.v) * 1000;
      if (yv <= YHI) dot(ctx, X(w.v), Y(yv), PAL.ink, true, 9); else pinned(ctx, box, X, Y, w.v, yv, C('position'), fmt(yv, 1) + ' mm');
      text(ctx, s.name, X(e) - 10, Y(dl(s, e) * 1000) - 18, F.ref(s.id), { size: 17, align: 'right' });
    });
    headline(ctx, 'A ' + fmt(w.v, 0) + ' N weight stretches the thin nylon string ' + fmt(dl(STR[0], w.v) * 1000, 2) + ' mm, the thicker nylon string ' + fmt(dl(STR[1], w.v) * 1000, 2) + ' mm and the steel string ' + fmt(dl(STR[2], w.v) * 1000, 2) + ' mm');
    readout(d.readout, `\\kdL = \\frac{1}{\\kY}\\frac{\\kwgt}{\\karea}\\kLo = \\frac{(${fmt(w.v, 0)}\\ \\text{N})(${fmt(L0.v, 2)}\\ \\text{m})}{(${sci(STR[0].Y, 0)}\\ \\text{N/m}^2)(${sci(area(STR[0]), 2)}\\ \\text{m}^2)} = ${sci(dl(STR[0], w.v), 2)}\\ \\text{m}`,
      'The thicker nylon string has four times the area of the thin one and the steel string forty-two times its Young’s modulus, so they stretch a quarter as far and forty-two times less.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 5.15: the stress a mammalian tendon carries against its strain.
   The toe region gives easily, the linear region has the slope Table 5.3
   gives for tendon, and in the failure region fibers break. Still.
===================================================================== */
(function () {
  const d = sim('sim-tendon', 730);
  const eps = ctl(d.controls, { label: '\\text{strain}', cls: '', min: 0, max: 0.1, step: 0.002, value: 0.04, unit: '', dec: 3, aria: 'strain of the tendon' });
  const L0 = ctl(d.controls, { label: '\\kLo', cls: 'position', min: 5, max: 40, step: 1, value: 20, unit: 'cm', dec: 0, aria: 'original length of the tendon' });
  const Y = 1e9, TOE = 0.02, LIN = 0.06;                            /* Table 5.3 gives Young's modulus for tendon as 1 × 10⁹ N/m² */
  const stress = (e) => (e <= TOE ? (Y * e * e) / (2 * TOE)
    : e <= LIN ? (Y * TOE) / 2 + Y * (e - TOE)
      : (Y * TOE) / 2 + Y * (LIN - TOE) + 0.5 * Y * (e - LIN) - 12 * Y * (e - LIN) * (e - LIN));
  /* the slope of the curve at a strain; in the failure region it falls through zero and turns
     negative, and the tangent drawn on the graph follows it down rather than lying flat */
  const slope = (e) => (e <= TOE ? (Y * e) / TOE : e <= LIN ? Y : 0.5 * Y - 24 * Y * (e - LIN));
  const TOP = 80e6;
  function draw() {
    const { ctx } = begin(d.c);
    const e = eps.v, s = stress(e), L = L0.v / 100, dL = e * L;
    /* the scene: the tendon stretched along a strip */
    const y = 160, x0 = 220, base = 260 + 460 * (L0.v / 40), grow = base * e;
    strip(ctx, 120, 1320, y, 56);
    fixed(ctx, x0 - 54, y - 60, 54, 120);
    /* the tendon is a referent and wears its colour; the stress it carries keeps the type hue */
    const ctd = F.ref('tendon');
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(x0, y - 20, base + grow, 40); ctx.restore();
    line(ctx, x0, y - 20, x0 + base + grow, y - 20, ctd, 4); line(ctx, x0, y + 20, x0 + base + grow, y + 20, ctd, 4);
    line(ctx, x0 + base, y - 46, x0 + base, y + 46, PAL.muted, 2, [6, 6]);
    arrow(ctx, x0 + base + grow + 20, y, x0 + base + grow + 20 + 40 + s / 6e5, y, C('stress'), 5);
    text(ctx, 'stress ' + fmt(s / 1e6, 1) + ' MN/m²', x0 + base + grow + 26, y - 34, C('stress'), { weight: 600, size: 20 });
    if (grow > 6) hbracket(ctx, x0 + base, x0 + base + grow, y + 80, C('position'), 'ΔL = ' + fmt(dL * 1000, 1) + ' mm');
    hbracket(ctx, x0, x0 + base, y + 80, C('position'), 'L₀ = ' + fmt(L0.v, 0) + ' cm');
    /* the graph: the stress the tendon carries against its strain, with the three regions the book names */
    const box = { l: 210, r: 1270, t: 340, b: 640 };
    const { X, Y: Yg } = axes(ctx, box, [0, 0.1], [0, TOP / 1e6], { xl: 'strain ΔL / L₀', xc: PAL.ink, yl: 'tensile stress (MN/m²)', yc: C('stress'), nx: 5, ny: 4, fx: (v) => fmt(v, 2) });
    /* a region of the graph is not a quantity, so it is banded in ink and never in a type hue */
    const band = (a, b) => { ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(X(a), box.t, X(b) - X(a), box.b - box.t); ctx.restore(); };
    band(0, TOE); band(LIN, 0.1);
    F.curve(ctx, (t) => stress(t) / 1e6, 0, 0.1, X, Yg, C('stress'), 5, 120);
    text(ctx, '(1) toe region', X(TOE / 2), box.t + 24, PAL.muted, { size: 18, align: 'center' });
    text(ctx, '(2) linear region', X((TOE + LIN) / 2), box.t + 24, PAL.muted, { size: 18, align: 'center' });
    text(ctx, '(3) failure region', X((LIN + 0.1) / 2), box.t + 24, PAL.muted, { size: 18, align: 'center' });
    /* the tangent, which is the modulus at this strain */
    const m = slope(e), half = 0.012;
    line(ctx, X(Math.max(0, e - half)), Yg((s + m * (Math.max(0, e - half) - e)) / 1e6), X(Math.min(0.1, e + half)), Yg((s + m * (Math.min(0.1, e + half) - e)) / 1e6), C('elastic-modulus'), 3, [10, 10]);
    line(ctx, X(e), box.b, X(e), Yg(s / 1e6), PAL.muted, 2, [4, 8]);
    line(ctx, box.l, Yg(s / 1e6), X(e), Yg(s / 1e6), C('stress'), 2, [4, 8]);
    dot(ctx, X(e), Yg(s / 1e6), PAL.ink, true, 10);
    headline(ctx, 'At a strain of ' + fmt(e, 3) + ' the tendon carries a stress of ' + fmt(s / 1e6, 1) + ' MN/m², and the slope of the curve there is ' + plain(m, 1) + ' N/m²');
    /* the book gives stress no letter of its own, so the readout writes the word; it is a bound type
       here, so the word is set in the stress hue rather than left in ink */
    readout(d.readout, `\\text{strain} = \\frac{\\kdL}{\\kLo} = \\frac{${fmt(dL * 1000, 1)}\\ \\text{mm}}{${fmt(L0.v, 0)}\\ \\text{cm}} = ${fmt(e, 3)}`,
      'Only in the linear region does stress = $\\kY$ × strain hold, with $\\kY = 1 \\times 10^9\\ \\text{N/m}^2$.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 5.17: the nail a picture hangs from, seen from the side. The
   weight shears the nail across the cross section where it leaves the
   wall, and it flexes by an amount too small to see. Still.
===================================================================== */
(function () {
  const d = sim('sim-nail', 690);
  const mm = ctl(d.controls, { label: '\\km', cls: 'mass', min: 0.5, max: 20, step: 0.1, value: 5.2, unit: 'kg', dec: 1, aria: 'mass of the picture' });
  const rr = ctl(d.controls, { label: '\\krad', cls: 'position', min: 0.25, max: 2, step: 0.05, value: 0.75, unit: 'mm', dec: 2, aria: 'radius of the nail' });
  const L0 = ctl(d.controls, { label: '\\kLo', cls: 'position', min: 2, max: 20, step: 0.5, value: 5, unit: 'mm', dec: 2, aria: 'length of nail outside the wall' });
  const S = 80e9;                                                     /* steel, from Table 5.3, as Example 5.5 takes it */
  const area = () => Math.PI * Math.pow(rr.v / 1000, 2);
  const force = () => mm.v * G;
  const dx = () => (force() * (L0.v / 1000)) / (S * area());
  function draw() {
    const { ctx } = begin(d.c);
    const x = dx(), w = force();
    const len = 150 + 400 * (L0.v / 20), thick = 12 + 30 * (rr.v / 2);
    const cn = F.ref('nail'), cw = F.ref('wall'), cpic = F.ref('picture');
    const wallR = 420, y = 220, MAG = x > 0 ? Math.min(110, x * 2.2e7) / x : 0, flex = x * MAG;
    /* the wall: a solid slab whose face is at wallR; the part of the nail driven into it shows through faintly */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(120, y - 140, 300, 360); ctx.restore();
    line(ctx, wallR, y - 140, wallR, y + 220, cw, 3);
    text(ctx, 'the wall', 270, y + 196, cw, { size: 17, align: 'center' });
    /* the nail: a sharp point buried in the wall, a round shank that is straight inside the wall and
       bends to its flex outside, a band of shading along its underside for its roundness, and a flat
       head at the free end that the picture's wire cannot slip past */
    const x0 = wallR - 150, half = thick / 2, taper = 3.2 * thick, hx0 = wallR + len;
    const cen = (xx) => (xx <= wallR ? y : y + flex * Math.pow((xx - wallR) / len, 2));
    const width = (xx) => (xx < x0 + taper ? half * ((xx - x0) / taper) : half);
    const outline = (xa, xb) => {
      const n = 40; ctx.beginPath();
      for (let i = 0; i <= n; i++) { const xx = xa + ((xb - xa) * i) / n; if (i) ctx.lineTo(xx, cen(xx) - width(xx)); else ctx.moveTo(xx, cen(xx) - width(xx)); }
      for (let i = n; i >= 0; i--) { const xx = xa + ((xb - xa) * i) / n; ctx.lineTo(xx, cen(xx) + width(xx)); }
      ctx.closePath();
    };
    ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.globalAlpha = 0.45; ctx.fillStyle = PAL.panel; ctx.strokeStyle = cn; ctx.lineWidth = 3; outline(x0, wallR); ctx.fill(); ctx.stroke();
    ctx.globalAlpha = 1; outline(wallR, hx0); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = alpha(cn, 0.22); ctx.lineWidth = Math.max(3, thick * 0.3);
    ctx.beginPath(); for (let i = 0; i <= 40; i++) { const xx = wallR + 4 + ((hx0 - wallR - 8) * i) / 40; if (i) ctx.lineTo(xx, cen(xx) + half * 0.45); else ctx.moveTo(xx, cen(xx) + half * 0.45); } ctx.stroke();
    const hy0 = cen(hx0), hh = Math.max(20, half * 2.6);
    ctx.fillStyle = alpha(cn, 0.3); ctx.strokeStyle = cn; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(hx0 - 2, hy0 - hh, 10, 2 * hh, 3); ctx.fill(); ctx.stroke();
    ctx.restore();
    text(ctx, 'steel nail', wallR + len / 2, y - 62, cn, { size: 18, align: 'center', weight: 600 });
    line(ctx, wallR, y - 90, wallR + len, y - 90, PAL.muted, 2, [6, 6]);
    hbracket(ctx, wallR, wallR + len, y - 112, C('position'), 'L₀ = ' + fmt(L0.v, 2) + ' mm');
    text(ctx, '2r = ' + fmt(2 * rr.v, 2) + ' mm', wallR + 14, cen(wallR + 160) + half + 26, C('position'), { size: 18 });
    /* the picture: a frame with its mat, hung from the nail by a wire that hooks over the shank just behind the head */
    const wx = hx0 - 14, wy = cen(wx) + width(wx), ft = wy + 74, fw = 210, fh = 170;
    line(ctx, wx, wy, wx - 80, ft + 12, PAL.muted, 2); line(ctx, wx, wy, wx + 80, ft + 12, PAL.muted, 2);
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = cpic; ctx.lineWidth = 4;
    ctx.fillRect(wx - fw / 2, ft, fw, fh); ctx.strokeRect(wx - fw / 2, ft, fw, fh);
    ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.strokeRect(wx - fw / 2 + 22, ft + 22, fw - 44, fh - 44); ctx.restore();
    text(ctx, fmt(mm.v, 1) + ' kg', wx, ft + fh / 2, C('mass'), { size: 22, align: 'center', weight: 600 });
    /* the two equal and opposite forces on the nail: the picture's weight pulling down where the wire
       hangs, and the wall pushing up where the nail leaves it */
    const aL = 40 + 30 * (w / (20 * G));                               /* the heaviest picture the slider allows draws 70 units, clear of the bracket above and the notes below */
    arrow(ctx, wx, wy + 2, wx, wy + 2 + aL, C('force'), 5);
    text(ctx, 'w = ' + fmt(w, 1) + ' N', wx + 16, wy + 14 + Math.min(aL, 60) / 2, C('force'), { weight: 600, size: 20, bg: PAL.panel });
    arrow(ctx, wallR + 6, y - half - 2, wallR + 6, y - half - 2 - aL, C('force'), 5);
    text(ctx, 'w', wallR + 22, y - half - 2 - aL / 2, C('force'), { weight: 600, size: 20, bg: PAL.panel });
    if (flex > 4) vbracket(ctx, hx0 + 40, y, hy0, C('position'), 'Δx', 1);
    text(ctx, 'the flex is drawn about ' + timesLarger(MAG, len / (L0.v / 1000)) + ' times larger than it is', 120, 630, PAL.muted, { size: 18 });
    text(ctx, 'the nail is steel, so its shear modulus is 80 × 10⁹ N/m²', 120, 658, PAL.muted, { size: 18 });
    headline(ctx, 'A ' + fmt(mm.v, 1) + ' kg picture weighs ' + fmt(w, 0) + ' N and bends the nail ' + fmt(x * 1e6, 2) + ' µm, which is far too small to see');
    readout(d.readout, `\\kdx = \\frac{1}{\\kS}\\frac{\\kF}{\\karea}\\kLo = \\frac{(${fmt(w, 1)}\\ \\text{N})(${sci(L0.v / 1000, 2)}\\ \\text{m})}{(${sci(S, 1)}\\ \\text{N/m}^2)(${sci(area(), 2)}\\ \\text{m}^2)} = ${sci(x, 2)}\\ \\text{m}`,
      'Example 5.5 runs it the other way, solving $\\kF = \\kS\\karea\\kdx/\\kLo$ for the 51 N weight from a flex of 1.80 µm.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 5.18: a cube squeezed by the same force per unit area on every
   surface. The change in volume is proportional to the stress and to the
   original volume, and the constant is the bulk modulus. Still.
===================================================================== */
(function () {
  const d = sim('sim-cube', 700);
  const st = ctl(d.controls, { label: '\\frac{\\kF}{\\karea}', cls: 'stress', min: 0, max: 100, step: 1, value: 50, unit: '× 10⁶ N/m²', dec: 0, aria: 'force per unit area applied on every surface' });
  const V0 = ctl(d.controls, { label: '\\kvolo', cls: 'volume', min: 0.1, max: 10, step: 0.1, value: 1, unit: 'L', dec: 1, aria: 'original volume' });
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
    const f = frac(BB.v), dV = f * V0.v;
    const side = 170 + 130 * Math.cbrt(V0.v / 10), MAG = 20;
    const shrink = Math.min(0.45, (1 - Math.pow(1 - f, 1 / 3)) * MAG);
    /* the book's viewpoint for this cube: the same locked view the bookcase of Figure 5.16 uses, a little to the left of the solid and a little above it, so its left side, its top and its front all show */
    const V = view({ yaw: -0.42, pitch: 0.2, dist: 2400, cx: 340, cy: 330 });
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
    text(ctx, 'V₀ = ' + fmt(V0.v, 1) + ' L', lo[0] - 6, lo[1] + 30, C('volume'), { size: 19, align: 'right' });
    text(ctx, 'V₀ − ΔV', ctr[0], ctr[1] + 44, C('volume'), { size: 21, align: 'center', weight: 600 });   /* below the centre, off the arrow pressing on the hidden back face */
    text(ctx, 'ΔV = ' + fmt(dV * 1000, 1) + ' mL, which is ' + fmt(f * 100, 2) + '% of the volume', 120, 560, C('volume'), { size: 18 });
    text(ctx, 'the shrinking is drawn ' + MAG + ' times larger than it is', 120, 588, PAL.muted, { size: 18 });
    /* the graph beside the scene: the fractional change against the force per unit area, for the five liquids of Table 5.3 */
    const box = { l: 790, r: 1300, t: 160, b: 540 };
    const { X, Y } = axes(ctx, box, [0, 100], [0, TOPY], { xl: 'force per unit area F/A (× 10⁶ N/m²)', xc: C('stress'), yl: 'fractional change ΔV / V₀ (%)', yc: PAL.ink, nx: 4, ny: 3, fy: (v) => fmt(v, 0) });
    LIQ.forEach((q) => {
      const e = Math.min(100, (TOPY / 100) * q.B * 1e9 / 1e6);
      line(ctx, X(0), Y(0), X(e), Y(Math.min(TOPY, (e * 1e6 / (q.B * 1e9)) * 100)), PAL.rule, 3);
      text(ctx, q.n, X(e) - 10, Y(Math.min(TOPY, (e * 1e6 / (q.B * 1e9)) * 100)) - 16, PAL.muted, { size: 16, align: 'right' });
    });
    const ec = Math.min(100, (TOPY / 100) * BB.v * 1e9 / 1e6);
    line(ctx, X(0), Y(0), X(ec), Y(Math.min(TOPY, (ec * 1e6 / (BB.v * 1e9)) * 100)), C('elastic-modulus'), 5);
    if (f * 100 <= TOPY) { line(ctx, X(st.v), box.b, X(st.v), Y(f * 100), C('stress'), 2, [4, 8]); dot(ctx, X(st.v), Y(f * 100), PAL.ink, true, 10); }
    headline(ctx, 'A force per unit area of ' + plain(stress(), 1) + ' N/m² on a material of bulk modulus ' + giga(BB.v) + ' compresses it by ' + fmt(f * 100, 2) + '% of its volume');
    readout(d.readout, `\\frac{\\kdvol}{\\kvolo} = \\frac{1}{\\kBb}\\frac{\\kF}{\\karea} = \\frac{${sci(stress(), 2)}\\ \\text{N/m}^2}{${sci(BB.v * 1e9, 1)}\\ \\text{N/m}^2} = ${fmt(f, 4)} = ${fmt(f * 100, 2)}\\%`,
      'Example 5.6 is the water line at 5.00 × 10⁷ N/m², the pressure 5.00 km down, which compresses seawater by 2.3 percent.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
