# Plan: 2.5 Motion Equations for Constant Acceleration in One Dimension (m42099)

Source: `source.md`, converted from the CNXML module. Written after the
fact on 2026-09-12: the section was built on 2026-09-05 without a plan
file, and this records what stands in `text.html`, `figures.js` and
`section.json` today, including the figure fixes made in the audit pass
of 2026-09-12.

## Sub-concepts (page headers)

The book runs this module as a chain of derivations with a worked
example after each. The page keeps that chain, one block per equation:

1. **Notation: t, x, v, a** (book: the opening paragraphs on taking
   t₀ = 0)
2. **Constant acceleration** (book: the assumption that ā = a)
3. **Displacement from average velocity** (book: solving for Δx and x,
   with Example 2.8, the jogger)
4. **Final velocity** (book: solving for v, with Example 2.9, the
   airplane, and the Making Connections note on the Space Shuttle)
5. **Final position when velocity is not constant** (book: solving for
   x, with Example 2.10, the dragster)
6. **Final velocity without time** (book: solving for v², with Example
   2.11, the dragster again)
7. **Putting Equations Together** (book's own header: the summary of
   knowns and unknowns, with Example 2.12, the braking car)
8. **Example 2.13, the car merging into traffic**, which is where the
   quadratic and its two roots come in.

Learning objectives, the section summary and the glossary come out of
the running text into the views. The AP item and the problems go to the
Exercises document; the Check Your Understanding box stays inline.

## Concept nodes

| id | kind | name | where introduced |
|---|---|---|---|
| const-a | idea | Constant-acceleration model | `constant-a` |
| x-from-vbar | result | x = x₀ + v̄t | `avg-velocity` |
| vbar-midpoint | result | v̄ = (v₀ + v)/2 | `avg-velocity` |
| v-from-at | result | v = v₀ + at | `final-velocity` |
| x-quadratic | result | x = x₀ + v₀t + ½at² | `position-quadratic` |
| v-squared | result | v² = v₀² + 2aΔx | `velocity-squared` |
| choose-equation | skill | Choose the equation from knowns and unknowns | `summary` |
| physical-solution | skill | Interpret the solution physically | `ex-merge` |

Equations: `eq-notation`, `eq-x-vbar`, `eq-vbar`, `eq-v`, `eq-x`,
`eq-v2`. The four kinematic equations are the spine of the chapter, and
every later section leans on them.

## Figures

Re-examined as a set on 2026-11-17 (Claude Fable 5.2). The section had seven
drawn figures, six of them a strip over a graph. `sim-notation` was dropped;
the other six were rebuilt, each round one thing the book's still sketch
cannot show.

id · replaces · concepts · value add · arrows · moving or still · controls ·
headline · graph · 2D or 3D

0. `sim-notation` · **dropped**. A number line and a stopwatch that said
   Δt = t and Δx = x − x₀ with three sliders, none of which changed the
   idea. It replaced no book figure and the paragraph above it says the
   same in one line.
1. `sim-avg` · Sim; the book prints no figure and asserts v̄ = (v₀ + v)/2
   without deriving it · vbar-midpoint, x-from-vbar · motion the reader
   would otherwise imagine: a car that changes velocity steadily and a car
   that holds v̄ leave together and arrive together, which is what an
   average velocity means · kinematic (the two cars) · moving · $\kvo$ and
   $\kv$, 0 to 80 km/h in steps of 5, opening on the text's 30 and 60 km/h
   · "A car holding v̄ = 45 km/h arrives level with one that speeds up
   steadily from 30 to 60 km/h." · v against time below, time as 0, t/2, t
   · 2D. No time or distance is given a number: the text's example has
   none, and the argument does not need one. The graph argues by symmetry
   (below v̄ for the first half, above it by as much for the second), not
   by area, since the book has not taught area under a velocity graph by
   this page. Draws position, time, velocity.
2. `sim-jogger` · Figure 2.25 + 2.26 · x-from-vbar · the comparison the
   caption of 2.26 states: a runner twice as fast is always twice as far ·
   kinematic · moving · $\kvb$ 1.00 to 5.00 m/s (default 4.00), $\kt$ 30
   to 120 s (default 120), the numbers of Example 2.8; x₀ is zero as the
   example takes it · "After 60 s the jogger is at x = 240 m, and a runner
   twice as fast is twice as far, at 480 m." · x against v̄ below; the line
   swings up as the clock runs, its slope the time so far · 2D. Road fixed
   at 0 to 1200 m, graph at 0 to 10 m/s by 0 to 1200 m.
   works: read off the image · 2.25: a segment from x₀ to x = ?, an arrow
   v̄ = 4.00 m/s above it, x and y axes. 2.26: "Displacement vs. Velocity
   for a given time, t", a straight line through the origin with six
   evenly spaced points, Δx (m) against v̄ (m/s), no numbers. The alt text
   agrees. must hold: the fast runner is at exactly twice the jogger's
   position at every instant; both dots lie on the one line; 480 m at
   4.00 m/s and 120 s.
3. `sim-plane` · Figure 2.27 + 2.28 · v-from-at · the equation as arrows:
   v₀, then at laid back from its head, lands on the head of v; the
   Discussion's negative final velocity can be reached · kinematic ·
   moving · $\kvo$ 50 to 80 m/s (70.0), $\ka$ −2.00 to 0 m/s² (−1.50),
   $\kt$ 5 to 48 s (40.0) · "After 20.0 s the airplane has lost 30.0 m/s
   of its 70.0 m/s." · v against t below with the bracket at · 2D. Runway
   fixed at 0 to 4000 m, graph at 0 to 48 s by −60 to 90 m/s; the slider
   ranges were cut so the plane never backs past its touchdown point. The
   earlier figure stopped the plane at rest and wrote a capped time into
   the readout, so the equation shown was not the one computed.
   works: parts · a plane at t₀ = 0 with v₀ = 70.0 m/s (long arrow, right)
   and a = −1.5 m/s² (short arrow, left); the same plane at t = 40.0 s
   with v = 10.0 m/s (short arrow, right) and the same a. flow: the plane
   moves right and slows. must hold: the a arrow is the same length at
   every instant and points against the motion; the v arrow at 40.0 s is
   one seventh of the v₀ arrow; v₀ + at = v tip to tail at every instant;
   readout 70.0 + (−1.50)(40.0) = 10.0 m/s. read off the image: 2.27 writes
   v_f = ?, 2.28 writes a = −1.5 m/s² at the first plane and −1.50 m/s² at
   the second.
4. `sim-dragster` · Figure 2.31 + 2.32 · x-quadratic, v-squared · marks at
   each quarter of the time, the distances between them written out: from
   rest 25, 75, 126, 176 m, as 1 : 3 : 5 : 7, so the square of the time is
   seen on the track · kinematic · moving · $\kvo$ 0 to 20 m/s (0, special
   "from rest"), $\ka$ 10.0 to 30.0 m/s² (26.0), $\kt$ 3.00 to 6.00 s
   (5.56) · "After 2.78 s the dragster has gone 100 m, and each quarter of
   the time carries it farther than the last." · x against t below, the
   half-time point dropped to both axes · 2D. Track fixed at 0 to 700 m
   (the farthest run is 660 m). The readout has two lines: Example 2.10's
   x = ½at² = 402 m (morphing to x = v₀t + ½at² off the special, x₀ being
   zero on this track) and
   Example 2.11's v = √(v₀² + 2a(x − x₀)) = 145 m/s, which is what earns
   the fold of 2.32.
   works: read off the image · 2.31: segment x₀ to x = ?, arrow a =
   26.0 m/s². 2.32: the same segment labelled v₀ and v = ?. must hold:
   402 m and 145 m/s at the defaults; 25% of the way at t/2 from rest; the
   four gaps add to x.
5. `sim-braking` · Figure 2.33 + 2.34 · v-squared, choose-equation · the
   speed against position under the two roads, on the road's own scale:
   where the dry-road car has stopped the wet-road car is still doing
   16.0 m/s, which the book's picture of four parked cars does not show ·
   kinematic · moving · $\kvo$ 10 to 35 m/s (30.0, detents at 15 and 30),
   reaction time 0 to 1.00 s (0.50); the two decelerations are the book's
   and are fixed, since they are what "dry" and "wet" mean here · "Where
   the car on dry concrete has stopped, the car on wet concrete is still
   moving at 16.0 m/s." · v against x below, dry solid and wet dashed · 2D.
   Scale fixed at 0 to 160 m (longest stop 157.5 m).
   works: parts · a car at x = 0; lines to 64.3 m (dry) and 90.0 m (wet)
   with no reaction time; below, a "Reaction time" band from 0 to 15 m,
   then lines to 79.3 m (dry) and 105 m (wet), on an axis "Position x (m)"
   ticked every 10 m. flow: each car holds 30.0 m/s across the band, then
   slows to rest. must hold: reaction 15.0 m; braking 64.3 and 90.0 m;
   stops at 79.3 and 105.0 m; each curve is flat across the band and meets
   the axis where its car stops; at 15 m/s the braking distances are a
   quarter (16.1 and 22.5 m). read off the image: 2.33 gives v₀ =
   30.0 m/s, v_f = 0, a_dry = −7.00, a_wet = −5.00 m/s².
6. `sim-merge` · Figure 2.35 · x-quadratic, physical-solution · what the
   discarded root describes: the clock starts at the negative root and a
   faint car follows the parabola back down the ramp and up again, turning
   solid at t = 0 · kinematic · moving · $\kx$ 100 to 300 m (200), $\kvo$
   0 to 14.0 m/s (10.0), $\ka$ 1.00 to 4.00 m/s² (2.00) · "Carried back to
   −12.0 s, the equation puts the car at 24 m, before the motion began."
   then "After 5.0 s the car is 75 m up the ramp, and it reaches the end at
   10.0 s." · x against t below, the part before t = 0 shaded and faint ·
   2D. Road and graph share −100 to 300 m; time axis −45 to 30 s.
   works: read off the image · t = ?, a segment from x₀ = 0 to x = 200 m,
   v₀ = 10.0 m/s, v = ?, a = 2.00 m/s², all arrows to the right. must
   hold: roots 10.0 s and −20.0 s at the defaults; the car is at x = 0
   with v = 10.0 m/s when t = 0; the faint car is at the ramp's end at the
   negative root, moving backward.

## Photographs

- Figure 2.24, the kayaks racing in Newbury (credit: Barry Skeates,
  Flickr): **drop**. It is the splash image at the head of the section
  and the text never points at it.
- Figure 2.29, the Space Shuttle *Endeavor* blasting off (credit:
  Matthew Simantov, Flickr): **keep** as `fig-shuttle`, with the book's
  caption and credit and the width the book prints it at, 300. The
  Making Connections note beside it is about the Space Shuttle against
  an intercontinental ballistic missile, so the photograph shows the
  thing the passage is about (rule 14). Copied to
  `media/ch02/Figure_02_04_01a.jpg`. Added in the audit pass of
  2026-09-12; the original build left it out.
- Figure 2.30, Tony Schumacher's controlled burnout (credit: Lt. Col.
  William Thurmond, U.S. Army): **drop**. It stands at the head of
  Example 2.10 as a picture of a dragster, and `sim-dragster` two
  paragraphs later draws the run the example is about with the book's
  numbers on it, so the photograph adds nothing the page does not
  already carry.

## Exercises

- 1 Check Your Understanding, the rocket sled, inline after the final
  velocity block.
- 1 AP test prep item, the marble, in the Exercises document.
- 12 problems in the Exercises document, the ones the book's answer key
  covers. Problems without a keyed answer are left out, and
  `exercise_notes` says so.
- No generated questions.

## Views

- Formulas: `eq-notation`, `eq-x-vbar`, `eq-vbar`, `eq-v`, `eq-x`,
  `eq-v2`.
- Definitions: the symbols x, x₀, v, v₀, v̄, a, t as the chapter's table
  already carries them.
- Concept map: the eight nodes above.

## Types the page binds

position, velocity, acceleration, time. Mass and length stay in ink, as
the book's rules say.

## Derivations

- Solving for Displacement and Final Position from Average Velocity when Acceleration is Constant (derivation box) · score 1 · built as drv-position-from-average-velocity: one node, the definition of average velocity through the notation to $x = x_0 + \bar v t$; the box is replaced whole and its closing line, $\bar v = (v_0 + v)/2$, which the book asserts rather than derives, stays printed after the host
- Solving for Final Velocity (derivation box) · score 1 · built as drv-final-velocity: one node from the definition of acceleration; the box is replaced whole
- Solving for Final Position When Velocity is Not Constant (derivation box) · score 2 · built as drv-position-constant-acceleration: two nodes, $\bar v = v_0 + \tfrac12 at$ and its substitution into $x = x_0 + \bar v t$, with the book's add-and-halve split into two moves and the expansion inserted; the box is replaced whole
- Solving for Final Velocity when Velocity Is Not Constant (derivation box) · score 5 · built as drv-velocity-without-time: two nodes, $t$ from $v = v_0 + at$ and the substitution into $x = x_0 + \bar v t$; the five lines the book skips between $t = (v - v_0)/a$ and the result are inserted; the box is replaced whole
- Example 2.13, Calculating Time: A Car Merges into Traffic · score 2 · not built: a worked example that substitutes into the section's equation and solves the quadratic
