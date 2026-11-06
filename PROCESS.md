# Process: how we used an AI tool to build City Shuffle

This file records what we asked an AI coding assistant (Claude Code) to build, what it built, and the decisions and trade-offs along the way. We use it as evidence of AI tool use in our design document.

## 1. What we asked for

We wrote a detailed brief for an interactive web demo called **City Shuffle**. The main points were:

- **The world**: every night from 2 to 4 AM the city rearranges itself. Whole blocks move, places inside a block stay together, and anchors (hospitals, river, clock tower) never move. The AI learns the new layout from street sensors, so it is unsure at first and sometimes wrong. Small daytime aftershocks can move a single block, with a 5-minute warning.
- **What to build**: one `index.html` file with no build step, no backend and no API keys. It needed:
  - a city grid
  - the night shuffle animation
  - AI confidence shown in plain words (no percentages)
  - three residents with different message styles
  - two "what if" scenarios: the AI is wrong, and the network is down
  - a daytime aftershock
  - a story mode for our video
  - a "Why the AI did this" log
- **Look**: a warm illustrated paper map, not a generic map app or dashboard. One bold accent colour and deep blue at night.
- **Accessibility**: never use colour alone, provide keyboard focus, respect reduced motion, and keep text at 16px or larger.
- **Way of working**: show a plan first, wait for our OK, then build. Keep all text in one config object.

We also shared a reference image: an illustrated miniature city on a round island.

## 2. How the work went

1. **Plan**: the AI proposed the file layout, a data model (blocks, places, anchors, confidence levels, residents) and a build order. We approved it.
2. **Build**: the AI wrote the whole app in one file.
3. **Testing**: the AI opened the app in a headless browser at laptop size (1440×900) and phone size (390 wide). It clicked through every feature, took screenshots and checked for script errors. It found and fixed these problems:
   - Hidden elements (the story bar and the warning banner) were showing.
   - The heart icon in the "thanks" message was far too big.
   - The "AI believed … was here" label overflowed its box, so it was split into two lines.
   - The controls wrapped onto two rows, so they were regrouped to fit on one.
   - After the aftershock, old messages pushed Arjun's arrows out of view, so starting an aftershock now clears earlier "what ifs".
   - The offline message was hidden below older messages, so it now goes on top.
4. **Docs**: README.md (how to run and deploy) and this file.

## 3. What was built

- `index.html`: the whole interactive demo.
- `README.md`: how to run it, how to deploy it, and the feature list.
- `PROCESS.md`: this file.

How it works, in simple terms:

- **City model**: the city is 4 × 4 "slots". Three slots are anchors, twelve hold neighbourhood blocks, and one is open ground. Each block has 2–3 places in a small 2 × 2 layout, which makes the full 8 × 8 tile grid. When a block moves, its places move with it, so rule 2 is always kept.
- **Shuffle**: a seeded random generator (seed 7) moves every block to a new slot. Anchors never move. The seed also checks that Kamala's and Lena's trips are long enough to be interesting.
- **Confidence**: each block has a time when it reaches "I think so" and a time when it reaches "I'm sure" (all within 20 simulated minutes). Old Town only has 3 of 8 sensors working, so it stays at "I think so", which shows that the AI can stay unsure.
- **Routes**: the app finds the cheapest path through the slots. The river can only be crossed at the two bridges. Blocks the AI doesn't know cost much more to walk through, so routes go around them when they can. If they can't, the AI shows a warning.
- **AI wrong vs real**: the app keeps two maps, what the AI believes and what is real. In the "AI map out of date" scenario these two maps differ for one block.
- **Story mode**: each story step can run animated, or instantly. When you press *Back* or *Next*, the app rebuilds the city from the start and replays the earlier steps instantly, so every step looks the same each time it is recorded.

## 4. Decisions and trade-offs

| Decision | Why | Trade-off |
|---|---|---|
| 4 × 4 slots of blocks (= 8 × 8 tiles) instead of a free tile grid | Whole-block moves are simple and always tidy, and "places stay together" is guaranteed | Blocks are all the same size |
| One open-ground slot | Lets the aftershock move exactly ONE block into an empty space | One slot has no neighbourhood |
| The "wrong" block is picked from the current route | The scenario always works for any resident or seed. It picks Lakeview if Lakeview is on the route; with seed 7 it is Temple Street | The block name in the apology changes with the route |
| Hindi as Lena's second language | Fits the banyan tree and temple setting | Only Lena's messages are translated; block names stay in English |
| Fixed seed 7 | Same shuffle every time, which is good for recording | Press "New seed" to see other cities |
| Labels on the map scale with the map size | Map labels need to fit inside small blocks | Place labels on the map are smaller than 16px (about 11–16px on a laptop) and are hidden on phones. All panel text is 16px or larger, and Kamala's text is 23–27px |
| Route line goes through block centres | Clear and easy to follow | It sometimes covers part of a label, such as the clock tower name |
| Browser speech for "Read aloud" | Built into browsers and needs no API key | The voice depends on the device. If a browser has no speech, the button turns off with a note |
| No percentages anywhere | The brief asked for plain words | Less precise, but easier to understand |
| One look (paper by day, blue by night) rather than following the device's dark mode | The night scene is part of the story | It does not switch to dark mode on its own |

## 5. Who did what

- **Our team**: the world and its rules, the residents, the scenarios, the visual direction, the reference image and the brief. We review and approve the work.
- **AI assistant**: the plan, the code, the icons, the testing in a headless browser, fixing the problems it found, and these docs.

## 6. Concept video: the floating buddy

We then added a new idea: every person has a small floating buddy that moves with them, helps with directions, and is linked to the central city AI. We asked the AI assistant to make a video of it. The video zooms into the city and also shows the night shuffle.

- `video/city-shuffle-buddy.mp4`: the 76-second video (1920×1080).
- `video/buddy-video.html`: the animation it was made from. Open it in a browser to watch it live. To change it, edit `CAPTIONS` and the scene times at the top of the file.

**How it was made**: the whole film is drawn by code. The AI rendered it frame by frame (30 frames per second) in a headless browser and joined the frames into an MP4 with ffmpeg. This gives smooth motion and the same result every time.

**Story of the video**:
1. Wide view of the city on its island.
2. Zoom in.
3. The night shuffle (2–4 AM). Anchors stay still.
4. The sync wave (fog → stripes → solid).
5. Lumi the lantern buddy appears, linked to the City AI.
6. Lumi guides Kamala. It goes foggy at a street it doesn't know and finds a way around.
7. Lumi's four shapes: sure, think so, don't know, sorry.
8. Three buddy forms: lantern (Kamala), bird (Arjun), cloud (Lena).
9. Phone → AR glasses → a physical buddy you build yourself.

**Decisions**:
- We hadn't picked a shape yet, so the AI chose the lantern as the main buddy because it matches the paper style and its glow can show how sure it is.
- There is no music or voice-over, so the team can add their own.

### 6b. The 3D version

After seeing the first video, we asked for it to be **3D**. The AI rebuilt it with Three.js, a free 3D graphics library:

- The city sits on a floating 3D island with clouds and trees, like our reference image.
- Buildings are 3D, and anchors have red map pins.
- At night, blocks **lift into the air and fly** to their new places.
- Unknown blocks are wrapped in 3D fog.
- Lumi is a glowing 3D lantern with its own light.
- The camera moves: a wide orbit, a zoom into the city, then it follows Kamala.
- The final scenes are set in a small 3D studio with pedestals.

Files:
- `video/city-shuffle-buddy-3d.mp4`: the 3D video.
- `video/buddy-video-3d.html`: the 3D scene it was made from. Open it in a browser to watch it live.
- `video/three.min.js`: the Three.js library, so the scene also works offline.

The same story and captions as the first video were kept.
