import Phaser from "phaser";

export class HubWorldScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private portals!: Phaser.Physics.Arcade.StaticGroup;
  private proximityTexts!: Map<string, Phaser.GameObjects.Text>;
  private portalData: Array<{
    x: number;
    y: number;
    scene: string;
    label: string;
  }> = [];
  private jumpsRemaining: number = 2;
  private instructionText!: Phaser.GameObjects.Text;
  private hasPlayerMoved: boolean = false;
  private playerMovedTime: number = 0;
  private exitButton!: Phaser.GameObjects.Container;
  private welcomeText!: Phaser.GameObjects.Text;
  private typingMessages: string[] = [
    "welcome to my website!",
    "feel free to look around or use the exit button top left",
    "have fun!",
  ];
  private currentMessageIndex: number = 0;
  private currentCharIndex: number = 0;
  private typingSpeed: number = 50;
  private sunMoon!: Phaser.GameObjects.Arc;

  constructor() {
    super({ key: "HubWorldScene" });
  }

  // Helper method to create a portal (with optional asset)
  private createPortal(x: number, centerY: number, assetKey?: string): Phaser.GameObjects.GameObject {
    const portalWidth = 100;
    const portalHeight = 140;

    if (assetKey && this.textures.exists(assetKey)) {
      // Use asset if provided and exists
      const portalSprite = this.add.sprite(x, centerY, assetKey);
      portalSprite.setDisplaySize(portalWidth, portalHeight);
      portalSprite.setDepth(10);
      return portalSprite;
    } else {
      // Solid purple oval
      const portal = this.add.ellipse(x, centerY, portalWidth, portalHeight, 0x9b59b6, 1);
      portal.setDepth(10);

      // Pulsing animation
      this.tweens.add({
        targets: portal,
        alpha: 0.7,
        duration: 1500,
        yoyo: true,
        repeat: -1,
      });

      return portal;
    }
  }

  preload() {
    // Placeholder for assets
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Get time of day for dynamic background
    const timeOfDay = this.getTimeOfDay();
    this.createDynamicBackground(width, height, timeOfDay);

    // Add welcome text with typing animation
    this.welcomeText = this.add.text(width / 2, height / 2 - 200, "", {
      fontSize: "48px",
      color: "#ffffff",
      fontFamily: "Courier New",
      fontStyle: "bold",
    });
    this.welcomeText.setOrigin(0.5);
    this.welcomeText.setDepth(100);

    // Start typing animation
    this.startTypingAnimation();

    // Create platforms group
    this.platforms = this.physics.add.staticGroup();

    // Minecraft-style ground (blocky grass blocks)
    const groundHeight = 50;
    const blockSize = 50;
    const numBlocks = Math.ceil(width / blockSize);
    const grassHeight = blockSize / 10; // 1/10 of block height

    for (let i = 0; i < numBlocks; i++) {
      const x = i * blockSize + blockSize / 2;
      const y = height - blockSize / 2;

      // Dirt block (full size)
      const dirtBlock = this.add.rectangle(x, y, blockSize, blockSize, 0x8B4513);
      this.platforms.add(dirtBlock);

      // Thin grass layer on top
      this.add.rectangle(x, y - blockSize / 2 + grassHeight / 2, blockSize, grassHeight, 0x7CFC00);

      // Add block borders for Minecraft look
      const graphics = this.add.graphics();
      graphics.lineStyle(2, 0x000000, 0.3);
      graphics.strokeRect(x - blockSize / 2, y - blockSize / 2, blockSize, blockSize);
    }

    // Initialize proximity texts map
    this.proximityTexts = new Map();

    // Create player (blue square)
    this.player = this.physics.add.sprite(100, height - 150, "");
    this.player.setDisplaySize(32, 48);
    this.player.setTexture(this.createRectTexture("player", 32, 48, 0x4169e1));
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1000);

    // Create portals
    this.portals = this.physics.add.staticGroup();
    const groundY = height - groundHeight;

    this.portalData = [
      {
        x: 250,
        y: groundY,
        scene: "WorkExperienceScene",
        label: "Work Experience",
      },
      {
        x: width / 2,
        y: groundY,
        scene: "EducationScene",
        label: "Education, Leadership\nand Projects",
      },
      {
        x: width - 250,
        y: groundY,
        scene: "SkillsScene",
        label: "Skills and Interests",
      },
    ];

    this.portalData.forEach((data, index) => {
      const portalWidth = 100;
      const portalHeight = 140;
      const portalCenterY = data.y - portalHeight / 2;

      // Create portal (can pass asset key as third parameter to replace with image)
      this.createPortal(data.x, portalCenterY);

      // Store portal data
      const portalHitbox = this.add.rectangle(
        data.x,
        portalCenterY,
        portalWidth,
        portalHeight
      );
      portalHitbox.setAlpha(0);
      this.portals.add(portalHitbox);
      portalHitbox.setData("sceneKey", data.scene);
      portalHitbox.setData("index", index);

      // Create sign next to portal
      const signX = data.x + portalWidth / 2 + 80;
      const signY = portalCenterY;
      const signBg = this.add.rectangle(signX, signY, 180, 50, 0x654321);
      signBg.setDepth(11);

      const signText = this.add.text(signX, signY, data.label, {
        fontSize: "14px",
        color: "#ffffff",
        fontFamily: "Courier New",
        fontStyle: "bold",
        align: "center",
      });
      signText.setOrigin(0.5);
      signText.setDepth(12);

      // Create proximity text for portal entry
      const proximityText = this.add.text(
        data.x,
        portalCenterY - portalHeight / 2 - 30,
        "Press UP/W to enter",
        {
          fontSize: "16px",
          color: "#ffffff",
          backgroundColor: "#000000",
          padding: { x: 10, y: 5 },
        }
      );
      proximityText.setOrigin(0.5);
      proximityText.setVisible(false);
      proximityText.setDepth(500);
      this.proximityTexts.set(`portal_${index}`, proximityText);
    });

    // Setup controls
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasdKeys = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    // Add player collision with ground
    this.physics.add.collider(this.player, this.platforms);

    // Instruction text
    this.instructionText = this.add.text(
      width / 2,
      50,
      "Use WASD or Arrows to move • Press UP/W near portals to enter",
      {
        fontSize: "16px",
        color: "#ffffff",
        backgroundColor: "#000000",
        padding: { x: 10, y: 10 },
        align: "center",
      }
    );
    this.instructionText.setOrigin(0.5);
    this.instructionText.setDepth(2000);

    // Create EXIT button
    this.createExitButton();
  }

  update() {
    const speed = 450;

    // Movement
    if (this.cursors.left.isDown || this.wasdKeys.A.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown || this.wasdKeys.D.isDown) {
      this.player.setVelocityX(speed);
    } else {
      this.player.setVelocityX(0);
    }

    // Reset jump count when on ground
    if (this.player.body!.touching.down) {
      this.jumpsRemaining = 2;
    }

    // Check for UP press first (before jump check)
    const upJustPressed =
      Phaser.Input.Keyboard.JustDown(this.cursors.up!) ||
      Phaser.Input.Keyboard.JustDown(this.wasdKeys.W);

    // Check portal proximity and entry
    this.checkPortalEntry(upJustPressed);

    // Double jump (only if not entering portal)
    if (upJustPressed && !this.isNearPortal()) {
      if (this.jumpsRemaining > 0) {
        this.player.setVelocityY(-600);
        this.jumpsRemaining--;
      }
    }

    // Hide instructions after movement
    if (!this.hasPlayerMoved && this.player.body!.velocity.x !== 0) {
      this.hasPlayerMoved = true;
      this.playerMovedTime = this.time.now;
    }

    if (
      this.hasPlayerMoved &&
      this.time.now - this.playerMovedTime > 5000
    ) {
      this.instructionText.setVisible(false);
    }
  }

  private isNearPortal(): boolean {
    for (const portalInfo of this.portalData) {
      const portalCenterY = portalInfo.y - 70;
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        portalInfo.x,
        portalCenterY
      );

      if (distance < 100) {
        return true;
      }
    }
    return false;
  }

  private checkPortalEntry(upJustPressed: boolean) {
    let enteredPortal = false;

    for (let index = 0; index < this.portalData.length; index++) {
      const portalInfo = this.portalData[index];
      const portalCenterY = portalInfo.y - 70;
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        portalInfo.x,
        portalCenterY
      );

      const proximityText = this.proximityTexts.get(`portal_${index}`);

      if (distance < 100) {
        proximityText?.setVisible(true);

        // Enter portal with UP/W (just pressed, not held)
        if (upJustPressed && !enteredPortal) {
          enteredPortal = true;
          this.scene.stop();
          this.scene.start(portalInfo.scene, { portalIndex: index });
          return; // Exit early after entering portal
        }
      } else {
        proximityText?.setVisible(false);
      }
    }
  }

  private getTimeOfDay(): string {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 8) return "sunrise";
    if (hour >= 8 && hour < 17) return "noon";
    if (hour >= 17 && hour < 20) return "sunset";
    return "night";
  }

  private createDynamicBackground(
    width: number,
    height: number,
    timeOfDay: string
  ) {
    let skyColor1: number;
    let skyColor2: number;
    let celestialColor: number;
    let celestialY: number;

    switch (timeOfDay) {
      case "sunrise":
        skyColor1 = 0xffa07a; // Light salmon
        skyColor2 = 0x87ceeb; // Sky blue
        celestialColor = 0xffd700; // Gold sun
        celestialY = height * 0.7; // Low on horizon
        break;
      case "noon":
        skyColor1 = 0x87ceeb; // Sky blue
        skyColor2 = 0x4682b4; // Steel blue
        celestialColor = 0xffff00; // Bright yellow sun
        celestialY = height * 0.2; // High in sky
        break;
      case "sunset":
        skyColor1 = 0xff6347; // Tomato red
        skyColor2 = 0xff8c00; // Dark orange
        celestialColor = 0xff4500; // Orange-red sun
        celestialY = height * 0.7; // Low on horizon
        break;
      case "night":
      default:
        skyColor1 = 0x191970; // Midnight blue
        skyColor2 = 0x000033; // Very dark blue
        celestialColor = 0xf0f0f0; // White moon
        celestialY = height * 0.3; // Mid-high in sky
        break;
    }

    // Create gradient background
    const graphics = this.add.graphics();
    for (let i = 0; i < height; i++) {
      const color = Phaser.Display.Color.Interpolate.ColorWithColor(
        Phaser.Display.Color.ValueToColor(skyColor1),
        Phaser.Display.Color.ValueToColor(skyColor2),
        height,
        i
      );
      graphics.fillStyle(
        Phaser.Display.Color.GetColor(color.r, color.g, color.b)
      );
      graphics.fillRect(0, i, width, 1);
    }

    // Add sun or moon
    this.sunMoon = this.add.circle(width * 0.8, celestialY, 40, celestialColor);
    this.sunMoon.setDepth(10);

    // Add glow for sun/moon
    if (timeOfDay !== "night") {
      // Sun glow
      const glow = this.add.circle(
        width * 0.8,
        celestialY,
        60,
        celestialColor,
        0.3
      );
      glow.setDepth(9);
    } else {
      // Moon craters
      this.add.circle(width * 0.8 - 10, celestialY - 5, 8, 0xd3d3d3);
      this.add.circle(width * 0.8 + 5, celestialY + 10, 6, 0xd3d3d3);
      this.add.circle(width * 0.8 - 5, celestialY + 15, 5, 0xd3d3d3);
    }

    // Add clouds (except at night)
    if (timeOfDay !== "night") {
      for (let i = 0; i < 5; i++) {
        const cloudX = (width / 6) * (i + 1);
        const cloudY = height * 0.2 + Math.random() * 100;
        this.createCloud(cloudX, cloudY);
      }
    } else {
      // Add stars at night
      for (let i = 0; i < 50; i++) {
        const starX = Math.random() * width;
        const starY = Math.random() * (height * 0.6);
        const star = this.add.circle(starX, starY, 2, 0xffffff);
        this.tweens.add({
          targets: star,
          alpha: 0.3,
          duration: 1000 + Math.random() * 2000,
          yoyo: true,
          repeat: -1,
        });
      }
    }
  }

  private createCloud(x: number, y: number) {
    const cloud = this.add.container(x, y);
    const cloudColor = 0xffffff;

    const circle1 = this.add.circle(0, 0, 30, cloudColor, 0.8);
    const circle2 = this.add.circle(-25, 5, 25, cloudColor, 0.8);
    const circle3 = this.add.circle(25, 5, 25, cloudColor, 0.8);
    const circle4 = this.add.circle(0, 15, 20, cloudColor, 0.8);

    cloud.add([circle1, circle2, circle3, circle4]);
    cloud.setDepth(15);

    // Slowly drift clouds
    this.tweens.add({
      targets: cloud,
      x: x + 100,
      duration: 30000,
      repeat: -1,
      yoyo: true,
    });
  }

  private createRectTexture(
    key: string,
    width: number,
    height: number,
    color: number
  ): string {
    const graphics = this.add.graphics();
    graphics.fillStyle(color, 1);
    graphics.fillRect(0, 0, width, height);
    graphics.generateTexture(key, width, height);
    graphics.destroy();
    return key;
  }

  private createExitButton() {
    const buttonWidth = 80;
    const buttonHeight = 40;
    const x = 50;
    const y = 30;

    const bg = this.add.rectangle(0, 0, buttonWidth, buttonHeight, 0x000000, 0.7);
    const border = this.add.rectangle(0, 0, buttonWidth, buttonHeight);
    border.setStrokeStyle(2, 0xffffff);

    const text = this.add.text(0, 0, "EXIT", {
      fontSize: "18px",
      color: "#ffffff",
      fontFamily: "Courier New",
      fontStyle: "bold",
    });
    text.setOrigin(0.5);

    this.exitButton = this.add.container(x, y, [bg, border, text]);
    this.exitButton.setSize(buttonWidth, buttonHeight);
    this.exitButton.setInteractive({ useHandCursor: true });
    this.exitButton.setDepth(3000);

    this.exitButton.on("pointerover", () => {
      bg.setFillStyle(0x333333, 0.9);
    });

    this.exitButton.on("pointerout", () => {
      bg.setFillStyle(0x000000, 0.7);
    });

    this.exitButton.on("pointerdown", () => {
      window.location.reload();
    });
  }

  private startTypingAnimation() {
    this.currentCharIndex = 0;
    this.currentMessageIndex = 0;
    this.typeNextCharacter();
  }

  private typeNextCharacter() {
    const currentMessage = this.typingMessages[this.currentMessageIndex];

    if (this.currentCharIndex < currentMessage.length) {
      this.welcomeText.setText(
        currentMessage.substring(0, this.currentCharIndex + 1)
      );
      this.currentCharIndex++;
      this.time.delayedCall(this.typingSpeed, () => this.typeNextCharacter());
    } else {
      if (this.currentMessageIndex >= this.typingMessages.length - 1) {
        return;
      }

      this.time.delayedCall(2000, () => {
        this.welcomeText.setText("");
        this.currentCharIndex = 0;
        this.currentMessageIndex++;
        this.time.delayedCall(500, () => this.typeNextCharacter());
      });
    }
  }
}
