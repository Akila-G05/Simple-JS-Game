# Simple JS Game

A 2D endless-runner browser game built with plain HTML, CSS, and JavaScript — no
frameworks, no build step, no dependencies. Guide the character across a scrolling
landscape and jump over the flames for as long as you can.

## Features

- **Endless runner gameplay** — the world scrolls continuously and the score climbs the
  further you survive
- **Keyboard controls** — `Enter` or `Spacebar` to start, `Spacebar` to jump
- **Sprite-sheet frame animation** — hand-drawn run, jump, and death sequences are
  animated by cycling the character's image source through the frame sets
- **Parallax-style scrolling** — the tiled background scrolls horizontally on its own loop
- **Procedurally placed obstacles** — 20 flame hazards are generated at staggered
  intervals on load and scroll toward the player
- **Collision detection** — hitting a flame while grounded ends the run
- **Jump arc simulation** — vertical movement is applied in two phases (rise then fall) to
  produce a parabolic jump
- **Sound effects** — run, jump, and death audio played through the Web Audio API, with
  playback paused and resumed as the character moves
- **Welcome and game-over screens** — an instruction overlay on load and a game-over panel
  showing the final score with a *Try Again?* button
- **Self-contained** — all assets are local; runs offline from the filesystem

## Project Structure

```
Game/
├── index.html   # Markup: background, player, score, welcome & game-over overlays
├── style.css    # Positioning, tiled background, flame obstacles, overlay styling
├── script.js    # Game loop, input handling, animation, collision, audio
│
├── background.png, flame.gif, game_over_PNG56.png
├── Run (1–8).png     # Run cycle frames
├── Jump (1–12).png   # Jump cycle frames
├── Dead (1–10).png   # Death cycle frames
└── run.mp3, jump.mp3, dead.mp3
```

## Design

- **Zero-dependency vanilla JavaScript** — no framework, bundler, or module system; open
  `index.html` and play
- **`setInterval` workers as a game loop** — each concern (run cycle, background scroll,
  score, obstacle movement) owns its own interval handle, and those handles double as state
  flags: `0` means *not running*, a positive value is an active interval id, and `-1` means
  *stopped/paused*. The input handler simply checks whether a handle is `0` before starting
  one, which prevents duplicate loops from being created
- **Animation by image swapping** — frames are individual PNG files named by index
  (`Run (1).png` … `Run (8).png`); a counter is incremented each tick, wrapped at the last
  frame, and written to the `<img>` element's `src`. No canvas or sprite-sheet rendering
- **Layout via absolute positioning and CSS margins** — the player is an `<img>` moved with
  `marginTop`, and obstacles are `<div>` elements moved with `marginLeft`
- **Collision by interval check** — each obstacle's computed `margin-left` is read with
  `getComputedStyle`, and a hit is registered when it falls inside the player's hit window
  (`60`–`160px`) while `marginTop` is below the jump threshold (`322px`)
- **Lifecycle managed by clearing intervals** — on death every worker handle is cleared and
  set to `-1`, and the death animation takes over; *Try Again?* calls `location.reload()`
  for a clean restart
- **Audio via the `Audio` constructor** — three `HTMLAudioElement` instances are created up
  front and controlled with `.play()` / `.pause()`

## Technologies

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic overlays |
| CSS3 | Absolute positioning, tiled backgrounds, responsive full-viewport layout |
| Vanilla JavaScript | Game logic, animation, collision, timers |
| Web Audio API (`Audio`) | Sound effects |
| PNG / GIF sprite assets | Character frames, flames, background |
| MP3 audio | Run, jump, and death sounds |

No build tools, package manager, or external CDN dependencies are required.

## Getting Started

### Prerequisites

Any modern web browser. Nothing to install.

### Run

Open `index.html` directly in a browser:

```sh
start index.html
```

Or serve the folder with any static server:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

### Controls

| Key | Action |
|---|---|
| `Enter` | Start the game |
| `Spacebar` | Start the game / jump over the flames |

## Notes

- Frame filenames include spaces and parentheses, so the animation code builds paths as
  `"Run (" + n + ").png"`. Keep the naming convention if you replace the art.
- Audio playback requires a user gesture first in most browsers — starting the game with
  `Enter` satisfies this.
- Difficulty is fixed: the scroll speed and obstacle spacing are hardcoded constants.
- This was built as a web programming course project.