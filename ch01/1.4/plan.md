# Plan: 1.4 Approximation (m42121)

Source: `source.md` (converted from CNXML). openstax page
`1-4-approximation`.
Status: built 2026-09-11 without a review stop, on Chen's instruction to
build the whole chapter in one pass.

A thin section (rule 11): one paragraph, two worked examples, one
photograph, one Check Your Understanding, eight problems of which four
are keyed with sample answers. It stays a page of its own.

## Sub-concepts (page headers)

The book has one paragraph and two examples. Page structure, one block
per idea:

1. **Making reasonable approximations** (`approximation`): the opening
   paragraph, "On many occasions, physicists…", which introduces the one
   concept of the section.
2. **Approximating from the height of a person** (`ex-building`):
   Example 1.3, the 39-story building, verbatim, then a new sim that
   stacks the stories up.
3. **Approximating a vast number** (`ex-trillion`): Example 1.4, a
   trillion dollars on a football field, verbatim, with the bank-stack
   photograph (Figure 1.25) at its head where the book puts it, then a
   new sim that lays the stacks down. The Check Your Understanding (the
   basketball court) goes inline at the end of this block.

The learning objective, the one-sentence summary and the glossary entry
come out of the running text into the views. The problems go to the
Exercises document.

## Concept nodes

| id | kind | section | role here |
|---|---|---|---|
| approximation | skill | 1.4 | introduced in block 1; used by both examples, the CYU and problems 1, 3, 5, 7 |
| unit-conversion | skill | 1.2 | used by both examples (metres per person, yards to inches, inches to feet) |
| order-of-magnitude | idea | 1.2 | used by Example 1.4 (powers of ten throughout) and by the problems, whose inputs come from Table 1.3 |
| sig-figs-multiplication | skill | 1.3 | used by Example 1.4 ("we are using only one significant figure in these calculations") |

No new nodes; `approximation` and its two prerequisite edges are already
in `book.json`.

## Figures

id · replaces · concepts · what moves · sliders · headline · graph · 3D

Figure re-examination, 2026-11-16 (Claude Fable 5.2). Both sims replace no
book image (Example 1.3 has none; Example 1.4 has only the photograph of a
bank stack, kept as Figure 1.25). Both were small drawings on scales fixed
for ranges the examples never reach, and both are rebuilt:

1. `sim-building` · Sim · approximation, unit-conversion · value add: the
   scaling step (person to story to building) drawn, every story visible,
   and how far the answer moves when the two guesses move · arrows: none ·
   still (an estimate has no time in it; the stories stack once on first
   view) · stories (10 to 45, default 39, ink), height of a person (1.5 to
   2.0 m, default 2.0, position), persons per story (1.5 to 2.5, step 0.5,
   default 2, ink) · "39 stories of about 4 m each make a building about
   156 m tall." · none · 2D.
   works: parts: one story magnified (84 units per metre) holding the
   persons that make it up, the first solid and the rest faint, a bracket
   for the person and one for the story; dashed guides from that story to
   the building's ground story; the building at one fixed scale (225 m in
   440 units), every story a floor line, every tenth numbered; a person at
   the building's scale beside it; the height bracket; a bar from the lowest
   to the highest height the two guesses give for this many stories (N × 1.5
   × 1.5 to N × 2.0 × 2.5 m) with the present estimate dotted on it · flow:
   none · must hold: opens on the book's numbers, 2 m × 2 persons × 39
   stories = 156 m; the building's drawn height, the bracket and the dot
   agree; 39 floor lines countable in tens; the bar reads 88 m to 195 m at
   39 stories; nothing leaves the stage at 45 stories of 5 m · read off the
   image: no image; the numbers are Example 1.3's.
2. `sim-trillion` · Sim · approximation, order-of-magnitude,
   unit-conversion, sig-figs-multiplication · value add: the pile seen
   against a person and against the two friends' guesses, 3 in. and 10 ft,
   which is the question the example asks · arrows: none · still (the pile
   rises once on first view) · amount (0.1 to 1.5 trillion dollars, default
   1.0, ink), stack thickness (0.30 to 0.60 in., default 0.50, position) ·
   "1.0 trillion dollars in $100 bills covers the field to about 139 in.,
   which is 46 times the 3 in. guess and 1.2 times the 10 ft guess." · none
   · 2D.
   works: parts: the field in side view, 100 yd between shaded end zones,
   ticked every 10 yd; a scale in feet, 0 to 22 ft, fixed (the tallest pile
   the sliders give is 20.8 ft); the pile between the end zones; two dashed
   levels at 3 in. and 10 ft; a person 6 ft tall in the end zone; a line
   saying heights are drawn 6 times larger than lengths (20 units per foot
   up, 10/3 along) · flow: none · must hold: height = stacks × 6 in. × 3 in.
   × thickness / 6,480,000 in.² (139 in., 11.6 ft at the example's numbers);
   the pile top sits just above the 10 ft level and far above the 3 in.
   one; the person is 6 ft on the same scale; the readout gives volume and
   height each on one line; the note gives the example's one-figure answer,
   100 in. and 8 ft · read off the image: none (the photograph shows one
   stack); numbers are Example 1.4's. The example divides by the area
   rounded to 6 × 10⁶ in.² and prints 1.33 × 10² in. before rounding to
   1 × 10² in.; the figure divides by 6.48 × 10⁶ in.² and prints the
   one-figure value in its note. The 28 trillion mark went: on a scale that
   shows a person it is 324 ft, off the stage.

Both sims draw position: the heights of the person, the story, the
building and the pile, and the thickness of a stack, are lengths and take
the position hue. A count and a money amount are untyped and in ink.

Photographs, two:

- Figure 1.25, the bank stack (credit: Andrew Magill): **keep**, as a
  photo inside Example 1.4 at its head, with the book's caption and
  credit line. It shows the thing the example counts, the stack of one
  hundred $100 bills, and its caption asks the example's question.
- Figure 1.26, Salmonella (credit: Rocky Mountain Laboratories, NIAID,
  NIH): **drop**. It belongs to problem 4, which has no keyed answer
  and is left out, so the photograph goes with it and is not copied.

Figures that serve exercises: none kept.

Extra simulations (rule 15): none proposed. The chapter config says the
required figures already open the views the text does not, and the
two sims here are the two examples made live.

## Exercises

- 1 Check Your Understanding (`cyu1`, the basketball court), open with
  the book's answer, inline after block 3, Apply since it computes.
- 4 problems keyed with sample answers (the book's own word), each an
  open answer whose solution is the sample answer for the reader to
  compare an estimate against, never a number checked to 2%: `p1`
  heartbeats in a lifetime, `p3` lifetimes against a nuclear mean life,
  `p5` atoms across a cell membrane, `p7` cells in a hummingbird and in
  a human. All Apply; tagged approximation and order-of-magnitude, with
  a weight of 2 on order-of-magnitude since each leans on approximation
  and takes its inputs from Table 1.3.
- Left out, no keyed answer: `p2` (fs-id627359, generations since
  0 AD), `p4` (fs-id1597411, atoms in a bacterium, with its Salmonella
  photograph), `p6` (fs-id1509491, ocean depth and mountain height
  against Earth's diameter), `p8` (fs-id2010654, firing rate of a
  nerve).
- The open answer type has no hint field, so the four problems carry
  no hint; the pointer at Table 1.3 the spec asked for is in
  `exercise_notes` instead.
- No conceptual questions in this section, nothing held for a later
  page, nothing held from another section. No generated questions.

## Views

- Formulas: none. The section states no equation that belongs on the
  sheet; the two examples' lines are arithmetic.
- Definitions: the glossary term approximation, already in
  `chapter.json`.
- Concept map: `approximation` with its edges to order-of-magnitude and
  unit-conversion, already in `book.json`.

## Colour

The page binds position, for the heights and the stack thickness the two
sims draw. A count and a money amount are untyped and in ink.

## Dollar signs

The build's math prerender renders `$$…$$` first and then runs the
inline `$…$` pass over the result, and KaTeX prints `\$` as a raw `$`
in its HTML, MathML and annotation, so a display equation containing
`\$` is torn apart by the inline pass (checked by running
`prerenderMath` on a test string). Dollar amounts in prose are
therefore written as `&#36;` outside the math (`&#36;$1 \times
10^{12}$`), and the one display equation that needs the sign, the
count of stacks, sets it as the fullwidth dollar sign `＄` inside
`\text{}`, which KaTeX passes through untouched.
