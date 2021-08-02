import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  // fpsText
  // fullWidth
  // bottomCap
  // middle
  // topCap
  // bottomShadowCap
  // middleShadow

  // fullHeight
  // cursors
  // spacebar
  // score
  // lifter

  // idleFrames
  // successFrames
  // finishFrames

  // justWon

  // chear

  constructor() {
    super({ key: 'MainScene' });
    this.fullHeight = 300;
    this.score = 0;
  }

  create() {
    //this.fpsText = new FpsText(this)

    this.chear = this.sound.add('chear');

    // sprite
    const spriteY = this.cameras.main.height * 0.55;
    const spriteX = this.cameras.main.width * 0.5;

    this.lifter = this.add.sprite(spriteX, spriteY, 'lifter', '0-1.png');
    this.lifter.setScale(1.5, 1.5);

    //this.frameNames = this.anims.generateFrameNames('lifter', { prefix: '1-', end: 34, suffix: '.png'})

    //idle animation - play once
    this.idleFrames = [
      { key: 'lifter', frame: '0-1.png' },
      { key: 'lifter', frame: '0-2.png' },
      { key: 'lifter', frame: '0-3.png' },
      { key: 'lifter', frame: '0-2.png' },
    ];
    this.anims.create({
      key: 'idle',
      frames: this.idleFrames,
      frameRate: 2,
      repeat: -1,
    });
    this.lifter.anims.play('idle');

    this.successFrames = this.anims.generateFrameNames('lifter', {
      prefix: '1-',
      start: 1,
      end: 30,
      suffix: '.png',
    });
    this.anims.create({
      key: 'success',
      frames: this.successFrames,
      frameRate: 5,
    });
    //this.lifter.anims.play('success');

    this.finishFrames = this.anims.generateFrameNames('lifter', {
      prefix: '1-',
      start: 31,
      end: 34,
      suffix: '.png',
    });
    this.anims.create({
      key: 'finish',
      frames: this.finishFrames,
      frameRate: 5,
    });
    //this.lifter.anims.play('finish');

    // bar
    const barY = this.cameras.main.height * 0.75;
    const barX = this.cameras.main.width * 0.75;

    // background shadow
    this.bottomShadowCap = this.add
      .image(barX, barY, 'bottom-cap-shadow')
      .setOrigin(0.5, 0);

    this.middleShadow = this.add
      .image(barX, this.bottomShadowCap.y - this.fullHeight, 'middle-shadow')
      .setOrigin(0.5, 0);

    this.middleShadow.displayHeight = this.fullHeight;

    this.add
      .image(barX, this.middleShadow.y, 'top-cap-shadow')
      .setOrigin(0.5, 1);

    // health bar

    this.bottomCap = this.add.image(barX, barY, 'bottom-cap').setOrigin(0.5, 0);

    this.topCap = this.add
      .image(barX, this.bottomCap.y - this.fullHeight, 'top-cap')
      .setOrigin(0.5, 1);

    this.middle = this.add
      .image(this.topCap.x, this.topCap.y, 'middle')
      .setOrigin(0.5, 0);

    this.setMeterPercentage(this.score);

    console.log(this.score);

    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.events.once('fullBar', this.fullHandler, this);
  }

  fullHandler() {
    console.log('full handler');
    this.lifter.anims.play('success');
    this.chear.play();
    this.events.once('fullBar', this.fullHandler, this);
    this.events.once('finish', this.finishHandler, this);
  }

  finishHandler() {
    if (this.score == 0) {
      this.lifter.anims.play('idle');
    }
  }

  setMeterPercentage(percent = 1) {
    const topDrop = this.fullHeight * (1 - percent);
    const height = this.fullHeight * percent;
    this.topCap.y = this.topCap.y + topDrop;
    this.middle.y = this.topCap.y;
    this.middle.displayHeight = height;
  }

  setMeterPercentageAnimated(percent = 1, duration = 500) {
    const topDrop = this.fullHeight * (1 - percent);
    const height = this.fullHeight * percent;

    this.tweens.add({
      targets: this.topCap,
      y: this.middleShadow.y + topDrop,
      ease: Phaser.Math.Easing.Sine.Out,
      onUpdate: () => {
        this.middle.y = this.topCap.y;
        this.middle.displayHeight = this.bottomCap.y - this.topCap.y;
        this.bottomCap.visible = this.middle.displayHeight > 0;
        this.middle.visible = this.middle.displayHeight > 0;
        this.topCap.visible = this.middle.displayHeight > 0;
      },
      onComplete: () => {
        if (this.topCap.y == this.bottomCap.y) {
          this.finishHandler();
        }
      },
    });
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (this.justWon == true) {
        this.setMeterPercentageAnimated(this.score);
        this.justWon = false;
        this.lifter.anims.play('finish');
      } else {
        const gain = Phaser.Math.FloatBetween(0, 0.3);
        console.log(gain);
        this.score = this.score + gain;
        if (this.score > 1) {
          this.score = 1;
        }
        this.setMeterPercentageAnimated(this.score);
      }
    }

    if (this.score >= 1) {
      this.events.emit('fullBar');
      this.score = 0.0;
      this.justWon = true;
    }
  }
}
