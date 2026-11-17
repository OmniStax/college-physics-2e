# Plan: 4.3 Newton’s Second Law of Motion: Concept of a System (m42073)

Source: `source.md` (converted from CNXML). Status: built today, 2026-09-11,
without a review stop, on Chen’s instruction to finish the book in one job.

The section where the chapter stops naming forces and starts calculating with
them. Four sketch figures (4.5 to 4.8), no photograph, four boxed notes
(Newton’s Second Law of Motion, Weight, Common Misconceptions: Mass vs.
Weight, Take-Home Experiment: Mass and Weight), two worked examples, no Check
Your Understanding box, ten conceptual questions and fourteen problems, six of
them keyed. Three items come here from other sections under rule 12. One page
(rule 11).

## Sub-concepts (page headers)

The book’s own headers are Units of Force and Weight and the Gravitational
Force; the rest of the run is untitled. Page structure, one block per idea:

1. `system` **The system of interest and its external forces** (book: the
   opening paragraph on the second law; a change in motion is a change in
   velocity, so a net external force causes acceleration; what an external
   force is, what an internal force is, and why the boundaries of the system
   have to be drawn first; Figure 4.5). The variable $\ka$ anchors here.
2. `net-force` **The net external force, and the two proportionalities**
   (book: acceleration is directly proportional to the net external force,
   the vertical forces $\kwgt$ and $\kN$ that cancel, the definition of
   friction, the proportionality $\ka \propto \kFnet$ and the definition of
   the net external force as a vector sum found head to tail or by
   components; then acceleration is inversely proportional to mass, Figure
   4.6, and $\ka \propto 1/m$). $\kFnet$, $\kff$, $\kN$ and $m$ anchor here,
   with eq-a-prop-fnet and eq-a-prop-mass.
3. `second-law` **Newton’s second law of motion** (book: combining the two
   proportionalities; the boxed law in its three forms; the paragraph on the
   law as a cause and effect relationship verified by experiment).
   eq-newton2-a, eq-newton2 and eq-newton2-mag anchor here.
4. `newton` **Units of force** (book: the section’s own header; the newton
   defined from $\kFnet = m\ka$; the pound). eq-newton-unit anchors here.
5. `weight` **Weight and the gravitational force** (book: the section’s own
   header; the weight of a falling object, the boxed Weight note with $\kwgt
   = m\kg$ and the 1.0 kg object, free-fall, the variation of $\kg$ over the
   Earth and on the Moon, and the broadest definition of weight). $\kwgt$,
   $\kg$ and eq-weight anchor here.
6. `mass-weight` **Mass against weight** (book: the paragraph that sets the
   two apart, the Common Misconceptions box and the Take-Home Experiment on
   bathroom scales).
7. `mower` **Finding the acceleration from the net force** (book: Example
   4.1, the lawn mower, with Figure 4.7 inside it). The example is
   `ex-mower`.
8. `sled` **Finding the force from the acceleration** (book: Example 4.2, the
   rocket sled, with Figure 4.8 inside it, and the closing paragraph on the
   second law as more than a definition). The example is `ex-sled`, and
   $\kTf$ anchors here.

The cross reference to Two-Dimensional Kinematics is plain text, since the
app links only figure numbers. The book’s bold vectors $\mathbf{a}$ and
$\mathbf{F}_{\text{net}}$ are set bold in ink where the book sets them bold
and take the `\k` macros where it writes their magnitudes.

Learning objectives, the section summary and the glossary come out of the
running text into the views. Two short conceptual questions are placed
inline, as the chapter config allows; everything else goes to the Exercises
document.

## Concept nodes (already in book.json)

| id | kind | introduced at | evidence |
|---|---|---|---|
| system-of-interest | skill | `system` | the definition of a system by its boundaries; Figure 4.5 worked both ways; cq3; p9 part (a) |
| net-external-force | idea | `net-force` | the definition and the vector sum; Figure 4.5(b); Example 4.2; p1, p3, ap1 |
| friction | idea | `net-force` | the definition of friction; Figure 4.5; Example 4.2; p7, p9 |
| newtons-second-law | result, eq-newton2 | `second-law` | the boxed law; Examples 4.1 and 4.2; p1, p3, p7, p9, p11, ct1 |
| newton-unit | idea, eq-newton-unit | `newton` | the definition of the newton; the unit substitution in Example 4.1; every problem set in newtons |
| weight | result, eq-weight | `weight` | the boxed derivation; 9.8 N on Earth and 1.7 N on the Moon; p11, p13, ap2 |
| mass-versus-weight | idea | `mass-weight` | the Common Misconceptions box and the Take-Home Experiment; p13; ap2 |

The section leans on `newtons-first-law` and `mass` (4.2), `external-force`
and `force` (4.1), `head-to-tail-method` (3.2), `analytical-vector-addition`
(3.3), `acceleration` (2.4), `acceleration-due-to-gravity` and `free-fall`
(2.7) and `fundamental-units` (1.2); the coverage rows mark each as used
where the text uses it.

## Figures

id · replaces or Sim · concepts · what moves or still · sliders · headline ·
graph · 3D

- sim-sled · Figure 4.8 · net-external-force, system-of-interest,
   free-body-diagram · standardisation and a story: the picture of the sled
   bends into its free-body diagram, and the acceleration against rockets
   burning sits beside · still with one story slider (picture to diagram) · T
   (5000 to 40000 N, force), rockets burning (a row of buttons, 1 to 4), f (0 to 2000
   N, force) · "Four rockets of 25,900 N against 650 N of friction give the
   2,100 kg sled 49.0 m/s²" · graph beside, its box placed clear of the
   longest 4T arrow at T max · 2D: the rider drawn with F.silhouette (sit) on
   the platform, the flames as the plan's flame shape, f, w and N placed
   through F.labeller off the wheels with N rising from the rail's top face.
   No fold or split.

Every book figure of the section is a sketch. Figure 4.7 stays the book's
image and the others are replaced. The section has no photograph to keep or
drop.

Figures that serve exercises, kept on the exercise cards as the book’s own
images rather than redrawn, since they sit inside the problems rather than
in the running text, as the five diagrams inside the exercises of 3.2
are: the rocket sled with one rocket burning (`Figure_04_03_05-1144.jpg`, on
p7), the rocket sled with the rockets off (`Figure_04_03_07-c153.jpg`, on
p11), the free-body diagram the book prints in the answer to the wagon
problem (`Figure_04_03_06.jpg`, inside p9’s solution), and, travelling with
the items taken from other sections, the racetrack and the two tracks to draw
on (`Figure_04_01_03.jpg` and `Figure_04_01_04.jpg`, on ap1, with the book’s
answer figure `Figure_04_01_05.jpg` inside its solution) and the graph the
book prints in the answer to the Critical Thinking item
(`OSX_CP2e_Figure_04_08Sol_CTQ01c.jpg`, inside ct1’s solution). All are copied
once into `media/ch04/`; `Figure_04_03_07-c153.jpg` serves two of the book’s
problems, but the other one (fs-id1995657, the sled decelerated at 196 m/s²)
has no keyed answer and is left out, so the one copy rides on one card. The
two bundle files with a space in their names are copied with an underscore,
as Chapter 2 copied one.

Extra simulations (rule 15), considered and judged:

- **The weight of a mass on Earth and on the Moon** (`sim-weight` above).
  The section states that a 1.0 kg mass weighs 9.8 N on Earth and about
  1.7 N on the Moon, sets mass against weight twice over, and prints no
  figure for any of it; a scale the reader can carry to another body shows
  the mass staying put while the weight changes, which no other figure of
  the page shows. **Built.**
- A free-fall sim in which the only force is the weight, so $\kFnet = \kwgt$
  and $\ka = \kg$: the falling object is 2.7’s picture and `sim-weight`
  already writes $\kwgt = m\kg$ in its readout. **Left.**
- A system boundary the reader drags around the wagon, the child or both, so
  that the list of external forces changes as the boundary moves: this is the
  section’s own skill, but the boundary that excludes the child needs the
  internal forces that 4.4 introduces, so anything drawn would run ahead of
  the book. **Left**, and the chapter’s `exploration.md` already holds a
  free-body diagram the reader builds for a later pass.

One built, two left. Of the four drawn figures the wagon moves, the sled
has a story slider, and `sim-mass` and `sim-weight` are still by the test
of rule 14.
Figure re-examination of 2026-11-16 (Claude Fable 5.2), each drawing judged against the book's image:

- `sim-wagon` · Figure 4.5 · rebuilt. The scene was small on a long ruled strip and the graph was speed against time, which is Chapter 2's. Now the wagon stays in the frame and the ground's meter marks run back under it, so the bodies and the forces on them are large; beneath, the free-body diagram, the sum laid head to tail as the book's part (b) draws it (the friction back from the tip of the two pushes, the net force from the dot to where it ends), and the acceleration against the net force, the proportionality the text writes beside this figure. The mass slider is gone: the book's caption is "different forces on the same mass", and Figure 4.6 owns the mass.
  works: parts (two children behind the wagon, hands on its back; the rider in the bed; four forces on the system: F₁ and F₂ from the back of the bed, f at the front wheel pointing back, w and N vertical; the diagram's dot with F₁ and F₂ collinear, f, N, w; F_net) · flow (the wagon rolls right from rest, gaining speed at a) · must hold (F_net = F₁ + F₂ − f and the sum row ends where F_net ends; every horizontal force at 5 units to the newton on scene and diagram; w = N = 294 N, too long for that scale, drawn with a break; the graph's point sits on a = F_net/30.0 kg; at rest the friction equals the pushes and F_net = 0; the opening case stays as a hollow point so a′ > a is seen) · read off the image (labels F₁, F₂, f, w, N, a, F_net, "Free-body diagram"; no numbers in the book, so 25 N, 30 N, 12 N and 30.0 kg are ours; the alt text calls the pushers girls and puts F₁ "on the boy", the image has both pushes on the wagon)
- `sim-mass` · Figure 4.6 · rebuilt. The player was a stick, the SUV a small sedan, and a third of the stage went to part (c) repeating the two arrows. Now two large scenes with the same arrow over each, the book's own names m₁, a₁, m₂, a₂, and the graph with one step drawn on its line: ten times the mass, a tenth of the acceleration. The readout gives both accelerations, one line each.
  works: read off the image (m₁ with the ball, m₂ with the SUV, a₁ long and a₂ short, F the same length on both, "The free-body diagrams for both objects are the same"; no numbers in the book: 200 N, 0.624 kg and 1,800 kg are ours) · must hold (the two F arrows are the same length; both points sit on a = F/m; the step's two legs are one decade each)
- `sim-mower` · Figure 4.7 · reverted to the book's image. A mower rolling from rest under a net force is what the rebuilt Figure 4.5 already shows, and the book's drawing is the better picture; Example 4.1's arithmetic is in the text beside it.
- `sim-sled` · Figure 4.8 · kept and repaired. The story from picture to free-body diagram is the house move (manim-style 2) and stays; the sled was an L-shaped block and is redrawn from the book's image, the friction is at the nose as the book has it, the readout is one chain that ends on the acceleration Example 4.2 starts from, and the count is a row of buttons.
  works: parts (rocket block of four nozzles at the back, fin, canopy with the rider, long nose, skids on the rail; four thrusts T into the back, f at the nose pointing back, N up and w down under the middle) · must hold (4T − f = ma gives 49.0 m/s² at 25,900 N, 650 N, 2,100 kg; one rocket gives 12.0 m/s², less than a quarter of 49.0; T, w and N on one scale, f larger than scale as the book says) · read off the image (labels T ×4, f, N, w, a, "Free-body diagram"; numbers from Example 4.2)
- `sim-weight` · Sim · rebuilt. One small box on a scale with a graph of w against g did not show the comparison the text makes. Now the same block stands on the same scale on Earth and at a second place the slider sets, opening on the Moon: equal masses, weight arrows to one scale, and two dials that answer the Take-Home Experiment's question. The readout adds the dial's own division by 9.80 m/s².
  works: must hold (the block is the same size and reads the same mass in both panels; w = mg in each; arrows at 8 units to the newton; the dial reads w/9.80 m/s², so 1.00 kg on Earth and 0.166 kg on the Moon for 1.0 kg) · read off the text (1.0 kg, 9.80 m/s², 1.625 m/s², 9.8 N; the book rounds the Moon's weight to "about 1.7 N", and 1.0 kg × 1.625 m/s² is 1.63 N, which is what the figure prints)

## Exercises

- No Check Your Understanding box in the section. Two short conceptual
  questions are placed inline where they plainly check the passage beside
  them: `cq6` (fs-id1449832, the net external force on a rock at the top of
  its trajectory) after `weight`, and `cq9` (fs-id3180550, what a constant
  nonzero force does to velocity and acceleration) after `second-law`.
- 10 conceptual questions, `cq1` to `cq10`, Understand, none keyed by the
  book, each with an AI-marked suggested approach and a `cite` to the
  passage it turns on.
- 6 problems keyed and kept: `p1` (fs-id2025052, the sprinter, 265 N), `p3`
  (fs-id1947422, the laundry cart, 13.3 m/s²), `p7` (fs-id2673239, one rocket
  burning, 12 m/s², with the book’s reason for part (b) in the solution),
  `p9` (fs-id2963161, two children pushing a wagon, the acceleration with
  12.0 N and with 15.0 N of friction, with the book’s free-body diagram in
  the solution), `p11` (fs-id3091858, the force the seat exerts on the
  passenger), `p13` (fs-id3244376, the astronaut on the Moon).
- 8 problems left out, having no answer in the book’s key: fs-id3046116 (the
  sprinter’s time), fs-id1829025 (the astronaut’s mass in orbit),
  fs-id2052918 (the force on the mower), fs-id1995657 (the sled decelerated
  at 196 m/s²), fs-id2409301 (the deceleration from 1000 km/h), fs-id2687795
  (the motorcycle), fs-id1849611 (the passenger under deceleration) and
  fs-id1418924 (the lunar module).
- 3 items taken from other sections under rule 12, each named in both
  sections’ `exercise_notes`:
  - `ap1` (fs-id1691415, `source_section` 4.1): the two cars on the
    racetrack, which asks for the direction of the net external force at
    points around the track. Net external force is this section’s, and the
    item is keyed, so it comes here with the book’s answer. Analyze; tagged
    `net-external-force` at full value and `newtons-first-law` at weight 2.
    Its curved sections anticipate the centripetal force of Chapter 6, and
    the book’s own answer argues the straight sections, so it stands as the
    book prints it.
  - `ap2` (fs-id1367314, `source_section` 4.5): the force of gravity on an
    arrow, which is $\kwgt = m\kg$ and nothing else. Unkeyed, so it is kept
    as an open item with its four options as the book prints them and an
    AI-marked suggested approach, as rule 13 and the 2.5 and 3.1 precedents
    do. Apply; tagged `weight` at full value and `mass-versus-weight` at
    weight 1.
  - `ct1` (exer-16012, `source_section` 4.8): the Critical Thinking item on
    two boxes pushed different distances, which turns on the second law and
    on $\kv^2 = \kvo^2 + 2\ka\kdx$ rather than on the four basic forces. It
    is keyed, and the book’s graph travels with the answer. Analyze, tagged
    `Critical Thinking`; `newtons-second-law` at full value,
    `net-external-force` at weight 2 and `v-squared` at weight 2.
- No generated questions: every node of the section has a book exercise.
- Weights (rule 20): `cq1`, `cq2`, `cq4`, `cq5` and `cq8` give
  `newtons-first-law` weight 1, since they lean on the second law and only
  name the first; `p1` and `p3` are the second law alone; `p7` gives
  `friction` weight 2 beside the full value for `newtons-second-law`, since
  part (b) is entirely about friction not scaling with the thrust; `p9`
  gives `system-of-interest` full value beside `newtons-second-law`, since
  part (a) asks for the system before anything is calculated; `p11` gives
  `weight` weight 2, since the ratio to the passenger’s weight is one step of
  a longer problem; `p13` gives `mass-versus-weight` full value and `weight`
  full value, since the question is exactly the difference between them.

## Views

- Formulas: the seven equations of the section already in `chapter.json`,
  the second law in its two vector forms, the newton and the weight
  important, the two proportionalities and the magnitude-only form not.
- Definitions: the eight variables of the section; the seven glossary terms.
- Concept map: the seven nodes above with their edges into 1.2, 2.4, 2.7,
  3.2, 3.3, 4.1 and 4.2.

## Colour

The page binds force, acceleration, velocity, position and time. Every figure
draws forces and an acceleration; `sim-wagon`, `sim-mower` and `sim-sled`
draw a velocity arrow and `sim-wagon` a $\kv$–$\kt$ graph whose time axis is
coloured; `sim-mower` brackets the distance the mower covers. Mass, the
number of rockets burning, the angles of the free-body diagrams and the
lengths of the scenes stay untyped and in ink, as Plan.md decided.

## Wanted at chapter level

- variables `a` → 4.3-system
- variables `F_net` → 4.3-net-force
- variables `f_fric` → 4.3-net-force
- variables `N` → 4.3-net-force
- variables `m` → 4.3-net-force
- variables `w` → 4.3-weight
- variables `g` → 4.3-weight
- variables `T_force` → 4.3-sled
- equations `eq-a-prop-fnet` → 4.3-net-force
- equations `eq-a-prop-mass` → 4.3-net-force
- equations `eq-newton2-a` → 4.3-second-law
- equations `eq-newton2` → 4.3-second-law
- equations `eq-newton2-mag` → 4.3-second-law
- equations `eq-newton-unit` → 4.3-newton
- equations `eq-weight` → 4.3-weight
- The glossary row for `friction` reads “a force past each other of objects
  that are touching”, which drops the word the book’s own sentence carries.
  The section’s text has the full sentence, “a force that opposes the motion
  past each other of objects that are touching”; the glossary row is the
  book’s own wording in the CNXML `<definition>`, so it is left as it is and
  named here in case the chapter pass would rather match the text.
- The `T_force` variable row’s meaning is written for this section (“the
  thrust of one rocket of the four-rocket propulsion system”); 4.5 gives the
  same symbol its tension meaning in a row of its own, so nothing is wanted
  beyond the anchor.
- equations `eq-newton2-a`: its `ktex`, `\mathbf{a} = \frac{\kFnet}{m}`, sets
  a bold ink vector beside a coloured symbol, which reads as two conventions
  in one line. The text prints both vector forms of the law in bold ink, as
  the book prints them, and the magnitude form with the macros, so the sheet
  would read better with the `ktex` dropped from `eq-newton2-a` and kept on
  `eq-newton2` and `eq-newton2-mag`. Either way the section is unaffected.

### The chapter pass decided

The eight variable anchors and the seven equation anchors are written.

The `ktex` of `eq-newton2-a` is dropped, as this plan proposed. It set a bold
ink vector beside a coloured symbol, which is two conventions in one line; the
vector forms of the law now stand in the book's bold ink on the formula sheet,
and `eq-newton2-mag`, the magnitude form, carries the macros.

The glossary row for `friction` is repaired. The book's own `<definition>`
reads "a force past each other of objects that are touching", which is missing
the words that make it a definition; the book's summary of this same section
prints them, "a force that opposes the motion past each other of objects that
are touching", and that sentence is now the row. No word is invented: the
repair is the book's own wording from three pages later.

The `T_force` row keeps the thrust meaning this section gives it, and 4.5's
row of the same symbol keeps the tension meaning, as the plan asked.

## Manim duplicates

- `sim-sled-morph` · layer B (morph) of `sim-sled` · value add: the move Figure 4.8 asks for, made in front of the reader. One story slider, picture → free-body diagram (0 to 1, played by F.story): the rail, rider, wheels and flames fade over 0 to 0.3; the silhouette of platform and rocket column bends point by point into a dot over 0.2 to 0.55; over 0.5 to 1 the dot travels to the diagram and every force re-roots its tail on it (thrusts head to tail, f, and N and w ending equal and opposite), all on one force scale so no arrow changes length in transit; F_net fades in beneath. The reader owns T, the rocket count and f; a lit rocket grows its thrust from its tail. Specials: Example 4.2 on T ((ma + f)/n) and on f (nT − ma), a = 49 m/s². One inline readout F_net = T + … − f = nT − f = n(T value) − f value = F_net value, tagged by meaning: lighting a rocket adds a T term that fades in at its place, putting one out fades one; n, nT and every number keep their keys and bend in place as the count or a slider changes. In the picture the rider sits at the front of the platform, clear of the thrust arrows. Timeline: the story is kept and the run down the rail dropped, since Example 4.2 asks for the thrust at the initial instant and Figure 4.8 already runs the sled. Flat, no 3D.

Revised in the Manim pass of 2026-09-28:
- `sim-wagon` · at rest the friction holds only as much as the two pushes ask of it, so the free-body diagram, the scene and the readout show F_net = 0 when the wagon stays (manim-style 14).
- `sim-mass` · the readout is one equation, the ball's; the SUV's acceleration moves to the line beneath it (manim-style 12).
- `sim-sled` · merged with the former sim-sled-morph under the number 4.8. The figure is the story slider picture → free-body diagram (rail, rider and flames fade, the sled bends into a dot, each force re-roots on it, the rockets light and grow from the tail, dashed circles at Example 4.2 on T and f), and the graph of the acceleration against the rockets burning, with the dashed "simply proportional" line, arrives beside the diagram as the story reaches it; the marker slides along the line when the count changes. The clocked 2 s run is dropped: a story and a clock cannot share the figure, and the run added nothing Example 4.2 asks.

## Derivations

- Weight from Newton's second law and Galileo's result ($w = mg$) · score 1 · not built: a prose-first passage of two inline moves, below the hidden bar
