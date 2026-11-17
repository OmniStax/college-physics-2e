/* Figures for section 4.5 Normal, Tension, and Other Examples of Forces.
   Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.5'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, vbracket, axes, curve, pinned, fixed, labeller, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
/* draws inside the graph box, so a line or curve that runs past a fixed range is cut off at the
   frame instead of the frame being stretched to hold it */
const inbox = (ctx, box, f) => { ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t); ctx.clip(); f(); ctx.restore(); };
const G = 9.80;
const RAD = Math.PI / 180;
const commas = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const num = (v, d) => commas(fmt(v, d));
const deg = (v, d) => fmt(v, d) + '°';

/* labeller() and topline() are the label discipline, promoted into the
   figure library; see figlib.ts for what they guarantee. */

/* ---------- shared drawing ---------- */

/* =====================================================================
   FIGURE 4.11: the normal force. The book's two panels are the two ends
   of one act: a hand holds the bag of dog food (a), lowers it onto the
   table, and lets go (b). As the table sags its push grows and the hand
   carries what is left of the weight, so the two upward forces always
   add up to the weight. The lowering is slow, so the bag is in
   equilibrium throughout. One lowering per loop, on the transport.
===================================================================== */
(function () {
  const H = 730, PERIOD = 6;
  const d = sim('sim-normal', H);
  const M = ctl(d.controls, { label: '\\km', cls: 'mass', min: 1, max: 30, step: 0.5, value: 10, unit: 'kg', dec: 1, onInput: reset, aria: 'mass of the bag' });
  const K = ctl(d.controls, { label: '\\kk', cls: 'stiffness', min: 3000, max: 20000, step: 500, value: 4000, unit: 'N/m', dec: 0, onInput: reset, aria: 'stiffness of the table' });
  const cy = cycle(() => PERIOD, 1.6);
  function reset() { cy.reset(); }
  const unit = (x) => Math.max(0, Math.min(1, x)), smooth = (x) => x * x * (3 - 2 * x);
  const tx = (s) => s.replace(/,/g, '{,}');
  /* the sack standing on (cx, base), 230 wide and 176 tall: a full bag with a gathered neck, its
     base bowed by `bow` at the middle, as the table under it is */
  function bag(ctx, cx, base, color, bow) {
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(cx - 108, base - bow); ctx.quadraticCurveTo(cx, base + bow, cx + 108, base - bow); ctx.lineTo(cx + 114, base - 130);
    ctx.quadraticCurveTo(cx + 54, base - 150, cx + 38, base - 176); ctx.lineTo(cx - 38, base - 176);
    ctx.quadraticCurveTo(cx - 54, base - 150, cx - 114, base - 130); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - 114, base - 130); ctx.quadraticCurveTo(cx, base - 110, cx + 114, base - 130); ctx.stroke();
    ctx.restore();
    text(ctx, 'DOG FOOD', cx, base - 58, color, { size: 24, weight: 600, align: 'center' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const p = cy.now() / PERIOD, col = C('force');
    /* three stages: the bag comes down to the table, the table takes the weight from the hand, the hand leaves */
    const down = smooth(unit(p / 0.15)), share = smooth(unit((p - 0.15) / 0.6)), away = smooth(unit((p - 0.8) / 0.2));
    const w = M.v * G, N = w * share, Fh = w - N, sagEq = 100 * w / K.v, sagCm = sagEq * share;
    /* the sag is drawn at 7 units to the centimetre; the deepest the sliders allow, 9.8 cm, is 69 units */
    const BX = 380, TOP = 500, sag = sagCm * 7, base = TOP + sag - 46 * (1 - down);
    const rows = topline(ctx, share === 0 ? 'The hand holds up the whole ' + num(w, 1) + ' N weight of the bag'
      : share < 1 ? 'The table has sagged ' + fmt(sagCm, 2) + ' cm and pushes up with ' + num(N, 1) + ' N; the hand holds the other ' + num(Fh, 1) + ' N'
        : 'Sagged ' + fmt(sagCm, 2) + ' cm, the table alone pushes up with the bag\'s ' + num(w, 1) + ' N');
    const lab = labeller(ctx, H, { headline: rows });
    text(ctx, share < 1 ? '(a) held by the hand' : '(b) resting on the table', BX, 116, PAL.muted, { size: 21, align: 'center' });
    /* the table from the side: two legs on the floor and a top that sags under the bag; the dashed
       line is where the top lies unloaded */
    line(ctx, 60, TOP + 172, 700, TOP + 172, PAL.muted, 3);
    ctx.save(); ctx.strokeStyle = F.ref('table'); ctx.fillStyle = PAL.soft; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.rect(BX - 252, TOP + 16, 24, 154); ctx.rect(BX + 228, TOP + 16, 24, 154); ctx.fill(); ctx.stroke();
    /* the top bows between its legs and lies flat where it overhangs them */
    ctx.beginPath(); ctx.moveTo(BX - 290, TOP); ctx.lineTo(BX - 240, TOP); ctx.quadraticCurveTo(BX, TOP + 2 * sag, BX + 240, TOP); ctx.lineTo(BX + 290, TOP);
    ctx.lineTo(BX + 290, TOP + 20); ctx.lineTo(BX + 240, TOP + 20); ctx.quadraticCurveTo(BX, TOP + 20 + 2 * sag, BX - 240, TOP + 20); ctx.lineTo(BX - 290, TOP + 20); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
    line(ctx, BX - 290, TOP, BX + 290, TOP, PAL.muted, 2, [8, 8]);
    text(ctx, 'the table', BX + 150, TOP + 132, F.ref('table'), { size: 21, weight: 600, align: 'center' });
    /* the hand grips the gathered neck from above, and lets go and rises once the table has the weight */
    const neck = base - 176, hy = neck - 62 - 70 * away;
    bag(ctx, BX, base, F.ref('dog-food'), sag * 0.1);
    F.hand(ctx, BX, hy, { aim: [0, 1], view: 'back', curl: 0.85 - 0.5 * away, thumb: 'along', s: 1.15, color: PAL.muted });
    text(ctx, 'the hand', BX + 70, hy + 6, PAL.ink, { size: 21, weight: 600, align: 'left' });
    /* the sag, bracketed at the middle of the top, beside the bag */
    if (sag > 6) {
      line(ctx, BX + 124, TOP + sag, BX + 214, TOP + sag, PAL.muted, 2, [8, 8]);
      vbracket(ctx, BX + 200, TOP, TOP + sag, PAL.ink);
      text(ctx, 'sag ' + fmt(sagCm, 2) + ' cm', BX + 216, TOP - 22, PAL.ink, { size: 21, weight: 600, align: 'center', bg: PAL.panel });
    }
    /* the free-body diagram of the bag, the weight always U units long: the table's push and the
       hand's stand one on the other and together reach as far up as the weight reaches down */
    const FX = 850, FY = 420, U = 170, LN = U * share, LH = U - LN;
    text(ctx, 'forces on the bag', FX, 196, PAL.muted, { size: 21, align: 'center' });
    lab.block(FX - 110, 180, FX + 110, 212);
    line(ctx, FX - 46, FY - U, FX + 46, FY - U, alpha(PAL.ink, 0.35), 2, [6, 6]);
    line(ctx, FX - 46, FY + U, FX + 46, FY + U, alpha(PAL.ink, 0.35), 2, [6, 6]);
    arrow(ctx, FX, FY, FX, FY + U, col, 5);
    if (LN > 14) arrow(ctx, FX, FY, FX, FY - LN, col, 5);
    if (LH > 14) arrow(ctx, FX, FY - LN, FX, FY - U, col, 5);
    dot(ctx, FX, FY, F.ref('dog-food'), true, 9);
    lab.add('w = ' + num(w, 1) + ' N', FX, FY + U * 0.55, 1, 0, col, 22, 22);
    if (LN > 14) lab.add('N = ' + num(N, 1) + ' N', FX, FY - LN * 0.5, 1, 0, col, 22, 22);
    if (LH > 14) lab.add('F_{hand} = ' + num(Fh, 1) + ' N', FX, FY - LN - LH * 0.5, -1, 0, col, 22, 22);
    /* the graph: the push of the table against its sag, a straight line as steep as the table is stiff */
    /* fixed axes: the heaviest bag, 30 kg, weighs 294 N, so the force runs 0 to 300 N; on the softest
       table, 3,000 N/m, it sags 294 / 3,000 = 9.8 cm, so the sag runs 0 to 10 cm. Neither changes. */
    const box = { l: 1070, r: 1340, t: 200, b: 590 };
    const ax = axes(ctx, box, [0, 10], [0, 300], {
      xl: 'sag of the table (cm)', xc: PAL.ink, yl: 'push of the table (N)', yc: col, nx: 5, ny: 3,
      fx: (v) => fmt(v, 0), fy: (v) => fmt(v, 0),
    });
    const push = (x) => K.v * x / 100, xTop = Math.min(10, 30000 / K.v);
    line(ctx, box.l, ax.Y(w), box.r, ax.Y(w), alpha(PAL.ink, 0.5), 2, [10, 10]);
    text(ctx, 'weight ' + num(w, 1) + ' N', box.l + 10, ax.Y(w) + (ax.Y(w) - 18 < box.t + 12 ? 18 : -18), PAL.muted, { size: 18, align: 'left', bg: PAL.panel });
    line(ctx, ax.X(0), ax.Y(0), ax.X(xTop), ax.Y(push(xTop)), alpha(col, 0.35), 4);
    if (sagCm > 0) line(ctx, ax.X(0), ax.Y(0), ax.X(sagCm), ax.Y(N), col, 5);
    if (sagCm > 0.05) line(ctx, ax.X(sagCm), box.b, ax.X(sagCm), ax.Y(N), PAL.ink, 2, [4, 8]);
    dot(ctx, ax.X(sagCm), ax.Y(N), col, true, 9);
    lab.flush();
    tex(d.readout, `\\kwgt = \\km\\kg = (${fmt(M.v, 1)}\\ \\text{kg})(9.80\\ \\text{m/s}^2) = ${num(w, 1)}\\ \\text{N}`
      + ` \\\\ \\text{sag} = \\frac{\\kwgt}{\\kk} = \\frac{${num(w, 1)}\\ \\text{N}}{${tx(num(K.v, 0))}\\ \\text{N/m}} = ${fmt(sagEq, 2)}\\ \\text{cm}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 4.12: the skier of Example 4.5. She starts from rest at the top
   of the slope and slides 40 m down it, and the same forces are drawn a
   second time from one point, where each of them has room to be named.
   The idea has a time in it, so the figure runs one slide per loop and
   gets the transport.
===================================================================== */
(function () {
  const d = sim('sim-skier', 920);
  const TH = ctl(d.controls, { label: '\\ktheta', cls: 'angle', min: 5, max: 40, step: 0.5, value: 25, unit: '°', dec: 1, onInput: reset, aria: 'angle of the slope' });
  const M = ctl(d.controls, { label: '\\km', cls: 'mass', min: 20, max: 120, step: 1, value: 60, unit: 'kg', dec: 1, onInput: reset, aria: 'mass of the skier' });
  const FR = ctl(d.controls, { label: '\\kff', cls: 'force', min: 0, max: 250, step: 1, value: 45, unit: 'N', dec: 1, onInput: reset, aria: 'friction' });
  const ro = F.readout(d);
  const SLOPE = 40;                                   /* the length of the slope, in metres */
  const H = 920, PS = 1.05;                           /* PS: the skier's scale, about 135 units tall in her crouch */
  const cy = cycle(() => T(), 1.2);
  function reset() { cy.reset(); }
  const acc = () => (M.v * G * Math.sin(TH.v * RAD) - FR.v) / M.v;
  const moving = () => acc() > 0;
  /* when the friction holds her the slide has no length at all, so the cycle has no time to run
     through and the transport's scrubber goes to zero rather than playing a loop in which
     nothing moves */
  const T = () => (moving() ? Math.sqrt((2 * SLOPE) / acc()) : 0);
  /* the skier, crouched and facing down the slope, her feet on skis that lie along it: (x, y) is
     the point of the slope under her boots, and each boot is set on the slope's own height there */
  function skier(ctx, x, y, th) {
    const t = Math.tan(th), c = F.ref('skier'), ux = -Math.cos(th), uy = Math.sin(th), nx = -uy, ny = ux, lift = 5;
    const end = [x + ux * 62 + nx * lift, y + uy * 62 + ny * lift];
    line(ctx, x - ux * 52 + nx * lift, y - uy * 52 + ny * lift, end[0], end[1], c, 4);
    line(ctx, end[0], end[1], end[0] + ux * 10 + nx * 9, end[1] + uy * 10 + ny * 9, c, 4);
    F.silhouette(ctx, { x, y: y - lift - 2, s: PS, face: -1, pose: 'crouch', color: c, feet: [{ x: 15, y: 15 * t }, { x: -15, y: -15 * t }] });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const th = TH.v * RAD, a = acc(), tau = cy.now();
    const w = M.v * G, wpar = w * Math.sin(th), wperp = w * Math.cos(th), col = C('force');
    /* the friction that acts: the set value while she slides, and only as much as holds her when it could give more */
    const f = moving() ? FR.v : wpar;
    const dist = moving() ? Math.min(SLOPE, 0.5 * a * tau * tau) : 0, speed = moving() ? a * Math.min(tau, T()) : 0;
    /* the headline first, so that no label is placed under it */
    const rows = topline(ctx, moving()
      ? 'After ' + fmt(Math.min(tau, T()), 2) + ' s she is ' + fmt(dist, 1) + ' m down the slope at ' + fmt(speed, 1)
        + ' m/s, gaining ' + fmt(a, 2) + ' m/s every second'
      : 'Friction can reach ' + num(FR.v, 0) + ' N, more than the ' + num(wpar, 0)
        + ' N of weight along the slope, so she stays where she is');
    const lab = labeller(ctx, H, { headline: rows });
    /* ---------- the slope, rising to the right as the book draws it ---------- */
    const BASE = 560, X0 = 300, run = Math.min(540, 300 / Math.tan(th)), drop = run * Math.tan(th);
    const HIX = X0 + run, HIY = BASE - drop;
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.beginPath();
    ctx.moveTo(X0, BASE); ctx.lineTo(HIX, HIY); ctx.lineTo(HIX, BASE); ctx.closePath(); ctx.fill(); ctx.restore();
    line(ctx, X0, BASE, HIX, BASE, PAL.muted, 3);
    line(ctx, HIX, BASE, HIX, HIY, PAL.muted, 3);
    line(ctx, X0, BASE, HIX, HIY, PAL.ink, 4);
    ctx.save(); ctx.strokeStyle = C('angle'); ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(X0, BASE, 96, -th, 0); ctx.stroke(); ctx.restore();
    /* the angle is named below the base line, clear of the wedge, which closes
       up at small angles until nothing will fit inside it */
    lab.add('θ = ' + deg(TH.v, 1), X0 + 96 * Math.cos(th / 2), BASE - 96 * Math.sin(th / 2), 0.34, 0.94, C('angle'), 20, 60);
    /* ---------- the skier, at her distance along the slope ---------- */
    const ux = -Math.cos(th), uy = Math.sin(th);                /* down the slope, to the left */
    const nx = -Math.sin(th), ny = -Math.cos(th);               /* out of the slope, up and to the left */
    /* The hill is longer than the 40 m she covers, so her run is laid on the
       middle of it: her skis and the arrow she carries then stay on the slope
       at every angle instead of running off its lower corner. */
    const LS = Math.hypot(run, drop), START = 0.1, SPAN = 0.66;
    const q0 = START * LS, q = (START + SPAN * (dist / SLOPE)) * LS;
    const sx = HIX + ux * q, sy = HIY + uy * q;
    line(ctx, HIX + ux * q0 + nx * 10, HIY + uy * q0 + ny * 10, sx + nx * 10, sy + ny * 10, alpha(PAL.ink, 0.38), 3, [11, 9]);
    dot(ctx, HIX + ux * q0 + nx * 12, HIY + uy * q0 + ny * 12, PAL.ink, false, 10);
    skier(ctx, sx, sy, th);
    lab.place({ l: sx - 90, t: sy - 145, r: sx + 55, b: sy });
    if (moving() && speed > 0.05) {
      const bx = sx + nx * 175, by = sy + ny * 175, LV = Math.min(120, 44 + 2.6 * speed);
      arrow(ctx, bx, by, bx + ux * LV, by + uy * LV, C('velocity'), 5);
      lab.add('v = ' + fmt(speed, 1) + ' m/s', bx + ux * LV, by + uy * LV, ux, uy, C('velocity'), 20);
    }
    /* ---------- the same forces, drawn a second time from one point ---------- */
    /* the weight is always 180 units long; a short piece of the slope is drawn under the point so
       the directions read, and each label is sent off in a direction of its own so that no two of
       the five crowd the same corner */
    const FX = 1090, FY = 390, S = 180 / w;
    text(ctx, 'the forces on the skier, drawn from one point', FX, 126, PAL.muted, { size: 20, align: 'center' });
    lab.block(FX - 250, 106, FX + 250, 146);
    line(ctx, FX - ux * 120 - nx * 18, FY - uy * 120 - ny * 18, FX + ux * 120 - nx * 18, FY + uy * 120 - ny * 18, alpha(PAL.ink, 0.5), 4);
    for (let k = -120; k <= 120; k += 30) lab.place({ l: FX + ux * k - nx * 18 - 4, t: FY + uy * k - ny * 18 - 4, r: FX + ux * k - nx * 18 + 4, b: FY + uy * k - ny * 18 + 4 });
    const hw = [FX, FY + w * S], hpar = [FX + ux * wpar * S, FY + uy * wpar * S];
    const hperp = [FX - nx * wperp * S, FY - ny * wperp * S], hN = [FX + nx * wperp * S, FY + ny * wperp * S];
    const fL = Math.min(200, f * S), hf = [FX - ux * fL, FY - uy * fL];
    /* the parallelogram that resolves the weight: guide lines, under the arrows */
    line(ctx, hpar[0], hpar[1], hw[0], hw[1], alpha(col, 0.5), 2.5, [9, 7]);
    line(ctx, hperp[0], hperp[1], hw[0], hw[1], alpha(col, 0.5), 2.5, [9, 7]);
    arrow(ctx, FX, FY, hw[0], hw[1], col, 5);
    arrow(ctx, FX, FY, hpar[0], hpar[1], col, 5);
    arrow(ctx, FX, FY, hperp[0], hperp[1], col, 5);
    arrow(ctx, FX, FY, hN[0], hN[1], col, 5);
    if (fL > 3) arrow(ctx, FX, FY, hf[0], hf[1], col, 5);
    dot(ctx, FX, FY, F.ref('skier'), true, 8);
    lab.add('w = ' + num(w, 0) + ' N', hw[0], hw[1], -0.5, 0.87, col, 21, 26);
    lab.add('N = ' + num(wperp, 0) + ' N', hN[0], hN[1], 0.3, -0.95, col, 21, 26);
    lab.add('w∥ = ' + num(wpar, 0) + ' N', hpar[0], hpar[1], -1, 0.2, col, 21, 26);
    lab.add('w⊥ = ' + num(wperp, 0) + ' N', hperp[0], hperp[1], 1, 0.1, col, 21, 26);
    if (fL > 3) lab.add('f = ' + num(f, 0) + ' N', hf[0], hf[1], 0.9, -0.45, col, 21, 26);
    /* ---------- the graph: the speed she has reached against the time ---------- */
    /* fixed axes: the 40 m of slope is covered at v = √(2 × 40 × a), and the steepest slope with no
       friction gives a = 9.80 sin 40° = 6.30 m/s², so she can never pass √(80 × 6.30) = 22.4 m/s and
       the speed axis is always 0 to 24 m/s. A slope only just steep enough to start her takes minutes
       to run, so no fixed time axis holds every run: the time axis is set at 0 to 6 s, which holds
       the 4.9 s run the figure opens with, and a slower run walks off the right edge as a pinned
       marker. Neither range changes as a slider moves. */
    const TR = 6, VR = 24;
    const box = { l: 240, r: 1240, t: 690, b: 840 };
    const { X, Y } = axes(ctx, box, [0, TR], [0, VR], {
      xl: 'time t (s)', xc: C('time'), yl: 'speed v (m/s)', yc: C('velocity'), nx: 6, ny: 4,
      fx: (v) => fmt(v, 0), fy: (v) => fmt(v, 0),
    });
    if (moving()) {
      const tn = Math.min(tau, T());
      inbox(ctx, box, () => {
        curve(ctx, (t) => a * t, 0, Math.min(T(), TR), X, Y, C('velocity'), 5, 2);
        line(ctx, X(tn), box.b, X(tn), Y(speed), alpha(PAL.ink, 0.5), 2, [5, 7]);
      });
      pinned(ctx, box, X, Y, tn, speed, C('velocity'), fmt(tn, 1) + ' s');
    } else text(ctx, 'she does not start to slide', X(TR / 2), Y(VR / 2), PAL.muted, { size: 20, align: 'center', bg: PAL.panel });
    lab.flush();
    const kg = (v) => `(${fmt(v, 1)}\\ \\text{kg})`, gs = `(9.80\\ \\text{m/s}^2)\\sin ${fmt(TH.v, 1)}^\\circ`;
    const note = 'With friction neglected, $\\kapar = \\kg\\sin\\ktheta = ' + fmt(G * Math.sin(th), 2) + '\\ \\text{m/s}^2$ for a skier of any mass.';
    if (moving()) ro.set(`\\kapar = \\frac{\\km\\kg\\sin\\ktheta - \\kff}{\\km} = \\frac{${kg(M.v)}${gs} - ${fmt(FR.v, 1)}\\ \\text{N}}{${kg(M.v)}} = ${fmt(a, 2)}\\ \\text{m/s}^2`, note, { form: 'slide' });
    else ro.set(`\\kff = \\km\\kg\\sin\\ktheta = ${kg(M.v)}${gs} = ${fmt(wpar, 1)}\\ \\text{N} \\\\ \\kapar = 0`, note, { form: 'hold' });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T() / 5), draw });
})();

/* =====================================================================
   FIGURE 4.16 + 4.17: the tightrope walker of Example 4.6. Every force
   is drawn to one scale, the weight always the same length, so that the
   two tensions are seen to lengthen as the wire is pulled straighter
   while the height each of them rises through stays at half the weight.
   He stands still, so the figure is a still picture over the graph of
   the tension against the sag.
===================================================================== */
(function () {
  const H = 840;
  const d = sim('sim-tightrope', H);
  /* 4° is where a tension drawn to scale still ends short of the post it pulls on */
  const TH = ctl(d.controls, { label: '\\ktheta', cls: 'angle', min: 4, max: 30, step: 0.5, value: 5, unit: '°', dec: 1, aria: 'angle the wire sags by',
    detents: [{ v: 5, label: 'Example 4.6' }], snap: false });
  const MASS = 70, W = MASS * G;                      /* the walker of the example: 70.0 kg, 686 N */
  const tension = (thDeg) => W / (2 * Math.sin(thDeg * RAD));
  const tx = (s) => s.replace(/,/g, '{,}');
  function draw() {
    const { ctx } = begin(d.c);
    const th = TH.v * RAD, T = tension(TH.v), col = C('force'), c = Math.cos(th), s = Math.sin(th);
    const rows = topline(ctx, 'At ' + deg(TH.v, 1) + ' each half of the wire pulls with ' + num(T, 0) + ' N, '
      + fmt(T / W, 1) + ' times his weight of ' + num(W, 0) + ' N');
    const lab = labeller(ctx, H, { headline: rows });
    /* the scene: two posts and the wire sagging to the walker at its middle, the angle true */
    const CX = 700, TOPY = 236, half = Math.min(560, 190 / Math.tan(th)), sagY = TOPY + half * Math.tan(th);
    fixed(ctx, CX - half - 40, TOPY - 70, 36, 330); fixed(ctx, CX + half + 4, TOPY - 70, 36, 330);
    lab.place({ l: CX - half - 40, t: TOPY - 70, r: CX - half - 4, b: TOPY + 260 });
    lab.place({ l: CX + half + 4, t: TOPY - 70, r: CX + half + 40, b: TOPY + 260 });
    line(ctx, CX - half, TOPY, CX + half, TOPY, PAL.rule, 2, [10, 10]);
    line(ctx, CX - half, TOPY, CX, sagY, F.ref('wire'), 4); line(ctx, CX, sagY, CX + half, TOPY, F.ref('wire'), 4);
    /* the walker faces the reader, arms out for balance, both feet on the low point of the wire */
    F.silhouette(ctx, { x: CX, y: sagY - 2, s: 0.95, pose: 'stand', color: F.ref('walker'),
      hip: { x: 0, y: -74 }, head: { x: 2, y: -140 }, shoulder: { x: 2, y: -118 }, feet: [{ x: 6, y: -6 * Math.tan(th) }, { x: -6, y: -6 * Math.tan(th) }],
      hands: [{ x: 60, y: -122 }, { x: -56, y: -122 }] });
    lab.place({ l: CX - 62, t: sagY - 150, r: CX + 66, b: sagY - 8 });
    /* the three forces on the point under his feet, to one scale: the weight is U units long */
    const U = 72, LT = U * T / W, rise = LT * s, reach = LT * c;
    const hL = [CX - reach, sagY - rise], hR = [CX + reach, sagY - rise];
    /* each tension's two parts: along the level of his feet, then straight up to the arrow's head */
    [hL, hR].forEach(function (h) {
      line(ctx, CX, sagY, h[0], sagY, alpha(col, 0.6), 2.5, [9, 7]);
      line(ctx, h[0], sagY, h[0], h[1], col, 4);
    });
    arrow(ctx, CX, sagY, hL[0], hL[1], col, 5); arrow(ctx, CX, sagY, hR[0], hR[1], col, 5);
    arrow(ctx, CX, sagY, CX, sagY + U, col, 5);
    dot(ctx, CX, sagY, F.ref('walker'), true, 7);
    /* the sag angle, at the left post between the level of the posts and the wire, named above the level */
    ctx.save(); ctx.strokeStyle = C('angle'); ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(CX - half, TOPY, 110, 0, th); ctx.stroke(); ctx.restore();
    text(ctx, 'θ = ' + deg(TH.v, 1), CX - half + 118, TOPY - 20, C('angle'), { size: 21, weight: 600, align: 'center', bg: PAL.panel });
    lab.block(CX - half + 60, TOPY - 36, CX - half + 176, TOPY - 4);
    lab.add('w = ' + num(W, 0) + ' N', CX, sagY + U, 0, 1, col, 21, 18);
    if (reach > 330) {
      /* long arrows: each tension named over its shaft, its upward part under the arrow's head */
      lab.beside({ x1: CX, y1: sagY, x2: hL[0], y2: hL[1] }, 'right', 'T_L = ' + num(T, 0) + ' N', col, 21, { offset: 0.62, gap: 30 });
      lab.beside({ x1: CX, y1: sagY, x2: hR[0], y2: hR[1] }, 'left', 'T_R = ' + num(T, 0) + ' N', col, 21, { offset: 0.62, gap: 30 });
      lab.add('T_{Ly} = ' + num(T * s, 0) + ' N', hL[0], sagY, 0.35, 0.94, col, 21, 26);
      lab.add('T_{Ry} = ' + num(T * s, 0) + ' N', hR[0], sagY, -0.35, 0.94, col, 21, 26);
    } else {
      /* short arrows: the names stand outside the heads, under the wire and clear of the walker */
      lab.add('T_L = ' + num(T, 0) + ' N', hL[0], hL[1], -0.9, 0.44, col, 21, 24);
      lab.add('T_R = ' + num(T, 0) + ' N', hR[0], hR[1], 0.9, 0.44, col, 21, 24);
      lab.add('T_{Ly} = ' + num(T * s, 0) + ' N', hL[0], sagY, -0.8, 0.6, col, 21, 22);
      lab.add('T_{Ry} = ' + num(T * s, 0) + ' N', hR[0], sagY, 0.8, 0.6, col, 21, 22);
      const wide = reach > 280;   /* room under the dashed line for its name, or else it goes below the upward part's */
      lab.add('T_{Lx} = ' + num(T * c, 0) + ' N', wide ? CX - reach * 0.55 : hL[0], sagY, wide ? 0 : -0.6, wide ? 1 : 0.8, col, 21, wide ? 26 : 58);
      lab.add('T_{Rx} = ' + num(T * c, 0) + ' N', wide ? CX + reach * 0.55 : hR[0], sagY, wide ? 0 : 0.6, wide ? 1 : 0.8, col, 21, wide ? 26 : 58);
    }
    if (reach > 330) {
      lab.add('T_{Lx} = ' + num(T * c, 0) + ' N', CX - reach * 0.4, sagY, 0, 1, col, 21, 26);
      lab.add('T_{Rx} = ' + num(T * c, 0) + ' N', CX + reach * 0.4, sagY, 0, 1, col, 21, 26);
    }
    /* the graph: the tension against the sag angle */
    /* fixed axes: the slider covers 4° to 30° and the curve is drawn on towards a straight wire, so
       the angle runs 0 to 30°. The walker's weight is fixed at 686 N; at 4° the tension is
       686 / (2 sin 4°) = 4,917 N, so the tension axis is 0 to 5,000 N and holds every state the
       slider reaches, the curve leaving through the top at 3.9°. Neither range changes. */
    const TR = 5000, box = { l: 240, r: 1240, t: 590, b: 760 };
    const ax = axes(ctx, box, [0, 30], [0, TR], {
      xl: 'sag angle θ (°)', xc: C('angle'), yl: 'tension T (N)', yc: col, nx: 6, ny: 5,
      fx: (v) => fmt(v, 0), fy: (v) => num(v, 0),
    });
    line(ctx, box.l, ax.Y(W), box.r, ax.Y(W), alpha(PAL.ink, 0.45), 2, [10, 10]);
    text(ctx, 'w = ' + num(W, 0) + ' N', box.r + 20, ax.Y(W), PAL.muted, { size: 18, align: 'left' });
    F.plot(ctx, ax, (t) => tension(t), col, { x: [1, 30] });
    line(ctx, ax.X(TH.v), box.b, ax.X(TH.v), ax.Y(T), PAL.ink, 2, [4, 8]);
    pinned(ctx, box, ax.X, ax.Y, TH.v, T, col, num(T, 0) + ' N');
    lab.flush();
    tex(d.readout, `\\kTf = \\frac{\\kwgt}{2\\sin\\ktheta} = \\frac{${tx(num(W, 0))}\\ \\text{N}}{2\\sin ${fmt(TH.v, 1)}^\\circ} = ${tx(num(T, 0))}\\ \\text{N}`
      + ` \\\\ \\kTf\\sin\\ktheta = (${tx(num(T, 0))}\\ \\text{N})\\sin ${fmt(TH.v, 1)}^\\circ = ${num(T * s, 0)}\\ \\text{N} = \\tfrac{1}{2}\\kwgt`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
