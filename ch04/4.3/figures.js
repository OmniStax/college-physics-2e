/* Figures for section 4.3 Newton's Second Law of Motion: Concept of a System.
   Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, choice, ctl, cycle, register, begin, line, arrow, dot, text, headline, topline, hbracket, strip, scale, axes, curve, pinned, runner, person, block, fixed } = F;
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

/* ---------- sprites, in ink ---------- */
/* a basketball centred on (x, y) */
function basketball(ctx, x, y, color, r) {
  ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  ctx.strokeStyle = PAL.panel; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x + r, y); ctx.moveTo(x, y - r); ctx.lineTo(x, y + r); ctx.stroke();
  ctx.restore();
}

/* an SUV standing on (x, y), nose to the right, about 170 by 92 at s = 1 */
function suv(ctx, x, y, color, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = color;
  ctx.beginPath(); ctx.moveTo(-84, -14); ctx.lineTo(-84, -52); ctx.lineTo(-74, -80); ctx.lineTo(34, -80); ctx.lineTo(56, -52); ctx.lineTo(84, -46); ctx.lineTo(84, -14); ctx.closePath(); ctx.fill();
  ctx.fillStyle = PAL.panel;
  ctx.beginPath(); ctx.moveTo(-68, -73); ctx.lineTo(-10, -73); ctx.lineTo(-10, -54); ctx.lineTo(-74, -54); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-2, -73); ctx.lineTo(30, -73); ctx.lineTo(45, -54); ctx.lineTo(-2, -54); ctx.closePath(); ctx.fill();
  [-50, 50].forEach((wx) => { ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.arc(wx, -14, 18, 0, TAU); ctx.fill(); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(wx, -14, 13, 0, TAU); ctx.fill(); });
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
  const d = sim('sim-wagon', 840);
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
    const lb = F.labeller(ctx, 840, { headline: hl });
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
      lb.add('F_net = ' + fmt(n, 1) + ' N', Math.max(D.x + n * K / 2, D.x + 90), sy, 0, 1, cf, 22, 26);
      hits.push({ x: D.x + n * K / 2, y: sy, r: 24, name: 'F_net, the two pushes less the friction' });
    } else text(ctx, 'F_net = 0', D.x + 22, sy + 26, cf, { size: 22, weight: 600 });
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
   FIGURE 4.6: the same push on a basketball and on an SUV. The idea has
   no time in it, so the figure is still. The two accelerations are
   thousands apart, so the graph steps both axes by tens: on it the
   inverse proportion is a straight line that falls one step for every
   step across, and each body sits on it under its own picture. The axes
   are shifted by a decade and two so that neither range straddles zero.
===================================================================== */
(function () {
  const d = sim('sim-mass', 800);
  const Fp = ctl(d.controls, { label: '\\kF', cls: 'force', min: 10, max: 500, step: 5, value: 200, unit: 'N', dec: 0, aria: 'force the player exerts' });
  const mb = ctl(d.controls, { label: '\\km_{\\htmlData{ref=ball}{1}}', cls: 'mass', key: 'm-ball', min: 0.2, max: 3, step: 0.001, value: 0.624, unit: 'kg', dec: 3, aria: 'mass of the basketball' });
  const ms = ctl(d.controls, { label: '\\km_{\\htmlData{ref=suv}{2}}', cls: 'mass', key: 'm-suv', min: 800, max: 3000, step: 20, value: 1800, unit: 'kg', dec: 0, aria: 'mass of the SUV' });
  const MX = 1, MY = 2;   /* the decades the two axes are shifted by */
  const tnum = (s) => s.replace(/,/g, '{,}');
  let hits = [];
  function draw() {
    const { ctx } = begin(d.c);
    const ab = Fp.v / mb.v, as = Fp.v / ms.v, ratio = ms.v / mb.v, cf = C('force'), ca = C('acceleration'), cm = C('mass');
    const cb = F.ref('ball'), cs = F.ref('suv'), cp = F.ref('player');
    headline(ctx, 'The SUV has ' + sig3(ratio) + ' times the mass of the ball, so the same push gives it 1/' + sig3(ratio) + ' of the acceleration');
    /* the two scenes: the same player, the same push drawn the same length over each body */
    const gy = 330, L = 30 + Fp.v * 0.5, S = 1.45;
    const scene = (px, hand, body, name, m, a, cr, sub, mid) => {
      line(ctx, px - 110, gy, px + 520, gy, PAL.muted, 3);
      F.silhouette(ctx, { x: px, y: gy, s: S, pose: 'push', color: cp, hands: [{ x: (hand.x - px) / S, y: (hand.y - gy) / S }, { x: (hand.x - px) / S - 2, y: (hand.y - gy) / S + 7 }] });
      body();
      arrow(ctx, hand.x, 150, hand.x + L, 150, cf, 6);
      text(ctx, 'F = ' + fmt(Fp.v, 0) + ' N', hand.x, 122, cf, { size: 22, weight: 600 });
      F.rich(ctx, [name + ', m_' + sub + ' = ', [m, cm]], mid, gy + 34, { size: 20, align: 'center' });
      F.rich(ctx, ['a_' + sub + ' = ', [sig3(a) + ' m/s²', ca]], mid, gy + 66, { size: 23, weight: 600, align: 'center' });
    };
    const hb = { x: 200, y: gy - 122 }, hs = { x: 866, y: gy - 120 };
    scene(120, hb, () => basketball(ctx, hb.x + 40, hb.y, cb, 38), 'the ball', fmt(mb.v, 3) + ' kg', ab, cb, '1', 300);
    scene(790, hs, () => suv(ctx, hs.x + 190, gy, cs, 2.2), 'the SUV', commas(fmt(ms.v, 0)) + ' kg', as, cs, '2', 1010);
    hits = [{ x: 150, y: gy - 110, r: 70, name: 'the player' }, { x: 820, y: gy - 110, r: 70, name: 'the same player' },
      { x: hb.x + 40, y: hb.y, r: 40, name: 'the basketball' }, { x: hs.x + 190, y: gy - 90, r: 110, name: 'the stalled SUV' }];
    /* acceleration against mass, both axes stepping by tens: 0.1 kg to 10,000 kg, 0.01 to 10,000 m/s² */
    const gbox = { l: 200, r: 1240, t: 470, b: 720 };
    const g = axes(ctx, gbox, [0, 5], [0, 6],
      { xl: 'm (kg)', xc: cm, yl: 'a (m/s²)', yc: ca, nx: 5, ny: 6, fx: (e) => powLabel(e - MX), fy: (e) => powLabel(e - MY) });
    const ex = (m) => Math.log10(m) + MX, ey = (a) => Math.log10(a) + MY;
    inbox(ctx, gbox, () => {
      curve(ctx, (e) => Math.log10(Fp.v) - (e - MX) + MY, 0, 5, g.X, g.Y, ca, 5, 40);
      [[mb.v, ab], [ms.v, as]].forEach(([m, a]) => {
        line(ctx, g.X(ex(m)), g.Y(0), g.X(ex(m)), g.Y(ey(a)), PAL.muted, 2, [4, 8]);
        line(ctx, g.X(0), g.Y(ey(a)), g.X(ex(m)), g.Y(ey(a)), PAL.muted, 2, [4, 8]);
      });
      /* one step on the line: ten times the mass, a tenth of the acceleration */
      const a10 = Fp.v / 10, a100 = Fp.v / 100;
      line(ctx, g.X(ex(10)), g.Y(ey(a10)), g.X(ex(100)), g.Y(ey(a10)), PAL.ink, 2.5);
      line(ctx, g.X(ex(100)), g.Y(ey(a10)), g.X(ex(100)), g.Y(ey(a100)), PAL.ink, 2.5);
      text(ctx, '×10 the mass', g.X(ex(31.6)), g.Y(ey(a10)) - 18, PAL.ink, { size: 18, align: 'center' });
      text(ctx, '÷10 the acceleration', g.X(ex(100)) + 12, g.Y(ey(a10 / 3.16)), PAL.ink, { size: 18 });
    });
    [[mb.v, ab, 'the ball', cb, 1], [ms.v, as, 'the SUV', cs, -1]].forEach(([m, a, name, cr, side]) => {
      const p = pinned(ctx, gbox, g.X, g.Y, ex(m), ey(a), cr, sig3(a) + ' m/s²');
      text(ctx, name, p.x + side * 18, p.y + side * -26, cr, { size: 19, weight: 600, align: side > 0 ? 'left' : 'right', bg: PAL.panel });
      hits.push({ x: p.x, y: p.y, r: 16, name: name + ': ' + sig3(m) + ' kg, ' + sig3(a) + ' m/s²' });
    });
    readout(d.readout, `\\ka_{1} = \\frac{\\kF}{\\km_{1}} = \\frac{${fmt(Fp.v, 0)}\\ \\text{N}}{${fmt(mb.v, 3)}\\ \\text{kg}} = ${tnum(sig3(ab))}\\ \\text{m/s}^2 \\\\ \\ka_{2} = \\frac{\\kF}{\\km_{2}} = \\frac{${fmt(Fp.v, 0)}\\ \\text{N}}{${tnum(commas(fmt(ms.v, 0)))}\\ \\text{kg}} = ${sig3(as)}\\ \\text{m/s}^2`);
  }
  F.hover(d.stage, () => hits);
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
  const d = sim('sim-sled', 600);
  const M = 2100, A0 = 49;
  let nn, ff;
  const Tt = ctl(d.controls, { label: '\\kTf', cls: 'force', min: 5000, max: 40000, step: 12.5, value: (M * A0 + 650) / 4, unit: 'N', dec: 0, aria: 'thrust of one rocket',
    specials: [{ at: () => (M * A0 + ff.v) / +nn.value, label: 'Example 4.2' }] });
  const burn = [0, 1, 2, 3].map(() => F.tween(d, 1));
  nn = choice(d.controls, {
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
  const Z = 2.2, P0 = [620, 400], DOT = [180, 330], R = 16;
  /* the silhouette of the platform and its column of rockets, about its centroid, resampled by arc
     length, and the circle it bends into, point for point in the same winding */
  /* read off the book's drawing: a block of four rockets at the back, a fin above them, a canopy
     amidships and a long nose that drops to the rail */
  const RAW = [[-86, 8], [128, 8], [150, 0], [128, -10], [64, -30], [34, -52], [6, -56], [-14, -44], [-40, -60], [-52, -112], [-66, -112], [-60, -94], [-86, -94]].map(([x, y]) => [x * Z, y * Z]);
  const O = [0, -24 * Z];
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
  const WHEELS = [-56, 96], RAIL = 22 * Z;
  /* the thrusts end at the nozzles, the normal force rises from the rail's top face under the middle
     of the platform, the friction acts back where the rear wheel meets the rail */
  const NOZZLE = -96 * Z, NFOOT = at([20 * Z, RAIL]), REAR = at([156 * Z, 0]);
  /* the parts of the picture that the diagram leaves out: the wheels, the rockets' seams, the flames
     of the rockets that burn, and the rider sitting at the front of the platform */
  function extras(ctx, lv, cs) {
    const [x, y] = P0;
    /* the skids that ride the rail, the four nozzles and the seams between the rockets */
    WHEELS.forEach((wx) => { ctx.save(); ctx.fillStyle = cs; ctx.fillRect(x + (wx - 16) * Z, y + 8 * Z, 32 * Z, RAIL - 8 * Z); ctx.restore(); });
    ctx.save(); ctx.fillStyle = cs;
    ROCKY.forEach((ry) => { ctx.beginPath(); ctx.moveTo(x - 86 * Z, y + ry - 12); ctx.lineTo(x + NOZZLE, y + ry - 18); ctx.lineTo(x + NOZZLE, y + ry + 18); ctx.lineTo(x - 86 * Z, y + ry + 12); ctx.closePath(); ctx.fill(); });
    ctx.restore();
    for (let i = 1; i < 4; i++) line(ctx, x - 86 * Z, y + (-6 - 22 * i) * Z, x - 44 * Z, y + (-6 - 22 * i) * Z, cs, 2.5);
    lv.forEach((g, i) => {
      if (g < 0.02) return;
      const yc = y + ROCKY[i], x0 = x + NOZZLE, L = 74 * g;
      ctx.save();
      ctx.fillStyle = alpha(PAL.muted, 0.45); ctx.beginPath(); ctx.moveTo(x0, yc - 15); ctx.quadraticCurveTo(x0 - L * 0.55, yc - 13, x0 - L, yc); ctx.quadraticCurveTo(x0 - L * 0.55, yc + 13, x0, yc + 15); ctx.closePath(); ctx.fill();
      ctx.fillStyle = alpha(PAL.ink, 0.35); ctx.beginPath(); ctx.moveTo(x0, yc - 7); ctx.quadraticCurveTo(x0 - L * 0.3, yc - 6, x0 - L * 0.55, yc); ctx.quadraticCurveTo(x0 - L * 0.3, yc + 6, x0, yc + 7); ctx.closePath(); ctx.fill();
      ctx.restore();
    });
    /* the rider's helmet under the canopy */
    ctx.save(); ctx.strokeStyle = cs; ctx.lineWidth = 3; ctx.fillStyle = PAL.panel;
    ctx.beginPath(); ctx.moveTo(x - 10 * Z, y - 44 * Z); ctx.quadraticCurveTo(x + 12 * Z, y - 62 * Z, x + 36 * Z, y - 50 * Z); ctx.lineTo(x + 60 * Z, y - 32 * Z); ctx.lineTo(x - 10 * Z, y - 32 * Z); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
    dot(ctx, x + 14 * Z, y - 40 * Z, cs, true, 12);
  }
  let hits = [];
  function draw() {
    const { ctx } = begin(d.c);
    const n = +nn.value, s = st.v, lv = burn.map((b) => b.v), cf = C('force'), cs = F.ref('sled');
    const net = n * Tt.v - ff.v, a = Math.max(0, net) / M;
    const a1 = Math.max(0, Tt.v - ff.v) / M, a4 = Math.max(0, 4 * Tt.v - ff.v) / M, k = n < 4 ? n : 1, ak = n < 4 ? a : a1;
    const share = ['', 'a quarter', 'half', 'three quarters'][k], cmp = ff.v > 0 ? 'less than ' : 'exactly ';
    const hl = topline(ctx, n < 4
      ? WORD[n] + (n > 1 ? ' give ' : ' gives ') + fmt(ak, 1) + ' m/s², ' + cmp + share + ' of the ' + fmt(a4, 1) + ' m/s² that four give (' + fmt(k * a4 / 4, 1) + ' m/s²)'
      : 'Four rockets give ' + fmt(a4, 1) + ' m/s²; one gives ' + fmt(a1, 1) + ' m/s², ' + cmp + 'a quarter of that (' + fmt(a4 / 4, 1) + ' m/s²)');
    const lb = F.labeller(ctx, 600, { headline: hl });
    const fade = 1 - clamp(s / 0.3), m = sm(clamp((s - 0.2) / 0.35)), t = sm(clamp((s - 0.5) / 0.5));
    const ox = lerp(P0[0] + O[0], DOT[0], t), oy = lerp(P0[1] + O[1], DOT[1], t);
    if (fade > 0.001) {
      ctx.save(); ctx.globalAlpha = fade;
      ctx.fillStyle = PAL.soft; ctx.fillRect(40, P0[1] + RAIL, 1320, 16);
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
    hits = fade > 0.5 ? [{ x: P0[0] + 14 * Z, y: P0[1] - 40 * Z, r: 30, name: 'the rider, part of the system' }, { x: P0[0] - 66 * Z, y: P0[1] - 50 * Z, r: 70, name: 'the four rockets' }, { x: P0[0], y: P0[1] + RAIL + 8, r: 20, name: 'the rail' }] : [];
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
    const [fx, fy] = place([REAR[0] + Lf, REAR[1]], [0, 0]), sf = seg(fx, fy, -Lf, 0);
    if (ff.v > 0) { arrow(ctx, sf.x1, sf.y1, sf.x2, sf.y2, cf, 6); lb.add('f', pic ? sf.x1 : sf.x2, sf.y2, pic ? 1 : -1, 0, cf, 26, 14); }
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
      arrow(ctx, DOT[0], DOT[1] + 170, DOT[0] + net * K, DOT[1] + 170, cf, 7);
      ctx.restore();
      if (t > 0.5) lb.add('F_net = ' + sig3(net) + ' N', DOT[0] + net * K / 2, DOT[1] + 170, 0, 1, cf, 24, 28);
    }
    /* the acceleration against the rockets burning, beside the diagram it follows from; with one
       rocket it is not a quarter of four, since the same friction comes off every count. The axis
       is fixed at 0 to 80 m/s²: four rockets of 40,000 N against no friction give 76.2 m/s². */
    if (t > 0.01) {
      const accOf = (k) => Math.max(0, k * Tt.v - ff.v) / M, AR = 80, gbox = { l: 1010, r: 1330, t: 150, b: 420 };
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
    ro.set(`\\mk{a}{\\ka} = \\mk{frac}{\\frac{\\kFnet}{\\km}} = \\frac{\\mk{n}{${n > 1 ? n : '{}'}}\\mk{nT}{\\kTf} \\mk{f2}{{}-\\kff}}{\\mk{m}{\\km}}`
      + ` = \\frac{\\mk{nval}{${n > 1 ? n : '{}'}}\\mk{Tval}{(${tnum(sig3(Tt.v))}\\ \\text{N})} \\mk{fval}{{}-${tnum(commas(fmt(ff.v, 0)))}\\ \\text{N}}}{\\mk{mval}{2{,}100\\ \\text{kg}}} = \\mk{aval}{${fmt(a, 1)}\\ \\text{m/s}^2}`);
  }
  const ro = F.readout(d);
  F.hover(d.stage, () => hits);
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: one mass on one scale, on Earth and somewhere else. Weight has no
   time in it, so the figure is still. The left scale stays on Earth; the
   right one goes where the slider sends it. The block is the same on
   both, the weight arrows share one scale, and each dial shows what a
   scale built for Earth prints: the weight divided by 9.80 m/s².
===================================================================== */
(function () {
  const d = sim('sim-weight', 600);
  const mm = ctl(d.controls, { label: '\\km', cls: 'mass', min: 0.1, max: 2, step: 0.1, value: 1, unit: 'kg', dec: 1, aria: 'mass on the scale', detents: [{ v: 1, label: '1.0 kg' }], snap: true });
  const gg = ctl(d.controls, { label: '\\kg', cls: 'acceleration', min: 1, max: 11, step: 0.005, value: 1.625, unit: 'm/s²', dec: 3, aria: 'acceleration due to gravity at the second place', detents: [{ v: 1.625, label: 'Moon' }, { v: 9.8, label: 'Earth' }], snap: false });
  /* 9.80 and 1.625 are the two the book names, so each is printed as the book prints it */
  const gtxt = (g) => (Math.abs(g * 100 - Math.round(g * 100)) < 1e-9 ? fmt(g, 2) : fmt(g, 3));
  const where = (g) => (Math.abs(g - 9.8) < 0.003 ? 'On Earth' : Math.abs(g - 1.625) < 0.003 ? 'On the Moon' : 'Elsewhere');
  /* fixed scales: 2.0 kg at 11 m/s² weighs 22 N, drawn at 10 units to the newton (220 units), and
     the dial runs 0 to 2.5 kg, past the 2.24 kg it would print there */
  const KW = 10, DMAX = 2.5, fy = 480;
  let hits = [];
  function panel(ctx, cx, g, lb) {
    const w = mm.v * g, read = w / G, cf = C('force'), ca = C('acceleration'), cs = F.ref('scale'), cl = F.ref('load');
    text(ctx, where(g), cx + 60, 56, PAL.ink, { size: 26, weight: 600, align: 'center' });
    F.rich(ctx, ['g = ', [gtxt(g) + ' m/s²', ca]], cx + 60, 92, { size: 21, align: 'center' });
    fixed(ctx, cx - 250, fy, 500, 26);
    /* the scale: a cabinet with a dial in its face and a platform on top */
    const bw = 340, bh = 170, top = fy - bh;
    ctx.save(); ctx.strokeStyle = cs; ctx.fillStyle = PAL.panel; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.rect(cx - bw / 2, top, bw, bh); ctx.fill(); ctx.stroke();
    ctx.fillStyle = F.mixColor(cs, PAL.panel, 0.6); ctx.beginPath(); ctx.rect(cx - bw / 2 - 16, top - 14, bw + 32, 14); ctx.fill(); ctx.stroke();
    const R = 128, oy = fy - 22;
    ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, oy, R, Math.PI, TAU); ctx.closePath(); ctx.stroke();
    ctx.restore();
    for (let i = 0; i <= 25; i++) {
      const th = Math.PI * (1 - i / 25), big = i % 5 === 0, r0 = R - (big ? 18 : 10);
      line(ctx, cx + r0 * Math.cos(th), oy - r0 * Math.sin(th), cx + (R - 2) * Math.cos(th), oy - (R - 2) * Math.sin(th), cs, big ? 2.5 : 1.5);
      if (i % 10 === 0 || i === 25) text(ctx, fmt(i / 10, i === 25 ? 1 : 0), cx + (R - 36) * Math.cos(th), oy - (R - 36) * Math.sin(th) - (i % 25 === 0 ? 14 : 2), PAL.muted, { size: 17, align: 'center' });
    }
    const th = Math.PI * (1 - Math.min(read, DMAX) / DMAX);
    line(ctx, cx, oy, cx + (R - 54) * Math.cos(th), oy - (R - 54) * Math.sin(th), PAL.ink, 5);
    dot(ctx, cx, oy, PAL.ink, true, 6);
    F.rich(ctx, ['the dial reads ', [sig3(read) + ' kg', PAL.ink]], cx, fy + 52, { size: 21, align: 'center', weight: 600 });
    /* the block, the same size in both places */
    const s = Math.cbrt(mm.v), kw = 60 + 80 * s, kh = 44 + 56 * s, by = top - 14 - kh / 2 - 2;
    block(ctx, cx, by, kw, kh, cl);
    text(ctx, fmt(mm.v, 1) + ' kg', cx, by, C('mass'), { size: 23, weight: 600, align: 'center' });
    /* the two forces on the block, from a dot beside the scene */
    const dx = cx + 290, dy = 330, L = w * KW;
    arrow(ctx, dx, dy, dx, dy + L, cf, 6); lb.add('w = ' + sig3(w) + ' N', dx, dy + Math.max(L, 20), -1, 0, cf, 23, 16);
    arrow(ctx, dx, dy, dx, dy - L, cf, 6); lb.add('N = ' + sig3(w) + ' N', dx, dy - Math.max(L, 20), -1, 0, cf, 23, 16);
    dot(ctx, dx, dy, cl, true, 6);
    hits.push({ x: dx, y: dy + L / 2 + 8, r: 24, name: 'w, the weight of the block' }, { x: dx, y: dy - L / 2 - 8, r: 24, name: 'N, the scale pushing up on the block' },
      { x: cx, y: by, r: 50, name: 'the block, ' + fmt(mm.v, 1) + ' kg wherever it goes' }, { x: cx, y: fy - 60, r: 80, name: 'a scale built for Earth: it prints the weight divided by 9.80 m/s²' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const lb = F.labeller(ctx, 600), w = mm.v * gg.v;
    hits = [];
    panel(ctx, 290, G, lb); panel(ctx, 990, gg.v, lb);
    line(ctx, 700, 40, 700, 560, PAL.rule, 2);
    lb.flush();
    readout(d.readout, `\\kwgt = \\km\\kg = (${fmt(mm.v, 1)}\\ \\text{kg})(${gtxt(gg.v)}\\ \\text{m/s}^2) = ${sig3(w)}\\ \\text{N} \\\\ \\text{dial reading} = \\frac{\\kwgt}{9.80\\ \\text{m/s}^2} = \\frac{${sig3(w)}\\ \\text{N}}{9.80\\ \\text{m/s}^2} = ${sig3(w / G)}\\ \\text{kg}`);
  }
  F.hover(d.stage, () => hits);
  register(d.fig, { update: () => {}, draw });
})();

};
