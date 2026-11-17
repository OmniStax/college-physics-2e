/* Figures for section 3.3 Vector Addition and Subtraction: Analytical Methods. Boots against the section's text article.
   Every figure here is a still picture: a vector's components, and the sum of two vectors, have no time in them, so
   none registers a cycle and none gets a transport; each redraws when a slider moves. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['3.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, ctl, register, begin, line, arrow, dot, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) { const n = host.appendChild(el('small', null, small)); F.renderMath(n); } }

/* ---------- small helpers shared by the figures ---------- */
const RAD = Math.PI / 180;
const cos = (deg) => Math.cos(deg * RAD), sin = (deg) => Math.sin(deg * RAD);
/* the angle of a vector from the +x axis, in degrees from -180 to 180 */
const angleOf = (x, y) => Math.atan2(y, x) / RAD;
/* a signed number as the equation prints it: a negative one in brackets */
const num = (v, d) => (v < 0 ? `(${fmt(v, d)})` : fmt(v, d));
/* a direction as the book's problems state it: "29.1° north of east" */
function bearing(deg) {
  const a = Math.round(deg * 10) / 10, m = Math.abs(a);
  if (m === 0) return 'due east'; if (m === 180) return 'due west'; if (a === 90) return 'due north'; if (a === -90) return 'due south';
  const ns = a > 0 ? 'north' : 'south';
  return m < 90 ? fmt(m, 1) + '° ' + ns + ' of east' : fmt(180 - m, 1) + '° ' + ns + ' of west';
}
/* a dashed component vector with a small head, drawn from (x1, y1) to (x2, y2) */
function darrow(ctx, x1, y1, x2, y2, color, w = 3) {
  const L = Math.hypot(x2 - x1, y2 - y1); if (L < 3) return;
  const ux = (x2 - x1) / L, uy = (y2 - y1) / L, h = Math.min(26, L);
  line(ctx, x1, y1, x2 - ux * h, y2 - uy * h, color, w, [10, 8]);
  arrow(ctx, x2 - ux * h, y2 - uy * h, x2, y2, color, w);
}
/* the right-angle mark at (x, y), opening toward (dx, dy) horizontally and vertically */
function rightAngle(ctx, x, y, dx, dy, s = 18) {
  const sx = Math.sign(dx) || 1, sy = Math.sign(dy) || 1;
  ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.beginPath();
  ctx.moveTo(x + sx * s, y); ctx.lineTo(x + sx * s, y - sy * s); ctx.lineTo(x, y - sy * s); ctx.stroke(); ctx.restore();
}
/* a compass rose centred on (x, y), in ink, on a patch of the page */
function compass(ctx, x, y, r = 34) {
  ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(x - r - 34, y - r - 34, 2 * r + 68, 2 * r + 68); ctx.restore();
  arrow(ctx, x, y + r, x, y - r, PAL.ink, 3); line(ctx, x - r, y, x + r, y, PAL.ink, 3);
  text(ctx, 'N', x, y - r - 18, PAL.ink, { size: 22, align: 'center' }); text(ctx, 'S', x, y + r + 18, PAL.ink, { size: 22, align: 'center' });
  text(ctx, 'E', x + r + 18, y, PAL.ink, { size: 22, align: 'center' }); text(ctx, 'W', x - r - 18, y, PAL.ink, { size: 22, align: 'center' });
}
const seg = (p, q) => ({ x1: p.x, y1: p.y, x2: q.x, y2: q.y });
/* the side of the segment p to q away from the point t, as labeller.beside counts sides */
const away = (p, q, t) => (-(q.y - p.y) * (t.x - (p.x + q.x) / 2) + (q.x - p.x) * (t.y - (p.y + q.y) / 2) > 0 ? -1 : 1);
/* a segment joins a labeller's collision set, so a name queued after it steps off the line, not onto it */
function blockSeg(lab, p, q) {
  const n = Math.ceil(Math.hypot(q.x - p.x, q.y - p.y) / 14);
  for (let i = 0; i <= n; i++) { const x = p.x + ((q.x - p.x) * i) / n, y = p.y + ((q.y - p.y) * i) / n; lab.block(x - 3, y - 3, x + 3, y + 3); }
}
const blocks = (v) => fmt(Math.abs(v) < 0.05 ? 0 : v, 1).replace('-', '−') + ' blocks';
const EW = (v) => (v >= 0 ? 'east' : 'west'), NS = (v) => (v >= 0 ? 'north' : 'south');

/* ---------- the city of square blocks that Figures 3.24 to 3.27 are drawn on ----------
   One block is 36 units. The sliders reach 12 blocks each way, so the grid is 24 blocks tall, and it runs
   18 blocks to each side to fill the stage; the scale never changes. */
const CITY = { H: 1000, OX: 700, OY: 548, S: 36, NX: 18, NY: 12 };
const cityAx = { box: { l: CITY.OX - 12 * CITY.S, r: CITY.OX + 12 * CITY.S, t: CITY.OY - 12 * CITY.S, b: CITY.OY + 12 * CITY.S }, xr: [-12, 12], yr: [-12, 12], X: (v) => CITY.OX + v * CITY.S, Y: (v) => CITY.OY - v * CITY.S };
/* the grid, the axes with a number every three blocks, the compass rose, and a line of words in each quadrant
   (the one the vector is in set in ink); returns the labeller the figure names its parts through */
function city(ctx, lines, ax, ay, marks) {
  const { H, OX, OY, S, NX, NY } = CITY, lab = F.labeller(ctx, H, { headline: lines });
  for (let i = -NX; i <= NX; i++) line(ctx, OX + i * S, OY - NY * S, OX + i * S, OY + NY * S, PAL.rule, 1.5);
  for (let j = -NY; j <= NY; j++) line(ctx, OX - NX * S, OY - j * S, OX + NX * S, OY - j * S, PAL.rule, 1.5);
  arrow(ctx, OX - NX * S, OY, OX + NX * S + 30, OY, PAL.muted, 2.5); arrow(ctx, OX, OY + NY * S, OX, OY - NY * S - 28, PAL.muted, 2.5);
  text(ctx, 'x', OX + NX * S + 14, OY + 26, PAL.muted, { size: 24, weight: 600, align: 'center' });
  text(ctx, 'y', OX - 24, OY - NY * S - 14, PAL.muted, { size: 24, weight: 600, align: 'center' });
  /* the numbers stand on the side of each axis the triangle leaves free */
  const below = ay >= 0 ? 1 : -1, left = ax >= 0 ? -1 : 1;
  for (let i = -15; i <= 15; i += 3) { if (!i) continue; const x = OX + i * S, y = OY + below * 22; line(ctx, x, OY - 6, x, OY + 6, PAL.muted, 2); text(ctx, String(i).replace('-', '−'), x, y, PAL.muted, { size: 18, align: 'center', bg: PAL.panel }); lab.block(x - 16, y - 12, x + 16, y + 12); }
  for (let j = -9; j <= 9; j += 3) { if (!j) continue; const x = OX + left * 24, y = OY - j * S; line(ctx, OX - 6, y, OX + 6, y, PAL.muted, 2); text(ctx, String(j).replace('-', '−'), x, y, PAL.muted, { size: 18, align: 'center', bg: PAL.panel }); lab.block(x - 16, y - 12, x + 16, y + 12); }
  compass(ctx, OX - 15.5 * S, OY + 4.5 * S); lab.block(OX - 17.5 * S, OY + 2.5 * S, OX - 13.5 * S, OY + 6.5 * S);
  /* the quadrants, counterclockwise from north-east */
  [[1, 1], [-1, 1], [-1, -1], [1, -1]].forEach(([sx, sy], q) => {
    const on = ax * sx > 0 && ay * sy > 0, x = OX + sx * 14.5 * S;
    marks[q].forEach((s, k) => {
      const y = OY - sy * 10.5 * S + (k - (marks[q].length - 1) / 2) * 32;
      text(ctx, s, x, y, on ? PAL.ink : PAL.muted, { size: 21, weight: on ? 600 : 400, align: 'center', bg: PAL.panel });
    });
    lab.block(x - 125, OY - sy * 10.5 * S - 34, x + 125, OY - sy * 10.5 * S + 34);
  });
  return lab;
}
/* the right triangle of a vector and its components from the origin: the components dashed, the x-component
   along the axis and the y-component standing on its head, the right angle where they meet, the vector solid */
function triangle(ctx, lab, ax, ay, pos, nameA) {
  const { OX, OY, S } = CITY, O = { x: OX, y: OY }, K = { x: OX + ax * S, y: OY }, T = { x: OX + ax * S, y: OY - ay * S };
  const hasX = Math.abs(ax) > 0.05, hasY = Math.abs(ay) > 0.05;
  if (hasX) { darrow(ctx, O.x, O.y, K.x, K.y, pos, 4); blockSeg(lab, O, K); }
  if (hasY) { darrow(ctx, K.x, K.y, T.x, T.y, pos, 4); blockSeg(lab, K, T); }
  if (Math.abs(ax) > 0.8 && Math.abs(ay) > 0.8) rightAngle(ctx, K.x, K.y, -ax, ay);
  if (hasX || hasY) { arrow(ctx, O.x, O.y, T.x, T.y, pos, 6); blockSeg(lab, O, T); lab.beside(seg(O, T), hasX && hasY ? away(O, T, K) : -1, nameA, pos, 24); }
  if (hasX) lab.add('A_x = ' + blocks(ax), (O.x + K.x) / 2, OY, 0, ay >= 0 ? 1 : -1, pos, 22, 58);
  if (hasY) lab.add('A_y = ' + blocks(ay), T.x, (K.y + T.y) / 2, ax >= 0 ? 1 : -1, 0, pos, 22, 22);
  return { O, K, T };
}

/* =====================================================================
   FIGURES 3.24 to 3.26: a vector and its components, on the blocks of the
   city walk. The magnitude and the angle are set; the components follow,
   and each quadrant says the signs they take there. Still.
===================================================================== */
(function () {
  const d = sim('sim-components', CITY.H);
  const A = ctl(d.controls, { label: '\\kA', cls: 'position', min: 2, max: 12, step: 0.1, value: 10.3, unit: 'blocks', dec: 1, aria: 'magnitude of A' });
  const TH = ctl(d.controls, { label: '\\ktheta', cls: 'angle', min: -180, max: 180, step: 0.1, value: 29.1, unit: '°', dec: 1, aria: 'angle of A', detents: [-90, 0, 90] });
  const SIGNS = [['A_x > 0,  A_y > 0'], ['A_x < 0,  A_y > 0'], ['A_x < 0,  A_y < 0'], ['A_x > 0,  A_y < 0']];
  function draw() {
    const { ctx } = begin(d.c);
    const a = A.v, th = TH.v, ax = a * cos(th), ay = a * sin(th), pos = C('position');
    const zx = Math.abs(ax) < 0.05, zy = Math.abs(ay) < 0.05;
    const lines = topline(ctx, fmt(a, 1) + ' blocks at ' + fmt(th, 1).replace('-', '−') + '° is '
      + (zx ? fmt(Math.abs(ay), 1) + ' blocks ' + NS(ay) + ' and nothing east or west.'
        : zy ? fmt(Math.abs(ax), 1) + ' blocks ' + EW(ax) + ' and nothing north or south.'
          : fmt(Math.abs(ax), 1) + ' blocks ' + EW(ax) + ' and ' + fmt(Math.abs(ay), 1) + ' blocks ' + NS(ay) + '.'));
    const lab = city(ctx, lines, zx ? 0 : ax, zy ? 0 : ay, SIGNS);
    const t = triangle(ctx, lab, ax, ay, pos, 'A = ' + blocks(a));
    if (Math.abs(th) >= 0.5) F.angleArc(ctx, t.O, Math.min(84, Math.max(44, a * CITY.S * 0.3)), 0, th * RAD, 'θ = ' + fmt(th, 1).replace('-', '−') + '°', lab, C('angle'));
    dot(ctx, t.O.x, t.O.y, PAL.ink, true, 6);
    lab.flush();
    readout(d.readout, `\\begin{aligned}\\kAx &= \\kA\\cos\\ktheta = (${fmt(a, 1)}\\ \\text{blocks})\\cos ${num(th, 1)}^\\circ = ${fmt(zx ? 0 : ax, 1)}\\ \\text{blocks}\\\\ \\kAy &= \\kA\\sin\\ktheta = (${fmt(a, 1)}\\ \\text{blocks})\\sin ${num(th, 1)}^\\circ = ${fmt(zy ? 0 : ay, 1)}\\ \\text{blocks}\\end{aligned}`,
      zx || zy ? 'Along an axis one component is zero and the other is as long as $\\mathbf{A}$.'
        : 'Walked one after the other, the components come to ' + fmt(Math.abs(ax), 1) + ' + ' + fmt(Math.abs(ay), 1) + ' = ' + fmt(Math.round(Math.abs(ax) * 10) / 10 + Math.round(Math.abs(ay) * 10) / 10, 1) + ' blocks, more than the ' + fmt(a, 1) + ' blocks of $\\mathbf{A}$.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 3.27: a vector from its components. The head is dragged over the
   blocks (or the components set); the Pythagorean theorem gives the length
   and the inverse tangent the direction. Where the x-component is negative
   the angle the inverse tangent returns is drawn too, pointing the other
   way along the vector's line. Still.
===================================================================== */
(function () {
  const d = sim('sim-resultant', CITY.H);
  const AX = ctl(d.controls, { label: '\\kAx', cls: 'position', min: -12, max: 12, step: 0.5, value: 9, unit: 'blocks', dec: 1, aria: 'x-component of A' });
  const AY = ctl(d.controls, { label: '\\kAy', cls: 'position', min: -12, max: 12, step: 0.5, value: 5, unit: 'blocks', dec: 1, aria: 'y-component of A' });
  const P = F.drag(d, { x: AX, y: AY });
  const DIRS = [['north of east', 'θ = tan⁻¹(A_y / A_x)'], ['north of west', 'θ = tan⁻¹(A_y / A_x) + 180°'], ['south of west', 'θ = tan⁻¹(A_y / A_x) − 180°'], ['south of east', 'θ = tan⁻¹(A_y / A_x)']];
  function draw() {
    const { ctx } = begin(d.c);
    const { OX, OY, S } = CITY, ax = AX.v, ay = AY.v, a = Math.hypot(ax, ay), some = a > 0.05;
    const th = some ? angleOf(ax, ay) : 0, atn = ax !== 0 ? Math.atan(ay / ax) / RAD : (ay >= 0 ? 90 : -90);
    const pos = C('position'), angc = C('angle'), deg = (v) => fmt(v, 1).replace('-', '−') + '°';
    const part = (v, w) => fmt(Math.abs(v), 1) + ' blocks ' + w(v);
    const lines = topline(ctx, !some ? 'Both components are zero, so $\\mathbf{A}$ has no length and no direction.'
      : (ax === 0 ? part(ay, NS) + ' is' : ay === 0 ? part(ax, EW) + ' is' : part(ax, EW) + ' and ' + part(ay, NS) + ' make') + ' $\\kA = ' + fmt(a, 1) + '$ blocks, ' + bearing(th) + '.');
    const lab = city(ctx, lines, ax, ay, DIRS);
    /* the angle the inverse tangent returns, where it is not the vector's own: the same line, the other way */
    if (some && ax < 0) {
      const M = { x: OX - ax * S, y: OY + ay * S };
      line(ctx, OX, OY, M.x, M.y, PAL.muted, 3, [10, 10]); blockSeg(lab, { x: OX, y: OY }, M);
      if (Math.abs(atn) >= 0.5) F.angleArc(ctx, { x: OX, y: OY }, 130, 0, atn * RAD, undefined, undefined, PAL.muted);
      lab.add('tan⁻¹(A_y / A_x) = ' + deg(atn), M.x, M.y, Math.cos(atn * RAD), -Math.sin(atn * RAD), PAL.muted, 21, 22);
    }
    const t = triangle(ctx, lab, ax, ay, pos, 'A = ' + blocks(a));
    if (some && Math.abs(th) >= 0.5) F.angleArc(ctx, t.O, Math.min(84, Math.max(44, a * S * 0.3)), 0, th * RAD, 'θ = ' + deg(th), lab, angc);
    dot(ctx, OX, OY, PAL.ink, true, 6);
    P.draw(ctx, cityAx, pos);
    lab.flush();
    const bl = (v) => (v < 0 ? `(${fmt(v, 1)}\\ \\text{blocks})` : `${fmt(v, 1)}\\ \\text{blocks}`);
    let dir;
    if (!some) dir = `\\ktheta &\\ \\text{is undefined: both components are zero}`;
    else if (ax === 0) dir = `\\kAx &= 0,\\ \\text{so}\\ \\ktheta = ${fmt(th, 1)}^\\circ`;
    else if (ax > 0) dir = `\\ktheta &= \\tan^{-1}\\frac{\\kAy}{\\kAx} = \\tan^{-1}\\frac{${fmt(ay, 1)}\\ \\text{blocks}}{${fmt(ax, 1)}\\ \\text{blocks}} = ${fmt(atn, 1)}^\\circ`;
    else { const pm = th > atn ? '+' : '-'; dir = `\\ktheta &= \\tan^{-1}\\frac{\\kAy}{\\kAx} ${pm} 180^\\circ = \\tan^{-1}\\frac{${fmt(ay, 1)}\\ \\text{blocks}}{${fmt(ax, 1)}\\ \\text{blocks}} ${pm} 180^\\circ = ${fmt(atn, 1)}^\\circ ${pm} 180^\\circ = ${fmt(th, 1)}^\\circ`; }
    readout(d.readout, `\\begin{aligned}\\kA &= \\sqrt{\\kAx^2 + \\kAy^2} = \\sqrt{(${fmt(ax, 1)}\\ \\text{blocks})^2 + (${fmt(ay, 1)}\\ \\text{blocks})^2} = ${fmt(a, 1)}\\ \\text{blocks}\\\\ ${dir}\\end{aligned}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURES 3.28 to 3.33: two legs of a walk and their resultant, added by
   components. One drawing serves both: `sign` is +1 for A + B and -1 for
   A - B, where the second leg is taken in the opposite direction. The scale
   is fixed, 6.2 units a metre, from the sliders: A reaches 60 m between east
   and north, B 40 m anywhere north of the east-west line, so the walk stays
   within 40 m west, 100 m east and 100 m north of the start (A - B also 40 m
   south). The x-components sit in rows under the lowest point of the walk
   and the y-components in columns left of its leftmost point, as Figure 3.32
   sets them. Still: a sum of displacements has no time in it.
===================================================================== */
function walk(id, sign) {
  const S = 6.2, OX = 600, OY = 716, H = sign > 0 ? 932 : 1180;   /* y = 100 m is at 96; A - B has 40 m (248 units) more below the axis */
  const d = sim(id, H);
  const A = ctl(d.controls, { label: '\\kA', cls: 'position', min: 10, max: 60, step: 0.5, value: 53, unit: 'm', dec: 1, aria: 'magnitude of A' });
  const TA = ctl(d.controls, { label: '\\kthetaA', cls: 'angle', min: 0, max: 90, step: 0.5, value: 20, unit: '°', dec: 1, aria: 'angle of A' });
  const B = ctl(d.controls, { label: '\\kB', cls: 'position', min: 10, max: 40, step: 0.5, value: 34, unit: 'm', dec: 1, aria: 'magnitude of B' });
  const TB = ctl(d.controls, { label: '\\kthetaB', cls: 'angle', min: 0, max: 180, step: 0.5, value: 63, unit: '°', dec: 1, aria: 'angle of B', detents: [90] });
  const X = (m) => OX + m * S, Y = (m) => OY - m * S;
  const nb = sign > 0 ? 'B' : '−B';
  const round = (v) => Math.round(v * 10) / 10;
  const f1 = (v) => fmt(Math.abs(v) < 0.05 ? 0 : v, 1);       /* a value that rounds to zero is printed without a sign */
  const u1 = (v) => (v <= -0.05 ? `(${fmt(v, 1)}\\ \\text{m})` : `${f1(v)}\\ \\text{m}`);
  const m1 = (v) => f1(v).replace('-', '−') + ' m';           /* a component as its label prints it */
  function draw() {
    const { ctx } = begin(d.c);
    const pos = C('position'), angc = C('angle'), guide = F.alpha(PAL.ink, 0.3);
    const a = A.v, ta = TA.v, b = B.v, tb = TB.v;
    const ax = a * cos(ta), ay = a * sin(ta), bx0 = b * cos(tb), by0 = b * sin(tb), bx = sign * bx0, by = sign * by0;
    /* the resultant from the components as the readout prints them, so its sums hold as written */
    const rx = round(round(ax) + round(bx)), ry = round(round(ay) + round(by)), r = Math.hypot(rx, ry), none = r < 0.05;
    const th = none ? 0 : angleOf(rx, ry), atn = rx !== 0 ? Math.atan(ry / rx) / RAD : 0;
    const O = { x: X(0), y: Y(0) }, P = { x: X(ax), y: Y(ay) }, Q = { x: X(ax + bx), y: Y(ay + by) }, G = { x: X(ax + bx0), y: Y(ay + by0) };
    const lines = topline(ctx, none ? 'The two legs cancel, so the walk ends where it began and $\\kR = 0$.'
      : (sign > 0 ? '$\\mathbf{A}$ and $\\mathbf{B}$ add to' : '$\\mathbf{A} - \\mathbf{B}$ gives') + ' $\\kR = ' + f1(r) + '$ m, ' + bearing(th) + '.');
    const lab = F.labeller(ctx, H, { headline: lines });
    const pts = sign > 0 ? [O, P, Q] : [O, P, Q, G];
    const low = Math.max(...pts.map((p) => p.y)), lft = Math.min(...pts.map((p) => p.x));
    const r1 = low + 46, r2 = r1 + 54, r3 = r2 + 54;      /* the rows of the x-components */
    const c1 = lft - 44, c2 = c1 - 66, c3 = c2 - 66;      /* the columns of the y-components */
    /* the axes through the start, as long as the walk can reach */
    arrow(ctx, X(-44), OY, X(104), OY, PAL.muted, 2.5); arrow(ctx, OX, sign > 0 ? OY + 16 : Y(-42), OX, Y(102), PAL.muted, 2.5);
    text(ctx, 'x', X(104) + 16, OY + 4, PAL.muted, { size: 24, weight: 600, align: 'center' });
    text(ctx, 'y', OX - 24, Y(102) + 10, PAL.muted, { size: 24, weight: 600, align: 'center' });
    compass(ctx, 104, H - 100, 30); lab.block(40, H - 164, 168, H - 36);
    /* faint guides from the points of the walk to the rows and columns that carry their components */
    [[O, r3, c3], [P, r2, c2], [Q, r3, c3]].forEach(([p, row, col]) => { line(ctx, p.x, p.y, p.x, row, guide, 2, [4, 8]); line(ctx, p.x, p.y, col, p.y, guide, 2, [4, 8]); });
    /* the names of the legs and the resultant, queued first so they have the first pick of the slots */
    lab.beside(seg(O, P), away(O, P, Q), 'A', pos, 28);
    lab.beside(seg(P, Q), away(P, Q, O), nb, pos, 28);
    if (!none) lab.beside(seg(O, Q), away(O, Q, P), 'R', pos, 28);
    /* the components, the legs' dashed and the resultant's solid: a row's name goes under it through the labeller,
       a column's is set upright beside it, where nothing else lands */
    const comp = (x1, y1, x2, y2, solid, name, row) => {
      if (Math.hypot(x2 - x1, y2 - y1) < 2) return;
      if (solid) arrow(ctx, x1, y1, x2, y2, pos, 5); else darrow(ctx, x1, y1, x2, y2, pos, 4);
      if (row) { lab.add(name, (x1 + x2) / 2, (y1 + y2) / 2, 0, 1, pos, 22, 24); return; }
      ctx.save(); ctx.translate(x1 - 26, (y1 + y2) / 2); ctx.rotate(-Math.PI / 2);
      text(ctx, name, 0, 0, pos, { size: 22, weight: 600, align: 'center', bg: PAL.panel }); ctx.restore();
    };
    comp(X(0), r1, X(ax), r1, false, 'A_x = ' + m1(ax), true);
    comp(X(ax), r2, Q.x, r2, false, nb + '_x = ' + m1(bx), true);
    comp(X(0), r3, Q.x, r3, true, 'R_x = ' + m1(rx), true);
    comp(c1, Y(0), c1, Y(ay), false, 'A_y = ' + m1(ay), false);
    comp(c2, Y(ay), c2, Q.y, false, nb + '_y = ' + m1(by), false);
    comp(c3, Y(0), c3, Q.y, true, 'R_y = ' + m1(ry), false);
    /* B itself, muted, from the head of A, when the walk takes it the other way */
    if (sign < 0) { darrow(ctx, P.x, P.y, G.x, G.y, PAL.muted, 3.5); lab.beside(seg(P, G), away(P, G, O), 'B', PAL.muted, 26); blockSeg(lab, P, G); }
    /* the angles, each from a horizontal through its tail and drawn under the arrows; a name goes in the widest gap
       the other directions leave inside its arc */
    const arc = (p, deg, rad, name, cuts) => {
      if (Math.abs(deg) < 0.5 || rad < 8) return;
      F.angleArc(ctx, p, rad, 0, deg * RAD, undefined, undefined, angc);
      const e = [0, deg, ...cuts.filter((c) => c * (deg - c) > 0)].sort((u, v) => u - v);
      const m = e.slice(1).map((v, i) => [v - e[i], (v + e[i]) / 2]).reduce((u, v) => (v[0] > u[0] ? v : u))[1] * RAD;
      lab.add(name, p.x + rad * Math.cos(m), p.y - rad * Math.sin(m), Math.cos(m), -Math.sin(m), angc, 22, 18);
    };
    blockSeg(lab, O, P); blockSeg(lab, P, Q); blockSeg(lab, O, Q);
    const rA = Math.min(150, Math.max(50, a * S * 0.5)), rR = Math.min(92, Math.max(36, Math.min(a, r) * S * 0.3));
    arc(P, tb, Math.min(64, b * S * 0.4), 'θ_B', []);
    arc(O, ta, rA, 'θ_A', none ? [] : [th]);
    if (!none) arc(O, th, rR, 'θ', [ta]);
    arrow(ctx, O.x, O.y, P.x, P.y, pos, 5);
    arrow(ctx, P.x, P.y, Q.x, Q.y, pos, 5);
    if (Math.hypot(Q.x - O.x, Q.y - O.y) > 4) arrow(ctx, O.x, O.y, Q.x, Q.y, pos, 7);
    dot(ctx, O.x, O.y, PAL.ink, true, 6);
    lab.flush();
    /* the readout: steps 2 to 4 with the numbers as they stand */
    const bterm = (c) => (sign > 0 ? `\\k${'B' + c}` : `(-\\k${'B' + c})`);
    let dir;
    if (none) dir = `\\ktheta &\\ \\text{is undefined, since}\\ \\kR = 0`;
    else if (rx === 0) dir = `\\kRx &= 0,\\ \\text{so}\\ \\ktheta = ${f1(th)}^\\circ`;
    else if (rx > 0) dir = `\\ktheta &= \\tan^{-1}\\frac{\\kRy}{\\kRx} = \\tan^{-1}\\frac{${f1(ry)}\\ \\text{m}}{${f1(rx)}\\ \\text{m}} = ${f1(atn)}^\\circ`;
    else { const pm = th > atn ? '+' : '-'; dir = `\\ktheta &= \\tan^{-1}\\frac{\\kRy}{\\kRx} ${pm} 180^\\circ = \\tan^{-1}\\frac{${f1(ry)}\\ \\text{m}}{${f1(rx)}\\ \\text{m}} ${pm} 180^\\circ = ${f1(atn)}^\\circ ${pm} 180^\\circ = ${f1(th)}^\\circ`; }
    readout(d.readout, `\\begin{aligned}\\kRx &= \\kAx + ${bterm('x')} = ${f1(ax)}\\ \\text{m} + ${u1(bx)} = ${f1(rx)}\\ \\text{m}\\\\ \\kRy &= \\kAy + ${bterm('y')} = ${f1(ay)}\\ \\text{m} + ${u1(by)} = ${f1(ry)}\\ \\text{m}\\\\ \\kR &= \\sqrt{\\kRx^2 + \\kRy^2} = \\sqrt{(${f1(rx)}\\ \\text{m})^2 + (${f1(ry)}\\ \\text{m})^2} = ${f1(r)}\\ \\text{m}\\\\ ${dir}\\end{aligned}`);
  }
  register(d.fig, { update: () => {}, draw });
}
walk('sim-add', 1);
walk('sim-subtract', -1);
};
