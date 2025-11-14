import Phaser from 'phaser';

export abstract class BaseSubworldScene extends Phaser.Scene {
  protected player!: Phaser.Physics.Arcade.Sprite;
  protected cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  protected wasdKeys!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  protected platforms!: Phaser.Physics.Arcade.StaticGroup;
  protected exitPipe!: Phaser.Physics.Arcade.Sprite;
  protected jumpsRemaining: number = 2;
  protected exitButton!: Phaser.GameObjects.Container;
  protected lastDownPress: number = 0;
  protected currentPlatform: any = null;
  protected exitProximityText?: Phaser.GameObjects.Text;

  protected createPlayer(x: number, y: number, textureKey: string) {
    this.player = this.physics.add.sprite(x, y, '');
    this.player.setDisplaySize(32, 48);
    this.player.setTexture(this.createRectTexture(textureKey, 32, 48, 0x4169E1));
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1000);
  }

  protected setupControls() {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasdKeys = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };
  }

  protected updatePlayerMovement() {
    const speed = 450;

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

    // Double jump
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up!) || Phaser.Input.Keyboard.JustDown(this.wasdKeys.W)) {
      if (this.jumpsRemaining > 0) {
        this.player.setVelocityY(-600);
        this.jumpsRemaining--;
      }
    }

    // Drop through platforms (only thin platforms, not ground)
    if ((this.cursors.down.isDown || this.wasdKeys.S.isDown) && this.player.body!.touching.down && this.currentPlatform) {
      // Check if current platform is drop-through enabled (has the data tag)
      if (this.currentPlatform.getData('canDropThrough')) {
        // Temporarily disable collision to allow drop through
        this.player.body!.checkCollision.down = false;
        this.time.delayedCall(200, () => {
          if (this.player.body) {
            this.player.body.checkCollision.down = true;
          }
        });
      }
    }
  }

  protected checkPortalExit(portalX: number, portalY: number): boolean {
    const distance = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      portalX,
      portalY
    );

    // Update proximity text visibility
    if (this.exitProximityText) {
      this.exitProximityText.setVisible(distance < 100);
    }

    // Only check for portal exit if player is close to the portal
    if (distance < 100) {
      const upJustPressed =
        Phaser.Input.Keyboard.JustDown(this.cursors.up!) ||
        Phaser.Input.Keyboard.JustDown(this.wasdKeys.W);

      if (upJustPressed) {
        this.scene.stop();
        this.scene.start('HubWorldScene');
        return true;
      }
    }
    return false;
  }

  protected createExitPortal(x: number, groundY: number, assetKey?: string) {
    const portalWidth = 100;
    const portalHeight = 140;
    const portalCenterY = groundY - portalHeight / 2;

    if (assetKey && this.textures.exists(assetKey)) {
      // Use asset if provided and exists
      const portalSprite = this.add.sprite(x, portalCenterY, assetKey);
      portalSprite.setDisplaySize(portalWidth, portalHeight);
      portalSprite.setDepth(10);
    } else {
      // Solid purple oval
      const portal = this.add.ellipse(x, portalCenterY, portalWidth, portalHeight, 0x9b59b6, 1);
      portal.setDepth(10);

      // Pulsing animation
      this.tweens.add({
        targets: portal,
        alpha: 0.7,
        duration: 1500,
        yoyo: true,
        repeat: -1,
      });
    }

    // Sign next to portal
    const signX = x + portalWidth / 2 + 60;
    const signY = portalCenterY;
    const signBg = this.add.rectangle(signX, signY, 120, 40, 0x654321);
    signBg.setDepth(11);

    const signText = this.add.text(signX, signY, 'EXIT', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Courier New',
      fontStyle: 'bold',
      align: 'center'
    });
    signText.setOrigin(0.5);
    signText.setDepth(12);

    // Proximity text (hidden by default, shown when player is near)
    this.exitProximityText = this.add.text(x, portalCenterY - portalHeight / 2 - 30, 'Press UP/W to exit', {
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    });
    this.exitProximityText.setOrigin(0.5);
    this.exitProximityText.setDepth(500);
    this.exitProximityText.setVisible(false);

    return { x, y: portalCenterY };
  }

  protected createExitButton() {
    const buttonWidth = 80;
    const buttonHeight = 40;
    const x = 50;
    const y = 30;

    const bg = this.add.rectangle(0, 0, buttonWidth, buttonHeight, 0x000000, 0.7);
    const border = this.add.rectangle(0, 0, buttonWidth, buttonHeight);
    border.setStrokeStyle(2, 0xffffff);

    const text = this.add.text(0, 0, 'EXIT', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Courier New',
      fontStyle: 'bold'
    });
    text.setOrigin(0.5);

    this.exitButton = this.add.container(x, y, [bg, border, text]);
    this.exitButton.setSize(buttonWidth, buttonHeight);
    this.exitButton.setInteractive({ useHandCursor: true });
    this.exitButton.setDepth(3000);

    this.exitButton.on('pointerover', () => {
      bg.setFillStyle(0x333333, 0.9);
    });

    this.exitButton.on('pointerout', () => {
      bg.setFillStyle(0x000000, 0.7);
    });

    this.exitButton.on('pointerdown', () => {
      window.location.reload();
    });
  }

  protected createRectTexture(key: string, width: number, height: number, color: number): string {
    const graphics = this.add.graphics();
    graphics.fillStyle(color, 1);
    graphics.fillRect(0, 0, width, height);
    graphics.generateTexture(key, width, height);
    graphics.destroy();
    return key;
  }

  protected createInfoBox(x: number, y: number, color: number = 0xFFD700): Phaser.GameObjects.Container {
    const boxSize = 35;

    // Outer border (darker)
    const outerBox = this.add.rectangle(0, 0, boxSize, boxSize, color, 1);
    outerBox.setStrokeStyle(3, 0x000000);

    // Inner highlight (lighter, creates 3D effect)
    const innerBox = this.add.rectangle(0, 0, boxSize - 8, boxSize - 8, color, 0.6);

    // Question mark
    const questionMark = this.add.text(0, 0, '?', {
      fontSize: '24px',
      color: '#000000',
      fontFamily: 'Arial Black',
      fontStyle: 'bold'
    });
    questionMark.setOrigin(0.5);

    const container = this.add.container(x, y, [outerBox, innerBox, questionMark]);
    container.setDepth(5);

    // Floating animation
    this.tweens.add({
      targets: container,
      y: y - 10,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Rotation animation
    this.tweens.add({
      targets: container,
      angle: 360,
      duration: 3000,
      repeat: -1,
      ease: 'Linear'
    });

    return container;
  }

  protected setupOnewayPlatforms() {
    // Make platforms one-way (can jump through from below)
    this.physics.add.collider(this.player, this.platforms, (player: any, platform: any) => {
      // Track current platform for drop-through logic
      this.currentPlatform = platform;
    }, (player: any, platform: any) => {
      // Only collide if player is falling and player's bottom is above platform's top edge
      const playerBottom = player.body.y + player.body.height;
      const platformTop = platform.body.y;
      return player.body.velocity.y >= 0 && playerBottom <= platformTop + 15;
    });
  }
}
