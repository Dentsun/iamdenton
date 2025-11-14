# Project Tasks

## To Do

<!-- Add new tasks here -->

### Phase 1: Project Setup & Structure

- [x] Initialize Vite + TypeScript project with Phaser 3
- [x] Set up project folder structure (src/scenes, src/assets, src/config, etc.)
- [x] Configure Vite for Phaser 3 bundling
- [x] Configure simple way to run for local testing
- [x] Create asset requirements documentation file

### Phase 2: Landing Page & Main Menu

- [x] Create HTML landing page with "Start Adventure" and "Boring Resume" buttons
- [x] Implement "Boring Resume" button to link to PDF resume, create placeholder called RESUME_HERE.pdf
- [x] Create Phaser game config and initialize game instance
- [x] Build MainMenu scene (Phaser scene that starts on "Start Adventure")

### Phase 3: Hub World Scene (3 Pipes Selection)

- [x] Create Fullscreen HubWorld scene with platform/ground
- [x] Add player sprite with basic rendering
- [x] Implement WASD + Arrow key player movement controls
- [x] Implement player physics (gravity, collision with ground)
- [x] Add 3 pipe sprites to the scene at different positions
- [x] Create and position 3 signs next to pipes
- [x] Implement proximity detection for player near signs
- [x] Display sign text overlays when player is near ("Work Experience", "Education, Leadership and Projects", "Skills and Interests")
- [x] Implement "press down/S on pipe" mechanic to transition to levels

### Phase 4: Level Scenes (One for Each Pipe)

- [x] Create "Work Experience scene stub" (loads when entering first pipe)
- [x] Create "Education, Leadership and Projects" scene stub (loads when entering second pipe)
- [x] Create "Skills and Interests" scene stub (loads when entering third pipe)
- [x] Implement scene transitions from HubWorld to each level
- [x] Add return mechanism from levels back to HubWorld

### Phase 5: Assets & Placeholders

- [x] Create/add player character sprite placeholder
- [x] Create/add pipe sprite placeholder
- [x] Create/add sign sprite placeholder
- [x] Create/add ground/platform tileset placeholder
- [x] Create/add background placeholder
- [x] Document all required final assets in assets directory

## In Progress

<!-- Move tasks here when you start working on them -->

## Completed

<!-- Move finished tasks here or check them off above -->

## Backlog

<!-- Nice-to-have tasks or future ideas -->

- [ ] Add animations for player movement (idle, walk, jump)
- [ ] Add sound effects for movement and interactions
- [ ] Add background music
- [ ] Implement particle effects for pipe entry
- [ ] Add mobile touch controls
- [ ] Implement save state (remember which sections visited)
- [ ] Add easter eggs or hidden collectibles

## Notes

<!-- Additional context, decisions, or important information -->

**Tech Stack:**

- Phaser 3 (game engine)
- Vite (dev server & bundler)
- TypeScript
- HTML/CSS for landing page and UI overlays
- Vercel for hosting

**Controls:**

- WASD or Arrow Keys for movement
- Down/S on pipe to enter that section

**Sections:**

1. Work Experience (Pipe 1)
2. Education, Leadership and Projects (Pipe 2)
3. Skills and Interests (Pipe 3)

**Current Status:** Phase 1-5 Complete! ✅ - Full game prototype working at http://localhost:3000

**How to Run:**

```bash
cd portfolio-game
npm run dev
```

**What's Working:**

✅ **Phase 1-2: Setup & Landing Page**
- Landing page with "Start Adventure" and "boring resume" buttons
- Resume PDF placeholder (replace RESUME_HERE.pdf with your actual resume)
- Phaser 3 game initializes when clicking "Start Adventure"

✅ **Phase 3: Hub World**
- Fullscreen game with sky background and ground
- Blue player character (placeholder sprite)
- WASD or Arrow Keys movement + jumping
- 3 green pipes positioned across the scene
- Signs next to each pipe with labels
- Proximity detection - walk near signs to see labels appear
- Press DOWN or S while on a pipe to enter that level

✅ **Phase 4: Level Scenes**
- Work Experience scene (dark blue)
- Education, Leadership & Projects scene (purple)
- Skills & Interests scene (teal)
- Press SPACE in any level to return to Hub World

✅ **Phase 5: Placeholders**
- All visual elements use colored rectangles as placeholders
- Ready to replace with actual sprites/assets
- See [ASSET_REQUIREMENTS.md](portfolio-game/src/assets/ASSET_REQUIREMENTS.md) for asset specifications

**Recent Improvements:**
- ✅ Pipes and signs now properly touch the ground
- ✅ Pipes have collision hitboxes (can't walk through them)
- ✅ Increased player speed (200 → 300) and jump height (400 → 500)
- ✅ All subworlds fully implemented with platformer gameplay
- ✅ EXIT pipes in each subworld to return to Hub World

**Subworld Details:**

**Work Experience Scene:**
- 3 platform levels with placeholder job information
- Company names, roles, and dates displayed
- Color-coded badges for each position
- EXIT pipe on the left side

**Education, Leadership & Projects Scene:**
- Multi-level platformer layout with connecting stairs
- Education section (left)
- Leadership roles (center - 2 platforms)
- Projects (right - 2 platforms)
- Emoji icons for each category
- EXIT pipe on the far right

**Skills & Interests Scene:**
- Island-style platform layout
- Technical Skills island with 4 skills + star ratings
- Tools & Frameworks islands (2 separate areas)
- Soft Skills island
- Interests section with bullet points
- EXIT pipe in center bottom

**Next Steps:**
- Replace placeholder company/university names with your actual info
- Customize skills, projects, and interests with your real data
- Replace placeholder graphics with actual artwork
- Enhance with animations, sound effects, and polish
