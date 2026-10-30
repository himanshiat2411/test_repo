# City Shuffle

An interactive demo for the Cvent BeyondPixels design challenge.

Every night between 2 AM and 4 AM, our city rearranges itself. Only the city's AI knows the new layout. City Shuffle shows how that AI tells people when it is **sure**, when it is **guessing**, and when it was **wrong**.

The whole app is one file: `index.html`. It has no build step, no server, no login and no API keys.

## How to run it

1. Download `index.html`.
2. Double-click it. It opens in your web browser.

That's it. It also works offline. Without internet it uses a system font instead of the Nunito font, and everything else stays the same.

## How to put it online for free

### Option A: Netlify Drop (easiest, about 1 minute)

1. Make a new folder on your computer, for example `city-shuffle`.
2. Put `index.html` inside that folder.
3. Go to **https://app.netlify.com/drop** in your browser.
4. Drag the **folder** onto the page.
5. Wait a few seconds. Netlify gives you a public link like `https://something-random.netlify.app`.
6. Optional: make a free Netlify account so the link doesn't expire, then rename the site under **Site configuration → Change site name**.

### Option B: GitHub Pages

1. Open your repository on GitHub.
2. Make sure `index.html` is in the main (root) folder of the branch you want to publish.
3. Click **Settings** → **Pages** in the left menu.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Pick your branch (for example `main`) and the folder `/ (root)`. Click **Save**.
6. Wait 1–2 minutes and refresh the page. Your link appears at the top, for example `https://your-name.github.io/your-repo/`.

> Note: this repository has a `CNAME` file. If it is on the published branch, GitHub Pages will try to use that custom domain. Delete or edit `CNAME` if you want the normal `github.io` link.

## Main features

- **Paper city map**: a 4 × 4 grid with 12 named neighbourhood blocks. Each block holds 2–3 places drawn as small hand-drawn icons.
- **Anchors that never move**: two hospitals, the river and the old clock tower. Each has a red pin with a lock.
- **Night shuffle**: press *Start the night*. The screen turns deep blue, the clock runs from 2:00 to 4:00 AM, and blocks slide to new places. Places inside a block stay together, so the pharmacy is always next to the banyan tree.
- **Same shuffle every time**: a fixed seed (7) gives the same result each time, which helps when you record the video. *New seed* makes a different city.
- **AI confidence, block by block**: after 4 AM every block starts as "I don't know yet" and comes into focus as its sensors report. There are three levels, each with a colour, a pattern and words:
  - **I'm sure**: solid block with a ✓ label
  - **I think so**: diagonal stripes with a "?" badge
  - **I don't know yet**: grey fog with a dotted outline
- **Morning slider**: drag time from 4:00 to 7:00 AM to watch the city come into focus.
- **Three residents**, each with their own message style:
  - **Kamala, 75**: large text, calm tone, directions by landmarks, and a *Read aloud* button.
  - **Arjun, 24, delivery rider**: no-reading mode with big turn arrows, a pulsing "handlebar buzz", and orders that re-sort when a block moves.
  - **Lena, 29, tourist**: picture-first directions with an English / Hindi switch.
- **Safe routes**: routes go around blocks the AI doesn't know yet. If they can't, the AI warns: "I'm not sure about this area yet. I'll update you in 5 min."
- **What if: AI map out of date**: the AI is sure about a block but wrong. The resident taps *This doesn't look right*, the AI says sorry and explains, re-routes, shares the fix with 214 people, and a dashed outline shows where the AI wrongly thought the block was.
- **What if: Network down**: the map fades to "Last known layout: 6:10 AM", phones nearby pass the map to each other, and the AI suggests anchors and Shift Guides. When the network comes back, changed blocks blink once.
- **Aftershock at 11 AM**: a 5-minute warning with a countdown, then Sunrise Heights (Arjun's customer) slides to a new place and his orders re-sort. A note says: "Delay caused by city shift. Your pay is protected."
- **Play story**: a scripted run of about 78 seconds with captions, plus Back / Pause / Next, for recording the video.
- **Why the AI did this**: a log that explains every AI decision in one plain sentence, with the time.
- **Accessibility**: never colour alone, keyboard buttons with a visible focus ring, text of 16px or larger in the panels, and respect for "reduce motion" settings (animations become instant).

## Changing the text

All names, places, messages, Hindi translations and the story script are in one object called `CONFIG` at the top of the `<script>` in `index.html`. Change the words there. You don't need to touch the rest of the code.
