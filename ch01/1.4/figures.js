/* Figures for section 1.4 Approximation. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.4'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, text, headline, topline, vbracket, nice } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* a number written the way the book writes it: whole when it is whole, otherwise to one decimal */
const num = (x) => (Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : fmt(x, 1));
/* a number with the digits its size calls for: none above ten, one above one, and just enough below that */
const dec = (x) => (x >= 10 ? fmt(x, 0) : x >= 1 ? fmt(x, 1) : plain(x));
/* a small decimal with only the digits it needs, for the values that round to less than one */
function plain(x) { if (x <= 0) return '0'; const d = Math.max(0, -Math.floor(Math.log10(x))); return fmt(x, d); }
/* a number rounded to one significant figure, as Example 1.4 rounds its result */
function round1(x) { if (x <= 0) return 0; const p = Math.pow(10, Math.floor(Math.log10(x))); return Math.round(x / p) * p; }
/* a number in scientific notation with up to three significant figures, trailing zeros dropped, as LaTeX */
function sci(x) {
  let e = Math.floor(Math.log10(x)); let m = +(x / Math.pow(10, e)).toFixed(2); if (m >= 10) { m = 1; e += 1; }
  return `${String(m)} \\times 10^{${e}}`;
}

/* a standing person h units tall with their feet at (x, y): the library's jointed figure stands 98 units tall at s = 1 */
function person(ctx, x, y, h, color) { F.person(ctx, x, y, color, { s: h / 98 }); }

/* =====================================================================
   SIM 1: the height of a building (Example 1.3). On the left one story
   is magnified with the persons that make it up; its dashed guides run
   to the ground story of the building, which is drawn to one fixed
   scale with every story visible and every tenth numbered. On the
   right a bar spans the lowest and highest heights the two guesses
   (a person's height, persons per story) can give for this many
   stories, with the present estimate marked on it. Still: an estimate
   has no time in it. The stories stack up once, on first view.
===================================================================== */
(function () {
  const d = sim('sim-building', 640);
  const N = ctl(d.controls, { label: '\\text{stories}', cls: '', min: 10, max: 45, step: 1, value: 39, unit: '', dec: 0, aria: 'number of stories' });
  const P = ctl(d.controls, { label: '\\text{height of a person}', cls: 'position', min: 1.5, max: 2, step: 0.1, value: 2, unit: 'm', dec: 1, aria: 'height of a person' });
  const S = ctl(d.controls, { label: '\\text{persons per story}', cls: '', min: 1.5, max: 2.5, step: 0.5, value: 2, unit: '', dec: 1, aria: 'persons per story' });
  const P_LO = 1.5, P_HI = 2, S_LO = 1.5, S_HI = 2.5;
  function draw() {
    const { ctx } = begin(d.c);
    const kA = F.arrival(d), done = kA >= 1;
    const story = P.v * S.v, total = N.v * story, meters = (m) => String(Math.round(m));
    let grown = 0; for (let i = 0; i < N.v; i++) grown += F.stagger(kA, i, N.v, 0.1);
    const n = done ? N.v : Math.ceil(grown - 1e-6);
    /* One fixed scale for the building: the tallest the sliders give, 45 stories of 2.0 m × 2.5
       persons, is 225 m, drawn 440 units high. It never follows the building. */
    const G = 580, k = 440 / 225, Y = (m) => G - m * k;
    line(ctx, 50, G, 1350, G, PAL.muted, 3);
    /* one story, magnified: 76 units per metre, so the tallest story (5 m) is 420 units */
    const km = 84, rx0 = 150, rx1 = 400, rt = G - story * km, rcx = 290, ph = P.v * km;
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.fillRect(rx0, rt, rx1 - rx0, G - rt); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(rx0, rt, rx1 - rx0, G - rt); ctx.clip();
    for (let i = 0; i < Math.ceil(S.v - 1e-9); i++) {
      F.faded(ctx, i === 0 ? 1 : 0.4, [0, 0], () => person(ctx, rcx, G - i * ph, ph, F.ref('person')));
      if (i > 0) line(ctx, rcx - 70, G - i * ph, rcx + 70, G - i * ph, alpha(F.ref('person'), 0.6), 2, [4, 8]);
    }
    ctx.restore();
    ctx.save(); ctx.strokeStyle = F.ref('building'); ctx.lineWidth = 3; ctx.strokeRect(rx0, rt, rx1 - rx0, G - rt); ctx.restore();
    vbracket(ctx, rx0 - 26, G, G - ph, C('position'), num(P.v) + ' m', -1);
    vbracket(ctx, rx1 + 26, G, rt, C('position'), num(story) + ' m', 1);
    F.rich(ctx, ['one story, ', [num(S.v), PAL.ink, 600], ' persons tall'], (rx0 + rx1) / 2, rt - 26, { size: 20, align: 'center' });
    /* the building, every story drawn, every tenth numbered */
    const bx0 = 700, bx1 = 920, sh = story * k, top = Y(n * story);
    line(ctx, rx1, rt, bx0, G - sh, PAL.muted, 1.5, [6, 8]); line(ctx, rx1, G, bx0, G, PAL.muted, 1.5, [6, 8]);
    if (n > 0) {
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(bx0, top, bx1 - bx0, G - top);
      ctx.fillStyle = alpha(PAL.ink, 0.38); const wh = sh * 0.45;
      for (let i = 0; i < n; i++) for (let c = 0; c < 7; c++) ctx.fillRect(bx0 + 20 + c * 28, G - i * sh - sh / 2 - wh / 2, 13, wh);
      ctx.fillStyle = alpha(F.ref('building'), 0.35); ctx.fillRect(bx0, G - sh, bx1 - bx0, sh);
      ctx.restore();
      for (let i = 1; i < n; i++) line(ctx, bx0, G - i * sh, bx1, G - i * sh, alpha(PAL.ink, i % 10 ? 0.25 : 0.7), i % 10 ? 1 : 2);
      for (let i = 10; i <= n; i += 10) { line(ctx, bx0 - 10, G - i * sh, bx0, G - i * sh, PAL.muted, 2); text(ctx, String(i), bx0 - 16, G - i * sh, PAL.muted, { size: 17, align: 'right' }); }
      ctx.save(); ctx.strokeStyle = F.ref('building'); ctx.lineWidth = 3; ctx.strokeRect(bx0, top, bx1 - bx0, G - top); ctx.restore();
      vbracket(ctx, 975, G, top, C('position'), meters(n * story) + ' m');
    }
    text(ctx, N.v + ' stories', (bx0 + bx1) / 2, G + 30, PAL.muted, { size: 20, align: 'center' });
    /* the person beside the building, at the building's scale */
    const hp = P.v * k;
    person(ctx, 655, G, hp, F.ref('person'));
    text(ctx, 'a person', 640, G - 14, F.ref('person'), { size: 17, weight: 600, align: 'right' });
    /* the lowest and highest heights the two guesses can give for this many stories */
    const lo = N.v * P_LO * S_LO, hi = N.v * P_HI * S_HI, rx = 1170;
    ctx.save(); ctx.fillStyle = alpha(C('position'), 0.18); ctx.fillRect(rx - 12, Y(hi), 24, Y(lo) - Y(hi)); ctx.restore();
    line(ctx, rx - 20, Y(hi), rx + 20, Y(hi), C('position'), 3); line(ctx, rx - 20, Y(lo), rx + 20, Y(lo), C('position'), 3);
    text(ctx, 'highest, ' + meters(hi) + ' m', rx + 30, Y(hi), PAL.muted, { size: 20 });
    text(ctx, 'lowest, ' + meters(lo) + ' m', rx + 30, Y(lo), PAL.muted, { size: 20 });
    if (done) {
      line(ctx, 985, Y(total), rx - 12, Y(total), alpha(PAL.ink, 0.4), 2, [4, 8]);
      F.dot(ctx, rx, Y(total), C('position'), true, 9);
    }
    text(ctx, 'range of the two guesses', rx + 40, Y(lo) + 34 > G - 14 ? G + 30 : Y(lo) + 34, PAL.muted, { size: 17, align: 'center' });
    headline(ctx, N.v + ' stories of about ' + num(story) + ' m each make a building about ' + meters(total) + ' m tall.');
    const exact = Math.abs(total - Math.round(total)) < 1e-9;
    readout(d.readout, `\\frac{${num(P.v)}\\ \\text{m}}{1\\ \\text{person}} \\times \\frac{${num(S.v)}\\ \\text{persons}}{1\\ \\text{story}} \\times ${N.v}\\ \\text{stories} ${exact ? '=' : '\\approx'} ${meters(total)}\\ \\text{m}`);
  }
  register(d.fig, { update: () => {}, draw });
  F.hover(d.stage, () => [{ x: 1170, y: 350, r: 60, name: 'heights from the lowest to the highest guesses' }, { x: 810, y: 400, r: 110, name: 'the building' }, { x: 275, y: 400, r: 125, name: 'one story, magnified' }]);
})();

/* =====================================================================
   SIM 2: a trillion dollars on a football field (Example 1.4). A side
   view of the field, 100 yd between the end zones, the pile of
   100-bill stacks on it, a 6 ft person in the end zone and the two
   friends' guesses, 3 in. and 10 ft, as dashed levels. Heights are
   drawn 6 times the scale of lengths along the field (20 units per
   foot up, 10/3 units per foot along). The pile's height is computed
   from the set amount and thickness with the field's true area,
   6.48 × 10⁶ in.²; the example's one-figure rounding is the note.
   Still; the pile rises once, on first view.
===================================================================== */
(function () {
  const d = sim('sim-trillion', 660);
  const A = ctl(d.controls, { label: '\\text{amount}', cls: '', min: 0.1, max: 1.5, step: 0.1, value: 1, unit: '', fmt: (v) => '$' + fmt(v, 1) + ' trillion', aria: 'amount in trillions of dollars' });
  const TH = ctl(d.controls, { label: '\\text{stack thickness}', cls: 'position', min: 0.3, max: 0.6, step: 0.05, value: 0.5, unit: 'in.', dec: 2, aria: 'thickness of a stack of 100 bills' });
  const AREA = 6480000;   /* the field between the end zones, 100 yd by 50 yd, in square inches */
  function draw() {
    const { ctx } = begin(d.c);
    const k = F.ease.out(F.arrival(d)), done = k >= 1;
    const stacks = A.v * 1e12 / 1e4, vStack = 6 * 3 * TH.v, vol = stacks * vStack, Hin = vol / AREA, Hft = Hin / 12;
    const H1 = round1(Hin), F1 = round1(H1 / 12);
    const h = Hft * k;
    /* The scale in feet is fixed: the tallest pile the sliders give, $1.5 trillion in 0.60 in. stacks,
       is 20.8 ft, and the scale runs to 22 ft at 20 units per foot. */
    const G = 570, UF = 20, Y = (ft) => G - ft * UF, ax = 130;
    const fx0 = 150, gx0 = 250, gx1 = 1250, fx1 = 1350, Xy = (yd) => gx0 + ((gx1 - gx0) * yd) / 100;
    /* the field in side view: the end zones shaded, a tick every 10 yd */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(fx0, G, fx1 - fx0, 22); ctx.fillStyle = alpha(PAL.muted, 0.25); ctx.fillRect(fx0, G, gx0 - fx0, 22); ctx.fillRect(gx1, G, fx1 - gx1, 22); ctx.restore();
    for (let yd = 0; yd <= 100; yd += 10) line(ctx, Xy(yd), G, Xy(yd), G + 22, F.ref('field'), yd % 50 ? 1.5 : 3);
    for (const yd of [0, 50, 100]) text(ctx, yd + ' yd', Xy(yd), G + 40, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'end zone', (fx0 + gx0) / 2, G + 66, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'end zone', (gx1 + fx1) / 2, G + 66, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'heights are drawn 6 times larger than lengths along the field', (gx0 + gx1) / 2, G + 66, PAL.muted, { size: 17, align: 'center' });
    line(ctx, ax, G, ax, Y(21.5), PAL.muted, 2);
    for (let v = 0; v <= 20; v += 5) { line(ctx, ax - 8, Y(v), ax, Y(v), PAL.muted, 2); text(ctx, v + ' ft', ax - 16, Y(v), PAL.muted, { size: 17, align: 'right' }); }
    /* the pile of stacks between the end zones */
    const py = Y(h);
    ctx.save(); ctx.fillStyle = alpha(F.ref('pile'), 0.14); ctx.fillRect(gx0, py, gx1 - gx0, G - py); ctx.restore();
    for (let y = G - 10; y > py + 3; y -= 10) line(ctx, gx0, y, gx1, y, alpha(F.ref('pile'), 0.22), 1);
    ctx.save(); ctx.strokeStyle = F.ref('pile'); ctx.lineWidth = 3; ctx.strokeRect(gx0, py, gx1 - gx0, G - py); ctx.restore();
    line(ctx, ax, G, fx1 + 10, G, PAL.muted, 3); line(ctx, gx0, G, gx1, G, F.ref('field'), 4);
    /* the two friends' guesses */
    const g3 = Y(0.25), g10 = Y(10);
    line(ctx, ax, g10, gx1 + 8, g10, PAL.ink, 2, [10, 10]); line(ctx, ax, g3, gx1 + 8, g3, PAL.ink, 2, [10, 10]);
    text(ctx, '10 ft guess', gx1 + 14, g10, PAL.ink, { size: 17, align: 'left' });
    text(ctx, '3 in. guess', (fx0 + gx0) / 2 - 4, g3 - 20, PAL.ink, { size: 17, align: 'center' });
    /* the pile's height, written above its top, or below it where the 10 ft guess's line would cross the words */
    const ly = Math.abs(py - 24 - g10) < 22 ? py - 50 : py - 24;
    text(ctx, dec(h * 12) + ' in. = ' + fmt(h, 1) + ' ft', (gx0 + gx1) / 2, ly, C('position'), { weight: 600, align: 'center', bg: PAL.panel });
    /* a person 6 ft tall in the end zone, at the scale of heights */
    const hp = 6 * UF, px = 1300;
    person(ctx, px, G, hp, F.ref('fan'));
    text(ctx, 'a person', px, G - hp - 42, F.ref('fan'), { size: 17, weight: 600, align: 'center' }); text(ctx, '6 ft', px, G - hp - 20, C('position'), { size: 17, weight: 600, align: 'center' });
    const ratio = (x) => (x >= 10 ? fmt(x, 0) : x >= 1 ? fmt(x, 1) : fmt(x, 2));
    topline(ctx, fmt(A.v, 1) + ' trillion dollars in $100 bills covers the field to about ' + dec(Hin) + ' in., which is ' + ratio(Hin / 3) + ' times the 3 in. guess and ' + ratio(Hin / 120) + ' times the 10 ft guess.');
    readout(d.readout, `\\text{volume} = ${num(vStack)}\\ \\tfrac{\\text{in.}^{3}}{\\text{stack}} \\times ${sci(stacks)}\\ \\text{stacks} = ${sci(vol)}\\ \\text{in.}^{3} \\\\ \\text{height} = \\frac{\\text{volume}}{\\text{area}} = \\frac{${sci(vol)}\\ \\text{in.}^{3}}{6.48 \\times 10^{6}\\ \\text{in.}^{2}} = ${dec(Hin)}\\ \\text{in.} = ${fmt(Hft, 1)}\\ \\text{ft}`,
      'Kept to one significant figure, as the example keeps it, the height is ' + plain(H1) + ' in., ' + (F1 >= 1 ? 'about ' + plain(F1) + ' ft.' : 'less than a foot.'));
  }
  register(d.fig, { update: () => {}, draw });
  F.hover(d.stage, () => [{ x: 750, y: 480, r: 90, name: 'the pile of 100-bill stacks' }, { x: 1300, y: 510, r: 60, name: 'a person 6 ft tall' }]);
})();
};
