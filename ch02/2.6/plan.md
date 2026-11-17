# Plan: 2.6 Problem-Solving Basics for One-Dimensional Kinematics (m42125)

Source: `source.md` (converted from CNXML). openstax page
`2-6-problem-solving-basics-for-one-dimensional-kinematics`.
Status: built 2026-09-11 without a review stop, on Chen's instruction to
finish Chapters 2 and 3 in one job.

A thin section (rule 11): one opening paragraph, a six-step strategy, a
passage on unreasonable results with three steps of its own and one
worked runner, one photograph, two equations, two conceptual questions.
No worked example, no Check Your Understanding, no problems, no AP items,
no glossary entry, no variable of its own. It stays a page of its own.

## Sub-concepts (page headers)

The book has an untitled opening paragraph and two titled runs of text,
each broken into numbered steps. Page structure, one block per idea, the
book's step headers kept as `<h3>` sub-headers with ids so a question can
cite one step:

1. `skills` **Analytical skills and problem solving** (book: the opening
   paragraph, "Problem-solving skills are obviously essential…", which
   says why the section exists and introduces no concept)
2. `steps` **The six problem-solving steps** (book: "Problem-Solving
   Steps", the lead sentence, Step 1 to Step 6 as `<h3 id="step-1">` to
   `step-6`, and the closing paragraph on doing the steps in a different
   order and getting practice)
3. `unreasonable` **Unreasonable results and their causes** (book:
   "Unreasonable Results", the runner who accelerates at 0.40 m/s² for
   100 s, the three checking steps as `<h3 id="check-1">` to `check-3`,
   and the two equations, which anchor here)

Learning objectives and the section summary come out of the running text
into the views. The two conceptual questions go to the Exercises document.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| problem-solving-steps | skill | steps | the six steps and the summary; CQ 1 and 2 |
| unreasonable-results | skill | unreasonable | the three checking steps and the runner; CQ 2; the Unreasonable Results problems of 3.4 and 3.5 |

Both are skills. Coverage beyond the two introductions: `steps` uses
`coordinate-system` (2.2, step 1 asks for a positive direction on the
sketch) and `choose-equation` (2.5, step 4 is the equation with one
unknown); `unreasonable` uses `problem-solving-steps`, `v-from-at`
(2.5, the runner's equation), `physical-solution` (2.5, discarding a
result that cannot describe nature) and `unit-conversion` (1.2, the chain
of factors from m/s to mph). These are the prerequisite edges the book
already draws for the two nodes, plus the conversion.

## Figures

id · replaces · concepts · what moves · sliders · headline · graph · 3D

1. `sim-runner` · Sim · unreasonable-results, v-from-at · value add: the
   book has no image for the runner; the reader sees "about four times
   what a person can run" as two arrow lengths, and finds by the time
   slider that the result is reasonable only up to 25 s · arrows:
   kinematic (the runner's velocity, and what a person can run, from one
   tail to one scale, 16 units per m/s) · moving: the velocity builds as
   the clock runs, one finite loop of the set time in about 5 real
   seconds, so it gets the scrubber · sliders: acceleration $\ka$ (0.10
   to 0.50 m/s², step 0.05, default 0.40), time $\kt$ (10 to 120 s, step
   5, default 100), the book's numbers on load · headline: "Gaining 0.40
   m/s each second, the runner would be at 40.0 m/s after 100 s, about
   four times what a person can run." · graph below: $v$ against $t$ on
   axes fixed at 0 to 120 s and 0 to 60 m/s (the slider maxima), the same
   ticks read in mph down the right side by the book's chain of factors,
   a dashed level at 10 m/s with the region above it shaded, a hollow
   mark where the line passes it, labelled "reasonable until t = 25 s" ·
   2D. Readout, two formulas on two lines: $\kv = \kvo + \ka\kt$ with
   the numbers, and the book's conversion to mph with the same velocity.
   The level of 10 m/s comes from the book's own sentence: 89 mph is
   "about four times greater than a person can run", and a fourth of 89
   mph is 22 mph, or 10 m/s.

   works: read off the image (there is none; from the text): a = 0.40
   m/s², t = 100 s, v = 40 m/s, 89 mph by (3.28 ft/m)(1 mi/5280 ft)(60
   s/min)(60 min/h), "about four times greater than a person can run",
   0.4 m/s gained each second · must hold: the velocity arrow is four
   times the reference arrow at the book's numbers; the line passes 10
   m/s at t = 10/a (25 s on load); the mph ticks are the m/s ticks times
   2.236 (22, 45, 67, 89, 112, 134); readout and headline agree with the
   graph at every setting; no label covers the line or another label.

   Second figure pass, 2026-11-16 (Claude Fable 5.2): rebuilt. The first
   build ran a small runner along a 7200 m strip that was mostly empty and
   taught nothing the passage asks (the distance is not in the book), its
   caption was six lines long, and the conversion to mph was only in the
   headline. The strip went; the arrows to scale, the mph axis and the
   conversion line came in; the acceleration slider now stops at 0.50
   m/s² so nothing runs off the velocity axis.

The six steps get no figure. A figure for a procedure would animate a
checklist the reader already has in front of them, which is what rule 15
tells the agent not to build; the skill is taught by the worked examples
of 2.5 and 2.7, which the concept's evidence names.

Photographs, one:

- Figure 2.36, a hand writing in a notebook beside a graphing calculator
  (credit: scui3asteveo, Flickr): **drop**. It is the splash image at
  the head of the section; nothing in the text refers to it and it shows
  nothing the passage is about. Not copied.

Figures that serve exercises: none.

Extra simulations (rule 15): one thought of and left. A "which equation"
picker, where the reader marks the knowns and unknowns of a problem and
the five constant-acceleration equations light up as usable or not, would
open a view the text does not give of step 4; but it is a quiz rather
than a simulation of anything physical, and the section's two conceptual
questions ask the same thing in words. Not built.

## Exercises

- 2 conceptual questions, both open with AI-written suggested
  approaches, both Understand: `cq1` (fs-id4087579, what information is
  needed to choose an equation; cites `step-4`; tagged
  problem-solving-steps in full and choose-equation with weight 1, since
  the question is about the list of knowns and unknowns rather than the
  choice itself), `cq2` (fs-id1986766, the last thing to do when solving
  a problem; cites `step-6`; tagged problem-solving-steps in full and
  unreasonable-results with weight 1, since it only touches the check).
- No Check Your Understanding, no problems, no AP items; nothing left
  out for want of a key.
- Nothing taken from another section. The Unreasonable Results problems
  of 3.4 and 3.5 test this section's second skill but turn on projectile
  range and relative velocity, so they stay with those sections, which
  can tag `unreasonable-results` from there.
- No generated questions: both nodes have a book exercise.

## Views

- Formulas: eq-unreasonable-v and eq-unreasonable-mph, both not
  important (they are the worked runner, not a result), already in
  `chapter.json`.
- Definitions: no glossary term and no variable of this section's own.
- Concept map: the two skills with their edges, already in `book.json`.

## Colour

The page binds time, velocity and acceleration, from the one sim, whose
sliders carry an acceleration and a time and whose graph and readout
state a velocity. Position is not bound: no distance is drawn. No new hue, no new macro.

## Wanted at chapter level

- `eq-unreasonable-v` → `2.6-unreasonable`
- `eq-unreasonable-mph` → `2.6-unreasonable`

The chapter pass wrote every anchor above into `chapter.json`, each one
checked against the ids of this section's `text.html`.
