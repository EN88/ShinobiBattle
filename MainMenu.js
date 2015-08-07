
ShinobiBattle.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
    this.aboutButton = null;

};

ShinobiBattle.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

//		this.music = this.add.audio('MenuMusic', 0.2, true);
//		this.music.play();

		this.add.sprite(0, 0, 'MenuBG');

		this.playButton = this.add.button(10, 430, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
        this.aboutButton = this.add.button(10, 230, 'playButton', this.startAbout, this, 'buttonOver', 'buttonOut', 'buttonOver');
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
//		this.music.stop();

		//	And start the actual game
      ShinobiBattle.muzyka.stop();
		this.state.start('Game');

	},
  
    startAbout: function (pointer) {
        
        this.state.start('About');
    }

};
