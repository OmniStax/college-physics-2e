# Config: College Physics 2e, Chapter 1

Proposed by the agent after exploration (2026-09-11). Status: applied as
proposed, since Chen asked for the whole chapter to be built in one job
("do everything before ch2"); the per-section stops of rule 2 and the plan
reviews of rule 5 were replaced by a plan file per section, written before
the section was built and left for review after. Each line is a setting
and its value. Lines that repeat the Chapter 16 config are unchanged
unless marked.

| Setting | Value |
|---|---|
| Chapter | 1 Introduction: The Nature of Science and Physics, modules m42119 to m42121 (m42092, m42091, m42120, m42121 in book order), PDF pp. 25–56 |
| Front matter | the Preface (m42955) is not built; the chapter introduction (m42119) is recorded as `intro_module` and waits for a chapter landing page (new) |
| Unit of work | one section = one page; sections never folded (rule 11); 1.4 stays a page of its own |
| Order | 1.1 to 1.4 in book order |
| Loop | plan file → build → validator, all four sections in one pass; review after (new, on Chen's instruction) |
| Prose | verbatim; objectives, summary, glossary pulled into views; the book's boxed notes (Models, Theories, and Laws; The Scientific Method; Limits on the Laws of Classical Physics; The Quest for Microscopic Standards; Nonstandard Units; Fevers or Chills) kept verbatim as notes |
| Tables | the book's three tables kept in the text as tables, numbered as openstax.org numbers them (new) |
| Sub-concept headers | agent decides per section, reported in the plan |
| Figures | a drawn figure where it shows what the book's image or text does not: nine sims, of which the meter of light and the two bull's-eyes (one figure) replace the book's sketches and the rest belong to an example or an idea; the planetary atom of Figure 1.10 is the book's image; a photograph kept when the text refers to it or it shows the thing the passage is about, dropped when it is a splash image (the geese, the Earth from the Moon, the two balances); each listed in the plan (rule 14) |
| Sim sliders | whatever is interesting and variable in the idea: a time for light, a factor and a power of ten, a distance and a time, a spread and an offset in meters, a value and its uncertainty, two percent uncertainties, the length of a stick, two numbers and their decimals, stories and people, an amount of money and the thickness of a stack |
| Motion | the light along the meter and the car of Example 1.1 are finite motions and get the scrubber; every figure of 1.3 and 1.4 is still and carries no transport (the building's stories and the pile of bills rise once, on first view) |
| Discrete states | the four cases of accuracy and precision beside the target are tapped, and a tap sets the two sliders; the ruler's three sets of marks (1 cm, 1 mm, 0.1 mm) are drawn at once, with no choice; every control in the chapter is a quantity and a slider (rule 26.1) |
| Depth | 2D throughout: nothing in the chapter is an arrangement in space, so no locked view and no 3D scene (rule 28, new) |
| Fixed scales | every axis, strip and scene scale is fixed once from the slider maxima, or from the default state where the maxima would leave the default tiny, and a value past the end is pinned there and named (rule 24.6, new) |
| Figures that serve exercises | none kept: the Salmonella photograph belongs to an unkeyed problem and goes with it |
| Extra simulations | none proposed beyond the figures listed in the section plans; the chapter is qualitative and those figures already open the views the text does not (rule 15) |
| Colour coding | hues from the global tier: time and velocity for the two 1.2 sims that carry a time or a speed; position for a length that a figure draws (the distance $d$ light or the car covers, the length marked on the ladder, the stick, the sides of the floor, the heights and the stack thickness of 1.4); force for the weight of Example 1.2; area for the floor; a count, a percent, an uncertainty δA, a spread, an offset and a bare number are untyped and in ink; `c` joins the symbol table under the velocity type |
| Inline exercises | Check Your Understanding items, after the passage they test (1.1's on law against theory goes after the models block; 1.2's two go after the prefixes; 1.3's stopwatch goes after uncertainty) |
| Exercises tab | end-of-section problems and conceptual questions |
| AP test prep | none in this chapter |
| PhET interactive links | dropped (1.1's Equation Grapher is about polynomials, not the section) |
| Cross-references to other chapters | plain text where the target is unbuilt; the Appendix C link points at the publisher's page (new) |
| Answers to book problems | book answer key only; never generated; unkeyed problems are left out; a "sample answer" to an approximation problem is kept as an open answer the reader compares with, not as a number checked to 2% (new) |
| Suggested approaches for open questions | generated, marked AI |
| Generated questions | none; the one node with no exercise of its own (physics) is noted in the 1.1 plan, no question generated |
| Concept nodes | testable units only; kinds idea/result/skill; canonical ids; 24 nodes written into `book.json` before the sections were built; `average-velocity` (2.3) is the one placeholder the chapter reaches, from the speed problems |
| Formulas | `ch01/chapter.json`: average speed (important, from Example 1.1), the 80 m conversion (not important), percent uncertainty (important) |
| Book manifest | `ch01` first in `book.json` chapters |
