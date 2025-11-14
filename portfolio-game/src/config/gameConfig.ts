import Phaser from 'phaser';
import { HubWorldScene } from '../scenes/HubWorldScene';
import { WorkExperienceScene } from '../scenes/WorkExperienceScene';
import { EducationScene } from '../scenes/EducationScene';
import { SkillsScene } from '../scenes/SkillsScene';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
    min: {
      width: 640,
      height: 360
    },
    max: {
      width: 1920,
      height: 1080
    }
  },
  parent: 'game-container',
  backgroundColor: '#2d2d2d',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1200, x: 0 },
      debug: false
    }
  },
  scene: [HubWorldScene, WorkExperienceScene, EducationScene, SkillsScene]
};
