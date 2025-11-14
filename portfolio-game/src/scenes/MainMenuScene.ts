import Phaser from 'phaser';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  preload() {
    // Assets will be loaded here in future phases
  }

  create() {
    // Add a simple title text
    const titleText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 100,
      'Game Starting Soon...',
      {
        fontSize: '32px',
        color: '#ffffff',
        fontFamily: 'Courier New'
      }
    );
    titleText.setOrigin(0.5);

    // Add instruction text
    const instructionText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Hub World will appear here\nwhen Phase 3 is implemented',
      {
        fontSize: '18px',
        color: '#aaaaaa',
        fontFamily: 'Courier New',
        align: 'center'
      }
    );
    instructionText.setOrigin(0.5);

    // Add a pulsing effect to the title
    this.tweens.add({
      targets: titleText,
      alpha: 0.5,
      duration: 1000,
      yoyo: true,
      repeat: -1
    });
  }

  update() {
    // Game loop updates will go here
  }
}
