/* Figures for section 5.2 Drag Forces. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['5.2'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, headline, topline, axes, curve, pinned, strip, car } = F;
const sim = (id, H) => F.sim(root, id, H);

/* ---------- constants and small helpers shared by the figures ---------- */
const G = 9.80, RHO_AIR = 1.21, RHO_STEEL = 7.8e3, TAU = 2 * Math.PI;
/* how fast a body of terminal velocity vt is falling a time t after it was let go from rest */
const speed = (vt, t) => vt * Math.tanh((G * t) / vt);
/* draws inside the graph box, so a curve that runs past a fixed range is cut off at the frame
   instead of the frame being stretched to hold it */
const inbox = (ctx, box, f) => { ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t); ctx.clip(); f(); ctx.restore(); };
/* a number in the book's three significant figures, never in exponent form */
const sig3 = (x) => (Math.abs(x) >= 100 ? fmt(x, 0) : Math.abs(x) >= 10 ? fmt(x, 1) : Math.abs(x) >= 1 ? fmt(x, 2) : fmt(x, 3));
/* a mass in the unit that reads best for its size */
const massLabel = (m) => (m >= 1 ? fmt(m, m >= 10 ? 0 : 1) + ' kg' : m >= 1e-3 ? fmt(m * 1e3, m >= 1e-2 ? 0 : 1) + ' g' : fmt(m * 1e6, 0) + ' mg');
/* the same number as LaTeX in scientific form */
function sciTex(x, d) { const p = Math.floor(Math.log10(Math.abs(x))); return `${fmt(x / Math.pow(10, p), d)} \\times 10^{${p}}`; }

/* ---------- sprites ---------- */
/* The body the drag coefficient belongs to, in its referent colour. A car, a cyclist, a sphere, a plate or an
   airfoil travels to the right along the road, (x, y) on the road line; a skydiver falls down the page, (x, y) her
   centre. It returns the box the body fills and the height its arrows act at. */
function bluff(ctx, x, y, name, col) {
  if (name === 'a skydiver lying horizontal') { faller(ctx, x, y, 0.9, 'spread', col); return { l: x - 70, r: x + 70, t: y - 50, b: y + 30 }; }
  if (name === 'a skydiver feet first') { F.silhouette(ctx, { x, y: y + 66, s: 0.9, pose: 'stand', color: col, hip: { x: 0, y: -77 }, feet: [{ x: 4, y: 0 }, { x: -4, y: 0 }], hands: [{ x: 8, y: -60 }, { x: 2, y: -60 }] }); return { l: x - 22, r: x + 22, t: y - 72, b: y + 68 }; }
  const cy = y - 26, at = (l, r, t, b, ay) => ({ l, r, t, b, ay });
  if (name === 'a sphere') { dot(ctx, x, cy, col, true, 44); return at(x - 44, x + 44, cy - 44, cy + 44, cy); }
  if (name === 'a circular flat plate') { ctx.save(); ctx.fillStyle = col; ctx.fillRect(x - 9, cy - 56, 18, 112); ctx.restore(); return at(x - 9, x + 9, cy - 56, cy + 56, cy); }
  if (name === 'an airfoil') {
    ctx.save(); ctx.fillStyle = col; ctx.beginPath();
    ctx.moveTo(x - 94, cy + 4); ctx.quadraticCurveTo(x - 10, cy - 36, x + 94, cy - 2);
    ctx.quadraticCurveTo(x - 20, cy + 18, x - 94, cy + 4); ctx.closePath(); ctx.fill(); ctx.restore();
    return at(x - 94, x + 94, cy - 18, cy + 12, cy);
  }
  if (name === 'a bicycle') {
    /* the frame round the bottom bracket B, the wheels standing on the road; the rider sits on the saddle with her
       feet on the pedals and her hands on the bars, joints given in the silhouette's frame from B */
    const bx = x, by = y - 30, P = (u, v) => [bx + u, by + v];
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.arc(...P(-50, 0), 30, 0, TAU); ctx.moveTo(...P(88, 0)); ctx.arc(...P(58, 0), 30, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(...P(-50, 0)); ctx.lineTo(...P(0, 0)); ctx.lineTo(...P(-18, -54)); ctx.lineTo(...P(-50, 0));
    ctx.moveTo(...P(-18, -54)); ctx.lineTo(...P(44, -50)); ctx.lineTo(...P(0, 0)); ctx.moveTo(...P(44, -50)); ctx.lineTo(...P(58, 0));
    ctx.moveTo(...P(44, -50)); ctx.lineTo(...P(42, -64)); ctx.lineTo(...P(54, -66)); ctx.stroke();
    ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(...P(-30, -58)); ctx.lineTo(...P(-10, -58)); ctx.stroke();
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(...P(10, 4)); ctx.lineTo(...P(-10, -4)); ctx.stroke();
    ctx.restore();
    F.silhouette(ctx, { x: bx, y: by, s: 1, pose: 'sit', color: col, hip: { x: -20, y: -64 }, shoulder: { x: 10, y: -102 }, head: { x: 24, y: -120 },
      feet: [{ x: 10, y: 4 }, { x: -10, y: -4 }], hands: [{ x: 52, y: -66 }, { x: 48, y: -64 }] });
    return at(x - 80, x + 88, by - 132, y, by - 40);
  }
  if (name) { car(ctx, x, cy, col, 1.6); return at(x - 64, x + 67, cy - 38, cy + 26, cy - 13); }
  ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = col; ctx.lineWidth = 4;
  ctx.fillRect(x - 80, cy - 40, 160, 80); ctx.strokeRect(x - 80, cy - 40, 160, 80); ctx.restore();
  return at(x - 82, x + 82, cy - 42, cy + 42, cy);
}
/* A person falling, seen from the side and centred on (x, y): spread eagle, lying belly down across the fall
   with the head to the right, arms and lower legs lifted by the air, or head first, upright and upside down. The
   library's silhouette turned a quarter or a half turn, 150 s long. */
function faller(ctx, x, y, s, posture, col) {
  ctx.save(); ctx.translate(x, y);
  if (posture === 'head') {
    ctx.rotate(Math.PI);
    F.silhouette(ctx, { x: 0, y: 75 * s, s, pose: 'stand', color: col, feet: [{ x: 5, y: 0 }, { x: -5, y: 0 }], hands: [{ x: 10, y: -66 }, { x: -2, y: -66 }] });
  } else {
    ctx.rotate(Math.PI / 2);
    F.silhouette(ctx, { x: 0, y: 75 * s, s, pose: 'stand', color: col, hip: { x: 0, y: -72 }, shoulder: { x: -8, y: -116 }, head: { x: -20, y: -137 },
      feet: [{ x: -40, y: -20 }, { x: -46, y: -30 }], hands: [{ x: -36, y: -160 }, { x: -42, y: -150 }], kneeSide: 1, elbowSide: 1 });
  }
  ctx.restore();
}
/* the same body drawn k times as large about its point on the road */
function big(ctx, x, y, name, col, k) {
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); const b = bluff(ctx, 0, 0, name, col); ctx.restore();
  return { l: x + k * b.l, r: x + k * b.r, t: y + k * b.t, b: y + k * b.b, ay: y + k * b.ay };
}
/* two slashes across an arrow cut short of its length, at (x, y) on the shaft running along (ux, uy) */
function cut(ctx, x, y, ux, uy, col) {
  for (const o of [-7, 7]) {
    const cx = x + ux * o, cy = y + uy * o, ex = -uy * 13 + ux * 6, ey = ux * 13 + uy * 6;
    line(ctx, cx - ex, cy - ey, cx + ex, cy + ey, PAL.panel, 7); line(ctx, cx - ex, cy - ey, cx + ex, cy + ey, col, 2.5);
  }
}
/* a jar of fluid: the glass from (x1, top) to (x2, bottom), filled from the surface down */
function jar(ctx, x1, x2, top, bottom, surface, col) {
  ctx.save(); ctx.fillStyle = alpha(col, 0.14); ctx.fillRect(x1, surface, x2 - x1, bottom - surface); ctx.restore();
  line(ctx, x1, surface, x2, surface, PAL.muted, 2);
  line(ctx, x1, top, x1, bottom, PAL.muted, 3);
  line(ctx, x2, top, x2, bottom, PAL.muted, 3);
  line(ctx, x1, bottom, x2, bottom, PAL.muted, 3);
}
/* =====================================================================
   SIM: the drag force against the speed. A body moves through air at
   the speed you set with its drag drawn to scale, and the curve below
   shows that the force goes as the square of the speed. Each value of
   Table 5.2 draws the body it belongs to, moving the way it really
   moves: the cars, the cyclist and the shapes along a road, the two
   skydivers down a column of air. The idea answers its sliders and no
   clock runs in it, so the figure is still and carries no transport.
===================================================================== */
(function () {
  const d = sim('sim-drag', 740);
  const TABLE = [['an airfoil', 0.05], ['a Toyota Camry', 0.28], ['a Ford Focus', 0.32], ['a Honda Civic', 0.36], ['a Ferrari Testarossa', 0.37],
    ['a Dodge Ram pickup', 0.43], ['a sphere', 0.45], ['a Hummer H2 SUV', 0.64], ['a skydiver feet first', 0.70], ['a bicycle', 0.90],
    ['a skydiver lying horizontal', 1.0], ['a circular flat plate', 1.12]];
  const V = ctl(d.controls, { label: '\\kv', cls: 'velocity', min: 20, max: 150, step: 5, value: 100, unit: 'km/h', dec: 0, aria: 'speed through the air' });
  /* every value Table 5.2 prints is a tick on the drag-coefficient slider, and the hundredth the
     slider steps by lands on each of them exactly */
  const Cd = ctl(d.controls, { label: 'C', cls: '', min: 0.05, max: 1.12, step: 0.01, value: 0.28, unit: '', dec: 2, aria: 'drag coefficient', detents: TABLE.map((t) => t[1]) });
  const Ar = ctl(d.controls, { label: '\\karea', cls: 'area', min: 0.2, max: 3, step: 0.05, value: 0.7, unit: 'm²', dec: 2, aria: 'area facing the fluid' });
  const VMAX = 150;
  const drag = (kmh) => 0.5 * Cd.v * RHO_AIR * Ar.v * Math.pow(kmh / 3.6, 2);
  const named = () => { const m = TABLE.reduce((a, b) => (Math.abs(b[1] - Cd.v) < Math.abs(a[1] - Cd.v) ? b : a)); return Math.abs(m[1] - Cd.v) <= 0.015 ? m[0] : null; };
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const cf = C('force'), cv = C('velocity'), cb = F.ref('body');
    const Fnow = drag(V.v), Fhalf = drag(V.v / 2), who = named();
    const n = headline(ctx, 'At ' + fmt(V.v, 0) + ' km/h the drag is ' + sig3(Fnow) + ' N, four times the ' + sig3(Fhalf) + ' N it would be at half that speed');
    const lab = F.labeller(ctx, 740, { headline: n }), top = n === 2 ? 106 : 80;
    const name = who === null ? 'a bluff body with C = ' + fmt(Cd.v, 2) : who + ', C = ' + fmt(Cd.v, 2) + ' in Table 5.2';
    /* the scene. Arrows are to one scale within each scene: along the road 1.2 units a newton and 380 units for
       150 km/h, down the column of air, which is shorter, 0.45 units a newton and 115 units for 150 km/h. A drag
       longer than the room left is cut short with two slashes, and its label still gives its size. */
    let dseg, vseg, box, cutD = false;
    if (who && who.indexOf('skydiver') >= 0) {
      const cx = 700, cy = 270;
      ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(cx - 25, top, 50, 450 - top); ctx.restore();
      line(ctx, cx, top, cx, 450, PAL.panel, 3, [22, 18]);
      box = bluff(ctx, cx, cy, who, cb);
      const room = box.t - 6 - top, Ld = Math.min(0.45 * Fnow, room);
      cutD = 0.45 * Fnow > room;
      dseg = { x1: cx, y1: box.t - 6, x2: cx, y2: box.t - 6 - Ld };
      vseg = { x1: cx, y1: box.b + 6, x2: cx, y2: box.b + 6 + (115 * V.v) / VMAX };
      lab.place(box); lab.place({ l: cx - 25, r: cx + 25, t: top, b: 450 });
      lab.add(name, box.l - 30, cy, -1, 0, cb, 17, 10);
    } else {
      const yl = 305, cx = 760;
      strip(ctx, 90, 1340, yl, 50);
      box = big(ctx, cx, yl, who, cb, 1.3);
      const room = box.l - 6 - 100, Ld = Math.min(1.2 * Fnow, room);
      cutD = 1.2 * Fnow > room;
      dseg = { x1: box.l - 6, y1: box.ay, x2: box.l - 6 - Ld, y2: box.ay };
      vseg = { x1: box.r + 6, y1: box.ay, x2: box.r + 6 + (380 * V.v) / VMAX, y2: box.ay };
      lab.place(box);
      lab.add(name, cx, yl + 30, 0, 1, cb, 19, 26);
    }
    arrow(ctx, dseg.x1, dseg.y1, dseg.x2, dseg.y2, cf, 5);
    if (cutD) { const L = Math.hypot(dseg.x2 - dseg.x1, dseg.y2 - dseg.y1); cut(ctx, (dseg.x1 + dseg.x2) / 2, (dseg.y1 + dseg.y2) / 2, (dseg.x2 - dseg.x1) / L, (dseg.y2 - dseg.y1) / L, cf); }
    arrow(ctx, vseg.x1, vseg.y1, vseg.x2, vseg.y2, cv, 5);
    lab.beside(dseg, 'right', 'F_D = ' + sig3(Fnow) + ' N', cf, 22);
    lab.beside(vseg, 'left', 'v = ' + fmt(V.v, 0) + ' km/h', cv, 22);
    /* the graph: the drag against the speed, the current speed filled and half of it hollow */
    /* fixed axes: the speed slider stops at 150 km/h, so the speed axis is always 0 to 150. The
       bluntest, largest body the sliders allow, C = 1.12 and A = 3 m², would meet 3,530 N of drag at
       that speed, and an axis that tall would leave the Camry the figure opens with, which meets
       206 N, in a seventeenth of the height. So the drag axis is fixed at 0 to 250 N, which holds
       that car comfortably, and a bluffer body climbs off the top as a pinned marker. Neither range
       changes as a slider moves. */
    const FR = 250, g0 = { l: 200, r: 1300, t: 470, b: 670 };
    const g = axes(ctx, g0, [0, VMAX], [0, FR],
      { xl: 'v (km/h)', xc: cv, yl: 'F_D (N)', yc: cf, nx: 5, ny: 5, fy: (y) => fmt(y, 0) });
    inbox(ctx, g0, () => {
      curve(ctx, drag, 0, VMAX, g.X, g.Y, cf, 5, 90);
      line(ctx, g.X(V.v), g.Y(0), g.X(V.v), g.Y(Fnow), cv, 2, [4, 8]);
      line(ctx, g.X(0), g.Y(Fnow), g.X(V.v), g.Y(Fnow), cf, 2, [4, 8]);
      line(ctx, g.X(V.v / 2), g.Y(0), g.X(V.v / 2), g.Y(Fhalf), cv, 2, [4, 8]);
      line(ctx, g.X(0), g.Y(Fhalf), g.X(V.v / 2), g.Y(Fhalf), cf, 2, [4, 8]);
    });
    const ph = Fhalf <= FR ? (dot(ctx, g.X(V.v / 2), g.Y(Fhalf), cf, false, 10), { x: g.X(V.v / 2), y: g.Y(Fhalf) }) : pinned(ctx, g0, g.X, g.Y, V.v / 2, Fhalf, cf, sig3(Fhalf) + ' N');
    const pn = pinned(ctx, g0, g.X, g.Y, V.v, Fnow, cf, sig3(Fnow) + ' N');
    lab.flush();
    hits = [{ x: pn.x, y: pn.y, r: 18, name: 'the drag at ' + fmt(V.v, 0) + ' km/h' }, { x: ph.x, y: ph.y, r: 18, name: 'the drag at half the speed, ' + fmt(V.v / 2, 1) + ' km/h' },
      { x: (box.l + box.r) / 2, y: (box.t + box.b) / 2, r: Math.max(box.r - box.l, box.b - box.t) / 2, name: name }];
    tex(d.readout, `\\kFD = \\tfrac{1}{2}C\\krhomat\\karea\\kv^2 = \\tfrac{1}{2}(${fmt(Cd.v, 2)})(1.21\\ \\text{kg/m}^3)(${fmt(Ar.v, 2)}\\ \\text{m}^2)(${fmt(V.v / 3.6, 1)}\\ \\text{m/s})^2 = ${sig3(Fnow)}\\ \\text{N}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: a skydiver falling to terminal velocity. The skydiver stays in
   the middle of the scene with the forces drawn to one scale: the weight
   never changes and the drag grows with the speed until the two arrows
   are the same length. The position in the air sets the frontal area
   and the drag coefficient the book gives it (spread eagle, Example 5.2:
   0.70 m² and 1.0; head first, the text's skydiver: 0.18 m² and 0.70).
   The idea has a clock in it and the run is finite, so it loops.
===================================================================== */
(function () {
  const d = sim('sim-terminal', 680);
  const POST = { spread: { A: 0.70, C: 1.0, name: 'spread eagle' }, head: { A: 0.18, C: 0.70, name: 'head first' } };
  const P = F.choice(d.controls, { label: '\\text{position}', options: [{ value: 'spread', label: 'spread eagle' }, { value: 'head', label: 'head first' }], value: 'spread', aria: 'position of the skydiver in the air', onInput: reset });
  const M = ctl(d.controls, { label: '\\km', cls: 'mass', min: 50, max: 110, step: 1, value: 85, unit: 'kg', dec: 0, onInput: reset, aria: 'mass of the skydiver', detents: [75, 85] });
  const vtOf = (p) => Math.sqrt((2 * M.v * G) / (RHO_AIR * POST[p].C * POST[p].A));
  const total = () => (4 * vtOf(P.value)) / G;
  const cy = cycle(total, 1.2);
  function reset() { cy.reset(); }
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const cf = C('force'), cv = C('velocity'), ca = C('acceleration'), ct = C('time'), cb = F.ref('skydiver');
    const p = P.value, q = POST[p], t = cy.now(), V = vtOf(p), w = M.v * G;
    /* within a thousandth of the terminal velocity the fall is shown as having reached it */
    const v0 = speed(V, t), v = v0 > 0.999 * V ? V : v0;
    const wN = Math.round(w), fN = Math.min(wN, Math.round(w * Math.pow(v / V, 2))), a = G * (1 - Math.pow(v / V, 2));
    /* the scene: the skydiver seen from the side, held in the middle. One force scale for both arrows
       (170 units for the 1,078 N of the heaviest skydiver), so equal forces are equal arrows; the speed
       is 1.7 units a metre per second and the acceleration 12 units a metre per second squared. */
    const bx = 320, by = 345, S = 1.4, NU = 170 / (110 * G);
    F.rich(ctx, ['frontal area ', [fmt(q.A, 2) + ' m²', C('area')]], 40, 40, { size: 17 });
    text(ctx, 'drag coefficient ' + fmt(q.C, 2), 40, 66, PAL.ink, { size: 17 });
    P.only(ctx, 'spread', () => faller(ctx, bx, by, S, 'spread', cb), [0, 0]);
    P.only(ctx, 'head', () => faller(ctx, bx, by, S, 'head', cb), [0, 0]);
    const half = P.mix((k) => (k === 'head' ? 75 * S + 14 : 42));
    const Lw = NU * wN, Ld = NU * fN;
    arrow(ctx, bx, by + half, bx, by + half + Lw, cf, 5);
    text(ctx, 'w = ' + wN + ' N', bx, by + half + Lw + 24, cf, { size: 21, weight: 600, align: 'center' });
    if (Ld > 16) arrow(ctx, bx, by - half, bx, by - half - Ld, cf, 5);
    text(ctx, 'F_D = ' + fN + ' N', bx, by - half - Math.max(Ld, 30) - 24, cf, { size: 21, weight: 600, align: 'center' });
    const xv = bx - 195, xa = bx + 195, y0 = by - 50;
    if (v > 6) arrow(ctx, xv, y0, xv, y0 + 1.7 * v, cv, 5); else dot(ctx, xv, y0, cv, true, 5);
    text(ctx, 'v = ' + fmt(v, 1) + ' m/s', xv, y0 - 28, cv, { size: 21, weight: 600, align: 'center' });
    if (a > 0.9) arrow(ctx, xa, y0, xa, y0 + 12 * a, ca, 5); else dot(ctx, xa, y0, ca, true, 5);
    text(ctx, 'a = ' + fmt(a, 2) + ' m/s²', xa, y0 - 28, ca, { size: 21, weight: 600, align: 'center' });
    /* the graph: the falling speed against time. Fixed axes, 0 to 50 s by 0 to 120 m/s: the heaviest
       skydiver head first settles at 119 m/s in the 49 s her run lasts, and the spread-eagle skydiver the
       figure opens with levels at 44 m/s in 18 s, so both positions are read on one frame. */
    const TR = 50, VR = 120, box = { l: 800, r: 1340, t: 110, b: 560 };
    const g = axes(ctx, box, [0, TR], [0, VR], { xl: 't (s)', xc: ct, yl: 'v (m/s)', yc: cv, nx: 5, ny: 4, fx: (x) => fmt(x, 0), fy: (y) => fmt(y, 0) });
    const other = p === 'head' ? 'spread' : 'head', Vo = vtOf(other), Vd = P.mix((k) => vtOf(k));
    inbox(ctx, box, () => {
      line(ctx, g.X(0), g.Y(Vo), g.X(TR), g.Y(Vo), alpha(cv, 0.45), 2, [10, 10]);
      line(ctx, g.X(0), g.Y(Vd), g.X(TR), g.Y(Vd), cv, 3, [10, 10]);
      P.curve(ctx, (k) => (s) => speed(vtOf(k), s), 0, TR, g.X, g.Y, cv, 5, 120);
      line(ctx, g.X(t), g.Y(0), g.X(t), g.Y(v), ct, 2, [4, 8]);
    });
    text(ctx, 'v_t = ' + fmt(V, 1) + ' m/s', box.r - 12, g.Y(Vd) - 22, cv, { size: 20, weight: 600, align: 'right', bg: PAL.panel });
    text(ctx, POST[other].name + ', ' + fmt(Vo, 1) + ' m/s', box.r - 12, g.Y(Vo) - 20, PAL.muted, { size: 17, align: 'right', bg: PAL.panel });
    const pt = pinned(ctx, box, g.X, g.Y, Math.min(t, TR), v, cv);
    text(ctx, 't = ' + fmt(t, 1) + ' s', Math.min(g.X(Math.min(t, TR)) + 12, box.r - 110), box.b - 20, ct, { size: 19, weight: 600, bg: PAL.panel });
    hits = [{ x: bx, y: by, r: 90, name: 'the ' + fmt(M.v, 0) + ' kg skydiver, ' + q.name }, { x: pt.x, y: pt.y, r: 18, name: 'the speed after ' + fmt(t, 1) + ' s' }];
    tex(d.readout, `\\kFnet = \\km\\kg - \\kFD = ${wN}\\ \\text{N} - ${fN}\\ \\text{N} = ${wN - fN}\\ \\text{N} \\\\ `
      + `\\kvt = \\sqrt{\\frac{2\\km\\kg}{\\krhomat C \\karea}} = \\sqrt{\\frac{2(${fmt(M.v, 0)}\\ \\text{kg})(9.80\\ \\text{m/s}^2)}{(1.21\\ \\text{kg/m}^3)(${fmt(q.C, 2)})(${fmt(q.A, 2)}\\ \\text{m}^2)}} = ${fmt(V, 1)}\\ \\text{m/s} = ${fmt(V * 3.6, 0)}\\ \\text{km/h}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => total() / 5), draw });
})();

/* =====================================================================
   SIM: the size of the falling body. Haldane's two bodies, one the
   85 kg spread-eagle skydiver of Example 5.2 and one of the same shape
   k times as long, so with k³ the weight and k² the frontal area. The
   graph is the speed each has after falling a height h, beside the speed
   with no air: the small body leaves the no-air curve within a few
   metres and never goes faster, however deep the shaft. The idea answers
   its sliders and no clock runs in it, so the figure is still.
===================================================================== */
(function () {
  const d = sim('sim-size', 640);
  const MASS = 85, AREA = 0.70, VT = Math.sqrt((2 * MASS * G) / (RHO_AIR * 1.0 * AREA));
  const K = ctl(d.controls, { label: 'k', cls: '', min: 0.05, max: 1, step: 0.01, value: 0.1, unit: '', dec: 2, aria: 'length of the smaller body as a fraction of the full-size one', specials: [{ at: 0.1, label: 'a tenth' }] });
  /* the height on a logarithmic slider, 1 m to 1000 m; the two marked heights are the 5.0 m tree of the
     squirrel problem and Haldane's thousand-yard mine shaft, 914 m */
  const hOf = (lg) => (Math.abs(lg - 2.96) < 0.005 ? 914 : Math.abs(lg - 0.7) < 0.005 ? 5 : +Math.pow(10, lg).toPrecision(2));
  const Hh = ctl(d.controls, { label: 'h', cls: 'position', min: 0, max: 3, step: 0.01, value: 2.96, unit: '', fmt: (lg) => fmt(hOf(lg), hOf(lg) < 10 ? 1 : 0) + ' m', aria: 'height of the fall', detents: [{ v: 0.7, label: 'tree' }, { v: 2.96, label: 'mine shaft' }] });
  /* the speed after falling the height h from rest, with a drag that goes as the square of the speed */
  const vOf = (vt, h) => { const f = Math.sqrt(1 - Math.exp((-2 * G * h) / (vt * vt))); return f > 0.999 ? vt : vt * f; };   /* within a thousandth, the terminal velocity itself */
  const areaLabel = (a) => (a >= 0.1 ? fmt(a, 2) + ' m²' : fmt(a * 1e4, a * 1e4 >= 20 ? 0 : 1) + ' cm²');
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const cv = C('velocity'), cx = C('position'), cm = C('mass'), cAr = C('area'), cA = F.ref('body-full'), cB = F.ref('body-small');
    const k = K.v, h = hOf(Hh.v), VB = VT * Math.sqrt(k), vA = vOf(VT, h), vB = vOf(VB, h), free = Math.sqrt(2 * G * h);
    headline(ctx, 'After falling ' + fmt(h, h < 10 ? 1 : 0) + ' m the full-size body lands at ' + fmt(vA, 1) + ' m/s and the smaller one at ' + fmt(vB, 1) + ' m/s; with no air both would land at ' + fmt(free, 1) + ' m/s');
    /* the scene: the two bodies to one scale (the full-size one 2 m long, as Example 5.2 takes it), each
       with the velocity it lands at, 4.4 units a metre per second */
    const xa = 200, xb = 500, yb = 260, S = 1.8, gy = 590;
    line(ctx, 50, gy, 620, gy, PAL.muted, 3);
    text(ctx, 'the ground', 335, gy + 24, PAL.muted, { size: 17, align: 'center' });
    const rows = [[xa, 1, cA, 'full size', vA], [xb, k, cB, fmt(k, 2) + ' times the length', vB]];
    for (const [x, kk, col, name, vv] of rows) {
      text(ctx, name, x, 128, col, { size: 20, weight: 600, align: 'center' });
      F.rich(ctx, [[massLabel(MASS * kk * kk * kk), cm], ', ', [areaLabel(AREA * kk * kk), cAr]], x, 156, { size: 18, align: 'center' });
      faller(ctx, x, yb, S * kk, 'spread', col);
      const y1 = yb + 50 * kk + 14;
      if (vv > 3.5) arrow(ctx, x, y1, x, y1 + 4.4 * vv, cv, 5);
      text(ctx, fmt(vv, 1) + ' m/s', x, y1 + Math.max(4.4 * vv, 6) + 24, cv, { size: 21, weight: 600, align: 'center' });
    }
    /* the graph: the landing speed against the height of the fall, the height on a logarithmic axis
       from 1 m to 1000 m. Fixed axes: the full-size body never passes 44.4 m/s, so the speed runs 0 to
       50 m/s and the no-air curve leaves the top at 128 m. */
    const box = { l: 760, r: 1340, t: 130, b: 520 };
    const g = axes(ctx, box, [0, 3], [0, 50], { xl: 'height of the fall (m)', xc: cx, yl: 'v (m/s)', yc: cv, nx: 3, ny: 5, fx: (x) => String(Math.round(Math.pow(10, x))), fy: (y) => fmt(y, 0) });
    F.plot(ctx, g, (lg) => Math.sqrt(2 * G * Math.pow(10, lg)), PAL.muted, { w: 3, dash: [10, 10] });
    F.plot(ctx, g, (lg) => vOf(VT, Math.pow(10, lg)), cA, { w: 5 });
    F.plot(ctx, g, (lg) => vOf(VB, Math.pow(10, lg)), cB, { w: 5 });
    inbox(ctx, box, () => line(ctx, g.X(Hh.v), g.Y(0), g.X(Hh.v), g.Y(Math.min(50, free)), cx, 2, [4, 8]));
    const pA = pinned(ctx, box, g.X, g.Y, Hh.v, vA, cA), pB = pinned(ctx, box, g.X, g.Y, Hh.v, vB, cB);
    const pF = free <= 50 ? pinned(ctx, box, g.X, g.Y, Hh.v, free, PAL.muted) : null;
    F.legend(ctx, g, [{ s: 'no air', color: PAL.muted, w: 3, dash: [10, 10] }, { s: 'full size', color: cA, w: 5 }, { s: 'smaller', color: cB, w: 5 }], { corner: 'tl' });
    hits = [{ x: pA.x, y: pA.y, r: 16, name: 'the full-size body lands at ' + fmt(vA, 1) + ' m/s' }, { x: pB.x, y: pB.y, r: 16, name: 'the smaller body lands at ' + fmt(vB, 1) + ' m/s' },
      { x: xa, y: yb, r: 100, name: 'the full-size body, ' + massLabel(MASS) }, { x: xb, y: yb, r: Math.max(24, 100 * k), name: 'the smaller body, ' + massLabel(MASS * k * k * k) }];
    if (pF) hits.push({ x: pF.x, y: pF.y, r: 16, name: 'with no air, ' + fmt(free, 1) + ' m/s' });
    tex(d.readout, `\\text{smaller body: }\\ \\kvt = \\sqrt{\\frac{2(k^3\\km)\\kg}{\\krhomat C(k^2\\karea)}} = \\sqrt{k}\\,\\sqrt{\\frac{2\\km\\kg}{\\krhomat C\\karea}} = \\sqrt{${fmt(k, 2)}}\\,(${fmt(VT, 1)}\\ \\text{m/s}) = ${fmt(VB, 1)}\\ \\text{m/s}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: Stokes' law. A steel bead sinks through motor oil at the one
   steady speed at which the drag matches its weight, and that speed
   grows as the square of the radius. The fall is timed and finite, so it
   loops with the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-stokes', 800);
  const R = ctl(d.controls, { label: '\\krad', cls: 'position', min: 0.5, max: 4, step: 0.1, value: 1.5, unit: 'mm', dec: 1, onInput: reset, aria: 'radius of the bead' });
  const ETA = ctl(d.controls, { label: '\\ketav', cls: 'viscosity', min: 0.1, max: 2, step: 0.01, value: 0.76, unit: 'kg/(m·s)', dec: 2, onInput: reset, aria: 'viscosity of the fluid' });
  const DROP = 0.6, RHO_OIL = 900;
  const steady = (rmm) => (2 * RHO_STEEL * Math.pow(rmm / 1000, 2) * G) / (9 * ETA.v);
  /* Stokes' law holds while the flow round the bead stays smooth, which is while the Reynolds number
     ρ v (2r) / η is of order one or less. Solving Re = 1 for the radius gives the largest bead this
     oil will carry smoothly, past which the drawing has no claim to make. */
  const rSmooth = () => 1000 * Math.cbrt((9 * ETA.v * ETA.v) / (4 * RHO_OIL * RHO_STEEL * G));
  const mass = () => RHO_STEEL * (4 / 3) * Math.PI * Math.pow(R.v / 1000, 3);
  const total = () => DROP / steady(R.v);
  const cy = cycle(total, 1.2);
  function reset() { cy.reset(); }
  function draw() {
    const { ctx } = begin(d.c);
    const cf = C('force'), cv = C('velocity');
    const T = total(), t = cy.now(), v = steady(R.v), s = Math.min(DROP, v * t), w = mass() * G;
    /* the scene: a jar of oil with the bead sinking through it */
    const top = 110, bot = 740, xl = 200, xr = 460, xc = 330, surf = 150;
    const co = F.ref('oil');
    jar(ctx, xl, xr, top, bot, surf, co);
    text(ctx, 'motor oil', xc, surf - 26, co, { size: 17, align: 'center' });
    const Y = (m) => 230 + (m / DROP) * 410;
    for (let i = 0; i <= 6; i++) {
      const m = (DROP * i) / 6;
      line(ctx, xl, Y(m), xl + 12, Y(m), PAL.muted, 2);
      text(ctx, fmt(m * 100, 0) + ' cm', xl - 12, Y(m), PAL.muted, { size: 17, align: 'right' });
    }
    const rad = 5 + 5 * R.v, py = Y(s);
    arrow(ctx, xc, py + rad + 6, xc, py + rad + 66, cf, 5);
    text(ctx, 'w', xc + 16, py + rad + 40, cf, { size: 20, weight: 600 });
    arrow(ctx, xc, py - rad - 6, xc, py - rad - 66, cf, 5);
    text(ctx, 'F_s', xc + 16, py - rad - 40, cf, { size: 20, weight: 600 });
    dot(ctx, xc, py, F.ref('bead'), true, rad);
    text(ctx, fmt(v * 1000, 1) + ' mm/s', xr + 20, py, cv, { size: 20, weight: 600 });
    /* the graph: the steady speed against the radius of the bead */
    /* fixed axes: the radius slider stops at 4 mm, so the radius runs 0 to 4 mm. The largest bead in
       the thinnest oil the viscosity slider allows would sink at 2,720 mm/s, and an axis that tall
       would leave the motor oil the figure opens with, in which that bead sinks at 358 mm/s, in an
       eighth of the height. So the speed axis is fixed at 0 to 400 mm/s, which holds that oil
       comfortably, and a thinner one carries the bead off the top as a pinned marker. Neither range
       changes as a slider moves. */
    const VR = 400, box = { l: 700, r: 1320, t: 210, b: 620 };
    const g = axes(ctx, box, [0, 4], [0, VR],
      { xl: 'r (mm)', xc: C('position'), yl: 'v (mm/s)', yc: cv, nx: 4, ny: 4, fy: (y) => fmt(y, 0) });
    const rMax = rSmooth(), rough = R.v > rMax;
    inbox(ctx, box, () => {
      /* the curve is drawn in the velocity hue while Stokes' law holds and greyed past the radius at
         which the flow round the bead stops being smooth */
      curve(ctx, (x) => steady(x) * 1000, 0, Math.min(4, rMax), g.X, g.Y, cv, 5, 90);
      if (rMax < 4) {
        curve(ctx, (x) => steady(x) * 1000, rMax, 4, g.X, g.Y, PAL.muted, 5, 90);
        line(ctx, g.X(rMax), box.t, g.X(rMax), box.b, PAL.muted, 2, [8, 8]);
      }
      line(ctx, g.X(R.v), g.Y(0), g.X(R.v), g.Y(v * 1000), PAL.muted, 2, [4, 8]);
      line(ctx, g.X(0), g.Y(v * 1000), g.X(R.v), g.Y(v * 1000), cv, 2, [4, 8]);
    });
    /* above the frame, where neither the live point nor its drop lines reach */
    if (rMax < 4) {
      const say = 'past ' + fmt(rMax, 1) + ' mm the flow is no longer smooth', lw = 1.15 * F.measure(ctx, say, { size: 17 });
      text(ctx, say, Math.min(Math.max(g.X(rMax), box.l + 160 + lw / 2), 1390 - lw / 2), box.t - 16, PAL.muted, { size: 17, align: 'center' });
    }
    pinned(ctx, box, g.X, g.Y, R.v, v * 1000, rough ? PAL.muted : cv, fmt(v * 1000, 1) + ' mm/s');
    topline(ctx, rough
      ? 'The flow round a ' + fmt(R.v, 1) + ' mm bead in this oil is not smooth, so Stokes\u2019 law no longer holds and ' + fmt(v * 1000, 1) + ' mm/s is only what it would predict'
      : s >= DROP - 1e-9 ? 'The bead reached the bottom, ' + fmt(DROP * 100, 0) + ' cm down, after ' + fmt(T, 1) + ' s at a steady ' + fmt(v * 1000, 1) + ' mm/s'
        : 'After ' + fmt(t, 1) + ' s the bead has sunk ' + fmt(s * 100, 1) + ' cm at a steady ' + fmt(v * 1000, 1) + ' mm/s');
    tex(d.readout, `\\kFs = 6\\pi\\krad\\ketav\\kv = 6\\pi(${sciTex(R.v / 1000, 2)}\\ \\text{m})(${fmt(ETA.v, 2)}\\ \\text{kg/(m}\\cdot\\text{s)})(${fmt(v, 4)}\\ \\text{m/s}) = ${sciTex(w, 2)}\\ \\text{N} \\\\ `
      + `\\km\\kg = (${sciTex(mass(), 2)}\\ \\text{kg})(9.80\\ \\text{m/s}^2) = ${sciTex(w, 2)}\\ \\text{N}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => total() / 5), draw });
})();
};
