/* Figures for section 4.4 Newton’s Third Law of Motion: Symmetry in Forces.
   Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.4'] = function (root, F) {
const { fmt, C, PAL, alpha, choice, hover, ctl, cycle, register, begin, line, arrow, dot, text, topline, scale, fixed } = F;
const sim = (id, H) => F.sim(root, id, H);

/* ---------- helpers shared by the figures ---------- */
const TAU = 2 * Math.PI;
/* a force that does not act on the chosen system is drawn at this opacity */
const DIM = 0.28;
/* a label that carries a symbol of the book, set as TeX so the symbol wears its colours */
const sym = (ctx, s, x, y, o = {}) => text(ctx, s, x, y, o.color ?? PAL.ink, { size: o.size ?? 21, weight: 600, align: o.align ?? 'left', bg: o.bg === false ? undefined : PAL.panel, tex: true });
/* a dashed boundary round a system of interest, with its name above the top left corner */
function boundary(ctx, l, t, r, b, label) {
  ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2.5; ctx.setLineDash([12, 10]);
  ctx.beginPath(); ctx.roundRect(l, t, r - l, b - t, 22); ctx.stroke(); ctx.restore();
  if (label) text(ctx, label, l + 8, t - 17, PAL.muted, { size: 18, weight: 600 });
}
/* a ruled panel for a free-body diagram, its title on the top line */
function panel(ctx, l, t, r, b, title) {
  ctx.save(); ctx.strokeStyle = PAL.rule; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.roundRect(l, t, r - l, b - t, 6); ctx.stroke(); ctx.restore();
  text(ctx, title, (l + r) / 2, t + 30, PAL.muted, { size: 18, align: 'center' });
}
/* an arrow laid over a body: a band the colour of the page first, so the arrow reads in front of it */
function over(ctx, x1, y1, x2, y2, color, a) {
  if (Math.abs(x2 - x1) < 2) return;
  ctx.save(); ctx.strokeStyle = PAL.panel; ctx.lineWidth = 15; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.globalAlpha *= a; arrow(ctx, x1, y1, x2, y2, color, 5); ctx.restore();
}
/* a swimmer lying face down, feet at (foot, y) against the wall on her right and her hip at hipX:
   the legs fold at the knee while she is tucked and straighten as the hip moves away, the arms
   reach ahead past the head. Limbs are round-ended bands, the near one drawn over the far one. */
function swimmerBody(ctx, foot, hipX, y, c) {
  const limb = (pts, w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); };
  const knee = (fy, hy) => { const dx = hipX - foot, dy = hy - fy, Ld = Math.hypot(dx, dy), l = 78, h = Math.sqrt(Math.max(0, l * l - (Ld * Ld) / 4)); return [foot + dx / 2 - (dy / Ld) * h, fy + dy / 2 - (-dx / Ld) * h * -1]; };
  const far = alpha(c, 0.55), sh = hipX - 122;
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  limb([[foot - 8, y + 34], knee(y + 34, y + 8), [hipX, y + 8]], 19, far);
  limb([[sh, y + 6], [sh - 150, y + 10]], 13, far);
  limb([[hipX, y + 2], [sh, y - 2]], 46, c);
  limb([[foot - 8, y + 20], knee(y + 20, y + 4), [hipX, y + 4]], 21, c);
  ctx.fillStyle = c; ctx.beginPath(); ctx.arc(sh - 52, y - 4, 27, 0, TAU); ctx.fill();
  limb([[sh, y - 6], [sh - 156, y - 2]], 14, c);
  ctx.restore();
}
/* a person leaning into a push, feet on the floor at y and hands on the grip (gx, gy): round-ended
   bands for the limbs, the far leg and arm paler and drawn first */
function pusher(ctx, x, y, gx, gy, c) {
  const limb = (pts, w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); };
  const mid = (a, b, l, side) => { const dx = b[0] - a[0], dy = b[1] - a[1], Ld = Math.hypot(dx, dy), h = Math.sqrt(Math.max(0, l * l - (Ld * Ld) / 4)); return [a[0] + dx / 2 + (dy / Ld) * h * side, a[1] + dy / 2 - (dx / Ld) * h * side]; };
  const hip = [x + 6, y - 172], sh = [x + 70, y - 268], back = [x - 84, y], front = [x + 26, y], far = alpha(c, 0.55);
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  limb([hip, mid(hip, back, 96, -1), back, [back[0] + 22, y - 2]], 21, far);
  limb([sh, mid(sh, [gx, gy + 6], 56, -1), [gx, gy + 6]], 14, far);
  limb([hip, sh], 50, c);
  limb([hip, mid(hip, front, 92, 1), front, [front[0] + 24, y - 2]], 22, c);
  ctx.fillStyle = c; ctx.beginPath(); ctx.arc(sh[0] + 26, sh[1] - 50, 29, 0, TAU); ctx.fill();
  limb([sh, mid(sh, [gx, gy], 56, -1), [gx, gy]], 15, c);
  ctx.restore();
}
/* the key every scene of force pairs shares */
const pairKey = (ctx, box, cf) => F.legend(ctx, box, [{ s: 'acts on the system', color: cf, w: 5 }, { s: 'acts on something else, or inside it', color: alpha(cf, DIM), w: 5 }], { corner: 'tl', panel: false, row: true, size: 17 });

/* =====================================================================
   FIGURE 4.9: the swimmer pushing off the wall of the pool. The pair of
   forces is drawn where each acts, and the reader chooses which body is
   the system: only the force on that body enters its free-body diagram.
   She pushes through the 0.50 m her legs straighten and then glides, so
   the figure has a clock and gets the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-swimmer', 604);
  const sys = choice(d.controls, { label: '\\text{system}', options: [{ value: 'swimmer', label: 'the swimmer' }, { value: 'wall', label: 'the wall' }], value: 'swimmer', aria: 'system of interest' });
  const Fp = ctl(d.controls, { label: '\\kF', cls: 'force', min: 100, max: 600, step: 10, value: 350, unit: 'N', dec: 0, onInput: reset, aria: 'force of each of the pair' });
  const mm = ctl(d.controls, { label: '\\km', cls: 'mass', min: 40, max: 90, step: 1, value: 60, unit: 'kg', dec: 0, onInput: reset, aria: 'mass of the swimmer' });
  const ro = F.readout(d);
  /* fixed scales. Her legs straighten through D = 0.50 m, which is 44 units of the silhouette at
     S = 2.6, so the pool is ruled at 228.8 units a metre. Forces are 0.2 unit a newton in the
     scene and in the free-body diagram alike: 600 N is 120 units, inside the wall's 160, and the
     weight of 90 kg, 882 N, is 176. Acceleration 10 units per m/s² (15 m/s² at most), speed 40
     units per m/s (3.87 m/s at most). */
  const D = 0.5, GLIDE = 1.2, S = 2.6, SC = (44 * S) / D, WALL = 800, WR = 960, Y0 = 290, KF = 0.2, KA = 10, KV = 40, G = 9.8;
  const SX = (mtr) => WALL - mtr * SC;
  const run = () => { const a = Fp.v / mm.v, tp = Math.sqrt((2 * D) / a), ve = a * tp; return { a, tp, ve, T: tp + GLIDE / ve }; };
  const cy = cycle(() => run().T, 1.2);
  function reset() { cy.reset(); }
  let hits = [];
  function draw() {
    const { ctx } = begin(d.c);
    const r = run(), tau = cy.now(), pushing = tau < r.tp - 1e-9, cf = C('force'), onHer = sys.value === 'swimmer';
    const s = pushing ? 0.5 * r.a * tau * tau : D + r.ve * (tau - r.tp), v = pushing ? r.a * tau : r.ve;
    const out = Math.max(s - D, 0), k = Math.min(s / D, 1), hx = 30 + 44 * k, foot = SX(out), hip = foot - hx * S, L = Fp.v * KF;
    topline(ctx, !pushing
      ? 'Her feet have left the wall at $\\kv = ' + fmt(r.ve, 2) + '\\ \\text{m/s}$, and both forces of the pair are gone'
      : onHer
        ? 'Of the pair, only $\\kFwallfeet$ acts on her, and its ' + fmt(Fp.v, 0) + ' N accelerate her away from the wall'
        : '$\\kFfeetwall$ acts on the wall, so it cannot cancel the force on her');
    pairKey(ctx, { l: 28, r: 780, t: 86, b: 200 }, cf);
    /* the pool: the water's surface, the wall she pushes off, the distance of her feet from it */
    line(ctx, 40, 180, WALL, 180, PAL.muted, 3, [22, 14]);
    text(ctx, 'the water’s surface', 44, 160, PAL.muted, { size: 17 });
    fixed(ctx, WALL, 150, WR - WALL, 370);
    ctx.save(); ctx.strokeStyle = F.ref('wall'); ctx.lineWidth = 3; ctx.strokeRect(WALL, 150, WR - WALL, 370); ctx.restore();
    text(ctx, 'the wall', (WALL + WR) / 2, 176, F.ref('wall'), { size: 18, weight: 600, align: 'center', bg: PAL.panel });
    scale(ctx, SX, 0, 3, 1, 548, 'm', 1);
    /* the system of interest, round her or round the wall */
    const her = [hip - 300, Y0 - 66, foot + 4, Y0 + 118], B = sys.mix((u) => (u === 'swimmer' ? her : [WALL - 8, 142, WR + 8, 528]));
    boundary(ctx, B[0], B[1], B[2], B[3]);
    text(ctx, 'the system of interest', Math.max(B[0] + 8, 36), B[1] - 17, PAL.muted, { size: 18, weight: 600, bg: PAL.panel });
    /* the swimmer, lying feet to the wall: her legs straighten through the push, then she glides streamlined */
    swimmerBody(ctx, foot, hip, Y0, F.ref('swimmer'));
    /* the pair of forces, each drawn on the body it acts on, to one scale */
    if (pushing) {
      const yF = Y0 + 27, aH = sys.mix((u) => (u === 'swimmer' ? 1 : DIM)), aW = sys.mix((u) => (u === 'wall' ? 1 : DIM));
      over(ctx, WALL, yF, WALL - L, yF, cf, aH);
      over(ctx, WALL, yF, WALL + L, yF, cf, aW);
      F.faded(ctx, Math.max(aH, 0.8), [0, 0], () => { sym(ctx, '$\\kFwallfeet$', WALL - 14, Y0 + 142, { align: 'right' }); });
      F.faded(ctx, Math.max(aW, 0.8), [0, 0], () => sym(ctx, '$\\kFfeetwall$', WALL + 12, yF + 34));
    }
    /* her acceleration while the wall pushes, and her velocity */
    if (pushing) { arrow(ctx, hip, 472, hip - r.a * KA, 472, C('acceleration'), 5); text(ctx, 'a = ' + fmt(r.a, 2) + ' m/s²', hip - r.a * KA - 12, 472, C('acceleration'), { size: 20, weight: 600, align: 'right' }); }
    if (v > 0.05) { arrow(ctx, hip, 506, hip - v * KV, 506, C('velocity'), 5); text(ctx, 'v = ' + fmt(v, 2) + ' m/s', hip - v * KV - 12, 506, C('velocity'), { size: 20, weight: 600, align: 'right' }); }
    /* the free-body diagram of the chosen system, the forces at the scene's scale */
    const PL = 985, fx = 1220, fy = 340, w = mm.v * G;
    panel(ctx, PL, 104, 1384, 580, onHer ? 'Free-body diagram of the swimmer' : 'Forces on the wall along her push');
    sys.only(ctx, 'swimmer', () => {
      arrow(ctx, fx, fy, fx, fy - w * KF, cf, 5); text(ctx, 'BF = ' + fmt(w, 0) + ' N', fx + 16, fy - w * KF + 10, cf, { size: 20, weight: 600 });
      arrow(ctx, fx, fy, fx, fy + w * KF, cf, 5); text(ctx, 'w = ' + fmt(w, 0) + ' N', fx + 16, fy + w * KF - 10, cf, { size: 20, weight: 600 });
      if (pushing) { arrow(ctx, fx, fy, fx - L, fy, cf, 5); sym(ctx, '$\\kFwallfeet$', fx - 14, fy - 26, { align: 'right', bg: false }); }
      else text(ctx, 'no horizontal force', fx - 22, fy, PAL.muted, { size: 17, align: 'right' });
      dot(ctx, fx, fy, F.ref('swimmer'), true, 10);
    });
    sys.only(ctx, 'wall', () => {
      if (pushing) {
        arrow(ctx, fx, fy, fx + L, fy, cf, 5); sym(ctx, '$\\kFfeetwall$', fx + 14, fy - 26, { bg: false });
        arrow(ctx, fx, fy, fx - L, fy, cf, 5); text(ctx, 'F_{pool on wall}', fx - 14, fy + 28, cf, { size: 21, weight: 600, align: 'right' });
        text(ctx, 'The rest of the pool holds the wall,', (PL + 1384) / 2, fy + 70, PAL.muted, { size: 17, align: 'center' });
        text(ctx, 'so the wall does not move.', (PL + 1384) / 2, fy + 96, PAL.muted, { size: 17, align: 'center' });
      } else text(ctx, 'nothing pushes on the wall now', (PL + 1384) / 2, fy + 70, PAL.muted, { size: 17, align: 'center' });
      dot(ctx, fx, fy, F.ref('wall'), true, 10);
    });
    hits = [{ x: hip - 60, y: Y0, r: 70, name: 'the swimmer' }, { x: (WALL + WR) / 2, y: 400, r: 70, name: 'the wall of the pool' }];
    const Fn = pushing ? Fp.v : 0;
    ro.set(onHer
      ? `\\ka = \\frac{\\kFwallfeet}{\\km} = \\frac{${fmt(Fn, 0)}\\ \\text{N}}{${fmt(mm.v, 0)}\\ \\text{kg}} = ${fmt(Fn / mm.v, 2)}\\ \\text{m/s}^2`
      : `\\kFfeetwall = \\kFwallfeet = ${fmt(Fn, 0)}\\ \\text{N}`, undefined, { form: sys.value });
  }
  hover(d.stage, () => hits);
  register(d.fig, { update: (dt) => cy.step(dt, () => run().T / 5), draw });
})();

/* =====================================================================
   SIM: thrust. A rocket in empty space throws gas backward. The engine
   speeds each lump of gas up to the exhaust speed, which takes a force on
   the gas, and the gas pushes the rocket forward just as hard. The view
   rides with the rocket; the ruled distance slides back under it as it
   gains speed. The burn lasts 4 s, so the figure gets the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-rocket', 440);
  const mg = ctl(d.controls, { label: '\\km_{\\htmlData{ref=gas}{\\text{gas}}}', cls: 'mass', key: 'gas', min: 2, max: 6, step: 0.5, value: 4, unit: 'kg each second', dec: 1, onInput: reset, aria: 'mass of gas thrown back each second' });
  const vg = ctl(d.controls, { label: '\\kv_{\\htmlData{ref=gas}{\\text{gas}}}', cls: 'velocity', min: 1500, max: 3500, step: 100, value: 2500, unit: 'm/s', dec: 0, onInput: reset, aria: 'speed the gas leaves at' });
  const mm = ctl(d.controls, { label: '\\km_{\\htmlData{ref=rocket}{\\text{rocket}}}', cls: 'mass', key: 'rocket', min: 800, max: 3000, step: 100, value: 1200, unit: 'kg', dec: 0, onInput: reset, aria: 'mass of the rocket' });
  /* fixed scales: the burn lasts 4 s and a lump of gas leaves every 0.2 s. Force 12 units a
     kilonewton (21 kN at most, 252 units); the gas crosses the view at 0.2 unit per m/s of its
     speed, so the lumps stand 60 to 140 units apart and the largest, 1.2 kg, is 44 across; the
     rocket's speed 2 units per m/s (105 m/s at most); the distance it has covered 4 units a
     metre. The 24 kg the rocket loses at most in the burn is left out of its mass. */
  const BURN = 4, DT = 0.2, RX = 900, RY = 220, RS = 2.4, NOZ = RX - 46 * RS, KF = 12, KG = 0.2, KV = 2, KD = 4;
  const run = () => { const Fn = mg.v * vg.v, a = Fn / mm.v; return { Fn, a }; };
  const cy = cycle(() => BURN, 1.2);
  function reset() { cy.reset(); }
  let hits = [];
  /* the rocket, flying to the right, outlined so that the thrust drawn on it reads */
  function body(ctx, c) {
    ctx.save(); ctx.translate(RX, RY); ctx.scale(RS, RS); ctx.strokeStyle = c; ctx.fillStyle = PAL.panel; ctx.lineWidth = 4 / RS; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(-30, -20); ctx.lineTo(-46, -44); ctx.lineTo(-58, -20); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-30, 20); ctx.lineTo(-46, 44); ctx.lineTo(-58, 20); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(62, 0); ctx.lineTo(16, -20); ctx.lineTo(-46, -20); ctx.lineTo(-46, 20); ctx.lineTo(16, 20); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(30, 0, 6, 0, TAU); ctx.stroke(); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const r = run(), tau = cy.now(), cf = C('force'), cg = F.ref('gas');
    const v = r.a * tau, s = 0.5 * r.a * tau * tau, L = (r.Fn / 1000) * KF, lump = mg.v * DT;
    topline(ctx, 'After $\\kt = ' + fmt(tau, 2) + '\\ \\text{s}$ the engine has thrown ' + fmt(mg.v * tau, 1) + ' kg of gas backward, and the rocket has gained $\\kv = ' + fmt(v, 1) + '\\ \\text{m/s}$');
    /* the distance covered since the burn began, sliding back under the rocket */
    const X = (mtr) => RX + (mtr - s) * KD, lo = Math.max(0, Math.ceil((s - (RX - 40) / KD) / 20) * 20), hi = Math.floor((s + (1360 - RX) / KD) / 20) * 20;
    line(ctx, 30, 388, 1370, 388, PAL.rule, 2);
    scale(ctx, X, lo, hi, 20, 388, 'm', 1);
    /* the gas: one lump every 0.2 s, leaving the nozzle at the exhaust speed */
    ctx.save(); ctx.fillStyle = alpha(cg, 0.75);
    const rad = 20 * Math.sqrt(lump);
    for (let i = Math.floor(tau / DT); i >= 0; i--) {
      const x = NOZ - 24 - (tau - i * DT) * vg.v * KG; if (x < -30) break;
      ctx.beginPath(); ctx.arc(x, RY, rad, 0, TAU); ctx.fill();
    }
    ctx.restore();
    body(ctx, F.ref('rocket'));
    /* the pair, to one scale: the rocket's force on the gas, and the thrust the gas returns */
    arrow(ctx, NOZ, RY, NOZ + L, RY, cf, 5);
    text(ctx, 'thrust', NOZ + 16, RY + 27, cf, { size: 19, weight: 600 });
    over(ctx, NOZ - 6, RY, NOZ - 6 - L, RY, cf, 1);
    text(ctx, 'the rocket’s force on the gas', NOZ - 76, RY - 44, cf, { size: 19, weight: 600, align: 'right', bg: PAL.panel });
    F.rich(ctx, ['every 0.2 s, ', [fmt(lump, 2) + ' kg', C('mass')], ' of gas leaves at ', [fmt(vg.v, 0) + ' m/s', C('velocity')]], 40, RY + 62, { size: 18 });
    if (v > 0.2) { arrow(ctx, RX - 60, 336, RX - 60 + v * KV, 336, C('velocity'), 5); text(ctx, 'v = ' + fmt(v, 1) + ' m/s', RX - 60 + v * KV + 12, 336, C('velocity'), { size: 20, weight: 600 }); }
    hits = [{ x: RX, y: RY, r: 90, name: 'the rocket' }, { x: NOZ - 200, y: RY, r: 40, name: 'the exhaust gas' }, { x: 700, y: 400, r: 30, name: 'distance covered since the burn began' }];
    F.tex(d.readout, `\\kF = \\km\\,\\frac{\\Delta\\kv}{\\Delta\\kt} = (${fmt(lump, 2)}\\ \\text{kg})\\,\\frac{${fmt(vg.v, 0)}\\ \\text{m/s}}{${fmt(DT, 1)}\\ \\text{s}} = ${fmt(r.Fn, 0)}\\ \\text{N} \\\\ \\ka = \\frac{\\kF}{\\km} = \\frac{${fmt(r.Fn, 0)}\\ \\text{N}}{${fmt(mm.v, 0)}\\ \\text{kg}} = ${fmt(r.a, 2)}\\ \\text{m/s}^2`);
  }
  hover(d.stage, () => hits);
  register(d.fig, { update: (dt) => cy.step(dt, () => BURN / 4.5), draw });
})();

/* =====================================================================
   FIGURE 4.10: the professor, her cart and the systems of Examples 4.3
   and 4.4. The five forces of the book's drawing stand on the scene to one
   scale; the reader chooses the system, and only the forces that act on it
   from outside enter its free-body diagram. Nothing here has a clock: the
   figure answers its controls and is still.
===================================================================== */
(function () {
  const d = sim('sim-cart', 740);
  const sys = choice(d.controls, { label: '\\text{system}', options: [{ value: '1', label: 'System 1' }, { value: '2', label: 'System 2' }, { value: 'p', label: 'the professor' }], value: '1', aria: 'system of interest' });
  const Ff = ctl(d.controls, { label: '\\kFfloor', cls: 'force', min: 100, max: 250, step: 5, value: 150, unit: 'N', dec: 0, aria: 'force of the floor on the professor' });
  const fr = ctl(d.controls, { label: '\\kff', cls: 'force', key: 'friction', min: 0, max: 60, step: 1, value: 24, unit: 'N', dec: 1, aria: 'forces opposing the motion' });
  const mc = ctl(d.controls, { label: '\\km_{\\htmlData{ref=cart}{\\text{cart}}}', cls: 'mass', min: 5, max: 60, step: 1, value: 19, unit: 'kg', dec: 1, aria: 'mass of the cart and its equipment' });
  const ro = F.readout(d);
  /* fixed scales: every force is 1.2 units a newton, on the scene and in the free-body diagram
     alike, so 250 N is 300 units and the largest push on the cart (151 N, at 250 N on the floor,
     60 N opposing and a 60 kg cart) is 181; f is to scale too. Acceleration is 70 units per
     m/s² (3.57 m/s² at most). Her mass is the book's 65.0 kg. */
  const MP = 65, KF = 1.2, KA = 70, FLOOR = 600, PX = 330, HX = 490, HY = 362, FY = 628, WX = 788, WY = 580;
  const run = () => { const M = MP + mc.v, Fnet = Ff.v - fr.v, a = Fnet / M, Fprof = mc.v * a + fr.v; return { M, Fnet, a, Fprof }; };
  /* what each system is: its boundary, its name, the forces on it along the motion and its mass.
     The scene's arrows are, in order, F_foot, F_floor, F_cart, F_prof, f; `on` marks those that
     act on the system from outside. */
  const SYS = {
    1: { name: 'System 1', box: [208, 212, 808, 648], on: [0, 1, 0, 0, 1] },
    2: { name: 'System 2', box: [502, 250, 808, 614], on: [0, 0, 0, 1, 1] },
    p: { name: 'the professor', box: [208, 212, 498, 648], on: [0, 1, 1, 0, 0] },
  };
  const parts = (u, r) => (u === '1' ? { fwd: Ff.v, back: fr.v, m: r.M } : u === '2' ? { fwd: r.Fprof, back: fr.v, m: mc.v } : { fwd: Ff.v, back: r.Fprof, m: MP });
  /* the cart of demonstration equipment, outlined: two shelves on posts, a push handle, wheels on the floor */
  function cartBody(ctx, c) {
    ctx.save(); ctx.strokeStyle = c; ctx.fillStyle = PAL.panel; ctx.lineWidth = 3.5; ctx.lineJoin = 'round';
    const box = (l, t, w, h) => { ctx.beginPath(); ctx.rect(l, t, w, h); ctx.fill(); ctx.stroke(); };
    box(700, 334, 62, 52); box(566, 498, 104, 50); box(596, 458, 72, 40); box(684, 508, 84, 40);
    ctx.beginPath(); ctx.moveTo(778, 386); ctx.lineTo(778, 326); ctx.stroke(); ctx.beginPath(); ctx.arc(778, 304, 22, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(526, 396); ctx.lineTo(526, 548); ctx.moveTo(784, 396); ctx.lineTo(784, 548); ctx.moveTo(526, 388); ctx.lineTo(HX, HY); ctx.stroke();
    ctx.fillStyle = c; ctx.fillRect(510, 386, 290, 10); ctx.fillRect(510, 548, 290, 10);
    ctx.beginPath(); ctx.arc(546, WY, 20, 0, TAU); ctx.arc(766, WY, 20, 0, TAU); ctx.fill(); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const r = run(), cf = C('force'), u = sys.value, me = SYS[u], now = parts(u, r);
    topline(ctx, u === '1'
      ? '$\\kFprof$ and $\\kFcart$ are inside System 1 and cancel, and $\\kFfoot$ acts on the floor: only $\\kFfloor$ and $\\kff$ are left'
      : u === '2'
        ? 'Seen from System 2, $\\kFprof$ comes from outside, so it enters Newton’s second law'
        : 'The cart pushes back on her with $\\kFcart$, so only ' + fmt(Ff.v - r.Fprof, 1) + ' N of $\\kFfloor$ are left to accelerate her');
    pairKey(ctx, { l: 28, r: 860, t: 100, b: 200 }, cf);
    /* the floor, the professor and the cart */
    line(ctx, 30, FLOOR, 856, FLOOR, F.ref('floor'), 3);
    text(ctx, 'the floor', 44, FLOOR + 76, F.ref('floor'), { size: 18, weight: 600 });
    const B = sys.mix((x) => SYS[x].box);
    boundary(ctx, B[0], B[1], B[2], B[3]);
    text(ctx, me.name, B[0] + 8, B[1] - 17, PAL.muted, { size: 18, weight: 600 });
    cartBody(ctx, F.ref('cart'));
    pusher(ctx, PX, FLOOR, HX, HY, F.ref('professor'));
    /* the five forces of the book's drawing, each where it acts, all to one scale */
    const A = sys.mix((x) => SYS[x].on.map((q) => (q ? 1 : DIM))), Lf = Ff.v * KF, Lp = r.Fprof * KF, Lr = fr.v * KF;
    const lab = (i, s, x, y, align) => F.faded(ctx, Math.max(A[i], 0.8), [0, 0], () => sym(ctx, s, x, y, { align }));
    over(ctx, PX, FY, PX - Lf, FY, cf, A[0]); lab(0, '$\\kFfoot$', Math.max(PX - Lf / 2, 70), FY + 32, 'center');
    over(ctx, PX, FY, PX + Lf, FY, cf, A[1]); lab(1, '$\\kFfloor$', PX + Lf / 2, FY + 32, 'center');
    over(ctx, HX, HY, HX - Lp, HY, cf, A[2]); lab(2, '$\\kFcart$', HX - 12, HY + 36, 'right');
    over(ctx, HX, HY, HX + Lp, HY, cf, A[3]); lab(3, '$\\kFprof$', HX + 14, HY - 34, 'left');
    if (Lr >= 2) { over(ctx, WX + Lr, WY, WX, WY, cf, A[4]); lab(4, '$\\kff$', WX + Lr + 12, WY, 'left'); }
    /* the free-body diagram of the chosen system: what acts on it from outside, at the scene's scale */
    const PL = 880, PR = 1384, fx = 1070, fy = 292, q = sys.mix((x) => { const p = parts(x, r); return [p.fwd, p.back]; });
    panel(ctx, PL, 104, PR, 716, 'Free-body diagram of ' + me.name);
    const prime = u === '1' ? '' : u === '2' ? '′' : '″';
    arrow(ctx, fx, fy, fx, fy - 92, cf, 4); text(ctx, 'N' + prime, fx + 14, fy - 84, cf, { size: 20, weight: 600 });
    arrow(ctx, fx, fy, fx, fy + 92, cf, 4); text(ctx, 'w' + prime, fx + 14, fy + 84, cf, { size: 20, weight: 600 });
    arrow(ctx, fx, fy, fx + q[0] * KF, fy, cf, 5); arrow(ctx, fx, fy, fx - q[1] * KF, fy, cf, 5);
    dot(ctx, fx, fy, u === '1' ? PAL.ink : F.ref(u === '2' ? 'cart' : 'professor'), true, 10);
    const names = u === '1' ? ['\\kFfloor', '\\kff'] : u === '2' ? ['\\kFprof', '\\kff'] : ['\\kFfloor', '\\kFcart'];
    sym(ctx, '$' + names[0] + '$ = ' + fmt(now.fwd, 1) + ' N', fx + 26, fy - 26, { bg: false });
    if (now.back > 0) sym(ctx, '$' + names[1] + '$ = ' + fmt(now.back, 1) + ' N', fx - 14, fy + 28, { align: 'right', bg: false });
    text(ctx, 'N' + prime + ' and w' + prime + ' cancel; their lengths are not to scale', (PL + PR) / 2, 426, PAL.muted, { size: 17, align: 'center' });
    line(ctx, PL + 24, 458, PR - 24, 458, PAL.rule, 1.5);
    /* the net external force, apart from the forces it sums, and the acceleration it gives the system's mass */
    const net = q[0] - q[1];
    sym(ctx, '$\\kFnet$ = ' + fmt(now.fwd - now.back, 1) + ' N on $\\km$ = ' + fmt(now.m, 1) + ' kg', PL + 30, 494, { bg: false });
    arrow(ctx, PL + 30, 528, PL + 30 + net * KF, 528, cf, 5);
    sym(ctx, '$\\ka$ = ' + fmt(r.a, 2) + ' m/s²', PL + 30, 592, { bg: false });
    arrow(ctx, PL + 30, 626, PL + 30 + r.a * KA, 626, C('acceleration'), 5);
    text(ctx, 'the same for every system', PL + 30, 668, PAL.muted, { size: 17 });
    const n1 = (x) => fmt(x, 1) + '\\ \\text{N}', a2 = fmt(r.a, 2) + '\\ \\text{m/s}^2';
    ro.set(u === '1'
      ? `\\ka = \\frac{\\kFfloor - \\kff}{\\km} = \\frac{${n1(Ff.v)} - ${n1(fr.v)}}{${fmt(r.M, 1)}\\ \\text{kg}} = ${a2}`
      : u === '2'
        ? `\\kFprof = \\km\\ka + \\kff = (${fmt(mc.v, 1)}\\ \\text{kg})(${a2}) + ${n1(fr.v)} = ${n1(r.Fprof)}`
        : `\\ka = \\frac{\\kFfloor - \\kFcart}{\\km} = \\frac{${n1(Ff.v)} - ${n1(r.Fprof)}}{${fmt(MP, 1)}\\ \\text{kg}} = ${a2}`, undefined, { form: u });
  }
  hover(d.stage, () => [{ x: 360, y: 430, r: 80, name: 'the professor' }, { x: 660, y: 470, r: 90, name: 'the cart of demonstration equipment' }]);
  register(d.fig, { update: () => {}, draw });
})();

};
