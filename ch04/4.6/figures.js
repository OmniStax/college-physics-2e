/* Figures for section 4.6 Problem-Solving Strategies. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.6'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, headline, fixed } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const G = 9.80;                       /* the acceleration due to gravity, as the chapter takes it */
const RAD = Math.PI / 180;

/* =====================================================================
   FIGURE 4.20: Tarzan on his vine. One large sketch carries steps (a) to
   (c) of the book: the forces as arrows and the system of interest, with
   his pull on the vine left outside it. Beside it stand the free-body
   diagram and the head-to-tail sum. The acceleration pulls the tension
   away from the weight, and the gap that opens in the sum is the net
   force, which is what "T = -w, if Tarzan is stationary" means. Nothing
   here has a time in it, so the figure is still.
===================================================================== */
(function () {
  const H = 720;
  const d = sim('sim-tarzan', H);
  const M = ctl(d.controls, { label: '\\km', cls: 'mass', min: 40, max: 100, step: 5, value: 80, unit: 'kg', dec: 0, aria: 'mass of the man' });
  const A = ctl(d.controls, { label: '\\ka', cls: 'acceleration', min: -2.5, max: 2.5, step: 0.25, value: 0, unit: 'm/s²', dec: 2, aria: 'vertical acceleration',
    specials: [{ at: 0, label: 'stationary' }] });
  const ro = F.readout(d);
  const K = 0.15, K2 = 0.21;          /* units per newton: on the man (1230 N draws 185) and in the two diagrams (258) */
  const S = 3.4, FEET = 616, CX = 300;  /* the man's scale, the height of his feet and the line of the vine */
  const GRIP = FEET - 104 * S, STOM = FEET - 55 * S;
  const FX = 800, FY = 380;           /* the dot of the free-body diagram */
  const SX = 1120, BASE = 570;        /* the head-to-tail sum and the level it starts from */
  const num = (v) => fmt(v, 0);
  const lead = (ctx, x1, y, x2) => line(ctx, x1, y, x2, y, alpha(C('force'), 0.5), 2, [4, 5]);
  function draw() {
    const { ctx } = begin(d.c);
    const m = M.v, a = A.v, still = Math.abs(a) < 1e-9, w = m * G, T = m * (G + a), gap = T - w, way = a > 0 ? 'up' : 'down';
    const lines = headline(ctx, still
      ? `Tarzan hangs still, so the tension $\\kTf$ of ${num(T)} N is exactly his weight $\\kwgt$ of ${num(w)} N`
      : `Tarzan accelerates ${way}ward at ${fmt(Math.abs(a), 2)} m/s², so the tension $\\kTf$ of ${num(T)} N is ${num(Math.abs(gap))} N ${a > 0 ? 'more' : 'less'} than his weight $\\kwgt$`);
    const lab = F.labeller(ctx, H, { headline: lines });
    const force = C('force'), out = alpha(C('force'), 0.55);

    /* the sketch: the vine, the man, the boundary of the system of interest */
    line(ctx, CX, 78, CX, GRIP + 8, F.ref('vine'), 6);
    F.person(ctx, CX, FEET, F.ref('tarzan'), { s: S, reach: { x: CX + 2, y: GRIP } });
    ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3; ctx.setLineDash([12, 10]);
    ctx.beginPath(); ctx.roundRect(CX - 118, GRIP - 22, 236, FEET - GRIP + 34, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'system of interest', CX + 134, FEET - 40, PAL.muted, { size: 20, align: 'left' });
    /* the two forces on him: the tension up from his hands, the weight down from the middle of his body */
    const xl = CX - 62;
    lead(ctx, xl, GRIP, CX - 8); arrow(ctx, xl, GRIP, xl, GRIP - K * T, force, 5);
    lab.beside({ x1: xl, y1: GRIP, x2: xl, y2: GRIP - K * T }, 'left', 'T', force, 26, { offset: 0.6, gap: 18 });
    lead(ctx, xl, STOM, CX - 30); arrow(ctx, xl, STOM, xl, STOM + K * w, force, 5);
    lab.beside({ x1: xl, y1: STOM, x2: xl, y2: STOM + K * w }, 'right', 'w', force, 26, { offset: 0.6, gap: 18 });
    /* his pull on the vine acts on the vine, so it stands outside the boundary */
    const xr = CX + 170, yv = GRIP - 34;
    lead(ctx, CX + 6, yv, xr); arrow(ctx, xr, yv, xr, yv + K * T, out, 5);
    text(ctx, 'F_T', xr + 20, yv + 26, out, { size: 26, weight: 600, align: 'left' });
    text(ctx, 'his pull on the vine acts', xr + 20, yv + 62, PAL.muted, { size: 20, align: 'left' });
    text(ctx, 'on the vine, so it is left out', xr + 20, yv + 88, PAL.muted, { size: 20, align: 'left' });
    if (!still) {                                  /* which way he speeds up */
      const xa = CX - 190, la = Math.sign(a) * (24 + 34 * Math.abs(a));
      arrow(ctx, xa, 440 + la / 2, xa, 440 - la / 2, C('acceleration'), 5);
      text(ctx, 'a', xa - 18, 440, C('acceleration'), { size: 26, weight: 600, align: 'right', base: 'middle' });
    }

    /* the free-body diagram: the man as a dot, only the forces on him */
    arrow(ctx, FX, FY, FX, FY - K2 * T, force, 5); arrow(ctx, FX, FY, FX, FY + K2 * w, force, 5);
    dot(ctx, FX, FY, F.ref('tarzan'), true, 11);
    text(ctx, 'T = ' + num(T) + ' N', FX + 22, FY - K2 * T / 2, force, { size: 22, weight: 600, align: 'left', base: 'middle' });
    text(ctx, 'w = ' + num(w) + ' N', FX + 22, FY + K2 * w / 2, force, { size: 22, weight: 600, align: 'left', base: 'middle' });

    /* the same two arrows head to tail: what is left over is the net force */
    const x0 = SX - 60, x1 = SX - 10, x2 = SX + 60, top = BASE - K2 * T, end = top + K2 * w;
    line(ctx, x0 - 50, BASE, x2 + 150, BASE, PAL.rule, 2, [8, 8]);
    arrow(ctx, x0, BASE, x0, top, force, 5);
    line(ctx, x0, top, x1, top, PAL.rule, 2, [6, 6]);
    arrow(ctx, x1, top, x1, end, force, 5);
    dot(ctx, x0, BASE, PAL.ink, false, 10); dot(ctx, x1, end, PAL.ink, true, 10);
    text(ctx, 'T', x0 - 22, (BASE + top) / 2, force, { size: 26, weight: 600, align: 'right', base: 'middle' });
    text(ctx, 'w', x1 + 20, (top + end) / 2, force, { size: 26, weight: 600, align: 'left', base: 'middle' });
    if (still) text(ctx, 'F_{net} = 0', x2 + 22, BASE - 30, force, { size: 22, weight: 600, align: 'left', base: 'middle' });
    else {
      if (Math.abs(end - BASE) >= 16) arrow(ctx, x2, BASE, x2, end, force, 7);
      else line(ctx, x2, BASE, x2, end, force, 7);
      text(ctx, 'F_{net} = ma = ' + num(Math.abs(gap)) + ' N ' + way, x2 + 30, (BASE + end) / 2, force, { size: 22, weight: 600, align: 'left', base: 'middle' });
    }

    [[CX, '(a) to (c)', 'the sketch, the forces and the system of interest'], [FX, '(c)', 'the free-body diagram'], [SX, '(d)', still ? 'head to tail, the sum closes' : 'head to tail, the sum stays open']].forEach(([x, a1, a2]) => {
      text(ctx, a1, x, H - 48, PAL.ink, { size: 22, weight: 600, align: 'center' });
      text(ctx, a2, x, H - 22, PAL.muted, { size: 20, align: 'center' });
    });
    d.fig.dataset.missed = lab.flush().join(',');
    ro.set(still
      ? `\\mk{T}{\\kTf} = \\mk{w}{\\kwgt} = \\mk{m}{\\km}\\mk{g}{\\kg} = (\\mk{nm}{${fmt(m, 0)}}\\ \\text{kg})(\\mk{ng}{${fmt(G, 2)}}\\ \\text{m/s}^2) = \\mk{nT}{${fmt(T, 0)}}\\ \\text{N}`
      : `\\mk{T}{\\kTf} = \\mk{w}{\\kwgt} \\mk{ma}{{}+ \\km\\ka} = \\mk{m}{\\km}(\\mk{g}{\\kg} \\mk{a}{{}+ \\ka}) = (\\mk{nm}{${fmt(m, 0)}}\\ \\text{kg})(\\mk{ng}{${fmt(G, 2)}} \\mk{na}{{}${a < 0 ? '-' : '+'} ${fmt(Math.abs(a), 2)}})\\ \\text{m/s}^2 = \\mk{nT}{${fmt(T, 0)}}\\ \\text{N}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the axes a force problem is written along. The skier of Example
   4.5 as a block on a frictionless 25° incline, 60 kg. At the left the
   block and its acceleration, at the right the free-body diagram, both
   on the pair of axes the reader turns. Along the slope only the weight
   has to be resolved and nothing accelerates across the slope, which is
   the book's reason for choosing those axes. The choice of axes has no
   time in it, so the figure is still.
===================================================================== */
(function () {
  const H = 720;
  const d = sim('sim-axes', H);
  const TH = ctl(d.controls, { label: '\\ktheta', cls: 'angle', min: 5, max: 40, step: 1, value: 25, unit: '°', dec: 0, aria: 'angle of the incline' });
  const PH = ctl(d.controls, { label: '\\htmlClass{kv-angle}{\\varphi}', cls: 'angle', min: 0, max: 45, step: 1, value: 25, unit: '°', dec: 0, aria: 'angle the axes are turned below the horizontal',
    specials: [{ at: () => TH.v, label: 'along the slope' }] });
  const MASS = 60;                             /* the skier of Example 4.5, in kilograms */
  const GY = 570, X0 = 70, L = 520;            /* the ground, the foot of the incline's back and the length of its face */
  const O = [1030, 352], WLEN = 205;           /* the dot of the free-body diagram; the weight draws this long */
  const KA = 36;                               /* units per m/s² */
  const num = (v, dp) => { const s = fmt(v, dp); return (/^-0(\.0+)?$/.test(s) ? s.slice(1) : s).replace('-', '\u2212'); };
  const dotp = (v, u) => v[0] * u[0] + v[1] * u[1];
  const at = (p, u, s) => [p[0] + u[0] * s, p[1] + u[1] * s];
  const ray = (ctx, p, u, s, color, width) => arrow(ctx, p[0], p[1], p[0] + u[0] * s, p[1] + u[1] * s, color, width);
  const dash = (ctx, p, q, color, w, pat) => line(ctx, p[0], p[1], q[0], q[1], color, w, pat);

  function draw() {
    const { ctx } = begin(d.c);
    const th = TH.v * RAD, ph = PH.v * RAD, m = MASS;
    const w = m * G, N = w * Math.cos(th), aMag = G * Math.sin(th);
    const ux = [Math.cos(ph), Math.sin(ph)], uy = [Math.sin(ph), -Math.cos(ph)];     /* the chosen axes */
    const nrm = [Math.sin(th), -Math.cos(th)], dwn = [Math.cos(th), Math.sin(th)];   /* away from the slope, and down it */
    const wV = [0, w], nV = [N * nrm[0], N * nrm[1]], aV = [aMag * dwn[0], aMag * dwn[1]];
    const wx = dotp(wV, ux), wy = dotp(wV, uy), nx = dotp(nV, ux), ny = dotp(nV, uy);
    const ax = dotp(aV, ux), ay = dotp(aV, uy);
    const kF = WLEN / w, along = TH.v === PH.v, level = PH.v === 0;
    const force = C('force'), acc = C('acceleration'), ang = C('angle'), guide = alpha(PAL.ink, 0.4);
    const part = (color) => alpha(color, 0.7);
    headline(ctx, along ? 'Along the slope, only the weight needs resolving and nothing accelerates across the slope'
      : level ? 'On level axes the normal force and the acceleration both need resolving'
        : 'Turned ' + fmt(Math.abs(TH.v - PH.v), 0) + '° from the slope, the weight, the normal force and the acceleration all need resolving');

    /* the incline and the block */
    const yTop = GY - L * Math.sin(th), xR = X0 + L * Math.cos(th);
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.beginPath();
    ctx.moveTo(X0, yTop); ctx.lineTo(xR, GY); ctx.lineTo(X0, GY); ctx.closePath(); ctx.fill(); ctx.restore();
    line(ctx, X0, yTop, xR, GY, PAL.muted, 3);
    line(ctx, X0 - 20, GY, xR + 40, GY, PAL.muted, 3);
    ctx.save(); ctx.strokeStyle = ang; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(xR, GY, 70, Math.PI, Math.PI + th); ctx.stroke(); ctx.restore();
    const wide = TH.v >= 12;                   /* a narrow wedge has no room for the label inside it */
    text(ctx, 'θ = ' + fmt(TH.v, 0) + '°', wide ? xR - 118 * Math.cos(th / 2) : xR + 16, wide ? GY - 118 * Math.sin(th / 2) : GY - 22, ang, { size: 20, align: wide ? 'center' : 'left', base: 'middle' });
    const P = [X0 + 0.26 * L * Math.cos(th), yTop + 0.26 * L * Math.sin(th)], B = at(P, nrm, 34), A0 = at(B, dwn, 44);
    /* the chosen axes through the tail of the acceleration, and the acceleration split along them */
    const xEnd = Math.min(300, ux[1] > 0.01 ? (GY - 30 - A0[1]) / ux[1] : 300);   /* the x′ axis stops short of the ground */
    dash(ctx, at(A0, ux, -70), at(A0, ux, xEnd), guide, 2, [12, 10]);
    dash(ctx, at(A0, uy, -120), at(A0, uy, 120), guide, 2, [12, 10]);
    text(ctx, 'x′', ...at(A0, ux, xEnd + 18), PAL.muted, { size: 20, weight: 600, align: 'center', base: 'middle' });
    text(ctx, 'y′', ...at(A0, uy, 138), PAL.muted, { size: 20, weight: 600, align: 'center', base: 'middle' });
    ctx.save(); ctx.translate(B[0], B[1]); ctx.rotate(th); ctx.fillStyle = PAL.panel; ctx.strokeStyle = F.ref('block'); ctx.lineWidth = 4;
    ctx.fillRect(-34, -34, 68, 68); ctx.strokeRect(-34, -34, 68, 68); ctx.restore();
    const aTip = at(A0, dwn, KA * aMag), split = Math.abs(KA * ax) > 4 && Math.abs(KA * ay) > 4;
    if (split) {
      const px = at(A0, ux, KA * ax), py = at(A0, uy, KA * ay);
      dash(ctx, aTip, px, guide, 2, [4, 8]); dash(ctx, aTip, py, guide, 2, [4, 8]);
      if (Math.abs(KA * ax) > 14) ray(ctx, A0, ux, KA * ax, part(acc), 4);
      if (Math.abs(KA * ay) > 14) ray(ctx, A0, uy, KA * ay, part(acc), 4);
    }
    ray(ctx, A0, dwn, KA * aMag, acc, 5);
    text(ctx, 'a = ' + fmt(aMag, 2) + ' m/s²', aTip[0] + nrm[0] * 30 + dwn[0] * 10, aTip[1] + nrm[1] * 30 + dwn[1] * 10, acc, { size: 22, weight: 600, align: 'left', base: 'middle', bg: PAL.panel });
    /* what the two axes see of it, set under the incline */
    F.rich(ctx, ['along x′  ', ['a_{x′} = ' + num(ax, 2) + ' m/s²', acc]], 330, GY + 46, { size: 22, align: 'center' });
    F.rich(ctx, ['along y′  ', ['a_{y′} = ' + num(ay, 2) + ' m/s²', acc]], 330, GY + 80, { size: 22, align: 'center' });
    text(ctx, 'the ' + MASS + ' kg block on its frictionless incline', 330, H - 22, F.ref('block'), { size: 20, align: 'center' });

    /* the free-body diagram: only the forces, on the same axes */
    dash(ctx, at(O, ux, -210), at(O, ux, 300), guide, 2, [12, 10]);
    dash(ctx, at(O, uy, -235), at(O, uy, 240), guide, 2, [12, 10]);
    text(ctx, 'x′', ...at(O, ux, 320), PAL.muted, { size: 20, weight: 600, align: 'center', base: 'middle' });
    text(ctx, 'y′', ...at(O, uy, 258), PAL.muted, { size: 20, weight: 600, align: 'center', base: 'middle' });
    if (PH.v >= 1) {                           /* how far the axes are turned, on the far side from the forces */
      line(ctx, O[0] - 200, O[1], O[0] - 120, O[1], guide, 2);
      ctx.save(); ctx.strokeStyle = ang; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(O[0], O[1], 160, Math.PI, Math.PI + ph); ctx.stroke(); ctx.restore();
      text(ctx, 'φ = ' + fmt(PH.v, 0) + '°', O[0] - 176 * Math.cos(ph / 2), O[1] - 176 * Math.sin(ph / 2), ang, { size: 20, align: 'right', base: 'middle' });
    }
    [[wV, 'w', wx, wy, -1], [nV, 'N', nx, ny, 1]].forEach(([V, name, cx0, cy0, side]) => {
      const head = at(O, V, kF), mag = Math.hypot(V[0], V[1]), lx = kF * cx0, ly = kF * cy0;
      if (Math.abs(lx) > 4 && Math.abs(ly) > 4) {              /* off both axes: its two components */
        const ox = at(O, uy, 7 * side), px = at(ox, ux, lx), py = at(O, uy, ly);
        dash(ctx, head, px, guide, 2, [4, 8]); dash(ctx, head, py, guide, 2, [4, 8]);
        if (Math.abs(lx) > 14) ray(ctx, ox, ux, lx, part(force), 4);
        if (Math.abs(ly) > 14) ray(ctx, O, uy, ly, part(force), 4);
        const sx = Math.sign(lx), tx = at(at(px, ux, 14 * sx), uy, 16 * side), right = ux[0] * sx > 0;
        text(ctx, name + '_{x′} = ' + num(cx0, 0) + ' N', tx[0], tx[1], force, { size: 20, align: right ? 'left' : 'right', base: 'middle', bg: PAL.panel });
        const ty = at(at(O, uy, ly / 2), ux, -18 * sx);
        text(ctx, name + '_{y′} = ' + num(cy0, 0) + ' N', ty[0], ty[1], force, { size: 20, align: sx > 0 ? 'right' : 'left', base: 'middle', bg: PAL.panel });
      }
      arrow(ctx, O[0], O[1], head[0], head[1], force, 5);
      const off = 24 / mag;
      text(ctx, name + ' = ' + num(mag, 0) + ' N', name === 'w' ? head[0] : head[0] + 22, name === 'w' ? head[1] + 30 : head[1] + 4, force, { size: 22, weight: 600, align: name === 'w' ? 'center' : 'left', base: 'middle', bg: PAL.panel });
    });
    dot(ctx, O[0], O[1], F.ref('block'), true, 10);
    text(ctx, 'the free-body diagram on the same axes', O[0], H - 22, PAL.muted, { size: 20, align: 'center' });

    const fx = '\\htmlClass{kv-force}{F_{\\text{net}\\,x\'}}', fy = '\\htmlClass{kv-force}{F_{\\text{net}\\,y\'}}';
    const sum = (p, q) => `${num(p, 0)}\\ \\text{N} ${q < -0.5 ? '-' : '+'} ${num(Math.abs(q), 0)}\\ \\text{N} = ${num(p + q, 0)}\\ \\text{N}`;
    tex(d.readout, `${fx} = \\kwgt_{x'} + \\kN_{x'} = ${sum(wx, nx)} = \\km\\ka_{x'} = (${MASS}\\ \\text{kg})(${num(ax, 2)}\\ \\text{m/s}^2) \\\\ `
      + `${fy} = \\kwgt_{y'} + \\kN_{y'} = ${sum(wy, ny)} = \\km\\ka_{y'} = (${MASS}\\ \\text{kg})(${num(ay, 2)}\\ \\text{m/s}^2)`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
