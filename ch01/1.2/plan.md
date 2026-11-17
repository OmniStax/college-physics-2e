# Plan: 1.2 Physical Quantities and Units (m42091)

Source: `source.md` (converted from CNXML); the three tables written from
the CNXML itself, since the converter flattened their spanned headers.
Status: built 2026-09-11 without a review stop, on Chen's instruction to
build the whole chapter in one pass.

A long, qualitative section: six photographs (one a splash image), one
sketch, three tables, one worked example, two Check Your Understanding
boxes, one conceptual question and ten problems, five of them keyed. No
AP items, no PhET note. It stays one page (rule 11).

## Sub-concepts (page headers)

The book has five titled runs of text, with three sub-titles inside the
third. Page structure, one block per idea, span ids as the chapter's
anchors expect them:

1. `quantities` **Physical quantities and their units** (book: the
   immense range of physics, a physical quantity defined by how it is
   measured or calculated, units as standardized values, the map in
   unknown units, SI against English units)
2. `si-units` **SI units: fundamental and derived units** (book: Table
   1.1, the four fundamental quantities, derived units as algebraic
   combinations of them)
3. `base-units` **The second, the meter, and the kilogram** (book: the
   three sub-titled passages, kept as `<h3>` sub-headers with the book's
   ids `second`, `meter`, `kilogram`; the atomic clock; light along the
   meter stick; the 2019 kilogram; the ampere deferred to a later
   chapter). The chapter's variables `c` and `t` anchor here.
4. `prefixes` **Metric prefixes and orders of magnitude** (book: the
   metric system, conversions by powers of 10, order of magnitude, the
   note on microscopic standards, Table 1.2). Both Check Your
   Understanding items go inline at the end of this block: the first
   asks for a fundamental unit and a prefix, the second for what a
   milliliter says about derived units, and both need the prefixes.
5. `ranges` **Known ranges of length, mass, and time** (book: the
   paragraph on the vastness of the universe, the phytoplankton, the
   colliding galaxies, Table 1.3). The book prints Table 1.3 after the
   conversion passage, but the table belongs to this paragraph, which
   refers to it and to nothing else, so it is kept here.
6. `conversion` **Unit conversion and dimensional analysis** (book: the
   cookbook and the walking directions, the 80 m to 0.080 km worked
   through in steps, the Appendix C link, Example 1.1, the note on
   nonstandard units). The chapter's equations anchor at `conversion`
   (the 80 m step) and `ex-drive` (average speed).

The order-of-magnitude paragraph reads "Each power of $10$, and so forth
are all different orders of magnitude" in the book itself; it is kept as
printed. The cross-reference to "Accuracy, Precision, and Significant
Figures" at the end of Example 1.1 stays plain text, as the spec asks.

Learning objectives, section summary and glossary come out of the running
text into the views. The conceptual question and the problems go to the
Exercises document.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| physical-quantity | idea | quantities | glossary; Example 1.1 |
| units | idea | quantities | glossary (units, SI units, English units); CQ 1; every problem |
| fundamental-units | idea | si-units | glossary; Table 1.1; base-units; CYU 1 |
| derived-units | idea | si-units | glossary; CYU 2 |
| metric-prefixes | idea | prefixes | glossary (metric system); Table 1.2; CYU 1 and 2; CQ 1; problems 7, 9 |
| order-of-magnitude | idea | prefixes | glossary; Table 1.3; CYU 1 |
| conversion-factor | idea | conversion | glossary; the 80 m step; Example 1.1; problems 1, 3, 5, 7, 9 |
| unit-conversion | skill, eq-unit-conversion | conversion | Example 1.1; problems 1, 3, 5, 7, 9 |

Example 1.1 also leans on `average-speed` (2.3, a placeholder until that section was built): the
book says to take average speed as given for now.

## Figures

id · replaces · concepts · what moves · sliders · headline · graph · 3D

The three drawn figures are planned in the block dated 2026-11-17 below.

The example gets a figure of its own because it adds what the section
figures do not show: a speed, which is a physical quantity calculated
from two others, and the chain of conversion factors that carries it
from one unit to the next.

Photographs, six:

- Figure 1.15, the Earth from the Moon (credit: NASA): **drop**. It is
  the splash image at the head of the section; nothing in the text
  refers to it. Not copied.
- Figure 1.16, the boy with a map in unknown units: **keep** as
  `fig-map`. The text says "See Figure 1.16", and the caption is the
  point of the passage on units.
- Figure 1.17, the atomic fountain clock (credit: Steve
  Jurvetson/Flickr): **keep** as `fig-clock`. The text says "See Figure
  1.17", and it shows the thing the second is now defined by.
- Figure 1.18, light along a meter stick: a sketch, **replaced** by
  `sim-light-meter`, which keeps the number 1.18, the book's image as
  its original and the book's caption.
- Figure 1.19, the phytoplankton (credit: Prof. Gordon T. Taylor, Stony
  Brook University; NOAA Corps Collections): **keep** as `fig-plankton`.
  The text says "See Figure 1.19 and Figure 1.20"; the two together are
  the range the passage is about.
- Figure 1.20, the colliding galaxies (credit: NASA/CXC/UVic./A. Mahdavi
  et al. Optical/lensing: CFHT/UVic./H. Hoekstra et al.): **keep** as
  `fig-galaxies`, for the same reason.

Figures that serve exercises: none. Problem 10 refers to Table 1.3, which
is in the text.

Extra simulations (rule 15): none proposed. The chapter is qualitative,
and the three figures already open the views the text does not give
(light covering the meter in a set time, a value placed on the ladder of
powers of 10, a speed carried through a chain of conversion factors).

Figure re-examination, 2026-11-17 (Claude Fable 5.2). All three rebuilt, with the book's image open.

1. `sim-light-meter` · replaces Figure 1.18 · fundamental-units · value add: the reader sets the time and sees how far light gets, with the book's 1/299,792,458 s landing exactly on the end of the stick · arrows: kinematic (the light's front) · moving: the front runs along the stick · slider: elapsed time $\kt$ 0.50 to 4.00 ns, default 3.34, special at 1/c "one meter" · headline: "In 3.34 ns, which is 1/299,792,458 s, light travels the length of the meter stick." · graph none · 2D.
   works: parts: a flashlight whose lens stands at the stick's zero end; a stick exactly one meter long (the old one was 1.5 m and still called a meter stick), ticked every cm, numbered 10 to 100 with "cm" at the left as the book's is; the light as a band with an arrow along it · flow: the front leaves the lens at t = 0 and runs right at c · must hold: at 3.34 ns the front is at the 100 mark and the readout is the book's c × 1/299,792,458 s = 1 m; a shorter time stops short and a longer one runs past the end, both said in meters; the dashed drop from the front reads on the stick; scale fixed at 900 units per meter · read off the image: flashlight left, arrow to the right in a band of light, ruler "cm 10 … 100", "Light travels a distance of 1 meter in 1/299,792,458 seconds".
2. `sim-ladder` · Sim · metric-prefixes, order-of-magnitude · value add: the decade a value falls in is shaded on the 44-decade ladder and opened out underneath, so every length that shares the order of magnitude is read at once; opens on the book's 450 (4.5 × 10²), and 800 sits in the same decade · arrows: none · still · sliders: factor 1.0 to 9.9 (default 4.5), power of 10 from −18 to 26 (default 2); "mantissa" is not the book's word and is gone · headline: "Every length from 100 m up to 1 km is of the order of magnitude 10²." · graph none · 2D.
   works: read off the tables: the sixteen prefixes of Table 1.2 at their powers; twelve lengths of Table 1.3 at their powers (proton −15, hydrogen atom −10, cell membrane −8, visible light −6, grain of sand −3, child 0, football field 2, Earth 7, Earth to Sun 11, light year 16, Milky Way 21, known universe 26) · must hold: the opened decade is logarithmic like the ladder (marks at log 2, log 3, …); the marker sits at the same place in both; the readout chain is one line.
3. `sim-drive` · Sim, for Example 1.1 · unit-conversion, conversion-factor, physical-quantity · value add: one average speed read on three scales with a common zero (km/min, km/h, m/s), so the same speed is seen to carry a different number in each unit, and the readout gives the book's three steps with the units struck out as they cancel (the source lacks the book's km/min to km/h equation, which the readout now supplies) · arrows: kinematic (the car's speed) · moving: the car drives the trip while the stopwatch, one turn an hour, counts the minutes · sliders: distance $\kd$ 1 to 30 km (default 10.0), time $\kt$ 15 to 60 min (default 20.0), so the fastest trip is 2 km/min = 120 km/h = 33.3 m/s, the right end of all three scales · headline: "10.0 km in 20.0 min is one average speed: 0.500 km/min, 30.0 km/h or 8.33 m/s." · graph: the three scales · 2D.
   works: must hold: 10.0 km / 20.0 min = 0.500 km/min; × 60 min/h = 30.0 km/h; × 1 h/3,600 s × 1,000 m/1 km = 8.33 m/s; the marker line crosses 0.5, 30 and 8.33 on the three scales; road and scales never rescale.

## Tables

Three, written from the CNXML with their spanned headers, every cell as
the book prints it, each in a `div.book-table` numbered as openstax.org
numbers it:

- Table 1.1 Fundamental SI Units (four columns, two rows), in
  `si-units`.
- Table 1.2 Metric Prefixes for Powers of 10 and their Symbols (Prefix,
  Symbol, Value, and Example spanning four columns), in `prefixes`.
- Table 1.3 Approximate Values of Length, Mass, and Time (three spanned
  pairs, a power of ten and a description), in `ranges`, beside the
  paragraph that refers to it rather than after the conversion passage
  where the book prints it.

## Exercises

- 2 Check Your Understanding, open, both inline after `prefixes`, with
  the book's answers: `cyu1` (the hummingbird's wingbeat, citing
  `prefixes`), `cyu2` (a cubic centimeter and a milliliter, citing
  `si-units`).
- 1 conceptual question, `cq1` (advantages of metric units), with an
  AI-written suggested approach.
- 5 problems keyed and kept: `p1` (100 km/h in m/s and mph), `p3` (show
  1.0 m/s = 3.6 km/h; the key is a chain of factors, kept as an open
  answer), `p5` (a soccer field in feet and inches, four parts), `p7`
  (Mount Everest in km), `p9` (a tectonic plate's speed, two parts).
- 5 problems left out, having no answer in the book's key: 2
  (fs-id1544895, 33 m/s), 4 (fs-id1434985, a 100 yd field), 6
  (fs-id3159821, a person 6 ft 1.0 in), 8 (fs-id3158542, the speed of
  sound), 10 (fs-id1564148, the Earth's orbital speed from Table 1.3).
- No AP items, nothing held for a later page, nothing held from 1.1.
- No generated questions: every node has a book exercise, except
  `physical-quantity`, which Example 1.1 uses and no problem tests on
  its own.
- Weights: problem 7 (Everest in km) merely names a prefix, so
  `metric-prefixes` gets weight 1 there.

## Views

- Formulas: eq-average-speed (important, from Example 1.1),
  eq-unit-conversion (the 80 m step, not important). Both already in
  `chapter.json`.
- Definitions: variables `c` and `t`; the twelve glossary terms.
- Concept map: the eight nodes above, with `average-speed` (2.3)
  tagged on Example 1.1 only.

## Colour

The page binds time, velocity and position. The light's travel time and
the drive's time are in the time hue, the speed of the light and of the
car in the velocity hue, and the distance each covers, with the length
marked on the ladder, in the position hue. A factor and a power of 10
are untyped and in ink. No new hue, no new macro.
