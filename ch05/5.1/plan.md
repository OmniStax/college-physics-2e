# Plan: 5.1 Friction (m42139)

Source: `source.md` (converted from CNXML by `tools/cnxml2md.py`). Status:
built today, 2026-09-11, without a review stop, on Chen's instruction to
finish the book in one job; the per-section stop of rule 2 and the plan
review of rule 5 are replaced by this file, written before the section was
built and left for review after.

The first of the three sections that apply Newton's laws to the everyday
forces. It defines friction, separates static from kinetic, gives the two
magnitudes and the coefficients that carry the materials, works one example
on a slope, and closes on what the surfaces look like at the atomic scale.
Five book figures (two of them photographs of the same kind of thing: one
photograph, the knee X-ray, and four sketches), one table, six boxed notes,
one worked example, four AP items, four conceptual questions and nineteen
problems, seven of them keyed. The PhET note "Forces and Motion" is dropped
per the chapter config and named in `notes`. One page (rule 11).

## Sub-concepts (page headers)

The book prints no titled sub-headers, only the run of the argument.
Page structure, one block per idea:

1. `characteristics` **What friction is and which way it acts** (book: the
   opening paragraph, the boxed note Friction, the paragraph that separates
   kinetic from static friction, the boxed note Kinetic Friction, the heavy
   crate on the concrete floor, and the paragraph on Figure 5.2). The
   variable $\kff$ anchors here.
2. `magnitudes` **The magnitudes of static and kinetic friction** (book:
   the two forms of the frictional force; $\kfs \le \mu_{\text{s}}\kN$ and
   the boxed note Magnitude of Static Friction; the meaning of the
   inequality and $\kfsmax$; $\kfk = \mu_{\text{k}}\kN$ and the boxed note
   Magnitude of Kinetic Friction; Table 5.1; the 100 kg crate worked
   through both coefficients; the Take-Home Experiment with the plastic
   container). The variables $\kfs$, $\kfsmax$, $\kfk$, $\kN$, $\kF$,
   $\mu_{\text{s}}$, $\mu_{\text{k}}$, $m$ and $\kg$ and the equations
   eq-fs, eq-fs-max and eq-fk anchor here.
3. `joints` **Friction in joints and other lubricated surfaces** (book: the
   joints of the body and their very small coefficients, Figure 5.3, and
   the natural and artificial lubricants).
4. `incline` **Friction on a slope** (book: Example 5.1, the skiing
   exercise, with Figure 5.4 inside it; the Take-Home Experiment with a
   coin on a tilted book, which measures $\mu_{\text{k}} = \tan\theta$).
   The variables $\kwgt$, $\kwperp$, $\kwpar$ and $\theta$ and the
   equations eq-N-incline, eq-fk-incline, eq-mu-k-slope and eq-mu-tan
   anchor here. The example is `ex-skiing`.
5. `atomic` **The atomic origin of friction** (book: friction is always
   proportional to the normal force; the boxed note Making Connections;
   the actual area of contact of Figure 5.5; how rubbing warms a surface,
   and the probe tip of Figure 5.6).
6. `ice-block` **The block of ice for the problems** (the figure the
   winter-sporting problem refers to, drawn faithfully, as 3.2 stands its
   map of paths at the end of the section).

Cross references to sections in unbuilt chapters are plain text
("Problem-Solving Strategies", in the problems). The book's bold vectors
$\mathbf{N}$, $\mathbf{f}$ and $\mathbf{w}$ in the caption of Figure 5.4
are set bold in ink, as the caption prints them; their magnitudes take the
`\k` macros. The coefficients $\mu_{\text{s}}$ and $\mu_{\text{k}}$ are
dimensionless and stay in ink, as the chapter config decided.

Learning objectives, section summary and glossary come out of the running
text into the tables and views. The section has no Check Your Understanding
box, so nothing is placed inline; the conceptual questions, the problems
and the four AP items all go to the Exercises document.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| kinetic-friction | idea | characteristics | the boxed note and the glossary; the hockey puck; the AP item on the block sliding across a floor |
| static-friction | idea | characteristics | the crate on the concrete floor; the glossary; the AP item on the 20 N push against a 40 N box; the conceptual question on the brake pedal |
| coefficient-of-friction | idea | magnitudes | Table 5.1; the 100 kg crate through both coefficients; the AP item that asks whether a coefficient is greater than 0.5 |
| static-friction-magnitude | result, eq-fs | magnitudes | the boxed note; the 440 N needed to start the crate; problems 4 and 18 |
| kinetic-friction-magnitude | result, eq-fk | magnitudes | the boxed note; the 290 N that keeps the crate moving; problems 1, 6, 10, 14, 16 and 18 |
| friction-on-an-incline | result, eq-fk-incline | incline | Example 5.1; the coin on the tilted book; problems 10 and 14 |
| atomic-origin-of-friction | idea | atomic | Figure 5.5 and Figure 5.6; the Making Connections note; the AP items on the direction of friction and on the warm box |

The section reinforces `friction` (4.3), which Chapter 4 introduces as an
external force in a free-body diagram and this section gives its
characteristics to. It leans on `normal-force` and
`weight-components-on-incline` (4.5), `weight`, `newtons-second-law` and
`free-body-diagram` (4.3 and 4.1) and `components-from-magnitude-angle`
(3.3), which the coverage rows mark as used where the text uses them.

## Figures

id · replaces or Sim · concepts · what moves, or still and why · sliders ·
headline · graph · 3D

Re-examined on 2026-11-17 (claude-fable-5-2), each figure judged against the
book's image; the lines below are the figures as they now stand, and the
dated notes further down are the history of the earlier builds.

1. `sim-interface` · **replaces Figure 5.2 and Figure 5.5**, folded (rule
   14): both draw two rough surfaces pressed together · kinetic-friction,
   static-friction, atomic-origin-of-friction, coefficient-of-friction ·
   value add: variation (the load, and rest against sliding) and the
   proportionality made a graph · arrows: the book's black "direction of
   motion or attempted motion" is notation and stays still; f and N are
   symbolic · **still**: it answers its two controls, and the surfaces ease
   from one state to the other on the choice · a choice, the crate at rest
   or sliding, and the mass m (20 to 200 kg, default 100, mass) · "At rest
   the high spots lock together, and friction can hold any push up to
   441 N" · graph below the crate: friction against the normal force, the
   line μ_s N with the region under it shaded (at rest the friction is
   anywhere up to it) and the line μ_k N dashed · 2D.
   works: parts: the crate on the floor; a lens on its bottom corner joined
   to it by two leaders; in the lens the crate's underside above and the
   floor below, each a rough profile; the stretches that touch drawn heavy
   and laid end to end as one bar under the lens; f along the floor at the
   crate's foot, against the black arrow; N up from the floor · flow:
   nothing flows · must hold: f points against the motion arrow and lies
   along the floor; the surfaces touch only at high spots; the heavy bar
   grows in proportion to m and falls by μ_k/μ_s (a third) on sliding, as
   the two friction values do; sliding, the crate's underside sits higher;
   the graph's point is on the μ_s N line at rest and on the μ_k N line
   sliding, above the crate's own N · read off the image and the text:
   "Direction of motion or attempted motion", f (5.2); "Small normal force",
   "Large normal force", N (5.5); 100 kg, 980 N, μ_s 0.45, μ_k 0.30 (the
   text prints 440 N and 290 N to two figures; the figure writes 441 N and
   294 N). The push itself is left to `sim-breakaway`.
2. `sim-breakaway` · **Sim** (rule 15) · static-friction, kinetic-friction,
   static-friction-magnitude, kinetic-friction-magnitude,
   coefficient-of-friction · value add: flow by animation, the friction
   following a growing push and dropping at the break · arrows: symbolic
   forces; the speed arrow is kinematic · **moves**: the push grows through
   one 6 s loop, the crate breaks away at f_s(max) and slides · m (20 to
   200 kg, default 100), μ_s (0.05 to 1.0, default 0.45), μ_k (0.02 to 0.9,
   default 0.30) · "The push has reached 300 N and the friction answers with
   300 N, so nothing moves until 441 N" · graph below: friction against the
   push, fixed 0 to 800 N on both axes · 2D. Kept and fixed in the
   re-examination: the readout is the two laws, one a line, each with its
   substitution; the words in the corner became a speed arrow on the crate.
3. `fig-knee` · **photograph, Figure 5.3, kept**: the text points the
   reader at it ("A damaged or arthritic joint can be replaced by an
   artificial joint"), and it shows the thing the passage is about. The
   book's caption and its credit clause are kept, and its width is 250.
4. `sim-skier` · **replaces Figure 5.4** · friction-on-an-incline,
   kinetic-friction-magnitude, coefficient-of-friction · value add:
   variation (the angle and the coefficient) and the comparison the book
   only states, the weight along the slope against the friction, with the
   angle where they balance · arrows: forces symbolic, the velocity arrow
   kinematic · **moves**: she comes onto the stretch at 2.0 m/s and gains
   speed, holds it or stops, as the two forces decide · θ (0 to 45°,
   default 25, angle), μ_k (0 to 0.3, opening at 0.0817, which is the
   example's 45.0 N), m (40 to 90 kg, default 62, mass); a dashed circle on
   θ at arctan μ_k and on μ_k at tan θ · "On a 25° slope, 257 N of her
   weight pulls her along it against 45.0 N of friction, so she gains speed"
   · graph beside: the two forces along the slope against its angle, fixed
   0 to 45° and 0 to 700 N · 2D.
   works: parts: the slope with its angle at the foot; the skier plumb on
   skis laid along it; w straight down from the snow under her boots, with
   w⊥ and w∥ head to tail beside it and the slope's angle again between w
   and w⊥; N from the same point, out of the slope; f along the skis, up
   the slope · flow: she slides down the slope · must hold: every force at
   one scale (0.3 units to the newton); N equal and opposite to w⊥; w⊥ + w∥
   = w as drawn; f up the slope; the angle between w and w⊥ equals the
   slope's; the opening state is Example 5.1 (62 kg, 25°, 45.0 N, 551 N
   normal, a = 3.42 m/s²); the curves cross at tan θ = μ_k, where the
   acceleration reads zero · read off the image: w, w⊥, w∥, N, f, 25° twice,
   "Free-body diagram". The book's separate free-body diagram is not drawn
   again: the forces on her are that diagram, and the graph takes its place.
   The book rounds the coefficient to 0.082; 0.0817 is what gives 45.0 N.
5. `sim-probe` · **replaces Figure 5.6** · atomic-origin-of-friction ·
   value add: flow by animation, the bending and release the still image
   freezes, and the vibration the text says becomes heat · arrows: "motion
   of the probe" is the book's notation; f symbolic · **moves**: one pass
   across the surface in 6 s; the foot holds while the top is carried on,
   lets go, and each release sends a vibration into the lattice that spreads
   and dies away · one choice, the two materials adhering weakly or strongly
   (the caption's "how the force varies for different materials") · "Strong
   adhesion bends the tip far over before its foot lets go, and each release
   leaves the lattice ringing" · none · 2D. No readout: the section gives no
   relation at this scale, and the earlier build's f = μN in nanonewtons
   was invented.
   works: parts: the substrate, a lattice of atoms; the probe, an inverted
   pyramid of atoms with a flat foot of five resting on the surface; f on
   the foot, against the motion · flow: the probe's top row moves steadily;
   the foot stays, then jumps · must hold: f points against the motion of
   the probe; the tip leans back (foot behind top), more with strong
   adhesion; f grows with the lean and drops at each release; the vibration
   starts where the foot let go, spreads outward and into the depth, and
   fades with distance and time · read off the image: "Motion of probe",
   "f", "Friction", "Atomic and molecular interactions"; the book's probe
   moves left with f to the right, drawn here mirrored.
6. `fig-ice` · the unnumbered image of problem 18, **kept as the book's
   image** (eyebrow Figure). Reverted in the re-examination: the redraw
   showed nothing the image does not, and the book's drawing is the better
   one. The referents `contestant` and `ice-block` went with it.

Photographs: one in the section, the knee X-ray of Figure 5.3, and it is
kept (above). No splash image to drop. The figures inside the problems: the
block of ice is kept as the book's image (above); the two ice skaters of
`fs-id1452889` and the mountain climber of `fs-id1615856` belong to
problems that have no keyed answer and are left out, so their figures are
left out with them.

Extra simulations (rule 15), thought through and judged:

- **The push that grows until the crate breaks away** — built, as
  `sim-breakaway` above. The section's central claim is that static
  friction answers whatever you push with, up to a maximum, and that
  kinetic friction is smaller; the book states it in words and in two
  inequalities and draws no picture of it at all. The reader sees the
  friction track the push, the drop at the break, and why the crate is
  easier to keep moving than to start.
- A coin on a tilting book, its angle raised until it slides, for the
  Take-Home Experiment — left. `sim-skier` already has the angle on a
  slider and says when the acceleration is zero, so a second slope would
  animate what the reader can already do.
- Table 5.1 as a ladder of coefficients, from Teflon on steel to rubber on
  dry concrete, with the crate's breakaway force following the material —
  left. The table is in the text, and the numbers it holds are the sliders
  of two sims already.
- A car braking on dry, wet and icy concrete, for the problems on maximum
  deceleration — left. Both of those problems are unkeyed and out of the
  page, and 2.5 already built the braking car.
## Exercises

- No Check Your Understanding boxes; nothing inline.
- 4 conceptual questions, `cq1` to `cq4`, none keyed, each an open answer
  with an AI-marked suggested approach drawn from what the text supports,
  citing `magnitudes`, `characteristics`, `characteristics` and
  `characteristics`.
- 4 AP items. Two are keyed and kept as they are printed: `ap1`
  (import-auto-id0000007, the 20 N push on the 40 N box, answer (b)) and
  `ap3` (import-auto-id0000018, the direction of friction on a sliding
  block, answer (c)), both `choice` with the book's options. Two have no
  key and are kept as open items with an AI-marked suggested approach,
  never as graded choices, as Pass 20 settled for 2.2: `ap2`
  (import-auto-id0000013, the 2 kg block on the 25º ramp) and `ap4`
  (import-auto-id0000024, why the bottom of the box feels warm).
- 7 problems keyed and kept: `p1` (the steel spatula, number), `p4` (the
  120 kg wooden crate, multi), `p6` (the eight dogs and the sled, multi),
  `p10` (the snowboarder going uphill, number), `p14` (the car on the 4º
  slope, multi), `p16` (the freight train, multi), `p18` (the block of ice,
  multi, citing `fig-ice`).
- 12 problems left out, having no answer in the book's key: 2
  (fs-id1534547), 3 (fs-id1250006), 5 (fs-id1294152), 7 (fs-id1452889), 8
  (fs-id1426454), 9 (fs-id1395614), 11 (fs-id1453574), 12 (fs-id1736769),
  13 (fs-id855543), 15 (fs-id1742423), 17 (fs-id1615856) and 19
  (fs-id1529666).
- Nothing is held for a later section and nothing is taken from another
  section: all four AP items test friction, which this section introduces,
  and 5.2 and 5.3 set no item that belongs here. 5.3's Critical Thinking
  item goes to 5.2, as the chapter config says.
- No generated questions: every node of the section has a book exercise.
- Weights (rule 20): `p1` gives `coefficient-of-friction` weight 2, since
  the problem turns on $\kfk = \mu_{\text{k}}\kN$ and only reads the
  coefficient off Table 5.1; `p6` gives `kinetic-friction-magnitude` its
  full value and `coefficient-of-friction` weight 2; `p10` and `p14` give
  `friction-on-an-incline` the full value and
  `kinetic-friction-magnitude` or `static-friction-magnitude` weight 3;
  `p16` gives `kinetic-friction-magnitude` weight 2, since the friction is
  handed to the reader and the work is Newton's second law on a train;
  `ap1` gives `static-friction-magnitude` the full value and
  `coefficient-of-friction` weight 2.

## Views

- Formulas: the seven equations of the section already in `chapter.json`,
  the boxed and named ones important (eq-fs, eq-fs-max, eq-fk,
  eq-fk-incline, eq-mu-tan) and the worked steps not.
- Definitions: the fourteen variables of the section; the five glossary
  terms (friction, kinetic friction, static friction, magnitude of static
  friction, magnitude of kinetic friction).
- Concept map: the seven nodes above, with their edges into 3.3 and
  Chapter 4.

## Colour

The page binds force, velocity and acceleration. Every sim draws a force:
the applied force, the normal force and the friction of the interface and
the breakaway sims, the weight and its two components, the normal force and
the friction of the skier, and the normal force and the friction on the
probe tip. The skier gains speed down the slope, and her velocity arrow is
drawn as one; her readout and the small line under it write $\kg$, which is
an acceleration. Mass, the coefficients of friction, the slope angle, the
count of adhering atoms and every length of a scene stay in ink, as the
chapter config decided.

## Wanted at chapter level

- variables `f_fric` → 5.1-characteristics
- variables `f_s` → 5.1-magnitudes
- variables `f_smax` → 5.1-magnitudes
- variables `f_k` → 5.1-magnitudes
- variables `N` → 5.1-magnitudes
- variables `F` → 5.1-magnitudes
- variables `μ_s` → 5.1-magnitudes
- variables `μ_k` → 5.1-magnitudes
- variables `m` → 5.1-magnitudes
- variables `g` → 5.1-magnitudes
- variables `w` → 5.1-incline
- variables `w_perp` → 5.1-incline
- variables `w_par` → 5.1-incline
- variables `θ` → 5.1-incline
- equations `eq-fs` → 5.1-magnitudes
- equations `eq-fs-max` → 5.1-magnitudes
- equations `eq-fk` → 5.1-magnitudes
- equations `eq-N-incline` → 5.1-incline
- equations `eq-fk-incline` → 5.1-incline
- equations `eq-mu-k-slope` → 5.1-incline
- equations `eq-mu-tan` → 5.1-incline
- The `latex` of `eq-N-incline`, `eq-fk-incline` and `eq-mu-k-slope` writes
  the angle as `\text{25º}` with the masculine ordinal the CNXML carries,
  and KaTeX has no metrics for that character, so the formula sheet prints
  a warning and a blank where the degree sign should be. The text of the
  section writes `25^\circ` instead; the chapter pass should make the same
  change in those three rows (and in any other row of the chapter that
  carries º inside math).
- The concept `friction` sits under 4.3, where Chapter 4 names it as one of
  the external forces of a free-body diagram. This section is where the
  book's reader is given its characteristics, its two kinds and its
  magnitudes, so the chapter pass should weigh moving the node to 5.1, as
  the chapter's exploration asks. Until it moves, 5.1 reinforces it.

### What the chapter pass did with these (2026-09-11)

- Every anchor above is written into `ch05/chapter.json`, and each one names a
  span id that stands in this section's `text.html`.
- The three equation rows that the report asks about, `eq-N-incline`,
  `eq-fk-incline` and `eq-mu-k-slope`, write the angle as `\cos\theta` rather
  than as a number, so no masculine ordinal reached the chapter's math and
  nothing had to be changed there. The character did sit in three sentences of
  this section that OmniStax wrote (the caption of Figure 5.4, the lead of the
  block of ice and its caption) and in the prompt of the second AP item, where
  the rest of the prompts already write `$5.0^\circ$` and `$4^\circ$`; all four
  now write `$25^\circ$`, as Chapter 3's captions do. The angle's unit in the
  variables table stays `º`, which is what Chapters 3, 4 and 6 write there.
- The concept `friction` stays under 4.3. Chapter 4 introduces it as one of
  the external forces of a free-body diagram and its section is built, so the
  node is Chapter 4's to hold; this section reinforces it, which is what the
  coverage rows already say, and the seven nodes of 5.1 rest on it.
- Two conceptual questions printed elsewhere in the chapter are taken here
  under rule 12, since each tests the coefficient of friction that this
  section introduces and neither turns on anything its own section teaches:
  `cq5`, the soles of shoes (`fs-id1165296252981`, `source_section` 5.3), and
  `cq6`, oil and gasoline on a road in the rain (`fs-id1165296261672`,
  `source_section` 5.2). The second is the question the Take-Home Experiment
  of `magnitudes` ends on, so both cite that span. Both carry an AI-marked
  suggested approach and are tagged `coefficient-of-friction` with
  `static-friction` at weight 2. The `exercise_notes` of all three sections
  say where each item went.
- `sim-interface` writes $\kN = m\kg$ in its readout, so its `draws` gains
  `acceleration` beside `force`; the page bound the type already through
  `sim-skier`. The two sliders that had no `aria` (the friction on the skier
  and the normal force on the probe tip) have one now.

## Built (2026-09-11)

Six figure rows, five of them interactive: `sim-interface` and `fig-ice`
are still and carry no transport, and `sim-breakaway`, `sim-skier` and
`sim-probe` move and carry one. `check:content` is clean, the page builds,
and a headless pass in light and dark found no console error, every image
loading and every canvas booting. One fix pass: three headlines were too
long for the 1400-unit canvas and were shortened, the magnified interface
was redrawn with the floor and the crate in different tints so that the
two bodies can be told apart, the skier's force labels were given panel
backgrounds and her velocity arrow was moved further down the slope so the
labels stop colliding, the probe's friction arrow was moved clear of its
atoms, and the pull arrow's label in the ice figure was moved off the
contestant's head.

### What the chapter pass finished (2026-09-12)

- The angle in `figures.js` was written with the masculine ordinal the CNXML
  carries, in the unit of the slope slider and in eight drawn labels; every
  one of them now writes `°`, the degree sign, as Chapters 4 and 9 write it,
  and the `unit` of the angle in the chapter's variables writes it too.
- `eq-mu-tan` was the one equation row of the chapter with no `ktex`. It now
  carries `\mu_{\text{k}} = \frac{m\kg\sin\theta}{m\kg\cos\theta} = \tan\theta`,
  so the weight in the take-home experiment's result wears the same hues as
  the two rows above it on the formula sheet.

Revised in the Manim pass of 2026-09-28:
- `sim-interface` · the applied force carries a dashed circle at f_s(max) = μ_s mg, the breakaway the text names, recomputed from the mass (rule 26.1); the readout is that one equation (manim-style 12).
- `sim-probe` · the headline no longer speaks of the drawing (root rule 17).

## Derivations

- Take-Home Experiment after Example 5.1, $\mu_k = \tan\theta$ for sliding at constant velocity · score 2 · built as drv-friction-coefficient-slope: one node; the book prints the work for the reader, the experiment is only what follows it; the two substitutions the book makes in one line are two moves; replaces the three displays and 'Solving for $\mu_k$'
- Example 5.1 discussion, constant acceleration down a slope with friction ('Proof of this is left for this chapter's Problems and Exercises') · score 8 · not built: set for the reader as a problem
