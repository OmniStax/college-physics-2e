# Plan: 4.4 Newton’s Third Law of Motion: Symmetry in Forces (m42074)

Source: `source.md` (converted from CNXML). Status: built 2026-09-11 without a
review stop, on Chen’s instruction to finish the book in one job.

The section that turns a single push into a pair of forces and then makes the
reader choose which body the pair acts on. Two sketch figures (4.9 the swimmer,
4.10 the professor and her cart), no photograph, one boxed note stating the law,
two worked examples on the same drawing, a PhET note that is dropped per the
chapter config, eleven AP items, six conceptual questions and two problems, one
of them keyed. One page (rule 11).

## Sub-concepts (page headers)

The book prints no titled sub-headers here, only the run of the argument: the
law, the swimmer, the everyday examples, and the two examples worked on one
drawing. Page structure, one block per idea:

1. `third-law` **Newton’s third law of motion** (book: the broken bats of
   Mariano Rivera, the boxed statement of the law, the paragraph on symmetry in
   nature and on “action-reaction”). The glossary term *Newton’s third law of
   motion* belongs here.
2. `different-systems` **Why the two forces do not cancel** (book: the swimmer
   pushing off the wall, the two systems that could be investigated, and why
   $\kF_{\text{feet on wall}}$ does not cancel $\kF_{\text{wall on feet}}$;
   Figure 4.9).
3. `thrust` **Thrust and other reaction forces** (book: the walking professor,
   the car’s drive wheels, the rocket and the definition of thrust, the
   helicopter, the bird, the octopus and the boxer). The glossary term *thrust*
   belongs here.
4. `choosing-a-system` **Choosing the system of interest** (book: Example 4.3,
   the acceleration of the professor, cart and equipment taken as System 1, with
   Figure 4.10 inside it; Example 4.4, the force on the cart with System 2; the
   discussion that internal forces cancel). The section’s six variables and its
   two equations anchor here.

Cross references to other sections are plain text; this section makes none. The
book’s ${\text{F}}_{\text{wall on feet}}$, ${\text{F}}_{\text{feet on wall}}$,
${\text{F}}_{\text{foot}}$ and ${\text{F}}_{\text{cart}}$ are written as the
force $\kF$ with the book’s descriptive subscript, so they wear the force hue
without four symbol rows of their own for names the book spells out in words;
$\kFprof$, $\kFfloor$, $\kFnet$ and $\kff$ have rows and macros already. The
buoyant force $\text{BF}$ of Figure 4.9’s caption is named once and stays in
ink.

Learning objectives, section summary and glossary come out of the running text
into the views. One conceptual question is placed inline, as the chapter config
allows where an item is plainly an Understand check; the rest of the exercises
go to the Exercises document.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| newtons-third-law | result | third-law | the boxed law; AP items on the ball and the ceiling, the Earth and the Moon, the skaters; CQ 4 and 6 |
| action-reaction-pairs | idea | different-systems | the swimmer of Figure 4.9; CQ 3, 5 and 6; the AP items on the skaters and on the wheelbarrow |
| internal-forces-cancel | result | choosing-a-system | Examples 4.3 and 4.4 and their discussions; CQ 6; the AP items on the water-skiers and the figure skaters; problem 1 |
| thrust | idea | thrust | the rocket paragraph and the glossary; CQ 4 on the recoilless rifle |

The section leans on `force`, `external-force` and `free-body-diagram` (4.1),
`newtons-first-law` and `mass` (4.2), and `system-of-interest`,
`net-external-force`, `newtons-second-law`, `weight` and `friction` (4.3); the
coverage rows mark each as used where the text uses it.

## Figures

id · replaces · concepts · what moves · sliders · headline · graph · 3D

1. `sim-swimmer` · Figure 4.9 · newtons-third-law, action-reaction-pairs, system-of-interest,
   external-force · value add: variation by choice (which body is the system decides which force
   of the pair enters the free-body diagram) and flow by animation (the push, the release) ·
   arrows: symbolic force arrows, kinematic $\ka$ and $\kv$ · moving: she pushes through the
   0.50 m her legs straighten, then glides 1.2 m · choice system (the swimmer, the wall), $\kF$
   (force, 100 to 600 N, default 350), $\km$ (mass, 40 to 90 kg, default 60) · headline "Of the
   pair, only F_wall on feet acts on her, and its 350 N accelerate her away from the wall" · no
   graph: the free-body diagram of the chosen system stands beside the scene, as the book sets it ·
   2D.
   works: parts: the wall on the right, the swimmer face down with her feet on it and her arms
   ahead, the dashed system boundary round her (or round the wall), the pair of arrows meeting at
   her feet (F_wall on feet over her legs pointing away from the wall, F_feet on wall inside the
   wall), the free-body diagram at the right with BF up, w down and F_wall on feet · flow: her hip
   moves away from the wall as the legs straighten, then the whole body glides · must hold: the two
   arrows of the pair are equal at every push and share one line; scene and free-body diagram use
   one force scale (0.2 unit/N), so BF = w = mg is to scale beside the push; only the force on the
   chosen system is solid, the other is faint; the swimmer's diagram never shows F_feet on wall;
   after release neither force is drawn and a = 0; v = a·t while pushing with t from 0.50 m =
   ½at² · read off the image: labels "System of interest", "Direction of acceleration",
   F_wall on feet, F_feet on wall, BF, w, "Free-body Diagram"; the book gives no numbers, so 350 N
   and 60 kg are ours. The wall's diagram adds a force the book does not name, the hold of the rest
   of the pool on the wall (F_pool on wall), which is why the wall stays put; it shows the
   horizontal forces only and says so in its title.
   Rebuilt in the figure pass of 2026-11-17 (Claude Fable 5.2): the earlier figure opened on a
   small silhouette in a blank band, spent its sliders on kinematics and a v–t graph, and never let
   the reader take the wall as the system, which is the point of the paragraph. The push-time
   slider and the graph are gone.
2. `sim-cart` · Figure 4.10 · internal-forces-cancel, action-reaction-pairs, system-of-interest ·
   value add: variation by choice and slider (the same five forces, three systems, three free-body
   diagrams, one acceleration) · arrows: symbolic · still: the lesson is which forces count, and
   nothing in it has a clock (the earlier walk across the room kept the forces unlabelled) · choice
   system (System 1, System 2, the professor), $\kFfloor$ (force, 100 to 250 N, default 150),
   $\kff$ (force, 0 to 60 N, default 24.0), mass of the cart and equipment (mass, 5 to 60 kg,
   default 19.0); her mass is the book's 65.0 kg · headline "F_prof and F_cart are inside System 1
   and cancel, and F_foot acts on the floor: only F_floor and f are left" · no graph: the free-body
   diagram of the chosen system beside the scene, with the net force drawn apart from the forces it
   sums and the acceleration under it · 2D.
   works: parts: the professor leaning into the cart's handle, the cart with two shelves of
   equipment on wheels, the floor; F_foot (on the floor, backward) and F_floor (on her, forward)
   from her feet; F_cart (on her, backward) and F_prof (on the cart, forward) from her hands on the
   handle; f on the cart's wheel, backward; the dashed boundary of the chosen system · flow: none ·
   must hold: every force 1.2 units/N on the scene and in the diagram (f too, which the book could
   not draw to scale); each pair equal and on one line; only forces acting on the chosen system from
   outside are solid and only those are in its diagram (System 1: F_floor, f; System 2: F_prof, f;
   the professor: F_floor, F_cart); opening state a = 126 N / 84.0 kg = 1.50 m/s² and
   F_prof = (19.0 kg)(1.50 m/s²) + 24.0 N = 52.5 N (the book rounds to 53 N); the acceleration is
   the same for all three systems; N and w are drawn equal and marked not to scale · read off the
   image: F_foot, F_floor, F_cart, F_prof, f, System 1, System 2, the diagrams' N, w, N′, w′; the
   third system, the professor alone, is ours and follows the example's last discussion ("some of
   it accelerates the professor"): (150 − 52.5) N / 65.0 kg = 1.50 m/s².
   Rebuilt in the figure pass of 2026-11-17 (Claude Fable 5.2).
3. `sim-rocket` · Sim, replaces nothing · thrust, newtons-third-law · value add: flow by animation
   and variation by slider (gas is really thrown backward; the force on it follows from how much
   leaves and how fast, and the thrust equals it) · arrows: symbolic pair, kinematic $\kv$ · moving:
   a 4 s burn, the view riding with the rocket · mass of gas each second (mass, 2 to 6 kg, default
   4), speed of the gas (velocity, 1500 to 3500 m/s, default 2500), mass of the rocket (mass, 800
   to 3000 kg, default 1200) · headline "After 1.80 s the engine has thrown 7.2 kg of gas backward,
   and the rocket has gained 15.0 m/s" · no graph · 2D.
   Physics checked: the engine takes each lump (ṁ·0.2 s) from rest relative to the rocket to the
   exhaust speed in 0.2 s, so F = mΔv/Δt = (0.80 kg)(2500 m/s)/(0.2 s) = 10 000 N, and the thrust
   is equal; a = 10 000 N / 1200 kg = 8.33 m/s². The rocket's mass is held constant (it loses at
   most 24 kg of 800 kg in the burn, 3%). No ground and no air are drawn, which is the text's
   point about the misconception.
   Rebuilt in the figure pass of 2026-11-17 (Claude Fable 5.2): the earlier Sim set the force
   itself on a slider and plotted v against t, which 4.3 already does; the gas was three lines.

No photograph in the section, so none is kept or dropped. The free-body diagram
the book prints inside the answer to the balloon AP item (`Figure_04_04_03.jpg`,
unnumbered) is copied over as the book prints it and carried inside that item’s
solution, as Chapter 2 carried the graphs of its keyed answers; it is not a row
of the figures table, since it belongs to an answer rather than to the text.

Extra simulations (rule 15), considered and left:

- Two figure skaters pushing apart, equal forces giving unequal accelerations.
  It opens a real view, but the AP item it would serve turns on why the skater
  who pushes does not move, which is friction, and the book does not introduce a
  coefficient of friction until 5.1, so anything the figure said about it would
  be invented. Left.
- A tug-of-war with the rope’s two tensions. It is the same pair of forces the
  swimmer already draws, and tension is 4.5’s. Left.
- A parachutist with the gravitational force and the air resistance drawn
  against each other, from the keyed AP item. It is second-law arithmetic, which
  4.3’s figures already carry, and nothing in it is a third-law pair. Left.

One built (`sim-rocket`), and it is built as a required figure for the `thrust`
node rather than as an extra.

## Exercises

- Inline: `cq3` (fs-id2846557, describe a situation in which one system exerts a
  force on another and experiences one in return, and say which laws apply) is
  plainly an Understand check on the law itself, so it is placed after the
  `third-law` span, as the chapter config allows. The chapter’s one Check Your
  Understanding box is in 4.2, so nothing else is inline.
- 6 conceptual questions, `cq1` to `cq6`, none keyed by the book, each an open
  item with an AI-marked suggested approach: the jet seat, the
  ballistocardiograph, the pair of forces, the recoilless rifle, the football
  lineman and the choice of system.
- 11 AP items, `ap1` to `ap11`, in the book’s order. Six are keyed: `ap1` (the
  forces on a kicked ball, a jumping dolphin and a parachutist, open), `ap3`
  (which statement is true, a choice item keyed (c)), `ap5` (the balloon in the
  current and the wind, open, with the book’s free-body diagram in the answer),
  `ap7` (the parachutist’s speed after 10 s, a number with the book’s worked
  solution), `ap9` (the wheelbarrow on the hill, open) and `ap11` (the figure
  skaters’ acceleration, a number with the book’s worked solution). Five are
  unkeyed and are kept as open items with their options as the book prints them
  and an AI-marked approach: `ap2` (the ball and the gym ceiling), `ap4` (why
  skater A does not move), `ap6` (the object on the icy surface), `ap8` (the
  flight attendant’s cart) and `ap10` (the two water-skiers). The parachutist,
  the water-skiers and the figure skaters are second-law arithmetic set in a
  third-law situation, and each names the pair of bodies before it divides, so
  they stay here, as the chapter’s exploration decided.
- 2 problems: `p1` (fs-id1740619, the artillery shell and the force back on the
  ship) is keyed and kept as a multi answer; problem 2 (fs-id2300721, the rugby
  players) has no answer in the book’s key and is left out and named.
- Nothing is held for another section, and nothing is taken from another
  section. 4.5’s AP item on the child and the wagon and its item on the tug of
  war both name pairs of forces, but each is stated in terms of the normal
  force, the tension and the friction that 4.5 introduces, so they stay with
  4.5.
- No generated questions: every node of the section has a book exercise.
- Weights: where an exercise leans on one concept and merely touches another,
  the touched one takes weight 2. `cq1` gives `newtons-first-law` 2, `cq4`
  gives `newtons-third-law` 2 beside `thrust` at full value, `cq5` gives
  `newtons-third-law` 2, `cq6` gives `action-reaction-pairs` 2; `ap2` gives
  `weight` 2, `ap4` gives `net-external-force` 2, `ap5` gives
  `newtons-second-law` 2, `ap6` gives `newtons-second-law` 2, `ap7` gives
  `weight` and `v-from-at` 2, `ap8` gives `reference-frame` 2, `ap9` gives
  `free-body-diagram` 2, `ap10` and `ap11` give `system-of-interest` 2, and
  `p1` gives `action-reaction-pairs` 2.

## Views

- Formulas: the two equations of the section already in `chapter.json`, both of
  them steps of the worked examples and so not important.
- Definitions: the six variables of the section; the two glossary terms.
- Concept map: the four nodes above with their edges into 4.1, 4.3 and 4.2.

## Colour

The page binds force, acceleration, velocity, time and mass. Every figure draws its forces as
arrows in the force hue; a force that does not act on the chosen system is the same hue, faint.
The swimmer and the rocket draw the acceleration or the velocity the force produces, the cart
the acceleration of the chosen system. Bodies wear their referent colours.

## Wanted at chapter level

- variables `F_net` → 4.4-choosing-a-system
- variables `F_floor` → 4.4-choosing-a-system
- variables `F_prof` → 4.4-choosing-a-system
- variables `f_fric` → 4.4-choosing-a-system
- variables `m` → 4.4-choosing-a-system
- variables `a` → 4.4-choosing-a-system
- equations `eq-fnet-floor` → 4.4-choosing-a-system
- equations `eq-fprof` → 4.4-choosing-a-system
- No new symbol row is wanted. The four forces the book names in words
  ($\kF_{\text{feet on wall}}$, $\kF_{\text{wall on feet}}$,
  $\kF_{\text{foot}}$, $\kF_{\text{cart}}$) are written as $\kF$ with the book’s
  subscript and already wear the force hue; should the chapter pass prefer rows
  of their own, the four places they are written are in `different-systems` and
  in Example 4.3.

### The chapter pass decided

The six variable anchors and the two equation anchors are written.

No symbol row is added for the four forces the book names in words. They are
written $\kF$ with the book's own subscript, so they already wear the force
hue, and a row apiece would add four symbols that the book never sets as
symbols of its own. The section is unchanged.
