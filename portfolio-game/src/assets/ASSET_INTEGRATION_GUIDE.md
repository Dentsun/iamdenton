# Asset Integration Guide

This guide explains how to add visual assets (images, spritesheets, animations) to your Phaser 3 portfolio game.

---

## Table of Contents
1. [Quick Start](#quick-start)
2. [Asset Folder Structure](#asset-folder-structure)
3. [Adding Static Images](#adding-static-images)
4. [Adding Animated Sprite Sheets](#adding-animated-sprite-sheets)
5. [Sprite Sheet Specifications](#sprite-sheet-specifications)
6. [Code Examples](#code-examples)
7. [Recommended Tools](#recommended-tools)

---

## Quick Start

### Step 1: Place Your Assets
Put your image files in the appropriate folder:
```
portfolio-game/
└── public/
    └── assets/
        ├── images/          # Single images (backgrounds, UI elements)
        ├── spritesheets/    # Animated character sprites
        └── tilesets/        # Platform/ground tiles
```

### Step 2: Load Assets in Phaser
Add loading code to the scene's `preload()` method:
```typescript
preload() {
  // Load single image
  this.load.image('background', 'assets/images/background.png');

  // Load spritesheet with animation
  this.load.spritesheet('player', 'assets/spritesheets/player.png', {
    frameWidth: 32,
    frameHeight: 48
  });
}
```

### Step 3: Use Assets in Scene
```typescript
create() {
  // Use the loaded image
  this.add.image(400, 300, 'background');

  // Create sprite from spritesheet
  this.player = this.physics.add.sprite(100, 100, 'player');
}
```

---

## Asset Folder Structure

Create these folders in your project:

```
portfolio-game/
└── public/
    └── assets/
        ├── images/
        │   ├── backgrounds/
        │   │   ├── hub-bg.png
        │   │   ├── work-bg.png
        │   │   └── skills-bg.png
        │   ├── ui/
        │   │   ├── button.png
        │   │   └── panel.png
        │   └── objects/
        │       ├── pipe.png
        │       └── sign.png
        │
        ├── spritesheets/
        │   ├── player-idle.png
        │   ├── player-walk.png
        │   └── player-jump.png
        │
        └── tilesets/
            ├── ground-tiles.png
            └── platform-tiles.png
```

**Important:** Phaser loads assets from the `public/` folder, so use paths like `assets/images/background.png` (without `public/` in the path).

---

## Adding Static Images

### 1. Create or Download Your Image
- **Format**: PNG (with transparency) or JPG
- **Recommended sizes**:
  - Background: Match your game size (e.g., 1920x1080 for full HD)
  - Pipes: 64x96 pixels
  - Signs: 64x64 pixels
  - Platforms: 200x20 pixels (or tileable 32x32)

### 2. Place in Folder
```
public/assets/images/pipe.png
```

### 3. Load in Scene
```typescript
preload() {
  this.load.image('pipe', 'assets/images/pipe.png');
}
```

### 4. Display in Scene
```typescript
create() {
  // Simple placement
  this.add.image(400, 300, 'pipe');

  // As physics sprite (for collision)
  const pipeSprite = this.physics.add.sprite(400, 300, 'pipe');
  pipeSprite.setImmovable(true);
}
```

---

## Adding Animated Sprite Sheets

### What is a Sprite Sheet?
A sprite sheet is a single image containing multiple frames of animation arranged in a grid.

**Example sprite sheet layout (4 frames, walking right):**
```
[Frame 1] [Frame 2] [Frame 3] [Frame 4]
   👤       👤        👤        👤
```

### Step-by-Step: Animated Player Character

#### 1. Create Your Sprite Sheet
Use tools like Aseprite, Piskel, or Photoshop to create:
- **Frame size**: 32x48 pixels per frame
- **Layout**: Horizontal strip (all frames in one row)
- **Frames**: 4-8 frames for walk cycle
- **Transparency**: PNG with transparent background

**Example: player-walk.png (4 frames, each 32x48)**
```
Total image size: 128 pixels wide × 48 pixels tall
```

#### 2. Place in Folder
```
public/assets/spritesheets/player-walk.png
```

#### 3. Load Sprite Sheet in preload()
```typescript
preload() {
  this.load.spritesheet('player-walk', 'assets/spritesheets/player-walk.png', {
    frameWidth: 32,   // Width of ONE frame
    frameHeight: 48   // Height of ONE frame
  });
}
```

#### 4. Create Animation in create()
```typescript
create() {
  // Define the animation
  this.anims.create({
    key: 'walk',                    // Animation name
    frames: this.anims.generateFrameNumbers('player-walk', {
      start: 0,                     // First frame index
      end: 3                        // Last frame index (4 frames total: 0,1,2,3)
    }),
    frameRate: 10,                  // Speed: 10 frames per second
    repeat: -1                      // -1 = loop forever, 0 = play once
  });

  // Create sprite
  this.player = this.physics.add.sprite(100, 100, 'player-walk');

  // Play animation
  this.player.anims.play('walk');
}
```

#### 5. Control Animation in update()
```typescript
update() {
  if (this.cursors.right.isDown) {
    this.player.setVelocityX(200);
    this.player.anims.play('walk', true);  // Play walk animation
  } else if (this.cursors.left.isDown) {
    this.player.setVelocityX(-200);
    this.player.anims.play('walk', true);
    this.player.setFlipX(true);            // Flip sprite horizontally
  } else {
    this.player.setVelocityX(0);
    this.player.anims.play('idle', true);  // Play idle animation
  }
}
```

---

## Sprite Sheet Specifications

### Recommended Sprite Sheet Formats

#### Option 1: Single Animation Per File (Easiest)
```
player-idle.png     → 1-4 frames in a row
player-walk.png     → 4-8 frames in a row
player-jump.png     → 1-2 frames in a row
```

**Example file: player-walk.png**
- Frame size: 32×48 pixels
- Total frames: 6
- Total image size: 192×48 pixels (6 frames × 32 width)

#### Option 2: Multiple Animations in Grid
```
player-animations.png
Row 1: Idle (4 frames)
Row 2: Walk (8 frames)
Row 3: Jump (2 frames)
```

**Loading grid-based sprite sheet:**
```typescript
this.load.spritesheet('player', 'assets/spritesheets/player-animations.png', {
  frameWidth: 32,
  frameHeight: 48
});

// Define animations from specific frame ranges
this.anims.create({
  key: 'idle',
  frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
  frameRate: 8,
  repeat: -1
});

this.anims.create({
  key: 'walk',
  frames: this.anims.generateFrameNumbers('player', { start: 4, end: 11 }),
  frameRate: 10,
  repeat: -1
});
```

### Common Frame Sizes
- **Pixel art character**: 16×16, 32×32, 32×48, 64×64
- **HD character**: 128×128, 256×256
- **Tile**: 16×16, 32×32, 64×64

---

## Code Examples

### Complete Example: Replace Placeholder with Animated Sprite

#### Before (current code using rectangles):
```typescript
// HubWorldScene.ts - create() method
this.player = this.physics.add.sprite(100, height - 150, '');
this.player.setDisplaySize(32, 48);
this.player.setTexture(this.createRectTexture('player', 32, 48, 0x4169E1));
```

#### After (using animated sprite sheet):
```typescript
// HubWorldScene.ts

preload() {
  // Load player sprite sheets
  this.load.spritesheet('player-idle', 'assets/spritesheets/player-idle.png', {
    frameWidth: 32,
    frameHeight: 48
  });

  this.load.spritesheet('player-walk', 'assets/spritesheets/player-walk.png', {
    frameWidth: 32,
    frameHeight: 48
  });
}

create() {
  // Create animations
  this.anims.create({
    key: 'player-idle',
    frames: this.anims.generateFrameNumbers('player-idle', { start: 0, end: 3 }),
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
    key: 'player-walk',
    frames: this.anims.generateFrameNumbers('player-walk', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  // Create player with first frame of idle animation
  this.player = this.physics.add.sprite(100, height - 150, 'player-idle', 0);
  this.player.setBounce(0);
  this.player.setCollideWorldBounds(true);
  this.player.setDepth(1000);

  // Start with idle animation
  this.player.anims.play('player-idle');
}

update() {
  const speed = 450;

  if (this.cursors.left.isDown || this.wasdKeys.A.isDown) {
    this.player.setVelocityX(-speed);
    this.player.anims.play('player-walk', true);
    this.player.setFlipX(true);  // Face left
  } else if (this.cursors.right.isDown || this.wasdKeys.D.isDown) {
    this.player.setVelocityX(speed);
    this.player.anims.play('player-walk', true);
    this.player.setFlipX(false); // Face right
  } else {
    this.player.setVelocityX(0);
    this.player.anims.play('player-idle', true);
  }

  // ... rest of update logic
}
```

---

## Recommended Tools

### Free Sprite Creation Tools

1. **Piskel** (Browser-based)
   - URL: https://www.piskelapp.com/
   - Best for: Beginners, pixel art
   - Features: Online editor, frame-by-frame animation preview
   - Export: PNG sprite sheets

2. **Aseprite** (Desktop - Paid, but worth it)
   - URL: https://www.aseprite.org/
   - Best for: Pixel art, professional sprite sheets
   - Features: Onion skinning, layers, export to sprite sheet
   - Price: $20 (one-time)

3. **GIMP** (Desktop - Free)
   - URL: https://www.gimp.org/
   - Best for: General image editing
   - Features: Free Photoshop alternative

4. **Krita** (Desktop - Free)
   - URL: https://krita.org/
   - Best for: Digital painting and animation
   - Features: Animation timeline, onion skinning

### Free Asset Resources

1. **OpenGameArt.org**
   - Free game assets (CC0/CC-BY licenses)
   - Search: "platformer character", "pixel art"

2. **Itch.io Asset Packs**
   - Many free and paid pixel art packs
   - URL: https://itch.io/game-assets

3. **Kenney.nl**
   - High-quality free game assets (CC0 license)
   - URL: https://kenney.nl/assets

---

## Step-by-Step: Replace Current Placeholders

### 1. Replace Player Character

**Create asset:**
- Tool: Piskel or Aseprite
- Size: 32×48 pixels per frame
- Animations needed:
  - Idle: 4 frames
  - Walk: 8 frames
  - Jump: 2 frames (optional)

**Save as:**
```
public/assets/spritesheets/player-idle.png
public/assets/spritesheets/player-walk.png
```

**Update code:**
- Add `preload()` method to HubWorldScene.ts
- Load sprite sheets
- Create animations in `create()`
- Update player creation code
- Add animation logic in `update()`

### 2. Replace Pipes

**Create asset:**
- Tool: Any image editor
- Size: 64×96 pixels
- Style: Mario-style green pipe or custom design
- Format: PNG with transparency

**Save as:**
```
public/assets/images/pipe.png
public/assets/images/pipe-top.png (optional oval top)
```

**Update code in HubWorldScene.ts:**
```typescript
preload() {
  this.load.image('pipe-body', 'assets/images/pipe.png');
  this.load.image('pipe-top', 'assets/images/pipe-top.png');
}

create() {
  // In pipeData.forEach loop:
  const pipeBody = this.add.image(data.x, data.y, 'pipe-body');
  const pipeTop = this.add.image(data.x, data.y - pipeHeight/2, 'pipe-top');
}
```

### 3. Replace Ground/Platforms

**Create asset:**
- Tool: Any image editor
- Size: 32×32 pixels (tileable)
- Style: Grass, dirt, stone, wood
- Format: PNG

**Save as:**
```
public/assets/images/ground-tile.png
public/assets/images/platform-tile.png
```

**Update code:**
```typescript
preload() {
  this.load.image('ground', 'assets/images/ground-tile.png');
  this.load.image('platform', 'assets/images/platform-tile.png');
}

create() {
  // Use TileSprite for repeating pattern
  const ground = this.add.tileSprite(
    width / 2,
    height - groundHeight / 2,
    width,
    groundHeight,
    'ground'
  );
  this.platforms.add(ground);
}
```

---

## Testing Your Assets

1. **Add asset files** to `public/assets/` folders
2. **Restart dev server** (Ctrl+C, then `npm run dev`)
3. **Refresh browser** (hard refresh: Ctrl+Shift+R)
4. **Check browser console** (F12) for loading errors

Common errors:
- **404 Not Found**: Check file path and name
- **Frames not animating**: Check frameWidth/frameHeight match actual frame size
- **Sprite stretched**: Check sprite sheet dimensions are exact multiples of frame size

---

## Next Steps

1. Create or download sprite sheets for player character
2. Place files in `public/assets/spritesheets/`
3. Add `preload()` method to scenes (HubWorldScene, WorkExperienceScene, etc.)
4. Load sprite sheets with correct frame dimensions
5. Create animations in `create()` method
6. Update player creation code to use sprite instead of rectangle
7. Add animation logic in `update()` method
8. Test and iterate!

---

## Questions?

If you run into issues:
1. Check browser console (F12) for errors
2. Verify file paths match exactly (case-sensitive)
3. Confirm sprite sheet dimensions are correct
4. Test with a simple 2-frame animation first
5. Share the error message for help debugging

Good luck with your assets! 🎨
