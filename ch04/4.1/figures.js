/* Figures for section 4.1 Development of Force Concept. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, headline, hbracket, spring, fixed } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const RAD = Math.PI / 180;

/* ---------- sprites ---------- */
/* the hook of a spring scale, hanging off the rod that ends at (x, y) */
function hook(ctx, x, y, color) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 5; ctx.beginPath();
  ctx.arc(x + 22, y, 22, Math.PI, Math.PI * 0.35); ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 4.3: two ice skaters push on a third. Three views of the same
   two pushes at one scale: who pushes where, seen from above; the pushes
   laid head to tail with the total force closing the triangle; and the
   free-body diagram, the third skater a point with only the two outside
   forces on her. The angle runs from pushing the same way (the strengths
   add) through the book's right angle to pushing against each other (they
   subtract). Nothing in the idea has a time in it, so the figure is still.
===================================================================== */
(function () {
  const HH = 560;
  const d = sim('sim-skaters', HH);
  const F1 = ctl(d.controls, { label: '\\kFone', cls: 'force', min: 10, max: 60, step: 1, value: 50, unit: 'N', dec: 0, aria: 'the push of the first skater' });
  const F2 = ctl(d.controls, { label: '\\kFtwo', cls: 'force', min: 10, max: 60, step: 1, value: 40, unit: 'N', dec: 0, aria: 'the push of the second skater' });
  const TH = ctl(d.controls, { label: '\\ktheta', cls: 'angle', min: 0, max: 180, step: 1, value: 90, unit: '°', dec: 0, aria: 'the angle between the two pushes',
    specials: [{ at: 0, label: 'the same way' }, { at: 90, label: 'right angle' }, { at: 180, label: 'opposite ways' }] });
  const ro = F.readout(d);
  /* 3.2 units per newton in all three views: 60 N is 192 units, and two pushes of 60 N the same way span 384 of a 460 wide panel */
  const U = 3.2, S = 1.5, ARM = 100, TOUCH = 24;
  let hits = [];
  F.hover(d.stage, () => hits);
  const at = (o, a, r) => ({ x: o.x + r * Math.cos(a), y: o.y - r * Math.sin(a) });   /* a is measured counterclockwise, as the book's angles are */
  const box = (p, r) => ({ l: p.x - r, r: p.x + r, t: p.y - r, b: p.y + r });
  function draw() {
    const { ctx } = begin(d.c);
    const th = TH.v * RAD, fx = F1.v + F2.v * Math.cos(th), fy = F2.v * Math.sin(th);
    const tot = Math.hypot(fx, fy), none = tot < 0.05, ang = none ? 0 : Math.atan2(fy, fx);
    const near = Math.max(0, 1 - Math.sin(th) / 0.26);          /* 1 where the pushes lie along one line, 0 beyond 15° from it */
    const lines = headline(ctx, none
      ? 'Two pushes of ' + fmt(F1.v, 0) + ' N in opposite directions cancel, and the total force is zero'
      : 'A push of ' + fmt(F1.v, 0) + ' N and a push of ' + fmt(F2.v, 0) + ' N, ' + fmt(TH.v, 0)
        + '° apart, add to a total force of ' + fmt(tot, 1) + ' N' + (TH.v > 0 && TH.v < 180 ? ' at ' + fmt(ang / RAD, 1) + '° from the first push' : ''));
    const lab = F.labeller(ctx, HH, { headline: lines });
    line(ctx, 470, 150, 470, 530, PAL.rule, 1.5); line(ctx, 920, 150, 920, 530, PAL.rule, 1.5);
    lab.place({ l: 0, t: 104, r: 1400, b: 132 });
    text(ctx, '(a) seen from above', 235, 118, PAL.muted, { size: 17, align: 'center' });
    text(ctx, '(a) the pushes added head to tail', 695, 118, PAL.muted, { size: 17, align: 'center' });
    text(ctx, '(b) free-body diagram of the third skater', 1160, 118, PAL.muted, { size: 17, align: 'center' });
    /* arrows and dashed lines join the collision set as a run of points, so no label lands on one */
    const keep = (p, q) => { const n = Math.ceil(Math.hypot(q.x - p.x, q.y - p.y) / 20); for (let k = 0; k <= n; k++) lab.place(box({ x: p.x + (q.x - p.x) * k / n, y: p.y + (q.y - p.y) * k / n }, 3)); };
    const vec = (p, q, w) => { keep(p, q); arrow(ctx, p.x, p.y, q.x, q.y, C('force'), w || 5); };

    /* ---- seen from above: each pusher behind the third skater on the line of its push, hands on her,
       the push drawn along its arms and ending where the hands touch; pushers that push nearly the
       same way stand side by side ---- */
    const o = { x: 235, y: 320 - 30 * Math.max(0, Math.cos(th)) };
    const pusher = (a, side, f, color, name) => {
      const u = { x: Math.cos(a), y: -Math.sin(a) }, n = { x: -Math.sin(a), y: -Math.cos(a) }, off = 44 * Math.max(0, Math.cos(th)) * side;
      const base = { x: o.x + n.x * off, y: o.y + n.y * off }, c = { x: base.x - u.x * ARM, y: base.y - u.y * ARM };
      const touch = { x: base.x - u.x * TOUCH, y: base.y - u.y * TOUCH };
      /* the push is drawn beside its skater, on the side away from the other one, level with the hands */
      const head = { x: touch.x + n.x * 52 * side, y: touch.y + n.y * 52 * side }, tail = { x: head.x - u.x * f * U, y: head.y - u.y * f * U };
      F.personTop(ctx, c.x, c.y, S, -a, color, [{ x: touch.x - n.x * 15, y: touch.y - n.y * 15 }, { x: touch.x + n.x * 15, y: touch.y + n.y * 15 }]);
      lab.place(box(c, 38));
      return { c, head, tail, u, n: { x: n.x * side, y: n.y * side } };
    };
    const p1 = pusher(0, 1, F1.v, F.ref('skater-1')), p2 = pusher(th, -1, F2.v, F.ref('skater-2'));
    F.personTop(ctx, o.x, o.y, S, -ang, F.ref('skater-3'));
    lab.place(box(o, 38));
    vec(p1.tail, p1.head); vec(p2.tail, p2.head);
    const name = (t, p, ux, uy, gap) => text(ctx, t, p.x + ux * gap, p.y + uy * gap, C('force'), { size: 22, weight: 600, align: 'center', bg: PAL.panel });
    const mid = (p, q) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
    name('F₁', mid(p1.tail, p1.head), p1.n.x, p1.n.y, 24); name('F₂', mid(p2.tail, p2.head), p2.n.x, p2.n.y, 26);
    hits = [{ ...p1.c, r: 40, name: 'the first skater' }, { ...p2.c, r: 40, name: 'the second skater' }, { ...o, r: 40, name: 'the third skater' }];

    /* ---- head to tail: F₁, then F₂ from its head, and the total force from the first tail to the last head.
       Where the three lie along one line the total is set just below the others so each stays in sight ---- */
    const xmin = Math.min(0, fx), xmax = Math.max(F1.v, fx);
    const A = { x: 695 - U * (xmin + xmax) / 2, y: 440 };
    const B = at(A, 0, F1.v * U), Cc = at(A, ang, tot * U), up = Math.cos(th) < 0 ? 12 * near : 0, dn = 12 * near;
    vec(A, B); vec({ x: B.x, y: B.y - up }, { x: Cc.x, y: Cc.y - up });
    if (!none) vec({ x: A.x, y: A.y + dn }, { x: Cc.x, y: Cc.y + dn }, 7);
    /* each name outside the triangle beside its own arrow; along one line, F₁ and F₂ above and the total below */
    const m1 = mid(A, B), m2 = mid(B, Cc), mt = mid(A, Cc), flat = near > 0, back = Math.cos(th) < 0;
    if (flat && back) name('F₁', B, 1, 0, 26); else name('F₁', m1, 0, flat ? -1 : 1, 26);
    name('F₂', { x: m2.x, y: m2.y - up }, flat ? 0 : Math.sin(th), flat ? -1 : Math.cos(th), 28);
    name(none ? 'F_tot = 0' : 'F_tot', { x: mt.x, y: mt.y + dn }, flat ? 0 : -Math.sin(ang), flat ? 1 : -Math.cos(ang), 32);
    hits.push({ ...mt, r: 26, name: 'the total force, from the tail of the first push to the head of the second' });

    /* ---- the free-body diagram: the body as a single point, only the outside forces on it ---- */
    const b = { x: 1160, y: 440 }, sh = Math.cos(th) > 0 ? 9 * near : 0;
    const b1 = { x: b.x, y: b.y - sh }, b2 = { x: b.x, y: b.y + sh };
    const e1 = at(b1, 0, F1.v * U), e2 = at(b2, th, F2.v * U);
    if (TH.v >= 25) F.angleArc(ctx, b, Math.min(54, 0.5 * Math.min(F1.v, F2.v) * U), 0, th, 'θ', lab, C('angle'));
    vec(b1, e1); vec(b2, e2);
    dot(ctx, b.x, b.y, F.ref('skater-3'), true, 12);
    lab.place(box(b, 16));
    name('F₁', { x: e1.x, y: e1.y - sh }, 1, 0, 24);
    name('F₂', { x: e2.x, y: e2.y + sh }, Math.cos(th), -Math.sin(th), 24);
    hits.push({ ...b, r: 20, name: 'the third skater, as a single point' });
    const missed = lab.flush();
    if (missed.length) d.fig.dataset.missed = missed.join('|'); else delete d.fig.dataset.missed;

    const right = Math.abs(TH.v - 90) < 1e-9;
    ro.set(`\\mk{t}{\\kFtot} = \\sqrt{\\mk{x}{${right ? '\\kFone' : '\\kFx'}}^2 + \\mk{y}{${right ? '\\kFtwo' : '\\kFy'}}^2} = \\sqrt{(\\mk{nx}{${fmt(fx, 1)}}\\ \\text{N})^2 + (\\mk{ny}{${fmt(fy, 1)}}\\ \\text{N})^2} = \\mk{nt}{${fmt(tot, 1)}}\\ \\text{N}`, undefined, { form: right });
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 4.4: the stretched spring as a standard of force. (a) the
   spring relaxed, (b) the same spring pulled out by Δx with its restoring
   force drawn back toward the fixed end, (c) a spring scale. All three
   share one scale of 40 units per centimeter, and the zero of the scale's
   face stands under the relaxed end of the spring, so the pointer of (c)
   stands under the pulled end of (b): the reading is the stretch counted
   in standard stretches of 1 cm. Still: a stretch answers a slider.
===================================================================== */
(function () {
  const HH = 670;
  const d = sim('sim-spring', HH);
  const DX = ctl(d.controls, { label: '\\kdx', cls: 'position', min: 0, max: 9, step: 0.5, value: 6, unit: 'cm', dec: 1, aria: 'the distance the spring is stretched',
    specials: [{ at: 1, label: 'the standard stretch' }] });
  const SC = 40, XL = 11;                         /* units per centimeter; the relaxed length in cm, as long against the stretch as the book draws it */
  const WALL = 100, X0 = 110, REST = X0 + XL * SC, ROD = 404;
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const r = DX.v, pulled = REST + r * SC, col = F.ref('spring'), al = r > 0 ? 30 + 22 * r : 0;
    headline(ctx, r < 0.01
      ? 'At its relaxed length the spring exerts no restoring force, and the scale reads 0'
      : 'A stretch of ' + fmt(r, 1) + ' cm is ' + fmt(r, 1) + ' standard stretches of 1 cm, so the restoring force is ' + fmt(r, 1) + (r === 1 ? ' unit' : ' units'));

    /* ---- (a) the spring at its undistorted length ---- */
    text(ctx, '(a) the spring at its relaxed length', WALL - 40, 112, PAL.muted, { size: 17 });
    fixed(ctx, WALL - 40, 133, 40, 64);
    spring(ctx, X0 - 10, 165, REST, 165, 8, 20, col, 4);
    line(ctx, REST, 141, REST, 189, col, 5);
    hbracket(ctx, X0, REST, 212, C('position'), 'x', { side: 'below' });

    /* ---- (b) the spring stretched, and the restoring force it exerts ---- */
    text(ctx, '(b) the same spring, pulled out a distance Δx', WALL - 40, 272, PAL.muted, { size: 17 });
    fixed(ctx, WALL - 40, 313, 40, 64);
    spring(ctx, X0 - 10, 345, pulled, 345, 8, 20, col, 4);
    line(ctx, pulled, 321, pulled, 369, col, 5);
    F.hand(ctx, pulled + 78, 345, { aim: [-1, 0], view: 'back', curl: 0.85, thumb: 'along', s: 0.85 });
    hbracket(ctx, X0, REST, 396, C('position'), 'x', { side: 'below' });
    if (r > 0) {
      arrow(ctx, pulled, 304, pulled - al, 304, C('force'), 5);
      text(ctx, 'F_restore', pulled - al - 14, 304, C('force'), { weight: 600, size: 22, align: 'right', bg: PAL.panel });
      hbracket(ctx, REST, pulled, 396, C('position'), 'Δx = ' + fmt(r, 1) + ' cm', { side: 'below' });
    }

    /* ---- (c) the spring scale: its zero under the relaxed end, its pointer under the pulled end ---- */
    text(ctx, '(c) a spring scale, marked in standard units', WALL - 40, 468, PAL.muted, { size: 17 });
    const FX = (u) => REST + u * SC, ay = 555;
    line(ctx, REST, 200, REST, 496, alpha(PAL.ink, 0.35), 2, [4, 8]);
    if (r > 0) line(ctx, pulled, 380, pulled, 496, alpha(C('position'), 0.6), 2, [4, 8]);
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.fillRect(FX(0) - 100, 490, FX(9) + 30 - (FX(0) - 100), 110); ctx.strokeRect(FX(0) - 100, 490, FX(9) + 30 - (FX(0) - 100), 110);
    ctx.fillStyle = PAL.panel; ctx.lineWidth = 2; ctx.fillRect(FX(0) - 76, ay - 20, FX(9) + 16 - (FX(0) - 76), 40); ctx.strokeRect(FX(0) - 76, ay - 20, FX(9) + 16 - (FX(0) - 76), 40);
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(FX(0) - 124, 545, 20, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    for (let u = 0; u <= 9; u++) { line(ctx, FX(u), 522, FX(u), 534, PAL.muted, 2); text(ctx, String(u), FX(u), 508, PAL.muted, { size: 17, align: 'center' }); }
    spring(ctx, FX(0) - 76, ay, FX(r) - 3, ay, 5, 12, col, 3);
    line(ctx, FX(r), ay, FX(r) + ROD, ay, PAL.ink, 5);
    hook(ctx, FX(r) + ROD, ay, PAL.ink);
    line(ctx, FX(r), 518, FX(r), ay + 20, C('force'), 6);
    if (r > 0) {
      const tail = FX(r) + ROD - 4;
      arrow(ctx, tail, 586, tail - al, 586, C('force'), 5);
      text(ctx, 'F_restore', Math.min(tail - al / 2, 1330), 614, C('force'), { weight: 600, size: 22, align: 'center' });
      hbracket(ctx, FX(0), FX(r), 624, C('position'), 'Δx', { side: 'below', H: HH });
    }
    hits = [{ x: WALL - 20, y: 165, r: 40, name: 'the fixed support' }, { x: WALL - 20, y: 345, r: 40, name: 'the fixed support' },
      { x: (X0 + REST) / 2, y: 165, r: 40, name: 'the spring, relaxed' }, { x: (X0 + pulled) / 2, y: 345, r: 40, name: 'the spring, stretched' },
      { x: pulled + 78, y: 345, r: 50, name: 'the hand that holds the spring stretched' },
      { x: FX(r), y: 530, r: 16, name: 'the pointer, fixed to the end of the spring inside the scale' },
      { x: FX(r) + ROD + 22, y: ay, r: 30, name: 'the hook: the restoring force acts on whatever hangs here' },
      { x: FX(0) - 124, y: 545, r: 24, name: 'the ring the scale is held by' }];
    readout(d.readout, `\\kFres = \\frac{\\kdx}{\\htmlClass{kv-position}{\\Delta x_{\\text{std}}}}\\,\\htmlClass{kv-force}{F_{\\text{std}}} = \\frac{${fmt(r, 1)}\\ \\text{cm}}{1.0\\ \\text{cm}}\\,\\htmlClass{kv-force}{F_{\\text{std}}} = ${fmt(r, 1)}\\,\\htmlClass{kv-force}{F_{\\text{std}}}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
