# Config: College Physics 2e, Chapter 2

Proposed by the agent after exploration (2026-09-06). Status: confirmed
2026-09-06 for 2.1 and 2.5. On 2026-09-11 Chen asked for the rest of the
chapter (2.2, 2.3, 2.4, 2.6, 2.7 and 2.8) to be built in one job without
check-ins, as Chapter 1 was: the per-section stops of rule 2 and the plan
reviews of rule 5 are replaced by a plan file per section, written before
the section is built and left for review after, and the photographs line
below is brought up to the root rule 14 as it now stands. The chapter
was completed that day (LOG Pass 20). Each line is a
setting and its value.

| Setting | Value |
|---|---|
| Unit of work | one section = one page; sections never folded (rule 11) |
| Order | 2.1, 2.2, 2.3, 2.4, re-link 2.5, 2.6, 2.7, 2.8; the chapter introduction as a page of its own in `intro/`, listed before 2.1 (root rule 21; built 2026-09-11) |
| Loop | per section: plan message → build → stop for feedback |
| Site | one page per section, built by the Astro app in `omnistax-web/` (the earlier `tools/build_site.py` is gone since Pass 7); other sections load into tabs on demand |
| Prose | verbatim; objectives, summary, glossary pulled into views |
| Sub-concept headers | agent decides per section, reported in the plan |
| Figures | a drawn figure where it shows what the book's image does not (motion, variation by a slider, a comparison); a sketch that a drawing would only repeat stays as the book's image: Figures 2.3, 2.16, 2.18, 2.19, 2.20, 2.22, 2.23 and 2.44; a photograph kept when the text points the reader at it or it shows the thing the passage is about, dropped when it is decoration such as a splash image, each listed in the plan with the reason; 3D only when spatial (rule 14) |
| Sim sliders | whatever is interesting and variable in the idea, not necessarily one equation's variables |
| Figures that serve exercises | copied over faithfully, no sliders and no motion (rule 14); the book numbers none of them, so their eyebrow reads "Figure" with no number, which is what 2.1's map of four paths carries (new) |
| Extra simulations | agent proposes only those that open a view the required figures do not; user picks from the plan (rule 15); 2.5 has no figure for the notation Δt = t, Δx = x − x₀, which the text states in a line |
| Feedback stops | agent waits until the user has answered every point before building (rule 16) |
| Colour coding | t, x, v, a hues from RULES.md; g under the acceleration hue; a length a figure draws (a drop height, a shaft depth, a radius, a place on a road) is a position and takes that hue; a body or a region is never tinted with a type hue (rule 7) |
| Depth | 2D throughout: every figure in the chapter is a strip, a number line, a graph or a flat scene, and none of them is an arrangement in space, so no locked view and no 3D scene (rule 28, new) |
| Fixed scales | every axis, strip and scene scale is fixed once from the slider maxima, or from the default state where the maxima would leave the default tiny, and a value past the end is drawn against it and named in the headline; the slider ranges of 2.4, 2.7 and 2.8 were cut where a wider range would have made every fixed axis unreadable (rule 24.6, new) |
| Discrete states | a state the reader switches between is a choice, not a slider: the motion in 2.2 (the jet flying left, the ball falling) and the positive direction of the four cars in 2.4; a quantity with a few book values keeps its slider and gets soft detents: the airplane's roll in 2.1 (parked, as far as he walks), the 1.0 s and 3.0 s of Figure 2.17, the 15 and 30 m/s of the braking cars in 2.5, the 13.0 m/s of Examples 2.14 and 2.15 in 2.7, the table's times in Figure 2.48 (rule 26.1) |
| Labels | a kind is labelled once; where labels would ride moving things a legend names the kinds and the values stand beside the scene, as with the eight arrows of the four cars of 2.14, and marks left along a path (the whole-second marks of 2.41) carry hover names; no figure has a Labels button (rule 26.7) |
| Photographs | the kestrel of the chapter introduction, the jet of Figure 2.6, the subway train of 2.13, the Space Shuttle of 2.29 and the jet car of 2.47 are kept, and the splash images are dropped; 2.29 was added in the audit pass of 2026-09-12, since the Making Connections note beside it is about the Shuttle (new) |
| Inline exercises | Check Your Understanding and other Remember/Understand items, after the passage they test |
| Exercises tab | end-of-section problems, conceptual questions, AP test prep |
| AP test prep | included |
| PhET interactive links | dropped |
| Answers to book problems | book answer key only; never generated; unkeyed problems are left out unless the user supplies an answer |
| Suggested approaches for open questions | generated, marked AI |
| Generated questions | none; agent asks only when a concept has no book exercise testing it |
| Concept nodes | testable units only; kinds idea/result/skill; canonical ids; one map file that grows across the chapter |
