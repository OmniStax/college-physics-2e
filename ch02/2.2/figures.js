/* Figures for section 2.2 Vectors, Scalars, and Coordinate Systems. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.2'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, choice, register, begin, line, arrow, dot, text, headline, strip, plane, hbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
/* a number with its sign written out, as the book writes a signed displacement; a value that rounds to zero takes no sign */
const eps = (d) => 0.5 * Math.pow(10, -d);
const signed = (x, d) => (x > eps(d) ? '+' : x < -eps(d) ? '−' : '') + fmt(Math.abs(x), d);
const signedTex = (x, d) => (x > eps(d) ? '+' : x < -eps(d) ? '-' : '') + fmt(Math.abs(x), d);
/* a scalar reading, whose minus sign is a point below zero and which takes no plus */
const reading = (x, d) => (x < -eps(d) ? '−' : '') + fmt(Math.abs(x), d);
const readingTex = (x, d) => (x < -eps(d) ? '-' : '') + fmt(Math.abs(x), d);
/* the jet of Figure 2.6, nose to the left when heading is −1 and to the right when it is +1 */
function jet(ctx, x, y, heading, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(heading < 0 ? -1 : 1, 1); plane(ctx, 0, 0, F.ref('jet'), s); ctx.restore();
}

/* =====================================================================
   SIM: a vector and two scalars. The jet's velocity is an arrow from its
   nose, as long as the speed and turned by the sign; the dial under it
   reads the speed, which no sign changes; the thermometer reads a
   temperature, whose minus sign is only a level below zero. Opens on the
   book's 90 km/h east and −20 °C. Still: it answers its two sliders.
===================================================================== */
(function () {
  const d = sim('sim-vector-scalar', 570);
  const V = ctl(d.controls, { label: '\\kv', cls: 'velocity', min: -120, max: 120, step: 5, value: 90, unit: 'km/h', dec: 0, aria: 'velocity, east positive' });
  const T = ctl(d.controls, { label: '\\text{temperature}', cls: 'temperature', min: -40, max: 40, step: 1, value: -20, unit: '°C', dec: 0, aria: 'temperature' });
  const jx = 510, jy = 205, K = 3.2;          /* the jet on its strip; 3.2 units of arrow for each km/h, so 120 km/h stays on the strip */
  const gx = 510, gy = 520, gr = 118;         /* the speed dial: hub and radius, 0 at the left round to 120 km/h at the right */
  const tx = 1200, tTop = 150, tBot = 450;    /* the thermometer's scale, −40 °C at the bottom to 40 °C at the top */
  const Y = (deg) => tBot - ((tBot - tTop) * (deg + 40)) / 80;
  function draw() {
    const { ctx } = begin(d.c);
    const v = V.v, temp = T.v, east = v >= 0, mag = Math.abs(v), vc = C('velocity'), tc = C('temperature');
    /* the vector: the jet with its velocity as an arrow from its nose */
    text(ctx, 'Vector: velocity', 50, 112, PAL.muted, { size: 20, weight: 600 });
    strip(ctx, 50, 970, jy, 48);
    text(ctx, 'west', 50, jy + 46, PAL.muted, { size: 17 }); text(ctx, 'east', 970, jy + 46, PAL.muted, { size: 17, align: 'right' });
    jet(ctx, jx, jy, east ? 1 : -1, 1.3);
    const nose = east ? jx + 60 : jx - 60, tip = nose + (east ? 1 : -1) * mag * K;
    if (mag > 0) {
      arrow(ctx, nose, jy, tip, jy, vc, 6);
      hbracket(ctx, Math.min(nose, tip), Math.max(nose, tip), jy + 88, PAL.muted, 'length ' + fmt(mag, 0) + ' km/h', { side: 'below', size: 20 });
    }
    text(ctx, 'v = ' + signed(v, 0) + ' km/h', mag > 0 ? (nose + tip) / 2 : jx, jy - 58, vc, { weight: 600, size: 24, align: 'center' });
    /* a scalar: the speed on a dial, the same for east and west */
    text(ctx, 'Scalar: speed', gx + gr + 70, gy - 60, PAL.muted, { size: 20, weight: 600 });
    text(ctx, fmt(mag, 0) + ' km/h', gx + gr + 70, gy - 26, vc, { size: 24, weight: 600 });
    ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(gx, gy, gr, Math.PI, 2 * Math.PI); ctx.stroke(); ctx.restore();
    for (let s = 0; s <= 120; s += 10) {
      const a = Math.PI * (1 - s / 120), cx = Math.cos(a), sy = -Math.sin(a), big = s % 30 === 0;
      line(ctx, gx + (gr - (big ? 16 : 9)) * cx, gy + (gr - (big ? 16 : 9)) * sy, gx + gr * cx, gy + gr * sy, PAL.muted, big ? 3 : 2);
      if (big) text(ctx, fmt(s, 0), gx + (gr + 22) * cx, gy + (gr + 22) * sy + (s === 0 || s === 120 ? -8 : 0), PAL.muted, { size: 17, align: 'center' });
    }
    const na = Math.PI * (1 - mag / 120);
    line(ctx, gx, gy, gx + (gr - 22) * Math.cos(na), gy - (gr - 22) * Math.sin(na), vc, 5);
    dot(ctx, gx, gy, PAL.ink, true, 8);
    text(ctx, 'km/h', gx, gy + 28, PAL.muted, { size: 17, align: 'center' });
    /* a scalar that can be negative: a temperature, a level on the thermometer's scale */
    line(ctx, 1030, 100, 1030, 540, PAL.rule, 2);
    text(ctx, 'Scalar: temperature', tx, 112, PAL.muted, { size: 20, weight: 600, align: 'center' });
    ctx.save();
    ctx.fillStyle = PAL.soft; ctx.beginPath(); ctx.roundRect(tx - 13, tTop - 26, 26, tBot - tTop + 60, 13); ctx.fill();
    ctx.beginPath(); ctx.arc(tx, tBot + 52, 30, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = tc; ctx.beginPath(); ctx.arc(tx, tBot + 52, 21, 0, 2 * Math.PI); ctx.fill();
    ctx.fillRect(tx - 6, Y(temp), 12, tBot + 40 - Y(temp)); ctx.restore();
    for (let deg = -40; deg <= 40; deg += 10) {
      line(ctx, tx + 18, Y(deg), tx + (deg % 20 ? 28 : 36), Y(deg), PAL.muted, 2);
      if (deg % 20 === 0) text(ctx, reading(deg, 0) + ' °C', tx + 46, Y(deg), PAL.muted, { size: 17 });
    }
    line(ctx, tx - 40, Y(0), tx + 36, Y(0), PAL.muted, 2, [4, 6]);
    line(ctx, tx - 22, Y(temp), tx - 6, Y(temp), tc, 3);
    text(ctx, reading(temp, 0) + ' °C', tx - 30, Y(temp) + (Math.abs(temp) < 4 && temp !== 0 ? (temp > 0 ? -12 : 12) : 0), tc, { weight: 600, size: 24, align: 'right' });
    headline(ctx, (mag > 0 ? 'A velocity of $' + signedTex(v, 0) + '\\ \\text{km/h}$ is an arrow pointing ' + (east ? 'east' : 'west') : 'A velocity of 0 km/h has no arrow')
      + '; a temperature of ' + reading(temp, 0) + ' °C is a level ' + (temp < 0 ? 'below zero' : temp > 0 ? 'above zero' : 'at zero') + ', with no direction.');
    tex(d.readout, `\\text{speed} = |\\kv| = |{${signedTex(v, 0)}}\\ \\text{km/h}| = ${fmt(mag, 0)}\\ \\text{km/h}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 2.7: the coordinate system. One motion is read on two coordinate
   lines that share a zero: the usual choice (right positive, or up
   positive, as the book's axes mark) and the opposite one, which the text
   finds convenient for the jet flying left and for a falling object. The
   ends of each line carry the book's +x, −x, +y, −y. Still: the choice
   of positive direction and of zero has no time in it.
===================================================================== */
(function () {
  const d = sim('sim-axes', 600);
  const unit = () => (M.value === 'jet' ? 'km' : 'm');
  const zero = (v) => (Math.abs(v) < 1e-9 ? 'at the start' : fmt(Math.abs(v), 1) + ' ' + unit() + (v > 0 ? ' ahead' : ' behind'));
  const M = choice(d.controls, { label: 'motion', value: 'jet', aria: 'the motion described', options: [{ value: 'jet', label: 'jet flying left' }, { value: 'fall', label: 'ball falling' }],
    onInput: () => { D.range({ min: 0.5, max: 8, step: 0.5, unit: unit(), dec: 1 }); O.range({ min: -1, max: 9, step: 0.5, unit: '', fmt: zero }); } });
  const D = ctl(d.controls, { label: '\\text{distance}', cls: '', min: 0.5, max: 8, step: 0.5, value: 5, unit: 'km', dec: 1, aria: 'distance moved' });
  const O = ctl(d.controls, { label: '\\text{zero}', cls: '', min: -1, max: 9, step: 0.5, value: 0, unit: '', fmt: zero, detents: [0], aria: 'where the zero of the line is placed, measured from the start along the motion' });
  /* g is the ground coordinate, a fixed 0 to 10 across the stage (rightward for the jet, upward for the ball); the motion starts at g = 9 and runs toward 0 */
  const G0 = 9, L = 160, R = 1240, X = (g) => L + ((R - L) * g) / 10;
  const yA = 205, yS = 345, yB = 485;        /* the jet: the upper line, the strip, the lower line */
  const T0 = 150, B0 = 545, Yv = (g) => B0 - ((B0 - T0) * g) / 10;   /* the ball: height on the canvas */
  const val = (x, u) => (Math.abs(x) < 0.05 ? '0' : signed(x, 1)) + ' ' + u;
  const valTex = (x, u) => (Math.abs(x) < 0.05 ? '0' : signedTex(x, 1)) + '\\ \\text{' + u + '}';
  /* a horizontal coordinate line: sign +1 has right positive */
  function axisH(ctx, y, sign, title, g, o) {
    const pc = C('position');
    text(ctx, title, L, y - 66, PAL.ink, { size: 20, weight: 600 });
    if (sign > 0) arrow(ctx, L - 40, y, R + 44, y, PAL.muted, 3); else arrow(ctx, R + 40, y, L - 44, y, PAL.muted, 3);
    text(ctx, sign > 0 ? '+x' : '−x', R + 56, y, PAL.ink, { size: 22, weight: 600 });
    text(ctx, sign > 0 ? '−x' : '+x', L - 56, y, PAL.ink, { size: 22, weight: 600, align: 'right' });
    for (let c = Math.ceil(Math.min(sign * -o, sign * (10 - o)) - 1e-9); c <= Math.max(sign * -o, sign * (10 - o)) + 1e-9; c++) {
      const k = o + sign * c;
      line(ctx, X(k), y - 8, X(k), y + 8, PAL.muted, 2);
      if (c % 2 === 0) text(ctx, signed(c, 0).replace('+', '') + ' km', X(k), y + 28, PAL.muted, { size: 17, align: 'center' });
    }
    const x0 = sign * (G0 - o), x = sign * (g - o), dx = x - x0;
    arrow(ctx, X(G0), y, X(g), y, pc, 5);
    dot(ctx, X(G0), y, pc, false, 10); dot(ctx, X(g), y, pc, true, 9);
    text(ctx, 'x₀ = ' + val(x0, 'km'), X(G0) - 4, y - 32, pc, { size: 22, weight: 600 });
    text(ctx, 'x = ' + val(x, 'km'), X(g) + 4, y - 32, pc, { size: 22, weight: 600, align: 'right' });
    text(ctx, 'Δx = ' + signed(dx, 1) + ' km', Math.max((X(G0) + X(g)) / 2, 720), y - 66, pc, { size: 22, weight: 600, align: 'center' });
    return { x0, x, dx };
  }
  /* a vertical coordinate line: sign +1 has up positive */
  function axisV(ctx, x, sign, title, g, o) {
    const pc = C('position');
    text(ctx, title, x + 44, 118, PAL.ink, { size: 20, weight: 600 });
    if (sign > 0) arrow(ctx, x, B0 + 24, x, T0 - 28, PAL.muted, 3); else arrow(ctx, x, T0 - 24, x, B0 + 28, PAL.muted, 3);
    text(ctx, sign > 0 ? '+y' : '−y', x + 14, T0 - 32, PAL.ink, { size: 22, weight: 600 });
    text(ctx, sign > 0 ? '−y' : '+y', x + 14, B0 + 32, PAL.ink, { size: 22, weight: 600 });
    for (let c = Math.ceil(Math.min(sign * -o, sign * (10 - o)) - 1e-9); c <= Math.max(sign * -o, sign * (10 - o)) + 1e-9; c++) {
      const k = o + sign * c;
      line(ctx, x - 8, Yv(k), x + 8, Yv(k), PAL.muted, 2);
      if (c % 2 === 0) text(ctx, signed(c, 0).replace('+', '') + ' m', x - 18, Yv(k), PAL.muted, { size: 17, align: 'right' });
    }
    const y0 = sign * (G0 - o), y = sign * (g - o), dy = y - y0, gap = Yv(g) - Yv(G0);
    arrow(ctx, x, Yv(G0), x, Yv(g), pc, 5);
    dot(ctx, x, Yv(G0), pc, false, 10); dot(ctx, x, Yv(g), pc, true, 9);
    const lift = Math.max(0, (34 - gap) / 2);          /* the two labels part when the marks are close */
    text(ctx, 'y₀ = ' + val(y0, 'm'), x + 24, Yv(G0) - lift, pc, { size: 22, weight: 600, bg: PAL.panel });
    text(ctx, 'y = ' + val(y, 'm'), x + 24, Yv(g) + lift, pc, { size: 22, weight: 600, bg: PAL.panel });
    text(ctx, 'Δy = ' + signed(dy, 1) + ' m', x + 200, (Yv(G0) + Yv(g)) / 2, pc, { size: 22, weight: 600, bg: PAL.panel });
    return { x0: y0, x: y, dx: dy };
  }
  function draw() {
    const { ctx } = begin(d.c);
    const jetOn = M.value === 'jet', g = G0 - D.v, o = G0 - O.v, u = unit();
    let a, b;
    if (jetOn) {
      line(ctx, X(o), yA - 8, X(o), yB + 8, PAL.rule, 2, [6, 8]);       /* the zero, the same point on both lines */
      strip(ctx, L, R, yS, 48);
      jet(ctx, X(g), yS, -1, 1.2);
      a = axisH(ctx, yA, +1, 'Right positive, the usual choice', g, o);
      b = axisH(ctx, yB, -1, 'Left positive, the way the jet flies', g, o);
    } else {
      const bx = 170;
      line(ctx, 60, Yv(o), 1010, Yv(o), PAL.rule, 2, [6, 8]);
      line(ctx, 70, Yv(0), 270, Yv(0), PAL.muted, 3); text(ctx, 'ground', bx, Yv(0) + 24, PAL.muted, { size: 17, align: 'center' });
      line(ctx, bx, Yv(G0), bx, Yv(g), alpha(PAL.ink, 0.35), 2, [4, 8]);
      dot(ctx, bx, Yv(G0), PAL.ink, false, 16); dot(ctx, bx, Yv(g), PAL.ink, true, 16);
      text(ctx, 'ball', bx + 28, Yv(g), PAL.ink, { size: 20 });
      a = axisV(ctx, 440, +1, 'Up positive, the usual choice', g, o);
      b = axisV(ctx, 930, -1, 'Down positive, the way the ball falls', g, o);
    }
    const s = jetOn ? ['\\kdx', '\\kx', '\\kxo'] : ['\\Delta\\ky', '\\ky', '\\kyo'];
    headline(ctx, (jetOn ? 'Flying ' + fmt(D.v, 1) + ' km to the left' : 'Falling ' + fmt(D.v, 1) + ' m') + ' is $' + s[0] + ' = ' + signedTex(a.dx, 1) + '\\ \\text{' + u + '}$ with ' + (jetOn ? 'right' : 'up')
      + ' positive and $' + signedTex(b.dx, 1) + '\\ \\text{' + u + '}$ with ' + (jetOn ? 'left' : 'down') + ' positive.');
    const row = (name, r) => `\\text{${name} positive:}\\quad ${s[0]} &= ${s[1]} - ${s[2]} = (${valTex(r.x, u)}) - (${valTex(r.x0, u)}) = ${signedTex(r.dx, 1)}\\ \\text{${u}}`;
    tex(d.readout, `\\begin{aligned} ${row(jetOn ? 'right' : 'up', a)} \\\\ ${row(jetOn ? 'left' : 'down', b)} \\end{aligned}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
