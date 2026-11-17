/* Figures for section 1.3 Accuracy, Precision, and Significant Figures. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.3'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, hbracket, vbracket } = F;
const sim = (id, H) => F.sim(root, id, H);

/* ---------- helpers for the whole section ---------- */
/* The significant figures of a number written with dec decimals: start at the first nonzero digit on the left and count through the last digit written on the right. */
function sigfigs(x, dec) { return Math.abs(x).toFixed(dec).replace('.', '').replace(/^0+/, '').length; }
/* A number rounded to n significant figures, as a string: plain digits where they fit, and JavaScript's e-notation where the number has more digits before the point than n. */
function roundSig(x, n) { return Number(x).toPrecision(Math.max(1, n)); }
const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
/* The rounded string for the canvas ("4.0 × 10²") and for KaTeX ("4.0 \times 10^{2}"). */
const plainSig = (s) => (s.includes('e') ? s.split('e')[0] + ' × 10' + s.split('e')[1].replace('+', '').split('').map((c) => SUP[c]).join('') : s);
const texSig = (s) => (s.includes('e') ? s.split('e')[0] + ' \\times 10^{' + s.split('e')[1].replace('+', '') + '}' : s);
const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const words = (n) => WORDS[n] ?? String(n);
/* a canvas pointer event in logical units */
const local = (c, e) => { const r = c.getBoundingClientRect(); return r.width ? [((e.clientX - r.left) * 1400) / r.width, ((e.clientY - r.top) * 1400) / r.width] : null; };
const rect = (ctx, x, y, w, h, fill, stroke, lw = 3, dash) => { ctx.save(); if (fill) { ctx.fillStyle = fill; ctx.fillRect(x, y, w, h); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash); ctx.strokeRect(x, y, w, h); } ctx.restore(); };

/* =====================================================================
   FIGURE 1.23 + 1.24: the bull's-eye. Four GPS attempts, placed as the
   book's two images place them: the pattern of Figure 1.23 about its
   average, pushed toward the lower left as the cluster of Figure 1.24
   is. Rings stand 10 m apart. Spread is the root-mean-square distance of
   the attempts from their average, offset the distance from the
   restaurant to that average. Beside the target the four cases, the
   reader's one outlined; a tap on a case sets it. Still.
===================================================================== */
(function () {
  const d = sim('sim-target', 700);
  const S = ctl(d.controls, { label: '\\text{spread}', cls: '', key: 'spread', min: 2, max: 25, step: 1, value: 20, unit: 'm', dec: 0, specials: [{ at: 20, label: 'Figure 1.23' }, { at: 6, label: 'Figure 1.24' }], aria: 'spread of the attempts about their average' });
  const O = ctl(d.controls, { label: '\\text{offset}', cls: '', key: 'offset', min: 0, max: 35, step: 1, value: 4, unit: 'm', dec: 0, specials: [{ at: 4, label: 'Figure 1.23' }, { at: 33, label: 'Figure 1.24' }], aria: 'offset of the average from the restaurant' });
  /* read off Figure 1.23: the four dots about their average, in image pixels, scaled to a root-mean-square distance of one */
  const PAT = (() => { const raw = [[-1, -65], [89, -6], [-66, 3], [-23, 69]], rms = Math.sqrt(raw.reduce((s, [x, y]) => s + x * x + y * y, 0) / 4); return raw.map(([x, y]) => [x / rms, y / rms]); })();
  /* read off Figure 1.24: its cluster sits to the lower left of the centre */
  const U = [-109 / 123, 57 / 123];
  const LIMIT = 10;   /* within one ring, 10 m, counts as high */
  const CASES = [{ s: 20, o: 4, col: 0, row: 0, tag: 'Figure 1.23' }, { s: 20, o: 33, col: 1, row: 0, tag: '' }, { s: 6, o: 4, col: 0, row: 1, tag: 'the paper measurements' }, { s: 6, o: 33, col: 1, row: 1, tag: 'Figure 1.24' }];
  const G = { x: 748, y: 22, w: 296, h: 214, gx: 14, gy: 12 };
  const cellXY = (c) => [G.x + c.col * (G.w + G.gx), G.y + c.row * (G.h + G.gy)];
  const cellAt = (p) => p && CASES.find((c) => { const [x, y] = cellXY(c); return p[0] >= x && p[0] <= x + G.w && p[1] >= y && p[1] <= y + G.h; });
  d.c.addEventListener('click', (e) => { const c = cellAt(local(d.c, e)); if (c) { S.drive(c.s); O.drive(c.o); } });
  d.c.addEventListener('pointermove', (e) => { d.c.style.cursor = cellAt(local(d.c, e)) ? 'pointer' : ''; });
  function shop(ctx, x, y, k, color) {
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = PAL.panel; ctx.strokeStyle = color; ctx.lineWidth = 3;
    ctx.fillRect(-30, -14, 60, 40); ctx.strokeRect(-30, -14, 60, 40);
    ctx.fillStyle = color; ctx.fillRect(-34, -30, 68, 12);
    ctx.beginPath(); for (let i = 0; i < 4; i++) ctx.arc(-25 + 17 * i, -4, 8.5, 0, Math.PI); ctx.fill();
    ctx.fillRect(-8, 4, 16, 22); ctx.strokeRect(12, 6, 12, 10);
    ctx.restore();
  }
  /* a target of five rings about (cx, cy) at k pixels a meter, with the attempts of spread s and offset o */
  function target(ctx, cx, cy, k, s, o, big) {
    for (let i = 5; i >= 1; i--) { ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, i * 10 * k, 0, Math.PI * 2); ctx.fillStyle = i % 2 ? PAL.soft : PAL.panel; ctx.fill(); ctx.strokeStyle = PAL.rule; ctx.lineWidth = big ? 2 : 1.5; ctx.stroke(); ctx.restore(); }
    const mx = cx + o * k * U[0], my = cy + o * k * U[1];
    if (big) {
      shop(ctx, cx, cy, 0.62, F.ref('restaurant'));
      for (let i = 1; i <= 5; i++) text(ctx, i * 10 + (i === 5 ? ' m' : ''), cx + i * 10 * k * 0.707, cy - i * 10 * k * 0.707, PAL.muted, { size: 16, align: 'center', bg: i % 2 ? PAL.panel : PAL.soft });
      ctx.save(); ctx.beginPath(); ctx.arc(mx, my, s * k, 0, Math.PI * 2); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 2.5; ctx.setLineDash([8, 8]); ctx.stroke(); ctx.restore();
      line(ctx, cx, cy, mx, my, F.ref('restaurant'), 5);
    } else dot(ctx, cx, cy, F.ref('restaurant'), true, 5);
    for (const p of PAT) dot(ctx, mx + s * k * p[0], my + s * k * p[1], PAL.ink, true, big ? 12 : 5);
    if (big) { dot(ctx, mx, my, PAL.panel, true, 9); dot(ctx, mx, my, PAL.ink, false, 9); }
  }
  function draw() {
    const { ctx } = begin(d.c);
    const lowP = S.v > LIMIT, lowA = O.v > LIMIT;
    target(ctx, 360, 350, 5.8, S.v, O.v, true);
    /* the four cases */
    for (const c of CASES) {
      const [x, y] = cellXY(c), on = (c.s > LIMIT) === lowP && (c.o > LIMIT) === lowA;
      rect(ctx, x, y, G.w, G.h, on ? alpha(PAL.ink, 0.05) : null, on ? PAL.ink : PAL.rule, on ? 3 : 1.5);
      target(ctx, x + G.w / 2, y + 84, 1.4, c.s, c.o, false);
      text(ctx, (c.o > LIMIT ? 'low' : 'high') + ' accuracy, ' + (c.s > LIMIT ? 'low' : 'high') + ' precision', x + G.w / 2, y + 172, on ? PAL.ink : PAL.muted, { size: 19, weight: on ? 700 : 400, align: 'center' });
      if (c.tag) text(ctx, c.tag, x + G.w / 2, y + 196, PAL.muted, { size: 16, align: 'center' });
    }
    F.legend(ctx, { l: G.x - 8, r: 1380, t: 2 * G.h + G.gy + G.y + 6, b: 696 }, [
      { s: 'the restaurant', draw: (g, px, py) => shop(g, px, py + 2, 0.4, F.ref('restaurant')) },
      { s: 'one attempt of the GPS', kind: 'dot', color: PAL.ink },
      { s: 'the average of the four attempts', kind: 'dot', hollow: true, color: PAL.ink },
      { s: 'spread: how far the attempts lie from their average', color: alpha(PAL.ink, 0.55), w: 2.5, dash: [8, 8] },
      { s: 'offset: from the restaurant to the average', color: F.ref('restaurant'), w: 5 },
    ], { corner: 'tl', size: 18, panel: false });
    tex(d.readout, `\\text{spread} = ${fmt(S.v, 0)}\\ \\text{m}:\\ \\text{${lowP ? 'low' : 'high'} precision} \\\\ \\text{offset} = ${fmt(O.v, 0)}\\ \\text{m}:\\ \\text{${lowA ? 'low' : 'high'} accuracy}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: percent uncertainty. The bag of Example 1.2 on a line of weight
   with its band A ± δA, and under it, on the same scale of weight, the
   percent uncertainty δA/A × 100% as a curve. A bag half as heavy with
   the same δA has a band as wide and stands twice as high on the curve.
   Fixed frame: 0 to 11 lb (A up to 10 lb plus δA up to 1 lb) and 0 to
   60% (δA = 1 lb at A = 2 lb is 50%); a point above it is pinned. Still.
===================================================================== */
(function () {
  const d = sim('sim-percent', 600);
  const A = ctl(d.controls, { label: 'A', cls: 'force', min: 2, max: 10, step: 0.1, value: 5.1, unit: 'lb', dec: 1, specials: [{ at: 5.1, label: 'Example 1.2' }], aria: 'average weight' });
  const dA = ctl(d.controls, { label: '\\delta A', cls: '', min: 0.1, max: 1, step: 0.1, value: 0.4, unit: 'lb', dec: 1, aria: 'uncertainty in the weight' });
  const WEEKS = [4.8, 5.3, 4.9, 5.4];
  const BOX = { l: 170, r: 1300, t: 240, b: 510 }, YS = 116;
  function draw() {
    const { ctx } = begin(d.c);
    const a = A.v, u = dA.v, half = a / 2, p = (100 * u) / a, wt = C('force');
    const ax = F.axes(ctx, BOX, [0, 11], [0, 60], { xl: 'weight (lb)', xc: wt, yl: 'percent uncertainty', nx: 11, ny: 6, fy: (v) => fmt(v, 0) + '%' });
    const X = ax.X, Y = ax.Y;
    /* the line of weight, on the graph's own scale */
    line(ctx, X(0), YS, X(11), YS, PAL.muted, 3);
    for (let m = 0; m <= 11; m++) line(ctx, X(m), YS - 7, X(m), YS + 7, PAL.muted, 2);
    const band = (w, k) => rect(ctx, X(w - u), YS - 18, X(w + u) - X(w - u), 36, alpha(wt, k));
    band(half, 0.16); band(a, 0.3);
    /* the drops from each bag to its point on the curve */
    const drop = (w) => { const y = Math.max(Y(100 * u / w), BOX.t); line(ctx, X(w), YS + 18, X(w), y, alpha(PAL.ink, 0.4), 2, [4, 8]); line(ctx, X(w), y, BOX.l, y, alpha(PAL.ink, 0.4), 2, [4, 8]); };
    drop(a); if (2 * p <= 60) drop(half);
    F.plot(ctx, ax, (w) => (100 * u) / w, PAL.ink, { x: [0.01, 11] });
    if (Math.abs(a - 5.1) < 0.05) {
      for (const w of WEEKS) line(ctx, X(w), YS - 18, X(w), YS + 18, wt, 3);
      text(ctx, 'weekly weights: 4.8, 5.3, 4.9, 5.4 lb', X(a) + 120, YS - 56, wt, { size: 18 });
    }
    dot(ctx, X(half), YS, PAL.panel, true, 9); dot(ctx, X(half), YS, wt, false, 9); dot(ctx, X(a), YS, wt, true, 10);
    hbracket(ctx, X(a - u), X(a + u), YS - 34, wt, fmt(a, 1) + ' lb ± ' + fmt(u, 1) + ' lb', { size: 20 });
    hbracket(ctx, X(half - u), X(half + u), YS + 36, wt, 'half as heavy: ' + fmt(half, 2) + ' lb ± ' + fmt(u, 1) + ' lb', { side: 'below', size: 20 });
    /* the two points */
    const hp = F.pinned(ctx, BOX, X, Y, half, 2 * p, PAL.ink, '± ' + Math.round(2 * p) + '%');
    if (!hp.out) { dot(ctx, hp.x, hp.y, PAL.panel, true, 7); dot(ctx, hp.x, hp.y, PAL.ink, false, 9); F.label(ctx, '± ' + Math.round(2 * p) + '%', hp.x, hp.y - 22, { side: 'right', size: 22, gap: 14, leader: false }); }
    dot(ctx, X(a), Y(p), PAL.ink, true, 10);
    F.label(ctx, '± ' + Math.round(p) + '%', X(a), Y(p) - 22, { side: 'right', size: 22, gap: 14, leader: false });
    tex(d.readout, `\\%\\,\\text{unc} = \\frac{\\delta A}{A} \\times 100\\% = \\frac{${fmt(u, 1)}\\ \\text{lb}}{${fmt(a, 1)}\\ \\text{lb}} \\times 100\\% = ${Math.round(p)}\\%`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the floor. The 4.00 m by 3.00 m floor to scale, held at its
   lower left corner. The largest floor the uncertainties allow is the
   floor plus a strip along its width (the length's percent of the area),
   a strip along its length (the width's percent) and a small corner,
   which is all that adding the percents leaves out. The corner is drawn
   again five times larger. Still.
===================================================================== */
(function () {
  const d = sim('sim-area', 670);
  const pL = ctl(d.controls, { label: '\\text{uncertainty in length}', cls: '', key: 'length', min: 0, max: 5, step: 0.5, value: 2, unit: '%', dec: 1, specials: [{ at: 2, label: 'the book’s floor' }], aria: 'percent uncertainty in the length' });
  const pW = ctl(d.controls, { label: '\\text{uncertainty in width}', cls: '', key: 'width', min: 0, max: 5, step: 0.5, value: 1, unit: '%', dec: 1, specials: [{ at: 1, label: 'the book’s floor' }], aria: 'percent uncertainty in the width' });
  const pc = (p) => (Number.isInteger(p) ? fmt(p, 0) : fmt(p, 1));
  const m3 = (x) => (Math.abs(x * 100 - Math.round(x * 100)) < 1e-6 ? fmt(x, 2) : fmt(x, 3));
  const sig = (x) => (x ? String(+x.toPrecision(3)) : '0');
  const LEN = 4, WID = 3, K = 140, BX = 240, BY = 560;
  /* the magnified corner: 0.30 m by 0.24 m about the corner, ten times the floor's scale, wide enough for 5% of each side */
  const IN = { l: 900, r: 1320, t: 70, b: 400, k: 1400, x0: 3.97, y0: 2.96 };
  function pieces(ctx, X, Y, dl, dw, lw) {
    const cl = F.cat(0), cw = F.cat(2);
    ctx.save();
    ctx.fillStyle = alpha(C('area'), 0.1); ctx.fillRect(X(0), Y(WID), X(LEN) - X(0), Y(0) - Y(WID));
    ctx.fillStyle = alpha(cl, 0.6); ctx.fillRect(X(LEN), Y(WID), X(LEN + dl) - X(LEN), Y(0) - Y(WID));
    ctx.fillStyle = alpha(cw, 0.6); ctx.fillRect(X(0), Y(WID + dw), X(LEN) - X(0), Y(WID) - Y(WID + dw));
    ctx.fillStyle = alpha(PAL.ink, 0.75); ctx.fillRect(X(LEN), Y(WID + dw), X(LEN + dl) - X(LEN), Y(WID) - Y(WID + dw));
    ctx.restore();
    if (dl || dw) {
      rect(ctx, X(0), Y(WID + dw), X(LEN + dl) - X(0), Y(0) - Y(WID + dw), null, C('area'), lw * 0.6, [9, 7]);
    }
    rect(ctx, X(0), Y(WID), X(LEN) - X(0), Y(0) - Y(WID), null, C('area'), lw);
  }
  function draw() {
    const { ctx } = begin(d.c);
    const dl = (LEN * pL.v) / 100, dw = (WID * pW.v) / 100, sL = dl * WID, sW = dw * LEN, sC = dl * dw, pA = pL.v + pW.v;
    const X = (m) => BX + m * K, Y = (m) => BY - m * K;
    pieces(ctx, X, Y, dl, dw, 4);
    text(ctx, '12.0 m²', X(2), Y(1.5), C('area'), { size: 30, weight: 600, align: 'center' });
    hbracket(ctx, X(0), X(LEN), BY + 36, C('position'), '4.00 m ± ' + pc(pL.v) + '%', { side: 'below' });
    vbracket(ctx, BX - 36, Y(WID), Y(0), C('position'), '3.00 m ± ' + pc(pW.v) + '%', -1);
    /* the window on the corner, and the corner again */
    const wx0 = X(IN.x0), wx1 = X(IN.x0 + (IN.r - IN.l) / IN.k), wy0 = Y(IN.y0 + (IN.b - IN.t) / IN.k), wy1 = Y(IN.y0);
    rect(ctx, wx0, wy0, wx1 - wx0, wy1 - wy0, null, PAL.muted, 1.5);
    line(ctx, wx1, wy0, IN.l, IN.t, PAL.rule, 1.5); line(ctx, wx1, wy1, IN.l, IN.b, PAL.rule, 1.5);
    rect(ctx, IN.l, IN.t, IN.r - IN.l, IN.b - IN.t, PAL.panel, PAL.muted, 1.5);
    const XI = (m) => IN.l + (m - IN.x0) * IN.k, YI = (m) => IN.b - (m - IN.y0) * IN.k;
    ctx.save(); ctx.beginPath(); ctx.rect(IN.l, IN.t, IN.r - IN.l, IN.b - IN.t); ctx.clip(); pieces(ctx, XI, YI, dl, dw, 5); ctx.restore();
    text(ctx, 'the corner, 10 times larger', IN.l, IN.t - 22, PAL.muted, { size: 18 });
    if (dl) hbracket(ctx, XI(LEN), XI(LEN + dl), YI(WID + dw) - 22, PAL.ink, m3(dl) + ' m', { size: 19 });
    if (dw) vbracket(ctx, XI(LEN + dl) + 22, YI(WID + dw), YI(WID), PAL.ink, m3(dw) + ' m', 1, { size: 19 });
    F.legend(ctx, { l: IN.l - 20, r: 1390, t: IN.b + 26, b: 680 }, [
      { s: 'floor as measured: 4.00 m × 3.00 m = 12.0 m²', kind: 'swatch', color: alpha(C('area'), 0.25) },
      { s: 'length + ' + pc(pL.v) + '%: ' + m3(dl) + ' m × 3.00 m = ' + m3(sL) + ' m²', kind: 'swatch', color: alpha(F.cat(0), 0.6) },
      { s: 'width + ' + pc(pW.v) + '%: 4.00 m × ' + m3(dw) + ' m = ' + m3(sW) + ' m²', kind: 'swatch', color: alpha(F.cat(2), 0.6) },
      { s: 'corner: ' + m3(dl) + ' m × ' + m3(dw) + ' m = ' + sig(sC) + ' m²', kind: 'swatch', color: alpha(PAL.ink, 0.75) },
      { s: 'largest floor the uncertainties allow', color: C('area'), w: 2.5, dash: [9, 7] },
    ], { corner: 'tl', size: 18, panel: false });
    const dA = (12 * pA) / 100;
    tex(d.readout, `\\%\\,\\text{unc in } \\karea = ${pc(pL.v)}\\% + ${pc(pW.v)}\\% = ${pc(pA)}\\% \\\\ \\delta \\karea = ${pc(pA)}\\% \\times 12.0\\ \\text{m}^2 = ${fmt(dA, 2)}\\ \\text{m}^2 \\approx ${fmt(dA, 1)}\\ \\text{m}^2`);
    const small = d.readout.querySelector('small') || d.readout.appendChild(document.createElement('small'));
    small.textContent = 'Largest floor: 12.0 m² + ' + m3(sL) + ' m² + ' + m3(sW) + ' m² + ' + sig(sC) + ' m² = ' + String(+(12 + sL + sW + sC).toFixed(4)) + ' m², which is ' + fmt((100 * (sL + sW + sC)) / 12, 2) + '% more.';
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the ruler. A stick against a ruler, and its far end read on three
   tools at once: marks a centimeter apart, a millimeter apart and a tenth
   of a millimeter apart. Each row is the last one ten times larger about
   the end of the stick. The reading is the mark nearest the end, so each
   finer tool writes one more digit. Still.
===================================================================== */
(function () {
  const d = sim('sim-ruler', 700);
  const Lc = ctl(d.controls, { label: '\\kLlen', cls: 'position', min: 10, max: 45, step: 0.01, value: 36.71, unit: 'cm', dec: 2, specials: [{ at: 36.71, label: 'the book’s stick' }], aria: 'true length of the stick' });
  const TOOLS = [{ u: 1, dec: 0, name: 'marks 1 cm apart' }, { u: 0.1, dec: 1, name: 'marks 1 mm apart' }, { u: 0.01, dec: 2, name: 'marks 0.1 mm apart' }];
  const X0 = 80, K = 18, YO = 78;           /* the whole stick and ruler */
  const RL = 80, RR = 980, ROW = 172, RT = 196;   /* the three magnified rows */
  function draw() {
    const { ctx } = begin(d.c);
    const L = Lc.v, stick = F.ref('stick'), ruler = F.ref('ruler');
    /* the whole stick on the whole ruler */
    rect(ctx, X0, YO - 22, L * K, 18, stick, stick);
    text(ctx, 'the stick', X0, YO - 46, stick, { size: 18, weight: 600 });
    rect(ctx, X0 - 14, YO, 50 * K + 28, 44, PAL.panel, ruler);
    for (let c = 0; c <= 50; c++) { line(ctx, X0 + c * K, YO, X0 + c * K, YO + (c % 10 ? (c % 5 ? 9 : 14) : 20), PAL.ink, c % 10 ? 1.5 : 2.5); if (c % 10 === 0) text(ctx, c === 50 ? '50 cm' : String(c), X0 + c * K + (c === 50 ? -14 : 0), YO + 32, PAL.ink, { size: 16, align: 'center' }); }
    text(ctx, 'the ruler', X0 + 50 * K + 26, YO + 22, ruler, { size: 18, weight: 600 });
    /* each row's window: six marks wide, the end of the stick between the third and fourth */
    const win = TOOLS.map((t) => { const m0 = Math.floor(L / t.u + 1e-6) * t.u, w0 = m0 - 2.5 * t.u, k = (RR - RL) / (6 * t.u); return { t, m0, w0, k, X: (c) => RL + (c - w0) * k }; });
    win.forEach((w, i) => {
      const y = RT + i * ROW, t = w.t, read = L.toFixed(t.dec), n = sigfigs(L, t.dec);
      /* where this window lies on the drawing above, and the fan down to it */
      const up = i ? win[i - 1] : null, ax = up ? up.X(w.w0) : X0 + w.w0 * K, bx = up ? up.X(w.w0 + 6 * t.u) : X0 + (w.w0 + 6 * t.u) * K, ay = up ? y - ROW + 112 : YO + 44;
      rect(ctx, ax, up ? y - ROW + 22 : YO - 26, bx - ax, up ? 90 : 70, alpha(PAL.ink, 0.07), alpha(PAL.ink, 0.45), 1.5);
      line(ctx, ax, ay, RL, y, PAL.rule, 1.5); line(ctx, bx, ay, RR, y, PAL.rule, 1.5);
      rect(ctx, RL, y, RR - RL, 112, PAL.panel, PAL.rule, 1.5);
      ctx.save(); ctx.beginPath(); ctx.rect(RL, y, RR - RL, 112); ctx.clip();
      rect(ctx, RL - 20, y + 22, w.X(L) - RL + 20, 26, stick, stick);
      rect(ctx, RL - 20, y + 48, RR - RL + 40, 80, PAL.panel, ruler);
      ctx.restore();
      const near = Math.round(+read / t.u);
      for (let j = Math.ceil(w.w0 / t.u - 1e-6); j <= Math.floor((w.w0 + 6 * t.u) / t.u + 1e-6); j++) {
        const c = j * t.u, x = w.X(c), on = j === near;
        line(ctx, x, y + 48, x, y + (on ? 78 : 70), on ? PAL.ink : PAL.muted, on ? 4 : 2);
        text(ctx, c.toFixed(t.dec), x, y + 94, on ? PAL.ink : PAL.muted, { size: on ? 20 : 17, weight: on ? 700 : 400, align: 'center' });
      }
      line(ctx, w.X(L), y + 8, w.X(L), y + 70, stick, 2.5, [5, 5]);
      text(ctx, t.name, RL + 12, y - 16, PAL.muted, { size: 18 });
      /* the reading, its last digit the estimated one */
      const rx = RR + 36, head = read.slice(0, -1), last = read.slice(-1);
      F.rich(ctx, [[head, PAL.ink, 700], [last, C('position'), 700], [' cm', PAL.ink, 700]], rx, y + 38, { size: 40 });
      const lx = rx + F.measure(ctx, head, { size: 40, weight: 700 }), lw = F.measure(ctx, last, { size: 40, weight: 700 });
      line(ctx, lx, y + 64, lx + lw, y + 64, C('position'), 3);
      F.rich(ctx, [[words(n), PAL.ink, 700], ' significant figures'], rx, y + 90, { size: 19 });
    });
    text(ctx, 'Underlined: the digit estimated between two marks.', RL, 682, PAL.muted, { size: 17 });
    tex(d.readout, `\\kLlen = ${L.toFixed(2)}\\ \\text{cm} \\approx ${L.toFixed(1)}\\ \\text{cm} \\approx ${L.toFixed(0)}\\ \\text{cm}`);
  }
  register(d.fig, { update: () => {}, draw, arrive: false });
})();

/* =====================================================================
   SIM: the two rules. Two measured numbers a and b, each known to its
   own decimal places. For the sum they stand in columns with the decimal
   points in line, a "?" in every place a number was not measured to, so
   the columns the sum cannot know are seen. For the product the
   significant figures of each are counted. The calculator's digits that
   must go are muted and struck. Still.
===================================================================== */
(function () {
  const d = sim('sim-calc', 560);
  const a0 = ctl(d.controls, { label: 'a', cls: '', key: 'a', min: 1, max: 20, step: 0.01, value: 7.56, unit: '', dec: 2, aria: 'measured value a' });
  const da = ctl(d.controls, { label: '\\text{decimals of } a', cls: '', key: 'da', min: 0, max: 3, step: 1, value: 2, unit: '', dec: 0, aria: 'decimals of a' });
  const b0 = ctl(d.controls, { label: 'b', cls: '', key: 'b', min: 1, max: 20, step: 0.001, value: 6.052, unit: '', dec: 3, aria: 'measured value b' });
  const db = ctl(d.controls, { label: '\\text{decimals of } b', cls: '', key: 'db', min: 0, max: 3, step: 1, value: 3, unit: '', dec: 0, aria: 'decimals of b' });
  const PLACES = ['ones', 'tenths', 'hundredths', 'thousandths'];
  const SZ = 40, P = 40;
  /* how many characters of s hold its first n significant figures */
  function cut(s, n) { let seen = 0, started = false; for (let i = 0; i < s.length; i++) { const ch = s[i]; if (ch === '.') continue; if (ch !== '0') started = true; if (started && ++seen === n) return i + 1; } return s.length; }
  function draw() {
    const { ctx } = begin(d.c);
    const A = +a0.v.toFixed(da.v), B = +b0.v.toFixed(db.v), As = A.toFixed(da.v), Bs = B.toFixed(db.v);
    const na = sigfigs(A, da.v), nb = sigfigs(B, db.v), n = Math.min(na, nb), dec = Math.min(da.v, db.v), top = Math.max(da.v, db.v);
    const rawSum = (A + B).toFixed(top), sumKept = (A + B).toFixed(dec);
    const rawP = (A * B).toFixed(da.v + db.v), pRound = roundSig(A * B, n), k = cut(rawP, n);
    const lim = (x, y) => (x === y ? 'both' : x < y ? 'a' : 'b');

    /* ---- the sum, in columns about the decimal point ---- */
    const DP = 330, col = (place) => (place < 0 ? DP + 26 + P * (-place - 1) : DP - 26 - P * place);   /* place 0 the ones, 1 the tens, −1 the tenths */
    text(ctx, 'adding: line up the decimal points', 70, 52, PAL.ink, { size: 22, weight: 600 });
    if (top > dec) rect(ctx, col(-dec - 1) - P / 2, 86, P * (top - dec), 244, alpha(PAL.ink, 0.09));
    const row = (s, sdec, y, name, o = {}) => {
      const [ip, fp = ''] = s.split('.');
      text(ctx, name, 70, y, PAL.muted, { size: 19 });
      ip.split('').reverse().forEach((ch, i) => text(ctx, ch, col(i), y, PAL.ink, { size: SZ, weight: o.bold ? 700 : 400, align: 'center' }));
      if (top > 0 && (sdec > 0 || !o.plain)) text(ctx, '.', DP, y, sdec > 0 ? PAL.ink : PAL.muted, { size: SZ, align: 'center' });
      for (let j = 1; j <= (o.plain ? sdec : top); j++) {
        const ch = j <= sdec ? fp[j - 1] : '?', gone = o.raw && j > dec;
        text(ctx, ch, col(-j), y, j > sdec || gone ? PAL.muted : PAL.ink, { size: SZ, weight: o.bold ? 700 : 400, align: 'center' });
        if (gone) line(ctx, col(-j) - 13, y + 12, col(-j) + 13, y - 12, PAL.muted, 2);
      }
    };
    row(As, da.v, 126, 'a'); row(Bs, db.v, 186, 'b');
    text(ctx, '+', DP - 26 - 2 * P - 14, 186, PAL.ink, { size: SZ, align: 'center' });
    line(ctx, DP - 26 - 2 * P - 34, 222, col(-Math.max(top, 1)) + P / 2 + 6, 222, PAL.ink, 3);
    row(rawSum, top, 266, 'calculator', { raw: true });
    row(sumKept, dec, 384, 'written', { bold: true, plain: true });
    if (top > dec) F.label(ctx, lim(da.v, db.v) + ' was not measured here', col(-dec - 1) + (P * (top - dec - 1)) / 2, 330, { side: 'below', size: 17, weight: 400, gap: 18, leader: false });
    text(ctx, da.v === db.v ? 'Both stop at the ' + PLACES[dec] + ', and so does the sum.' : lim(da.v, db.v) + ' stops at the ' + PLACES[dec] + ', so the sum does too.', 70, 470, PAL.ink, { size: 20 });

    /* ---- the product, by counting significant figures ---- */
    const px = 760;
    line(ctx, 700, 40, 700, 500, PAL.rule, 1.5);
    text(ctx, 'multiplying: count the significant figures', px, 52, PAL.ink, { size: 22, weight: 600 });
    const PC = 30, chars = (s, x, y, color, weight) => s.split('').forEach((ch, i) => text(ctx, ch, x + PC * i + PC / 2, y, typeof color === 'function' ? color(i) : color, { size: SZ, weight, align: 'center' }));
    const counted = (s, x, y, cnt, name) => {
      chars(s, x, y, PAL.ink, 400);
      hbracket(ctx, x + 4, x + PC * s.length - 4, y + 36, PAL.ink, name + ': ' + cnt + (cnt === 1 ? ' figure' : ' figures'), { side: 'below', size: 18 });
    };
    counted(As, px, 126, na, 'a');
    const xb = px + PC * As.length + 56; text(ctx, '×', xb - 28, 126, PAL.ink, { size: SZ, align: 'center' });
    counted(Bs, Math.max(xb, px + 230), 126, nb, 'b');
    text(ctx, 'calculator', px, 266, PAL.muted, { size: 19 });
    const xr = px + 130;
    chars(rawP, xr, 266, (i) => (i < k ? PAL.ink : PAL.muted), 400);
    if (k < rawP.length && rawP.slice(k).replace('.', '') !== '') { const from = rawP[k] === '.' ? k + 1 : k; if (from < rawP.length) line(ctx, xr + PC * from + 2, 266 + 12, xr + PC * rawP.length - 2, 266 - 12, PAL.muted, 2); }
    text(ctx, 'written', px, 384, PAL.muted, { size: 19 });
    text(ctx, plainSig(pRound), xr + 4, 384, PAL.ink, { size: SZ, weight: 700 });
    text(ctx, (na === nb ? 'Both have ' + words(n) : lim(na, nb) + ' has the fewest, ' + words(n)) + ', so the product keeps ' + words(n) + '.', px, 470, PAL.ink, { size: 20 });

    const sumTex = rawSum === sumKept ? rawSum : rawSum + ' \\approx ' + sumKept, pTex = rawP === pRound ? rawP : rawP + ' \\approx ' + texSig(pRound);
    tex(d.readout, `\\begin{aligned} a + b &= ${As} + ${Bs} = ${sumTex} \\\\ a \\times b &= ${As} \\times ${Bs} = ${pTex} \\end{aligned}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
