# Plan: 2.4 Acceleration (m42100)

Source: `source.md` (converted from CNXML). Book pages 67 to 77.
Status: built 2026-09-11 without a review stop, on Chen's instruction to
finish Chapters 2 and 3 in one job.

The heaviest narrative of the chapter: the definition of average
acceleration, two boxed notes, a Misconception Alert, seven worked
examples (2.1 to 2.7, six of them on one subway train), twelve numbered
figures (2.12 to 2.23: three photographs, one drawing of four cars, one
pair of graphs, one drawing of the train's two trips, four strategy
sketches, one triple graph), one Check Your Understanding, a PhET note,
two AP items, five conceptual questions and four problems, two of them
keyed. One equation, `eq-abar`. It stays one page (rule 11).

## Sub-concepts (page headers)

The book has an untitled opening run, then the headers "Instantaneous
Acceleration" and "Sign and Direction"; the six subway examples sit
under the first of these. Page structure, one block per idea, span ids
as the chapter's anchors expect them:

1. `average-acceleration` **Average acceleration** (book: the opening
   paragraph, the boxed definition of average acceleration, the sentence
   on the unit m/s²). The chapter's variables ā, Δv, v₀, v_f and the
   equation `eq-abar` anchor here.
2. `vector` **Acceleration as a vector** (book: the paragraph on velocity
   being a vector and the car turning a corner; the boxed note
   Acceleration as a Vector).
3. `deceleration` **Deceleration** (book: the paragraph "Keep in mind that
   although acceleration is in the direction of the change in velocity";
   the photograph of the São Paulo subway train, Figure 2.13).
4. `negative-acceleration` **Deceleration and negative acceleration**
   (book: the Misconception Alert with the four cars of Figure 2.14).
5. `racehorse` **Calculating an average acceleration** (book: Example
   2.1, the racehorse leaving the gate, kept as `ex-racehorse`).
6. `instantaneous` **Instantaneous acceleration** (book's own header: the
   paragraph on choosing a representative average and the two graphs of
   Figure 2.17). The chapter's variable a anchors here.
7. `subway` **The subway train** (book: the paragraph introducing the
   train and Figure 2.18; Example 2.2, displacement, as
   `ex-subway-displacement`; Example 2.3, distance traveled, as
   `ex-subway-distance`).
8. `subway-acceleration` **The subway train speeding up and slowing
   down** (book: Example 2.4 as `ex-subway-speeding-up` with Figure 2.19;
   Example 2.5 as `ex-subway-slowing-down` with Figure 2.20; the sentence
   on the three graphs and Figure 2.21).
9. `subway-left` **The subway train moving to the left** (book: Example
   2.6, average velocity, as `ex-subway-velocity` with Figure 2.22;
   Example 2.7, deceleration, as `ex-subway-deceleration` with Figure
   2.23).
10. `sign-direction` **Sign and direction** (book's own header: the
    paragraph on the signs of the answers). The Check Your Understanding
    on the airplane landing while traveling east goes inline after it.

The book's cross references to Time, Velocity, and Speed, Displacement
and Physical Quantities and Units stay plain text, as the common brief
asks. The PhET note (Moving Man Simulation) is dropped per the chapter
config. Learning objectives, section summary and glossary come out of
the running text into the views; the AP items, conceptual questions and
problems go to the Exercises document.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| acceleration | idea | average-acceleration | glossary; the note Acceleration as a Vector; CQ 1, 2, 3 |
| average-acceleration | idea, eq-abar | average-acceleration | glossary; the boxed definition; Examples 2.1, 2.4, 2.5, 2.7; problems 1, 3; AP 1 |
| deceleration | idea | deceleration | glossary; Figure 2.13; Examples 2.5 and 2.7; CYU; CQ 4, 5; problem 3(b) |
| acceleration-sign | result | negative-acceleration | the Misconception Alert and Figure 2.14; Sign and Direction; Example 2.7; CYU; CQ 4, 5 |
| calculate-average-acceleration | skill | ex-racehorse | Example 2.1; Examples 2.4, 2.5, 2.7; problems 1, 3; AP 1 |
| instantaneous-acceleration | idea | instantaneous | glossary; Figure 2.17; CQ 3 |

`acceleration-sign` is introduced at the Misconception Alert, where the
book first separates negative acceleration from deceleration and draws
the four cars, and reinforced at Sign and Direction, where the rule
"same sign, speeding up; opposite sign, slowing down" is stated. The
subway examples use `displacement`, `distance-traveled` (2.1),
`average-velocity` (2.3), `coordinate-system` (2.2) and
`unit-conversion` (1.2).

## Figures

id · replaces · concepts · what moves · sliders · headline · graph · 3D

Five figures are drawn. Figures 1, 3, 5 and 9 are planned in the block
dated 2026-11-17 below; figure 2 is this line:

2. `sim-turning` · Sim (rule 15) · acceleration · a car seen from above
   drives a straight road, rounds a quarter circle at constant speed and
   drives on; the velocity arrow rides on the car, and beside the bend
   the velocity at the start of the turn and the velocity now are set
   tail to tail with their difference Δv drawn between the tips,
   pointing to the inside of the bend · speed (5 to 15 m/s, default 10,
   velocity hue), radius of the bend (20 to 60 m, default 40, position
   hue) · "On the bend the speed stays 10.0 m/s while the direction has
   turned 45°, so the velocity has changed by 7.7 m/s and the car is
   accelerating." · none, the scene is the idea · 2D. The acceleration
   arrow on the car is drawn along Δv with a length proportional to ā,
   which is what this section defines the average acceleration to be;
   the centripetal result that would give its size from the speed and
   the radius belongs to a later chapter and is not used. The velocity
   arrow is drawn to one scale everywhere. Moving: the direction changes
   as the car goes round, one run of straight, bend and straight per
   loop. Readout, one formula: ā = Δv/Δt over the time on the bend.
   Draws position, velocity, acceleration.

Figures 2.16, 2.18, 2.19, 2.20, 2.22 and 2.23 are the book's images,
listed at the end of the dated block.

Photographs, three:

- Figure 2.12, the airplane landing at St. Maarten (credit: Steve
  Conry, Flickr): **drop**. It is the splash image at the head of the
  section; nothing in the text refers to it. Not copied.
- Figure 2.13, the subway train in São Paulo decelerating into a
  station (credit: Yusuke Kawasaki, Flickr): **keep** as
  `fig-subway-photo`. It shows the thing the passage is about, a train
  whose acceleration is opposite to its motion, and the book draws the
  velocity and acceleration arrows on it.
- Figure 2.15, the racehorses (credit: Jon Sullivan, PD Photo.org):
  **drop**. It is a stock shot beside Example 2.1 with no caption
  beyond the credit. Not copied.

Figures that serve exercises: the velocity–time graph of the cart in
the first AP item is unnumbered in the book and is carried on the
exercise card itself (`figure` on `ap1`), copied as it is from the
bundle as `Figure_Ch2_M4_14.jpg`.

Extra simulations (rule 15). Thought about: a car turning a corner at
constant speed (the text's own example of an acceleration with no
change in speed, which none of the required figures can show since
they are all one-dimensional); a speedometer needle whose rate of
turning is the acceleration (only animates what the v–t graphs already
say); a v–t graph the reader draws freehand and whose average
acceleration over a chosen interval is read off (the same view as
figure 5). Built: the turning car, `sim-turning` (figure 2), since it
opens the one view the section's text gives and its figures do not, a
change in velocity that is entirely a change in direction. Left: the
other two.

Figure re-examination, 2026-11-17 (Claude Fable 5.2). The eleven drawn
figures were judged as a set. Six of them were one shape (a sprite on a
strip, a v–t or x–t line below, sliders for the two end values and the
time) and repeated `sim-average-acceleration`; the six subway figures
also repeated each other. What the section teaches is carried by five
figures now:

1. `sim-average-acceleration` · Sim, for the boxed definition ·
   average-acceleration, acceleration · value add: "meters per second per
   second" seen as the same piece added to the velocity arrow each second
   · arrows kinematic (v and ā on the car) · moving: the car drives 5.0 s,
   a tick is left on the road at each whole second, and under the road
   the velocity is drawn once per second on a fixed scale of −15 to
   25 m/s, each arrow starting from zero with the piece that second added
   drawn above it from where the arrow before ended · $\kvo$ (0 to
   10 m/s, default 5.0), $\kab$ (−3.0 to 3.0 m/s², default 2.5) ·
   headline "The velocity changes by +2.5 m/s every second: after 2.6 s
   it is 11.5 m/s." · no graph (the row of arrows is the record; the
   section's graphs come with Figure 2.21) · 2D. Readout: ā = Δv/Δt over
   the 5.0 s, on one line.
3. `sim-four-cars` · Figure 2.14 · acceleration-sign, deceleration ·
   value add: the cars set out two by two, rows by the way they move and
   columns by the way they accelerate, in the book's own lettering, with
   the x-axis turned round by a choice: the signs of v and a change and
   the cars that slow down do not · arrows kinematic · moving: 3.5 s from
   15 m/s at 3.0 m/s², so (b) and (c) are still moving at the end; the
   starting velocity stays as a dashed line under the live arrow · choice
   "positive direction" (right, left) · headline "With +x to the right,
   (b) and (d) have negative acceleration, but the cars slowing down are
   (b) and (c)." · none · 2D. No letters ride the arrows (26.7): a
   legend names them, the value line under each road wears the colours.
   Readout: ā = Δv/Δt for (b) and (c), the two that decelerate with
   opposite signs.
   works: read off the image · (a) car facing right, v right, a right;
   (b) facing right, v right, a left; (c) facing left, v left, a right;
   (d) facing left, v left, a left; axes x to the right. The image gives
   no numbers; 15 m/s and 3.0 m/s² are this figure's. must hold · the v
   arrows of (a) and (d) lengthen and those of (b) and (c) shorten; a arrows never change; signs flip together with the
   choice.
5. `sim-instantaneous` · Figure 2.17 · instantaneous-acceleration,
   average-acceleration · value add: the interval is the reader's, and
   the greatest distance of a from ā over it is marked and stated for
   both motions · arrows none · still: it answers its sliders · $t_1$,
   $t_2$ (0 to 5.0 s, detents at the book's 1.0 and 3.0 s, default 0 to
   3.0) · headline "From 0.0 s to 3.0 s the acceleration stays within
   0.35 m/s² of its average in (a), and within 3.33 m/s² in (b)." · the
   graphs are the figure, both on −5 to 5 m/s² as the book prints them on
   one scale · 2D.
   works: read off the image · (a) 0 to 5 s: starts 1.47, peaks 2.07 at
   0.63 s and 3.58 s, trough 1.47 at 1.97 s, ends about 1.33; average
   line at about 1.75. (b) 3.0 for 0 to 1.0 s, −2.0 to 3.0 s, 0 to 4.2 s,
   1.5 to 4.8 s, 5.0 to 5.5 s, −4.0 to 6.0 s. The earlier drawing had
   (a) as a cosine with its first peak at 1.45 s; the image wins.
9. `sim-subway-graphs` · Figure 2.21, and the one moving figure of the
   train (Examples 2.4 and 2.5) · average-acceleration, deceleration,
   instantaneous-acceleration · value add: the train, its two arrows and
   the three graphs on one clock, with the tangent to the position graph
   carrying the velocity as its slope and the slope of the velocity graph
   read as the acceleration · arrows kinematic · moving · $\kdt$ speeding
   up (10 to 25 s, default 20.0), $\kdt$ stopping (5 to 15 s, default
   8.00); 30.0 km/h and 20 s at constant velocity are fixed · headline by
   part of the journey · three graphs below on one time axis, fixed at
   0 to 60 s, 0 to 400 m, 0 to 10 m/s, −2 to 1 m/s² · 2D. Readout: the
   book's two conversions, +0.417 and −1.04 m/s², one line each.
   works: read off the image · x: 0 at 0 s, 83 m at 20 s, 167 m at 30 s,
   250 m at 40 s, 283 m at 48 s; v: 8.33 m/s from 20 to 40 s, zero at
   48 s; a: +0.417, 0, −1.04 m/s². must hold · x curves up, runs
   straight, flattens; v ramp, plateau, ramp; a three steps; the three
   markers share one time; the tangent's slope equals the v reading.

`sim-turning` (figure 2) is kept, with the triangle of velocities
larger, the velocity arrow on one scale and clear of the headline, and
the acceleration arrow's length proportional to ā; its plan line is
under "Figures" above.

Reverted to the book's image, each a kept photograph with its number:
Figure 2.16 (`sim-racehorse`: the same strip and line as figure 1 with a
horse on it; the book's sketch is the strategy step the example names),
Figure 2.18 (`sim-subway-displacement`: four sliders on a displacement,
which is 2.1's idea, and the examples read their numbers off the book's
drawing), Figures 2.19, 2.20 and 2.23 (the three train sketches: figure 9
shows the same speeding up and stopping on one clock, and car (c) of
Figure 2.14 is the train of Example 2.7), Figure 2.22
(`sim-subway-velocity`: average velocity is 2.3's idea). The ids are
kept so every link holds. The referent `horse` went with its figure.

## Exercises

- 1 Check Your Understanding, open, inline after `sign-direction`,
  with the book's answer: `cyu1` (the airplane landing while traveling
  east, citing `sign-direction`).
- 1 AP item kept, `ap1` (ranking the average accelerations of the cart
  over the four sections of its v–t graph), with the book's graph on
  the card and no key in the book, so an AI-written suggested approach
  marked as such; kept as an open answer rather than a graded choice.
- 1 AP item held for 2.8: the book pushed across a table with position
  and velocity graphs to draw for either sign convention
  (fs-id1860126). It tests `acceleration-sign` and
  `derive-motion-graphs`, and the latter is a 2.8 node, so 2.8 takes it
  with `source_section: "2.4"`.
- 5 conceptual questions, `cq1` to `cq5`, each with an AI-written
  suggested approach: speed constant while a ≠ 0; velocity constant
  while a ≠ 0; velocity zero while a ≠ 0; the direction and sign of the
  acceleration of a train moving left that stops; the sign of an
  acceleration that reduces a negative velocity and a positive one.
- 2 problems keyed and kept: `p1` (the cheetah, 4.29 m/s²), `p3` (the
  commuter backing out of her garage, 1.43 s and −2.50 m/s²).
- 2 problems left out, having no answer in the book's key: 2
  (fs-id4035192, Stapp's rocket sled), 4 (fs-id4124470, the ICBM).
- Taken from elsewhere: nothing. Conceptual question 3 of 2.2 asks
  whether acceleration is a vector or a scalar, but it states the
  definition in the question and tests the vector idea of 2.2, so it
  stays there.
- Weights: `p3` names deceleration in part (b) and turns on the
  calculation, so `deceleration` gets weight 1 there; `ap1` is a
  ranking read off a graph, so `calculate-average-acceleration` gets
  weight 2 beside `average-acceleration`.

## Views

- Formulas: `eq-abar` (important), already in `chapter.json`.
- Definitions: variables ā, a, Δv, v₀, v_f; the four glossary terms.
- Concept map: the six nodes above, with `displacement`,
  `distance-traveled`, `average-velocity`, `coordinate-system` and
  `unit-conversion` used by the examples.

## Colour

The page binds time, position, velocity and acceleration. The cars and
the train draw a velocity arrow and an acceleration arrow, the moving
figures carry a time, the two acceleration graphs of Figure 2.17 are in
the acceleration hue, and the radius of the bend and the train's place on
its track are positions.

## Wanted at chapter level

- variables `ā`, `Δv`, `v0`, `vf` (section 2.4) → anchor
  `2.4-average-acceleration`
- variable `a` (section 2.4) → anchor `2.4-instantaneous`
- equation `eq-abar` → anchor `2.4-average-acceleration`

The chapter pass wrote every anchor above into `chapter.json`, each one
checked against the ids of this section's `text.html`.
