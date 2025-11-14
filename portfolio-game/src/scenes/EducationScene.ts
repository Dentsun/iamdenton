import { BaseSubworldScene } from './BaseSubworldScene';

export class EducationScene extends BaseSubworldScene {
  private infoContainers: Phaser.GameObjects.Container[] = [];
  private platformPositions: Array<{ x: number; y: number }> = [];

  constructor() {
    super({ key: 'EducationScene' });
  }

  private exitPortal!: { x: number; y: number };

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x6C3483);

    // Title
    const title = this.add.text(width / 2, 40, 'Education, Leadership & Projects', {
      fontSize: '38px',
      color: '#F4ECF7',
      fontFamily: 'Courier New',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    // Create platforms
    this.platforms = this.physics.add.staticGroup();

    // Ground
    const groundHeight = 50;
    const ground = this.add.rectangle(width / 2, height - groundHeight / 2, width, groundHeight, 0x512E5F);
    this.platforms.add(ground);

    // Platform levels
    const platformY1 = height - 180;
    const platformY2 = height - 320;
    const platformY3 = height - 460;

    // Education Section
    const eduPlatform = this.add.rectangle(200, platformY1, 350, 20, 0x7D3C98);
    eduPlatform.setData('canDropThrough', true);
    this.platforms.add(eduPlatform);
    this.platformPositions.push({ x: 200, y: platformY1 });
    this.createInfoBox(200, platformY1 - 80, 0xAF7AC5);
    const edu = this.createSection(200, platformY1 - 140, 'University Name', 'Computer Science, B.S.', '2018-2022', 0xAF7AC5, '🎓');
    edu.setVisible(false);
    this.infoContainers.push(edu);

    // Leadership Section
    const leaderPlatform1 = this.add.rectangle(width / 2 - 150, platformY2, 200, 20, 0x7D3C98);
    leaderPlatform1.setData('canDropThrough', true);
    this.platforms.add(leaderPlatform1);
    this.platformPositions.push({ x: width / 2 - 150, y: platformY2 });
    this.createInfoBox(width / 2 - 150, platformY2 - 80, 0xE74C3C);
    const leader1 = this.createSection(width / 2 - 150, platformY2 - 130, 'Club President', 'Tech Society', '2021', 0xE74C3C, '👔');
    leader1.setVisible(false);
    this.infoContainers.push(leader1);

    const leaderPlatform2 = this.add.rectangle(width / 2 + 150, platformY2, 200, 20, 0x7D3C98);
    leaderPlatform2.setData('canDropThrough', true);
    this.platforms.add(leaderPlatform2);
    this.platformPositions.push({ x: width / 2 + 150, y: platformY2 });
    this.createInfoBox(width / 2 + 150, platformY2 - 80, 0xF39C12);
    const leader2 = this.createSection(width / 2 + 150, platformY2 - 130, 'Team Lead', 'Hackathon Team', '2020', 0xF39C12, '⭐');
    leader2.setVisible(false);
    this.infoContainers.push(leader2);

    // Projects Section
    const projectPlatform1 = this.add.rectangle(width - 250, platformY3, 250, 20, 0x7D3C98);
    projectPlatform1.setData('canDropThrough', true);
    this.platforms.add(projectPlatform1);
    this.platformPositions.push({ x: width - 250, y: platformY3 });
    this.createInfoBox(width - 250, platformY3 - 80, 0x3498DB);
    const project1 = this.createSection(width - 250, platformY3 - 140, 'Project Alpha', 'Full-stack Web App', 'React, Node.js', 0x3498DB, '💻');
    project1.setVisible(false);
    this.infoContainers.push(project1);

    const projectPlatform2 = this.add.rectangle(width - 250, platformY1, 250, 20, 0x7D3C98);
    projectPlatform2.setData('canDropThrough', true);
    this.platforms.add(projectPlatform2);
    this.platformPositions.push({ x: width - 250, y: platformY1 });
    this.createInfoBox(width - 250, platformY1 - 80, 0x2ECC71);
    const project2 = this.createSection(width - 250, platformY1 - 140, 'Project Beta', 'Mobile Application', 'React Native', 0x2ECC71, '📱');
    project2.setVisible(false);
    this.infoContainers.push(project2);

    // Connecting platforms
    const stair1 = this.add.rectangle(450, platformY1 + 60, 150, 20, 0x7D3C98);
    stair1.setData('canDropThrough', true);
    this.platforms.add(stair1);

    const stair2 = this.add.rectangle(width / 2, platformY2 + 60, 150, 20, 0x7D3C98);
    stair2.setData('canDropThrough', true);
    this.platforms.add(stair2);

    // Exit portal
    this.exitPortal = this.createExitPortal(width - 80, height - groundHeight);

    // Create player and setup
    this.createPlayer(100, height - 150, 'player-edu');
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

  private createSection(x: number, y: number, title: string, subtitle: string, detail: string, color: number, emoji: string): Phaser.GameObjects.Container {
    // Background panel
    const bgWidth = 280;
    const bgHeight = 120;
    const background = this.add.rectangle(0, 0, bgWidth, bgHeight, 0x2c2c2c, 0.95);
    background.setStrokeStyle(2, color);

    const emojiText = this.add.text(0, -40, emoji, {
      fontSize: '28px'
    });
    emojiText.setOrigin(0.5);

    const titleText = this.add.text(0, -5, title, {
      fontSize: '20px',
      color: '#F4ECF7',
      fontFamily: 'Courier New',
      fontStyle: 'bold'
    });
    titleText.setOrigin(0.5);

    const subtitleText = this.add.text(0, 20, subtitle, {
      fontSize: '16px',
      color: '#D7BDE2',
      fontFamily: 'Courier New'
    });
    subtitleText.setOrigin(0.5);

    const detailText = this.add.text(0, 40, detail, {
      fontSize: '13px',
      color: '#C39BD3',
      fontFamily: 'Courier New'
    });
    detailText.setOrigin(0.5);

    const badge = this.add.circle(0, -60, 12, color);

    const container = this.add.container(x, y, [background, badge, emojiText, titleText, subtitleText, detailText]);
    container.setDepth(1000);
    return container;
  }
}
