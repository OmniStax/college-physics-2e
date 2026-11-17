# Plan: 2.8 Graphical Analysis of One-Dimensional Motion (m42103)

Source: `source.md` (converted from CNXML). The answer key of problem 3
was first read from the CNXML itself, since the converter kept only the
first piece of MathML in an `<equation>` that mixes prose with several
pieces; the converter now writes such an equation as a line of text,
and `source.md` was converted again with it in the chapter pass.
Status: built 2026-09-11 without a review stop, on Chen's instruction to
finish Chapters 2 and 3 in one job.

The section is graphs. The jet-powered car of the Bonneville Salt Flats
runs through it three times: at constant velocity (a straight line of
position against time), at constant acceleration (a curve of position, a
straight line of velocity, a level line of acceleration), and up to its
top speed (a velocity that levels out and an acceleration that falls to
zero). Six sketch figures, one photograph, three worked examples, one
Check Your Understanding box with two graphs of its own, six conceptual
questions with five graphs, nine problems with eight graphs (four of them
keyed), and one AP item taken from 2.4. No PhET note. It stays one page
(rule 11).

## Sub-concepts (page headers)

The book has four titled runs of text. The third is long and carries two
ideas, so it is split at the paragraph that turns from position to
velocity; the closing paragraph and the Check Your Understanding box get a
header of their own, since they are where a graph is read as a motion.
The opening paragraph ("A graph, like a picture, is worth a thousand
words") stays above the first header, as 2.5 keeps its opening paragraph.

1. `slopes` **Slopes and general relationships** (book: independent and
   dependent variables, $y = mx + b$, slope as rise over run, the
   $y$-intercept, Figure 2.44). The chapter's variables $m$ and $b$ and
   the equation `eq-line` anchor here.
2. `x-t` **A graph of position against time when the velocity is
   constant** (book: time as the independent variable, the jet car's
   straight-line graph of Figure 2.45, the slope read as $\kvb$ and the
   intercept as $\kxo$, the box The Slope of $x$ vs. $t$, the car's
   positions at 0.50 s and 6.40 s, Example 2.17 as `ex-jet-avg`). The
   variables $x_0$ and $v$ and the equations `eq-x-graph` and
   `eq-slope-x` anchor here.
3. `constant-a` **Graphs of motion when the acceleration is constant but
   not zero** (book: the three graphs of Figure 2.46, the photograph of
   the jet car, the paragraph on the tangent at a point and on plotting
   the tangents' slopes to obtain the velocity graph, Example 2.18 as
   `ex-jet-tangent` with Figure 2.48).
4. `v-t` **The slope of velocity against time is the acceleration**
   (book: "Carrying this one step further", the box The Slope of $v$ vs.
   $t$, the straight velocity line of Figure 2.46(b), $v = v_0 + at$
   read from the graph, the paragraph on discovering physical
   relationships by graphing). The variable $a$ and the equations
   `eq-slope-v` and `eq-v-graph` anchor here.
5. `not-constant` **Graphs of motion where the acceleration is not
   constant** (book: the car from 165 m/s to its top velocity, Figure
   2.49, Example 2.19 as `ex-jet-accel`).
6. `reading-graphs` **Reading a motion from its graphs** (book: the
   closing paragraph on generating one graph from another and on
   graphical analysis in general). The Check Your Understanding box goes
   inline at the end of this block.

Learning objectives, section summary and glossary come out of the running
text into the views. The conceptual questions, the problems and the AP
item go to the Exercises document.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| straight-line-graph | idea, eq-line | slopes | glossary (independent variable, dependent variable, slope, y-intercept); Figure 2.44; used in x-t and v-t |
| x-t-slope-velocity | result, eq-slope-x | x-t | the box The Slope of x vs. t; Example 2.17; problems 1(a), 3(a); CQ 1, 2 |
| tangent-slope | skill | constant-a | Examples 2.18 and 2.19; problems 1, 3 |
| derive-motion-graphs | skill | constant-a | Figure 2.46; the closing paragraph; CYU (b); CQ 2, 4, 5, 6; the AP item from 2.4 |
| v-t-slope-acceleration | result, eq-slope-v | v-t | the box The Slope of v vs. t; Example 2.19; problems 1(b), 3(b), 7(c); CQ 3, 4 |
| interpret-motion-graph | skill | reading-graphs | CYU (a); CQ 1, 2, 4; problem 7 |

`constant-a` also uses x-t-slope-velocity (the slope of the curve is the
instantaneous velocity), `ex-jet-tangent` and `ex-jet-accel` use
tangent-slope, `v-t` uses straight-line-graph and v-from-at (2.5), `x-t`
uses straight-line-graph and average-velocity (2.3), `not-constant` uses
v-t-slope-acceleration, and `reading-graphs` reinforces
derive-motion-graphs.

## Figures

id · replaces · concepts · what moves · sliders · headline · graph · 3D

The drawn figures are planned in the block dated 2026-11-16 below;
Figure 2.44 is the book's image.

The three examples: 2.17 is the slope of Figure 2.45 and is served by
`sim-jet-xt`, whose defaults are its two points; 2.18 gets
`sim-tangent` because it adds what `sim-jet-graphs` does not show, the
endpoints of a tangent and the arithmetic of a slope read between them;
2.19 is served by `sim-jet-top`, whose defaults are its endpoints.

Photographs, one:

- Figure 2.47, the U.S. Air Force jet car (credit: Matt Trostle,
  Flickr): **keep** as `fig-jet-car`. The text does not point at it,
  but the whole section is the motion of this car, and the photograph
  shows the thing every graph on the page is about.

Figures that serve exercises: the Check Your Understanding box, five of
the conceptual questions and the four kept problems refer to graphs of
their own (Figures 2.50 and 2.51 for the box, the rest unnumbered).
These are kept as the book's images in the exercise cards, since the
card is where the reader meets them and the app keeps one image per
card in `figure`; a problem that refers to two graphs carries them in
its prompt instead. The answer to the box includes its graph, Figure
2.51, and the answer to the Critical Thinking item includes its graph
of velocity against distance. No canvas copy is drawn for any of them.

Extra simulations (rule 15), proposed and judged:

- A slope-matching game: a motion is played on a strip and the reader
  drags the slope of a graph to match it. Left out: it animates what
  `sim-jet-graphs` already shows.
- A graph of a motion with a turn-around, position rising then falling,
  with the velocity graph beneath crossing zero where the position graph
  is flat. This is what conceptual questions 1, 2 and 6 and the AP item
  ask the reader to see, and no required figure shows a negative slope
  or a velocity graph that crosses zero. Judged worth building, but held
  to keep the page to the book's five figures; noted here for a later
  pass.

None built.

## Figure re-examination, 2026-11-16 (Claude Fable 5.2)

The five drawn figures were judged as a set against the book's images.

1. `sim-line` (Figure 2.44) · **reverted** to the book's image, a kept photograph. Its two sliders, slope and intercept, are the two sliders $\kvb$ and $\kxo$ of `sim-jet-xt` directly below it, with the same rise-and-run triangle, so it taught the same thing twice, once without quantities. The book's sketch names slope, intercept and rise over run and is enough.
2. `sim-jet-xt` (Figure 2.45) · x-t-slope-velocity, straight-line-graph · value add: the two points are dragged along the line and the ratio of rise to run does not change · arrows: none · still · $\kxo$ (0 to 800 m), $\kvb$ (0 to 300 m/s, 0 giving the level line of a car at rest), $t_1$ (0 to 4 s), $t_2$ (4.5 to 8 s), both points draggable on the graph · headline "Any two points on the line give the same slope: 1475 m ÷ 5.90 s = 250 m/s." · the graph is the figure, on the book's ticks (0 to 3200 m by 800 m, 0 to 8 s) · 2D. Readout, two formulas on two lines: $\kvb = \kdx/\kdt$ and $\kx = \kxo + \kvb\kt$, each whole with its numbers.
   works: read off the image: intercept $x_0 = 400$ m; points (0.50 s, 525 m) and (6.40 s, 2000 m); the line reaches 2400 m at 8 s; position ticks 800, 1600, 2400; labels $x = x_0 + \bar v t$ and slope $= \bar v = \Delta x/\Delta t$ · must hold: (1) on load the two points are Example 2.17's and the slope reads 250 m/s; (2) the slope read is $\kvb$ wherever the points are; (3) the line stays inside the fixed axes at every slider setting (800 + 300 × 8 = 3200 m).
3. `sim-jet-graphs` (Figure 2.46) · derive-motion-graphs, tangent-slope, x-t-slope-velocity, v-t-slope-acceleration · value add: the derivation the paragraph describes ("if this is done at every point on the curve and the values are plotted against time") happens in front of the reader · arrows: none · moving: a clock sweeps 0 to 30 s in about 6 s; the tangent slides along the position curve, and at each of the book's marker times (every 5 s) it leaves a stub on the curve and a point on the velocity graph, with the book's P (10 s) and Q (25 s) named on both graphs · $\kxo$ (0 to 400 m), $\kvo$ (0 to 20 m/s), $\ka$ (0 to 6 m/s², 0 giving the straight line of Figure 2.45) · headline "At 11.1 s the tangent has slope 70.5 m/s, which is the velocity plotted below it." · three graphs on one time axis, fixed at 0 to 4000 m, 0 to 200 m/s, 0 to 6 m/s², which the slider maxima just reach (3700 m, 200 m/s), so the book's case fills most of each graph (before, on 0 to 6000 m and 0 to 300 m/s, the curves lay along the bottom) · 2D. Graphs (a) and (b) say what their slope is, with the value now, in their free corner; the acceleration is written at the right end of its level. Each moving point is dropped to its own time axis, so no time line crosses those words. Readout: $\kv = \kvo + \ka\kt$ and $\ka = \kdv/\kdt$, each whole with its numbers; the clock is read to the tenth of a second it prints, so the numbers agree.
   works: read off the image: (a) position 200 m at 0 rising to 2900 m at 30 s, markers every 5 s, P at 10 s and Q at 25 s with tangent triangles, "Slope = v"; (b) a straight line from 15 m/s to 165 m/s, P and Q on it, "Slope = a"; (c) level at 5.0 m/s² · must hold: (1) at 10 s the slope reads 65 m/s and at 25 s 140 m/s, the values of the table in Figure 2.48; (2) the moving point of (b) is at the height the tangent's slope reads; (3) the velocity line ends at 165 m/s and the position curve at 2900 m at 30 s; (4) changing $\kxo$ moves only graph (a).
4. `sim-tangent` (Figure 2.48, Example 2.18) · tangent-slope, x-t-slope-velocity · value add over `sim-jet-graphs`: the arithmetic of reading one slope between two ends of a tangent, and the table · arrows: none · still · $t_Q$ (0 to 30 s, catching on the table's times), the ends $t_1$ (0 to 20 s) and $t_2$ (21 to 35 s); Q is dragged along the curve and the ends along the tangent; an end that would leave the graph is held at its edge · headline "The tangent at Q rises 1820 m in 13.0 s, so the velocity at 25.0 s is 140 m/s." · the graph with the book's table beside it; the table has a third column, the velocity, which the example's text reads from "this figure's table" though the book's image lacks it: a row fills in once Q has stood on its time, so the reader builds the velocity column tangent by tangent · 2D.
   works: read off the image: table 0, 5, …, 30 s against 200, 338, 600, 988, 1500, 2138, 2900 m; P at 10 s, Q at 25 s; Q's tangent read between 19 s and 32 s (1300 m and 3120 m in the example; the exact tangent gives 1298 m and 3118 m, inside the reading error the section's note allows) · must hold: (1) on load the readout is Example 2.18's, 140 m/s; (2) the table's positions are the book's; (3) the slope is the same wherever the ends sit; (4) the labels of the rise and the run stay clear of Q and the curve.
5. `sim-jet-top` (Figure 2.49, Example 2.19) · v-t-slope-acceleration, tangent-slope · value add: the tangent flattens as the point is dragged toward 55 s while the acceleration below falls to zero · arrows: none · still · $t$ (0 to 70 s), the ends $t_1$ (0 to 40 s) and $t_2$ (10 to 70 s), all three draggable on the graph, the ends held on the graph and at least 2 s apart · headline "The tangent at 25.0 s rises 50 m/s in 50.0 s; that slope is the acceleration plotted below it." · two graphs on one time axis, 160 to 280 m/s and −1 to 6 m/s², with the book's markers every 10 s · 2D.
   works: read off the image: velocity markers about 165, 210, 228, 239, 246, 249, 250, 250 m/s at 0, 10, …, 70 s; acceleration markers about 5.0, 3.2, 1.4, 0.7, 0.45, 0.15, 0, 0 m/s²; the tangent from (1.0 s, 210 m/s) to (51 s, 260 m/s). The acceleration is now straight pieces through (0, 5.0), (10, 3.1), (20, 1.4), (25, 1.0), (30, 0.8), (40, 0.5), (50, 0.3), (55, 0), which gives 205.5, 228, 234, 238.5, 245, 249 and 249.75 m/s at 10, 20, 25, 30, 40, 50 and 55 s, and the example's tangent ends exactly (210 and 260 m/s). The image's 210 m/s at 10 s cannot be had together with its own acceleration graph (5.0 falling to 3.2 m/s² adds at most 41 m/s) · must hold: (1) on load the readout is Example 2.19's, (260 − 210)/(51 − 1.0) = 1.0 m/s²; (2) from 55 s the tangent is level and the acceleration zero; (3) the point on (b) is at the slope the tangent reads.

## Exercises

- 1 Check Your Understanding, open, inline after `reading-graphs`, with
  the book's answer and its graph, Figure 2.51: `cyu1` (the ship coming
  into harbor, citing `reading-graphs`).
- 6 conceptual questions, `cq1` to `cq6`, each with an AI-written
  suggested approach; `cq1` to `cq5` carry the book's graphs.
- 4 problems keyed and kept: `p1` (the jet car's velocity at 20 s and
  its acceleration, two graphs in the prompt), `p3` (the slope of a
  position graph at 10.0 s and 30 s, and the acceleration at 20 s; its
  key is read from the CNXML, where it is intact), `p7` (the sprinter's
  velocity graph, four parts), `p9` (the Critical Thinking item on two
  cars, untyped in the CNXML and classed as a problem by the header it
  sits under, with the book's answer and its graph).
- 5 problems left out, having no answer in the book's key: 2
  (fs-id4012994, verifying 0.21 m/s at 10 s), 4 (fs-id2475925,
  verifying 3.2 m/s² at 10 s), 5 (fs-id1372323, the subway train's
  position graph, whose key is an empty block), 6 (fs-id2290187, the
  jogger's velocity at 2.5 s and 7.5 s), 8 (fs-id1582774, the particle's
  velocity graph and its acceleration at 2 s).
- 1 AP item taken from 2.4 with `source_section: "2.4"`: `ap1`
  (fs-id1860126, the book pushed across a table and its graphs), since
  it tests derive-motion-graphs; tagged acceleration-sign too.
- Nothing held for a later page. The Critical Thinking item leans on
  2.5's results (the midpoint average velocity, $v^2 = v_0^2 + 2a\Delta x$)
  and is tagged with them; it stays here because the book prints it
  here and 2.5 is already built.
- No generated questions: every node has a book exercise that tests it.
- Weights: `p3` turns on reading slopes off a position graph and merely
  divides two velocities by a time for its acceleration, so
  v-t-slope-acceleration gets weight 2 there; `p7` reads a velocity
  graph and names an average velocity, so average-velocity gets weight
  1; `p9` is about the midpoint average velocity, and
  derive-motion-graphs gets weight 2 for its graph; `ap1` is about
  deriving the graphs, and acceleration-sign gets weight 2.

## Views

- Formulas: eq-line, eq-x-graph, eq-slope-x (important), eq-slope-v
  (important), eq-v-graph. All already in `chapter.json`.
- Definitions: variables $m$, $b$, $x_0$, $v$, $a$ of 2.8; the four
  glossary terms.
- Concept map: the six nodes above, with average-velocity (2.3),
  v-from-at, vbar-midpoint and v-squared (2.5) and acceleration-sign
  (2.4) tagged on examples and exercises.

## Colour

The page binds time, position, velocity and acceleration: every drawn
figure is a graph against time of a position, a velocity or an
acceleration. Figure 2.44 is the book's image, and the $y$, $x$, $m$
and $b$ of its caption stay in ink. No new hue, no new macro.

## Wanted at chapter level

- variable `m` (2.8) → anchor `2.8-slopes`
- variable `b` (2.8) → anchor `2.8-slopes`
- variable `x0` (2.8) → anchor `2.8-x-t`
- variable `v` (2.8) → anchor `2.8-x-t`
- variable `a` (2.8) → anchor `2.8-v-t`
- equation `eq-line` → anchor `2.8-slopes`
- equation `eq-x-graph` → anchor `2.8-x-t`
- equation `eq-slope-x` → anchor `2.8-x-t`
- equation `eq-slope-v` → anchor `2.8-v-t`
- equation `eq-v-graph` → anchor `2.8-v-t`

The chapter pass wrote every anchor above into `chapter.json`, each one
checked against the ids of this section's `text.html`.

## Derivations

- The position equation read from a straight-line graph ($x = x_0 + \bar v t$ from $y = mx + b$) · score 1 · not built: the same result 2.5 works first and builds as drv-position-from-average-velocity; the restatement stays as printed
- The velocity equation read from the graph of velocity against time ($v = v_0 + at$) · score 1 · not built: the result of 2.5's drv-final-velocity reached again; stays as printed
