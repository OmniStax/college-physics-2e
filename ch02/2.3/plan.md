# Plan: 2.3 Time, Velocity, and Speed (m42096)

Source: `source.md` (converted from CNXML). Book pages 62 to 66.
Status: built 2026-09-11 without a review stop, on Chen's instruction to
finish Chapters 2 and 3 in one job.

A definitions section: three titled runs of text (Time, Velocity, Speed),
one boxed definition, one splash photograph, three sketch figures, no
worked example, one Check Your Understanding box, one AP item, five
conceptual questions and eleven problems, six of them keyed. No PhET note.
It stays one page (rule 11).

## Sub-concepts (page headers)

The book's opening paragraph stays above the first header, as 2.5 keeps
its own. Page structure, one block per idea, span ids as the chapter's
anchors expect them:

1. `time` **Time is measured by change** (book: the first two paragraphs
   of Time, the definition of time as change, the second as the standard,
   the pendulum that swings every 0.75 s)
2. `elapsed-time` **Elapsed time and the stopwatch convention** (book: the
   rest of Time, the lecture from 11:00 to 11:50, $\Delta t = t_f - t_0$,
   the stopwatch that reads zero at the start, the two bullets the text
   adopts for the rest of the book). The chapter's variables $t_0$,
   $t_f$, $\Delta t$ and $t$ and the equation `eq-dt` anchor here.
3. `average-velocity` **Average velocity** (book: the first paragraph of
   Velocity, the boxed definition kept as a `div.note`, the paragraph on
   velocity being a vector with the airplane passenger's −0.8 m/s). The
   variable $\bar v$ and the equations `eq-vbar-def` and `eq-vbar-t`
   anchor here.
4. `instantaneous-velocity` **Instantaneous velocity** (book: average
   velocity tells nothing about what happens in between, Figure 2.9, the
   smaller intervals carried to an infinitesimal one, the speedometer, the
   limit beyond the scope of the text). The variable $v$ anchors here.
5. `speed` **Speed has no direction** (book: the first paragraph of Speed,
   speed as a scalar, instantaneous speed as the magnitude of instantaneous
   velocity, the passenger at −3.0 m/s and the shopper at 40 km/h due
   north, average speed as distance traveled over elapsed time). The
   equation `eq-avg-speed` anchors here.
6. `store-trip` **A round trip to the store** (book: the drive to the
   store and back, Figure 2.10, the graphs of position, velocity and speed
   against time, Figure 2.11 and its note on the simplified model, the
   Take-Home Investigation on getting a sense of speed). The Check Your
   Understanding box, the commuter train from Baltimore to Washington and
   back, goes inline at the end of this block, since it is the round trip
   again with numbers.

The cross reference to Physical Quantities and Units in the first
paragraph of Time stays plain text. The reference to Figure 2.11 keeps
the book's wording so the build links it.

Learning objectives, section summary and glossary come out of the running
text into the views. The AP item, the conceptual questions and the
problems go to the Exercises document.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| time | idea | time | glossary; CQ 1 |
| elapsed-time | idea, eq-dt | elapsed-time | glossary; the lecture; the stopwatch convention; problem 9 |
| average-velocity | idea, eq-vbar-def | average-velocity | glossary; the boxed definition; CYU (a); AP; CQ 2 and 4; problems 1(b), 7(b), 11(b) |
| instantaneous-velocity | idea | instantaneous-velocity | glossary; Figure 2.9; CQ 3 and 5 |
| instantaneous-speed | idea | speed | glossary; CQ 3 and 5 |
| average-speed | idea, eq-avg-speed | speed | glossary; the store trip; CYU (b); CQ 2 and 4; problems 1(a), 3, 5, 7(a), 9, 11(a) |

The glossary prints `model` again; that is 1.1's node, reinforced in
`store-trip` where the text calls the trip a simplified model, not
introduced. `store-trip` also uses 2.1's `displacement` and
`distance-traveled`, since the odometer and the round trip are the
contrast the passage draws.

## Figures

id · replaces · concepts · what moves · sliders · headline · graph · 3D

The five drawn figures are planned in the block dated 2026-11-17 at the
end of this file.

Photographs, one:

- Figure 2.8, the racing snails (credit: tobitasflickr, Flickr): **drop**.
  It is the splash image at the head of the section and nothing in the
  text refers to it. Not copied.

Figures that serve exercises: none. Problem 1 leans on the Earth to Sun
distance of Table 1.3, which its hint names.

Extra simulations (rule 15), thought about and judged:

- A dashboard with a speedometer and an odometer for a trip that stops at
  the store: not built. The odometer is already in `sim-store` and the
  speedometer's reading is the speed graph of `sim-trip-graphs`; a
  dashboard would animate what those two already show.
- A chord shrinking to a tangent at one chosen instant: not built as a
  figure of its own, because `sim-segments` already does it for every
  interval of the trip at once, which is closer to the book's argument.

None built.

## Exercises

- 1 Check Your Understanding, `cyu1` (the commuter train, Baltimore to
  Washington and back), two numeric parts, (a) 0 m/s and (b) 20 m/s,
  inline after `store-trip`, citing `store-trip`, with the book's
  solution.
- 1 AP test prep item, `ap1` (two carts on a track), open, with the
  book's own solution, which the source carries, so it is marked as the
  book's.
- 5 conceptual questions, open, with AI-written suggested approaches:
  `cq1` (a device that measures time), `cq2` (average speed against the
  magnitude of average velocity), `cq3` (odometer and speedometer), `cq4`
  (odometer reading over trip time), `cq5` (instantaneous velocity and
  instantaneous speed).
- 6 problems keyed and kept: `p1` (Earth's average speed and velocity,
  two parts), `p3` (the continents drifting 500 km apart; the key is
  rounded to one figure, $2 \times 10^{7}$ years, so it is kept as an open
  answer to compare with, since the quotient itself, $1.7 \times 10^{7}$
  years, would fail a 2% check), `p5` (the Zephyr's average speed, in
  km/h and m/s), `p7` (the student's drive, four keyed values), `p9` (the
  Earth to Moon distance from the echo time), `p11` (the electron's
  revolutions per second and its average velocity).
- 5 problems left out, having no answer in the book's key: 2
  (fs-id3514248, the helicopter blade), 4 (fs-id2572316, the San Andreas
  fault), 6 (fs-id951583, the Moon's orbit), 8 (fs-id1644060, the nerve
  impulse), 10 (fs-id2577314, the quarterback).
- Nothing taken from another section: 2.2's Check Your Understanding on
  speed as a scalar and its conceptual question on the diving bird test
  2.2's own `scalar` node and stay there. Nothing held for a later
  section.
- No generated questions: every node has a book exercise.
- Weights (rule 20): `cyu1` and `p5` merely carry a unit conversion, so
  `unit-conversion` gets weight 1 there; `p7` and `p11` name the distance
  traveled and the displacement on the way to a speed and a velocity, so
  `distance-traveled` and `displacement` get weight 1 there; `p9` uses
  the elapsed time of the echo, so `elapsed-time` gets weight 1.

## Views

- Formulas: eq-dt (important), eq-vbar-def (important), eq-vbar-t (not
  important, the stopwatch form), eq-avg-speed (important). All already
  in `chapter.json`.
- Definitions: variables $t_0$, $t_f$, $\Delta t$, $t$, $\bar v$, $v$;
  the seven glossary terms, `model` among them.
- Concept map: the six nodes above; `model`, `displacement` and
  `distance-traveled` reinforced or used in `store-trip`;
  `unit-conversion` tagged on the exercises that convert.

## Colour

The page binds time, position and velocity, from the five sims: the
clock readings and the times are in the time hue, the passenger and the
car are placed by position, and the arrows and the graphs of velocity are
drawn in the velocity hue. No new hue, no new macro.

## Wanted at chapter level

- `t0` → `2.3-elapsed-time`
- `tf` → `2.3-elapsed-time`
- `Δt` → `2.3-elapsed-time`
- `t` → `2.3-elapsed-time`
- `v̄` → `2.3-average-velocity`
- `v` → `2.3-instantaneous-velocity`
- `eq-dt` → `2.3-elapsed-time`
- `eq-vbar-def` → `2.3-average-velocity`
- `eq-vbar-t` → `2.3-average-velocity`
- `eq-avg-speed` → `2.3-speed`

The chapter pass wrote every anchor above into `chapter.json`, each one
checked against the ids of this section's `text.html`.

## Figure re-examination, 2026-11-17 (Claude Fable 5.2)

All five drawings were judged against the book's images and rebuilt. They were small on their stages, opened off the book's numbers (elapsed time), disagreed with the image (Figure 2.9's segments), put the store on the road (2.10), and gave 2.10 and 2.11 the same three sliders.

1. `sim-elapsed-time` · Sim · time, elapsed-time · value add: variation, the stopwatch convention seen as a shifted zero · arrows: none · still, it only answers its sliders · $\kto$ (10:30 to 11:20, default 11:00, time) and $\ktf$ (11:30 to 12:30, default 11:50, time), shown as clock readings · headline "A lecture from 11:00 to 11:50 lasts 50 min, and a stopwatch started with it ends on 50 min." · no graph · 2D. The pendulum is gone (it measured nothing in the lecture), and with it the referent `pendulum`.
   works: read off the text (no image): lecture 11:00 A.M. to 11:50 A.M., Δt = 50 min, stopwatch reads zero at the start and 50 min at the end · must hold: the stopwatch's zero stands under t₀ at every setting; the bracket spans the same two instants on both scales; both readout lines give the same Δt.
2. `sim-average-velocity` · Sim · average-velocity, displacement · value add: variation and motion, the walk played at 1.5 times real pace so less time is seen as a faster walk · arrows: kinematic (the passenger walks) · moving · $\kxo$, $\kxf$ (0 to 10 m, position), $\kt$ (2.5 to 10 s, time), opening on the book's −4 m in 5 s · headline "He moves −4.0 m in 5.0 s, an average velocity of −0.80 m/s, toward the rear of the plane." · graph below, 0 to 10 s by 0 to 10 m, with the run t and the rise Δx as dashed legs · 2D. No stopwatch and no note.
   works: must hold: v̄ arrow 50 units per m/s, never clamped; sign of v̄ is the sign of Δx; slope label equals the readout; the moving point rides the line.
3. `sim-segments` · Figure 2.9 · instantaneous-velocity, average-velocity · value add: variation and motion; the book's stacked arrows become a record with time running down, on the aisle's own x scale, so each row is one interval's Δx and the passenger stands over his point · arrows: kinematic · moving, in real time · one slider, $\kdt$ over 0.10, 0.25, 0.50, 1.00, 1.25, 2.50, 5.00 s (default 1.25 s, the book's four segments) · headline "From 2.50 s to 3.75 s he moves +1.05 m, an average of +0.84 m/s. At 3.02 s, v = +1.21 m/s." · the record is the graph · 2D.
   works: parts: airplane, x axis with x₀ (right) and x_f (left), arrows Δx_a, Δx_b back, Δx_c forward, Δx_d back, Δx_tot underneath · read off the image against Δx_tot = −4.0 m: a −1.20 m, b −1.25 m, c +1.05 m, d −2.60 m (the old drawing had −1.4, −1.5, +1.3, −2.4); the image gives no times, so each segment takes 1.25 s · must hold: the four default rows carry those numbers and names; arrows join head to tail down the rows and end on x_f; the dot on the path is straight under the passenger; one 5.00 s interval is Δx_tot at −0.80 m/s.
4. `sim-store` · Figure 2.10 · average-speed, average-velocity, distance-traveled, displacement · value add: motion and variation; the path is laid out as it is driven, 3.0 km out and 3.0 km back, over the displacement arrow that shrinks to nothing · arrows: kinematic · moving, 7.5 min a second · $\kxf$ (0 to 3 km, position, special "home" at 0, the default) and $\kt$ (12 to 60 min by 3, default 30) · headline "6.0 km driven in 30 min and the car is home again: average speed 12.0 km/h, average velocity 0." · no graph · 2D. The road is the book's 3 km and fills the stage; the distance slider is gone.
   works: read off the image: Home, Store, 3 km between, Δx_tot = 0; caption: 30 min, 6 km, 12 km/h · must hold: distance traveled = out + back; Δx = 0 at home; v arrow 4 units per km/h; readout quotients exact.
5. `sim-trip-graphs` · Figure 2.11 · instantaneous-velocity, instantaneous-speed, average-speed · value add: motion and variation; the three graphs stacked on one time axis as the book stacks them, one cursor through all three, and the stop the book's text says its model leaves out · arrows: kinematic · moving, 0.1 h a second · speed out and speed back (10, 12, 15, 20 km/h, velocity), stop at the store (0 to 12 min by 3, time); opening 12, 0, 12 · headline "At 0.20 h the car is 2.4 km from home, driving out at +12 km/h." · the graphs are the figure · 2D.
   works: read off the image: position 0 → 3 km at 0.25 h → 0 at 0.5 h; velocity +12 then −12 km/h; speed 12 km/h throughout; time axis in hours · must hold: opening state reproduces those; turn, jump and speed marks share one t; speed = |v| everywhere; dashed average speed = 6 km over the whole time.
