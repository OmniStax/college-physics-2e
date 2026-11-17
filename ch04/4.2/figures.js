/* Figures for section 4.2 Newton's First Law of Motion: Inertia. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.2'] = function (root, F) {
const { fmt, C, PAL, ctl, cycle, register, begin, line, arrow, dot, text, headline, scale, axes, curve, block, hover, alpha } = F;
const sim = (id, H) => F.sim(root, id, H);

/* =====================================================================
   SIM: the same push on smoother and smoother surfaces. Four lanes, one
   block each, all pushed off at the same speed at the same moment: a
   rough surface, one dusted with talcum powder, one rubbed with
   lubricating oil, and a last one whose slowing the reader sets, which
   opens at zero (the frictionless surface of the text). Each of the
   book's three surfaces slows the block half as much as the one before
   (4, 2 and 1 m/s²), so each stopping distance v₀²/2a is twice the last;
   the fourth block leaves the 60 m drawn. A dot is left where each block
   was at every whole second, and the graph below draws the four speeds
   against the same clock: three lines tilt down to zero and the
   frictionless one lies flat, which is Newton's first law.
   Fixed frames: 60 m of surface (the oil lane's longest slide is
   10²/(2·1) = 50 m), a clock of 12 s (the oil block's longest slide lasts
   10/1 = 10 s, and the slowest frictionless block needs 60/5 = 12 s to
   cross), and a speed axis of 0 to 12 m/s for a slider that reaches 10.
===================================================================== */
(function () {
  const d = sim('sim-frictionless', 830);
  const V = ctl(d.controls, { label: '\\kvo', cls: 'velocity', min: 5, max: 10, step: 0.5, value: 8, unit: 'm/s', dec: 1, onInput: reset, aria: 'the speed every block starts with' });
  const A = ctl(d.controls, { label: '\\ka', cls: 'acceleration', min: 0, max: 0.9, step: 0.1, value: 0, unit: 'm/s²', dec: 1, onInput: reset, aria: 'the rate at which the fourth surface slows its block',
    specials: [{ at: 0, label: 'frictionless' }] });
  const ro = F.readout(d);
  const TRACK = 60, TEND = 12;
  const SL = 250, SR = 1330, X = (s) => SL + ((SR - SL) * s) / TRACK;
  const Y0 = 100, LANE = 88, BW = 48, BH = 40;
  const GB = { l: SL, r: SR, t: 566, b: 756 };
  const lanes = () => [
    { name: 'rough', a: 4 }, { name: 'talcum powder', a: 2 }, { name: 'lubricating oil', a: 1 },
    { name: A.v === 0 ? 'frictionless' : 'smoother still', a: A.v },
  ];
  const cy = cycle(() => TEND, 1.2);
  function reset() { cy.reset(); }
  const pos = (v0, a, t) => { const q = a > 0 ? Math.min(t, v0 / a) : t; return v0 * q - 0.5 * a * q * q; };
  const vel = (v0, a, t) => Math.max(0, v0 - a * t);
  const dist = (m) => fmt(m, m >= 100 ? 0 : 1) + ' m';
  /* the top of each surface, drawn as what it is: grit, a dusting of powder, a film of oil, or nothing at all */
  function surface(ctx, i, a, y) {
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(SL - 30, y, SR - SL + 60, 12); ctx.restore();
    if (i === 0) { for (let x = SL - 30; x < SR + 30; x += 12) { line(ctx, x, y, x + 6, y - 5, PAL.muted, 2); line(ctx, x + 6, y - 5, x + 12, y, PAL.muted, 2); } }
    else if (i === 1) { line(ctx, SL - 30, y, SR + 30, y, PAL.muted, 2); for (let x = SL - 26; x < SR + 30; x += 9) dot(ctx, x, y - 3, PAL.muted, true, 2); }
    else if (i === 2) { line(ctx, SL - 30, y, SR + 30, y, PAL.muted, 2); line(ctx, SL - 30, y - 4, SR + 30, y - 4, alpha(PAL.muted, 0.5), 3); }
    else line(ctx, SL - 30, y, SR + 30, y, PAL.muted, 2);
  }
  function draw() {
    const { ctx } = begin(d.c);
    const v0 = V.v, t = Math.min(cy.now(), TEND), L = lanes();
    L.forEach((ln, i) => {
      const col = F.cat(i), top = Y0 + i * LANE, yB = top + BH / 2, yS = top + BH, yT = yS + 32;
      const ds = ln.a > 0 ? (v0 * v0) / (2 * ln.a) : Infinity, s = pos(v0, ln.a, t), v = vel(v0, ln.a, t);
      /* the lane's name and its slowing, left of the surface */
      text(ctx, ln.name, 24, yB - 6, col, { size: 21, weight: 600, align: 'left' });
      text(ctx, 'a = ' + fmt(ln.a, 1) + ' m/s²', 24, yB + 22, C('acceleration'), { size: 17, weight: 600, align: 'left' });
      surface(ctx, i, ln.a, yS);
      line(ctx, X(0), yS + 12, X(0), yS + 22, PAL.muted, 2);
      /* where the block was at each whole second */
      for (let k = 1; k <= Math.floor(t + 1e-9); k += 1) { const sk = pos(v0, ln.a, k); if (sk <= TRACK && (ln.a === 0 || k <= v0 / ln.a + 1e-9)) dot(ctx, X(sk), yS + 6, C('position'), true, 5); }
      /* where it stops, known from the start */
      if (ds <= TRACK) {
        line(ctx, X(ds), yS, X(ds), yS + 20, C('position'), 3);
        F.rich(ctx, ['stops after ', [dist(ds), C('position')]], Math.max(X(ds), SL + 20), yT, { size: 18, align: X(ds) > SR - 120 ? 'right' : 'center' });
      } else {
        F.rich(ctx, ln.a === 0 ? ['never stops'] : ['stops after ', [dist(ds), C('position')], ', past the 60 m drawn'], SR + 30, yT, { size: 18, align: 'right' });
      }
      /* the block and its velocity */
      if (s <= TRACK) {
        block(ctx, X(s), yB, BW, BH, col);
        if (v > 0.05) {
          const nose = X(s) + BW / 2 + 4, tip = nose + v * 9, left = tip + 96 > 1392;
          arrow(ctx, nose, yB, tip, yB, C('velocity'), 4);
          text(ctx, fmt(v, 1) + ' m/s', left ? X(s) - BW / 2 - 10 : tip + 10, yB, C('velocity'), { size: 19, weight: 600, align: left ? 'right' : 'left' });
        }
      } else {
        arrow(ctx, SR - 44, yB, SR + 30, yB, C('velocity'), 4);
        F.rich(ctx, ['left the picture at ', [fmt(v, 1) + ' m/s', C('velocity')]], SR - 54, yB, { size: 19, align: 'right' });
      }
    });
    F.legend(ctx, { l: 900, r: SR + 30, t: Y0 - 34, b: Y0 + 30 }, [{ s: 'the block, each second', color: C('position'), kind: 'dot' }], { corner: 'tr', panel: false, size: 17 });
    scale(ctx, X, 0, TRACK, 10, Y0 + 4 * LANE + 12, 'm', 1);
    /* the four speeds against the one clock */
    const g = axes(ctx, GB, [0, TEND], [0, 12], { xl: 't (s)', xc: C('time'), yl: 'v (m/s)', yc: C('velocity'), nx: 6, ny: 6, fx: (q) => fmt(q, 0), fy: (q) => fmt(q, 0) });
    line(ctx, g.X(t), GB.t, g.X(t), GB.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    L.forEach((ln, i) => {
      curve(ctx, (q) => vel(v0, ln.a, q), 0, TEND, g.X, g.Y, alpha(F.cat(i), 0.3), 3);
      if (t > 0) curve(ctx, (q) => vel(v0, ln.a, q), 0, t, g.X, g.Y, F.cat(i), 5);
    });
    L.forEach((ln, i) => dot(ctx, g.X(t), g.Y(vel(v0, ln.a, t)), F.cat(i), true, 8));
    dot(ctx, g.X(0), g.Y(v0), PAL.ink, false, 10);
    const a4 = L[3].a;
    headline(ctx, a4 === 0 ? 'Halve the slowing and the block slides twice as far; with no slowing it never stops'
      : 'Halve the slowing and the block slides twice as far; at ' + fmt(a4, 1) + ' m/s² it stops after ' + dist((v0 * v0) / (2 * a4)));
    const t4 = a4 > 0 ? Math.min(t, v0 / a4) : t, ts = fmt(t4, 1);
    ro.set(`\\mk{v}{\\kv} = \\mk{v0}{\\kvo} - \\mk{a}{\\ka}\\mk{t}{\\kt} = \\mk{n0}{${fmt(v0, 1)}\\ \\text{m/s}} - \\mk{na}{(${fmt(a4, 1)}\\ \\text{m/s}^2)}\\mk{nt}{(${ts}\\ \\text{s})} = \\mk{nv}{${fmt(Math.max(0, v0 - a4 * +ts), 1)}\\ \\text{m/s}}`);
  }
  hover(d.stage, () => lanes().map((ln, i) => { const s = pos(V.v, ln.a, Math.min(cy.now(), TEND)); return { x: X(Math.min(s, TRACK)), y: Y0 + i * LANE + BH / 2, r: 30, name: 'the block on the ' + (i === 3 ? (ln.a === 0 ? 'frictionless' : 'smoothest') : ['rough', 'powdered', 'oiled'][i]) + ' surface' }; }));
  register(d.fig, { update: (dt) => cy.step(dt, () => TEND / 6), draw });
})();
};
