import { BaseSubworldScene } from './BaseSubworldScene';

export class WorkExperienceScene extends BaseSubworldScene {
  private jobInfoContainers: Phaser.GameObjects.Container[] = [];
  private platformPositions: Array<{ x: number; y: number }> = [];

  constructor() {
    super({ key: 'WorkExperienceScene' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x34495E);

    // Title
    const title = this.add.text(width / 2, 40, 'Work Experience', {
      fontSize: '42px',
      color: '#ECF0F1',
      fontFamily: 'Courier New',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    // Create platforms
    this.platforms = this.physics.add.staticGroup();

    // Ground
    const groundHeight = 50;
    const ground = this.add.rectangle(width / 2, height - groundHeight / 2, width, groundHeight, 0x7F8C8D);
    this.platforms.add(ground);

    // Fighting game platform layout - 5 platforms total
    const centerX = width / 2;

    // Top platform (center)
    const topY = height - 500;
    const topPlatform = this.add.rectangle(centerX, topY, 250, 20, 0x95A5A6);
    topPlatform.setData('canDropThrough', true);
    this.platforms.add(topPlatform);
    this.platformPositions.push({ x: centerX, y: topY });
    this.createInfoBox(centerX, topY - 80, 0xE74C3C);
    const job1 = this.createJobInfo(centerX, topY - 130, 'Company A', 'Software Engineer', '2022-2023', 0xE74C3C);
    job1.setVisible(false);
    this.jobInfoContainers.push(job1);

    // Middle-left platform
    const midY = height - 350;
    const midLeftPlatform = this.add.rectangle(centerX - 300, midY, 280, 20, 0x95A5A6);
    midLeftPlatform.setData('canDropThrough', true);
    this.platforms.add(midLeftPlatform);
    this.platformPositions.push({ x: centerX - 300, y: midY });
    this.createInfoBox(centerX - 300, midY - 80, 0x3498DB);
    const job2 = this.createJobInfo(centerX - 300, midY - 130, 'Company B', 'Senior Developer', '2021-2022', 0x3498DB);
    job2.setVisible(false);
    this.jobInfoContainers.push(job2);

    // Middle-right platform
    const midRightPlatform = this.add.rectangle(centerX + 300, midY, 280, 20, 0x95A5A6);
    midRightPlatform.setData('canDropThrough', true);
    this.platforms.add(midRightPlatform);
    this.platformPositions.push({ x: centerX + 300, y: midY });
    this.createInfoBox(centerX + 300, midY - 80, 0x2ECC71);
    const job3 = this.createJobInfo(centerX + 300, midY - 130, 'Company C', 'Tech Lead', '2020-2021', 0x2ECC71);
    job3.setVisible(false);
    this.jobInfoContainers.push(job3);

    // Bottom-left platform
    const bottomY = height - 200;
    const bottomLeftPlatform = this.add.rectangle(centerX - 400, bottomY, 200, 20, 0x95A5A6);
    bottomLeftPlatform.setData('canDropThrough', true);
    this.platforms.add(bottomLeftPlatform);

    // Bottom-right platform
    const bottomRightPlatform = this.add.rectangle(centerX + 400, bottomY, 200, 20, 0x95A5A6);
    bottomRightPlatform.setData('canDropThrough', true);
    this.platforms.add(bottomRightPlatform);

    // Exit portal
    this.exitPortal = this.createExitPortal(80, height - groundHeight);

    // Create player and setup
    this.createPlayer(150, height - 150, 'player-work');
    this.setupControls();
    this.setupOnewayPlatforms();
    this.createExitButton();
  }

  private exitPortal!: { x: number; y: number };

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
    this.updateJobInfoVisibility();
  }

  private updateJobInfoVisibility() {
    this.jobInfoContainers.forEach((container, index) => {
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

  private createJobInfo(x: number, y: number, company: string, role: string, dates: string, color: number): Phaser.GameObjects.Container {
    // Background panel
    const bgWidth = 260;
    const bgHeight = 110;
    const background = this.add.rectangle(0, 0, bgWidth, bgHeight, 0x2c2c2c, 0.95);
    background.setStrokeStyle(2, color);

    const badge = this.add.circle(0, -45, 15, color);

    const companyText = this.add.text(0, -10, company, {
      fontSize: '24px',
      color: '#ECF0F1',
      fontFamily: 'Courier New',
      fontStyle: 'bold'
    });
    companyText.setOrigin(0.5);

    const roleText = this.add.text(0, 18, role, {
      fontSize: '18px',
      color: '#BDC3C7',
      fontFamily: 'Courier New'
    });
    roleText.setOrigin(0.5);

    const datesText = this.add.text(0, 40, dates, {
      fontSize: '14px',
      color: '#95A5A6',
      fontFamily: 'Courier New'
    });
    datesText.setOrigin(0.5);

    const container = this.add.container(x, y, [background, badge, companyText, roleText, datesText]);
    container.setDepth(1000);
    return container;
  }
}
