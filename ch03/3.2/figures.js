/* Figures for section 3.2 Vector Addition and Subtraction: Graphical Methods. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['3.2'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, topline, labeller } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- small helpers shared by the figures ---------- */
const RAD = Math.PI / 180;
const cos = (deg) => Math.cos(deg * RAD), sin = (deg) => Math.sin(deg * RAD);
/* an angle folded into (-180, 180], so that 190° reads as -170° */
const fold = (deg) => { let a = ((deg % 360) + 540) % 360 - 180; if (a <= -180) a += 360; return a; };
/* a direction in the words the book uses: measured from east, north of it when positive and south of it when negative */
const compass = (deg, dec = 1) => { const a = fold(deg); return a >= 0 ? fmt(a, dec) + '° north of east' : fmt(-a, dec) + '° south of east'; };
/* the magnitude and direction of a vector given by its east and north parts */
const polar = (x, y) => ({ r: Math.hypot(x, y), deg: Math.atan2(y, x) / RAD });
/* the tip of an arrow of length L at angle deg (counterclockwise from east) drawn from (x, y) on the canvas, where y runs down */
const tip = (x, y, L, deg) => [x + L * cos(deg), y - L * sin(deg)];
/* an arrowhead alone, pointing along deg, for a path drawn as a polyline */
function arrowhead(ctx, x, y, deg, color) {
  const a = -deg * RAD, hl = 18;
  ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(x, y);
  ctx.lineTo(x - hl * Math.cos(a - 0.42), y - hl * Math.sin(a - 0.42)); ctx.lineTo(x - hl * Math.cos(a + 0.42), y - hl * Math.sin(a + 0.42)); ctx.closePath(); ctx.fill(); ctx.restore();
}
/* the compass rose the book draws beside its maps, centred on (x, y) */
function rose(ctx, x, y, r = 40) {
  line(ctx, x - r, y, x + r, y, PAL.ink, 2); arrow(ctx, x, y + r, x, y - r, PAL.ink, 3);
  text(ctx, 'N', x, y - r - 16, PAL.ink, { size: 20, align: 'center', weight: 600 }); text(ctx, 'S', x, y + r + 16, PAL.ink, { size: 20, align: 'center' });
  text(ctx, 'E', x + r + 16, y, PAL.ink, { size: 20, align: 'center' }); text(ctx, 'W', x - r - 16, y, PAL.ink, { size: 20, align: 'center' });
}
/* a grid of city blocks nx east and ny north of the origin (ox, oy), b units to a block, with the axes ticked in blocks */
function cityGrid(ctx, ox, oy, b, nx, ny) {
  ctx.save(); ctx.fillStyle = PAL.soft;
  for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) ctx.fillRect(ox + i * b + b * 0.1, oy - (j + 1) * b + b * 0.1, b * 0.8, b * 0.8);
  ctx.restore();
  arrow(ctx, ox, oy, ox + nx * b + 34, oy, PAL.ink, 2); arrow(ctx, ox, oy, ox, oy - ny * b - 34, PAL.ink, 2);
  for (let i = 0; i <= nx; i++) { line(ctx, ox + i * b, oy - 5, ox + i * b, oy + 5, PAL.ink, 1.5); text(ctx, String(i), ox + i * b, oy + 24, PAL.muted, { size: 17, align: 'center' }); }
  for (let j = 1; j <= ny; j++) { line(ctx, ox - 5, oy - j * b, ox + 5, oy - j * b, PAL.ink, 1.5); text(ctx, String(j), ox - 14, oy - j * b, PAL.muted, { size: 17, align: 'right' }); }
  text(ctx, 'blocks east', ox + nx * b + 46, oy, PAL.ink, { size: 17, align: 'left' });
  text(ctx, 'blocks north', ox + 12, oy - ny * b - 30, PAL.ink, { size: 17, align: 'left' });
}
/* a ruler laid along a line from (x, y) at angle deg, lenPx long, with a tick every unitPx and a number every `every` units;
   side 1 lays it on the left of the line as one walks along it, side -1 on the right */
function ruler(ctx, x, y, deg, lenPx, unitPx, every, side = 1, offset = 22, mul = 1) {
  const h = 34, top = side > 0 ? -offset - h : offset, edge = side > 0 ? top + h : top, far = side > 0 ? top + 13 : top + h - 13;
  ctx.save(); ctx.translate(x, y); ctx.rotate(-deg * RAD);
  ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2;
  ctx.fillRect(-16, top, lenPx + 32, h); ctx.strokeRect(-16, top, lenPx + 32, h);
  const n = Math.floor(lenPx / unitPx + 1e-6);
  for (let k = 0; k <= 2 * n; k++) {
    const px = (k * unitPx) / 2, big = k % 2 === 0, len = big ? 11 : 6;
    line(ctx, px, edge, px, edge + (side > 0 ? -len : len), PAL.ink, big ? 2 : 1.2);
    if (big && (k / 2) % every === 0) text(ctx, String((k / 2) * mul), px, far, PAL.ink, { size: 14, align: 'center' });
  }
  ctx.restore();
}
/* a protractor at (x, y): a half disc on the side of the angle, ticks every 10°, and the angle swept from the east-west line;
   the label is placed by the caller so that it never mirrors */
function protractor(ctx, x, y, r, deg) {
  const below = deg < 0, sgn = below ? 1 : -1, a = Math.abs(deg);
  ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI, !below); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
  for (let k = 0; k <= 18; k++) {
    const t = k * 10 * RAD, big = k % 3 === 0, len = big ? 14 : 8;
    line(ctx, x + r * Math.cos(t), y + sgn * r * Math.sin(t), x + (r - len) * Math.cos(t), y + sgn * (r - len) * Math.sin(t), PAL.muted, big ? 2 : 1.2);
  }
  if (a > 0.05) { ctx.save(); ctx.strokeStyle = C('angle'); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 0.5, 0, sgn * a * RAD, !below); ctx.stroke(); ctx.restore(); }
}
/* the walker seen from above, as the map is, facing along the leg; `deg` is the leg's direction */
const walker = (ctx, x, y, deg, color) => F.personTop(ctx, x, y, 1, -deg * RAD, color);
/* a sailing boat whose waterline is centred on (x, y) */
function boat(ctx, x, y, color, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-38, 0); ctx.lineTo(40, 0); ctx.lineTo(30, 14); ctx.quadraticCurveTo(0, 20, -26, 14); ctx.closePath(); ctx.fill();   /* the hull */
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -56); ctx.stroke();   /* the mast */
  ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.moveTo(3, -52); ctx.lineTo(34, -8); ctx.lineTo(3, -8); ctx.closePath(); ctx.fill(); ctx.stroke();   /* the mainsail */
  ctx.beginPath(); ctx.moveTo(-3, -44); ctx.lineTo(-30, -8); ctx.lineTo(-3, -8); ctx.closePath(); ctx.fill(); ctx.stroke();   /* the jib */
  ctx.restore();
}
/* a dock: a short pier on two posts, its landing end at (x, y) */
function dock(ctx, x, y, color) {
  ctx.save(); ctx.fillStyle = color; ctx.fillRect(x - 10, y - 8, 96, 12);
  for (const px of [x + 4, x + 38, x + 72]) { ctx.fillRect(px, y + 4, 7, 26); }
  ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 10, y - 8); ctx.lineTo(x - 10, y - 34); ctx.moveTo(x + 86, y - 8); ctx.lineTo(x + 86, y - 34); ctx.stroke();   /* two mooring posts */
  ctx.restore();
}
/* the three legs of Example 3.1 and the two of Example 3.2, as the book gives them */
const WALK_DEG = [49, 15, -68];
const ORDERS = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
const NAMES = ['A', 'B', 'C'];

/* a number wearing a type's colour in a readout */
const kp = (s) => '\\htmlClass{kv-position}{' + s + '}', ka = (s) => '\\htmlClass{kv-angle}{' + s + '}';
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const blocks = (n) => fmt(n, 0) + (n === 1 ? ' block' : ' blocks');
/* an arc of an angle from a0 to a1 degrees (counterclockwise from east) about (x, y) */
function arcDeg(ctx, x, y, r, a0, a1, color, w = 3) {
  if (Math.abs(a1 - a0) < 0.05) return;
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.beginPath(); ctx.arc(x, y, r, -a0 * RAD, -a1 * RAD, a1 > a0); ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 3.10 (and 3.11 to 3.13): the head-to-tail method, step by step.
   A story slider carries the book's steps: the first vector, the second
   from its head, the resultant from first tail to last head, and the ruler
   and protractor that measure it.
===================================================================== */
(function () {
  const HH = 790;
  const d = sim('sim-head-to-tail', HH);
  const E = ctl(d.controls, { label: '\\text{blocks east}', cls: 'position', key: 'east', min: 1, max: 12, step: 1, value: 9, unit: '', dec: 0, aria: 'blocks east' });
  const N = ctl(d.controls, { label: '\\text{blocks north}', cls: 'position', key: 'north', min: 1, max: 8, step: 1, value: 5, unit: '', dec: 0, aria: 'blocks north' });
  const K = ctl(d.controls, { label: '\\text{step}', cls: '', key: 'step', min: 0, max: 4, step: 0.01, value: 4, unit: '', dec: 2, aria: 'step of the head-to-tail method' });
  F.story(d, K, { stops: [{ v: 0, label: 'start' }, { v: 1, label: 'Step 1' }, { v: 2, label: 'Step 2' }, { v: 3, label: 'Step 4' }, { v: 4, label: 'Steps 5, 6' }] });
  /* 72 units to a block, fixed: the grid holds the longest walk the sliders allow, 12 blocks east and 8 north */
  const ox = 240, oy = 700, b = 72;
  function draw() {
    const { ctx } = begin(d.c);
    const e = E.v, n = N.v, k = K.v, p1 = clamp01(k), p2 = clamp01(k - 1), p3 = clamp01(k - 2), p4 = clamp01(k - 3);
    const { r, deg } = polar(e, n), ex = ox + e * b, ny = oy - n * b, cp = C('position');
    cityGrid(ctx, ox, oy, b, 12, 8);
    rose(ctx, 1290, 190, 44);
    /* steps 5 and 6: the ruler along the resultant and the protractor at its tail, under the arrows */
    if (p4 > 0) F.faded(ctx, p4, [0, (1 - p4) * -18], () => { protractor(ctx, ox, oy, 120, deg); ruler(ctx, ox, oy, deg, r * b + b * 0.4, b, 1, deg > 45 ? -1 : 1, 26); });
    /* step 1: the first vector; step 2: the second, from its head */
    if (p1 > 0.01) arrow(ctx, ox, oy, ox + p1 * e * b, oy, cp, 6);
    if (p2 > 0.01) arrow(ctx, ex, oy, ex, oy - p2 * n * b, cp, 6);
    /* step 4: the resultant, from the tail of the first to the head of the last */
    if (p3 > 0.01) { const [hx, hy] = tip(ox, oy, p3 * r * b, deg); arrow(ctx, ox, oy, hx, hy, cp, 7); }
    /* the walker, until the walk is done */
    if (k < 2.4) F.faded(ctx, clamp01((2.4 - k) / 0.4), [0, 0], () => walker(ctx, ox + p1 * e * b, oy - p2 * n * b, p2 > 0 ? 90 : 0, F.ref('city-walker')));
    dot(ctx, ox, oy, PAL.ink, true, 7);
    if (p1 >= 1) text(ctx, blocks(e) + ' east', ox + e * b * 0.62, oy + 58, cp, { weight: 600, size: 22, align: 'center', bg: PAL.panel });
    if (p2 >= 1) text(ctx, blocks(n) + ' north', ex + 22, oy - n * b * 0.4, cp, { weight: 600, size: 22, align: 'left', bg: PAL.panel });
    if (p3 >= 1) { const s = deg > 45 ? -1 : 1; text(ctx, 'D', ox + 0.6 * r * b * cos(deg) + s * 30 * sin(deg), oy - 0.6 * r * b * sin(deg) + s * 30 * cos(deg), cp, { weight: 700, size: 28, align: 'center', bg: PAL.panel }); }
    if (p4 >= 1) { const a = deg / 2, R = 176; text(ctx, 'θ = ' + fmt(deg, 1) + '°', ox + R * cos(a) + (deg < 14 ? 60 : 0), oy - R * sin(a) - (deg < 14 ? 34 : 0), C('angle'), { weight: 600, size: 22, align: 'left', bg: PAL.panel }); }
    text(ctx, 'starting point', ox - 16, oy + 58, PAL.muted, { size: 17, align: 'right' });
    const cur = k <= 1 ? 0 : k <= 2 ? 1 : k <= 3 ? 2 : 3;
    topline(ctx, cur === 0 ? 'Step 1: draw the first vector, ' + blocks(e) + ' to the east.'
      : cur === 1 ? 'Step 2: draw the second vector, ' + blocks(n) + ' to the north, with its tail at the head of the first.'
        : cur === 2 ? 'Step 4: draw the resultant from the tail of the first vector to the head of the last.'
          : 'Steps 5 and 6: the ruler reads ' + fmt(r, 1) + ' blocks along $\\mathbf{D}$ and the protractor reads ' + fmt(deg, 1) + '°.');
    tex(d.readout, `\\mathbf{D} = ${kp(fmt(e, 0))}\\ \\text{${e === 1 ? 'block' : 'blocks'} east} + ${kp(fmt(n, 0))}\\ \\text{${n === 1 ? 'block' : 'blocks'} north} = ${kp(fmt(r, 1))}\\ \\text{blocks at}\\ ${ka(fmt(deg, 1) + '^\\circ')}\\ \\text{north of east}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 3.14 (and 3.15 to 3.18): Example 3.1, the woman who takes a walk.
   On the left the three displacements as the example gives them; on the
   right the same three laid head to tail in the order chosen, the resultant
   measured with a ruler and a protractor turned upside down. A change of
   order glides each leg to its new place while the resultant holds.
===================================================================== */
(function () {
  const HH = 850;
  const d = sim('sim-walk', HH);
  const O = F.choice(d.controls, { label: '\\text{order}', key: 'order', options: ORDERS.map((o, i) => ({ value: String(i), label: o.map((j) => NAMES[j]).join(' + ') })), value: '0', aria: 'order of addition' });
  /* 12 units to the metre, fixed: in every order the walk stays within 51 m east, 25 m north and 30 m south of the start */
  const MAG = [25, 23, 32], S = 12, ox = 540, oy = 440, S1 = 5.4;
  const GIVEN = [[70, 330], [70, 470], [70, 560]];
  function tails(order) {
    const out = [0, 0, 0, 0, 0, 0]; let px = ox, py = oy;
    for (const i of order) { out[2 * i] = px; out[2 * i + 1] = py; [px, py] = tip(px, py, MAG[i] * S, WALK_DEG[i]); }
    return out;
  }
  function draw() {
    const { ctx } = begin(d.c);
    const k = Number(O.value), cp = C('position'), at = O.mix((v) => tails(ORDERS[Number(v)]));
    const refA = O.from === O.value ? (k !== 0 ? 1 : 0) : k === 0 ? 1 - O.k : O.from === '0' ? O.k : 1;
    const hl = topline(ctx, k === 0 ? 'Laid head to tail as $\\mathbf{A}$, $\\mathbf{B}$, $\\mathbf{C}$, the walk ends ' + '50.8 m from the start, 5.47° south of east.'
      : 'Added as ' + ORDERS[k].map((i) => '$\\mathbf{' + NAMES[i] + '}$').join(', ') + ', the walk ends at the same point.');
    const lab = labeller(ctx, HH, { headline: hl });
    /* the three displacements as given, each from its own east line */
    GIVEN.forEach(([gx, gy], i) => {
      const [hx, hy] = tip(gx, gy, MAG[i] * S1, WALK_DEG[i]);
      line(ctx, gx - 10, gy, gx + 230, gy, PAL.rule, 2);
      arcDeg(ctx, gx, gy, 58, 0, WALK_DEG[i], C('angle'));
      arrow(ctx, gx, gy, hx, hy, cp, 5);
      const sg = WALK_DEG[i] > 0 ? -1 : 1;
      text(ctx, 'θ_' + NAMES[i] + ' = ' + fmt(Math.abs(WALK_DEG[i]), 1) + '°', gx + 74, gy + sg * (i === 1 ? -20 : 24), C('angle'), { size: 20, weight: 600, align: 'left', bg: PAL.panel });
      text(ctx, NAMES[i] + ' = ' + fmt(MAG[i], 1) + ' m', hx + 16, hy + (i === 2 ? 4 : -10), cp, { size: 22, weight: 600, align: 'left', bg: PAL.panel });
    });
    text(ctx, 'east', 300, GIVEN[0][1] + 18, PAL.muted, { size: 17, align: 'right' });
    /* the sum: the east line through the start, the measuring tools, then the arrows over them */
    line(ctx, ox - 40, oy, 1330, oy, PAL.rule, 2); text(ctx, 'east', 1330, oy - 16, PAL.muted, { size: 17, align: 'right' });
    rose(ctx, 1300, 180, 40);
    const ex = ox + 50.605 * S, ey = oy + 4.849 * S, r = 50.84, deg = -5.47;
    protractor(ctx, ox, oy, 104, deg);
    ruler(ctx, ox, oy, deg, 56 * S, 10 * S, 1, -1, 26, 10);
    arcDeg(ctx, ox, oy, 250, 0, deg, C('angle'), 3);
    text(ctx, 'θ = 5.47°', ox + 262, oy - 20, C('angle'), { size: 22, weight: 600, align: 'left', bg: PAL.panel });
    if (refA > 0) { let px = ox, py = oy; for (const i of ORDERS[0]) { const [hx, hy] = tip(px, py, MAG[i] * S, WALK_DEG[i]); arrow(ctx, px, py, hx, hy, alpha(PAL.ink, 0.4 * refA), 3); px = hx; py = hy; } }
    arrow(ctx, ox, oy, ex, ey, cp, 8);
    [0, 1, 2].forEach((i) => {
      const px = at[2 * i], py = at[2 * i + 1], [hx, hy] = tip(px, py, MAG[i] * S, WALK_DEG[i]);
      arrow(ctx, px, py, hx, hy, cp, 5);
      const L = MAG[i] * S, nx = (hy - py) / L, ny = -(hx - px) / L, out = (ox + 25 * S - (px + hx) / 2) * nx + (oy - (py + hy) / 2) * ny > 0 ? -1 : 1;
      lab.add(NAMES[i], (px + hx) / 2, (py + hy) / 2, nx * out, ny * out, cp, 26, 26);
    });
    text(ctx, 'R = 50.8 m', ex + 26, ey + 6, cp, { size: 24, weight: 600, align: 'left', bg: PAL.panel });
    dot(ctx, ox, oy, PAL.ink, true, 7); dot(ctx, ex, ey, PAL.ink, true, 7);
    text(ctx, 'start', ox - 16, oy - 20, PAL.muted, { size: 17, align: 'right' });
    lab.flush();
    if (k !== 0) F.legend(ctx, { l: 1000, t: 760, r: 1384, b: 830 }, [{ s: 'the walk as A, B, C', color: alpha(PAL.ink, 0.4), w: 3 }], { corner: 'br', panel: false });
    const lhs = ORDERS[k].map((i) => '\\mathbf{' + NAMES[i] + '}').join(' + ');
    tex(d.readout, (k === 0 ? lhs : lhs + ' = \\mathbf{A} + \\mathbf{B} + \\mathbf{C}') + ` = \\mathbf{R} = ${kp('50.8')}\\ \\text{m at}\\ ${ka('5.47^\\circ')}\\ \\text{south of east}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 3.19 (and 3.20 to 3.23): the negative of a vector and Example
   3.2, the woman sailing a boat. On the left B and its negative from one
   point; on the right A, then B to the dock and −B to where she ends up,
   with both resultants from the starting point.
===================================================================== */
(function () {
  const HH = 800;
  const d = sim('sim-subtraction', HH);
  const B = ctl(d.controls, { label: '\\kB', cls: 'position', min: 10, max: 35, step: 0.5, value: 30, unit: 'm', dec: 1, aria: 'second leg' });
  const TB = ctl(d.controls, { label: '\\ktheta_{\\text{B}}', cls: 'angle', min: 0, max: 180, step: 1, value: 112, unit: '°', dec: 0, aria: 'direction of B, north of east' });
  /* A is the example's 27.5 m at 66.0° north of east. Nine units to the metre, fixed: B and −B reach at most 35 m
     from the head of A, which the stage holds on every side. */
  const AM = 27.5, AD = 66, S = 9, ox = 700, oy = 655, S2 = 4.6, px = 225, py = 440;
  function draw() {
    const { ctx } = begin(d.c);
    const cp = C('position'), ca = C('angle'), tb = TB.v, bm = B.v;
    const [ax, ay] = tip(ox, oy, AM * S, AD), [bx, by] = tip(ax, ay, bm * S, tb), [nx, ny] = tip(ax, ay, bm * S, tb + 180);
    const sum = polar((bx - ox) / S, (oy - by) / S), dif = polar((nx - ox) / S, (oy - ny) / S);
    const hl = topline(ctx, 'Sailing $-\\mathbf{B}$ in place of $\\mathbf{B}$ leaves her ' + fmt(2 * bm, 1) + ' m from the dock.');
    const lab = labeller(ctx, HH, { headline: hl });
    /* the negative of a vector: B and −B from one point */
    line(ctx, px - 190, py, px + 190, py, PAL.rule, 2); text(ctx, 'east', px + 190, py + 18, PAL.muted, { size: 17, align: 'right' });
    const [qx, qy] = tip(px, py, bm * S2, tb), [mx, my] = tip(px, py, bm * S2, tb + 180);
    arcDeg(ctx, px, py, 50, 0, tb, ca); arcDeg(ctx, px, py, 66, 0, tb - 180, ca);
    arrow(ctx, px, py, qx, qy, cp, 5); arrow(ctx, px, py, mx, my, cp, 5); dot(ctx, px, py, PAL.ink, true, 6);
    if (tb > 2) lab.add(fmt(tb, 0) + '°', px + 50 * cos(tb / 2), py - 50 * sin(tb / 2), cos(tb / 2), -sin(tb / 2), ca, 20, 20);
    if (tb < 178) lab.add(fmt(180 - tb, 0) + '°', px + 66 * cos((tb - 180) / 2), py - 66 * sin((tb - 180) / 2), cos((tb - 180) / 2), -sin((tb - 180) / 2), ca, 20, 20);
    lab.add('B = ' + fmt(bm, 1) + ' m', qx, qy, cos(tb), -sin(tb), cp, 22, 24);
    lab.add('−B = ' + fmt(bm, 1) + ' m', mx, my, -cos(tb), sin(tb), cp, 22, 24);
    /* the two sums */
    line(ctx, ox - 240, oy, ox + 470, oy, PAL.rule, 2); text(ctx, 'east', ox + 470, oy + 18, PAL.muted, { size: 17, align: 'right' });
    rose(ctx, 1300, 180, 40);
    dock(ctx, bx + 8, by - 12, F.ref('dock')); boat(ctx, nx + 8, ny + 26, F.ref('sailor'), 0.9);
    arrow(ctx, ox, oy, bx, by, cp, 8); arrow(ctx, ox, oy, nx, ny, cp, 8);
    arrow(ctx, ox, oy, ax, ay, cp, 5); arrow(ctx, ax, ay, bx, by, cp, 5); arrow(ctx, ax, ay, nx, ny, cp, 5);
    const side = (s, x1, y1, x2, y2, sgn, size, start, f = 0.5) => { const L = Math.hypot(x2 - x1, y2 - y1) || 1; lab.add(s, x1 + (x2 - x1) * f, y1 + (y2 - y1) * f, ((y2 - y1) / L) * sgn, (-(x2 - x1) / L) * sgn, cp, size, start); };
    side('A', ox, oy, ax, ay, -1, 26, 24, 0.6); side('B', ax, ay, bx, by, -1, 26, 24); side('−B', ax, ay, nx, ny, 1, 26, 24);
    side('R′ = ' + fmt(sum.r, 1) + ' m', ox, oy, bx, by, 1, 22, 28, 0.55); side('R = ' + fmt(dif.r, 1) + ' m', ox, oy, nx, ny, -1, 22, 28, 0.6);
    lab.add('the dock', bx + 60, by - 40, 0.6, -1, F.ref('dock'), 20, 24);
    lab.add('where she ends up', nx + 30, ny + 50, 0.6, 1, F.ref('sailor'), 20, 24);
    dot(ctx, ox, oy, PAL.ink, true, 7); lab.add('start', ox, oy, -1, 0.5, PAL.muted, 17, 22);
    lab.flush();
    const dir = (p) => `${ka(fmt(Math.abs(fold(p.deg)), 1) + '^\\circ')}\\ \\text{${fold(p.deg) >= 0 ? 'north' : 'south'} of east}`;
    tex(d.readout, `\\mathbf{A} - \\mathbf{B} = \\mathbf{A} + (-\\mathbf{B}) = \\mathbf{R} = ${kp(fmt(dif.r, 1))}\\ \\text{m at}\\ ${dir(dif)} \\\\ \\mathbf{A} + \\mathbf{B} = \\mathbf{R}' = ${kp(fmt(sum.r, 1))}\\ \\text{m at}\\ ${dir(sum)}`);
    if (bm === 30 && tb === 112) d.readout.appendChild(el('small', null, 'Measured on its drawing with a ruler and a protractor, the example reads 23.0 m at 7.5° south of east.'));
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: multiplying a vector by a scalar. The first leg of the sailing
   example, 27.5 m at 66.0° north of east, and the same vector times c.
===================================================================== */
(function () {
  const HH = 740;
  const d = sim('sim-scalar', HH);
  const K = ctl(d.controls, { label: 'c', cls: '', key: 'c', min: -3, max: 3, step: 0.5, value: 3, unit: '', dec: 1, aria: 'scalar',
    specials: [{ at: 3, label: 'three times as far' }, { at: -2, label: 'doubled and reversed' }, { at: 0.5, label: 'divided by 2' }] });
  /* 3.9 units to the metre, fixed: 3A is 82.5 m, which the stage holds above and below the east line */
  const AM = 27.5, AD = 66, S = 3.9, o1 = [330, 400], o2 = [900, 400];
  function draw() {
    const { ctx } = begin(d.c);
    const c = K.v, mag = Math.abs(c) * AM, cp = C('position'), ca = C('angle');
    const cs = (c < 0 ? '−' : '') + fmt(Math.abs(c), Number.isInteger(c) ? 0 : 1);
    const hl = topline(ctx, c === 0 ? 'Multiplied by 0, the vector has no length and no direction.'
      : cs + ' × $\\mathbf{A}$ is ' + fmt(mag, 1) + ' m ' + (c < 0 ? 'in the opposite direction, 66.0° south of west.' : 'in the same direction, 66.0° north of east.'));
    const lab = labeller(ctx, HH, { headline: hl });
    for (const [x, y] of [o1, o2]) {
      line(ctx, x - 210, y, x + 230, y, PAL.rule, 2); text(ctx, 'east', x + 230, y + 18, PAL.muted, { size: 17, align: 'right' }); text(ctx, 'west', x - 210, y + 18, PAL.muted, { size: 17, align: 'left' });
      const [ux, uy] = tip(x, y, 330, AD), [vx, vy] = tip(x, y, 330, AD + 180); line(ctx, vx, vy, ux, uy, alpha(PAL.ink, 0.3), 2, [4, 8]);
    }
    const [ax, ay] = tip(o1[0], o1[1], AM * S, AD);
    arcDeg(ctx, o1[0], o1[1], 50, 0, AD, ca); lab.add('66.0°', o1[0] + 50 * cos(33), o1[1] - 50 * sin(33), cos(33), -sin(33), ca, 20, 18);
    arrow(ctx, o1[0], o1[1], ax, ay, cp, 6);
    lab.add('A = 27.5 m', (o1[0] + ax) / 2, (o1[1] + ay) / 2, -sin(AD), -cos(AD), cp, 24, 26);
    text(ctx, '× ' + cs, (o1[0] + o2[0]) / 2, 388, PAL.ink, { size: 40, weight: 600, align: 'center' });
    if (c !== 0) {
      const dg = c < 0 ? AD + 180 : AD, [hx, hy] = tip(o2[0], o2[1], mag * S, dg);
      if (c > 0) { arcDeg(ctx, o2[0], o2[1], 50, 0, AD, ca); lab.add('66.0°', o2[0] + 50 * cos(33), o2[1] - 50 * sin(33), cos(33), -sin(33), ca, 20, 18); }
      else { arcDeg(ctx, o2[0], o2[1], 50, 180, 180 + AD, ca); lab.add('66.0°', o2[0] + 50 * cos(213), o2[1] - 50 * sin(213), cos(213), -sin(213), ca, 20, 18); }
      arrow(ctx, o2[0], o2[1], hx, hy, cp, 6);
      lab.add(cs + 'A = ' + fmt(mag, 1) + ' m', (o2[0] + hx) / 2, (o2[1] + hy) / 2, sin(AD), cos(AD), cp, 24, 26);
    }
    for (const [x, y] of [o1, o2]) dot(ctx, x, y, PAL.ink, true, 7);
    lab.flush();
    tex(d.readout, `|c|\\,\\kA = |${c < 0 ? '{-' + fmt(-c, 1) + '}' : fmt(c, 1)}| \\times ${kp('27.5')}\\ \\text{m} = ${kp(fmt(mag, 1))}\\ \\text{m}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: resolving a vector into components. The reader turns and stretches
   the displacement D on the grid of blocks; the east (or west) and north
   displacements that add to it head to tail are read off the grid.
===================================================================== */
(function () {
  const HH = 770;
  const d = sim('sim-components', HH);
  const D = ctl(d.controls, { label: '\\kD', cls: 'position', min: 1, max: 12, step: 0.1, value: 10.3, unit: 'blocks', dec: 1, aria: 'magnitude in blocks' });
  const TH = ctl(d.controls, { label: '\\ktheta', cls: 'angle', min: 0, max: Math.PI, step: Math.PI / 1800, value: 29 * RAD, unit: '', fmt: (v) => fmt(v / RAD, 1) + '°', aria: 'direction, north of east' });
  const G = F.polar.grip(d, { t: TH, r: D });
  /* 52 units to a block, fixed: 12 blocks east or west of the start and 12 north */
  const b = 52, ox = 700, oy = 672;
  const ax = { X: (v) => ox + v * b, Y: (v) => oy - v * b, box: { l: ox - 12 * b, r: ox + 12 * b, t: oy - 12 * b, b: oy }, xr: [-12, 12], yr: [0, 12] };
  function draw() {
    const { ctx } = begin(d.c);
    const Dm = D.v, th = Math.round((TH.v / RAD) * 10) / 10, cp = C('position'), ca = C('angle');
    const ex = Dm * cos(th), no = Dm * sin(th), [hx, hy] = tip(ox, oy, Dm * b, th), west = ex < -0.05;
    ctx.save(); ctx.fillStyle = PAL.soft;
    for (let i = -12; i < 12; i++) for (let j = 0; j < 12; j++) ctx.fillRect(ox + i * b + b * 0.1, oy - (j + 1) * b + b * 0.1, b * 0.8, b * 0.8);
    ctx.restore();
    line(ctx, ox - 12 * b - 20, oy, ox + 12 * b + 20, oy, PAL.ink, 2); arrow(ctx, ox, oy, ox, oy - 12 * b - 26, PAL.ink, 2);
    for (let i = -12; i <= 12; i += 2) { line(ctx, ox + i * b, oy - 6, ox + i * b, oy + 6, PAL.ink, 1.5); text(ctx, String(Math.abs(i)), ox + i * b, oy + 24, PAL.muted, { size: 17, align: 'center' }); }
    for (let j = 2; j <= 12; j += 2) { line(ctx, ox - 6, oy - j * b, ox + 6, oy - j * b, PAL.ink, 1.5); text(ctx, String(j), ox - 14, oy - j * b, PAL.muted, { size: 17, align: 'right' }); }
    text(ctx, 'blocks west', ox - 12 * b, oy + 56, PAL.ink, { size: 18, align: 'left' }); text(ctx, 'blocks east', ox + 12 * b, oy + 56, PAL.ink, { size: 18, align: 'right' });
    text(ctx, 'blocks north', ox + 14, oy - 12 * b - 14, PAL.ink, { size: 18, align: 'left' });
    protractor(ctx, ox, oy, 96, th);
    /* the two parts, head to tail, then the displacement over them */
    line(ctx, hx, hy, ox, hy, alpha(PAL.ink, 0.35), 2, [4, 8]);
    if (Math.abs(ex) > 0.15) arrow(ctx, ox, oy, ox + ex * b, oy, cp, 5);
    if (no > 0.15) arrow(ctx, ox + ex * b, oy, hx, hy, cp, 5);
    arrow(ctx, ox, oy, hx, hy, cp, 8);
    G.draw(ctx, ax, cp);
    dot(ctx, ox, oy, PAL.ink, true, 7);
    const lab = labeller(ctx, HH);
    lab.add('D = ' + fmt(Dm, 1) + ' blocks', (ox + hx) / 2, (oy + hy) / 2, -sin(th) * (west ? -1 : 1), -cos(th) * (west ? -1 : 1), cp, 24, 30);
    if (Math.abs(ex) > 0.3) text(ctx, fmt(Math.abs(ex), 1) + (west ? ' blocks west' : ' blocks east'), ox + (ex * b) / 2, oy + 58, cp, { weight: 600, size: 22, align: 'center', bg: PAL.panel });
    if (no > 0.3) text(ctx, fmt(no, 1) + ' blocks north', hx + (west ? -18 : 18), oy - (no * b) / 2, cp, { weight: 600, size: 22, align: west ? 'right' : 'left', bg: PAL.panel });
    if (th > 3) lab.add('θ = ' + fmt(th, 1) + '°', ox + 110 * cos(th / 2), oy - 110 * sin(th / 2), cos(th / 2), -sin(th / 2), ca, 22, 22);
    lab.flush();
    tex(d.readout, `\\mathbf{D} = ${kp(fmt(Math.abs(ex), 1))}\\ \\text{blocks ${west ? 'west' : 'east'}} + ${kp(fmt(no, 1))}\\ \\text{blocks north}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE: the map of paths that problems 1 and 2 refer to (and problems 1
   and 2 of section 3.3). A faithful copy: no sliders, no motion.
===================================================================== */
(function () {
  const d = sim('fig-paths', 610);
  const X0 = 320, Y0 = 540, P = 100, G = 18;
  const SX = (i) => X0 + P * i + P - G / 2, SY = (j) => Y0 - P * j + G / 2;   /* the street right of block column i, and below block row j */
  const PATHS = [
    { n: 'A', pts: [[0, 1], [0, 4], [1, 4]], dash: null, label: [385, 330] },
    { n: 'B', pts: [[0, 1], [4, 1], [4, 4], [1, 4]], dash: [18, 12], label: [600, 445] },
    { n: 'C', pts: [[1, 2], [1, 3], [6, 3], [6, 1], [5, 1], [5, 2], [2, 2]], dash: [3, 10], label: [640, 305] },
    { n: 'D', pts: [[1, 2], [1, 0], [7, 0], [7, 4], [6, 4]], dash: [22, 8, 3, 8], label: [545, 545] },
  ];
  function draw() {
    const { ctx } = begin(d.c);
    ctx.save(); ctx.fillStyle = PAL.soft;
    for (let c = 0; c < 8; c++) for (let r = 0; r < 5; r++) ctx.fillRect(X0 + P * c, Y0 - P * r - (P - G), P - G, P - G);
    ctx.restore();
    rose(ctx, 150, 200, 44);
    for (const { n, pts, dash, label } of PATHS) {
      const pc = F.ref('path-' + n.toLowerCase());
      ctx.save(); ctx.strokeStyle = pc; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash);
      ctx.beginPath(); pts.forEach(([i, j], k) => (k ? ctx.lineTo(SX(i), SY(j)) : ctx.moveTo(SX(i), SY(j)))); ctx.stroke(); ctx.restore();
      const [a, b2] = pts, [y, z] = pts.slice(-2), mid = [(SX(a[0]) + SX(b2[0])) / 2, (SY(a[1]) + SY(b2[1])) / 2];
      arrowhead(ctx, mid[0], mid[1], Math.atan2(SY(a[1]) - SY(b2[1]), SX(b2[0]) - SX(a[0])) / RAD, pc);
      arrowhead(ctx, SX(z[0]), SY(z[1]), Math.atan2(SY(y[1]) - SY(z[1]), SX(z[0]) - SX(y[0])) / RAD, pc);
      text(ctx, n, label[0], label[1], pc, { size: 24, weight: 700, align: 'center', bg: PAL.panel });
    }
    dot(ctx, SX(0), SY(1), PAL.ink, true, 8); dot(ctx, SX(1), SY(2), PAL.ink, true, 8);
    line(ctx, 300, SY(1), SX(0) - 14, SY(1), PAL.ink, 2); text(ctx, 'Start', 290, SY(1), PAL.ink, { size: 20, align: 'right' });
    readout(d.readout, '\\text{one block} = 120\\ \\text{m}');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
