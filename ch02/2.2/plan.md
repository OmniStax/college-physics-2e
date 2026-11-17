# Plan: 2.2 Vectors, Scalars, and Coordinate Systems (m42124)

Source: `source.md` (converted from CNXML). Book page 61.
Status: built 2026-09-11 without a review stop, on Chen's instruction to
finish Chapters 2 and 3 in one job.

A thin section: one photograph, one sketch, no equations, no worked
example, one Check Your Understanding, one AP item without a key, four
conceptual questions and no problems. It stays a page of its own (rule
11), as the chapter config says. No PhET note.

## Sub-concepts (page headers)

The book has one untitled run of text and one titled header. Page
structure, one block per idea, span ids as the coverage rows name them:

1. `vectors` **Vectors have magnitude and direction** (book: the opening
   question about distance and displacement, the definition of a vector,
   the sign as the direction in one dimension, the arrow whose length is
   proportional to the magnitude). The jet photograph, Figure 2.6, sits
   at the head of this block as the book prints it.
2. `scalars` **Scalars have magnitude only** (book: the definition of a
   scalar, the list of scalars, the negative temperature as a point on a
   scale, scalars never drawn as arrows). The Check Your Understanding
   item asks whether speed is a scalar, so it goes inline at the end of
   this block rather than after the coordinate passage where the book
   prints it (rule 12).
3. `coordinates` **Coordinate systems for one-dimensional motion** (book's
   own header: the coordinate line within the reference frame, right and
   up as the usual positive directions, the jet and the falling object as
   cases where the other choice is more convenient, the rule that a
   choice once made is kept). Figure 2.7 is replaced here.

Learning objectives, section summary and glossary come out of the running
text into the views. The AP item and the four conceptual questions go to
the Exercises document.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| vector | idea | vectors | glossary; CYU; CQ 1 to 4 |
| scalar | idea | scalars | glossary; CYU; CQ 1, 2 and 4 |
| coordinate-system | skill | coordinates | second learning objective; the AP item on the dropped feather |

`vectors` uses `displacement` and `distance` (2.1), which the opening
sentences contrast; `scalars` uses `distance`; `coordinates` uses
`reference-frame` (2.1) and `vector`. Conceptual question 3 asks whether
acceleration is a vector and so tags `acceleration` (2.4) as well.

## Figures

id · replaces · concepts · what moves · sliders · headline · graph · 3D

1. `sim-vector-scalar` · Sim · vector, scalar · value add: the same
   minus sign seen on a vector and on a scalar, and a scalar (speed) that
   the vector's direction never touches · arrows: symbolic (the velocity
   vector) · still: it answers its sliders · $\kv$ in km/h (−120 to 120,
   step 5, default 90, velocity, east positive); temperature in °C (−40 to
   40, step 1, default −20, temperature). Opens on the book's own numbers,
   a velocity of 90 km/h east and a −20 °C temperature · headline "A
   velocity of +90 km/h is an arrow pointing east; a temperature of −20 °C
   is a level below zero, with no direction." · none · 2D. Readout, one
   formula: speed = |v| = |+90 km/h| = 90 km/h. Draws velocity,
   temperature.
   works: parts (the jet on a strip with west and east named; its velocity
   arrow from the nose, 3.2 units per km/h, with a bracket under it giving
   its length; a speed dial 0 to 120 km/h under the jet whose needle reads
   |v|; a thermometer with bulb, liquid column and a scale −40 to 40 °C,
   the zero mark dashed across the tube) · flow (nothing moves by itself)
   · must hold (arrow length proportional to |v| and on the strip at ±120;
   arrow turns with the sign while the dial does not change; no arrow at
   0; the temperature is never an arrow; the liquid top sits at the
   reading, below the zero mark when negative; labels clear at every
   setting) · read off the image (no book image; the text's numbers: 90
   km/h east, 20 °C and −20 °C, a 90 km/h speed limit).
2. `sim-axes` · replaces Figure 2.7 (the axes with +x right, −x left, +y
   up, −y down) · coordinate-system, vector · value add: the book's axes
   only name the usual choice; here one motion is read under the usual
   choice and under the opposite one at once, for the two cases the text
   names (the jet flying left, a falling object), and the zero can be
   moved · arrows: symbolic (the displacement) · still: a choice of sign
   and of zero has no time in it · motion (choice: jet flying left, ball
   falling); distance (0.5 to 8.0, step 0.5, default 5.0, km or m, ink);
   zero, where the zero sits measured from the start along the motion (−1
   to 9, step 0.5, default 0 = at the start, ink) · headline "Flying 5.0
   km to the left is Δx = −5.0 km with right positive and +5.0 km with
   left positive." · none · 2D. Readout: the two substitutions of Δx = x −
   x₀ (Δy = y − y₀ for the ball), one line each. Draws position.
   works: parts (jet: a strip with the jet, a coordinate line above with
   right positive and one below with left positive, each with its
   arrowhead at the positive end and the book's +x and −x at its ends,
   ticks in its own coordinate, the start hollow, the position filled, the
   displacement arrow between, and x₀, x and Δx written with their signs;
   a dashed line joins the two zeros. ball: the ball and its start above a
   ground line, a vertical line with up positive and one with down
   positive, ends +y and −y, the same marks) · flow (none) · must hold
   (the two lines share the zero; the displacement arrow points the way
   the thing moved on both lines whatever its sign; the two Δ are equal
   and opposite; moving the zero changes x₀ and x and not Δ; ticks fall on
   whole numbers of each line's coordinate at every zero; labels clear at
   distance 0.5 and 8 and zero −1 and 9) · read off the image (a cross of
   two axes, arrowheads on the right and upper ends only, labelled +x
   right, −x left, +y up, −y down; no numbers).

Photographs, one:

- Figure 2.6, the Eclipse Concept jet (credit: Armchair Aviator, Flickr):
  **keep** as `fig-jet`. The text says "as with the jet in Figure 2.6",
  and the caption is the book's own statement of the choice of positive
  direction. Copied to `media/ch02/Figure_02_02_00.jpg`.

Sketch, one:

- Figure 2.7, the axes with +x to the right and +y up: **replaced** by
  `sim-axes`, which keeps the number 2.7, the book's image
  (`media/ch02/Figure_02_02_00b.jpg`) as its original and the book's
  caption. The jet shows the book's ±x and the falling ball its ±y.

Figures that serve exercises: none.

Extra simulations (rule 15): one considered, a vertical version of the
coordinate sim with the feather of the AP item falling from a hand to
the floor under the four coordinate systems the item offers. Left: the
horizontal sim already shows what the choice of origin and of positive
direction does to a position and a displacement, and the feather's
velocity and acceleration are ideas of 2.3 and 2.4. None built.

Figure pass, 2026-09-14 (Claude Fable 5.1). Both figures stood up to their screenshots at every slider extreme in both themes; the only change is the degree sign, which the thermometer wrote with the ordinal mark and now writes as °C.

Figure re-examination, 2026-11-16 (Claude Fable 5.2). Both rebuilt.
`sim-vector-scalar` was a small drawing under sentences of canvas text
with a readout joining two statements; it now fills its stage, opens on
the book's 90 km/h east and −20 °C, and adds the speed dial, the scalar
that stays put when the arrow turns. `sim-axes` had the book's cross
bolted under the lines with two sentences of text and an origin slider in
kilometres from the strip's edge; the cross is gone, the line ends carry
its +x, −x, +y, −y, the falling object of the text is a second motion,
and the zero is set from the start of the motion.

## Exercises

- 1 Check Your Understanding, open, inline after `scalars`, with the
  book's answer: `cyu1` (is speed a scalar, citing `scalars`).
- 1 AP test prep item, `ap1` (how to set up the coordinate system for a
  dropped feather). The book prints four options and the CNXML carries no
  solution, so the item is kept as an open answer whose suggested approach
  is AI-written and marked, with the options set out in the prompt as the
  book prints them; a graded choice would grade an AI guess, which rule
  13 does not allow, and 2.5's marble item set the precedent. It names
  the feather's velocity and acceleration, which are ideas of 2.3 and
  2.4, but the choice it asks for is the coordinate system, which this
  section teaches, so it stays here.
- 4 conceptual questions, open, with AI-written suggested approaches:
  `cq1` (a speed of −10 m/s), `cq2` (the speed of that bird, which the
  book asks by a link to the previous question), `cq3` (is acceleration a
  vector), `cq4` (a temperature of −5 ºC).
- No problems in the book for this section; nothing left out.
- Nothing held from or for another section. The AP items of 2.1, 2.3 and
  2.4 test their own sections' ideas.
- No generated questions: every node has a book exercise.
- Weights: `cq3` is about vectors and merely names acceleration, so
  `acceleration` gets weight 1 there; `cq4` is about scalars and only
  touches vectors, so `vector` gets weight 1 there.

## Views

- Formulas: nothing; the section states no equation.
- Definitions: no variables; the two glossary terms, scalar and vector.
- Concept map: the three nodes above, resting on `displacement`,
  `distance`, `reference-frame` and `vector`; `acceleration` (2.4) tagged
  on conceptual question 3 only.

## Colour

The page binds velocity, from the arrow, the dial and the slider of the
vector sim, temperature, from its thermometer, and position, from the
coordinate sim's positions and displacement. The distance moved and the
place of the zero are untyped and in ink. No new hue, no new macro.

## Wanted at chapter level

- Nothing: the section has no variable or equation rows, so there are no
  anchors to write, and the concept, glossary and symbol rows it needs
  are all there. The chapter pass changed nothing at chapter level for
  this section and rewrote the AP item as the line above says.
