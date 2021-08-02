import Phaser from 'phaser'

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('phaser-logo', '../../assets/img/phaser-logo.png')

    // this.load.image('left-cap', 'assets/img/bar/barHorizontal_green_left.png')
	  // this.load.image('middle', 'assets/img/bar/barHorizontal_green_mid.png')
	  // this.load.image('right-cap', 'assets/img/bar/barHorizontal_green_right.png')

	  // this.load.image('left-cap-shadow', 'assets/img/bar/barHorizontal_shadow_left.png')
	  // this.load.image('middle-shadow', 'assets/img/bar/barHorizontal_shadow_mid.png')
	  // this.load.image('right-cap-shadow', 'assets/img/bar/barHorizontal_shadow_right.png')

    this.load.image('bottom-cap', '../../assets/img/bar/barVertical_blue_bottom.png')
	  this.load.image('middle', '../../assets/img/bar/barVertical_blue_mid.png')
	  this.load.image('top-cap', '../../assets/img/bar/barVertical_blue_top.png')

	  this.load.image('bottom-cap-shadow', '../../assets/img/bar/barVertical_shadow_bottom.png')
	  this.load.image('middle-shadow', '../../assets/img/bar/barVertical_shadow_mid.png')
	  this.load.image('top-cap-shadow', '../../assets/img/bar/barVertical_shadow_top.png')

    this.load.audio('chear', '../../assets/chear3.mp3')
  }

  create() {
    this.scene.start('MainScene')


    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
