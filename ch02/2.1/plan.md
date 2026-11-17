# Plan: 2.1 Displacement (m42033)

Source: `source.md` (converted from CNXML). Book pages 58 to 60.

## Sub-concepts (page headers)

The book has three headers: Position, Displacement, Distance. Proposed
page structure, one block per idea:

1. **Position needs a reference frame** (book: Position)
2. **Displacement is a change in position** (book: Displacement, first half)
3. **The sign carries the direction** (book: Displacement, professor and passenger calculations)
4. **Distance and distance traveled** (book: Distance + misconception alert)
5. Check Your Understanding (cyclist) stays inline as a Try it card.

Learning objectives, section summary and glossary come out of the running
text into the views. AP test prep, conceptual questions and the four
problems go to the Exercises document.

## Concept nodes (all ideas; no results, no skills)

| id | kind | name | prereqs | evidence |
|---|---|---|---|---|
| reference-frame | idea | Reference frame | – | definition of position; AP question distinguishes position from displacement |
| position | idea | Position | reference-frame | glossary; AP question |
| displacement | idea, eq-dx | Displacement, Δx = x_f − x_0 | position | CYU (a), problems 1–4 (c), AP |
| distance | idea | Distance (magnitude of displacement) | displacement | CYU (c), problems 1–4 (b), CQ 2 |
| distance-traveled | idea | Distance traveled (path length) | position | CYU (b), problems 1–4 (a), CQ 1–3 |

The equation Δx = x_f − x_0 is the definition of displacement, so it hangs
on the idea node (`eq` field) rather than getting a result node of its own.
"Choose which direction is positive" is stated here but only tested in
2.2, so it becomes a node there.

2.5's external prerequisite `displacement` will resolve to this node once
2.1 is built.

## Figures

id · replaces · concepts · what moves · sliders · headline · graph · 3D

0. `fig-professor` · Figure 2.3, the professor at her whiteboard, kept as the book's image (a photo row) · position, displacement · reverted 2026-11-17: the sim that folded 2.3 and 2.4 only subtracted two slider values, which the book's drawing already shows with its own numbers, so the image is back and the `professor` referent, drawn nowhere now, is gone.
1. `sim-displacement` · Figure 2.4 (the passenger) · reference-frame, displacement, position · value add: one walk read in two reference frames, which the book states ("we use the airplane, not the Earth, as the reference frame") and its still cannot show · arrows: kinematic, the two displacements growing as he walks · moving: the passenger walks from 6.0 m to 2.0 m on the airplane's axis while the airplane rolls forward along the ground; 5 s a loop · one slider, how far the airplane rolls forward during the walk, 0 to 8 m (position hue), detents at 0 (parked) and 4 m (as far as he walks), opening at 6 m · "The passenger walks 4.0 m toward the rear while the airplane rolls 6.0 m forward, so relative to Earth he ends 2.0 m ahead of where he started." · none · 2D. Rebuilt 2026-11-17 (Claude Fable 5.2).
   works: parts (a fuselage on two wheels standing on the ground line; the cabin cut open with windows and four seats facing the nose, nose to the right as in the book; the airplane's axis, 0 to 8 m, fixed under the cabin floor and carried with it; the ground's axis, 0 to 18 m, fixed; the passenger, a faint trace by his seat at 6.0 m; hollow dots for the start and filled dots for his place on both axes, one drop line joining them) · flow (he walks toward the tail, the airplane rolls toward its nose, both at steady rates over the same 5 s) · must hold (both axes and the bodies share one scale, 59 units to the metre; parked, the two axes coincide and both displacements read −4.0 m, the book's case; at 4 m the ground arrow vanishes and reads 0.0 m; the Earth displacement is always the airplane one plus the roll; each Δx is x_f − x_0 read on its own axis; arrow lengths to scale) · read off the image (x_0 = 6.0 m at his seat, x_f = 2.0 m at the back, Δx = x_f − x_0 = −4.0 m, arrow toward the rear, +x toward the nose on the right; the alt text reads "equals 4 point zero" without the sign, the image has −4.0 m).
2. `sim-path` · Figure 2.5 (the cyclist of Check Your Understanding) · distance-traveled, distance, displacement · value add: the distance traveled keeps growing after the turn while the displacement shrinks, which the still's two braces leave to be imagined · arrows: kinematic · moving: the cyclist rides x₀ → x_turn → x_f on the axis itself, the count of distance traveled riding above, the two legs stacking under the axis in the book's order (Δx₁ above its arrow, Δx₂ below), and under them the displacement drawn from the start to wherever the cyclist is · x₀, x_turn, x_f in the position hue on a fixed −5 to 5 km axis (defaults 0, −3, −1 km reproduce the Check Your Understanding) · "The cyclist travels 5.0 km, but the displacement is only −1.0 km, whose magnitude is 1.0 km."; a ride that never turns back says the two numbers agree, a ride that ends at its start says the displacement is zero · none · 2D; the rider is F.silhouette on the local bicycle sprite, hover name "the cyclist". Rebuilt 2026-11-17 (Claude Fable 5.2): the old layout left the rider small over a blank band, the legs unnamed, the odometer in a box off to the side and the displacement as a small bracket that did not move.
   works: parts (the axis as the road, west negative and east positive as the book's compass; hollow x₀ and filled x_f on it; leg rows joined at the turning point; the displacement arrow, heavier, on the bottom row between drop lines from x₀ and x_f) · flow (out along leg 1, back along leg 2, at one speed) · must hold (the count never falls; the displacement arrow always runs from x₀ to the cyclist; at the end Δx = Δx₁ + Δx₂ and the count is |Δx₁| + |Δx₂|; all arrows on the axis's scale) · read off the image (Δx₁ = −3 km drawn westward above, Δx₂ = +2 km below, x₀ at the right end, x_f 1 km west of it, W(−x) and E(+x)).
3. `fig-paths` · the paths the problems refer to, which the book numbers nowhere, so the eyebrow reads "Figure" without a number · distance-traveled, displacement · still: a figure that serves exercises is a faithful copy, so no sliders, no motion and no transport, and all four paths stand drawn at once, each from a hollow start marker to a filled end marker · none, since the problems need the book's numbers · no headline · none · 2D. Kept and repaired 2026-11-17: the book's image is 250 px wide with ticks at even metres only, so C's finish at 11 and D's turn at 3 have to be judged between ticks; the redraw now has a tick at every metre and a faint drop line from every start, turn and finish.
   works: read off the image (A 0 → 7; B 12 → 7; C 2 → 10 → 8 → 11; D 9 → 3 → 5; axis "position x (m)", 0 to 12).

Photograph of the cyclists (splash) dropped.

## Exercises

- 1 Check Your Understanding, three numeric parts (inline, after block 4).
- 1 AP test prep, multiple choice, tagged position, displacement, distance-traveled.
- 3 conceptual questions, open, with the book's expected points as the suggested approach.
- 4 problems × 3 parts, numeric, tagged distance-traveled, distance, displacement; path data from Fig 2.5: A 0→7, B 12→7, C 2→10→8→11, D 9→3→5. Book answers exist for A and C only, so problems 2 (path B) and 4 (path D) are left out (user decision 2026-09-06).
- No generated questions.

## Views

- Formulas: eq-dx.
- Definitions: symbols x, x₀, x_f, Δx; plus the five glossary terms as a Terms list (new for this section: the Definitions view gets terms as well as symbols).
- Concept map: five nodes above; external prerequisites: none.

## Converter note

`cnxml2md.py` dropped the FIGURE block for the professor figure
(import-auto-id2972079) and emitted its caption as a paragraph. Fix in the
converter before 2.2.
