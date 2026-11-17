/* Figures for section 4.7 Further Applications of Newton's Laws of Motion.
   Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.7'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, measure, REDUCED, ctl, cycle, register, begin, line, arrow, dot, text, headline, topline, labeller, hbracket, vbracket, strip, axes, block } = F;
const sim = (id, H) => F.sim(root, id, H);
const RAD = Math.PI / 180;
const cos = (deg) => Math.cos(deg * RAD), sin = (deg) => Math.sin(deg * RAD);
const G = 9.80;
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
/* a number in scientific notation for a readout, 4.5 \times 10^{5} */
function sci(v, d = 1) { const e = Math.floor(Math.log10(Math.abs(v))), m = v / Math.pow(10, e); return `${fmt(m, d)}\\times 10^{${e}}`; }
/* a tugboat seen from above, its bow at (x, y) and pointing `heading` degrees
   counterclockwise from +x: the hull with its rubber fender round the bow, and the
   wheelhouse; about 106 by 36 */
function tug(ctx, x, y, heading, color) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-heading * RAD); ctx.lineJoin = 'round';
  ctx.fillStyle = alpha(color, 0.3); ctx.strokeStyle = color; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-100, -18); ctx.lineTo(-18, -18); ctx.arc(-18, 0, 18, -Math.PI / 2, Math.PI / 2); ctx.lineTo(-100, 18); ctx.quadraticCurveTo(-108, 0, -100, -18); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = color; ctx.fillRect(-68, -11, 30, 22);
  ctx.strokeStyle = PAL.ink; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(-18, 0, 16, -1.2, 1.2); ctx.stroke();
  ctx.restore();
}
/* the angle th (radians) above the horizontal at (x, y), between arms at least len long: its name
   centred on the bisector inside the wedge where the wedge is wide and long enough to hold it, and
   otherwise set below the horizontal arm, leadered, by the labeller */
function angleMark(ctx, x, y, r0, th, len, lab, color) {
  const r = Math.min(r0, 0.55 * len);
  F.angleArc(ctx, { x, y }, r, 0, th, '', null, color);
  const m = th / 2, s = fmt(th / RAD, 1) + '°';
  if (th < 30 * RAD || r + 30 > len) { lab.add(s, x + r * Math.cos(m), y - r * Math.sin(m), 0.45, 0.9, color, 20, 30); return; }
  const cx = x + (r + 30) * Math.cos(m), cy = y - (r + 30) * Math.sin(m), hw = measure(ctx, s, { size: 20, weight: 600 }) / 2 + 7;
  lab.place({ l: cx - hw, t: cy - 14, r: cx + hw, b: cy + 14 });
  text(ctx, s, cx, cy, color, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
}
/* a cargo barge seen from above, centred on (x, y), w long and h wide, with four hatches */
function barge(ctx, x, y, w, h, color) {
  ctx.save(); ctx.fillStyle = alpha(color, 0.14); ctx.strokeStyle = color; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 10); ctx.fill(); ctx.stroke();
  ctx.fillStyle = alpha(color, 0.3);
  for (let i = 0; i < 4; i++) ctx.fillRect(x - w / 2 + 18 + i * (w - 36) / 4 + 6, y - h / 2 + 16, (w - 36) / 4 - 12, h - 32);
  ctx.restore();
}
/* a traffic light hanging from (x, y): the housing and its three lamps, 44 by 88. The lamps are the
   red, amber and green of a real signal (the colour is the fact, F.fact) */
const LAMPS = ['#d6402f', '#e8a92c', '#3fa650'];
function trafficLight(ctx, x, y, color) {
  ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = PAL.soft; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.roundRect(x - 22, y, 44, 88, 6); ctx.fill(); ctx.stroke();
  LAMPS.forEach((c, i) => { ctx.fillStyle = F.fact(c); ctx.beginPath(); ctx.arc(x, y + 20 + 24 * i, 9, 0, Math.PI * 2); ctx.fill(); });
  ctx.restore();
}

/* =====================================================================
   FIGURE 4.21: the barge. Two tugboats push at right angles, seen from
   above, and beside the scene the book's vector triangle to scale: F_x
   and F_y head to tail, their sum F_app, and along it the part that
   accelerates the barge (F_net = ma) and the part the water takes back
   (F_D). Still: the drag follows from the two pushes, the mass and the
   observed acceleration, and nothing in the idea runs on a clock.
===================================================================== */
(function () {
  const H = 720;
  const d = sim('sim-barge', H);
  const fx = ctl(d.controls, { label: '\\kFx', cls: 'force', min: 1, max: 5, step: 0.1, value: 2.7, unit: '×10⁵ N', dec: 1, aria: 'force of the first tugboat' });
  const fy = ctl(d.controls, { label: '\\kFy', cls: 'force', min: 1, max: 5, step: 0.1, value: 3.6, unit: '×10⁵ N', dec: 1, aria: 'force of the second tugboat' });
  const mm = ctl(d.controls, { label: '\\km', cls: 'mass', min: 2, max: 8, step: 0.1, value: 5, unit: '×10⁶ kg', dec: 1, aria: 'mass of the barge' });
  const ac = ctl(d.controls, { label: '\\ka', cls: 'acceleration', min: 0, max: 0.15, step: 0.005, value: 0.075, unit: 'm/s²', dec: 3, aria: 'acceleration of the barge' });
  /* one scale for the pushes in the scene, 44 units to 10⁵ N, and one for the triangle, 75 units
     to 10⁵ N, so the largest push (5 × 10⁵ N) is 375 units of its panel */
  const K = 44, K2 = 75, OFF = 30;
  function draw() {
    const { ctx } = begin(d.c);
    const fc = C('force'), acc = C('acceleration'), ang = C('angle');
    /* forces in units of 10⁵ N, each rounded to 10³ N so the readout's numbers add up as shown */
    const app = Math.round(100 * Math.hypot(fx.v, fy.v)) / 100, th = Math.atan2(fy.v, fx.v);
    const ma = Math.round(1000 * mm.v * ac.v) / 100, drag = Math.round(100 * (app - ma)) / 100, ok = drag >= 0;
    const rows = topline(ctx, ok && ma === 0
      ? 'The barge is not accelerating, so the water drags back with all $' + fmt(app, 2) + ' \\times 10^{5}$ N the tugs push with'
      : ok
      ? 'Of the $' + fmt(app, 2) + ' \\times 10^{5}$ N the tugs push with, $' + fmt(ma, 2) + ' \\times 10^{5}$ N accelerates the barge and the water drags back with the other $' + fmt(drag, 2) + ' \\times 10^{5}$ N'
      : 'To accelerate $' + fmt(mm.v, 1) + ' \\times 10^{6}$ kg at $' + fmt(ac.v, 3) + '$ m/s² takes $' + fmt(ma, 2) + ' \\times 10^{5}$ N, more than the tugs push with');
    const lab = labeller(ctx, H, { headline: rows });
    text(ctx, '(a) seen from above', 60, 132, PAL.muted, { size: 19 });
    text(ctx, '(b) the forces on the barge, to scale', 760, 132, PAL.muted, { size: 19 });
    lab.block(50, 116, 260, 146); lab.block(750, 116, 1120, 146);
    /* (a) the scene: the barge, the first tug's bow on its stern, the second's on its side */
    const bx = 350, by = 410, BL = 380, BH = 120;
    barge(ctx, bx, by, BL, BH, F.ref('barge'));
    tug(ctx, bx - BL / 2, by, 0, F.ref('tug-1'));
    tug(ctx, bx + 60, by + BH / 2, 90, F.ref('tug-2'));
    lab.place({ l: bx - BL / 2, t: by - BH / 2, r: bx + BL / 2, b: by + BH / 2 });
    lab.place({ l: bx - BL / 2 - 108, t: by - 20, r: bx - BL / 2, b: by + 20 });
    lab.place({ l: bx + 40, t: by + BH / 2, r: bx + 80, b: by + BH / 2 + 108 });
    /* each push is drawn from the bow it leaves, on into the hull it pushes */
    const sx = bx - BL / 2, sy = by + BH / 2, ex = sx + fx.v * K, ey = sy - fy.v * K;
    lab.halo({ x1: sx, y1: by, x2: ex, y2: by }); arrow(ctx, sx, by, ex, by, fc, 5);
    lab.halo({ x1: bx + 60, y1: sy, x2: bx + 60, y2: ey }); arrow(ctx, bx + 60, sy, bx + 60, ey, fc, 5);
    lab.place({ l: sx, t: by - 8, r: ex + 4, b: by + 8 }); lab.place({ l: bx + 52, t: ey - 4, r: bx + 68, b: sy });
    lab.add('F_x = ' + fmt(fx.v, 1) + ' × 10⁵ N', sx - 50, by + 20, 0, 1, fc, 20, 28);
    lab.add('F_y = ' + fmt(fy.v, 1) + ' × 10⁵ N', bx + 80, by + BH / 2 + 70, 1, 0, fc, 20, 26);
    lab.add('the barge', bx - 110, by - BH / 2, 0, -1, F.ref('barge'), 19, 22);
    /* the acceleration leaves the top of the hull along the resultant, at most 115 units long
       so its head and its name stay inside panel (a) */
    if (ac.v > 0.0001) {
      const al = 40 + 500 * ac.v, ax0 = bx + 150, ay0 = by - BH / 2;
      const ahx = ax0 + al * Math.cos(th), ahy = ay0 - al * Math.sin(th);
      arrow(ctx, ax0, ay0, ahx, ahy, acc, 5);
      angleMark(ctx, ax0, ay0, 34, th, al, lab, ang);
      lab.add('a = ' + fmt(ac.v, 3) + ' m/s²', ahx, ahy, 0, -1, acc, 20, 16);
    }
    /* (b) the book's triangle: F_x and F_y head to tail, F_app from the tail of the first to the
       head of the second; one step to the side of it, F_net = ma from the tail and the drag back
       from the head, which between them make up F_app */
    const ox = 860, oy = 640, hx = ox + fx.v * K2, hy = oy - fy.v * K2;
    const ux = Math.cos(th), uy = -Math.sin(th), nx = -Math.sin(th), ny = -Math.cos(th);
    arrow(ctx, ox, oy, hx, oy, fc, 4); arrow(ctx, hx, oy, hx, hy, fc, 4);
    arrow(ctx, ox, oy, hx, hy, fc, 6);
    lab.place({ l: ox, t: oy - 6, r: hx, b: oy + 6 }); lab.place({ l: hx - 6, t: hy, r: hx + 6, b: oy });
    angleMark(ctx, ox, oy, 64, th, Math.min(fx.v, app) * K2, lab, ang);
    const qx = ox + OFF * nx, qy = oy + OFF * ny;                       /* the tail of the offset line */
    if (ok) {
      const nl = ma * K2, al = app * K2;
      const mx = qx + nl * ux, my = qy + nl * uy, tx = qx + al * ux, ty = qy + al * uy;
      if (ma > 0) {
        arrow(ctx, qx, qy, mx, my, fc, 5);
        lab.beside({ x1: qx, y1: qy, x2: mx, y2: my }, 'left', 'F_net = ma = ' + fmt(ma, 2) + ' × 10⁵ N', fc, 20, { gap: 20 });
      }
      if (drag > 0) {
        arrow(ctx, tx, ty, mx, my, fc, 5);
        lab.beside({ x1: tx, y1: ty, x2: mx, y2: my }, 'right', 'F_D = ' + fmt(drag, 2) + ' × 10⁵ N', fc, 20, { gap: 20 });
      }
    } else {
      /* the net force this acceleration needs, cut off where it would leave the panel */
      const nl = Math.min(ma * K2, (1340 - qx) / ux, (qy - 170) / -uy);
      line(ctx, qx, qy, qx + nl * ux, qy + nl * uy, fc, 5, [12, 8]);
      lab.beside({ x1: qx, y1: qy, x2: qx + nl * ux, y2: qy + nl * uy }, 'left', 'ma = ' + fmt(ma, 2) + ' × 10⁵ N', fc, 20, { gap: 20 });
    }
    dot(ctx, ox, oy, F.ref('barge'), true, 8);
    lab.add('F_app = ' + fmt(app, 2) + ' × 10⁵ N', hx, hy, 0.5, -0.87, fc, 20, 22);
    text(ctx, 'F_x', (ox + hx) / 2 + 30, oy + 28, fc, { size: 22, weight: 600, align: 'center' });
    text(ctx, 'F_y', hx + 18, (oy + hy) / 2, fc, { size: 22, weight: 600 });
    lab.flush();
    const A = sci(app * 1e5, 2), B = ma > 0 ? sci(ma * 1e5, 2) + '\\ \\text{N}' : '0';
    const sum = `\\kFa = \\sqrt{\\kFx^{2} + \\kFy^{2}} = \\sqrt{(${fmt(fx.v, 1)})^{2} + (${fmt(fy.v, 1)})^{2}}\\times 10^{5}\\ \\text{N} = ${A}\\ \\text{N}`;
    tex(d.readout, sum + '\\\\' + (ok
      ? `\\kFD = \\kFa - \\km\\ka = ${A}\\ \\text{N} - ${B} = ${drag > 0 ? sci(drag * 1e5, 2) + '\\ \\text{N}' : '0'}`
      : `\\kFa - \\km\\ka = ${A}\\ \\text{N} - ${B} < 0`));
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 4.22: the traffic light. Two poles of one height, the light
   hung between them from two wires that meet the horizontal at unequal
   angles, with the two tensions and their dashed components on the knot
   and the weight on the light; beside the scene the book's part (e), the
   same forces as their x and y parts on the same scale. Still: the
   light hangs at rest, so there is no time in the idea.
===================================================================== */
(function () {
  const H = 735;
  const d = sim('sim-traffic-light', H);
  const t1 = ctl(d.controls, { label: '\\ktheta_1', cls: 'angle', min: 20, max: 50, step: 0.5, value: 30, unit: '°', dec: 1, specials: [{ at: () => t2.v, label: 'equal angles' }], aria: 'angle of the left wire above the horizontal' });
  const t2 = ctl(d.controls, { label: '\\ktheta_2', cls: 'angle', min: 20, max: 50, step: 0.5, value: 45, unit: '°', dec: 1, specials: [{ at: () => t1.v, label: 'equal angles' }], aria: 'angle of the right wire above the horizontal' });
  /* the book's light: 15.0 kg, so w = 147 N. Every force arrow of both panels is on one scale,
     170 units to the weight; the angles stop at 20°, where each tension is 1.46 w (248 units,
     inside the 266 units of wire) and each horizontal part 1.37 w, and at 50°, where the knot
     hangs lowest */
  const M = 15, W = M * G, S = 170 / W;
  const XL = 100, XR = 600, YT = 130, GY = 708;
  function draw() {
    const { ctx } = begin(d.c);
    const fc = C('force'), ang = C('angle'), th1 = t1.v * RAD, th2 = t2.v * RAD;
    const sm = Math.sin(th1 + th2), T1 = W * Math.cos(th2) / sm, T2 = W * Math.cos(th1) / sm;
    const Tx = T1 * Math.cos(th1), T1y = T1 * Math.sin(th1), T2y = W - T1y;
    const same = Math.abs(t1.v - t2.v) < 0.01;
    const rows = topline(ctx, same
      ? 'With both wires at ' + fmt(t1.v, 1) + '° each carries ' + fmt(T1, 0) + ' N and holds up half of the ' + fmt(W, 0) + ' N weight'
      : 'At ' + fmt(t1.v, 1) + '° and ' + fmt(t2.v, 1) + '° the wires carry ' + fmt(T1, 0) + ' N and ' + fmt(T2, 0) + ' N: the steeper wire holds up more of the ' + fmt(W, 0) + ' N weight');
    const lab = labeller(ctx, H, { headline: rows });
    /* the scene: the two poles stay put and the knot hangs where the two angles put it */
    const h = (XR - XL) / (1 / Math.tan(th1) + 1 / Math.tan(th2)), kx = XL + h / Math.tan(th1), ky = YT + h;
    strip(ctx, 40, 660, GY, 24);
    [XL, XR].forEach((x) => { line(ctx, x, YT, x, GY - 12, PAL.muted, 9); ctx.save(); ctx.fillStyle = PAL.muted; ctx.fillRect(x - 20, GY - 40, 40, 28); ctx.restore(); });
    line(ctx, XL, YT, kx, ky, F.ref('wire-1'), 4); line(ctx, kx, ky, XR, YT, F.ref('wire-2'), 4);
    line(ctx, kx - 190, ky, kx + 190, ky, alpha(PAL.ink, 0.35), 2, [10, 10]);
    trafficLight(ctx, kx, ky, F.ref('light'));
    F.angleArc(ctx, { x: kx, y: ky }, 62, Math.PI - th1, Math.PI, '', null, ang);
    F.angleArc(ctx, { x: kx, y: ky }, 62, 0, th2, '', null, ang);
    text(ctx, fmt(t1.v, 1) + '°', kx - 104, ky + 22, ang, { size: 20, weight: 600, align: 'center' });
    text(ctx, fmt(t2.v, 1) + '°', kx + 104, ky + 22, ang, { size: 20, weight: 600, align: 'center' });
    lab.block(kx - 140, ky + 8, kx + 140, ky + 36); lab.block(kx - 24, ky, kx + 24, ky + 90);
    /* the tensions leave the knot along their wires, each with its two parts dashed */
    const h1x = kx - T1 * S * Math.cos(th1), h1y = ky - T1 * S * Math.sin(th1);
    const h2x = kx + T2 * S * Math.cos(th2), h2y = ky - T2 * S * Math.sin(th2);
    line(ctx, kx, ky, h1x, ky, fc, 3, [8, 8]); line(ctx, h1x, ky, h1x, h1y, fc, 3, [8, 8]);
    line(ctx, kx, ky, h2x, ky, fc, 3, [8, 8]); line(ctx, h2x, ky, h2x, h2y, fc, 3, [8, 8]);
    arrow(ctx, kx, ky, h1x, h1y, fc, 5); arrow(ctx, kx, ky, h2x, h2y, fc, 5);
    const wy0 = ky + 88, wy1 = wy0 + W * S;
    arrow(ctx, kx, wy0, kx, wy1, fc, 5);
    dot(ctx, kx, ky, PAL.ink, true, 6);
    lab.add('T_1 = ' + fmt(T1, 0) + ' N', h1x, h1y, 0.35, -0.94, fc, 20, 26);
    lab.add('T_2 = ' + fmt(T2, 0) + ' N', h2x, h2y, -0.35, -0.94, fc, 20, 26);
    lab.add('w = ' + fmt(W, 0) + ' N', kx, wy1 - 16, 1, 0, fc, 20, 18);
    /* the book's part (e): the same forces as their parts along x and y, on the same scale */
    const cx = 1050, cy = 410;
    text(ctx, 'the same forces, as their horizontal and vertical parts', cx, 132, PAL.muted, { size: 19, align: 'center' });
    const lx = Tx * S, y1 = cy - T1y * S, y2 = cy - W * S;
    arrow(ctx, cx, cy, cx - lx, cy, fc, 5); arrow(ctx, cx, cy, cx + lx, cy, fc, 5);
    arrow(ctx, cx, cy, cx, y1, fc, 5); arrow(ctx, cx, y1, cx, y2, fc, 5);
    arrow(ctx, cx, cy, cx, cy + W * S, fc, 5);
    dot(ctx, cx, cy, F.ref('light'), true, 8);
    text(ctx, 'T_{1x} = ' + fmt(Tx, 1) + ' N', cx - 16, cy + 30, fc, { size: 20, weight: 600, align: 'right' });
    text(ctx, 'T_{2x} = ' + fmt(Tx, 1) + ' N', cx + 16, cy + 30, fc, { size: 20, weight: 600 });
    const ly1 = Math.min((cy + y1) / 2, cy - 24), ly2 = Math.min((y1 + y2) / 2, ly1 - 30);
    text(ctx, 'T_{1y} = ' + fmt(T1y, 1) + ' N', cx + 18, ly1, fc, { size: 20, weight: 600 });
    text(ctx, 'T_{2y} = ' + fmt(T2y, 1) + ' N', cx + 18, ly2, fc, { size: 20, weight: 600 });
    text(ctx, 'w = ' + fmt(W, 1) + ' N', cx + 18, cy + W * S - 14, fc, { size: 20, weight: 600 });
    /* the two up parts against the weight they hold */
    vbracket(ctx, cx - 262, y2, cy, alpha(PAL.ink, 0.5), 'up, ' + fmt(W, 1) + ' N', -1, { size: 19 });
    vbracket(ctx, cx - 262, cy, cy + W * S, alpha(PAL.ink, 0.5), 'down, ' + fmt(W, 1) + ' N', -1, { size: 19 });
    lab.flush();
    tex(d.readout, `\\kTone\\cos\\ktheta_1 = (${fmt(T1, 1)}\\ \\text{N})\\cos ${fmt(t1.v, 1)}^\\circ = ${fmt(Tx, 1)}\\ \\text{N} = (${fmt(T2, 1)}\\ \\text{N})\\cos ${fmt(t2.v, 1)}^\\circ = \\kTtwo\\cos\\ktheta_2`
      + `\\\\\\kTone\\sin\\ktheta_1 + \\kTtwo\\sin\\ktheta_2 = ${fmt(T1y, 1)}\\ \\text{N} + ${fmt(T2y, 1)}\\ \\text{N} = ${fmt(W, 1)}\\ \\text{N} = \\kwgt`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 4.23: the bathroom scale in a lift. The lift starts from rest,
   speeds up for three seconds, rides four at a constant velocity and
   slows to a stop in the last three, and the dial follows it. Moves:
   the reading changes as the ride does, so the ten seconds of the ride
   run in about five real seconds, with the scrubber. The shaft keeps to
   the left; the free-body diagram and the dial stand between it and the
   two graphs.
===================================================================== */
(function () {
  const H = 780;
  const d = sim('sim-elevator-scale', H);
  const mm = ctl(d.controls, { label: '\\km', cls: 'mass', min: 40, max: 120, step: 0.5, value: 75, unit: 'kg', dec: 1, onInput: reset, aria: 'mass of the person' });
  const ac = ctl(d.controls, { label: '\\ka', cls: 'acceleration', min: 0.2, max: 3, step: 0.05, value: 1.2, unit: 'm/s²', dec: 2, onInput: reset, aria: 'acceleration of the lift' });
  const T = 10, TA = 3, TB = 7;
  const cy = cycle(() => T, 1.2);
  function reset() { cy.reset(); }
  const aAt = (t) => (t < TA ? ac.v : t < TB ? 0 : -ac.v);
  const vAt = (t) => (t < TA ? ac.v * t : t < TB ? ac.v * TA : ac.v * (T - t));
  const sAt = (t) => (t < TA ? 0.5 * ac.v * t * t
    : t < TB ? 0.5 * ac.v * TA * TA + ac.v * TA * (t - TA)
      : 0.5 * ac.v * TA * TA + ac.v * TA * (t - TB) + ac.v * TA * (TB - TA) - 0.5 * ac.v * (t - TB) * (t - TB));
  /* the shaft, the car and the man on his scale; the car rises 220 units over the ride whatever
     the sliders. In the car the two forces are on one fixed scale, the largest reading the sliders
     allow (120 × (9.80 + 3.00) = 1,536 N) being 182 units; in the free-body diagram his weight is
     always 130 units, so the diagram shows the ratio of the reading to it */
  const SL = 70, SR = 350, PX = 210, PS = 1.35, KS = 190 / 1600, WL = 130;
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const fc = C('force'), acc = C('acceleration'), vc = C('velocity');
    const t = REDUCED ? T : cy.now();
    const w = mm.v * G, Fs = mm.v * (G + aAt(t));
    const phase = t < TA ? 'speeding up at ' + fmt(ac.v, 2) + ' m/s², and the dial reads ' + fmt(Fs, 0) + ' N against his ' + fmt(w, 0) + ' N weight'
      : t < TB ? 'riding at a constant ' + fmt(ac.v * TA, 2) + ' m/s, and the dial reads his weight of ' + fmt(w, 0) + ' N exactly'
        : 'slowing to a stop, and the dial reads only ' + fmt(Fs, 0) + ' N against his ' + fmt(w, 0) + ' N weight';
    const rows = topline(ctx, 'After ' + fmt(t, 1) + ' s the lift is ' + phase);
    const lab = labeller(ctx, H, { headline: rows });
    const floor = 730 - 220 * (sAt(t) / sAt(T)), carT = floor - 300, feet = floor - 32;
    line(ctx, SL - 12, 104, SL - 12, 742, PAL.muted, 3); line(ctx, SR + 12, 104, SR + 12, 742, PAL.muted, 3);
    line(ctx, SL - 30, 742, SR + 30, 742, PAL.muted, 3);
    line(ctx, (SL + SR) / 2, 104, (SL + SR) / 2, carT, PAL.muted, 5);
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(SL, carT, SR - SL, 300);
    ctx.strokeStyle = F.ref('elevator'); ctx.lineWidth = 4; ctx.strokeRect(SL, carT, SR - SL, 300); ctx.restore();
    block(ctx, PX, floor - 16, 150, 32, F.ref('scale'));
    F.silhouette(ctx, { x: PX, y: feet, s: PS, pose: 'stand', color: F.ref('man') });
    /* the book's part (b): the person alone is the system of interest, ringed in a dashed box */
    ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2.5; ctx.setLineDash([12, 10]);
    ctx.strokeRect(PX - 112, feet - 258, 224, 262); ctx.restore();
    text(ctx, 'system of interest', PX, feet - 240, PAL.muted, { size: 17, align: 'center' });
    /* the two forces on him, on one scale */
    const Lw = w * KS, Ls = Fs * KS, wy = feet - 200;
    arrow(ctx, PX - 66, wy, PX - 66, wy + Lw, fc, 5);
    arrow(ctx, PX + 66, feet, PX + 66, feet - Ls, fc, 5);
    text(ctx, 'w', PX - 82, wy + Lw / 2, fc, { size: 22, weight: 600, align: 'right' });
    text(ctx, 'F_s', PX + 80, feet - Ls / 2, fc, { size: 22, weight: 600 });
    /* the lift's velocity and acceleration, beside the shaft */
    if (vAt(t) > 0.01) { const vl = 20 + 50 * (vAt(t) / 9); arrow(ctx, 408, floor - 110, 408, floor - 110 - vl, vc, 4); text(ctx, 'v', 422, floor - 110 - vl / 2, vc, { size: 22, weight: 600 }); }
    if (Math.abs(aAt(t)) > 0.01) { const sg = aAt(t) > 0 ? -1 : 1; arrow(ctx, 408, floor - 240 - sg * 33, 408, floor - 240 + sg * 33, acc, 4); text(ctx, 'a', 422, floor - 240, acc, { size: 22, weight: 600 }); }
    /* the free-body diagram of the system of interest: his weight and the push of the scale */
    const fx0 = 545, fy0 = 350, top = fy0 - WL * Fs / w;
    text(ctx, 'free-body diagram', fx0, 124, PAL.muted, { size: 17, align: 'center' });
    arrow(ctx, fx0, fy0, fx0, top, fc, 5);
    arrow(ctx, fx0, fy0, fx0, fy0 + WL, fc, 5);
    line(ctx, fx0 - 40, fy0 - WL, fx0 + 40, fy0 - WL, alpha(PAL.ink, 0.4), 2, [6, 6]);   /* where F_s equals w */
    dot(ctx, fx0, fy0, F.ref('man'), true, 9);
    text(ctx, 'F_s = ' + fmt(Fs, 0) + ' N', fx0, Math.min(top, fy0 - WL) - 24, fc, { size: 20, weight: 600, align: 'center' });
    text(ctx, 'w = ' + fmt(w, 0) + ' N', fx0, fy0 + WL + 24, fc, { size: 20, weight: 600, align: 'center' });
    /* the dial of the scale: the needle stands straight up when the reading is his weight */
    const dx = 545, dy = 630, r = 68;
    ctx.save(); ctx.strokeStyle = F.ref('scale'); ctx.fillStyle = PAL.panel; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(dx, dy, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    for (let i = 0; i <= 8; i++) { const g = (-210 + 30 * i) * RAD; line(ctx, dx + (r - 13) * Math.cos(g), dy + (r - 13) * Math.sin(g), dx + (r - 3) * Math.cos(g), dy + (r - 3) * Math.sin(g), PAL.muted, i === 4 ? 4 : 2); }
    text(ctx, 'w', dx, dy - r - 16, fc, { size: 20, weight: 600, align: 'center' });
    const ang = (-210 + 240 * Math.min(1, Fs / (2 * w))) * RAD;
    line(ctx, dx, dy, dx + (r - 16) * Math.cos(ang), dy + (r - 16) * Math.sin(ang), fc, 5); dot(ctx, dx, dy, fc, true, 6);
    text(ctx, 'the dial reads ' + fmt(Fs, 0) + ' N', dx, dy + r + 26, fc, { size: 20, weight: 600, align: 'center' });
    /* the two graphs, beside the vertical scene */
    /* fixed axes: the ride always lasts 10 s, and the largest reading the sliders allow is the
       heaviest person under the hardest acceleration, 120 × (9.80 + 3) = 1,536 N, so the reading axis
       is always 0 to 1,600 N, ticked every 400 N, and neither range changes as a slider moves */
    const FR = 1600, b1 = { l: 730, r: 1340, t: 150, b: 370 };
    const g1 = axes(ctx, b1, [0, T], [0, FR], { yl: 'the scale reading F_s (N)', yc: fc, nx: 5, ny: 4, fx: (v) => fmt(v, 0), fy: (v) => fmt(v, 0) });
    line(ctx, b1.l, g1.Y(w), b1.r, g1.Y(w), fc, 2, [10, 10]);
    text(ctx, 'his weight, ' + fmt(w, 0) + ' N', b1.r - 8, g1.Y(w) - 20, fc, { size: 18, align: 'right', bg: PAL.panel });
    [[0, TA], [TA, TB], [TB, T]].forEach(([p, q]) => { const y = g1.Y(mm.v * (G + aAt((p + q) / 2))); line(ctx, g1.X(p), y, g1.X(q), y, fc, 5); });
    line(ctx, g1.X(TA), g1.Y(mm.v * (G + ac.v)), g1.X(TA), g1.Y(w), fc, 5);
    line(ctx, g1.X(TB), g1.Y(w), g1.X(TB), g1.Y(mm.v * (G - ac.v)), fc, 5);
    dot(ctx, g1.X(t), g1.Y(Fs), fc, true, 9);
    /* the three parts of the ride, named between the graphs */
    [['speeding up', 0, TA], ['constant velocity', TA, TB], ['slowing', TB, T]].forEach(([s, p, q]) =>
      text(ctx, s, g1.X((p + q) / 2), 430, t >= p && t < q ? PAL.ink : PAL.muted, { size: 18, align: 'center', weight: t >= p && t < q ? 600 : 400 }));
    /* fixed axes: the lift speeds up for the first 3 s, so the hardest acceleration the slider allows
       gives it 3 × 3 = 9 m/s, and the velocity axis is always 0 to 9 m/s, ticked every 3 m/s */
    const VR = 9, b2 = { l: 730, r: 1340, t: 480, b: 690 };
    const g2 = axes(ctx, b2, [0, T], [0, VR], { xl: 'time t (s)', xc: C('time'), yl: 'the velocity of the lift v (m/s)', yc: vc, nx: 5, ny: 3, fx: (v) => fmt(v, 0), fy: (v) => fmt(v, 0) });
    [TA, TB].forEach((u) => { line(ctx, g1.X(u), b1.t, g1.X(u), b1.b, alpha(PAL.ink, 0.3), 2, [4, 8]); line(ctx, g2.X(u), b2.t, g2.X(u), b2.b, alpha(PAL.ink, 0.3), 2, [4, 8]); });
    line(ctx, g2.X(0), g2.Y(0), g2.X(TA), g2.Y(ac.v * TA), vc, 5);
    line(ctx, g2.X(TA), g2.Y(ac.v * TA), g2.X(TB), g2.Y(ac.v * TA), vc, 5);
    line(ctx, g2.X(TB), g2.Y(ac.v * TA), g2.X(T), g2.Y(0), vc, 5);
    dot(ctx, g2.X(t), g2.Y(vAt(t)), vc, true, 9);
    lab.flush();
    hits = [
      { x: PX, y: feet - 130, r: 60, name: 'the system of interest: the man alone' },
      { x: PX - 66, y: wy + Lw / 2, r: 30, name: 'his weight' },
      { x: PX + 66, y: feet - Ls / 2, r: 30, name: 'the upward force of the scale' },
      { x: PX, y: floor - 16, r: 40, name: 'the bathroom scale' },
      { x: (SL + SR) / 2, y: carT + 20, r: 60, name: 'the lift' },
      { x: 408, y: floor - 130, r: 30, name: 'the velocity of the lift' },
      { x: 408, y: floor - 240, r: 36, name: 'the acceleration of the lift' },
      { x: dx, y: dy, r: r, name: 'the dial of the scale' },
      { x: fx0, y: fy0 - WL, r: 24, name: 'where the push of the scale equals his weight' },
    ];
    tex(d.readout, `\\kFs = \\km\\ka + \\km\\kg = (${fmt(mm.v, 1)}\\ \\text{kg})(${fmt(aAt(t), 2)}\\ \\text{m/s}^2) + (${fmt(mm.v, 1)}\\ \\text{kg})(9.80\\ \\text{m/s}^2) = ${fmt(Fs, 0)}\\ \\text{N}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => T / 5), draw });
})();

/* =====================================================================
   SIM: the soccer player. He starts from rest and reaches his top speed
   over the elapsed time, and the slope of the graph beneath the strip is
   the average acceleration that the push of the ground gives him. Moves:
   the run is what the example is about, so it takes about five real
   seconds, with the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-soccer', 670);
  const vf = ctl(d.controls, { label: '\\kv', cls: 'velocity', min: 4, max: 12, step: 0.1, value: 8, unit: 'm/s', dec: 2, onInput: reset, aria: 'top speed reached' });
  const el1 = ctl(d.controls, { label: '\\kdt', cls: 'time', min: 1, max: 5, step: 0.05, value: 2.5, unit: 's', dec: 2, onInput: reset, aria: 'time taken' });
  const mm = ctl(d.controls, { label: '\\km', cls: 'mass', min: 40, max: 100, step: 0.5, value: 70, unit: 'kg', dec: 1, onInput: reset, aria: 'mass of the player' });
  const cy = cycle(() => el1.v, 1.2);
  function reset() { cy.reset(); }
  function draw() {
    const { ctx } = begin(d.c);
    const fc = C('force'), acc = C('acceleration'), vc = C('velocity'), tc = C('time');
    const t = REDUCED ? el1.v : cy.now(), a = vf.v / el1.v, Fn = mm.v * a;
    const stot = 0.5 * a * el1.v * el1.v, s = 0.5 * a * t * t, v = a * t;
    /* the strip always shows 0 to 30 m, the farthest run the sliders allow (12 m/s reached in 5 s) */
    const x0 = 140, x1 = 1300, X = (meters) => x0 + (x1 - x0) * meters / 30, GYS = 262;
    strip(ctx, 80, 1340, GYS, 46);
    line(ctx, 80, GYS - 23, 1340, GYS - 23, F.ref('ground'), 3); line(ctx, 80, GYS + 23, 1340, GYS + 23, F.ref('ground'), 3);
    F.scale(ctx, X, 0, 30, 5, GYS + 45, 'm', 1);
    line(ctx, X(stot), GYS - 60, X(stot), GYS + 23, alpha(PAL.ink, 0.4), 2, [4, 8]);
    F.rich(ctx, ['top speed after ', [fmt(stot, 1) + ' m', C('position')]], Math.max(X(stot), 230), GYS + 96, { size: 19, align: 'center' });
    const px = X(s);
    F.person(ctx, px, GYS, F.ref('player'), { s: 1.35, lean: 0.2, phase: t > 0 && t < el1.v ? t * 8 : 0 });
    const late = px > 900, fl = 70 + 130 * (Fn / 1200), vl = 180 * (v / 12);
    /* the push of the ground is drawn from his body, at the height of his hips, and the velocity
       from his chest, ahead of him */
    arrow(ctx, px + 14, GYS - 54, px + 14 + fl, GYS - 54, fc, 5);
    text(ctx, 'F_net = ' + fmt(Fn, 0) + ' N', late ? px - 30 : px + 26 + fl, GYS - 54, fc,
      { size: 20, weight: 600, align: late ? 'right' : 'left', bg: PAL.panel });
    if (v > 0.02) {
      arrow(ctx, px + 30, GYS - 110, px + 30 + vl, GYS - 110, vc, 4);
      text(ctx, 'v = ' + fmt(v, 2) + ' m/s', late ? px - 30 : px + 42 + vl, GYS - 110, vc, { size: 20, weight: 600, align: late ? 'right' : 'left', bg: PAL.panel });
    }
    /* the graph: the velocity against time, whose slope is the average acceleration */
    /* fixed axes: the two sliders stop at 5 s and 12 m/s, so the graph is always 0 to 5 s by
       0 to 12 m/s, ticked every second and every 3 m/s, and it never rescales as a slider moves */
    const TR = 5, VR = 12, box = { l: 210, r: 1300, t: 420, b: 610 };
    const g = axes(ctx, box, [0, TR], [0, VR], { xl: 'time t (s)', xc: tc, yl: 'v (m/s)', yc: vc, nx: 5, ny: 4, fx: (u) => fmt(u, 0), fy: (u) => fmt(u, 0) });
    /* the rise and the run of the whole line: Δv over Δt */
    const xe = g.X(el1.v), ye = g.Y(vf.v);
    line(ctx, g.X(0), box.b - 2, xe, box.b - 2, tc, 4);
    line(ctx, xe, box.b, xe, ye, vc, 3, [8, 8]);
    line(ctx, g.X(0), g.Y(0), xe, ye, acc, 5);
    text(ctx, 'Δt = ' + fmt(el1.v, 2) + ' s', (g.X(0) + xe) / 2 + 30, box.b - 22, tc, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, 'Δv = ' + fmt(vf.v, 2) + ' m/s', xe + 16, (box.b + ye) / 2 + 14, vc, { size: 20, weight: 600, bg: PAL.panel });
    text(ctx, 'slope a = ' + fmt(a, 2) + ' m/s²', xe + 16, ye - 4, acc, { size: 20, weight: 600, bg: PAL.panel });
    dot(ctx, g.X(t), g.Y(v), vc, true, 9);
    headline(ctx, 'After ' + fmt(t, 2) + ' s he is at ' + fmt(v, 2) + ' m/s, and the ground has pushed him forward with ' + fmt(Fn, 0) + ' N all the way');
    tex(d.readout, `\\kFnet = \\km\\ka = \\km\\frac{\\kdv}{\\kdt} = (${fmt(mm.v, 1)}\\ \\text{kg})\\frac{${fmt(vf.v, 2)}\\ \\text{m/s}}{${fmt(el1.v, 2)}\\ \\text{s}} = (${fmt(mm.v, 1)}\\ \\text{kg})(${fmt(a, 2)}\\ \\text{m/s}^2) = ${fmt(Fn, 0)}\\ \\text{N}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => Math.max(0.2, el1.v / 5)), draw });
})();
};
