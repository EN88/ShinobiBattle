
ShinobiBattle.About = function (game) {

//	this.music = null;
	this.backButton = null;
    
};

ShinobiBattle.About.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

//		this.music = this.add.audio('MenuMusic', 0.2, true);
//		this.music.play();
//
//		this.add.sprite(0, 0, 'About');

		this.backButton = this.add.button(10, 430, 'playButton', this.MenuGame, this, 'buttonOver', 'buttonOut', 'buttonOver');

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	MenuGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
//		this.music.stop();

		//	And start the actual game
		this.state.start('MainMenu');

	}

};
