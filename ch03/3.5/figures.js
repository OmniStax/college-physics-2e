/* Figures for section 3.5 Addition of Velocities. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['3.5'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, hbracket, vbracket, axes, labeller } = F;
const sim = (id, H) => F.sim(root, id, H);

/* ---------- small helpers shared by the figures ---------- */
const DEG = Math.PI / 180, G = 9.8;
/* three significant figures, never in exponent form, and no negative zero */
const sf = (x, n = 3) => { if (Math.abs(x) < 1e-9) return '0'; const s = x.toPrecision(n); return (s.includes('e') ? String(Number(s)) : s).replace('-', '−'); };
/* the same number for TeX, where the minus is a hyphen */
const tf = (x, n = 3) => sf(x, n).replace('−', '-');
const MS = '\\ \\text{m/s}';
/* a direction in the book's compass words: "20.0° west of north", "35.6° south of west" */
function compass(vx, vy) {
  const ax = Math.abs(vx), ay = Math.abs(vy);
  if (ay <= ax) { const off = Math.atan(ay / ax) / DEG, base = vx > 0 ? 'east' : 'west', side = vy >= 0 ? 'north' : 'south'; return off < 0.05 ? 'due ' + base : fmt(off, 1) + '° ' + side + ' of ' + base; }
  const off = Math.atan(ax / ay) / DEG, base = vy > 0 ? 'north' : 'south', side = vx >= 0 ? 'east' : 'west'; return off < 0.05 ? 'due ' + base : fmt(off, 1) + '° ' + side + ' of ' + base;
}
/* a short streak, for water or air moving past */
const streak = (ctx, x, y, dx, dy, color) => line(ctx, x, y, x + dx, y + dy, color, 2.5);
const wrap = (x, span) => ((x % span) + span) % span;
/* a title over one part of a figure */
const title = (ctx, s, x, y, align = 'left') => text(ctx, s, x, y, PAL.ink, { size: 22, weight: 600, align });

/* =====================================================================
   FIGURE 3.40 + 3.43: the boat on the river, with Example 3.6's speeds.
   The velocity triangle stands where the boat sets out, as the book
   draws it. A float released with the boat drifts with the water, so the
   line from the float to the boat is the boat's motion relative to the
   water and the line from the start to the boat its motion relative to
   the shore. Finite motion (one crossing), so it gets the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-boat', 700);
  const vb = ctl(d.controls, { label: '\\kvboat', cls: 'velocity', min: 0.2, max: 2, step: 0.01, value: 0.75, unit: 'm/s', dec: 2, onInput: reset, aria: 'speed of the boat relative to the water' });
  const vr = ctl(d.controls, { label: '\\kvriver', cls: 'velocity', min: 0, max: 2, step: 0.01, value: 1.2, unit: 'm/s', dec: 2, onInput: reset, aria: 'speed of the river relative to the shore' });
  const across = () => (vb.v > vr.v + 1e-9 ? Math.asin(vr.v / vb.v) / DEG : null);
  const hd = ctl(d.controls, { label: '\\text{heading}', cls: 'angle', min: -60, max: 70, step: 1, value: 0, unit: '°', dec: 0, onInput: reset, aria: 'heading of the boat, degrees upstream of straight across',
    fmt: (v) => (Math.abs(v) < 0.05 ? 'straight across' : fmt(Math.abs(v), Number.isInteger(v) ? 0 : 1) + '° ' + (v > 0 ? 'upstream' : 'downstream')),
    specials: [{ at: 0, label: 'pointed straight across' }, { at: across, label: 'lands straight across' }] });
  /* the book gives the river no width; 30 m is assumed, at a fixed 14 units to the metre, and the velocity
     arrows at a fixed 200 units per m/s, which keeps the fastest boat's arrow (2 m/s) inside the river */
  const W = 30, S = 14, K = 200, X0 = 300, YN = 600, YF = YN - W * S, L = 30, R = 1370, PT = 112, PB = 684;
  const ux = () => vr.v - vb.v * Math.sin(hd.v * DEG), uy = () => vb.v * Math.cos(hd.v * DEG), T = () => W / uy();
  const cy = cycle(T, 1.2);
  function reset() { cy.reset(); }
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), Tc = T(), vx = ux(), vy = uy(), drift = vx * Tc, vt = Math.hypot(vx, vy), th = Math.atan2(vy, vx);
    const a = hd.v, straight = Math.abs(a) < 0.05, cr = F.ref('river'), cb = F.ref('boat'), cv = C('velocity');
    const X = (m) => X0 + m * S, Y = (m) => YN - m * S;
    const lab = labeller(ctx, 700); lab.block(0, 0, 1400, 100);
    ctx.save(); ctx.beginPath(); ctx.rect(L, PT, R - L, PB - PT); ctx.clip();
    ctx.fillStyle = PAL.soft2; ctx.fillRect(L, PT, R - L, PB - PT);
    ctx.fillStyle = PAL.soft; ctx.fillRect(L, YF, R - L, YN - YF);
    line(ctx, L, YF, R, YF, cr, 2.5); line(ctx, L, YN, R, YN, cr, 2.5);
    /* the current, as streaks that drift downstream at the river's speed */
    for (let i = 0; i < 20; i++) { const yy = YF + 40 + (i % 5) * 85, xx = L + wrap(((i * 277) % 1340) + vr.v * tau * S, R - L); streak(ctx, xx, yy, 40, 0, alpha(cr, 0.45)); }
    /* the path relative to the shore: dashed to where the boat lands, solid where it has been */
    const bx = X(vx * tau), by = Y(vy * tau), lx = X(drift), off = lx < L + 24 || lx > R - 24;
    line(ctx, X0, YN, lx, YF, alpha(PAL.ink, 0.45), 2.5, [10, 10]);
    line(ctx, X0, YN, bx, by, PAL.ink, 3);
    /* the float released with the boat, and the boat's path relative to it */
    const fx = X(vr.v * tau);
    line(ctx, fx, YN, bx, by, cr, 2.5, [5, 8]);
    /* the velocity triangle where the boat sets out: the boat's velocity relative to the water, the river's
       from its head, and their sum */
    const hx = X0 - vb.v * Math.sin(a * DEG) * K, hy = YN - vb.v * Math.cos(a * DEG) * K, tx = X0 + vx * K, ty = YN - vy * K;
    arrow(ctx, X0, YN, hx, hy, alpha(cv, 0.55), 4);
    if (vr.v > 0.02) arrow(ctx, hx, hy, tx, ty, alpha(cv, 0.55), 4);
    arrow(ctx, X0, YN, tx, ty, cv, 6);
    dot(ctx, fx, YN, PAL.panel, true, 10); dot(ctx, fx, YN, cr, false, 10);
    F.rowboat(ctx, bx, by, 1.5, 90 + a, cb);
    if (!off) dot(ctx, lx, YF, PAL.ink, true, 9);
    ctx.restore();
    text(ctx, 'far bank', L + 20, YF - 34, cr, { size: 20 }); text(ctx, 'near bank', L + 20, YN + 42, cr, { size: 20 });
    /* how far downstream of straight across the boat lands */
    const dist = fmt(Math.abs(drift), 1) + ' m ' + (drift > 0 ? 'downstream' : 'upstream');
    if (off) { const ex = lx > R ? R - 16 : L + 16, dir = lx > R ? 1 : -1; arrow(ctx, ex - dir * 60, YF - 30, ex, YF - 30, PAL.ink, 3); text(ctx, 'lands ' + dist, ex - dir * 72, YF - 30, PAL.ink, { size: 22, weight: 600, align: dir > 0 ? 'right' : 'left' }); }
    else if (Math.abs(drift) >= 0.3) hbracket(ctx, Math.min(X0, lx), Math.max(X0, lx), YF - 22, PAL.ink, dist, { H: 700 });
    else text(ctx, 'lands straight across', X0, YF - 34, PAL.ink, { size: 22, weight: 600, align: 'center' });
    if (Math.abs(drift) >= 0.3) dot(ctx, X0, YF, PAL.ink, false, 8);
    /* names on the triangle, which stands still while the boat moves */
    const up = { x1: X0, y1: YN, x2: hx, y2: hy }, rv = { x1: hx, y1: hy, x2: tx, y2: ty }, tot = { x1: X0, y1: YN, x2: tx, y2: ty };
    const right = vx >= 0 ? 1 : -1;
    lab.beside(up, right > 0 ? 'left' : 'right', 'v_{boat} = ' + sf(vb.v) + ' m/s', cv, 22);
    if (vr.v > 0.02) lab.beside(rv, 'left', 'v_{river} = ' + sf(vr.v) + ' m/s', cv, 22);
    lab.beside(tot, right > 0 ? 'right' : 'left', 'v_{tot} = ' + sf(vt) + ' m/s', cv, 24, { offset: 0.62 });
    if (th / DEG > 6 && th / DEG < 174) F.angleArc(ctx, { x: X0, y: YN }, 86, 0, th, 'θ = ' + fmt(th / DEG, 1) + '°', lab, C('angle'));
    lab.flush();
    F.legend(ctx, { l: 560, r: R - 10, t: YN + 12, b: PB - 4 }, [{ s: 'float drifting with the water', kind: 'dot', color: cr, hollow: true }, { s: 'the boat seen from the float', color: cr, dash: [5, 8], w: 2.5 }, { s: 'the boat seen from the shore', color: PAL.ink, w: 3 }], { corner: 'br', row: true, panel: false, size: 19 });
    hits = [{ x: bx, y: by, r: 50, name: 'the boat, pointed ' + (straight ? 'straight across' : fmt(Math.abs(a), 0) + '° ' + (a > 0 ? 'upstream' : 'downstream') + ' of straight across') },
      { x: fx, y: YN, r: 18, name: 'a float released with the boat; it drifts with the water' }];
    if (!off) hits.push({ x: lx, y: YF, r: 16, name: 'where the boat lands' });
    /* what the numbers say */
    const how = straight ? 'Pointed straight across' : 'Pointed ' + fmt(Math.abs(a), Number.isInteger(a) ? 0 : 1) + '° ' + (a > 0 ? 'upstream' : 'downstream');
    topline(ctx, how + ', the boat crosses the ' + W + ' m river in ' + fmt(Tc, 1) + ' s and lands ' + (Math.abs(drift) < 0.3 ? 'straight across from where it set out.' : dist + '.'));
    const tot2 = `\\kvtot = \\sqrt{\\kvx^2 + \\kvy^2} = \\sqrt{(${tf(vx)}${MS})^2 + (${tf(vy)}${MS})^2} = ${tf(vt)}${MS}`;
    tex(d.readout, straight
      ? tot2 + ' \\\\ ' + (vr.v > 0.005 ? `\\ktheta = \\tan^{-1}(\\kvy/\\kvx) = \\tan^{-1}(${tf(vy)}/${tf(vx)}) = ${fmt(th / DEG, 1)}^\\circ` : `\\ktheta = 90.0^\\circ`)
      : `\\kvx = \\kvriver ${a > 0 ? '-' : '+'} \\kvboat\\sin ${fmt(Math.abs(a), Number.isInteger(a) ? 0 : 1)}^\\circ = ${tf(vr.v)}${MS} ${a > 0 ? '-' : '+'} ${tf(vb.v * Math.sin(Math.abs(a) * DEG))}${MS} = ${tf(vx)}${MS} \\\\ `
        + `\\kvy = \\kvboat\\cos ${fmt(Math.abs(a), Number.isInteger(a) ? 0 : 1)}^\\circ = ${tf(vy)}${MS} \\\\ ` + tot2);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T() / 5), draw });
})();

/* =====================================================================
   FIGURE 3.41: the plane in a wind. It points north the whole way; the
   faint plane is where it would be in still air, and the dashed line
   from that to the plane is how far the air has carried it. The velocity
   triangle stands where the flight begins, as the book draws it, and
   opens on the wind Example 3.7 finds. Finite motion, so the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-plane', 720);
  const vp = ctl(d.controls, { label: '\\kvp', cls: 'velocity', min: 20, max: 50, step: 0.5, value: 45, unit: 'm/s', dec: 1, onInput: reset, aria: 'speed of the plane relative to the air' });
  const vw = ctl(d.controls, { label: '\\kvw', cls: 'velocity', min: 0, max: 20, step: 0.1, value: 16, unit: 'm/s', dec: 1, onInput: reset, aria: 'speed of the wind' });
  const dir = ctl(d.controls, { label: '\\text{wind toward}', cls: 'angle', min: 0, max: 360, step: 0.2, value: 215.6, unit: '°', dec: 1, onInput: reset, aria: 'direction the wind blows toward, degrees counterclockwise from east',
    fmt: (v) => compass(Math.cos(v * DEG), Math.sin(v * DEG)), specials: [{ at: 90, label: 'a tailwind' }, { at: 180, label: 'a crosswind, toward the west' }, { at: 270, label: 'a headwind' }] });
  const wx = () => vw.v * Math.cos(dir.v * DEG), wy = () => vw.v * Math.sin(dir.v * DEG);
  /* the ground at one unit to the metre and the arrows at 7.5 units per m/s, so an arrow is as long as the
     ground covered in 7.5 s; the tallest triangle the sliders allow (50 m/s and a 20 m/s tailwind) stays on the map */
  const L = 30, R = 1370, PT = 112, PB = 704, SX = 800, SY = 650, K = 7.5;
  function T() { const ux = wx(), uy = vp.v + wy(); let t = 11; if (ux > 0.01) t = Math.min(t, (R - 70 - SX) / ux); if (ux < -0.01) t = Math.min(t, (SX - L - 70) / -ux); if (uy > 0.01) t = Math.min(t, (SY - PT - 70) / uy); return t; }
  const cy = cycle(T, 1.2);
  function reset() { cy.reset(); }
  let hits = [];
  F.hover(d.stage, () => hits);
  function flyer(ctx, x, y, color) { ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 2); F.plane(ctx, 0, 0, color, 0.95); ctx.restore(); }
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), vwx = wx(), vwy = wy(), ux = vwx, uy = vp.v + vwy, vt = Math.hypot(ux, uy), cv = C('velocity'), ca = F.ref('air'), cp = F.ref('plane');
    const lab = labeller(ctx, 720); lab.block(0, 0, 1400, 100);
    ctx.save(); ctx.beginPath(); ctx.rect(L, PT, R - L, PB - PT); ctx.clip();
    ctx.fillStyle = PAL.soft2; ctx.fillRect(L, PT, R - L, PB - PT);
    /* a river across the map, as the book has it, for the ground to be seen by */
    ctx.fillStyle = PAL.soft; ctx.beginPath(); ctx.moveTo(L, 392); for (let x = L; x <= R; x += 30) ctx.lineTo(x, 392 + 12 * Math.sin(x / 70)); for (let x = R; x >= L; x -= 30) ctx.lineTo(x, 446 + 12 * Math.sin(x / 70 + 0.8)); ctx.closePath(); ctx.fill();
    /* the air, as streaks that drift with the wind */
    const pw = R - L, ph = PB - PT, sl = 6 + vw.v * 1.6, e = vw.v > 0.02 ? [vwx / vw.v, -vwy / vw.v] : [1, 0];
    if (vw.v > 0.02) for (let i = 0; i < 26; i++) streak(ctx, L + wrap(((i * 211) % pw) + vwx * tau, pw), PT + wrap(((i * 137) % ph) - vwy * tau, ph), sl * e[0], sl * e[1], alpha(ca, 0.5));
    /* the track over the ground, the plane in still air, and how far the air has carried the plane */
    const px = SX + ux * tau, py = SY - uy * tau, gx = SX, gy = SY - vp.v * tau;
    line(ctx, SX, SY, SX + ux * 40, SY - uy * 40, alpha(PAL.ink, 0.4), 2.5, [10, 10]);
    line(ctx, SX, SY, px, py, PAL.ink, 3);
    if (vw.v > 0.02) { line(ctx, gx, gy, px, py, ca, 3, [6, 8]); ctx.save(); ctx.globalAlpha = 0.3; flyer(ctx, gx, gy, cp); ctx.restore(); }
    /* the velocity triangle where the flight begins */
    const hx = SX, hy = SY - vp.v * K, tx = SX + ux * K, ty = SY - uy * K;
    arrow(ctx, SX, SY, hx, hy, alpha(cv, 0.55), 4);
    if (vw.v > 0.02) arrow(ctx, hx, hy, tx, ty, alpha(cv, 0.55), 4);
    if (vt > 0.3) arrow(ctx, SX, SY, tx, ty, cv, 6);
    flyer(ctx, px, py, cp);
    ctx.restore();
    arrow(ctx, L + 40, PB - 36, L + 120, PB - 36, PAL.muted, 3); text(ctx, 'x (east)', L + 130, PB - 36, PAL.muted, { size: 19 });
    arrow(ctx, L + 40, PB - 36, L + 40, PB - 116, PAL.muted, 3); text(ctx, 'y (north)', L + 28, PB - 134, PAL.muted, { size: 19 });
    const west = ux <= 0;
    lab.beside({ x1: SX, y1: SY, x2: hx, y2: hy }, west ? 'right' : 'left', 'v_p = ' + sf(vp.v) + ' m/s', cv, 22, { offset: 0.4 });
    if (vw.v > 0.02) lab.beside({ x1: hx, y1: hy, x2: tx, y2: ty }, west ? 'right' : 'left', 'v_w = ' + sf(vw.v) + ' m/s', cv, 22);
    if (vt > 0.3) lab.beside({ x1: SX, y1: SY, x2: tx, y2: ty }, west ? 'left' : 'right', 'v_{tot} = ' + sf(vt) + ' m/s', cv, 24, { offset: 0.55 });
    const off = Math.atan2(ux, uy) / DEG;   /* east of north */
    if (vt > 0.3 && Math.abs(off) > 3 && Math.abs(off) < 177) F.angleArc(ctx, { x: SX, y: SY }, 150, 90 * DEG, (90 - off) * DEG, fmt(Math.abs(off), 1) + '°', lab, C('angle'));
    lab.flush();
    if (vw.v > 0.02) F.legend(ctx, { l: 820, r: R - 10, t: PB - 60, b: PB - 6 }, [{ s: 'the plane in still air', kind: 'dot', color: alpha(cp, 0.35) }, { s: 'how far the air has carried it', color: ca, dash: [6, 8], w: 3 }], { corner: 'br', row: true, panel: true, size: 19 });
    hits = [{ x: px, y: py, r: 50, name: 'the plane, pointed north' }];
    if (vw.v > 0.02) hits.push({ x: gx, y: gy, r: 40, name: 'where the plane would be in still air' });
    /* what the numbers say */
    topline(ctx, vw.v < 0.02 ? 'With no wind the plane moves over the ground as it moves through the air, ' + sf(vp.v) + ' m/s due north.'
      : vt < 0.3 ? 'The headwind is as fast as the plane, so the plane stays over one spot on the ground.'
        : 'Pointed north at ' + sf(vp.v) + ' m/s, the plane moves over the ground at ' + sf(vt) + ' m/s, ' + compass(ux, uy) + '.');
    tex(d.readout, `\\kvtotx = \\kvpx + \\kvwx = 0 + (${tf(vwx)}${MS}) = ${tf(ux)}${MS} \\\\ \\kvtoty = \\kvpy + \\kvwy = ${tf(vp.v)}${MS} + (${tf(vwy)}${MS}) = ${tf(uy)}${MS} \\\\ `
      + `\\kvtot = \\sqrt{\\kvtotx^2 + \\kvtoty^2} = ${tf(vt)}${MS}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T() / 5), draw });
})();

/* =====================================================================
   FIGURE 3.44: the wind found from the total velocity, Example 3.7. The
   plane's velocity and its velocity over the ground are given; the wind
   is their difference, taken component by component in the table beside
   the triangle. A still picture.
===================================================================== */
(function () {
  const d = sim('sim-wind', 760);
  const vp = ctl(d.controls, { label: '\\kvp', cls: 'velocity', min: 20, max: 50, step: 0.5, value: 45, unit: 'm/s', dec: 1, aria: 'speed of the plane relative to the air' });
  const vt = ctl(d.controls, { label: '\\kvtot', cls: 'velocity', min: 10, max: 50, step: 0.5, value: 38, unit: 'm/s', dec: 1, aria: 'speed of the plane relative to the ground' });
  const b = ctl(d.controls, { label: '\\text{track}', cls: 'angle', min: -40, max: 40, step: 0.5, value: 20, unit: '°', dec: 1, aria: 'direction of the total velocity, degrees west of north',
    fmt: (v) => (Math.abs(v) < 0.05 ? 'due north' : fmt(Math.abs(v), 1) + '° ' + (v > 0 ? 'west' : 'east') + ' of north') });
  function draw() {
    const { ctx } = begin(d.c);
    const a = 90 + b.v, ux = vt.v * Math.cos(a * DEG), uy = vt.v * Math.sin(a * DEG), vwx = ux, vwy = uy - vp.v, vw = Math.hypot(vwx, vwy), cv = C('velocity'), ca = C('angle');
    /* a fixed 11 units per m/s: the fastest plane the slider allows, 50 m/s north, is 550 units above the
       origin, and the widest track, 50 m/s at 40° from north, 354 units to either side of it */
    const K = 11, Ox = 440, Oy = 696;
    const lab = labeller(ctx, 760); lab.block(0, 0, 1400, 100);
    line(ctx, Ox - 380, Oy, Ox + 380, Oy, PAL.muted, 2); line(ctx, Ox, Oy + 44, Ox, 116, PAL.muted, 2);
    text(ctx, 'x (east)', Ox + 388, Oy, PAL.muted, { size: 19 }); text(ctx, 'y (north)', Ox + 14, 124, PAL.muted, { size: 19 });
    const hx = Ox, hy = Oy - vp.v * K, tx = Ox + ux * K, ty = Oy - uy * K, west = ux <= 0, calm = vw < 0.05;
    /* the wind's two components, from the head of the plane's velocity: across first, then down or up */
    if (!calm) { line(ctx, hx, hy, tx, hy, alpha(cv, 0.7), 3, [8, 8]); line(ctx, tx, hy, tx, ty, alpha(cv, 0.7), 3, [8, 8]); }
    arrow(ctx, Ox, Oy, hx, hy, alpha(cv, 0.6), 4);
    arrow(ctx, Ox, Oy, tx, ty, alpha(cv, 0.6), 4);
    if (!calm) arrow(ctx, hx, hy, tx, ty, cv, 6);
    dot(ctx, Ox, Oy, PAL.ink, true, 6);
    lab.beside({ x1: Ox, y1: Oy, x2: hx, y2: hy }, west ? 'right' : 'left', 'v_p = ' + sf(vp.v) + ' m/s', cv, 22, { offset: 0.45 });
    lab.beside({ x1: Ox, y1: Oy, x2: tx, y2: ty }, west ? 'left' : 'right', 'v_{tot} = ' + sf(vt.v) + ' m/s', cv, 22, { offset: 0.45 });
    if (!calm) {
      if (Math.abs(vwx) * K > 30) lab.add('v_{wx} = ' + sf(vwx) + ' m/s', (hx + tx) / 2, hy, 0, vwy <= 0 ? -1 : 1, cv, 22, 26);
      if (Math.abs(vwy) * K > 30) lab.add('v_{wy} = ' + sf(vwy) + ' m/s', tx, (hy + ty) / 2, west ? -1 : 1, 0, cv, 22, 22);
      lab.add('v_w = ' + sf(vw) + ' m/s', (hx + tx) / 2, (hy + ty) / 2, west ? 0.5 : -0.5, vwy <= 0 ? 0.87 : -0.87, cv, 24, 44);
    }
    F.angleArc(ctx, { x: Ox, y: Oy }, 60, 0, a * DEG, fmt(a, 1) + '°', lab, ca);
    if (Math.abs(b.v) > 4) F.angleArc(ctx, { x: Ox, y: Oy }, 190, 90 * DEG, a * DEG, fmt(Math.abs(b.v), 1) + '°', lab, ca);
    lab.flush();
    /* the subtraction, component by component, as the example does it */
    const TX = 860, TY = 330, cols = [TX + 250, TX + 420], rowH = 62;
    title(ctx, 'components (m/s)', TX, TY - 56);
    text(ctx, 'x (east)', cols[0], TY, PAL.muted, { size: 20, align: 'right' }); text(ctx, 'y (north)', cols[1], TY, PAL.muted, { size: 20, align: 'right' });
    const rows = [['v_{tot}', sf(vt.v) + ' m/s at ' + fmt(a, 1) + '°', ux, uy], ['− v_p', sf(vp.v) + ' m/s north', 0, vp.v], ['= v_w', 'the wind', vwx, vwy]];
    rows.forEach(([name, what, x, y], i) => {
      const yy = TY + rowH * (i + 1) + (i === 2 ? 14 : 0);
      if (i === 2) line(ctx, TX, yy - rowH / 2 - 6, cols[1] + 10, yy - rowH / 2 - 6, PAL.ink, 2);
      text(ctx, name, TX + 76, yy - 8, cv, { size: 24, weight: 600, align: 'right' });
      text(ctx, what, TX + 76, yy + 20, PAL.muted, { size: 17, align: 'right' });
      [x, y].forEach((q, j) => text(ctx, sf(q), cols[j], yy, cv, { size: i === 2 ? 26 : 24, weight: i === 2 ? 600 : 400, align: 'right' }));
    });
    /* what the numbers say */
    topline(ctx, calm ? 'The plane moves over the ground as it moves through the air, so the air is still.'
      : 'The wind that carries the plane off its heading blows at ' + sf(vw) + ' m/s, ' + compass(vwx, vwy) + '.');
    const th = Math.abs(vwx) < 1e-9 ? null : Math.atan(vwy / vwx) / DEG;
    tex(d.readout, calm ? `\\kvw = 0`
      : `\\kvw = \\sqrt{\\kvwx^2 + \\kvwy^2} = \\sqrt{(${tf(vwx)}${MS})^2 + (${tf(vwy)}${MS})^2} = ${tf(vw)}${MS} \\\\ `
        + (th === null ? `\\kvwx = 0` : `\\ktheta = \\tan^{-1}(\\kvwy/\\kvwx) = \\tan^{-1}\\left(\\frac{${tf(vwy)}}{${tf(vwx)}}\\right) = ${fmt(th, 1).replace('−', '-')}^\\circ`));
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 3.45: the binoculars dropped from the mast. One scene and two
   observers: seen from shore the ship sails on and the binoculars trace
   a curve; seen from the ship the mast stands still, the shore slides
   back and the binoculars fall straight. Finite motion (one fall).
===================================================================== */
(function () {
  const d = sim('sim-binoculars', 690);
  const ob = F.choice(d.controls, { label: 'watch from', options: [{ value: 'shore', label: 'the shore' }, { value: 'ship', label: 'the ship' }], value: 'shore', aria: 'which observer', onInput: () => {} });
  const vs = ctl(d.controls, { label: '\\kv_{\\text{ship}}', cls: 'velocity', min: 0, max: 12, step: 0.5, value: 6, unit: 'm/s', dec: 1, onInput: reset, aria: 'speed of the ship' });
  /* the book gives no numbers: a 12.0 m mast is assumed, drawn at a fixed 27 units to the metre, which keeps
     the fastest ship (18.8 m of travel in the 1.56 s fall) on the stage; velocity arrows at 6 units per m/s */
  const HM = 12, S = 27, KV = 6, Tf = Math.sqrt(2 * HM / G), DECK = 486, WATER = 510, TOP = DECK - HM * S, XS = 330, LANE = 20;
  const cy = cycle(() => Tf, 1.4);
  function reset() { cy.reset(); }
  let hits = [];
  F.hover(d.stage, () => hits);
  /* a sailing ship, bow to the right: the mast stands on (x, DECK) */
  function ship(ctx, x, color) {
    ctx.save(); ctx.lineJoin = 'round';
    ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(x - 176, DECK); ctx.lineTo(x + 196, DECK - 6); ctx.quadraticCurveTo(x + 176, DECK + 30, x + 120, DECK + 36); ctx.lineTo(x - 150, DECK + 36); ctx.quadraticCurveTo(x - 172, DECK + 26, x - 176, DECK); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, TOP); ctx.lineTo(x + 190, DECK - 8); ctx.moveTo(x, TOP); ctx.lineTo(x - 170, DECK - 2); ctx.stroke();   /* the stays */
    ctx.fillStyle = PAL.panel; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(x - 8, TOP + 24); ctx.quadraticCurveTo(x - 60, DECK - 150, x - 150, DECK - 40); ctx.lineTo(x - 8, DECK - 40); ctx.closePath(); ctx.fill(); ctx.stroke();   /* the mainsail */
    ctx.beginPath(); ctx.moveTo(x + 34, TOP + 62); ctx.lineTo(x + 172, DECK - 30); ctx.quadraticCurveTo(x + 96, DECK - 44, x + 46, DECK - 34); ctx.closePath(); ctx.fill(); ctx.stroke();   /* the jib, on the forestay */
    ctx.restore();
    line(ctx, x, DECK, x, TOP, color, 6);
  }
  function binoculars(ctx, x, y, color) {
    ctx.save(); ctx.fillStyle = color;
    for (const dx of [-8, 8]) { ctx.beginPath(); ctx.roundRect(x + dx - 6, y - 12, 12, 24, 4); ctx.fill(); }
    ctx.fillRect(x - 3, y - 6, 6, 7); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), v = vs.v, m = ob.mix((q) => (q === 'ship' ? 1 : 0)), vS = v * S;
    const slide = m * vS * (Tf - tau);                       /* how far the shore's things are shifted on the screen */
    const mast = XS + vS * tau + slide, drop = 0.5 * G * tau * tau, cs = F.ref('ship'), cb = F.ref('binoculars'), cv = C('velocity');
    /* the sea, still for the observer on shore and sliding back for the one on the ship */
    ctx.fillStyle = PAL.soft; ctx.fillRect(0, WATER, 1400, 80);
    for (let j = 0; j < 14; j++) streak(ctx, wrap(((j * 251) % 1400) + slide, 1460) - 40, WATER + 16 + (j % 3) * 22, 40, 0, alpha(PAL.muted, 0.6));
    /* the ship where it was when the binoculars were let go, seen from shore only */
    if (m < 0.98 && v > 0.05) { ctx.save(); ctx.globalAlpha = 0.22 * (1 - m); ship(ctx, XS + slide, cs); ctx.restore(); }
    ship(ctx, mast, cs);
    F.silhouette(ctx, { x: mast - 120, y: DECK - 2, s: 0.32, face: 1, pose: 'stand', color: F.ref('ship-observer') });
    /* the shore in the foreground, with its observer, a post and tufts of grass that mark it */
    ctx.fillStyle = PAL.soft2; ctx.fillRect(0, 590, 1400, 100); line(ctx, 0, 590, 1400, 590, PAL.rule, 2);
    for (let j = 0; j < 12; j++) { const gx = wrap(j * 173 + 60 + slide, 1500) - 50, gy = 620 + (j % 3) * 22; line(ctx, gx, gy, gx - 6, gy - 14, PAL.muted, 2); line(ctx, gx, gy, gx + 1, gy - 18, PAL.muted, 2); line(ctx, gx, gy, gx + 8, gy - 13, PAL.muted, 2); }
    const ox = 150 + slide;
    F.silhouette(ctx, { x: ox, y: 672, s: 0.9, face: 1, pose: 'stand', color: F.ref('shore-observer') });
    /* the path so far in this observer's frame, and the binoculars on it with their velocity */
    const bx = mast + LANE, by = TOP + drop * S;
    ctx.save(); ctx.strokeStyle = cb; ctx.lineWidth = 4; ctx.setLineDash([9, 7]); ctx.beginPath();
    for (let j = 0; j <= 40; j++) { const t = (tau * j) / 40, x = XS + LANE + vS * t + m * vS * (Tf - t), y = TOP + 0.5 * G * t * t * S; if (j) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
    ctx.stroke(); ctx.restore();
    dot(ctx, XS + LANE + m * vS * Tf, TOP, cb, false, 7);
    const ax = v * (1 - m) * KV, ay = G * tau * KV;
    if (ax > 2 && ay > 2) { arrow(ctx, bx, by, bx + ax, by, alpha(cv, 0.55), 3.5); arrow(ctx, bx + ax, by, bx + ax, by + ay, alpha(cv, 0.55), 3.5); }
    if (Math.hypot(ax, ay) > 6) arrow(ctx, bx, by, bx + ax, by + ay, cv, 5);
    binoculars(ctx, bx, by, cb);
    text(ctx, 'observer on shore', ox + 44, 650, F.ref('shore-observer'), { size: 20 });
    hits = [{ x: bx, y: by, r: 22, name: 'the binoculars' }, { x: mast - 120, y: DECK - 26, r: 28, name: 'the observer on the ship' }, { x: ox, y: 610, r: 60, name: 'the observer on shore' }, { x: mast, y: (TOP + DECK) / 2, r: 30, name: 'the mast, ' + fmt(HM, 1) + ' m tall' }];
    /* what the numbers say */
    const ship1 = ob.value === 'ship';
    topline(ctx, v < 0.05 ? 'The ship is at rest, so both observers see the binoculars fall straight down the ' + fmt(HM, 1) + ' m mast.'
      : ship1 ? 'Seen from the ship, the binoculars fall straight down the ' + fmt(HM, 1) + ' m mast and land at its base.'
        : 'Seen from shore, the binoculars move ' + fmt(v * Tf, 1) + ' m forward with the ship as they fall, and land at the base of the mast.');
    tex(d.readout, (ship1 ? `\\kvx = 0` : `\\kvx = \\kv_{\\text{ship}} = ${fmt(v, 1)}${MS}`)
      + ` \\\\ \\kvy = -\\kg t = -(9.80\\ \\text{m/s}^2)(${fmt(tau, 2)}\\ \\text{s}) = ${tf(-G * tau)}${MS}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => Tf / 5), draw });
})();

/* =====================================================================
   FIGURE 3.46: the coin dropped in the airliner, Example 3.8. Above, the
   flight relative to the Earth drawn to scale: the airliner covers 144 m
   while the coin falls 1.50 m inside it. Below, the cabin enlarged, where
   the coin falls straight down, and the coin's velocity at the floor
   relative to the Earth, to one scale. Finite motion.
===================================================================== */
(function () {
  const d = sim('sim-coin', 730);
  const vp = ctl(d.controls, { label: '\\kv_{\\text{plane}}', cls: 'velocity', min: 100, max: 280, step: 1, value: 260, unit: 'm/s', dec: 0, onInput: reset, aria: 'speed of the plane' });
  const h = ctl(d.controls, { label: 'h', cls: 'position', min: 1, max: 1.8, step: 0.05, value: 1.5, unit: 'm', dec: 2, onInput: reset, aria: 'height of the drop' });
  const T = () => Math.sqrt(2 * h.v / G);
  const cy = cycle(T, 1.4);
  function reset() { cy.reset(); }
  let hits = [];
  F.hover(d.stage, () => hits);
  /* an airliner seen from the side, nose to the right, centred on (x, y) and 240 long: 40 m at the strip's scale */
  function airliner(ctx, x, y, color) {
    ctx.save(); ctx.translate(x, y); ctx.fillStyle = PAL.panel; ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(-96, -12); ctx.lineTo(-132, -46); ctx.lineTo(-112, -46); ctx.lineTo(-70, -12); ctx.closePath(); ctx.fill(); ctx.stroke();   /* the fin */
    ctx.beginPath(); ctx.moveTo(-120, -8); ctx.quadraticCurveTo(-116, -12, -96, -12); ctx.lineTo(84, -12); ctx.quadraticCurveTo(116, -10, 120, 2); ctx.quadraticCurveTo(112, 12, 84, 12); ctx.lineTo(-84, 12); ctx.quadraticCurveTo(-110, 4, -120, -8); ctx.closePath(); ctx.fill(); ctx.stroke();   /* the fuselage */
    ctx.beginPath(); ctx.moveTo(24, 8); ctx.lineTo(-26, 34); ctx.lineTo(-44, 34); ctx.lineTo(-12, 8); ctx.closePath(); ctx.fill(); ctx.stroke();   /* the near wing */
    ctx.restore();
  }
  /* the cabin seen across the aisle: floor, a wall curving to the ceiling, a window and an overhead bin */
  function cabin(ctx, l, t, r, b, color) {
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = color; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(l, b); ctx.lineTo(l, t + 80); ctx.quadraticCurveTo(l, t, l + 80, t); ctx.lineTo(r - 80, t); ctx.quadraticCurveTo(r, t, r, t + 80); ctx.lineTo(r, b); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.soft2; ctx.beginPath(); ctx.roundRect(l + 26, t + 22, 150, 40, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.roundRect(l + 56, t + 104, 50, 68, 22); ctx.fill(); ctx.stroke();
    ctx.restore();
    line(ctx, l, b, r, b, color, 4);
  }
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), Tc = T(), drop = 0.5 * G * tau * tau, vy = -G * Tc, Rg = vp.v * Tc, v = Math.hypot(vp.v, vy), th = Math.atan2(vy, vp.v) / DEG;
    const cl = F.ref('airliner'), cc = F.ref('coin'), cv = C('velocity'), cx = C('position');
    /* relative to the Earth, to scale: 6 units to the metre, which holds the farthest the sliders reach, 179 m */
    const g = 6, X0 = 190, YR = 218, X = (mm) => X0 + mm * g;
    title(ctx, 'relative to the Earth, to scale', 40, 132);
    ctx.save(); ctx.globalAlpha = 0.25; airliner(ctx, X0, YR + 4, cl); ctx.restore();
    const px = X(vp.v * tau);
    airliner(ctx, px, YR + 4, cl);
    ctx.save(); ctx.strokeStyle = cc; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X0, YR - 4);
    for (let j = 1; j <= 30; j++) { const t = (tau * j) / 30; ctx.lineTo(X(vp.v * t), YR - 4 + 0.5 * G * t * t * g); } ctx.stroke(); ctx.restore();
    dot(ctx, X0, YR - 4, cc, false, 5); dot(ctx, px, YR - 4 + drop * g, cc, true, 5);
    hbracket(ctx, X0, X(Rg), 292, cx, fmt(Rg, 0) + ' m along the ground in ' + fmt(Tc, 3) + ' s', { side: 'below', H: 730 });
    line(ctx, X0, YR + 40, X0, 282, alpha(PAL.ink, 0.35), 2, [4, 8]); line(ctx, X(Rg), YR + 40, X(Rg), 282, alpha(PAL.ink, 0.35), 2, [4, 8]);
    /* relative to the plane: the cabin at 140 units to the metre, the coin let go from the passenger's hand */
    const s = 140, FLOOR = 700, top = FLOOR - h.v * s, PX = 250, CX = 312, SP = (1.72 * s) / 150;
    title(ctx, 'relative to the plane', 40, 396);
    cabin(ctx, 60, 420, 520, FLOOR, cl);
    F.silhouette(ctx, { x: PX, y: FLOOR, s: SP, face: 1, pose: 'stand', color: F.ref('passenger'), hands: [{ x: (CX - 8 - PX) / SP, y: (top + 6 - FLOOR) / SP }, { x: -6, y: -76 }] });
    line(ctx, CX, top, CX, FLOOR, alpha(PAL.ink, 0.4), 2, [6, 8]); dot(ctx, CX, top, cc, false, 8);
    vbracket(ctx, CX + 96, top, FLOOR, cx, fmt(h.v, 2) + ' m', 1, { H: 730 });
    const cyy = top + drop * s;
    if (tau > 0.01) arrow(ctx, CX, cyy, CX, cyy + G * tau * 11, cv, 5);
    dot(ctx, CX, cyy, cc, true, 10);
    /* the coin's velocity at the floor relative to the Earth, to one scale: the fall is a stub beside the plane's speed */
    const kx = 2.3, ox = 650, oy = 560, tipx = ox + vp.v * kx, tipy = oy - vy * kx;
    title(ctx, 'the coin’s velocity at the floor, relative to the Earth', 650, 440);
    arrow(ctx, ox, oy, tipx, tipy, cv, 6);
    line(ctx, ox, oy, tipx, oy, alpha(cv, 0.6), 2.5, [8, 8]);
    text(ctx, 'v_x = ' + sf(vp.v) + ' m/s', (ox + tipx) / 2, oy - 30, cv, { size: 22, weight: 600, align: 'center' });
    text(ctx, 'v_y = ' + sf(vy) + ' m/s', tipx + 14, oy + 34, cv, { size: 22, weight: 600, align: 'right' });
    text(ctx, 'v = ' + sf(v, 5) + ' m/s, ' + fmt(Math.abs(th), 2) + '° below the horizontal', ox, oy + 84, cv, { size: 22, weight: 600 });
    hits = [{ x: px, y: YR + 4, r: 60, name: 'the airliner' }, { x: X0, y: YR + 4, r: 60, name: 'the airliner when the coin was let go' }, { x: CX, y: cyy, r: 20, name: 'the coin' }, { x: PX, y: FLOOR - 130, r: 60, name: 'the passenger' }];
    /* what the numbers say */
    topline(ctx, 'While the coin falls ' + fmt(h.v, 2) + ' m to the floor, the plane carries it ' + fmt(Rg, 0) + ' m over the ground.');
    tex(d.readout, `\\kv = \\sqrt{\\kvx^2 + \\kvy^2} = \\sqrt{(${tf(vp.v)}${MS})^2 + (${tf(vy)}${MS})^2} = ${tf(v, 5)}${MS} \\\\ \\ktheta = \\tan^{-1}(\\kvy/\\kvx) = \\tan^{-1}(${tf(vy)}/${tf(vp.v)}) = ${fmt(th, 2).replace('−', '-')}^\\circ`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T() / 5), draw });
})();

/* =====================================================================
   SIM: the five galaxies of problems 12 and 13, with the book's numbers.
   The galaxies stay where they are; the choice names the galaxy they are
   seen from, and each velocity becomes the velocity relative to it. In
   the graph below every observer finds the others on one line through
   themself. Opens on the book's view, from the Milky Way.
===================================================================== */
(function () {
  const d = sim('fig-galaxies', 740);
  const POS = [-300, -150, 0, 190, 450], VEL = [-4500, -2200, 0, 2830, 6700], NAME = ['Galaxy 1', 'Galaxy 2', 'the Milky Way', 'Galaxy 4', 'Galaxy 5'], SHORT = ['Galaxy 1', 'Galaxy 2', 'MW', 'Galaxy 4', 'Galaxy 5'];
  const ob = F.choice(d.controls, { label: 'seen from', options: SHORT.map((s, i) => ({ value: String(i), label: i === 2 ? 'Milky Way' : s })), value: '2', aria: 'the galaxy the others are seen from', onInput: () => {} });
  /* the least-squares line through the origin of the book's four pairs, 14.9 km/s for each Mly */
  const HUB = POS.reduce((a, p, i) => a + p * VEL[i], 0) / POS.reduce((a, p) => a + p * p, 0);
  function galaxy(ctx, x, y, color) {
    ctx.save(); ctx.fillStyle = alpha(color, 0.16); ctx.beginPath(); ctx.ellipse(x, y, 58, 22, -0.35, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = alpha(color, 0.32); ctx.beginPath(); ctx.ellipse(x, y, 32, 12, -0.35, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const o = +ob.value, po = ob.mix((q) => POS[+q]), vo = ob.mix((q) => VEL[+q]), cv = C('velocity'), cx = C('position'), cm = F.ref('milky-way');
    const XG = (p) => 240 + (p + 300) * 1.2, YG = 232, KA = 0.018;
    line(ctx, 40, YG, 1360, YG, PAL.rule, 1.5);
    POS.forEach((p, i) => {
      const x = XG(p), col = i === 2 ? cm : PAL.ink, me = i === o, rel = VEL[i] - vo, dist = Math.abs(p - po);
      text(ctx, SHORT[i], x, 122, col, { size: 22, weight: 600, align: 'center' });
      text(ctx, me ? 'the observer' : fmt(dist, 0) + ' Mly', x, 154, me ? PAL.ink : cx, { size: 20, weight: me ? 600 : 400, align: 'center' });
      galaxy(ctx, x, YG, col);
      if (me) { ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.ellipse(x, YG, 70, 34, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
      if (Math.abs(rel) * KA > 14) arrow(ctx, x, YG + 62, x + rel * KA, YG + 62, cv, 5);
      if (!me) text(ctx, sf(Math.round(rel / 10) * 10, 4) + ' km/s', x, YG + 100, cv, { size: 20, weight: 600, align: 'center' });
    });
    /* the same galaxies as points: velocity against position, both relative to the observer */
    const box = { l: 190, r: 1300, t: 400, b: 660 };
    const ax = axes(ctx, box, [-800, 800], [-12000, 12000], { xl: 'position relative to the observer (Mly)', xc: cx, yl: 'velocity (km/s)', yc: cv, nx: 8, ny: 4, fx: (q) => sf(q, 4), fy: (q) => sf(q, 5) });
    F.plot(ctx, ax, (q) => HUB * q, alpha(PAL.ink, 0.5), { w: 2.5, dash: [10, 10] });
    POS.forEach((p, i) => { const col = i === 2 ? cm : PAL.ink; dot(ctx, ax.X(p - po), ax.Y(VEL[i] - vo), col, i !== o, i === o ? 11 : 9); });
    F.legend(ctx, ax, [{ s: 'velocity in proportion to distance', color: alpha(PAL.ink, 0.5), dash: [10, 10], w: 2.5 }, { s: 'the observer', kind: 'dot', color: PAL.ink, hollow: true }], { corner: 'tl', size: 19 });
    /* what the numbers say */
    topline(ctx, 'Seen from ' + NAME[o] + ', every other galaxy moves away, and the farther it is, the faster it goes.');
    const j = o <= 2 ? 4 : 0, sub = (i) => (i === 2 ? '\\text{MW}' : String(i + 1));
    tex(d.readout, `\\text{${NAME[j]} relative to ${NAME[o]}: }\\ \\kv_{${sub(j)}} - \\kv_{${sub(o)}} = ${VEL[j]}\\ \\text{km/s} - ${VEL[o] < 0 ? '(' + VEL[o] + '\\ \\text{km/s})' : VEL[o] + '\\ \\text{km/s}'} = ${VEL[j] - VEL[o]}\\ \\text{km/s}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
