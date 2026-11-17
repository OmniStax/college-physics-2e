# Plan: 3.2 Vector Addition and Subtraction: Graphical Methods (m42127)

Source: `source.md` (converted from CNXML); the figure numbers 3.7 to 3.23
follow the chapter exploration's count. Status: built 2026-09-11 without a
review stop, on Chen's instruction to finish Chapters 2 and 3 in one job.

The section that gives a vector its arrow: one photograph (a splash
image), twenty-two sketches of arrows in five runs, two worked examples,
two equations, no Check Your Understanding box, two AP items with a table
of heights, eight conceptual questions and twelve problems, six of them
keyed. The PhET note (Maze Game) is dropped per config. It stays one page
(rule 11).

## Sub-concepts (page headers)

The book has five titled runs of text. Page structure, one block per
idea, span ids as the chapter's anchors expect them:

1. `vectors-2d` **Vectors in two dimensions** (book: the opening
   paragraph, the boxed note Vectors in this Text, Figures 3.8 and 3.9).
   The chapter's variables `D` and `θ` anchor here.
2. `head-to-tail` **Vector addition: the head-to-tail method** (book:
   the paragraph on tail and head, Figure 3.10, the six numbered steps
   with Figures 3.11 to 3.13, the sentence on accuracy). The steps are
   kept as the book's numbered paragraphs. Example 3.1, the woman who
   takes a walk, sits inside this block as `ex-walk` with Figures 3.14 to
   3.18 and the commutative equation; the chapter's variables `A_mag`,
   `B`, `C`, `R` and the equation `eq-commutative` anchor at `ex-walk`.
3. `subtraction` **Vector subtraction** (book: the negative of a vector,
   Figure 3.19, the subtraction equation, Example 3.2 the woman sailing a
   boat as `ex-sail` with Figures 3.20 to 3.23). `eq-vector-subtraction`
   anchors at `subtraction`.
4. `scalar-multiplication` **Multiplication of vectors and scalars**
   (book: the three-times-as-far paragraph and the three rules).
5. `components` **Resolving a vector into components** (book: the two
   paragraphs on finding the parts of a displacement; the cross
   references to Projectile Motion, Dynamics and the analytical section
   stay plain text).
6. `paths` **The map of paths for the problems** (OmniStax: the figure
   problems 1 and 2 refer to, kept faithfully at the end of the text so
   that the problem card can point at it).

Learning objectives, the section summary and the glossary come out of the
running text into the views. The conceptual questions and the problems go
to the Exercises document.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| vector-in-two-dimensions | idea | vectors-2d | glossary (magnitude, direction, head, tail); the note Vectors in this Text; Figures 3.8, 3.9; CQ 1, 2, 3, 5 |
| resultant-vector | idea | head-to-tail | glossary (resultant, resultant vector); CQ 6, 8 |
| head-to-tail-method | skill | head-to-tail | glossary; the six steps and Figure 3.10; Example 3.1; problems 1, 5, 9 |
| vector-addition-commutative | result, eq-commutative | ex-walk | glossary (commutative); the discussion of Example 3.1 and Figure 3.18 |
| vector-subtraction | result, eq-vector-subtraction | subtraction | Figure 3.19; Example 3.2; problem 7 |
| scalar-multiplication | idea | scalar-multiplication | the passage and the summary; CQ 7 |
| resolving-vector | skill | components | the passage; problems 3 and 11 |

The 2.2 nodes `vector` and `scalar` are reinforced where the book prints
their glossary terms again, not redefined; `reference-frame` (2.1) is used
in the opening paragraph, `right-triangle-resultant` (3.1) in the
head-to-tail construction of the 9-and-5 walk, `vector-components` (3.1)
in the components passage, and `displacement` and `distance-traveled`
(2.1) in problem 1 and conceptual question 4.

## Figures

Re-examined as a set on 2026-11-17 (claude-fable-5-2). The section had seven
sims that drew the same two triangles again and again, each small in a blank
stage. Three ideas repeated: `sim-vector-2d`, `sim-head-to-tail` and
`sim-components` were one 9-5-10.3 triangle on one grid; `sim-head-to-tail`
and `sim-walk` were the same walked construction; `sim-walk` at rest was
`sim-order` with the order A, B, C. Five drawn figures remain, one per idea.

id · replaces · concepts · value add · arrows · moving or still · controls · headline · graph · 3D

1. Figures 3.8 and 3.9 · **reverted to the book's images**, two kept
   photographs (`sim-vector-2d` keeps its id for 3.8; `fig-ruler-protractor`
   is 3.9). The sim's two sliders set a length and an angle that its ruler
   and protractor then read back, which shows nothing the book's map with the
   helicopter path and its ruler drawing do not, and the same triangle is
   drawn live in the two figures below.
2. `sim-head-to-tail` · Figure 3.10 + 3.11 + 3.12 + 3.13 · head-to-tail-method,
   resultant-vector · flow by animation (the construction happens in the
   book's order) and variation by slider · arrows symbolic (displacement
   vectors), grown from the tail as each is drawn · a story, not a clock: the
   steps are the stops of a story slider (start, Step 1, Step 2, Step 4,
   Steps 5, 6), which opens at the last stop so the finished construction is
   the poster · blocks east (1 to 12, default 9), blocks north (1 to 8,
   default 5), both position · the step in the book's words · none · 2D.
   works: parts: the first vector along the east axis from the starting
   point; the second from the head of the first, north; the resultant D from
   the tail of the first to the head of the second; a ruler laid beside D
   with a tick per block; a protractor centred on the starting point · flow:
   first vector, then second, then D, then the tools · must hold: the tail
   of the second vector is on the head of the first; D starts at the
   starting point and ends on the head of the second; the ruler's zero is at
   D's tail and its reading at D's head is D; the protractor's arc runs from
   the east axis to D · read off the image: 9 units east, 5 north, 10.3
   units, θ = 29.1°.
3. `sim-walk` · Figure 3.14 + 3.15 + 3.16 + 3.17 + 3.18 (the order figure
   is folded in; `sim-order` is gone) · head-to-tail-method,
   resultant-vector, vector-addition-commutative · variation by a choice:
   the six orders, each leg gliding to its new place · arrows symbolic ·
   still, with a morph on a change of order · one choice, the order, as a
   row of six buttons, default A + B + C (the example's own); the angle
   sliders of the old order figure are dropped, since turning a leg does not
   change the idea and a free angle forced a scale at which the example was
   a quarter of the stage · "the walk ends at the same point" · none · 2D.
   works: parts: on the left A, B and C each from its own east line with its
   angle (Figure 3.14); on the right the three head to tail from the start,
   the resultant R from the start to the last head, a ruler along R ticked
   every 10 m and a protractor at the start turned upside down, since R is
   south of east (Figures 3.15 to 3.17); the walk as A, B, C stays in faint
   ink when another order is chosen (Figure 3.18) · must hold: every leg
   keeps its length and direction in every order; all six orders end on the
   head of R; the ruler reads 50.8 at R's head; R lies below the east line ·
   read off the image and the text: A 25.0 m at 49.0° north of east, B 23.0 m
   at 15.0° north of east, C 32.0 m at 68.0° south of east, R = 50.8 m,
   θ = 5.47° south of east (checked: 50.84 m, 5.47°).
4. `sim-subtraction` · Figure 3.19 + 3.20 + 3.21 + 3.22 + 3.23 ·
   vector-subtraction · variation by slider: the dock and the place she ends
   up stay opposite each other across the head of A, 2B apart · arrows
   symbolic · still · B (10 to 35 m, default 30.0, position) and θ_B (0 to
   180°, default 112, angle); A is fixed at the example's 27.5 m at 66.0°,
   since it changes nothing about the idea · "Sailing −B in place of B
   leaves her 60.0 m from the dock." · none · 2D.
   works: parts: on the left B and −B from one point with their angles from
   the east line (Figures 3.19 and 3.21: 112° north of east and 68° south of
   east); on the right A from the start, B and −B both from the head of A, R′
   from the start to the head of B (the dock) and R from the start to the
   head of −B (the boat) · must hold: −B is as long as B and opposite; the
   two angles on the left add to 180°; both resultants start at the start ·
   read off the image and the text: A = 27.5 m at 66°, B = 30.0 m at 112°,
   R′ = 52.9 m at 90.1° north of east, R = 23.0 m at 7.5° south of east. The
   last pair is the book's reading of its own drawing; the figure computes
   22.6 m at 6.8° and says so in a note at the book's setting.
5. `sim-scalar` · Sim · scalar-multiplication · variation by slider · arrows
   symbolic · still · the scalar c alone (−3 to 3 by 0.5, default 3), with
   the text's cases marked on it: 3, −2 and 1/2; the sliders for A and its
   angle are dropped, since they do not change the idea · "3 × A is 82.5 m
   in the same direction, 66.0° north of east." · none · 2D.
6. `sim-components` · Sim · resolving-vector · variation by dragging the
   head of the vector · arrows symbolic · still · D (1 to 12 blocks, default
   10.3) and θ (0 to 180° north of east, default 29.0), the head of the
   arrow draggable; past 90° the first part points west, which the old sim
   could not show · no headline, the readout says it · none · 2D.
7. `fig-paths` · the map of paths of problems 1 and 2 · kept as a still
   redraw: the book's image is 411 pixels wide and its four paths are told
   apart by colour alone; the redraw is checked against it block by block
   (A: 3 north, 1 east; B: 4 east, 3 north, 3 west; C: 1 north, 5 east,
   2 south, 1 west, 1 north, 3 west; D: 2 south, 6 east, 4 north, 1 west).

Photographs: Figure 3.7, the Hawaiian Islands map, stays dropped (a splash
image no sentence points at).

## Exercises

- No Check Your Understanding boxes; nothing inline.
- 8 conceptual questions, all open with AI-written suggested approaches:
  `cq1` (which quantities are vectors), `cq2` (an example of a vector),
  `cq3` (what vectors and scalars share), `cq4` (the two campers, with the
  book's figure on the card), `cq5` (the pilot and the circle, with the
  book's map on the card), `cq6` (two steps that return you to the start),
  `cq7` (why a scalar cannot be added to a vector), `cq8` (two steps of
  different sizes; three or more).
- 6 problems keyed and kept: `p1` (path A: distance traveled, magnitude
  and direction of the displacement; cites `paths`), `p3` (the hikers'
  north and east components, with the cabin figure), `p5` (12.0 m at 20°
  west of north then 20.0 m at 40.0° south of west, with the book's
  figure), `p7` (the two subtractions R′ = A − B and R″ = B − A), `p9`
  (the sum of the sailing example's vectors gives R′), `p11` (the
  components of $\mathbf{v}_{\text{tot}}$, with the velocities figure).
  Directions are part of the keyed answers, so a direction is a numeric
  part with its compass sense in the unit ("º east of north").
- 6 problems left out, having no answer in the book's key: 2
  (fs-id1165298474424, path B), 4 (fs-id1165298536705, 18.0 m west then
  25.0 m north), 6 (fs-id1165298849088, the reversed order), 8
  (fs-id1165296576869, three vectors in two orders), 10
  (fs-id1165298704732, the magnitudes of $\mathbf{v}_A$ and
  $\mathbf{v}_B$), 12 (fs-id1165296227129, components along rotated
  axes).
- AP items: both test a projectile's vertical and horizontal velocity,
  which 3.4 introduces, so both are held for 3.4, which takes them with
  `source_section: "3.2"`: the first (fs-id1398128, the ball launched
  vertically with the table of heights) is unkeyed and is kept there as
  an open item with an AI-marked approach, as rule 13 and the 2.5
  precedent do for an AP item without a key; the second (fs-id2061889,
  the 60° launch with the same table) is keyed. Both are named in
  `exercise_notes`. (The section first left the unkeyed one out.)
- Nothing taken from another section; 3.3's problems 1 and 2 use the map
  of paths but test the analytical method and stay there.
- No generated questions. `vector-addition-commutative` has no keyed
  problem of its own (problems 6 and 8 test it and are unkeyed) and
  `scalar-multiplication` has only conceptual question 7; both are noted,
  none generated.
- Weights: `p1` gives `distance-traveled` weight 2 and
  `right-triangle-resultant` weight 2, since the problem is about the
  head-to-tail construction and merely counts the blocks and forms the
  right triangle; `p9` gives `vector-subtraction` weight 1, since it adds
  the sailing example's vectors and only compares with the subtraction;
  `cq7` gives `vector` weight 1.

## Views

- Formulas: `eq-commutative` (important, anchored at `ex-walk`) and
  `eq-vector-subtraction` (important, anchored at `subtraction`). Both
  already in `chapter.json`.
- Definitions: variables `D`, `A_mag`, `B`, `C`, `R`, `θ`; the ten
  glossary terms.
- Concept map: the seven nodes above, with `vector`, `scalar`,
  `reference-frame`, `displacement`, `distance-traveled`,
  `right-triangle-resultant` and `vector-components` reached through the
  coverage and the exercises.

## Colour

The page binds position only, from the seven sims whose sliders carry a
displacement magnitude ($\kD$, $\kA$, $\kB$, $\kC$) or whose readouts state
a resultant ($\kR$). Every angle, the scalar c and the order of addition
are untyped and in ink, as the chapter config says; the bold vectors
$\mathbf{A}$, $\mathbf{B}$, $\mathbf{R}$ of the equations stay in ink,
since only magnitudes and components colour. The velocity components of
problem 11 are typed velocity in the book's symbol table but appear only
in a prompt and its answer, so the page does not bind velocity. No new
hue, no new macro.

## Wanted at chapter level

- `variables[D]` (3.2) → anchor `3.2-vectors-2d`
- `variables[θ]` (3.2) → anchor `3.2-vectors-2d`
- `variables[A_mag]` (3.2) → anchor `3.2-ex-walk`
- `variables[B]` (3.2) → anchor `3.2-ex-walk`
- `variables[C]` (3.2) → anchor `3.2-ex-walk`
- `variables[R]` (3.2) → anchor `3.2-ex-walk`
- `equations[eq-commutative]` → anchor `3.2-ex-walk`
- `equations[eq-vector-subtraction]` → anchor `3.2-subtraction`
- `variables[D]` (3.2): the unit is `m` but the book's walk in the city
  measures $\kD$ in blocks (10.3 blocks); `blocks (or m)` would say what
  the section says. Not changed by this section.

Decided in the chapter pass (2026-09-11): the eight anchors above are
written into `chapter.json`. The unit of `D` is `blocks`, since the row's
meaning is the walk in the city and the text measures that displacement in
blocks; a displacement in meters has the rows `A_mag`, `B`, `C` and `R`.
Problem 9's prompt now names Figure 3.23, the figure the book's cross
reference points at (the sum $\mathbf{A} + \mathbf{B} = \mathbf{R}'$ of
Example 3.2), where the section had written 3.19. The unkeyed first AP
item is held for 3.4 with the second, as the exercises list now says.

Fold pass (2026-09-11): the four sims that stand for a run of book
figures now say so in their rows. `sim-vector-2d` carries 3.8 with 3.9
under `folds`, `sim-head-to-tail` carries 3.10 with 3.11 to 3.13,
`sim-walk` carries 3.14 with 3.15 to 3.17, and `sim-subtraction`
carries 3.19 with 3.20 to 3.23, so each eyebrow reads every number of its
run and the text's references to any of them link to the one sim. The
build links references in the running text only; problem 9's prompt is an
exercise card, and its "Figure 3.23" stays plain there.
