/* Figures for section 4.3 Newton's Second Law of Motion: Concept of a System.
   Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, choice, ctl, cycle, register, begin, line, arrow, dot, text, headline, topline, hbracket, strip, scale, axes, curve, pinned, runner, person, car, block, fixed } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- helpers shared by the figures ---------- */
const G = 9.80, TAU = 2 * Math.PI;
const commas = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
/* three significant figures, never in exponent form, with commas */
const sig3 = (x) => { const s = Math.abs(x).toPrecision(3); return (x < 0 ? '−' : '') + (s.includes('e') || Math.abs(x) >= 1000 ? commas(String(Math.round(Number(s)))) : s); };
/* a power of ten as the reader writes it */
const POW = { '-2': '0.01', '-1': '0.1', 0: '1', 1: '10', 2: '100', 3: '1,000', 4: '10,000' };
const powLabel = (e) => POW[String(Math.round(e))] ?? String(Math.pow(10, Math.round(e)));
/* draws inside the graph box, so a line that runs past a fixed range is cut off at the frame
   instead of the frame being stretched to hold it */
const inbox = (ctx, box, f) => { ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t); ctx.clip(); f(); ctx.restore(); };
/* an arrow long enough to be seen: the book draws the friction on the rocket sled larger than scale for the same reason */
const alen = (v, k, min) => Math.max(min ?? 26, Math.abs(v) * k);
/* a label beside the head of a rightward arrow, flipped back to its tail once the head is so far
   along the strip that the label would run past the right edge of the canvas */
function headLabel(ctx, s, tail, head, y, color, size) {
  const sz = size ?? 20, late = head + 14 + 0.55 * sz * s.length > 1345;
  text(ctx, s, late ? tail - 14 : head + 14, y, color, { size: sz, weight: 600, align: late ? 'right' : 'left' });
}

/* ---------- sprites, in ink ---------- */
/* a basketball centred on (x, y) */
function basketball(ctx, x, y, color, r) {
  ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  ctx.strokeStyle = PAL.panel; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x + r, y); ctx.moveTo(x, y - r); ctx.lineTo(x, y + r); ctx.stroke();
  ctx.restore();
}
/* a lawn mower, its deck centred on (x, y), the handle trailing to the left */
function mower(ctx, x, y, color) {
  ctx.save(); ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(x - 44, y + 12); ctx.lineTo(x - 44, y - 10); ctx.lineTo(x - 14, y - 24); ctx.lineTo(x + 30, y - 24); ctx.lineTo(x + 44, y - 6); ctx.lineTo(x + 44, y + 12); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(x - 30, y + 20, 11, 0, TAU); ctx.arc(x + 30, y + 20, 11, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 40, y - 14); ctx.lineTo(x - 104, y - 78); ctx.moveTo(x - 104, y - 78); ctx.lineTo(x - 128, y - 78); ctx.stroke();
  ctx.restore();
}
/* a bathroom scale standing on the floor at (x, y), w wide */
function bathScale(ctx, x, y, w, color) {
  ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = PAL.panel; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.rect(x - w / 2, y - 34, w, 34); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y - 17, 12, 0, TAU); ctx.stroke();
  ctx.restore();
}

/* =====================================================================
   FIGURE 4.5: two children push a wagon with a third riding in it. The
   wagon stays in the frame and the ground runs back under it, so the
   scene has room for its forces; beneath it the free-body diagram, the
   forces added head to tail, and the acceleration against the net force,
   which is the proportionality the section writes beside this figure.
   The mass is fixed, as the book's caption has it: different forces on
   the same mass.
===================================================================== */
(function () {
  const d = sim('sim-wagon', 820);
  const F1 = ctl(d.controls, { label: '\\kFone', cls: 'force', min: 0, max: 60, step: 0.5, value: 25, unit: 'N', dec: 1, onInput: reset, aria: 'force of the first child' });
  const F2 = ctl(d.controls, { label: '\\kFtwo', cls: 'force', min: 0, max: 60, step: 0.5, value: 30, unit: 'N', dec: 1, onInput: reset, aria: 'force of the second child' });
  const ff = ctl(d.controls, { label: '\\kff', cls: 'force', min: 0, max: 40, step: 0.5, value: 12, unit: 'N', dec: 1, onInput: reset, aria: 'force of friction' });
  const M = 30, T = 4, N0 = 43, W = M * G;
  const fr = () => Math.min(ff.v, F1.v + F2.v);   /* at rest the friction holds only as much as the pushes ask of it */
  const net = () => F1.v + F2.v - fr();
  const cy = cycle(() => T, 1.2);
  function reset() { cy.reset(); }
  /* fixed scales: one for every force drawn to scale, 5 units to the newton, on the scene and in the
     diagram (the two pushes chain to 600 units at most); 40 units to the m/s² (120 N on 30 kg is
     4 m/s²) and 16 to the m/s (16 m/s after 4 s at most). The ground is ruled in meters at 230
     units each, the scale the wagon's bed is drawn to. */
  const gy = 410, bx = 470, U = 1.6, K = 5, KA = 40, KV = 16, PPM = 230;
  const SN = 0.92 * U, SF = 1.12 * U, SR = 1.05 * U;   /* the near child, the far child, the rider */
  const P = (dx, dy) => ({ x: bx + dx * U, y: gy + dy * U });
  const loc = (p, ox, s) => ({ x: (p.x - ox) / s, y: (p.y - gy) / s });
  /* an arrow of fixed length with a break in its shaft, for a force too large for the scale */
  function broken(ctx, x, y1, y2, color) {
    const sg = Math.sign(y2 - y1), ym = y1 + (y2 - y1) * 0.42;
    line(ctx, x, y1, x, ym - sg * 6, color, 4); arrow(ctx, x, ym + sg * 6, x, y2, color, 4);
    [-6, 6].forEach((o) => line(ctx, x - 9, ym + o * sg + 4, x + 9, ym + o * sg - 4, color, 2.5));
  }
  let hits = [];
  function draw() {
    const { ctx } = begin(d.c);
    const n = net(), a = n / M, tau = cy.now(), x = 0.5 * a * tau * tau, v = a * tau;
    const cf = C('force'), ca = C('acceleration'), cv = C('velocity'), cw = F.ref('wagon'), cp = F.ref('pushers');
    const hl = topline(ctx, n <= 0
      ? 'The friction matches the two pushes, so the net force is zero and the wagon stays put'
      : 'After ' + fmt(tau, 1) + ' s at ' + fmt(a, 2) + ' m/s² the wagon moves at ' + fmt(v, 2) + ' m/s');
    const lb = F.labeller(ctx, 820, { headline: hl });
    /* the ground, its meter marks running back under the wagon */
    line(ctx, 40, gy, 1360, gy, PAL.muted, 3);
    const zero = P(182, 0).x;   /* the front wheel stands on the 0 m mark at the start */
    for (let mk = Math.ceil(x + (40 - zero) / PPM); mk <= x + (1360 - zero) / PPM; mk++) {
      const sx = zero + (mk - x) * PPM;
      line(ctx, sx, gy, sx, gy + 14, PAL.muted, 2);
      if (mk >= 0) text(ctx, mk + ' m', sx, gy + 34, PAL.muted, { size: 17, align: 'center' });
    }
    lb.block(0, gy + 18, 1400, gy + 50);
    /* the two children push on the back of the bed: the far one, older and paler, with both hands
       on the rail, the near one lower on the back panel; they stride as the wagon rolls */
    const rail = P(0, -72).y, floor = P(0, -56).y;
    const hF = { x: bx - 2, y: rail - 2 }, hN = P(-1.5, -58);
    const pFx = hF.x - 64 * SF, pNx = hN.x - 60 * SN, ph = 0.14 + x / 1.3;
    const lean = { pose: 'walk', shoulder: { x: 26, y: -108 }, head: { x: 37, y: -126 } };
    F.silhouette(ctx, { ...lean, x: pFx, y: gy, s: SF, phase: ph + 0.5, color: F.mixColor(cp, PAL.panel, 0.45), hands: [loc(hF, pFx, SF), loc({ x: hF.x + 5, y: hF.y + 4 }, pFx, SF)] });
    F.silhouette(ctx, { ...lean, x: pNx, y: gy, s: SN, phase: ph, color: cp, hands: [loc(hN, pNx, SN), loc({ x: hN.x, y: hN.y + 8 }, pNx, SN)] });
    /* the rider sits on the floor of the bed, knees up, hands on the side rail */
    const rx = P(150, 0).x, hold = P(190, -73);
    F.silhouette(ctx, { x: rx, y: gy, s: SR, pose: 'sit', color: cw,
      hip: { x: -10, y: (floor - gy) / SR }, feet: [{ x: 40, y: (floor - gy) / SR }, { x: 34, y: (floor - gy) / SR + 2 }],
      hands: [loc(hold, rx, SR), loc({ x: hold.x - 8, y: hold.y + 2 }, rx, SR)] });
    /* the bed, drawn over the rider's legs, its handle up from the front, and the wheels on the ground */
    const h0 = P(224, -52), h1 = P(262, -118);
    line(ctx, h0.x, h0.y, h1.x, h1.y, cw, 5);
    line(ctx, h1.x - 14, h1.y, h1.x + 14, h1.y, cw, 6);
    ctx.save(); ctx.fillStyle = F.mixColor(cw, PAL.panel, 0.7); ctx.strokeStyle = cw; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    const b0 = P(0, -72), b1 = P(230, -72), b2 = P(222, -42), b3 = P(8, -42);
    ctx.beginPath(); ctx.moveTo(b0.x, b0.y); ctx.lineTo(b1.x, b1.y); ctx.lineTo(b2.x, b2.y); ctx.lineTo(b3.x, b3.y); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
    const wr = 21 * U, spin = (x * PPM) / wr;
    [48, 182].forEach((wx) => {
      const c = { x: P(wx, 0).x, y: gy - wr };
      ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = cw; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(c.x, c.y, wr - 3, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
      for (let i = 0; i < 3; i++) { const q = spin + (i * TAU) / 3; line(ctx, c.x, c.y, c.x + (wr - 9) * Math.cos(q), c.y + (wr - 9) * Math.sin(q), cw, 2.5); }
      dot(ctx, c.x, c.y, cw, true, 5);
    });
    hits = [
      { x: pNx + 30, y: gy - 130, r: 60, name: 'the first child, pushing with F₁' },
      { x: pFx + 30, y: gy - 215, r: 40, name: 'the second child, pushing with F₂' },
      { x: rx, y: floor - 70, r: 46, name: 'the rider, part of the system' },
      { x: P(115, 0).x, y: P(0, -50).y, r: 90, name: 'the wagon and its rider, 30.0 kg: the system of interest' },
    ];
    /* the pushes leave the back of the bed where the hands are, the friction acts under the front
       wheel, and the acceleration and the velocity ride clear of the bodies */
    if (F2.v > 0) {
      const sg = { x1: bx, y1: rail - 12, x2: bx + F2.v * K, y2: rail - 12 };
      lb.halo(sg, 12); arrow(ctx, sg.x1, sg.y1, sg.x2, sg.y2, cf, 5);
      lb.add('F_2', sg.x2, sg.y2, 0.4, -1, cf, 24, 26);
      hits.push({ x: sg.x2, y: sg.y2, r: 22, name: 'F₂, the push of the second child' });
    }
    if (F1.v > 0) {
      const sg = { x1: bx, y1: P(0, -57).y, x2: bx + F1.v * K, y2: P(0, -57).y };
      arrow(ctx, sg.x1, sg.y1, sg.x2, sg.y2, cf, 5);
      lb.add('F_1', sg.x2, sg.y2, 1, 0, cf, 24, 14);
      hits.push({ x: sg.x2, y: sg.y2, r: 22, name: 'F₁, the push of the first child' });
    }
    if (fr() > 0) {
      const fx = P(182, 0).x + wr, sf = { x1: fx + fr() * K, y1: gy - 12, x2: fx, y2: gy - 12 };
      arrow(ctx, sf.x1, sf.y1, sf.x2, sf.y2, cf, 5);
      lb.add('f', sf.x1, sf.y1, 0.3, -1, cf, 24, 24);
      hits.push({ x: (sf.x1 + sf.x2) / 2, y: sf.y1, r: 22, name: 'f, the friction, drawn ahead of the wheel it acts on' });
    }
    const ay = 130, ax = P(60, 0).x;
    if (a > 0.005) {
      arrow(ctx, ax, ay, ax + a * KA, ay, ca, 5);
      lb.add('a = ' + fmt(a, 2) + ' m/s²', ax + a * KA, ay, 1, 0, ca, 22, 14);
      const vx = P(300, 0).x, vy = gy - 150;
      if (v > 0.05) { arrow(ctx, vx, vy, vx + v * KV, vy, cv, 5); lb.add('v = ' + fmt(v, 2) + ' m/s', vx + v * KV, vy, 1, 0, cv, 22, 14); }
    }
    /* the free-body diagram: every external force on the system from one dot, the pushes collinear
       as the book draws them. The weight and the support of the ground are 294 N each, six times
       the scale's reach, so they are drawn at a fixed length with a break in the shaft. */
    const D = { x: 300, y: 622 }, tip = D.x + (F1.v + F2.v) * K;
    text(ctx, 'Free-body diagram', 60, 500, PAL.muted, { size: 19 });
    lb.block(50, 484, 250, 516);
    const mid = (s, x1, x2, up) => lb.add(s, Math.max((x1 + x2) / 2, D.x + F.measure(ctx, s, { size: 20, weight: 600 }) / 2 + 18), D.y, 0, up ? -1 : 1, cf, 20, 22);
    if (F1.v > 0) { arrow(ctx, D.x, D.y, D.x + F1.v * K, D.y, cf, 5); mid('F_1 = ' + fmt(F1.v, 1) + ' N', D.x, D.x + F1.v * K, true); }
    if (F2.v > 0) { const t0 = D.x + F1.v * K; arrow(ctx, t0, D.y, tip, D.y, cf, 5); mid('F_2 = ' + fmt(F2.v, 1) + ' N', t0, tip, F1.v <= 0 || F2.v * K > 150 ? true : false); }
    if (fr() > 0) { arrow(ctx, D.x, D.y, D.x - fr() * K, D.y, cf, 5); lb.add('f = ' + fmt(fr(), 1) + ' N', D.x - fr() * K, D.y, -1, 0, cf, 20, 14); }
    broken(ctx, D.x, D.y, D.y + 84, cf); lb.add('w = ' + sig3(W) + ' N', D.x, D.y + 70, -1, 0, cf, 20, 18);
    broken(ctx, D.x, D.y, D.y - 84, cf); lb.add('N = ' + sig3(W) + ' N', D.x, D.y - 70, -1, 0, cf, 20, 18);
    dot(ctx, D.x, D.y, cw, true, 9);
    hits.push({ x: D.x, y: D.y + 40, r: 26, name: 'w, the weight of the system, too long for this scale' }, { x: D.x, y: D.y - 40, r: 26, name: 'N, the support of the ground, too long for this scale' },
      { x: D.x, y: D.y, r: 14, name: 'the wagon and its rider, drawn as a dot' });
    /* the sum, head to tail: the friction is laid back from the tip of the two pushes, and the net
       force runs from the dot to where it ends */
    const sy = 770;
    if (F1.v + F2.v > 0) {
      line(ctx, tip, D.y + 10, tip, sy - 34, alpha(PAL.ink, 0.35), 2, [4, 8]);
      if (fr() > 0) { arrow(ctx, tip, sy - 34, tip - fr() * K, sy - 34, cf, 4); lb.add('f', tip, sy - 34, 1, 0, cf, 20, 12); }
    }
    line(ctx, D.x, D.y + 92, D.x, sy + 12, alpha(PAL.ink, 0.35), 2, [4, 8]);
    if (n > 0) {
      arrow(ctx, D.x, sy, D.x + n * K, sy, cf, 7);
      lb.add('F_net = ' + fmt(n, 1) + ' N', D.x + n * K, sy, 1, 0, cf, 22, 14);
      hits.push({ x: D.x + n * K / 2, y: sy, r: 24, name: 'F_net, the two pushes less the friction' });
    } else text(ctx, 'F_net = 0', D.x + 16, sy, cf, { size: 22, weight: 600 });
    /* the acceleration against the net force, for the 30.0 kg of the wagon and its rider: 0 to
       120 N, the two pushes at their greatest with no friction, and 0 to 4 m/s². The hollow point
       is the case the figure opens on. */
    const gbox = { l: 1030, r: 1330, t: 540, b: 740 };
    const g = axes(ctx, gbox, [0, 120], [0, 4], { xl: 'F_net (N)', xc: cf, yl: 'a (m/s²)', yc: ca, nx: 4, ny: 4, fx: (s) => fmt(s, 0), fy: (s) => fmt(s, 0) });
    lb.block(gbox.l - 50, gbox.t - 40, gbox.r + 20, gbox.b + 70);
    line(ctx, g.X(0), g.Y(0), g.X(120), g.Y(120 / M), ca, 5);
    line(ctx, g.X(n), g.Y(0), g.X(n), g.Y(a), cf, 2, [4, 8]);
    line(ctx, g.X(0), g.Y(a), g.X(n), g.Y(a), ca, 2, [4, 8]);
    dot(ctx, g.X(N0), g.Y(N0 / M), ca, false, 9);
    pinned(ctx, gbox, g.X, g.Y, n, a, PAL.ink);
    hits.push({ x: g.X(N0), y: g.Y(N0 / M), r: 16, name: 'the opening case: 43.0 N gives 1.43 m/s²' }, { x: g.X(n), y: g.Y(a), r: 16, name: fmt(n, 1) + ' N gives ' + fmt(a, 2) + ' m/s²' });
    const missed = lb.flush();
    d.fig.dataset.missed = missed.join(' | ');
    readout(d.readout, `\\ka = \\frac{\\kFnet}{\\km} = \\frac{\\kFone + \\kFtwo - \\kff}{\\km} = \\frac{${fmt(F1.v, 1)}\\ \\text{N} + ${fmt(F2.v, 1)}\\ \\text{N} - ${fmt(fr(), 1)}\\ \\text{N}}{${fmt(M, 1)}\\ \\text{kg}} = ${fmt(a, 2)}\\ \\text{m/s}^2`);
  }
  F.hover(d.stage, () => hits);
  register(d.fig, { update: (dt) => cy.step(dt, () => T / 5), draw });
})();

/* =====================================================================
   FIGURE 4.6: the same force on a basketball and on an SUV. The idea has
   no time in it — it answers its sliders — so the figure is a still
   picture with no transport. The graph carries the reading, since the two
   accelerations are thousands apart. Its axes are shifted by a decade and
   two so that neither range straddles zero and no zero line is drawn on a
   scale that has no zero.
===================================================================== */
(function () {
  const d = sim('sim-mass', 990);
  const Fp = ctl(d.controls, { label: '\\kF', cls: 'force', min: 10, max: 500, step: 5, value: 200, unit: 'N', dec: 0, aria: 'force the player exerts' });
  const mb = ctl(d.controls, { label: '\\km_{\\htmlData{ref=ball}{\\text{ball}}}', cls: 'mass', min: 0.2, max: 3, step: 0.001, value: 0.624, unit: 'kg', dec: 3, aria: 'mass of the basketball' });
  const ms = ctl(d.controls, { label: '\\km_{\\htmlData{ref=suv}{\\text{SUV}}}', cls: 'mass', min: 800, max: 3000, step: 20, value: 1800, unit: 'kg', dec: 0, aria: 'mass of the SUV' });
  const MX = 1, MY = 2;   /* the decades the two axes are shifted by */
  function draw() {
    const { ctx } = begin(d.c);
    const ab = Fp.v / mb.v, as = Fp.v / ms.v, cf = C('force'), ca = C('acceleration');
    /* the two scenes, the same push drawn the same length on each */
    const L = 40 + Fp.v * 0.34, gy = 300;
    line(ctx, 80, gy, 680, gy, PAL.muted, 3); line(ctx, 740, gy, 1340, gy, PAL.muted, 3);
    F.person(ctx, 214, gy, F.ref('player'), { lean: 0.22, reach: { x: 276, y: gy - 50 } });
    const cb = F.ref('ball'), cs = F.ref('suv');
    basketball(ctx, 300, gy - 50, cb, 26);
    arrow(ctx, 332, gy - 50, 332 + L, gy - 50, cf, 5);
    text(ctx, 'F = ' + fmt(Fp.v, 0) + ' N', 332 + L / 2, gy - 78, cf, { size: 20, weight: 600, align: 'center' });
    text(ctx, 'a basketball of ' + fmt(mb.v, 3) + ' kg', 360, gy + 36, cb, { size: 18, align: 'center' });
    text(ctx, 'a = ' + sig3(ab) + ' m/s²', 360, gy - 140, ca, { size: 22, weight: 600, align: 'center' });
    F.person(ctx, 860, gy, F.ref('player'), { lean: 0.22, reach: { x: 922, y: gy - 44 } });
    car(ctx, 980, gy - 26, cs, 1.5);
    arrow(ctx, 1046, gy - 50, 1046 + L, gy - 50, cf, 5);
    text(ctx, 'F = ' + fmt(Fp.v, 0) + ' N', 1046 + L / 2, gy - 78, cf, { size: 20, weight: 600, align: 'center' });
    text(ctx, 'an SUV of ' + commas(fmt(ms.v, 0)) + ' kg', 1020, gy + 36, cs, { size: 18, align: 'center' });
    text(ctx, 'a = ' + sig3(as) + ' m/s²', 1020, gy - 140, ca, { size: 22, weight: 600, align: 'center' });
    /* (c) the two free-body diagrams the book draws beneath the scenes: one arrow apiece, the same
       push drawn the same length on each, which is what makes the two situations comparable */
    text(ctx, '(c) the free-body diagrams are identical, so the two situations can be compared directly', 700, 420, PAL.muted, { size: 18, align: 'center' });
    [[360, 'the basketball', cb], [1020, 'the SUV', cs]].forEach(([bx, name, cr]) => {
      dot(ctx, bx - 150, 500, cr, true, 10);
      arrow(ctx, bx - 150, 500, bx - 150 + L, 500, cf, 5);
      text(ctx, 'F = ' + fmt(Fp.v, 0) + ' N', bx - 150 + L / 2, 472, cf, { size: 20, weight: 600, align: 'center' });
      text(ctx, name, bx - 150, 534, cr, { size: 18 });
    });
    /* acceleration against mass, both axes stepping by tens */
    const gbox = { l: 220, r: 1230, t: 620, b: 910 };
    const g = axes(ctx, gbox, [0, 5], [0, 6],
      { xl: 'm (kg)', xc: C('mass'), yl: 'a (m/s²)', yc: ca, nx: 5, ny: 6, fx: (e) => powLabel(e - MX), fy: (e) => powLabel(e - MY) });
    inbox(ctx, gbox, () => {
      curve(ctx, (e) => Math.log10(Fp.v) - (e - MX) + MY, 0, 5, g.X, g.Y, ca, 5, 40);
      [[mb.v, ab], [ms.v, as]].forEach(([m, a]) => {
        const ex = Math.log10(m) + MX, ey = Math.log10(a) + MY;
        line(ctx, g.X(ex), g.Y(0), g.X(ex), g.Y(ey), PAL.muted, 2, [4, 8]);
        line(ctx, g.X(0), g.Y(ey), g.X(ex), g.Y(ey), PAL.muted, 2, [4, 8]);
      });
    });
    /* a mass so large, or a push so small, that the point falls below the floor of the graph is
       pinned at that edge with its value beside it rather than drawn outside the frame */
    [[mb.v, ab, 'the ball', cb], [ms.v, as, 'the SUV', cs]].forEach(([m, a, name, cr]) => {
      const p = pinned(ctx, gbox, g.X, g.Y, Math.log10(m) + MX, Math.log10(a) + MY, ca, sig3(a) + ' m/s²');
      text(ctx, name, p.x + 16, p.y + 24, cr, { size: 18, weight: 600, bg: PAL.panel });
    });
    text(ctx, 'every step of ten in the mass is a step of a tenth in the acceleration', g.X(2.6), g.Y(5.5), PAL.muted, { size: 17, align: 'center' });
    headline(ctx, 'The same ' + fmt(Fp.v, 0) + ' N gives the ' + fmt(mb.v, 3) + ' kg ball ' + sig3(ab) + ' m/s² and the ' + commas(fmt(ms.v, 0)) + ' kg SUV ' + sig3(as) + ' m/s²');
    readout(d.readout, `\\ka = \\frac{\\kF}{\\km} = \\frac{${fmt(Fp.v, 0)}\\ \\text{N}}{${fmt(mb.v, 3)}\\ \\text{kg}} = ${sig3(ab).replace(/,/g, '{,}')}\\ \\text{m/s}^2`,
      'The SUV is ' + sig3(ms.v / mb.v) + ' times as massive as the ball, and its acceleration is ' + sig3(ms.v / mb.v) + ' times smaller.');
  }
  register(d.fig, { update: () => {}, draw });
})();


/* =====================================================================
   FIGURE 4.8: the rocket sled of Example 4.2, made into its free-body
   diagram. One story slider runs from the picture to the diagram: the
   rail, the rider and the flames fade, the outline of the sled and its
   rockets bends into a dot, and the dot carries every force to where the
   diagram stands, each arrow re-rooting its tail on it, while the graph
   of the acceleration against the rockets burning arrives beside it.
   The sled is caught at the instant of Example 4.2, so the story is the
   only timeline.
===================================================================== */
(function () {
  const d = sim('sim-sled', 700);
  const M = 2100, A0 = 49;
  let nn, ff;
  const Tt = ctl(d.controls, { label: '\\kTf', cls: 'force', min: 5000, max: 40000, step: 12.5, value: (M * A0 + 650) / 4, unit: 'N', dec: 0, aria: 'thrust of one rocket',
    specials: [{ at: () => (M * A0 + ff.v) / +nn.value, label: 'Example 4.2' }] });
  const burn = [0, 1, 2, 3].map(() => F.tween(d, 1));
  nn = F.select(d.controls, {
    label: '\\text{rockets burning}', key: 'rockets', aria: 'number of rockets burning', value: '4',
    options: [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }],
    onInput: (v) => light(+v),
  });
  ff = ctl(d.controls, { label: '\\kff', cls: 'force', min: 0, max: 2000, step: 50, value: 650, unit: 'N', dec: 0, aria: 'force of friction',
    specials: [{ at: () => +nn.value * Tt.v - M * A0, label: 'Example 4.2' }] });
  const st = ctl(d.controls, { label: '\\text{picture} \\to \\text{diagram}', cls: '', min: 0, max: 1, step: 0.01, value: 0, unit: '', dec: 2, aria: 'from the picture to the free-body diagram' });
  F.story(d, st, { stops: [{ v: 0, label: 'picture' }, { v: 1, label: 'free-body diagram' }], ms: 2400 });
  /* each rocket that lights grows its thrust from the tail, one after another; one that goes out shrinks back */
  let lit = 4;
  function light(n) {
    burn.forEach((b, i) => { if (i >= n) b.to(0, 500); else if (i >= lit) setTimeout(() => b.to(1, 700), 120 * (i - lit)); });
    lit = n;
  }
  const lerp = F.lerp, sm = F.ease.smooth, clamp = (x) => Math.min(1, Math.max(0, x));
  const tnum = (s) => s.replace(/,/g, '{,}');
  const WORD = ['', 'One rocket', 'Two rockets', 'Three rockets', 'Four rockets'];
  /* one scale for every force, in the picture and in the diagram, so an arrow keeps its length as it
     travels: four thrusts of 40,000 N chain to 720 units from the dot at x = 180, which ends short of
     the graph's box at x = 1010; the friction, never more than 9 units on that scale, is drawn at
     50, larger than scale as the book draws it */
  const K = 0.0045, W = M * G;
  const Z = 2.2, P0 = [640, 380], DOT = [180, 400], R = 16;
  /* the silhouette of the platform and its column of rockets, about its centroid, resampled by arc
     length, and the circle it bends into, point for point in the same winding */
  const RAW = [[-90, 8], [90, 8], [90, -6], [-46, -6], [-46, -94], [-86, -94], [-86, -6], [-90, -6]].map(([x, y]) => [x * Z, y * Z]);
  const O = [-38 * Z, -28 * Z];
  const NPT = 120;
  const OUTLINE = (() => {
    const pts = RAW.concat([RAW[0]]), seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
    const tot = seg.reduce((s, x) => s + x, 0);
    return Array.from({ length: NPT }, (_, j) => {
      let s = (j / NPT) * tot, i = 0;
      while (s > seg[i]) { s -= seg[i]; i++; }
      const a = pts[i], b = pts[i + 1], k = s / seg[i];
      return [lerp(a[0], b[0], k) - O[0], lerp(a[1], b[1], k) - O[1]];
    });
  })();
  const th0 = Math.atan2(OUTLINE[0][1], OUTLINE[0][0]);
  const CIRCLE = OUTLINE.map((_, j) => [R * Math.cos(th0 - TAU * j / NPT), R * Math.sin(th0 - TAU * j / NPT)]);
  const at = (p) => [p[0] - O[0], p[1] - O[1]];
  const ROCKY = [0, 1, 2, 3].map((i) => (-17 - 22 * i) * Z);
  const WHEELS = [-64, 64], RAIL = 32 * Z;
  /* the thrusts end at the nozzles, the normal force rises from the rail's top face under the middle
     of the platform, the friction acts back where the rear wheel meets the rail */
  const NOZZLE = -86 * Z, NFOOT = at([0, RAIL]), REAR = at([WHEELS[0] * Z, RAIL]);
  /* the parts of the picture that the diagram leaves out: the wheels, the rockets' seams, the flames
     of the rockets that burn, and the rider sitting at the front of the platform */
  function extras(ctx, lv, cs) {
    const [x, y] = P0;
    WHEELS.forEach((wx) => {
      const c = { x: x + wx * Z, y: y + 20 * Z };
      ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = cs; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(c.x, c.y, 12 * Z - 3, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
      dot(ctx, c.x, c.y, cs, true, 6);
    });
    for (let i = 1; i < 4; i++) line(ctx, x - 86 * Z, y + (-6 - 22 * i) * Z, x - 46 * Z, y + (-6 - 22 * i) * Z, cs, 2.5);
    lv.forEach((g, i) => {
      if (g < 0.02) return;
      const yc = y + ROCKY[i], x0 = x + NOZZLE, L = 74 * g;
      ctx.save();
      ctx.fillStyle = alpha(PAL.muted, 0.45); ctx.beginPath(); ctx.moveTo(x0, yc - 15); ctx.quadraticCurveTo(x0 - L * 0.55, yc - 13, x0 - L, yc); ctx.quadraticCurveTo(x0 - L * 0.55, yc + 13, x0, yc + 15); ctx.closePath(); ctx.fill();
      ctx.fillStyle = alpha(PAL.ink, 0.35); ctx.beginPath(); ctx.moveTo(x0, yc - 7); ctx.quadraticCurveTo(x0 - L * 0.3, yc - 6, x0 - L * 0.55, yc); ctx.quadraticCurveTo(x0 - L * 0.3, yc + 6, x0, yc + 7); ctx.closePath(); ctx.fill();
      ctx.restore();
    });
    const s = 1, top = y - 6 * Z;
    F.silhouette(ctx, { x: x + 60 * Z, y: top + 46 * s, s, pose: 'sit', color: cs, feet: [{ x: 38, y: -46 }, { x: 32, y: -44 }] });
  }
  let hits = [];
  function draw() {
    const { ctx } = begin(d.c);
    const n = +nn.value, s = st.v, lv = burn.map((b) => b.v), cf = C('force'), cs = F.ref('sled');
    const net = n * Tt.v - ff.v, a = Math.max(0, net) / M;
    const hl = topline(ctx, WORD[n] + ' of ' + sig3(Tt.v) + ' N against ' + commas(fmt(ff.v, 0)) + ' N of friction ' + (n > 1 ? 'give' : 'gives') + ' the 2,100 kg sled ' + fmt(a, 1) + ' m/s²');
    const lb = F.labeller(ctx, 700, { headline: hl });
    const fade = 1 - clamp(s / 0.3), m = sm(clamp((s - 0.2) / 0.35)), t = sm(clamp((s - 0.5) / 0.5));
    const ox = lerp(P0[0] + O[0], DOT[0], t), oy = lerp(P0[1] + O[1], DOT[1], t);
    if (fade > 0.001) {
      ctx.save(); ctx.globalAlpha = fade;
      strip(ctx, 40, 1360, P0[1] + RAIL + 20, 40);
      extras(ctx, lv, cs);
      ctx.restore();
    }
    /* the outline bending point by point into the dot */
    ctx.save(); ctx.beginPath();
    OUTLINE.forEach((p, j) => { const q = CIRCLE[j], X = ox + lerp(p[0], q[0], m), Y = oy + lerp(p[1], q[1], m); if (j) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); });
    ctx.closePath(); ctx.fillStyle = alpha(cs, lerp(0.35, 1, m)); ctx.strokeStyle = cs; ctx.lineWidth = 3.5; ctx.lineJoin = 'round';
    ctx.fill(); ctx.stroke(); ctx.restore();
    /* every force from its point of application to its place on the dot */
    const Lt = Tt.v * K, Lw = W * K, Lf = alen(ff.v, K, 50);
    const place = (from, to) => [ox + lerp(from[0], to[0], t), oy + lerp(from[1], to[1], t)];
    const seg = (x, y, dx, dy) => ({ x1: x, y1: y, x2: x + dx, y2: y + dy });
    const pic = t < 0.5;
    hits = fade > 0.5 ? [{ x: P0[0] + 66 * Z, y: P0[1] - 40, r: 40, name: 'the rider, part of the system' }, { x: P0[0] - 66 * Z, y: P0[1] - 110, r: 50, name: 'the four rockets' }] : [];
    let chain = 0;
    lv.forEach((g, i) => {
      if (g < 0.01) return;
      const [x, y] = place(at([NOZZLE - Lt, ROCKY[i]]), [chain, 0]), sg = seg(x, y, Lt * g, 0);
      arrow(ctx, sg.x1, sg.y1, sg.x2, sg.y2, cf, 6);
      if (pic) lb.beside(sg, 'left', 'T', cf, 24, { gap: 16 });
      hits.push({ x: sg.x1 + Lt * g / 2, y: sg.y1, r: 22, name: 'T, the thrust of one rocket' });
      chain += Lt * g;
    });
    if (!pic && chain > 0) lb.add(n > 1 ? n + 'T' : 'T', ox + chain, oy, 1, 0, cf, 26, 14);
    const [fx, fy] = place(REAR, [0, 0]), sf = seg(fx, fy, -Lf, 0);
    if (ff.v > 0) { arrow(ctx, sf.x1, sf.y1, sf.x2, sf.y2, cf, 6); lb.add('f', sf.x2, sf.y2, -1, 0, cf, 26, 14); }
    const sw = seg(ox, oy, 0, Lw);
    if (pic) lb.halo(sw, 10);
    arrow(ctx, sw.x1, sw.y1, sw.x2, sw.y2, cf, 6); lb.add('w', sw.x2, sw.y2, pic ? 1 : 0, pic ? 0 : 1, cf, 26, 14);
    const [nx, ny] = place(NFOOT, [0, 0]), sN = seg(nx, ny, 0, -Lw);
    if (pic) lb.halo(sN, 10);
    arrow(ctx, sN.x1, sN.y1, sN.x2, sN.y2, cf, 6); lb.add('N', sN.x2, sN.y2, pic ? 1 : 0, pic ? 0 : -1, cf, 26, 14);
    hits.push({ x: sf.x2, y: sf.y2, r: 22, name: 'f, the friction on the sled' }, { x: sw.x2, y: sw.y2, r: 22, name: 'w, the weight of the system' }, { x: sN.x2, y: sN.y2, r: 22, name: 'N, the support of the rail' });
    /* the answer the diagram gives: the net force, on its own row */
    if (t > 0.01 && net > 0) {
      ctx.save(); ctx.globalAlpha = t;
      arrow(ctx, DOT[0], DOT[1] + 160, DOT[0] + net * K, DOT[1] + 160, cf, 7);
      ctx.restore();
      if (t > 0.5) lb.add('F_net', DOT[0] + net * K, DOT[1] + 160, 1, 0, cf, 26, 14);
    }
    /* the acceleration against the rockets burning, beside the diagram it follows from; with one
       rocket it is not a quarter of four, since the same friction comes off every count. The axis
       is fixed at 0 to 80 m/s²: four rockets of 40,000 N against no friction give 76.2 m/s². */
    if (t > 0.01) {
      const accOf = (k) => Math.max(0, k * Tt.v - ff.v) / M, AR = 80, gbox = { l: 1010, r: 1330, t: 170, b: 360 };
      ctx.save(); ctx.globalAlpha = t;
      const g = axes(ctx, gbox, [0, 4], [0, AR], { xl: 'rockets burning', xc: PAL.ink, yl: 'a (m/s²)', yc: C('acceleration'), nx: 4, ny: 4, fx: (q) => fmt(q, 0), fy: (q) => fmt(q, 0) });
      inbox(ctx, gbox, () => {
        line(ctx, g.X(0), g.Y(0), g.X(4), g.Y(accOf(4)), PAL.muted, 3, [10, 10]);
        line(ctx, g.X(1), g.Y(accOf(1)), g.X(4), g.Y(accOf(4)), C('acceleration'), 5);
        for (let i = 1; i <= 4; i++) dot(ctx, g.X(i), g.Y(accOf(i)), C('acceleration'), i !== n, 9);
      });
      const nm = nn.mix((v) => +v);   /* the marker slides along the line to the new count */
      pinned(ctx, gbox, g.X, g.Y, nm, accOf(nm), PAL.ink, fmt(a, 1) + ' m/s²');
      /* the dashed line through the origin lies above the real one at every count, so its name goes above it */
      text(ctx, 'simply proportional', g.X(3.2) - 6, g.Y(accOf(4) * 0.8) - 20, PAL.muted, { size: 17, align: 'right' });
      ctx.restore();
    }
    const missed = lb.flush();
    d.fig.dataset.missed = missed.join(' | ');
    const terms = [0, 1, 2, 3].slice(0, n).map((i) => `\\mk{T${i}}{${i ? '{}+' : ''}\\kTf}`).join(' ');
    ro.set(`\\mk{Fnet}{\\kFnet} = ${terms} \\mk{f}{{}-\\kff} = \\mk{n}{${n}}\\mk{nT}{\\kTf} \\mk{f2}{{}-\\kff}`
      + ` = \\mk{nval}{${n}}\\mk{Tval}{(${tnum(sig3(Tt.v))}\\ \\text{N})} \\mk{fval}{{}-${tnum(commas(fmt(ff.v, 0)))}\\ \\text{N}} = \\mk{Fval}{${tnum(sig3(net))}\\ \\text{N}}`);
  }
  const ro = F.readout(d);
  F.hover(d.stage, () => hits);
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the weight of a mass, on Earth and elsewhere. Weight has no time in
   it — the figure answers its sliders — so it is a still picture with no
   transport. The scene stands upright, so its graph goes beside it, and
   the weight and the support of the scale are drawn on a free-body diagram
   of their own beneath the scene, as the other figures of the page draw
   their forces.
===================================================================== */
(function () {
  const d = sim('sim-weight', 740);
  /* The mass runs to 2.0 kg rather than to a person's mass, so that the graph beside the scene can
     hold the whole of it on one fixed weight axis; 1.0 kg, the mass the section works with, is a
     detent. The gravity carries the two the section names as detents of its own; they are so far
     apart that a thumb settling on the nearer of them would swallow most of the slider, so the ticks
     mark them and the step lands on either exactly. */
  const mm = ctl(d.controls, { label: '\\km', cls: 'mass', min: 0.1, max: 2, step: 0.1, value: 1, unit: 'kg', dec: 1, aria: 'mass on the scale', detents: [{ v: 1, label: '1.0 kg' }], snap: true });
  const gg = ctl(d.controls, { label: '\\kg', cls: 'acceleration', min: 1, max: 11, step: 0.005, value: 9.8, unit: 'm/s²', dec: 3, aria: 'acceleration due to gravity', detents: [{ v: 1.625, label: 'Moon' }, { v: 9.8, label: 'Earth' }], snap: false });
  /* 9.80 and 1.625 are the two the book names, so each is printed as the book prints it */
  const gtxt = (g) => (Math.abs(g * 100 - Math.round(g * 100)) < 1e-9 ? fmt(g, 2) : fmt(g, 3));
  const place = (g) => (Math.abs(g - 9.8) < 0.003 ? 'On Earth, where' : Math.abs(g - 1.625) < 0.003 ? 'On the Moon, where' : 'Where');
  function draw() {
    const { ctx } = begin(d.c);
    const w = mm.v * gg.v, cf = C('force'), ca = C('acceleration');
    /* the scene: a mass resting on a bathroom scale on the floor */
    const cx = 340, fy = 300;
    fixed(ctx, 100, fy, 480, 28);
    bathScale(ctx, cx, fy, 240, F.ref('scale'));
    const bh = 46 + Math.min(110, Math.cbrt(mm.v) * 30), bw = 84 + Math.min(130, Math.cbrt(mm.v) * 38);
    const by = fy - 34 - bh / 2;
    block(ctx, cx, by, bw, bh, F.ref('load'));
    text(ctx, fmt(mm.v, 1) + ' kg', cx, by, C('mass'), { size: 22, weight: 600, align: 'center' });
    text(ctx, 'the dial reads ' + sig3(w / G) + ' kg', cx, fy + 58, PAL.muted, { size: 19, align: 'center' });
    text(ctx, 'g = ' + gtxt(gg.v) + ' m/s²', cx, fy + 90, ca, { size: 21, weight: 600, align: 'center' });
    /* the two forces on the mass, equal and opposite, at a length that follows the gravity */
    const dy = 580, L = 34 + 96 * (gg.v / 11);
    text(ctx, 'the forces on the mass', cx, dy - 152, PAL.muted, { size: 18, align: 'center' });
    arrow(ctx, cx, dy, cx, dy + L, cf, 5);
    text(ctx, 'w = ' + sig3(w) + ' N', cx + 16, dy + L - 12, cf, { size: 21, weight: 600 });
    arrow(ctx, cx, dy, cx, dy - L, cf, 5);
    text(ctx, 'the scale pushes back with ' + sig3(w) + ' N', cx + 16, dy - L + 12, cf, { size: 19, weight: 600 });
    dot(ctx, cx, dy, F.ref('load'), true, 8);
    /* the weight against the acceleration due to gravity */
    /* fixed axes: the gravity slider stops at 11 m/s² and the mass slider at 2.0 kg, so no weight on
       the sliders can pass 22 N and the weight axis is fixed at 0 to 24 N, ticked every 6 N. Neither
       range changes as a slider moves, and the 9.8 N the figure opens with sits well up the box. */
    const WR = 24, gbox = { l: 850, r: 1280, t: 170, b: 630 };
    const g = axes(ctx, gbox, [0, 11], [0, WR], { xl: 'g (m/s²)', xc: ca, yl: 'w (N)', yc: cf, nx: 11, ny: 4, fx: (s) => fmt(s, 0), fy: (s) => fmt(s, 0) });
    inbox(ctx, gbox, () => {
      line(ctx, g.X(0), g.Y(0), g.X(11), g.Y(mm.v * 11), cf, 5);
      [[1.625, 'the Moon', 1], [9.8, 'Earth', -1]].forEach(([gv, name, side]) => {
        line(ctx, g.X(gv), g.Y(0), g.X(gv), g.Y(mm.v * gv), PAL.muted, 2, [4, 8]);
        dot(ctx, g.X(gv), g.Y(mm.v * gv), cf, true, 9);
        const low = side > 0 && mm.v < 0.6;   /* a nearly flat line leaves no room under the Moon's point, so its name goes above */
        text(ctx, name, g.X(gv) + (low ? 0 : side * 18), g.Y(mm.v * gv) + (low ? -28 : side > 0 ? 12 : -24), PAL.ink, { size: 18, weight: 600, align: low ? 'center' : side > 0 ? 'left' : 'right', bg: PAL.panel });
      });
      line(ctx, g.X(gg.v), g.Y(0), g.X(gg.v), g.Y(w), ca, 3, [10, 10]);
      line(ctx, g.X(0), g.Y(w), g.X(gg.v), g.Y(w), cf, 2, [10, 10]);
    });
    pinned(ctx, gbox, g.X, g.Y, gg.v, w, ca, sig3(w) + ' N');
    headline(ctx, place(gg.v) + ' g = ' + gtxt(gg.v) + ' m/s², a mass of ' + fmt(mm.v, 1) + ' kg weighs ' + sig3(w) + ' N');
    readout(d.readout, `\\kwgt = \\km\\kg = (${fmt(mm.v, 1)}\\ \\text{kg})(${gtxt(gg.v)}\\ \\text{m/s}^2) = ${sig3(w)}\\ \\text{N}`,
      'A bathroom scale measures the force and divides it by 9.80 m/s² to print a mass.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
