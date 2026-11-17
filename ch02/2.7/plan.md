# Plan: 2.7 Falling Objects (m42102)

Source: `source.md` (converted from CNXML). Book pages 91 to 99. Figures
2.37 to 2.43, Examples 2.14 to 2.16, Table 2.1.
Status: built 2026-09-11 without a review stop, on Chen's instruction to
finish Chapters 2 and 3 in one job.

The section applies the constant-acceleration equations of 2.5 to
straight up and down motion: seven figures, all of them drawings (one
illustration, three strategy sketches, three graph sheets; no
photographs), three worked examples, one table, one Check Your
Understanding box, one AP item, six conceptual questions and eighteen
problems, nine of them keyed. The PhET note (Equation Grapher) is dropped
per the chapter config.

## Sub-concepts (page headers)

The book has two headers, Gravity and One-Dimensional Motion Involving
Gravity, and the second runs through three examples. Page structure, one
block per idea, span ids as the chapter's anchors expect them:

1. (opening paragraph, before the first block: the mine shaft)
2. `gravity` **Gravity and free fall** (book: the hammer and the feather,
   air resistance and friction, the definition of free-fall). Figure 2.37
   is replaced here.
3. `accel-gravity` **The acceleration due to gravity** (book: the force of
   gravity, the symbol $g$ and its average value, the range 9.78 to 9.83
   m/s², the direction that defines vertical, $a = -g$ or $a = +g$ by the
   choice of coordinate system). The chapter's variable `g` and the
   equation `eq-g` anchor here.
4. `vertical-motion` **One-dimensional motion involving gravity** (book:
   the simplest situations, $y$ for vertical displacement, the boxed
   kinematic equations for free fall). The variables `y`, `y0`, `v0`,
   `v`, `a`, `t` and the equations `eq-ff-v`, `eq-ff-y`, `eq-ff-v2`
   anchor here.
5. `rock-up` **A rock thrown upward** (book: Example 2.14 as `ex-rock-up`
   with Table 2.1 as a `div.book-table`, Figure 2.39 replaced by a sim,
   then the Take-Home Experiment on reaction time). Problem 1, which is
   Example 2.14 with a different initial velocity, goes inline at the end
   of this block.
6. `rock-down` **A rock thrown downward** (book: Example 2.15 as
   `ex-rock-down`, Figure 2.41 replaced by a sim, the "another way to
   look at it" paragraph).
7. `find-g` **Finding g from data on a falling object** (book: Example
   2.16 as `ex-find-g`, Figure 2.42 replaced by a sim). The equation
   `eq-a-from-fall` anchors at `ex-find-g`. The Check Your Understanding
   box (the chunk of ice) goes inline at the end of this block, where the
   book has it.
8. `well` **The depth of a mine shaft** (no book prose: one sentence of
   lead and the extra sim below, which draws the section's opening
   example).

The three "Draw a sketch" figures (2.38, 2.40, 2.43) are strategy sketches
with empty captions; each is folded into the sim that follows its
example, as 2.5 did with its own sketches. Since the fold pass
(2026-09-11) each sim's row lists the sketch's number under `folds` and
its eyebrow reads both numbers, "Figure 2.38 + 2.39", "Figure 2.40 +
2.41" and "Figure 2.42 + 2.43"; the text never refers to the sketches by
number. The source's `$$$`
artifact in the 9.78 to 9.83 sentence, the stray caret after the second
$-9.80\ \text{m/s}^2$ of the discussion, and the italic marks round $y_2$
are converter noise and are not reproduced. The book's own "$t =
0.45173$" without a unit in Example 2.16 is kept as printed.

Learning objectives, section summary and glossary come out of the running
text into the views. The AP item, the conceptual questions and the
problems go to the Exercises document.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| free-fall | idea | gravity | glossary; the hammer and the feather; CQ 4 |
| acceleration-due-to-gravity | idea, eq-g | accel-gravity | glossary; the boxed value; CQ 1, 2, 5, 6; Example 2.16 |
| free-fall-kinematics | result, eq-ff-y | vertical-motion | the boxed equations; Examples 2.14 to 2.16; CYU; problems 1, 3, 5, 7, 9, 11, 13, 15, 17 |
| free-fall-highest-point | result | ex-rock-up | the discussion of Example 2.14; CQ 1, 2, 6; problems 3, 5, 17 |
| free-fall-symmetry | result | ex-rock-down | Example 2.15 and its discussion; CQ 3, 4; problems 7, 9 |
| g-from-fall-time | skill, eq-a-from-fall | ex-find-g | Example 2.16; the AP item on the asteroid |

`ex-rock-down` also uses `physical-solution` (2.5: the negative root is
chosen), `ex-find-g` uses `precision` (1.3), and `accel-gravity` uses
`coordinate-system` (2.2).

## Figures

id · replaces · concepts · value add · arrows · moving or still · sliders · headline · graph · 3D

Re-examined 2026-11-17 (Claude Fable 5.2): all five rebuilt. Each was a small drawing in a mostly blank stage with a long caption, graphs on ranges several times the example's, and a `g` slider that broke every fixed scale. The lines below are the figures as they now stand.

1. `sim-hammer-feather` · Figure 2.37 · free-fall, acceleration-due-to-gravity · value add: flow by animation and the comparison the book's still only implies: its three panels (in air, in a vacuum, in a vacuum on the Moon) run on one clock from one release height, so the reader sees the pair stay side by side wherever there is no air, land together, and on the Moon do the same more slowly · arrows: the g arrow in each panel is symbolic and drawn to one scale (11 units per m/s², so the Moon's is 1.67/9.80 of Earth's) · moving: one drop per loop, ending when the last thing lands, with the scrubber · one slider, the drop height h (0.5 to 2.0 m, default 1.5 m, position hue on the control as before); g is no longer a slider, since the Moon panel is the comparison · headline: who is side by side now, and at the end the two landing times · no graph · 2D. Each panel is named under its floor with its g; the landing time appears over each freely falling thing as it lands. Hover names for the hammer and the feather. Readout: t = √(2h/g) for Earth and for the Moon, each whole on its line.
   works: parts: three framed panels on one floor line and one height scale (0 to 2 m) at the left; in each a claw hammer (head up, banded grip, as the book draws it) and a feather · flow: both fall from the dashed release line to the floor · must hold: (1) in the two vacuum panels the hammer and the feather are at the same height at every instant and land at the same time; (2) the Moon pair lands after the Earth pair, at √(2h/1.67) against √(2h/9.80) (1.5 m: 1.34 s and 0.55 s); (3) in air the hammer falls as in the vacuum and the feather lags; (4) the g arrows are to one scale · read off the image: panels titled "In air", "In a vacuum", "In a vacuum (the hard way)" with an astronaut; hammer at the left, feather at the right; in air the feather is still near the top when the hammer is down. The book gives no number for the feather in air, so none is printed (it is drawn drifting at 0.8 m/s). The astronaut is not drawn; the panel is named "in a vacuum, on the Moon".
2. `sim-rock-up` · Figure 2.38 + 2.39 · free-fall-kinematics, free-fall-highest-point, acceleration-due-to-gravity · value add: flow by animation, and the caption's Misconception Alert made visible: the rock moves on one vertical line and its position graph stands beside it on the same height scale, a dashed line carrying the rock's height across to its point on the curve, so the parabola is seen to be height against time and never a path · arrows: v and a on the rock are symbolic vectors drawn to scale (4.4 units per m/s, 6 per m/s²) · moving: the example's 3.00 s flight in about 6 real seconds, with the scrubber · one slider, $\kvo$ 10.0 to 15.0 m/s, detent at 13.0 (Example 2.14); the range keeps the whole flight on the fixed scales · headline: where the rock is and how it moves now; at the top, that v is zero and a is not · graphs beside (vertical scene): y against t tall on the scene's scale (−15 to 15 m), v against t (−20 to 20 m/s) and a against t (−12 to 0 m/s², the book's range), all 0 to 3 s · 2D. Hollow points at 1.00, 2.00 and 3.00 s on the y and v graphs are Table 2.1's rows, named on hover. The g and t sliders are gone: g sent every graph off its scale and the scrubber is the time.
   works: parts: cliff with its edge, the thrower (not to scale, as in the book) with a raised hand at y₀ = 0, the rock's vertical line; three graphs · must hold: (1) on load the flight ends at 3.00 s with y = −5.10 m and v = −16.4 m/s, and passes y = 8.10 m, v = 3.20 m/s at 1.00 s and 6.40 m, −6.60 m/s at 2.00 s (Table 2.1); (2) the highest point is 8.62 m at 1.33 s, where the v arrow vanishes and the v line crosses zero; (3) the rock's dot and its graph point are always at the same height; (4) the a arrow never changes; (5) the readout's two lines are true as written · read off the image: 2.38 is v₀ = 13.0 m/s up and a = −9.8 m/s² down beside a y axis; 2.39's axes are y −6 to 10 m, v −20 to 15 m/s, a −12 to 0 m/s², t 0 to 4 s with data to 3 s.
3. `sim-rock-down` · Figure 2.40 + 2.41 · free-fall-symmetry, free-fall-kinematics · value add: flow by animation and the comparison the book's two panels leave to the reader: the second rock is thrown down at the instant the first comes back past the hand at −v₀, so from there the two fall side by side with equal velocity arrows at every level · arrows: velocity vectors, symbolic, to scale (4 units per m/s); the marks left each whole second carry theirs, as in the book's panel (a) · moving: one flight per loop in about 6 s, with the scrubber · $\kvo$ 8.0 to 15.0 m/s (detent 13.0), the level reached $\ky$ −10.0 to −1.0 m (default −5.10) · headline: the first rock's flight, then the pass at −v₀, then the common velocity at the level · graph beside on the scene's height scale: v across, y up, the one curve v² = v₀² − 2g(y − y₀) from +v₀ over the top through −v₀ and down to the level; the first rock's point runs along it and picks up the second's ring at (−v₀, 0) · 2D. Hover names give each mark's time, position and velocity. The g slider is gone.
   works: parts: cliff, thrower, two vertical lines (thrown up, thrown down) 62 units apart as the book offsets its up and down tracks; the level lines y₀ = 0 and y · must hold: (1) on load the first rock's marks are at 0, 8.10 and 6.40 m and the flight ends at 3.00 s at −5.10 m with −16.4 m/s (the book's y₁, y₂, y₃, v₃); (2) the second rock leaves at 2v₀/g with −13.0 m/s, exactly when the first is back at y₀ with −13.0 m/s; (3) from then on both are at one height with one velocity; (4) the readout gives 269.0 m²/s² and −16.4 m/s · read off the image: (a) v₀ = 13 m/s, y₁ = 8.10 m, y₂ = 6.40 m, y₃ = −5.10 m, v₃ = −16.4 m/s, velocity arrows at 0, 1, 2, 3 s; (b) v₀ = −13 m/s, y = −5.10 m, v = −16.4 m/s. The book draws both throws from the same instant in two panels; the delay is this figure's own.
4. `sim-drop` · Figure 2.42 + 2.43 · g-from-fall-time, free-fall-kinematics, precision · value add: flow by animation (the strobe builds mark by mark, each carried across to the position graph on the same height scale) and variation by slider where the example's point lies: the two measurements move in their last figures and g moves along a scale that carries the 9.78 to 9.83 m/s² found on Earth, so the reader sees that a millisecond of timing decides it · arrows: velocity vectors at each mark, to scale (12 units per m/s) · moving: one drop per loop, with the scrubber · $\ky$ −1.0100 to −0.9900 m (detent −1.0000), $\kt$ 0.44173 to 0.46173 s (detent 0.45173; dashed circles where g = 9.78 and 9.83) · headline: the fall so far, and at the end the g the two measurements give · graph beside: y against t (0 to 0.5 s, 0 to −1.2 m) · 2D. The v and a graphs of the book's figure are not redrawn: 2.39 beside it shows the same straight line and flat line. Readout: a = 2(y − y₀)/t² whole on one line.
   works: parts: the plate the ball is let go from (the book draws a hand), the ball's vertical line with a mark each 0.1 s, the timed level at y; three columns t, y, v on the level of each mark as the book sets its table; the graph; the g scale · must hold: (1) on load the readings are 0.1 s −0.049 m −0.98 m/s, 0.2 s −0.196 −1.96, 0.3 s −0.441 −2.94, 0.4 s −0.784 −3.92 (the book's table) and the end row 0.45173 s, −1.0000 m; (2) a = −9.8010 m/s² and g = 9.8010 m/s² on load, inside the Earth band; (3) each mark and its graph point are at one height; (4) the gaps between marks grow as 1 : 3 : 5 : 7 · read off the image: the book's strobe runs to 0.5 s (−1.225 m, −4.90 m/s) with g = 9.80; graph axes 0 to 0.6 s, 0 to −1.4 m. The example's fall ends at 0.45173 s, so the 0.5 s row is not reached.
5. `sim-well` · Sim · free-fall-kinematics · value add: the right quantity on the control. What is measured is the time until the sound, so that is the slider; the shaft is as deep as that time implies, and a dashed level under its bottom is the depth ½gt² that taking the whole time as fall would give · arrows: the rock's velocity, kinematic sound fronts climbing · moving: fall then sound, one round trip per loop, with the scrubber · one slider, the time heard $\kt$ 1.0 to 5.0 s, default 3.0 s (problem 15's 2.0000 s is left for the reader) · headline: the fall, the sound, then the split of the time · graph beside on the shaft's own scale (0 to −125 m, 0 to 5 s): the fall's parabola, the sound's dashed line back up, and the parabola carried on dotted to the time heard, ending at ½gt² · 2D. Sound at 340 m/s, stated. Readout: d = ½g t_fall² and t_sound = d/v_s, one line each; note: how much too deep ½gt² comes out.
   works: must hold: (1) fall time plus sound time equals the slider's time; (2) the dashed level is always below the bottom, and the gap grows with the time; (3) the shaft, its bracket and the graph agree on d; (4) at 2.0 s with 332 m/s the method gives problem 15's 18.5 m and 19.6 m (checked by hand; the figure uses 340 m/s).

Photographs: none. Figure 2.37 is an illustration (three drawn panels, in
air, in a vacuum and on the Moon), so it is a sketch the sim replaces and
its image is the sim's original.

Figures that serve exercises: none. No problem of the section refers to a
figure.

Extra simulations (rule 15), thought through and judged:

- The depth of a mine shaft from the splash: **built** as `sim-well`.
  The section opens with it ("we can estimate the depth of a vertical
  mine shaft by dropping a rock into it and listening"), problem 15
  turns on it, and no required figure shows a fall followed by a second
  leg on the same clock, or how neglecting the sound's travel overstates
  the depth.
- The reaction-time ruler of the Take-Home Experiment: **left**. It is
  the drop sim with a ruler in place of the ball; the view is the same.
- A jump on Earth and on the Moon side by side (conceptual questions 5
  and 6): **left**. The hammer-and-feather figure's Moon panel already
  sets the Moon's g beside Earth's on one clock.
- The Vomit Comet: **left**. The book defers it to a later chapter.

## Tables

Table 2.1, Results (four columns: time, position, velocity,
acceleration, for the rock of Example 2.14), in `rock-up` inside the
example, as a `div.book-table` numbered as openstax.org numbers it.

## Exercises

- 1 Check Your Understanding, `cyu-ice` (the ice falling 30.0 m), a
  number, inline after `find-g`, citing `vertical-motion`.
- 1 AP item, `ap-asteroid` (the spacecraft falling toward an asteroid), a
  choice with the book's key (c).
- 6 conceptual questions, `cq1` to `cq6`, each with an AI-written
  suggested approach, marked.
- 9 problems keyed and kept: `p1` (ball thrown up at 15.0 m/s, eight
  values, inline after `rock-up` since it is Example 2.14 with a
  different number), `p3` (the basketball player's takeoff velocity),
  `p5` (the dolphin, parts b and c keyed, part a's list of knowns in the
  solution), `p7` (the cliff height and the time thrown down), `p9` (the
  tree branch), `p11` (Mt. Arapiles), `p13` (Half Dome), `p15` (the well,
  with and without the sound's travel), `p17` (the coin from the
  balloon). Problem 13's part (a) is keyed as −70.0 m/s, and that signed
  value is what is checked.
- 9 problems left out, having no answer in the book's key: 2
  (fs-id1746555, the Verrazano Narrows Bridge), 4 (fs-id1582773, the
  life preserver), 6 (fs-id1818111, the swimmer), 8 (fs-id2576295, the
  shot putter), 10 (fs-id4076783, the kangaroo), 12 (fs-id776278, the
  object dropped from 75.0 m), 14 (fs-id4044798, the window), 16
  (fs-id2561073, the steel ball), 18 (fs-id3597625, the tennis ball).
- Nothing held for a later page and nothing taken from another section.
  Problems 2 and 4 of 2.4 express accelerations in multiples of $g$ but
  test average acceleration, so they stay with 2.4; the AP item of 2.2
  drops a feather but asks about the coordinate system, so it stays with
  2.2.
- No generated questions: every node has a book exercise that tests it.
- Weights: `cq4` (air resistance) turns on free-fall and only touches
  the symmetry result, so `free-fall-symmetry` gets weight 1 there;
  `cq5` and `cq6` turn on the value of $g$ and use the kinematics only
  as a proportion, so `free-fall-kinematics` gets weight 1 on both.

## Views

- Formulas: eq-g, eq-ff-v, eq-ff-y, eq-ff-v2 (important),
  eq-a-from-fall (not important). All already in `chapter.json`.
- Definitions: variables g, y, y0, v0, v, a, t; the two glossary terms.
- Concept map: the six nodes above, with physical-solution (2.5),
  precision (1.3) and coordinate-system (2.2) tagged on the spans that
  use them.

## Colour

The page binds time, position, velocity and acceleration: every sim
carries a time, a position or a velocity on its sliders and draws $g$ in
the acceleration hue. The drop height of the hammer and the feather is a
length of the scene and stays in ink. No new hue, no new macro; `\ky`,
`\kyo` and `\kg` are already in the symbol table.

## Wanted at chapter level

- variable `g` (2.7) → anchor `2.7-accel-gravity`
- variable `y` (2.7) → anchor `2.7-vertical-motion`
- variable `y0` (2.7) → anchor `2.7-vertical-motion`
- variable `v0` (2.7) → anchor `2.7-vertical-motion`
- variable `v` (2.7) → anchor `2.7-vertical-motion`
- variable `a` (2.7) → anchor `2.7-vertical-motion`
- variable `t` (2.7) → anchor `2.7-vertical-motion`
- equation `eq-g` → anchor `2.7-accel-gravity`
- equation `eq-ff-v` → anchor `2.7-vertical-motion`
- equation `eq-ff-y` → anchor `2.7-vertical-motion`
- equation `eq-ff-v2` → anchor `2.7-vertical-motion`
- equation `eq-a-from-fall` → anchor `2.7-ex-find-g`

The chapter pass wrote every anchor above into `chapter.json`, each one
checked against the ids of this section's `text.html`.
