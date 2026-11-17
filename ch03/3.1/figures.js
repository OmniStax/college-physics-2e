/* Figures for section 3.1 Kinematics in Two Dimensions: An Introduction. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['3.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, hbracket, vbracket, axes, curve, fixed, labeller } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const G = 9.80;

/* =====================================================================
   FIGURE 3.3 + 3.4 + 3.5: the walk in the city. The whole city is drawn,
   12 blocks by 8, and the destination is a street corner the reader drags.
   A pedestrian walks east and then north while a helicopter flies the
   diagonal at the same speed; the three vectors are arrows with a hash
   mark per block, and two bars beside the map count the blocks each has
   travelled, so the shorter straight line is seen as well as computed.
   Fixed scale: 60 units to a block, the city anchored at the start.
===================================================================== */
(function () {
  const d = sim('sim-walk', 710);
  const E = ctl(d.controls, { label: '\\text{blocks east}', cls: 'position', min: 2, max: 12, step: 1, value: 9, unit: 'blocks', dec: 0, onInput: reset, aria: 'blocks east' });
  const N = ctl(d.controls, { label: '\\text{blocks north}', cls: 'position', min: 2, max: 8, step: 1, value: 5, unit: 'blocks', dec: 0, onInput: reset, aria: 'blocks north' });
  const P = F.drag(d, { x: E, y: N });
  /* model time counts blocks travelled: the walker and the helicopter each cover one block per unit of it */
  const total = () => E.v + N.v;
  const cy = cycle(total, 1.2);
  function reset() { cy.reset(); }
  const s = 60, x0 = 140, yb = 624, NE = 12, NN = 8;
  const city = { X: (v) => x0 + v * s, Y: (v) => yb - v * s, box: { l: x0, r: x0 + NE * s, t: yb - NN * s, b: yb }, xr: [0, NE], yr: [0, NN] };
  /* the bars: blocks travelled, 0 to 25 (the longest walk is 12 + 8, and its total stands above the bar) */
  const bars = { l: 1170, r: 1360, t: 170, b: 600 };
  function draw() {
    const { ctx } = begin(d.c);
    const e = E.v, n = N.v, c = Math.hypot(e, n), theta = Math.atan2(n, e), tau = cy.now(), done = tau >= total() - 1e-9;
    const yt = yb - n * s, xr = x0 + e * s, gap = 10, pc = C('position'), cw = F.ref('walker'), ch = F.ref('helicopter');
    const lab = labeller(ctx, 710); lab.block(0, 0, 1400, 96);
    /* the city: every block, with a building or two on some, and the right triangle the three vectors form */
    ctx.save();
    for (let i = 0; i < NE; i++) for (let j = 0; j < NN; j++) {
      const bx = x0 + i * s + gap / 2, by = yb - (j + 1) * s + gap / 2, w = s - gap, h = (i * 7 + j * 13 + i * j * 5) % 11;
      ctx.fillStyle = PAL.soft; ctx.fillRect(bx, by, w, w);
      ctx.fillStyle = alpha(PAL.muted, 0.22);
      if (h < 3) ctx.fillRect(bx + 6, by + 6, 20, 14 + 4 * h);
      if (h === 2 || h === 5 || h === 8) ctx.fillRect(bx + w - 26, by + w - 22, 20, 16);
      if (h === 6 || h === 9) ctx.fillRect(bx + 8, by + w - 20, 30, 12);
    }
    ctx.fillStyle = alpha(pc, 0.12); ctx.beginPath(); ctx.moveTo(x0, yb); ctx.lineTo(xr, yb); ctx.lineTo(xr, yt); ctx.closePath(); ctx.fill();
    ctx.restore();
    /* street numbers along the south and west edges, as the book's x and y */
    for (let i = 0; i <= NE; i++) text(ctx, String(i), x0 + i * s, yb + 28, PAL.muted, { size: 17, align: 'center' });
    for (let j = 1; j <= NN; j++) text(ctx, String(j), x0 - 22, yb - j * s, PAL.muted, { size: 17, align: 'right' });
    /* the right angle between the two legs, and the angle of the straight-line path above east */
    if (e > 1 && n > 1) { line(ctx, xr - 16, yb, xr - 16, yb - 16, PAL.muted, 2); line(ctx, xr - 16, yb - 16, xr, yb - 16, PAL.muted, 2); }
    const ra = Math.min(84, e * s * 0.45);
    ctx.save(); ctx.strokeStyle = C('angle'); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x0, yb, ra, -theta, 0); ctx.stroke(); ctx.restore();
    lab.add('θ = ' + fmt(theta * 180 / Math.PI, 1) + '°', x0 + ra * Math.cos(theta / 2), yb - ra * Math.sin(theta / 2), Math.cos(theta / 2), -Math.sin(theta / 2), C('angle'), 20, 26);
    /* the three vectors: east, north and the straight-line path, each with a hash mark per block */
    arrow(ctx, x0, yb, xr, yb, pc, 5); arrow(ctx, xr, yb, xr, yt, pc, 5); arrow(ctx, x0, yb, xr, yt, pc, 5);
    for (let i = 1; i < e; i++) line(ctx, x0 + i * s, yb - 9, x0 + i * s, yb + 9, pc, 3);
    for (let j = 1; j < n; j++) line(ctx, xr - 9, yb - j * s, xr + 9, yb - j * s, pc, 3);
    const ux = Math.cos(theta), uy = -Math.sin(theta);
    for (let k = 1; k < c - 0.25; k++) { const px = x0 + k * s * ux, py = yb + k * s * uy; line(ctx, px + 9 * uy, py - 9 * ux, px - 9 * uy, py + 9 * ux, pc, 3); }
    /* the three sides carry the letters of the theorem */
    text(ctx, 'a = ' + e + (e === 1 ? ' block east' : ' blocks east'), (x0 + xr) / 2, yb + 62, pc, { weight: 600, align: 'center' });
    lab.add('b = ' + n + (n === 1 ? ' block north' : ' blocks north'), xr, (yb + yt) / 2, 1, 0, pc, 22, 22);
    lab.add('start', x0, yb, -1, 0.6, PAL.muted, 18, 30);
    lab.add('destination', xr, yt, 1, -0.5, PAL.muted, 18, 30);
    { /* c stands above the diagonal, kept inside the city where the triangle is small */
      const cs = 'c = ' + fmt(c, 1) + ' blocks', hw = F.measure(ctx, cs, { size: 22, weight: 600 }) / 2;
      const mx = x0 + 0.6 * (xr - x0) + 50 * uy, my = yb + 0.6 * (yt - yb) - 50 * ux;
      const lx = Math.max(mx, x0 + hw + 8); lab.place({ l: lx - hw - 6, r: lx + hw + 6, t: my - 17, b: my + 17 });
      text(ctx, cs, lx, my, pc, { size: 22, weight: 600, align: 'center', bg: PAL.panel });
    }
    /* the corner the reader drags */
    P.draw(ctx, city, pc);
    /* the walker on the streets and the helicopter on the diagonal, one block per unit of model time */
    const wx = tau <= e ? x0 + tau * s : xr, wy = tau <= e ? yb : yb - (tau - e) * s;
    const hf = Math.min(tau, c) / c, hx = x0 + (xr - x0) * hf, hy = yb + (yt - yb) * hf;
    F.personTop(ctx, wx, wy, 1, tau > e ? -Math.PI / 2 : 0, cw);
    F.helicopterTop(ctx, hx, hy, 0.8, theta, cy.tau * 2.4, ch);
    lab.flush();
    /* the compass of the book's map */
    const kx = 1010, ky = 262;
    arrow(ctx, kx, ky + 40, kx, ky - 44, PAL.muted, 3); line(ctx, kx - 36, ky, kx + 36, ky, PAL.muted, 2);
    text(ctx, 'N', kx, ky - 60, PAL.muted, { size: 18, align: 'center' }); text(ctx, 'E', kx + 50, ky, PAL.muted, { size: 18, align: 'center' });
    text(ctx, 'S', kx, ky + 56, PAL.muted, { size: 18, align: 'center' }); text(ctx, 'W', kx - 52, ky, PAL.muted, { size: 18, align: 'center' });
    /* the two distances as bars on one scale: the whole of each faint, the part travelled solid */
    const gone = Math.min(tau, total()), flown = Math.min(tau, c);
    const ax = axes(ctx, bars, [0, 1], [0, 25], { yl: 'blocks', yc: pc, nx: 0, ny: 5, fy: (v) => fmt(v, 0) });
    const bw = 58, b1 = 1220, b2 = 1316, Yb = (v) => ax.Y(v);
    ctx.save();
    ctx.fillStyle = alpha(pc, 0.16); ctx.fillRect(b1 - bw / 2, Yb(total()), bw, Yb(0) - Yb(total())); ctx.fillRect(b2 - bw / 2, Yb(c), bw, Yb(0) - Yb(c));
    ctx.fillStyle = pc; ctx.fillRect(b1 - bw / 2, Yb(gone), bw, Yb(0) - Yb(gone)); ctx.fillRect(b2 - bw / 2, Yb(flown), bw, Yb(0) - Yb(flown));
    ctx.restore();
    line(ctx, b1 - bw / 2 - 5, Yb(e), b1 + bw / 2 + 5, Yb(e), PAL.panel, 3);   /* where the walker turns north */
    text(ctx, e + ' + ' + n + ' = ' + total(), b1, Yb(total()) - 18, pc, { size: 19, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, fmt(c, 1), b2, Yb(c) - 18, pc, { size: 19, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, 'walked', b1, bars.b + 26, cw, { size: 19, weight: 600, align: 'center' });
    text(ctx, 'flown', b2, bars.b + 26, ch, { size: 19, weight: 600, align: 'center' });
    topline(ctx, done ? 'The walk is ' + total() + ' blocks and the straight line ' + fmt(c, 1) + ' blocks, ' + fmt(total() - c, 1) + ' blocks shorter.'
      : tau >= c ? 'The helicopter has arrived after ' + fmt(c, 1) + ' blocks, and the walker still has ' + fmt(total() - gone, 1) + ' blocks to go.'
      : 'The walker has gone ' + fmt(gone, 1) + ' of ' + total() + ' blocks, and the helicopter ' + fmt(flown, 1) + ' of ' + fmt(c, 1) + '.');
    const bl = (k) => k + (k === 1 ? '\\ \\text{block}' : '\\ \\text{blocks}');
    readout(d.readout, `c = \\sqrt{a^2 + b^2} = \\sqrt{(${bl(e)})^2 + (${bl(n)})^2} = ${fmt(c, 1)}\\ \\text{blocks}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => total() / 5), draw });
})();


/* =====================================================================
   FIGURE 3.6: the two balls under the strobe. One is dropped and one is
   thrown horizontally from the same point at the same instant. Each flash
   leaves a copy of both with their velocity arrows, as the book draws
   them. A level line carries each pair to a height ruler on the left and
   a drop line carries the thrown ball to a distance ruler on the ground,
   so the motion is seen resolved: the marks on the height ruler are the
   dropped ball's, whatever the throw, and the marks on the ground are
   evenly spaced.
   Fixed scale: 340 units to the metre holds the 1.5 m drop and the
   2.49 m the fastest throw (4.5 m/s) carries in its 0.553 s; velocity
   arrows are 16 units per m/s, the longest (5.42 m/s) 87 units, shorter
   than the gap to the next copy at every flash interval offered.
===================================================================== */
(function () {
  const d = sim('sim-two-balls', 800);
  const V = ctl(d.controls, { label: '\\kvox', cls: 'velocity', min: 0.5, max: 4.5, step: 0.1, value: 3, unit: 'm/s', dec: 1, onInput: reset, aria: 'initial horizontal velocity of the thrown ball' });
  const DT = ctl(d.controls, { label: '\\kdt', cls: 'time', min: 0.08, max: 0.2, step: 0.01, value: 0.1, unit: 's', dec: 2, onInput: reset, aria: 'time between flashes' });
  const Y0 = 1.5, TF = Math.sqrt((2 * Y0) / G);
  const cy = cycle(() => TF, 1.2);
  function reset() { cy.reset(); }
  const yOf = (t) => Math.max(0, Y0 - 0.5 * G * t * t);
  const SC = 340, AS = 16, yg = 690, xL = 300, xR = 110;
  const X = (m) => xL + m * SC, Y = (m) => yg - m * SC;
  function draw() {
    const { ctx } = begin(d.c);
    const tau = cy.now(), done = tau >= TF - 1e-9, xnow = V.v * tau, ynow = yOf(tau);
    const flashes = []; for (let k = 1; k * DT.v <= TF + 1e-9; k++) flashes.push(k * DT.v);
    const shown = flashes.filter((t) => t <= tau + 1e-9);
    const pc = C('position'), vc = C('velocity'), cd = F.ref('dropped-ball'), ct = F.ref('thrown-ball'), guide = alpha(PAL.ink, 0.35);
    /* the ground with its distance ruler, and the height ruler on the left */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(xR - 40, yg, 1400 - xR, 10); ctx.restore();
    line(ctx, xR - 40, yg, 1360, yg, PAL.muted, 3);
    for (let m = 0; m <= 3 + 1e-9; m += 0.5) { line(ctx, X(m), yg, X(m), yg + 12, PAL.muted, 2); text(ctx, m === 0 ? '0' : fmt(m, 1) + ' m', X(m), yg + 32, PAL.muted, { size: 17, align: 'center' }); }
    line(ctx, xR, Y(Y0), xR, yg, PAL.muted, 3);
    for (let m = 0.5; m <= Y0 + 1e-9; m += 0.5) { line(ctx, xR - 12, Y(m), xR, Y(m), PAL.muted, 2); text(ctx, fmt(m, 1) + ' m', xR - 20, Y(m), PAL.muted, { size: 17, align: 'right' }); }
    /* the path of the thrown ball so far */
    ctx.save(); ctx.strokeStyle = alpha(ct, 0.45); ctx.lineWidth = 2.5; ctx.beginPath();
    for (let i = 0; i <= 60; i++) { const t = (tau * i) / 60; ctx[i ? 'lineTo' : 'moveTo'](X(V.v * t), Y(yOf(t))); }
    ctx.stroke(); ctx.restore();
    /* one pair of balls at time t: a level line to the height ruler, a drop line to the ground, the velocity arrows */
    function pair(t, ghost) {
      const yd = Y(yOf(t)), xd = X(0), xt = X(V.v * t), vy = G * t;
      const arr = ghost ? alpha(vc, 0.6) : vc, w = ghost ? 3 : 4;
      line(ctx, xR, yd, xt, yd, guide, 2, [6, 8]);
      if (yg - yd > 16) line(ctx, xt, yd, xt, yg, guide, 2, [4, 8]);
      dot(ctx, xR, yd, pc, true, ghost ? 6 : 8); dot(ctx, xt, yg, pc, true, ghost ? 6 : 8);
      if (ghost || !done) {
        if (vy * AS > 8) { arrow(ctx, xd, yd + 12, xd, yd + 12 + vy * AS, arr, w); arrow(ctx, xt, yd + 12, xt, yd + 12 + vy * AS, arr, w); }
        arrow(ctx, xt + 12, yd, xt + 12 + V.v * AS, yd, arr, w);
      }
      dot(ctx, xd, yd, ghost ? alpha(cd, 0.5) : cd, true, ghost ? 9 : 11); dot(ctx, xt, yd, ghost ? alpha(ct, 0.5) : ct, true, ghost ? 9 : 11);
      return { xd, xt, yd, vy };
    }
    shown.forEach((t) => pair(t, true));
    dot(ctx, X(0), Y(Y0), PAL.muted, false, 11);   /* where both are let go: hollow, the start */
    const now = pair(Math.min(tau, TF), false);
    text(ctx, 'both released here', X(0) + 4, Y(Y0) - 30, PAL.muted, { size: 18, align: 'center' });
    if (!done) {
      /* the live velocities, named on both balls so the equal vertical ones are read side by side */
      const len = now.vy * AS, ly = now.yd + Math.max(32, 12 + len / 2);
      text(ctx, 'v_x = ' + fmt(V.v, 1) + ' m/s', now.xt + 22 + V.v * AS, now.yd, vc, { weight: 600, size: 19, align: 'left', bg: PAL.panel });
      if (len > 8) {
        text(ctx, 'v_y = ' + fmt(now.vy, 2) + ' m/s', now.xt + 16, ly, vc, { weight: 600, size: 19, align: 'left', bg: PAL.panel });
        text(ctx, 'v_y = ' + fmt(now.vy, 2) + ' m/s', now.xd - 16, ly, vc, { weight: 600, size: 19, align: 'right', bg: PAL.panel });
      }
    }
    F.legend(ctx, { l: 0, r: 1380, t: 104, b: 800 }, [{ s: 'dropped ball', kind: 'dot', color: cd }, { s: 'thrown ball', kind: 'dot', color: ct }, { s: 'horizontal and vertical velocities', color: vc, w: 4 }, { s: 'height and distance at a flash', kind: 'dot', color: pc }], { corner: 'tr', size: 18 });
    topline(ctx, done ? 'Both balls land after ' + fmt(TF, 2) + ' s, the thrown ball ' + fmt(V.v * TF, 2) + ' m from the dropped one.'
      : 'After ' + fmt(tau, 2) + ' s both balls are ' + fmt(ynow, 2) + ' m above the ground, and the thrown ball is ' + fmt(xnow, 2) + ' m to the side.');
    const ts = fmt(Math.min(tau, TF), 2);
    readout(d.readout, `\\text{both balls: }\\ \\ky = \\kyo - \\tfrac{1}{2}\\kg\\kt^2 = ${fmt(Y0, 2)}\\ \\text{m} - \\tfrac{1}{2}(9.80\\ \\text{m/s}^2)(${ts}\\ \\text{s})^2 = ${fmt(ynow, 2)}\\ \\text{m} \\\\ \\text{thrown ball: }\\ \\kx = \\kvox\\kt = (${fmt(V.v, 1)}\\ \\text{m/s})(${ts}\\ \\text{s}) = ${fmt(xnow, 2)}\\ \\text{m}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => TF / 5), draw });
})();
};
