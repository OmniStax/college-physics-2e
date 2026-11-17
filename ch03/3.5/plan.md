# Plan: 3.5 Addition of Velocities (m42045)

Source: `source.md` (converted from CNXML). Status: built 2026-09-11
without a review stop, on Chen's instruction to finish Chapters 2 and 3
in one job.

The last section of the chapter: two titled runs of text, three worked
examples (a boat on a river, a plane in a wind, a coin dropped in an
airliner), ten sketches and no photographs, four boxed equations, two
notes (the take-home experiment with the toy boat, and Relativity and
Einstein, which sits inside Example 3.8 in the CNXML and stays there), a
PhET note dropped per config, five conceptual questions, nineteen
problems and one keyed Critical Thinking item. No Check Your Understanding
boxes and no AP items. It stays one page (rule 11).

## Sub-concepts (page headers)

The book's own headers are "Relative Velocity" (which runs from the boat
and the plane through the equations and both examples) and "Relative
Velocities and Classical Relativity". Page structure, one block per idea,
span ids as the chapter's anchors expect them:

1. `relative-velocity` **Velocity relative to a medium and to an
   observer** (book: the boat that moves diagonally, the plane carried
   sideways, Figures 3.40 and 3.41, and the paragraph that says the
   velocity relative to the observer is the sum of the two). Introduces
   `relative-velocity`.
2. `velocity-addition` **Adding velocities by components** (book: "How
   do we add velocities?", the hockey player in one dimension, the four
   boxed equations, Figure 3.42, the paragraph on which pair finds
   which, and the take-home experiment as a note). Introduces
   `velocity-addition`; the chapter's `v`, `v_x`, `v_y`, `θ` and the
   four boxed equations anchor here.
3. `boat` **A boat on a river**: Example 3.6 as `<div class="example"
   id="ex-boat">`, with Figure 3.43 folded into the sim of block 1 (see
   Figures). The chapter's `v_tot`, `v_boat`, `v_river` anchor at
   `ex-boat`.
4. `plane` **A plane in a wind**: Example 3.7 as `ex-plane`, its Figure
   3.44 replaced by a sim of the inverse problem, and the book's
   closing paragraph on choosing a coordinate system with one axis
   parallel to one of the velocities. The chapter's `v_totx`, `v_toty`,
   `v_p`, `v_px`, `v_py`, `v_w`, `v_wx`, `v_wy` and `eq-wind-components`
   anchor at `ex-plane`.
5. `relativity` **Relative velocities and classical relativity** (the
   book's own header: relative velocities defined, relativity and
   Einstein, classical relativity below 1% of the speed of light, the
   binoculars dropped from the mast, Figure 3.45). Introduces
   `classical-relativity` and reinforces `relative-velocity`, since this
   is where the book defines the term. The two shortest conceptual
   questions (the frames you use when driving, the basketball player
   who need not watch the ball) go inline here as Understand checks.
6. `coin` **A coin dropped in an airliner**: Example 3.8 as `ex-coin`,
   with Figure 3.46 and the Relativity and Einstein note inside the
   example, where the module has it.
7. `galaxies` **The galaxies of the problems**: the faithful copy of
   the five-galaxy figure that problem 13 takes its data from, as 2.1
   did for its paths.

The book's cross-references to 3.2 and 3.3 ("Vector Addition and
Subtraction: Graphical Methods") stay as the section titles in plain
text. Learning objectives, the summary and the glossary come out into
the views. The glossary prints `velocity` and `vector addition` again,
which are 2.3's and 3.2's ideas: the rows are in `chapter.json` as the
book prints them, and no new node is made for either.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| relative-velocity | idea | relative-velocity (reinforced in relativity) | glossary; Figures 3.40, 3.41; CQ 1, 2; problems 1, 3, 13 |
| velocity-addition | skill, eq-vel-mag | velocity-addition | glossary (vector addition); the four boxed equations; Examples 3.6, 3.7; problems 1, 5, 7, 9, 11, 15 |
| classical-relativity | idea | relativity | glossary (relativity, classical relativity); Figures 3.45, 3.46; Example 3.8; CQ 3, 4, 5 |

Example 3.8 also leans on `projectile-motion` and
`projectile-vertical-motion` (3.4), `free-fall-kinematics` (2.7) and
`physical-solution` (2.5, the negative root chosen); Examples 3.6 and 3.7
on `analytical-vector-addition` (3.3) and `coordinate-system` (2.2).

## Figures

id · replaces · concepts · what moves · sliders · headline · graph · 3D

Re-examined 2026-11-17 (Claude Fable 5.2), with the book's images open. The earlier
builds drew small scenes beside small triangles, ran two formulas together on one readout
line and carried long captions; `sim-components` repeated 3.3's component figures.

1. `sim-boat` · Figure 3.40 + 3.43 · relative-velocity, velocity-addition · value add:
   the crossing in motion, and a float released with the boat that drifts with the water,
   so the boat's motion relative to the water (float to boat) and relative to the shore
   (start to boat) are both on the river · arrows: kinematic, the three velocities ·
   moving, one crossing, scrubber · sliders `\kvboat` (0.20 to 2.00 m/s, default 0.75),
   `\kvriver` (0 to 2.00 m/s, default 1.20), heading (60° downstream to 70° upstream of
   straight across, default straight across; specials: straight across, and the heading
   that lands straight across, which exists only when the boat is faster than the river,
   the take-home experiment's answer) · headline "Pointed straight across, the boat
   crosses the 30 m river in 40.0 s and lands 48.0 m downstream." · no graph · 2D.
   Readout: $v_{tot} = \sqrt{v_x^2 + v_y^2}$ and $\theta = \tan^{-1}(v_y/v_x)$ with the
   numbers, one line each; off straight across, $v_x$, $v_y$ and $v_{tot}$, one line each.
   The river width (30 m) is assumed and said so; its slider is dropped, since it did not
   change the idea.
   works: parts: two banks, the river between; the boat at the near bank; the velocity
   triangle with its tail where the boat sets out (v_boat across, v_river from its head
   along the river, v_tot from the tail to the head of v_river); θ between the bank and
   v_tot; x along the river, y across · flow: the boat moves along v_tot; the water and
   the float move downstream at v_river · must hold: (1) v_tot closes the triangle at
   every setting; (2) the boat stays on the dashed path and lands where the bracket says;
   (3) the float-to-boat line is parallel to v_boat and the float is under the boat when
   the heading is straight across; (4) 1.42 m/s and 32.0° on load; (5) the special on the
   heading lands the boat straight across; (6) labels clear of the arrows · read off the
   images: 3.40 has v_boat (dashed, up), v_river (dashed, right), v_tot (solid), θ, axes
   x and y, three boats along v_tot; 3.43 adds v_boat = 0.75 m/s and v_river = 1.2 m/s.
2. `sim-plane` · Figure 3.41 · relative-velocity · value add: the plane keeps pointing
   north while a faint plane shows where it would be in still air and a dashed line shows
   how far the air has carried it, so "velocity relative to the air plus velocity of the
   air" is seen as two displacements · arrows: kinematic · moving, about 9 s of flight,
   scrubber · sliders `\kvp` (20 to 50 m/s, default 45.0), `\kvw` (0 to 20 m/s, default
   16.0), the direction the wind blows toward (shown in compass words, default 35.6°
   south of west; specials tailwind, headwind, crosswind) · headline "Pointed north at
   45.0 m/s, the plane moves over the ground at 38.0 m/s, 20.0° west of north." · no
   graph · 2D. Readout: the two component sums and the magnitude, one line each.
   works: parts: the map with a river across it; the plane pointed north; v_p north from
   the start, v_w from its head, v_tot from the start; compass axes · flow: the plane
   along v_tot, the still-air plane along v_p, the streaks with the wind · must hold:
   (1) the triangle closes; (2) the plane stays on the track and never turns; (3) the
   drift line is parallel to v_w; (4) 38.0 m/s, 20.0° west of north on load · read off the
   image: v_p dashed north, v_w dashed toward the southwest with θ at the head of v_p,
   v_tot solid, three planes along v_tot all pointed north, x (east), y (north).
3. `sim-components` · Figure 3.42 · reverted to the book's image (2026-11-17): a vector
   and its two components with a magnitude and an angle slider is what 3.3's Figures
   3.24 and 3.27 already teach, and `sim-boat` shows the same triangle with velocities.
4. `sim-wind` · Figure 3.44 · velocity-addition · value add: Example 3.7's subtraction
   made visible: the wind's two components are drawn on the triangle and a table beside
   it subtracts v_p from v_tot one component at a time · arrows: symbolic · still, no
   transport · sliders `\kvp` (20 to 50 m/s, default 45.0), `\kvtot` (10 to 50 m/s,
   default 38.0), the track (40° east to 40° west of north, default 20.0° west) ·
   headline "The wind that carries the plane off its heading blows at 16.0 m/s, 35.6°
   south of west." · no graph · 2D. Readout: $v_w$ and $\theta$, one line each.
   works: read off the image: v_p = 45.0 m/s north, v_tot = 38.0 m/s, 20.0° from north,
   110° from the x-axis (and 70° on the other side, not drawn), v_w from the head of v_p
   to the head of v_tot with θ at the head of v_p · must hold: (1) v_w runs from the head
   of v_p to the head of v_tot; (2) the table reads −13.0 and 35.7 for v_tot, 0 and 45.0
   for v_p, −13.0 and −9.29 for the wind on load, and the last row is the first minus the
   second at every setting; (3) 16.0 m/s and 35.6° on load; (4) labels clear.
5. `sim-binoculars` · Figure 3.45 · classical-relativity · value add: one scene and a
   choice of observer: from shore the ship sails on and the path is a curve; from the
   ship the mast stands still, the shore slides back and the path is straight; the
   readout's $v_x$ changes between the two and $v_y$ does not · arrows: kinematic ·
   moving, one fall, scrubber · choice watch from (the shore, the ship), `v_ship` (0 to
   12 m/s, default 6.0); the mast height slider is dropped and a 12.0 m mast assumed ·
   headline "Seen from shore, the binoculars move 9.4 m forward with the ship as they
   fall, and land at the base of the mast." · no graph · 2D.
   works: parts: the ship (hull, mast, two sails), the binoculars at the mast top, an
   observer on the ship and one on the shore in the foreground · flow: the binoculars
   fall beside the mast; from shore the ship moves right · must hold: (1) the binoculars
   stay beside the mast in both views and land at its base; (2) the path is a parabola
   from shore and a straight line from the ship; (3) switching observer changes v_x only;
   (4) the shore and the water slide back only in the ship's view · read off the image:
   two ships (start and landing), a straight blue path down the first mast, a red curve
   to the base of the second, an arrow for the ship's motion, the observer on shore in
   the foreground. No numbers.
6. `sim-coin` · Figure 3.46 · classical-relativity, velocity-addition · value add: the
   flight relative to the Earth drawn to scale (the airliner covers 144 m while the coin
   falls 1.50 m inside it), over the enlarged cabin where the coin falls straight down
   and the velocity at the floor to one scale · arrows: kinematic · moving, one fall,
   scrubber · sliders `v_plane` (100 to 280 m/s, default 260), h (1.00 to 1.80 m, default
   1.50) · headline "While the coin falls 1.50 m to the floor, the plane carries it 144 m
   over the ground." · no graph · 2D. Readout: $v$ and $\theta$, one line each.
   works: read off the image: (a) a cabin inset, a passenger, the coin's straight path
   down; (b) the airliner with an almost horizontal arrow, an observer on the ground ·
   must hold: (1) the coin stays inside the airliner in the Earth view and under the hand
   in the cabin; (2) 0.553 s, 144 m, 260.06 m/s and −1.19° on load; (3) v_y is a stub
   beside v_x at one scale.
7. `fig-galaxies` · Sim (was a still copy of the unnumbered figure of problems 12 and
   13) · relative-velocity · value add: the still copy showed nothing the image does not.
   Now a choice of the galaxy to observe from: the galaxies stay put, each velocity
   becomes the velocity relative to the observer (the section's subtraction), and a graph
   of velocity against position shows every observer finding the others on one line
   through themself · arrows: symbolic · still · choice seen from (five galaxies,
   default the Milky Way, the book's view) · headline "Seen from the Milky Way, every
   other galaxy moves away, and the farther it is, the faster it goes." · graph below ·
   2D. Readout: the farthest galaxy's velocity relative to the observer, one line. The
   slope of the line is not printed, since problem 13 asks for it.
   works: read off the image: Galaxy 1 300 Mly, −4500 km/s; Galaxy 2 150 Mly, −2200
   km/s; Galaxy 3 MW; Galaxy 4 190 Mly, 2830 km/s; Galaxy 5 450 Mly, 6700 km/s · must
   hold: (1) the book's numbers on load; (2) galaxies spaced to scale; (3) every relative
   velocity is v_i − v_observer; (4) the points lie near the dashed line for every
   observer and the observer sits at the origin.

Photographs: none in the section. Figure 3.42 is kept as the book's image (above).

Figures that serve exercises: the five galaxies (above), which problem
13 takes its data from; the book's image is also attached to the problem
card, since the Exercises document is read apart from the text. The
hockey player's diagram serves problem 16, which has no keyed answer and
is left out, so it is not built.

Extra simulations (rule 15): thought about and judged:
- A heading on the boat, so the reader can point it upstream and find
  the heading that lands it straight across, which is what the take-home
  experiment asks and what problem 8 (unkeyed) asks of a ship. Built, as
  the third slider of `sim-boat` rather than a figure of its own; at
  its default of 90° the sim is the book's.
- The expanding line of galaxies seen from each galaxy in turn, so the
  reader sees that every observer finds themself at the centre. Left:
  problem 12, which asks exactly this, is unkeyed and left out, and the
  faithful figure with the book's numbers is what the kept problem needs.
- The hockey player of one-dimensional addition. Left: two numbers add
  and there is nothing to see that the sentence does not say.

Figure pass (2026-09-14, Claude Fable 5.1): `sim-boat` is at a fixed 14 units to the metre with the river width narrowed to 10 to 30 m (25 m stays the default); a landing beyond the panel is pinned at its edge and named; the boat is a rowing boat with oars and its labels go through `labeller()`, while its velocity triangle still fits its box because the ratio of the two speeds, not their size, is what it shows. `sim-plane` draws its triangle at a fixed 4.2 units per m/s; `sim-components` at 110 units per m/s with $v$ narrowed to 0.2 to 3 m/s; `sim-wind` at 6 units per m/s with the plane small at the origin instead of a ghost under the axes. `sim-binoculars` is at 13 units to the metre and its observers are the drawing layer's `person()`. `sim-coin` draws an airliner cabin (curved wall, bins, windows) with a passenger of the drawing layer holding the coin at the drop height, at 150 units to the metre with $h$ narrowed to 0.5 to 2.0 m, and its graph fixed at 0 to 200 m and 0 to −2 m. The galaxies' longest arrow no longer runs off the canvas. Every headline wraps through `topline()`.

## Exercises

- No Check Your Understanding boxes and no AP items in the section, and
  none belonging to it elsewhere in the chapter (3.2's problems on the
  components of $v_{\text{tot}}$ test resolving a vector and stay in
  3.2).
- 5 conceptual questions, all with AI-written suggested approaches:
  `cq1` (frames of reference when driving and flying) and `cq2` (the
  dribbling basketball player) inline after `relativity`; `cq3` (the
  softball thrown backward from a pickup), `cq4` (the jogger's hat) and
  `cq5` (the clod of dirt from a truck) at the end.
- 8 problems keyed and kept, all at the end: `p1` (Bryan Allen's
  crossing, three parts), `p3` (the two marathon runners; parts (a) and
  (c) as numbers, (b) in the solution), `p5` (the quarterback moving
  backward; speed and angle), `p7` (the jet from Darwin; speed and angle,
  the discussion in the solution), `p9` (the second airplane in the jet
  stream, two parts), `p11` (the sailboat's wind relative to the water;
  speed and angle), `p13` (the Hubble rate and the time back to the Big
  Bang, two parts, with the galaxies figure on the card), `p15` (the
  Gulf Stream; speed and angle).
- 11 problems left out, having no answer in the book's key: 2 (eip-342,
  the seagull), 4 (fs-id1543938, verify the coin's 144 m), 6
  (fs-id1545568, the ship from Rotterdam), 8 (fs-id1845552, the ship's
  heading for due north), 10 (fs-id2022863, the sandal from the mast),
  12 (fs-id2150516, the galaxies relative to galaxy 2 and 5), 14
  (fs-id2080170, the athlete crossing the river), 16 (fs-id1769191, the
  hockey player), 17 and 18 (fs-id1839158, fs-id1915156, Unreasonable
  Results), 19 (fs-id1913487, Construct Your Own Problem).
- 1 Critical Thinking item, `ct1` (exer-14790, two spring-loaded
  launchers at 40° and 50°), keyed with words and the book's graph of
  speed against height, which is kept as an image inside the open
  answer. It tests the maximum height of a projectile, which 3.4
  introduces, so under rule 12 it goes to that page: the section first
  kept it here because 3.4's plan left it, and the chapter pass moved it
  to 3.4 with `source_section: "3.5"`, where it is tagged to
  `maximum-height` and `projectile-vertical-motion`; both sections'
  `exercise_notes` say so.
- No generated questions: every node has a book exercise.
- Weights: `p5` turns on the projectile range (3.4) to get the ball's
  velocity relative to the ground before the quarterback's velocity is
  subtracted, so `range` is tagged at weight 2 and `velocity-addition`
  keeps the full value; `p13` is about relative velocity and the
  expansion, and `average-velocity` (the time back from distance over
  speed) is tagged at weight 1.

## Views

- Formulas: eq-vel-x, eq-vel-y, eq-vel-mag, eq-vel-direction (important),
  eq-wind-components (a step of Example 3.7, not important). All already
  in `chapter.json`.
- Definitions: the fifteen variable rows of the section; the five
  glossary terms.
- Concept map: the three nodes above, with their edges into 2.1, 2.3,
  2.2, 3.1, 3.3 and 3.4.

## Colour

The page binds velocity only: every sim carries a velocity on a slider
and draws velocity arrows, and the readouts write `\kv`, `\kvx`, `\kvy`,
`\kvtot`, `\kvboat`, `\kvriver`, `\kvp`, `\kvw` and their components.
Angles, the river's width, the mast height, the drop height and the
elapsed time in the headlines stay in ink. Example 3.8's fall equation
writes `\kg`, `\ky` and `\kyo` as the book's symbols, and they render in
ink on this page since it binds neither acceleration nor position.

## Wanted at chapter level

- Nothing at book level: the three concept rows, the fifteen variable
  rows, the five equation rows and the five glossary rows of the section
  were all there and are all used as written. The Critical Thinking item
  `exer-14790` tests 3.4's `maximum-height` and is kept here because
  3.4's plan leaves it here; if the later pass prefers rule 12 read
  strictly, move it to 3.4 with `source_section: "3.5"`.
- Anchors, `chapter.json` variables: `v → 3.5-velocity-addition`,
  `v_x → 3.5-velocity-addition`, `v_y → 3.5-velocity-addition`,
  `θ → 3.5-velocity-addition`, `v_tot → 3.5-ex-boat`,
  `v_boat → 3.5-ex-boat`, `v_river → 3.5-ex-boat`,
  `v_totx → 3.5-ex-plane`, `v_toty → 3.5-ex-plane`, `v_p → 3.5-ex-plane`,
  `v_px → 3.5-ex-plane`, `v_py → 3.5-ex-plane`, `v_w → 3.5-ex-plane`,
  `v_wx → 3.5-ex-plane`, `v_wy → 3.5-ex-plane`.
- Anchors, `chapter.json` equations: `eq-vel-x → 3.5-velocity-addition`,
  `eq-vel-y → 3.5-velocity-addition`, `eq-vel-mag → 3.5-velocity-addition`,
  `eq-vel-direction → 3.5-velocity-addition`,
  `eq-wind-components → 3.5-ex-plane`.

Decided in the chapter pass (2026-09-11): the twenty anchors above are
written into `chapter.json`. The Critical Thinking item is moved to 3.4,
as the exercises list now says. Example 3.6 refers to Figure 3.43, which
`sim-boat` folds under its own number 3.40, since the example adds no
quantity the section figure does not show. The fold pass (2026-09-11)
wrote 3.43 into the row's `folds`, so the eyebrow reads "Figure 3.40 +
3.43" and the example's reference now links to the sim. The lead of the
galaxies block
is a full sentence now, and the caption spells center as the book does.
