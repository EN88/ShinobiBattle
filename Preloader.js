
ShinobiBattle.Preloader = function (game) {

	this.preloaderBG = null;

	this.ready = false;

};

ShinobiBattle.Preloader.prototype = {

	preload: function () {

      //Images
      this.game.load.image('ancienttemple', 'assets/img/background.jpg');
      this.game.load.image('ground', 'assets/img/ground.png');
      this.game.load.image('vial', 'assets/img/hp.png');
      this.game.load.image('shuriken', 'assets/img/shuriken.png');
      this.game.load.image('shuriken_gold', 'assets/img/shuriken_gold.png');
      this.game.load.image('shuriken_silver', 'assets/img/shuriken_silver.png');
      
      //Game GUI Images
      this.game.load.image('heart', 'assets/imgTest/heart.png');
      this.game.load.image('chakra', 'assets/imgTest/chakra.png');
      this.game.load.image('stamina', 'assets/imgTest/stamina.png');
      this.game.load.image('shuriken_silver_big', 'assets/img/shuriken_silver_big.png')
      //Menu Images
      this.game.load.image('MenuBG', 'assets/img/MenuBG2.jpg');
      this.game.load.image('playButton', 'assets/img/startbutton.png');
      
      //Menu Audio
      this.game.load.audio('MenuMusic', 'assets/fx/MenuMusic.mp3');
      
      //Sprite Sheet
      this.game.load.spritesheet('player_sprite', 'assets/img/Madara2.png', 64.857, 75);
      this.game.load.spritesheet('enemy_sprite', 'assets/img/Madara2b.png', 64.857, 75);
      this.game.load.spritesheet('shu_animation', 'assets/img/hit2.png');
      this.game.load.spritesheet('blood_animation', 'assets/img/blood2.png', 78, 78);
      this.game.load.spritesheet('aura_animation', 'assets/img/aura.png', 150, 140);
      
      
      //Audio
      this.game.load.audio('clash1_fx', 'assets/fx/clash3.wav');
      this.game.load.audio('clash2_fx', 'assets/fx/clash4.wav');
      this.game.load.audio('stab_fx', 'assets/fx/stab.wav');
      this.game.load.audio('fall_fx', 'assets/fx/fall.wav');
      this.game.load.audio('jump_fx', 'assets/fx/jump1.wav');
      this.game.load.audio('throw_1_fx', 'assets/fx/throw_1.wav');
      this.game.load.audio('throw_2_fx', 'assets/fx/throw_2.wav');
      this.game.load.audio('heal_up_fx', 'assets/fx/heal_up.wav');    

	},

	create: function () {
      this.state.start('MainMenu');  
	}



};
