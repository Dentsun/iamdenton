import { BaseSubworldScene } from './BaseSubworldScene';

export class SkillsScene extends BaseSubworldScene {
  private infoContainers: Phaser.GameObjects.Container[] = [];
  private platformPositions: Array<{ x: number; y: number }> = [];
  private exitPortal!: { x: number; y: number };

  constructor() {
    super({ key: 'SkillsScene' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x117A65);

    // Title
    const title = this.add.text(width / 2, 40, 'Skills & Interests', {
      fontSize: '42px',
      color: '#E8F8F5',
      fontFamily: 'Courier New',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    // Create platforms
    this.platforms = this.physics.add.staticGroup();

    // Ground
    const groundHeight = 50;
    const ground = this.add.rectangle(width / 2, height - groundHeight / 2, width, groundHeight, 0x0E6251);
    this.platforms.add(ground);

    const baseY = height - 150;

    // Technical Skills island
    this.createSkillIsland(180, baseY, 'Technical Skills', [
      { name: 'JavaScript', level: '⭐⭐⭐⭐⭐', color: 0xF1C40F },
      { name: 'TypeScript', level: '⭐⭐⭐⭐', color: 0x3498DB },
      { name: 'React', level: '⭐⭐⭐⭐⭐', color: 0x61DAFB },
      { name: 'Node.js', level: '⭐⭐⭐⭐', color: 0x68A063 }
    ]);

    // Tools & Frameworks islands
    this.createSkillIsland(width / 2 - 100, baseY - 150, 'Tools', [
      { name: 'Git', level: '⭐⭐⭐⭐⭐', color: 0xE74C3C },
      { name: 'Docker', level: '⭐⭐⭐', color: 0x2496ED }
    ]);

    this.createSkillIsland(width / 2 + 100, baseY - 150, 'Frameworks', [
      { name: 'Phaser 3', level: '⭐⭐⭐⭐', color: 0x9B59B6 },
      { name: 'Express', level: '⭐⭐⭐⭐', color: 0x2ECC71 }
    ]);

    // Soft Skills island
    this.createSkillIsland(width - 200, baseY - 300, 'Soft Skills', [
      { name: 'Leadership', level: '⭐⭐⭐⭐', color: 0xE67E22 },
      { name: 'Communication', level: '⭐⭐⭐⭐⭐', color: 0x1ABC9C },
      { name: 'Problem Solving', level: '⭐⭐⭐⭐⭐', color: 0x16A085 }
    ]);

    // Interests section
    const interestY = height - 220;
    const interestPlatform = this.add.rectangle(width - 250, interestY, 400, 20, 0x148F77);
    interestPlatform.setData('canDropThrough', true);
    this.platforms.add(interestPlatform);
    this.platformPositions.push({ x: width - 250, y: interestY });

    this.createInfoBox(width - 250, interestY - 80, 0x16A085);

    const interestsContainer = this.createInterestsSection(width - 250, interestY - 150);
    interestsContainer.setVisible(false);
    this.infoContainers.push(interestsContainer);

    // Exit portal
    this.exitPortal = this.createExitPortal(width / 2, height - groundHeight);

    // Create player and setup
    this.createPlayer(100, height - 150, 'player-skills');
    this.setupControls();
    this.setupOnewayPlatforms();
    this.createExitButton();
  }

  update() {
    // Check portal exit (only consumes key if player is near portal)
    if (this.exitPortal) {
      const exitedPortal = this.checkPortalExit(this.exitPortal.x, this.exitPortal.y);
      if (exitedPortal) {
        return; // Exit early if portal was used
      }
    }

    // Update movement and visibility
    this.updatePlayerMovement();
    this.updateInfoVisibility();
  }

  private updateInfoVisibility() {
    this.infoContainers.forEach((container, index) => {
      const platformPos = this.platformPositions[index];
      const dx = this.player.x - platformPos.x;
      const dy = this.player.y - platformPos.y;

      // Directional hitbox: very small from below, smaller from sides/above
      const horizontalRange = 120;
      const verticalRangeAbove = 150;
      const verticalRangeBelow = 30; // Very small from below

      const isInRange =
        Math.abs(dx) < horizontalRange &&
        dy > -verticalRangeAbove &&
        dy < verticalRangeBelow;

      container.setVisible(isInRange);
    });
  }

  private createSkillIsland(
    centerX: number,
    centerY: number,
    category: string,
    skills: Array<{ name: string; level: string; color: number }>
  ) {
    const platformWidth = 280;
    const platform = this.add.rectangle(centerX, centerY, platformWidth, 20, 0x148F77);
    platform.setData('canDropThrough', true);
    this.platforms.add(platform);
    this.platformPositions.push({ x: centerX, y: centerY });

    // Add info box for category
    this.createInfoBox(centerX, centerY - 80, 0x1ABC9C);

    const categoryContainer = this.add.container(centerX, centerY - 60);

    // Background for category
    const categoryBg = this.add.rectangle(0, 0, 180, 50, 0x2c2c2c, 0.95);
    categoryBg.setStrokeStyle(2, 0x1ABC9C);

    const categoryText = this.add.text(0, 0, category, {
      fontSize: '20px',
      color: '#E8F8F5',
      fontFamily: 'Courier New',
      fontStyle: 'bold'
    });
    categoryText.setOrigin(0.5);

    categoryContainer.add([categoryBg, categoryText]);
    categoryContainer.setDepth(1000);
    categoryContainer.setVisible(false);
    this.infoContainers.push(categoryContainer);

    skills.forEach((skill, index) => {
      const skillY = centerY - 80 - (index * 60);
      const skillPlatform = this.add.rectangle(centerX, skillY, 220, 15, 0x1ABC9C);
      skillPlatform.setData('canDropThrough', true);
      this.platforms.add(skillPlatform);
      this.platformPositions.push({ x: centerX, y: skillY });

      // Add info box for each skill
      this.createInfoBox(centerX, skillY - 60, skill.color);

      const skillContainer = this.createSkillBadge(centerX, skillY, skill.name, skill.level, skill.color);
      skillContainer.setVisible(false);
      this.infoContainers.push(skillContainer);
    });
  }

  private createSkillBadge(x: number, y: number, name: string, level: string, color: number): Phaser.GameObjects.Container {
    // Background panel
    const bgWidth = 200;
    const bgHeight = 60;
    const background = this.add.rectangle(0, -15, bgWidth, bgHeight, 0x2c2c2c, 0.95);
    background.setStrokeStyle(2, color);

    const badge = this.add.circle(-80, -20, 10, color);

    const nameText = this.add.text(0, -22, name, {
      fontSize: '16px',
      color: '#E8F8F5',
      fontFamily: 'Courier New',
      fontStyle: 'bold'
    });
    nameText.setOrigin(0.5);

    const levelText = this.add.text(0, -5, level, {
      fontSize: '12px',
      color: '#A2D9CE',
      fontFamily: 'Courier New'
    });
    levelText.setOrigin(0.5);

    const container = this.add.container(x, y, [background, badge, nameText, levelText]);
    container.setDepth(1000);
    return container;
  }

  private createInterestsSection(x: number, y: number): Phaser.GameObjects.Container {
    // Background panel
    const bgWidth = 220;
    const bgHeight = 140;
    const background = this.add.rectangle(0, 35, bgWidth, bgHeight, 0x2c2c2c, 0.95);
    background.setStrokeStyle(2, 0x16A085);

    const titleText = this.add.text(0, 0, '🎮 Interests', {
      fontSize: '24px',
      color: '#E8F8F5',
      fontFamily: 'Courier New',
      fontStyle: 'bold'
    });
    titleText.setOrigin(0.5);

    const interests = ['Game Dev', 'Open Source', 'AI/ML', 'Web3'];
    const interestTexts = interests.map((interest, i) => {
      const text = this.add.text(0, 30 + (i * 20), `• ${interest}`, {
        fontSize: '16px',
        color: '#A2D9CE',
        fontFamily: 'Courier New'
      });
      text.setOrigin(0.5);
      return text;
    });

    const container = this.add.container(x, y, [background, titleText, ...interestTexts]);
    container.setDepth(1000);
    return container;
  }
}
