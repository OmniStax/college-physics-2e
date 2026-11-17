# Plan: 4.5 Normal, Tension, and Other Examples of Forces (m42075)

Source: `source.md` (converted from CNXML). Status: built 2026-09-11 without a
review stop, on Chen's instruction to finish the book in one job; the plan
stands for review after.

The section that names the forces a free-body diagram is drawn from. Nine
numbered book figures (4.11 to 4.19), eight of them sketches and one a
photograph, four unnumbered figures inside the exercises, three boxed notes,
two worked examples, seven AP items, two conceptual questions and six
problems, three of them keyed. The PhET note (Forces in 1 Dimension) is
dropped, as the chapter config decides, and named in `notes`. One page (rule
11).

## Sub-concepts (page headers)

The book's own headers are Normal Force, Tension and Extended Topic: Real
Forces and Inertial Frames. The tension half runs long enough to divide, so
the page is seven blocks:

1. `named-forces` **The names given to forces** (book: the opening paragraph
   on the many names forces are given). The section's own introduction, kept
   at the top of the text as rule 21 asks.
2. `normal-force` **The normal force** (book: weight must be counteracted,
   the bag of dog food and the sagging table, Figure 4.11, the definition of
   the normal force, and the boxed note Common Misconception: Normal Force
   (N) vs. Newton (N)). $\kN$, $\kwgt$, $m$, $\kg$ and eq-normal anchor here.
3. `weight-on-incline` **Weight on an incline** (book: Example 4.5 Weight on
   an Incline, a Two-Dimensional Problem, with Figure 4.12 inside it; the
   boxed note Resolving Weight into Components with Figure 4.13 and the two
   component equations; the boxed note Take-Home Experiment: Force Parallel).
   $\kwpar$, $\kwperp$, $\kff$, $\kapar$, $\theta$, eq-w-parallel, eq-w-perp,
   eq-a-incline and eq-a-incline-friction anchor here. The example is
   `ex-incline`.
4. `tension` **Tension** (book: the definition of tension, the rope and the
   hanging mass of Figure 4.14, the proof that $\kTf = \kwgt = m\kg$, the
   spring cut into the rope, and tension carried round corners in Figure
   4.15). $\kTf$ and eq-tension-weight anchor here.
5. `tightrope` **The tension in a sagging wire** (book: Example 4.6 What Is
   the Tension in a Tightrope?, with Figures 4.16 and 4.17 inside it).
   $\kTL$, $\kTR$ and eq-tension-sag anchor here. The example is
   `ex-tightrope`.
6. `large-tension` **Creating a large tension** (book: the extension of the
   tightrope result to a perpendicular force, the two equations, the chain
   and the car of Figure 4.18, and the Golden Gate Bridge of Figure 4.19).
   $\kFperp$ and eq-tension-perp anchor here.
7. `inertial-frames` **Real forces and inertial frames** (book: the Extended
   Topic, real against fictitious forces, the satellite seen from a rotating
   Earth, and the closing paragraph on the four basic forces to come).

Cross references to sections in other chapters do not arise here; the only
forward reference is to "the next (extended) section", which stays as the
book writes it. The book's bold vectors are set bold in ink where the book
prints them bold and their magnitudes take the `\k` macros. The book writes
the hand's force as $F_{\text{hand}}$, for which the chapter has no symbol
row, so it is set in plain LaTeX and a row is asked for below.

Learning objectives, the section summary and the three glossary terms come
out of the running text into the views. The chapter's one Check Your
Understanding box is in 4.2, so nothing is inline here; the conceptual
questions, the AP items and the problems go to the Exercises document.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| normal-force | idea, eq-normal | normal-force | Figure 4.11; the definition; the perpendicular equation of Example 4.5; the toboggan AP item |
| weight-components-on-incline | result, eq-w-parallel | weight-on-incline | Example 4.5; the note Resolving Weight into Components; the car on the 20º slope |
| acceleration-on-frictionless-incline | result, eq-a-incline | weight-on-incline | Example 4.5 (a) and its discussion; the car on the 20º slope |
| tension | idea | tension | the definition; Figures 4.14 and 4.15; the traction questions; the tug-of-war items |
| tension-supports-weight | result, eq-tension-weight | tension | the 5.00 kg mass of Figure 4.14; the spider-web and gymnast problems; the cable AP item |
| tension-from-perpendicular-force | result, eq-tension-perp | large-tension | Example 4.6; Figure 4.18; the problem that asks the reader to show the relation |
| inertial-frame | idea | inertial-frames | the Extended Topic and the glossary entry |

The section leans on `weight`, `newtons-second-law`, `newtons-third-law`,
`friction` and `system-of-interest` (4.1 to 4.4), on
`components-from-magnitude-angle` and `resolving-vector` (3.3) and on
`free-body-diagram` (4.1), all of which the coverage rows mark as used where
the text uses them.

## Figures

id · replaces · concepts · what moves · sliders · headline · graph · 3D

- sim-skier · Figure 4.12 · weight-components, normal-force, friction, newtons-second-law · flow by animation and variation: she slides and gathers speed at the rate the slope and friction set · moving · θ (5° to 40°, angle), m (mass), f (0 to 250 N, force) · "After 3.84 s she is 25.0 m down the slope at 13.0 m/s, gaining 3.39 m/s every second" · graph below (v against t) · 2D: the skier drawn with F.silhouette (crouch, phase 0) standing on skis that sit on the slope at every angle; when f ≥ mg sin θ the readout morphs to a static form (f = mg sin θ, a = 0) rather than a negative quotient shown as zero; note cut to the g sin θ fact. No fold or split. Rebuilt from this line on 2026-10-05.
- `fig-bridge` · the photograph of Figure 4.19 (the Golden Gate Bridge),
   **kept**: the text points at it ("such as the chain at the bottom of the
   picture") and it shows the thing the passage is about, a flexible
   connector sagging under its own weight. Its caption and credit line are
   the book's, and its width is the book's 325.

Figure re-examination of 2026-11-17 (Claude Fable 5.2). Each drawn figure was judged against the book's image.

- sim-normal · Figure 4.11 · normal-force, weight · value add: the book's panels (a) and (b) are the two ends of one act, and the caption's "restoring forces grow as it sags until they supply N equal to the weight" is motion the reader has to imagine; here the hand lowers the bag onto the table, the table sags, its push N grows and the hand's force shrinks, the two always adding up to the weight · arrows: symbolic (the forces on the bag) · moving: one slow lowering per loop (the bag comes down, the table takes the weight, the hand lets go), 6 s · m (1 to 30 kg, default 10, mass), k (3,000 to 20,000 N/m, default 4,000, stiffness) · headline: the sag, the table's push and what the hand still holds, live · graph beside: the push of the table against its sag, a line as steep as the table is stiff, the weight a dashed level, the dot climbing to it · 2D
  works: parts: a table in side view (two legs on a floor, a top that bows at its middle against a dashed unloaded level); a sack standing on the top; a hand gripping the sack's neck from above; a free-body diagram of the bag (weight down, N up from the dot, F_hand standing on N's head) · flow: the bag down 46 units to the top, then the top down by the sag with the bag on it, then the hand up and away · must hold: (1) N + F_hand = w at every instant, the two upward arrows together as long as the weight arrow; (2) N = k × sag, so the dot stays on the line and stops on the weight level; (3) the final sag is w/k (10 kg on 4,000 N/m: 98.0 N, 2.45 cm); (4) the sag is drawn at 7 units to the centimetre at every setting, never capped; (5) with reduced motion the figure rests on the book's panel (b), N = w · read off the image: (a) two hands hold a sack marked BOW WOW CHOW above a table, F_hand up and w down, equal; (b) the sack on a table whose top bows down under it, N up and w down, equal; under each a free-body diagram with the same two arrows. The book gives no mass and no stiffness: 10 kg and 4,000 N/m are the figure's.
  Was two still panels with the forces equal in both at every setting, so the sliders changed two numbers.
- sim-skier · Figure 4.12 · kept. It opens on Example 4.5 (60.0 kg, 25.0°, 45.0 N; 3.39 m/s²), moves, and its force diagram is to scale; the held readout now sets its two formulas on two lines and the caption is cut to what to change and what to compare.
- sim-incline · Figure 4.13 · reverted to the book's image. The same resolution with the same angle slider is the right half of sim-skier, 27 lines above it, and its graph (two cosine and sine curves on a 600 N axis) was nearly flat; the book's drawing carries the two equations in it.
- sim-rope · Figure 4.14 · reverted to the book's image. The two sliders changed one number, T = mg, which the text works two lines below.
- sim-corners · Figure 4.15 · reverted to the book's image. The drawing was a cable over two pulleys, neither of the things the book shows (the tendons of a finger, the brake cable of a bicycle), and its sliders changed nothing but a number and one direction.
- sim-tightrope · Figure 4.16 + 4.17 · tension, vector-components, tension-from-perpendicular-force · value add: every force on the point under his feet is drawn to one scale with the weight fixed, so the reader sees each tension lengthen as the wire is pulled straighter while the height it rises through stays at half the weight; the book's two drawings are not to scale and show one angle · arrows: symbolic · still: he stands at rest · θ (4° to 30°, default 5.0° of Example 4.6, angle); the mass slider is gone, since it changed only the numbers · headline: the tension and how many times the weight it is · graph below: tension against sag angle, the weight a dashed level · 2D
  works: parts: two posts; a wire from post to post sagging to the walker at its middle; the walker on the low point; from the point under his feet T_L and T_R along the wire and w straight down; each tension's horizontal part dashed along the level of his feet and its vertical part solid from that level to the arrow's head · must hold: (1) on load 5.0°, w = 686 N, T = 3,935 N (the book rounds to 3900 N), 5.7 times the weight; (2) the wire's angle and the arrows' angle are the slider's; (3) arrows to one scale, w 72 units, T = 72/(2 sin θ) units, the vertical part always 36 units; (4) at 4° the arrow (516 units) still ends short of its post (560); (5) at 30° T = w and the three arrows are equally long; (6) T_Lx = T_Rx and T_Ly + T_Ry = w in the labels · read off the image: 4.16 has posts at both ends, a dashed level between their tops, the wire 5.0° below it on each side, T_L and T_R along the wire from his feet, w down, x and y axes, a small free-body diagram; 4.17 resolves T_L into T_Lx and T_Ly and T_R into T_Rx and T_Ry and draws the four parts and w from one point, with "net F_x = 0; net F_y = 0".
  Was the scene with arrows of arbitrary length, a second diagram with the tensions fixed and the weight shrinking, and a graph squeezed into a corner.
- sim-chain · Figure 4.18 · reverted to the book's image. It was the tightrope again (the same equation, the same angle slider, the same graph) with a car and a tree drawn as outlines; the tightrope figure now carries the idea and the book's drawing shows the scene better.

Photographs: the section has one, Figure 4.19, and it is kept for the reason
above. Nothing else in the section is a photograph, so nothing is dropped.

Figures that serve exercises: four, none of them numbered by the book. The
leg traction drawing goes on both conceptual-question cards, as the book
refers to it from both; the toboggan free-body diagram goes on its AP card
and the kite free-body diagram on its AP card, inside the book's own
solution. Each is carried as the book's own image in the exercise card, which
is what the card's `figure` field is for, rather than redrawn in the text:
none of the four is referred to by the running text, so none of them has a
place in it. (The chapter config had them redrawn as figures of the text;
this is the one place where the section departs from it, and the reader sees
the book's drawing either way.) The fourth, the baby on the spring scale,
belongs to the one problem in the section that the book does not key, so it
is left out with that problem and nothing refers to it.

Extra simulations (rule 15), considered and left:

- The tension in a lift cable, $\kTf = m(\kg + \ka)$, with the lift rising,
  slowing and falling: it would open a view the section does not give, since
  every rope here is static. But apparent weight and the accelerating system
  are 4.7's, and the two items of this section that need it are worked from
  Newton's second law in one line. Left to 4.7.
- A free-body diagram the reader assembles arrow by arrow: it would serve
  this section as well as 4.1 and 4.6, and belongs to none of them, as the
  chapter's exploration says. Left.
- The traction setup of the conceptual questions, with the reader moving the
  pulleys: the question asks what the tension is, and Figure 4.15 already
  shows the same tension carried round corners to a load. Left.

None built.

## Exercises

- No Check Your Understanding box in the section; nothing is inline.
- 6 AP items, `ap1` to `ap6`: the cable raising a 120.0 kg mass (keyed, a
  number), the child pulling a wagon (unkeyed, open with an AI-marked
  approach), the tug-of-war rope that snaps (keyed, a choice), the toboggan
  free-body diagram (unkeyed, kept as an open item with its four options as
  the book prints them and an AI-marked approach, with the book's diagram on
  the card), the kite free-body diagram (keyed, open, with the book's own
  drawing and answer), and the car on the 20º slope pulled by a cable
  (unkeyed, open with an AI-marked approach that says how to work it and
  computes nothing).
- The section's first AP item, the force of gravity on an arrow
  (`fs-id1367314`), is $\kwgt = m\kg$ and nothing more, which is 4.3's
  weight. It goes to 4.3 with `source_section` 4.5, and both sections'
  `exercise_notes` say so.
- 2 conceptual questions, `cq1` and `cq2`, on the leg in traction, Understand,
  with AI-written suggested approaches; both carry the book's traction
  drawing on their cards.
- 3 problems keyed and kept: `p1` (the two tug-of-war teams, multi with the
  acceleration and the tension), `p3` (the spider web, multi with the
  vertical and the horizontal strand), `p5` (show that
  $\kTf = \kFperp/(2\sin\theta)$, open with the book's own derivation).
- 3 problems left out, having no answer in the book's key: `fs-id1600446`
  (the trampoline and the gymnast), `fs-id1914521` (the gymnast climbing a
  rope) and `fs-id2372303` (the baby on the spring scale), the last taking
  its figure with it.
- No generated questions: every node of the section has a book exercise that
  tests it.
- Weights: `ap3` gives `tension` its full value and `newtons-first-law`
  weight 1, since the item turns on what the rope was carrying and only
  names the law; `ap4` gives `weight-components-on-incline` and `friction`
  their full value and `normal-force` weight 1, which the diagram shows but
  the answer does not use; `p1` gives `tension-supports-weight` weight 2,
  since the tension is read off the second law for one team rather than from
  a hanging weight; `cq2` gives `tension` its full value and
  `tension-from-perpendicular-force` weight 2.

## Views

- Formulas: the eight equations of the section already in `chapter.json`,
  the five boxed and named ones important and the two worked steps not.
- Definitions: the thirteen variables of the section; the three glossary
  terms (normal force, tension, inertial frame of reference).
- Concept map: the seven nodes above with their edges into 3.3, 4.1, 4.3 and
  4.4.

## Colour

The page binds force, acceleration, velocity, time and stiffness. Every
figure draws forces (the weight, the normal force, friction, the tension and
the perpendicular push), six of them write $\kg$ into a readout, the skier
carries a velocity graph and states the time in its headline, and the table
of the first figure carries a stiffness on its slider. Mass, the angle of the
incline, the sag angle of a wire and the angle a cable is turned through stay
untyped and in ink, as the chapter config decides.

## Wanted at chapter level

- variables `N` → 4.5-normal-force
- variables `w` → 4.5-normal-force
- variables `m` → 4.5-normal-force
- variables `g` → 4.5-normal-force
- variables `w_par` → 4.5-weight-on-incline
- variables `w_perp` → 4.5-weight-on-incline
- variables `f_fric` → 4.5-weight-on-incline
- variables `a_par` → 4.5-weight-on-incline
- variables `θ` → 4.5-weight-on-incline
- variables `T_force` → 4.5-tension
- variables `T_L` → 4.5-tightrope
- variables `T_R` → 4.5-tightrope
- variables `F_perp` → 4.5-large-tension
- equations `eq-normal` → 4.5-normal-force
- equations `eq-w-parallel` → 4.5-weight-on-incline
- equations `eq-w-perp` → 4.5-weight-on-incline
- equations `eq-a-incline` → 4.5-weight-on-incline
- equations `eq-a-incline-friction` → 4.5-weight-on-incline
- equations `eq-tension-weight` → 4.5-tension
- equations `eq-tension-sag` → 4.5-tightrope
- equations `eq-tension-perp` → 4.5-large-tension
- book.json symbols: add `F_hand`, latex `F_{\text{hand}}`, type `force`,
  macro `\kFhand`. The book labels the hand's upward force that way in
  Figure 4.11 and its caption, and the text sets it in plain ink LaTeX
  until the row is there.
- book.json symbols: add `F_netpar`, latex `F_{\text{net}\,\parallel}`,
  type `force`, macro `\kFnetpar`. The chapter has `F_net`, `F_netx` and
  `F_nety`, and Example 4.5 writes the net force along the slope six
  times; the text sets it in plain ink LaTeX until the row is there.

### The chapter pass decided

The thirteen variable anchors and the eight equation anchors are written.

Both symbol rows this plan asked for are merged into `book.json` and applied
in the text: `F_hand` (`F_{\text{hand}}`, force, `\kFhand`) and `F_netpar`
(`F_{\text{net}\,\parallel}`, force, `\kFnetpar`).

`inertial-frame` stays here, at 4.5, where the book prints it.

The `draws` of `sim-tightrope` no longer lists `acceleration`. The figure
colours force and nothing else; the page still binds acceleration, because
the skier, the incline and the rope all draw it.

Every `º` in the section's text, figures and rows is now the degree sign `°`.

## Derivations

- Example 4.5 (a), the acceleration down a frictionless incline, and the discussion's general $a = g\sin\theta$ · score 2 · not built: a worked example at 25° whose general result the discussion states without working
- Resolving Weight into Components (note after Example 4.5) · score 2 · built as drv-weight-components: two nodes, $w_\perp$ and $w_\parallel$ from the right triangle of the weight vectors, each with the skipped $w_\perp = w\cos\theta$ line inserted; replaces the note's two closing blocks, the formulas the note states first stay
- Tension equals weight for a rope holding a mass at rest ('as we can prove using Newton's second law') · score 1 · built as drv-rope-tension: a printed proof, one node; replaces the two displays and the sign-convention sentence between them, which becomes a fact
- Example 4.6, What Is the Tension in a Tightrope? · score 3 · built as drv-tightrope-tension: the settled sandbox record in this book's macros (three nodes, horizontal and vertical lines joined, numbers last); every line is printed and the score is under the hidden bar, but the example works in symbols to $T = w/(2\sin\theta)$, which Creating a large tension prints as a general formula; replaces the solution's lines, the general formula there stays
