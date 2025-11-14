# Asset Requirements

This file lists all the visual and audio assets needed for the portfolio game.

## Phase 3 - Hub World Assets

### Player Character
- **File**: `player.png` or `player-spritesheet.png`
- **Size**: 32x32 pixels (or 32x48 for taller character)
- **Format**: PNG with transparency
- **Description**: The main character sprite that the player controls
- **Frames needed** (if spritesheet):
  - Idle: 1-4 frames
  - Walk left: 4-8 frames
  - Walk right: 4-8 frames
  - Jump: 1-2 frames (optional for Phase 3)

### Environment
- **Pipe sprite**: `pipe.png`
  - Size: 64x96 pixels (or larger)
  - Format: PNG with transparency
  - Quantity needed: 3 pipes (can reuse same sprite)
  - Style: Mario-style pipe or custom design

- **Sign sprite**: `sign.png`
  - Size: 48x48 pixels
  - Format: PNG with transparency
  - Quantity needed: 3 signs (can reuse same sprite)
  - Note: Text will be rendered dynamically

- **Ground/Platform tiles**: `ground.png` or `platform-tileset.png`
  - Size: 32x32 pixels per tile (or tileset)
  - Format: PNG
  - Description: Ground texture for the player to walk on
  - Can be a single tile that repeats or a tileset

- **Background**: `background.png`
  - Size: 800x600 pixels (match game dimensions)
  - Format: PNG or JPG
  - Description: Static or parallax scrolling background
  - Style: Sky, clouds, or abstract design

## Phase 4 - Level Assets

### Work Experience Level
- Background specific to work theme (office, workspace, etc.)
- Additional sprites TBD based on level design

### Education, Leadership & Projects Level
- Background specific to education theme (campus, library, etc.)
- Additional sprites TBD based on level design

### Skills & Interests Level
- Background specific to skills theme
- Additional sprites TBD based on level design

## Phase 5+ - Enhanced Assets (Optional)

### Audio
- Background music (MP3 or OGG format)
- Sound effects:
  - Footstep sounds
  - Pipe entry sound
  - Menu click sound
  - Ambient sounds

### Additional Visual Effects
- Particle effects for pipe entry
- Animated UI elements
- Character animations

## Placeholder Strategy

Until real assets are created:
1. Use colored rectangles for sprites (Phaser can generate these)
2. Use simple geometric shapes
3. Use text labels to indicate what each placeholder represents

## Asset Placement

Place all final assets in:
- **Images**: `public/assets/images/`
- **Audio**: `public/assets/audio/`
- **Spritesheets**: `public/assets/spritesheets/`
