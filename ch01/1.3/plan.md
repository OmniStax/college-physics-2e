# Plan: 1.3 Accuracy, Precision, and Significant Figures (m42120)

Source: `source.md` (converted from CNXML). Book pages 34 to 41.
Status: built 2026-09-11 without a review stop, on Chen's instruction to build the whole chapter in one pass.

A qualitative section with one equation, one worked example, three Check
Your Understanding boxes, two conceptual questions and eighteen problems,
of which the book keys nine. Four photographs, two of them decoration and
two of them the bull's-eye pair the text explains. Nothing in the section
is a typed physical quantity, so every figure draws in ink.

## Sub-concepts (page headers)

The book has eight untitled runs of text. Proposed page structure, one
block per idea, in the book's order:

1. **Accuracy and precision of a measurement** (`accuracy-precision`; the
   three paragraphs on the paper measurements and the GPS restaurant, then
   the sim that replaces the two bull's-eyes)
2. **The uncertainty in a measurement** (`uncertainty`; the uncertainty
   paragraph, the list of four factors, the paragraph after it, and the
   note "Making Connections: Real-World Connections – Fevers or Chills?";
   Check Your Understanding 1, the stopwatch, goes inline here, since it
   asks whether an uncertainty can tell two readings apart)
3. **Uncertainty as a percent of the measured value**
   (`percent-uncertainty`; the defining sentence and the equation, Example
   1.2 with the bag of apples, then a new sim)
4. **The uncertainty in a quantity you calculate** (`calculations`; the
   method of adding percents and the floor, then a new sim)
5. **The precision of a measuring tool and significant figures**
   (`sig-figs`; the two paragraphs on the ruler and the caliper, the
   "Zeros" sub-header with its paragraph, then a new sim; Check Your
   Understanding 2, counting significant figures, goes inline here)
6. **Significant figures in calculations** (`sig-figs-calculations`; the
   two rules with the circle and the potatoes, then a new sim)
7. **Significant figures in this text** (`sig-figs-text`; the paragraph;
   Check Your Understanding 3, the bags and the wagon, goes inline here,
   since it applies both rules)

The book places Check Your Understanding 1 after the floor paragraph; it
tests uncertainty alone, so it moves up to the end of block 2. The words
of every block are the book's, in the book's order; only the headers go
in. Learning objectives, the summary and the glossary come out of the
running text into the views. The conceptual questions and the problems go
to the Exercises document.

## Concept nodes (already in `book.json`)

| id | kind | name | prereqs | evidence |
|---|---|---|---|---|
| accuracy | idea | Accuracy | none | glossary; the bull's-eye passage; CQ 1 |
| precision | idea | Precision | none | glossary; the bull's-eye passage; CYU 1; CQ 2 |
| uncertainty | idea | Uncertainty A ± δA | accuracy, precision | glossary; the fevers note; CYU 1; CQ 1, 2; problems 11, 15, 17 |
| percent-uncertainty | result, eq-percent-uncertainty | %unc = δA/A × 100% | uncertainty | glossary; Example 1.2; problems 1, 3, 9, 11 |
| adding-percents | result | Method of adding percents | percent-uncertainty | glossary; the floor; problems 11, 15, 17 |
| significant-figures | idea | Significant figures | precision, uncertainty | glossary; the ruler and caliper; zeros; CYU 2; problem 7 |
| sig-figs-multiplication | skill | Significant figures in multiplication and division | significant-figures | the circle; CYU 3(b); problems 5, 7, 13, 15, 17 |
| sig-figs-addition | skill | Significant figures in addition and subtraction | significant-figures | the potatoes; CYU 3(a) |

Placeholders tagged on exercises only: `unit-conversion` (1.2, built) on
problems 3, 5 and 13, and `average-speed` (2.3, a placeholder until that section was built) on problem
13. The chapter's variables `A` and `δA` and the equation
`eq-percent-uncertainty` anchor at `1.3-uncertainty` and
`1.3-percent-uncertainty`, which are span ids of this page.

## Figures

id · replaces · concepts · what moves · sliders · headline · graph · 3D

The five drawn figures are planned in the block dated 2026-11-16 at the
end of this file.

Photographs, four:

- Figure 1.21, the double-pan balance (credit: Serge Melki): **drop**. A
  splash pair at the head of the section; the text never refers to it.
- Figure 1.22, the digital balance (credit: Karel Jakubec): **drop**, for
  the same reason.
- Figure 1.23, the bull's-eye with low precision and high accuracy
  (credit: Dark Evil): **replaced** by `sim-target`, which carries the
  book's number 1.23, both images as originals and the 1.23 caption.
- Figure 1.24, the bull's-eye with high precision and low accuracy
  (credit: Dark Evil): **folded** into the same sim, which reproduces it
  at a spread of 6 m and an offset of 33 m. The row lists 1.24 under
  `folds`, the eyebrow reads "Figure 1.23 + 1.24", and the prose's
  reference to Figure 1.24 links to the sim.

Figures that serve exercises: none in this section.

Extra simulations (rule 15): none proposed. The chapter config says the
required figures already open the views the text does not, and the five
above cover every idea and result the section introduces.

## Exercises

- 3 Check Your Understanding, inline, with the book's answers: the
  stopwatch (`cyu1`, open, after `uncertainty`), counting significant
  figures (`cyu2`, five parts, after `sig-figs`), the bags and the wagon
  (`cyu3`, two parts, after `sig-figs-text`).
- 2 conceptual questions (`cq1`, `cq2`), open, with AI-written suggested
  approaches marked as such.
- 9 problems keyed and kept: 1 (`p1`, 2 kg), 3 (`p3`, two ranges as four
  parts), 5 (`p5`, three parts), 7 (`p7`, three counts), 9 (`p9`, a
  percent and a range), 11 (`p11`, a rate and its uncertainty), 13
  (`p13`, 2.8 h), 15 (`p15`, a volume and its uncertainty), 17 (`p17`, an
  area and its uncertainty).
- 9 problems left out for want of a keyed answer: 2, 4, 6, 8, 10, 12, 14,
  16 and 18 (fs-id1246911, fs-id3107170, fs-id1001291, fs-id1954504,
  fs-id1673258, fs-id3154651, fs-id1493327, fs-id2560910, fs-id1678580).
- Weights: `unit-conversion` at 2 on problem 3 and at 1 on problems 5 and
  13; `average-speed` at 1 on problem 13. Everything else at the Bloom
  value.
- Nothing held for a later page, nothing held from another section, no
  AP items in this chapter. No generated questions: every node has a book
  exercise.

## Views

- Formulas: `eq-percent-uncertainty` (important), already in
  `chapter.json`.
- Definitions: the symbols A and δA, untyped; the six glossary terms.
- Concept map: the eight nodes above with the edges `book.json` gives.

## Colour

The page binds force, position and area. The weight $A$ of the percent
figure is in the force hue, the stick's length and the floor's sides in
the position hue, and the floor's area and its strips in the area hue.
A spread, an offset, a percent, δA and a bare number are untyped and in
ink.

## Figure re-examination, 2026-11-16 (Claude Fable 5.2)

All five drawn figures were rebuilt.

1. `sim-target` · Figure 1.23 + 1.24 · accuracy, precision · value add: variation by slider, and the four combinations of accuracy and precision seen at once, which the book's two images leave half-shown · arrows: none · still · sliders spread (2 to 25 m, default 20, specials 20 "Figure 1.23" and 6 "Figure 1.24") and offset (0 to 35 m, default 4, specials 4 and 33), both untyped · no headline (the outlined case and the readout say it) · no graph · 2D. Beside the target a two-by-two of the four cases, the reader's outlined; a tap on a case sets both sliders. Legend names the restaurant, an attempt, the average, the spread circle and the offset line.
   works: parts: a target of five rings about the restaurant; four attempts; their average (hollow); a dashed circle about the average of radius the spread; a line from the restaurant to the average · flow: none · must hold: (1) on load the four dots sit as Figure 1.23 has them, spread wide about the centre, and at spread 6 m, offset 33 m as Figure 1.24, a tight cluster to the lower left; (2) the hollow marker is the mean of the four dots at every setting; (3) the outlined case agrees with the readout's words, high meaning within one ring (10 m); (4) every dot stays on the canvas at the slider extremes; (5) the legend is whole · read off the images: both are targets of a red disc and three red rings on white, four black dots each. 1.23: dots at (−17, −60), (73, −1), (−82, 8), (−39, 74) px from the centre of a target 185 px in radius: mean 17 px off (0.09 R), rms 74 px about it (0.40 R). 1.24: dots clustered at (−109, 57) px mean (0.66 R, lower left), rms 23 px (0.12 R). The alt text says the dots of 1.23 lie "in the innermost circle"; they lie on its edge, on the first white ring. The book gives no distances: the rings are drawn 10 m apart (an invented scale, a plausible GPS error), so R = 50 m gives 20 m and 4 m, 6 m and 33 m.
2. `sim-percent` · Sim (Example 1.2) · percent-uncertainty · value add: the section's equation graphed against A for a fixed δA, so the example's closing question (a bag half as heavy) is answered by two points on one curve · arrows: none · still · sliders A (force, 2.0 to 10.0 lb, default 5.1, special "Example 1.2") and δA (untyped, 0.1 to 1.0 lb, default 0.4) · no headline · graph below a line of weight on the same scale, frame fixed at 0 to 11 lb and 0 to 60% · 2D.
   works: read off the text (no image): weekly weights 4.8, 5.3, 4.9, 5.4 lb; average 5.1 lb; δA = 0.4 lb; 0.4/5.1 × 100% = 8% · must hold: (1) on load the readout is 0.4 lb / 5.1 lb × 100% = 8% and the filled point stands at 5.1 lb, 7.8%; (2) the hollow point is at A/2 with twice the percent (16%), and both bands on the line of weight are equally wide; (3) the four weekly ticks are drawn only at A = 5.1 lb; (4) a point above 60% is pinned and named; (5) labels clear each other at A = 2 lb and A = 10 lb.
3. `sim-area` · Sim (the floor) · adding-percents · value add: why the percents add. The largest floor is the floor plus a strip that is the length's percent of the area, a strip that is the width's percent, and a corner that the method leaves out; the first build shaded a ring without saying why 2% and 1% make 3% · arrows: none · still · sliders percent uncertainty in length and in width (untyped, 0 to 5% by 0.5, defaults 2 and 1, "a few percent or less" as the text says) · no headline · no graph · 2D, the corner drawn again ten times larger.
   works: read off the text: 4.00 m by 3.00 m, 2% and 1%, 12.0 m², 3%, 0.36 m² rounded to 0.4 m² · must hold: (1) on load the strips are 0.08 m × 3.00 m = 0.24 m² and 4.00 m × 0.03 m = 0.12 m², the corner 0.0024 m², and the readout 2% + 1% = 3%, 0.36 m² ≈ 0.4 m²; (2) the inset shows the same pieces as the main drawing at ten times the scale and holds them at 5% and 5%; (3) the note's sum is 12.3624 m², 3.02% more; (4) at 0% nothing is drawn beyond the floor.
4. `sim-ruler` · Sim · significant-figures, precision · value add: the three tools read side by side, each row the last ten times larger about the end of the stick, so "a finer tool writes one more digit" is seen without switching; the first build showed one tool at a time · arrows: none · still (the ruler's slide-in was decoration and is gone) · slider L (position, 10.00 to 45.00 cm, default 36.71, special "the book's stick") · no headline · 2D.
   works: read off the text: 36.7 cm on a ruler, not 36.71 cm; the last digit estimated; 36.7 cm has three significant figures · must hold: (1) on load the rows read 37 cm (two), 36.7 cm (three), 36.71 cm (four); (2) in each row the end of the stick lies between two neighbouring marks and the mark nearest it is the bold one and is the reading; (3) each grey window on a row is the stretch the next row shows; (4) the last digit of each reading is underlined.
5. `sim-calc` · Sim (the two rules) · sig-figs-addition, sig-figs-multiplication · value add: the sum set in columns about the decimal point with a "?" where a number was not measured, so the columns the sum cannot know are seen; the product by counting figures. The first build's sticks and rectangle did not bear on rounding and are gone · arrows: none · still · sliders a, decimals of a, b, decimals of b (untyped; defaults 7.56, 2, 6.052, 3, numbers of the book's potato example) · no headline · 2D.
   works: must hold: (1) on load 7.56 + 6.052 = 13.612, written 13.61, the thousandths column shaded with a "?" under a; 7.56 × 6.052 = 45.75312, written 45.8 (three figures); (2) the struck digits are exactly those the written answer drops; (3) with equal decimals nothing is shaded; (4) a product with more digits before the point than figures kept is written in powers of ten.
