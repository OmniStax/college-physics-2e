# Plan: 4.1 Development of Force Concept (m42069)

Source: `source.md`, converted from the CNXML. Status: built today,
2026-09-11, without a review stop, on Chen's instruction to finish the book
in one job.

The shortest section of the chapter and the one everything after it rests
on: three paragraphs that define force, define the external forces a
free-body diagram draws, and take the restoring force of a stretched spring
as a standard. Two sketch figures (the book's 4.3 and 4.4), no photograph,
no equation, no worked example, no table, one boxed Take-Home Experiment,
four AP items and two conceptual questions. One page (rule 11).

## Sub-concepts (page headers)

The book prints no sub-headers here, only the run of the argument:
what force is, what a free-body diagram shows, and how a force is
measured. Three blocks, one per idea:

1. `force` **Force: a push or a pull that adds like a vector** (book: the
   definition of dynamics, the intuitive definition of force, the cannon
   and the flea, the two skaters pushing on a third, the head-to-tail
   method, the pointer back to Two-Dimensional Kinematics; Figure 4.3,
   which the book places at the end of this paragraph). The variables
   $\kF$, $\kFone$, $\kFtwo$ and $\kFtot$ anchor here.
2. `free-body` **External forces and the free-body diagram** (book: Figure
   4.3(b) as the first free-body diagram of the text, the body as a single
   isolated point, external forces against internal ones, why only
   external forces are shown).
3. `standard` **A standard unit of force** (book: a quantitative
   definition built on a standard force, the spring stretched a fixed
   distance, the restoring force, the magnitude of any other force as a
   multiple of the standard, the magnetic force as an alternative, Figure
   4.4, and the boxed Take-Home Experiment on force standards). The
   variables $\kFres$, $\kx$ and $\kdx$ anchor here.

The cross references stay plain text: "Two-Dimensional Kinematics" and
"Magnetism", as the chapter's config settled. `[ref:import-auto-id2379809]`
becomes "Figure 4.3" and `[ref:import-auto-id2608835]` becomes "Figure
4.4", which the build links to the two figures. The four `{term:…}` markers
become `<strong>`, the Take-Home Experiment becomes a `div.note`.

Learning objectives, the section summary and the four glossary terms come
out of the running text into the views. The hawk AP item is a short
Understand check and is set inline after `free-body`; everything else goes
to the Exercises document.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| dynamics | idea | force | the opening sentence; the section summary |
| force | idea | force | the definition as a push or a pull; Figure 4.3(a); CQ 2 |
| external-force | idea | free-body | the definition; AP items 1 and 3; the hawk item |
| free-body-diagram | skill | free-body | Figure 4.3(b) and the paragraph that reads it |
| force-standard | idea | standard | the stretched spring; Figure 4.4; CQ 1 |

The section leans on `vector` and `head-to-tail-method` (3.2) and on
`units` (1.2), which the coverage rows mark as used where the text uses
them.

Two nodes have no exercise of their own in the book. `dynamics` is named
and defined and nothing is set on it; `free-body-diagram` would have been
tested by the racetrack AP item, which goes to 4.3 with the net external
force. No question is generated for either (rule 13 and the chapter's
config).

## Figures

id · replaces · concepts · what moves · sliders · headline · graph · 3D

Both book figures are sketches and both are replaced. The section prints no
photograph, so there is nothing to keep or drop. No figure of this section
serves an exercise: the three racetrack drawings of the first AP item go to
4.3 with the item, and the 4.1 copies of them are not made here.

Figure 4.3's image carries no `width` in the CNXML, so its `widths` stays
empty and the app shows it at its natural size; Figure 4.4's carries
`width="400"`. The bundle file of Figure 4.3 is named with a space,
`Figure 04_01_01a-e066.jpg`; it is copied to `media/ch04/` with an
underscore, as Chapter 2 did.

`dynamics` gets no figure of its own. It is the name of the question the
chapter asks rather than a thing that can be drawn, and the two figures
above answer to force, which is what dynamics is the study of.

Extra simulations (rule 15), considered and left:

- A free-body diagram the reader builds: drag arrows onto a dot and the
  figure says whether the diagram is complete and what the total force is.
  It opens a real view that neither figure gives, but it serves 4.1, 4.6
  and every section between equally and belongs to none of them, so the
  chapter's `exploration.md` holds it for a chapter-level pass. Left.
- A sorter that takes a scene and asks which of its forces are external to
  a chosen body: the choice of the body is the system of interest, which is
  4.3's idea, and here it would run ahead of the text. Left.
- Three or more forces added head to tail: `sim-skaters` already shows the
  method, and a third arrow only makes the same drawing busier. Left.

None built.
## Exercises

- One inline item: the hawk AP item, `ap2` (fs-id1470278), keyed by the
  book, Understand, set after `free-body`, which is where the text says a
  body cannot exert a force on itself.
- 2 further AP items at the end, both unkeyed choice items, both kept as
  open items with their four options as the book prints them and an
  AI-marked suggested approach, as rule 13 and the 2.5 and 3.1 precedents
  do: `ap1` (fs-id1266227, a body exerting a force on itself) and `ap3`
  (fs-id1418886, what moves a rowed boat).
- 2 conceptual questions, `cq1` (fs-id1445672, propose a different force
  standard, Apply) and `cq2` (fs-id1654920, what makes forces vectors,
  Understand), both with AI-written suggested approaches.
- No problems: the section prints none.
- Left out: the first AP item, `fs-id1691415`, the two cars on the
  racetrack. It asks for the direction of the net force at points around a
  track, which is the net external force of 4.3, and it is keyed, so 4.3
  takes it with `source_section: "4.1"` and both sections' `exercise_notes`
  say so. Its three drawings go with it and are not copied here.
- Weights: `ap1`, `ap2` and `ap3` all turn on the external force and merely
  name force itself, so `force` takes weight 1 on each and `external-force`
  its full Bloom value. `cq1` turns on the standard and gives `force`
  weight 1.
- Nothing is generated.

## Views

- Formulas: none. The section states no equation, so its part of the
  formula sheet is empty and `chapter.json` writes no equation row for it.
- Definitions: the seven variables of the section and the four glossary
  terms.
- Concept map: the five nodes above, with edges into 1.2 and 3.2.

## Colour

The page binds force and position. Both figures carry forces on their
sliders, draw them as arrows and state them in their readouts, and the
spring figure carries the undistorted length $\kx$ and the stretch $\kdx$
in the position hue and brackets them on the drawing. The angle between the
two pushes, the count of standard units on the face of the scale and the
skaters themselves stay in ink.

## Wanted at chapter level

- variables `F` → 4.1-force
- variables `F_1` → 4.1-force
- variables `F_2` → 4.1-force
- variables `F_tot` → 4.1-force
- variables `F_restore` → 4.1-standard
- variables `x` → 4.1-standard
- variables `Δx` → 4.1-standard

### The chapter pass decided

The seven variable anchors are written. Nothing else was wanted and nothing
else was changed.

Revised in the Manim pass of 2026-09-28:
- `sim-skaters` · the angle carries a dashed circle at 90°, the right angle the book draws; landing on it morphs the readout by meaning, F_x bending into F₁ and F_y into F₂ under the root, and leaving it bends them back (manim-style 8, 11). Still, as before.
- `sim-spring` · the relaxed-length slider is gone (rule 24.6: it moved where the spring ends and nothing else); the relaxed length is the book's 0.20 m and the stretch Δx is the one slider. Still.

## Figure re-examination of 2026-11-16 (claude-fable-5-2)

Both figures were judged against the book's images and rebuilt.

1. `sim-skaters` · Figure 4.3 · force, external-force, free-body-diagram · value: the total force
   answers the angle between the pushes, from the two strengths added (same way) through the book's
   right angle to their difference (opposite ways) · arrows symbolic · still, no clock in the idea ·
   $\kFone$ and $\kFtwo$ (10 to 60 N, force), $\theta$ (0° to 180°, angle, dashed circles at 0°,
   90°, 180°) · headline "A push of 50 N and a push of 40 N, 90° apart, add to a total force of
   64.0 N at 38.7° from the first push" · no graph · 2D.
   works: parts: three panels at one scale (3.2 units per newton). Seen from above: the third
   skater, each pusher behind her on the line of its push with both hands on her, the push drawn
   beside its skater ending level with the hands. Head to tail: F₁, F₂ from its head, F_tot from
   the first tail to the last head, drawn heavier. Free-body diagram: the third skater as a dot,
   only F₁ and F₂ leaving it, θ between them; no resultant there (chapter COLOR.md) · flow: none ·
   must hold: every arrow of one force has the same length and direction in all three panels; the
   triangle closes; F_tot = 64.0 N at 38.7° on load, 90 N at 0°, 10 N at 180°; pushers never
   cover each other or an arrow; along one line the arrows are set side by side so each is seen;
   the free-body diagram shows two forces only · read off the image: F₁ points east from the
   skater on the left, F₂ north from the skater below, the triangle has F₁ then F₂ dashed and
   F_tot solid, part (b) is a dot with F₁ and F₂ only. The book prints no magnitudes; 50 N and
   40 N are ours and match the image's proportions.
   Before: the overhead panel and the free-body panel showed the same parallelogram, the caption's
   head-to-tail triangle was not drawn, and the drawing was small in its stage.
2. `sim-spring` · Figure 4.4 · force-standard, force · value: the reading of a spring scale is the
   stretch counted in standard stretches · arrows symbolic · still · $\kdx$ (0 to 9 cm, position,
   dashed circle at the 1 cm standard; the book's face runs 0 to 9) · headline "A stretch of 6.0 cm
   is 6.0 standard stretches of 1 cm, so the restoring force is 6.0 units" · no graph · 2D.
   works: parts: (a) support, relaxed spring, end plate, bracket x; (b) the same spring pulled by a
   hand, brackets x and Δx beneath as the book has them, F_restore from the pulled end toward the
   support; (c) a spring scale: ring, case, numbered face 0 to 9, spring in its slot, pointer on
   the spring's end, rod and hook, F_restore along the rod, bracket Δx under the face · flow: none
   · must hold: one scale (40 units per cm) in all rows; the zero of the face stands under the
   relaxed end and the pointer under the pulled end, joined by dashed lines; the Δx brackets of
   (b) and (c) are equal; the F_restore arrows of (b) and (c) are equal and grow with the stretch;
   the scale reads 6 on load; at 0 no arrow and no Δx · read off the image: x about 1.8 times the
   6-unit stretch (so x is 11 cm here, shown as x with no number, as the book gives none), face 0
   to 9, pointer at 6, Δx bracket from 0 to the pointer, F_restore pointing left in (b) and (c).
   Before: the scale had no Δx bracket and no force arrow, a relaxed length of 0.20 m the book
   does not give, and nothing tied the pointer to the spring's stretch.
