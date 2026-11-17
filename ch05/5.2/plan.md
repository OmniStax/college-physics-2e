# Plan: 5.2 Drag Forces (m42080)

Source: `source.md`, converted from the CNXML by `tools/cnxml2md.py`. Status:
built 2026-09-11 without a review stop, on Chen's instruction to finish the
book in one job; the per-section stop of rule 2 and the plan review of rule 5
are replaced by this file, written before the section was built and left for
review after, as Chapters 1 to 3 did it.

The section that turns from friction between two surfaces to the force a
fluid exerts on a body moving through it. Four figures, every one of them a
photograph, so no sketch is transformed and every interactive figure here is
a Sim with no number. Four boxed notes (Drag Force, Take-Home Experiment,
Stokes' Law, Galileo's Experiment), one table (Table 5.2, the drag
coefficients), one worked example, Haldane's quoted paragraph, four
conceptual questions and nine problems, five of them keyed. There is no PhET
note in this module and no Check Your Understanding box. One page (rule 11).

## Sub-concepts (page headers)

The book prints no titled sub-header of its own, only the run of the
argument. Page structure, one block per idea, in the book's order:

1. `drag` **The drag force on a body moving through a fluid** (book: the
   opening paragraph, the definition of the drag force, $\kFD \propto \kv^2$,
   the equation $\kFD = \tfrac12 C\rho A\kv^2$, the form $\kFD = b\kv^2$, and
   the boxed note Drag Force). The variables $\kFD$, $C$, $A$, $\rho$, $\kv$
   and $b$ anchor here, and so do `eq-drag-prop`, `eq-drag-force` and
   `eq-drag-b`.
2. `coefficient` **The drag coefficient and the shape of a body** (book: the
   bobsled paragraph and Figure 5.7, the wind tunnel paragraph and Figure
   5.8, the highway-speed paragraph, Table 5.2, and the body suits paragraph
   with Figure 5.9).
3. `terminal` **Terminal velocity** (book: the skydiver under gravity and
   drag, $\kFnet = m\kg - \kFD = m\ka = 0$, $m\kg = \kFD$, the solution
   $\kv = \sqrt{2m\kg/\rho C A}$, the 75 kg head-first skydiver, the boxed
   Take-Home Experiment with the coffee filters, and Example 5.2, A Terminal
   Velocity). $\kvt$, $m$ and $\kg$ anchor here, and so do
   `eq-terminal-balance` and `eq-vt`.
4. `size` **The size of the falling body** (book: the squirrel paragraph and
   Haldane's quoted paragraph from "On Being the Right Size").
5. `stokes` **Stokes' law: drag on a very small body** (book: the paragraph
   that says the quadratic dependence fails for a small, slow body in a
   dense medium, $\kFs = 6\pi r\eta\kv$, the boxed note Stokes' Law, and the
   bacteria and lake sediment paragraph). $\kFs$, $r$ and $\eta$ anchor here,
   and so does `eq-stokes`.
6. `streamlining` **Streamlining in nature** (book: the paragraph on fishes,
   whales, birds and sperm, Figure 5.10, and the boxed note Galileo's
   Experiment).

The promise of "a few pages on fluid dynamics" is Chapter 12 and stays plain
text, as the config asks, since the book names no section there. The
untyped symbols of the section ($C$, $A$, $\rho$, $\eta$, $r$, $m$, $b$) are
written in plain LaTeX and set in ink; $\kFD$, $\kFs$, $\kFnet$, $\kv$,
$\kvt$, $\kg$ and $\ka$ carry their macros.

Learning objectives, the section summary and the two glossary terms come out
of the running text into the tables and the views. The conceptual questions,
the problems and the Critical Thinking item taken from 5.3 go to the
Exercises document; there is no Check Your Understanding box, so nothing is
inline.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| drag-force-equation | result, eq-drag-force | drag | the boxed Drag Force note; problems 4 and 5; conceptual questions 1 and 2 |
| drag-coefficient | idea | coefficient | Table 5.2; Figures 5.8 and 5.9; conceptual question 1 |
| terminal-velocity | idea | terminal | the skydiver passage; the Take-Home Experiment; Example 5.2 |
| terminal-velocity-magnitude | result, eq-vt | terminal | the 75 kg skydiver; Example 5.2; problems 1, 2 and 3 |
| stokes-law | result, eq-stokes | stokes | the boxed Stokes' Law note; problems 7, 8 and 9 |
| size-and-terminal-velocity | idea | size | the squirrel; Haldane's paragraph; conceptual question 4; the Critical Thinking item |

`drag-force` is Chapter 4's node, introduced at 4.7 where the barge example
names it, so `drag` reinforces it rather than introducing it a second time,
and the five nodes of this section rest on it. The section also uses
`friction` (4.3, "Like friction, the drag force always opposes the motion"),
`newtons-second-law`, `weight` and `free-fall` at `terminal`, where a zero
net force is what makes the speed stop growing.

## Figures

id · replaces or Sim · concepts · what moves or still, with the reason ·
sliders with their types · headline · graph · 3D

1. `fig-bobsled` · **photograph, kept**, Figure 5.7 · the text points the
   reader at it ("Athletes as well as car designers seek to reduce the drag
   force to lower their race times. (See Figure 5.7)"), and the bobsled is
   the shaped body the passage is about · the book's caption with its credit
   clause, width 250.
2. `fig-wind-tunnel` · **photograph, kept**, Figure 5.8 · the text points at
   it where it says the drag coefficient is determined empirically in a wind
   tunnel, which is the thing the photograph shows · the book's caption with
   its credit clause, width 200.
3. `fig-body-suits` · **photograph, kept**, Figure 5.9 · the text points at
   it in the passage on body suits and world records · the book's caption
   with its credit clause, width 250.
4. `fig-geese` · **photograph, kept**, Figure 5.10 · the text points at it
   where it says a flock forms a streamlined pattern · the book's caption
   with its credit clause, width 250.

   No photograph of this section is a splash image and none is decoration,
   so none is dropped, which is what the chapter's exploration expected.

5. `sim-drag` · **Sim** · drag-force-equation, drag-coefficient, drag-force ·
   variation by slider: the drag arrow and the parabola answer speed,
   coefficient and area, and the hollow point at half the speed sits at a
   quarter of the force · arrows: symbolic (a force and a velocity vector) ·
   still, no clock in the idea · v (20 to 150 km/h, velocity), C (0.05 to
   1.12 with a detent at every Table 5.2 value, untyped), A (0.20 to 3.00 m²,
   area); it opens on the Toyota Camry of problem 4, C = 0.28 and 0.70 m², at
   100 km/h · "At 100 km/h the drag is 91.5 N, four times the 22.9 N it would
   be at half that speed" · graph below the strip, fixed at 0 to 150 km/h by
   0 to 250 N · 2D. Each body of Table 5.2 is a library body moving the way
   it really moves; the arrows keep one scale within each scene and a drag
   longer than the room is cut with two slashes. Readout: the drag equation
   with the numbers put in. Draws force, velocity, area, density.
   works: read off the image: no image. Table 5.2's twelve values are the
   detents; problem 4 gives the Camry 0.70 m². ½(0.28)(1.21)(0.70)(27.8)² =
   91.5 N, and 22.9 N at 50 km/h.
   Re-examined 2026-11-17: kept and fixed. The scene left a blank band under
   a small body and the caption ran to six sentences; the road bodies are
   drawn 1.3 times larger, the stage is 80 units shorter and the caption says
   only what to change.

6. `sim-terminal` · **Sim** (the book draws no sketch of the falling
   skydiver) · terminal-velocity, terminal-velocity-magnitude,
   drag-force-equation · flow by animation: the reader watches the drag
   arrow grow to the length of the weight arrow while the acceleration arrow
   shrinks to nothing and the speed levels off, which the book gives only in
   words · arrows: symbolic (two forces, the velocity and the acceleration
   of a body held in the middle of the scene) · **moves**: the fall has a
   clock in it; the run lasts 3.5 v_t/g and loops with the scrubber ·
   position in the air (choice: spread eagle, the book's 0.70 m² and C = 1.0
   of Example 5.2; head first, the text's 0.18 m² and C = 0.70), mass (50 to
   110 kg, detents at the book's 75 and 85 kg, default 85); the area and the
   coefficient are what the position changes, so they are no longer two free
   sliders · no headline: every arrow carries its live value · graph beside:
   v against t on fixed axes, 0 to 40 s by 0 to 120 m/s, the terminal
   velocity dashed and the other position's terminal velocity dashed faint
   above or below it · 2D. Readout, two formulas on two lines: F_net = mg −
   F_D with the live numbers, and v_t with its substitution in m/s and km/h.
   Draws force, velocity, acceleration, time, mass, area, density.
   works: read off the image: no image. Example 5.2: 85 kg, A = (2 m)(0.35 m)
   = 0.70 m², C = 1.0, v_t = 44 m/s (here 44.4 m/s, 160 km/h). The text: 75
   kg head first, 0.18 m², C = 0.70, 98 m/s = 350 km/h (here 98.2 m/s, 353
   km/h). must hold: (1) those two on load and at 75 kg head first; (2) the
   weight and drag arrows share one scale and are equal at the end of the
   run; (3) the readout's difference is the difference of the two numbers
   shown; (4) the point on the graph, the velocity arrow and the label give
   one speed.
   Re-examined 2026-11-17: rebuilt. The skydiver fell down a ruled column
   that taught nothing, with the two force arrows on different footings, a
   three-clause headline and a note under the readout; the area and the
   coefficient were free sliders though the book ties both to the position.

7. `sim-stokes` · **Sim** (the book draws no sketch of Stokes' law) ·
   stokes-law, terminal-velocity · flow by animation: a steel bead sinks
   through a jar of oil at one steady speed, and the fall takes a time the
   reader can read, which is the ball-bearing problem · arrows: symbolic
   (the Stokes drag and the weight, equal) · **moves**: the fall is finite
   and loops with the scrubber · bead radius r (0.5 to 4.0 mm, default 1.5),
   viscosity η (0.10 to 2.00 kg/(m·s), default 0.76); the defaults are the
   ball bearing of problem 9, 0.60 m in 12 s · "After 4.9 s the bead has
   sunk 24.8 cm at a steady 50.3 mm/s" · graph beside: the steady speed
   against the radius, greyed past the radius where the flow stops being
   smooth · 2D. Readout, two formulas on two lines: F_s = 6πrηv with the
   numbers, and mg with the numbers, the same force. Draws force, velocity,
   position, viscosity, mass, acceleration.
   works: read off the image: no image. Problem 9: steel 7.8 × 10³ kg/m³,
   diameter 3.0 mm, 0.60 m in 12 s, η = 0.76 kg/(m·s). v = 2ρr²g/9η = 50.3
   mm/s, 11.9 s; m = 1.10 × 10⁻⁴ kg, mg = 1.08 × 10⁻³ N = 6πrηv.
   Re-examined 2026-11-17: kept and fixed. The headline and the caption are
   cut, the note under the readout (which named the Reynolds number, an idea
   of Chapter 12) is gone, and the weight has its own readout line.

8. `sim-size` · **Sim** (the book draws no sketch of Haldane's scaling) ·
   size-and-terminal-velocity, terminal-velocity-magnitude · variation by
   slider: the speed a body lands at against the height it fell, for the 85
   kg skydiver of Example 5.2, for a body of the same shape k times as long
   and for no air at all; the small body leaves the no-air curve within a
   few metres and never goes faster, which is Haldane's mouse down the mine
   shaft · arrows: symbolic (the two landing velocities, to one scale) ·
   still: the reader sets the height and reads both landings, so no clock is
   needed; the drop race it replaces repeated the levelling curves of
   `sim-terminal` · k (0.05 to 1.00, default and dashed circle at Haldane's
   tenth), h (1 to 1000 m on a logarithmic slider, detents at the 5.0 m tree
   of problem 3 and at Haldane's thousand yards, 914 m, the default) ·
   "After falling 914 m the full-size body lands at 44.4 m/s and the smaller
   one at 14.0 m/s; with no air both would land at 134 m/s" · graph beside
   the two bodies: v against the height of the fall, 1 to 1000 m
   logarithmic by 0 to 50 m/s, fixed · 2D. Readout: v_t with k³m and k²A put
   in, reduced to √k times the full-size v_t, one chain. Draws velocity,
   position, mass, area, density, acceleration.
   works: read off the image: no image. Haldane: a tenth the length, a
   thousandth the weight (85 kg to 85 g), a hundredth the surface (0.70 m² to
   70 cm²). v after a fall h with quadratic drag: v² = v_t²(1 − e^(−2gh/v_t²)).
   must hold: (1) on load 44.4 m/s and 14.0 m/s = √0.10 × 44.4; (2) the two
   bodies are drawn to one scale, the small one k times as long; (3) both
   curves start on the no-air curve; (4) the arrows' values are the points
   on the graph.
   Re-examined 2026-11-17: rebuilt. The smaller body was a dot, the race
   showed the same v against t curves as `sim-terminal`, and the readout
   joined two formulas with a colon.

The drag coefficient has no figure of its own: the wind tunnel that measures
it is Figure 5.8, which is kept, and `sim-drag` carries $C$ on a slider and
names the body of Table 5.2 it matches, which is what a separate figure
would have shown. The bead of `sim-stokes` is steel at the density the
book's own problem gives it, $7.8 \times 10^3$ kg/m³, and buoyancy is
neglected, as the book neglects it there; nothing in either figure is
computed that the section does not compute.

No figure of this section serves an exercise: no problem, conceptual
question or Critical Thinking item of 5.2 refers to a drawing. The Critical
Thinking item taken from 5.3 carries the book's own answer graph inside its
answer, and that image is copied to `media/ch05/`.

Extra simulations (rule 15), considered and judged:

- The coffee-filter experiment as a graph: nested filters of one, two,
  three, four and five, with $\kv$ against $m$ and $\kv^2$ against $m$ side
  by side, so the reader can see which is the straight line. It opens a view
  the required figures do not, since `sim-terminal` shows one mass at a time
  rather than the family. Left, and for the reason the box itself gives: the
  book asks the reader to gather the filters, measure the times and decide
  which relationship is more linear, and a figure that plots both lines
  hands over the answer before the experiment is done.
- A car's power against its speed, to show the claim that over half of a
  car's power goes to overcoming drag at highway speeds and that 70 to 80
  km/h is the most efficient cruising speed. Power is Chapter 7, and the
  section states the fact without deriving it, so the figure would be built
  on an idea the reader has not met. Left.
- Streamlines round a bluff body and a shaped one in a wind tunnel. The book
  describes no flow pattern and gives no model for one, so everything drawn
  would be invented rather than transformed. Left.
- Galileo's two objects dropped from the tower, one heavy and one light.
  `sim-size` already drops two bodies of the same shape and different size
  and shows them separating, and the boxed note is a set of questions for
  the reader rather than a result to draw. Left.

None built.
   Revised in the figure-audit pass of 2026-09-12: the headline is one
   capitalized sentence.

## Exercises

- No Check Your Understanding box; nothing inline. Every item is at the end.
- 4 conceptual questions, `cq1` to `cq4`, Understand, none keyed, each with
  an AI-marked suggested approach: `cq1` (fs-id1165298899670, the pros and
  cons of body suits, citing `coefficient`), `cq2` (fs-id1165298622189, when
  each of the two drag expressions applies, citing `stokes`), `cq3`
  (fs-id1165296261672, oil and rain on the road, citing `drag`) and `cq4`
  (fs-id1165296346967, why a squirrel walks away from a fall, citing
  `size`).
- 5 problems keyed and kept: `p1` (fs-id1165298861311, the 80.0 kg head
  first skydiver, multi with the speed in m/s and in km/h), `p3`
  (fs-id1165298835347, the 560 g squirrel and the 56 kg person, multi with
  the two speeds), `p5` (fs-id1165298726139, the factor by which drag grows
  from 65 to 110 km/h, number), `p7` (fs-id1165296534353, the units of
  viscosity from Stokes' law, open with the book's own derivation) and `p9`
  (fs-id1165298696745, the steel ball bearing in motor oil, number).
- 4 problems left out, having no answer in the book's key: 2
  (fs-id1165298948219, the 60 kg and 90 kg skydivers), 4
  (fs-id1165298803376, the drag on a Camry and a Hummer), 6
  (fs-id1165298928445, the rain drop falling from 5.00 km) and 8
  (fs-id1165298534706, the spherical bacterium in water).
- Taken from 5.3 with `source_section` "5.3": the Critical Thinking item
  `ct1` (exer-86622, the two spherical beads falling at constant speed
  through a fluid) tests terminal velocity and the drag force, which this
  section introduces and 5.3 does not, so rule 12 sets it here. It is keyed,
  and its answer carries the book's own graph of the bead radius against the
  fall time, which travels with the answer as an image; both sections'
  `exercise_notes` say where the item went.
- `cq3` is printed among this section's conceptual questions but turns on
  the friction between a tyre and a wet, oily road, which 5.1 introduces. It
  is kept here, where the book prints it, and tagged with `friction`; the
  chapter pass may prefer to move it to 5.1, and `exercise_notes` says so.
- No AP test prep in this module, so nothing is held from it and nothing is
  taken from elsewhere beyond `ct1`. No generated question: every node of
  the section has a book exercise that tests it.
- Weights (rule 20): `cq1` gives `drag-force-equation` weight 2, since the
  question turns on the coefficient and only touches the equation; `cq4` and
  `p3` give `terminal-velocity-magnitude` weight 2 beside the full value for
  `size-and-terminal-velocity`, and `p3` gives `free-fall` weight 1 for the
  part with no drag in it; `p1` gives `terminal-velocity` weight 2 and
  `drag-coefficient` weight 1; `p9` gives `terminal-velocity` weight 2
  beside the full value for `stokes-law`; `ct1` gives `stokes-law` weight 2,
  since the beads fall at a constant speed and the item never says which
  drag law holds.

## Views

- Formulas: the six equations of the section already in `chapter.json`, the
  drag force, the terminal velocity and Stokes' law important and the three
  steps not.
- Definitions: the twelve variables of the section; the two glossary terms,
  drag force and Stokes' law.
- Concept map: the six nodes above with their edges into 2.7, 4.3 and 4.7.

## Colour

The page binds force, velocity, acceleration, time, position, mass, area,
density and viscosity. `sim-drag` draws the drag arrow and the force axis in
the force hue and carries the speed on a velocity slider and the frontal
area on an area slider; `sim-terminal` draws the weight and the drag as
forces, the speed and the terminal levels as velocities, the shrinking
acceleration arrow and the time axis, with the mass on its slider;
`sim-stokes` draws the weight and the Stokes drag as forces, the steady
speed as a velocity, the radius as a position and the viscosity on its
slider; `sim-size` draws the two landing velocities, the height of the fall
as a position, and each body's mass and area as values, its two curves in
the bodies' referent colours. The drag coefficient and the scale factor are
untyped and stay in ink.

## Wanted at chapter level

- variables `F_D` → 5.2-drag
- variables `C_drag` → 5.2-drag
- variables `A` → 5.2-drag
- variables `ρ` → 5.2-drag
- variables `v` → 5.2-drag
- variables `b` → 5.2-drag
- variables `v_t` → 5.2-terminal
- variables `m` → 5.2-terminal
- variables `g` → 5.2-terminal
- variables `F_s` → 5.2-stokes
- variables `r` → 5.2-stokes
- variables `η` → 5.2-stokes
- equations `eq-drag-prop` → 5.2-drag
- equations `eq-drag-force` → 5.2-drag
- equations `eq-drag-b` → 5.2-drag
- equations `eq-terminal-balance` → 5.2-terminal
- equations `eq-vt` → 5.2-terminal
- equations `eq-stokes` → 5.2-stokes
- equations `eq-terminal-balance`: its `ktex` writes $F_{\text{net}}$ in
  plain LaTeX, but `F_net` is a symbol of the book with the macro `\kFnet`
  and the type force, so the line should read
  `\kFnet = m\kg - \kFD = m\ka = 0` and wear the force hue on the sheet, as
  the text of this section writes it.
- concepts `drag-force`: the chapter's exploration asks for the node to move
  from 4.7 to 5.2, which is where the book gives the drag force its
  characteristics rather than using it as an unknown. This section writes a
  `reinforces` row for it either way, so the move costs nothing here.

### What the chapter pass did with these (2026-09-11)

- Every anchor above is written into `ch05/chapter.json`, and each one names a
  span id that stands in this section's `text.html`.
- The `ktex` of `eq-terminal-balance` now reads
  `\kFnet = m\kg - \kFD = m\ka = 0`, so the formula sheet writes the net force
  with the macro of the book's `F_net` row and wears the force hue, as the
  text of this section writes it.
- The concept `drag-force` stays under 4.7, where Chapter 4 introduces it and
  the section is built. This section reinforces it, which is what the coverage
  rows already say, and its six nodes rest on it.
- Conceptual question 3, on oil and gasoline on a road in the rain, goes to
  5.1. It turns on the coefficient of friction between a tyre and a lubricated
  road, which 5.1 introduces and this section does not, and it is the question
  the Take-Home Experiment of 5.1 ends on; rule 12 sets an exercise with the
  section that introduces what it tests, so 5.1 carries it as `cq6` with
  `source_section` 5.2 and the notes of both sections say so. The remaining
  questions keep the numbers the book prints them under, so this section's
  conceptual questions are `cq1`, `cq2` and `cq4`, as 5.3's are.
- `sim-stokes` plots the steady speed against the radius of the bead and
  colours no clock, so `time` comes out of its `draws`; the page binds the
  type through `sim-terminal` and `sim-size` as before.

## Derivations

- Terminal velocity ('Let's see how this works out more quantitatively') · score 2 · built as drv-terminal-velocity: one node from Newton's second law and the drag equation, $v^2$ inserted before the root; replaces the four displays, the skydiver's numbers and Example 5.2's restatement stay as printed
