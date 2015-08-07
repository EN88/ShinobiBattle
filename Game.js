
ShinobiBattle.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

ShinobiBattle.Game.prototype = {

    create: function () {
      
      this.player_sprite;
      this.enemy_sprite;
      this.hit_sprite;
      this.blood_sprite;

      this.player = {
        life: true,
        way: 49,
        trace: 800,
        hp: 100,
        chakra: 100,
        speed: 250,
        str: 1300,
        stamina: 100,
        sh_cap: 50,
        name: 'Kakashi'
      };

      this.enemy = {
        life: true,
        way: -49,
        trace: -800,  
        hp: 100,
        chakra: 100,
        speed: 250,
        str: 1300,
        stamina: 100,
        sh_cap: 50,
        name: 'Itachi'
      };

      this.platforms;
      this.cursors;
      //spacja to player_fire
      this.player_fire;
      this.upKey;
      // specKey = 'l'
      this.specKey;
      this.escKey;

      this.vials;
      this.heart;
      this.chakra;
      this.weapon;
      
      this.shuriken;
      this.shurikens;
      this.enemy_shuriken;
      this.enemy_shurikens;
      this.shuriken_dmg = 6; 

      this.g = 2500;


      //Dzwieki
      this.clash1_fx;
      this.clash2_fx;
      this.stab_fx;
      this.fall_fx;
      this.jump_fx;
      this.throw_fx_1;
      this.throw_fx_2;
      this.heal_fx;
      //Volume
      this.user_volume = 0.2;

      //Animations
      this.shu_animations;
      this.blood_animations;
      this.aura_animations;    
      
      
      
      
      
      

      //Włączamy fizyke platformówki 
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //Dodajemy obrazek tła
      //game.add.sprite(0, 0, 'sky');
      this.game.add.sprite(0, 0, 'ancienttemple');

      //Grupa 'platforms' zawiera 'ground' oraz dwie belki 'ladges'
      this.platforms = this.game.add.group();

      //Włączamy fizyke dla wszystkich obiektów z grupy 'platforms'
      this.platforms.enableBody = true;

      //Tworzymy 'ground'
      var ground = this.platforms.create(-10, this.game.world.height-40, 'ground');

      //Skalowanie obrazka do szerokosci gry
      ground.scale.setTo(1.2, 0.4);

      //obiekty z grupy 'ground' sa stałe
      ground.body.immovable = true;

      //Tworzymy dwie belki 
      var ledge = this.platforms.create(670, 350, 'ground');
      ledge.scale.setTo(0.7, 0.45);
      ledge.body.immovable = true;

      this.ladge = this.platforms.create(-120, 250, 'ground');
      this.ladge.scale.setTo(0.5, 0.4);
      this.ladge.body.immovable = true;


      //Gracz i ustawienia
      this.player_sprite = this.game.add.sprite(30, this.game.world.height-150, 'player_sprite');
      
      //Właczamy fizyke dla gracza
      this.game.physics.arcade.enable(this.player_sprite);
      
      //Ustawienia fizyki gracza
      this.player_sprite.body.bounce.y = 0.1;
      this.player_sprite.body.gravity.y = this.g;
      this.player_sprite.body.collideWorldBounds = true;
      

      //Dwie animacje chodzenia w lewo i prawo
      this.player_sprite.animations.add('left', [2, 1, 0], 8, true);
      this.player_sprite.animations.add('idle', [3], 10, false);
      this.player_sprite.animations.add('right', [4, 5, 6], 8, true);


      this.enemy_sprite = this.game.add.sprite(600, this.game.world.height-150, 'enemy_sprite');
      this.game.physics.arcade.enable(this.enemy_sprite);
      this.enemy_sprite.body.bounce.y = 0.1;
      this.enemy_sprite.body.gravity.y = this.g;
      this.enemy_sprite.body.collideWorldBounds = true;
      this.enemy_sprite.animations.add('left', [2, 1, 0], 8, true);
      this.enemy_sprite.animations.add('idle', [3], 10, false);
      this.enemy_sprite.animations.add('right', [4, 5, 6], 8, true);


      //Dodaje vials do grupy
      this.vials = this.game.add.group();
      this.vials.enableBody = true;

      //Tworzymy X losowo rozmieszczonych viali
      for (var i = 0; i < 2; i++) {
        //Tworzy viala wewnatrz grupy 'vials'
        var vials = this.vials.create(i + 1 * Math.random() * 1000, 0, 'vial');
        
        vials.body.gravity.y = 350;
        vials.body.bounce.y = 0.4;
      }
      
      




      this.shurikens = this.game.add.group();
      this.shurikens.enableBody = true;

      this.shurikens.physicsBodyType = Phaser.Physics.ARCADE;
      this.shurikens.createMultiple(1, 'shuriken');
      this.shurikens.setAll('anchor.x', 0.5);
      //wysykosc miejsca rzutu shurikena
      this.shurikens.setAll('anchor.y', 0.1);
      this.shurikens.setAll('outOfBoundsKill', true);
      this.shurikens.setAll('checkWorldBounds', true);


      this.enemy_shurikens = this.game.add.group();
      this.enemy_shurikens.enableBody = true;

      this.enemy_shurikens.physicsBodyType = Phaser.Physics.ARCADE;

      //enemy_shurikens.createMultiple(1, 'shuriken_silver');
      this.enemy_shurikens.createMultiple(1, 'shuriken_silver');
      this.enemy_shurikens.setAll('anchor.x', 0.5);
      //wysykosc miejsca rzutu shurikena
      this.enemy_shurikens.setAll('anchor.y', 0.1 );
      this.enemy_shurikens.setAll('outOfBoundsKill', true);
      this.enemy_shurikens.setAll('checkWorldBounds', true);


      
      
      //GUI
      this.heart = this.game.add.image(80, -5, 'heart');
      this.heart = this.game.add.image(875, -5, 'heart');
      this.chakra = this.game.add.image(90, 37, 'chakra');
      this.chakra = this.game.add.image(885, 37, 'chakra');
      this.stamina = this.game.add.image(92, 70, 'stamina');
      this.stamina = this.game.add.image(887, 70, 'stamina');
      this.weapon = this.game.add.image(60, 97, 'shuriken_silver_big')
      this.weapon = this.game.add.image(918, 97, 'shuriken_silver_big')
      
      // Punkty

      //Health
      this.player_hp_bar = this.game.add.text(20, 5, this.player.hp +'% ', { fontSize: '25px', fill: '#fff' });  
      this.player_hp_bar.render = function(player) {
        this.text = Math.max(player.hp, 0) + '% ';
      }

      this.enemy_hp_bar = this.game.add.text(927, 5, this.enemy.hp +'% ', { fontSize: '25px', fill: '#fff' });  
      this.enemy_hp_bar.render = function(enemy) {
        this.text = Math.max(enemy.hp, 0) + '% ';
      }

      //Chakra
      this.player_chakra_bar = this.game.add.text(20, 35, this.player.chakra +'% ', { fontSize: '25px', fill: '#fff' });
      this.player_chakra_bar.render = function(player) {
        this.text = Math.max(player.chakra, 0) + '% ';
      }

      this.enemy_chakra_bar = this.game.add.text(927, 35, this.enemy.chakra +'% ', { fontSize: '25px', fill: '#fff' });
      this.enemy_chakra_bar.render = function(enemy) {
        this.text = Math.max(enemy.chakra, 0) + '% ';
      }  

      //Stamina
      this.player_stamina_bar = this.game.add.text(20, 65, this.player.chakra +'% ', { fontSize: '25px', fill: '#fff' });  
      this.player_stamina_bar.render = function(player) {
        this.text = Math.max(player.stamina, 0) + '% ';
      }  

      this.enemy_stamina_bar = this.game.add.text(927, 65, this.enemy.chakra +'% ', { fontSize: '25px', fill: '#fff' });
      this.enemy_stamina_bar.render = function(enemy) {
        this.text = Math.max(enemy.stamina, 0) + '% ';
      }    

      //Shurikens
      this.player_shuriken_bar = this.game.add.text(20, 95, this.player.sh_cap, { fontSize: '25px', fill: '#fff' });  
      this.enemy_shuriken_bar = this.game.add.text(960, 95, this.enemy.sh_cap, { fontSize: '25px', fill: '#fff' });  

      
      
      //Instaluje klawiature
      this.cursors = this.game.input.keyboard.createCursorKeys();

      this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
      this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
      this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
      //specjalne klawisze do ataku
      this.player_fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.specKey = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
      this.escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

      //Teksty
      this.winText = this.game.add.text(this.game.world.centerX,this.game.world.centerY,' ', { font: '24px Arial', fill: '#000' });
      this.winText.anchor.setTo(0.5, 0.5);
      this.winText.visible = false;


      //Dzwieki
      this.clash1_fx = this.game.add.audio("clash1_fx");
      this.clash2_fx = this.game.add.audio("clash2_fx", this.user_volume);

      this.stab_fx = this.game.add.audio("stab_fx", this.user_volume);

      this.fall_fx = this.game.add.audio("fall_fx", this.user_volume);

      this.jump_fx = this.game.add.audio('jump_fx', this.user_volume + 0.4);

      this.throw_fx_1 = this.game.add.audio('throw_1_fx', this.user_volume);
      this.throw_fx_2 = this.game.add.audio('throw_2_fx', this.user_volume);

      this.heal_fx = this.game.add.audio('heal_up_fx', this.user_volume + 0.2);


      //Animacje

      //shuriken clash
      this.shu_animations = this.game.add.group();
      this.shu_animations.enableBody = true;
      this.shu_animations.physicsBodyType = Phaser.Physics.ARCADE;
      this.shu_animations.createMultiple(30, 'shu_animation');
      this.shu_animations.setAll('anchor.x', 0.5);
      this.shu_animations.setAll('anchor.y', 0.5);
      this.shu_animations.forEach( function(shu_animation) {
        shu_animation.animations.add('shu_animation');  
      });

      //Blood
      this.blood_animations = this.game.add.group();
      this.blood_animations.enableBody = true;
      this.blood_animations.physicsBodyType = Phaser.Physics.ARCADE;
      this.blood_animations.createMultiple(30, 'blood_animation');
      this.blood_animations.setAll('anchor.x', 0.5);
      this.blood_animations.setAll('anchor.y', 0.5);
      this.blood_animations.forEach( function(blood_animation) {
        blood_animation.animations.add('start', [0, 1, 2, 3, 4, 5], 10, true); 
      });

      this.aura_animations = this.game.add.group();
      this.aura_animations.enableBody = true;
      this.aura_animations.physicsBodyType = Phaser.Physics.ARCADE;
      this.aura_animations.createMultiple(1, 'aura_animation');
      this.aura_animations.setAll('anchor.x', 0.5);
      this.aura_animations.setAll('anchor.y', 0.5);
      this.aura_animations.forEach( function(aura_animation) {
        aura_animation.animations.add('start', [2, 3, 4, 5, 6, 8, 9 , 8, 7, 5, 3], 10, true); 
      });

    },

  
  
    update: function () {

      //Kolizja gracza z graczem
      this.game.physics.arcade.overlap(this.player_sprite, this.enemy_sprite, this.playersCollison, null, this);
      this.game.physics.arcade.collide(this.player_sprite, this.enemy_sprite);
      
      //Kolizja gracza, shurikenów i mikstur z platformami
      this.game.physics.arcade.collide(this.player_sprite, this.platforms);
      this.game.physics.arcade.collide(this.enemy_sprite, this.platforms);
      this.game.physics.arcade.collide(this.vials, this.platforms);
      this.game.physics.arcade.overlap(this.shurikens, this.platforms, this.platformsCollision, null, this);
      this.game.physics.arcade.overlap(this.enemy_shurikens, this.platforms, this.platformsCollision, null, this);

      //Sprawdza czy player zetknal sie z jakas stars, jesli tak to call collect function
      this.game.physics.arcade.overlap(this.player_sprite, this.vials, this.collect, null, this);
      this.game.physics.arcade.overlap(this.enemy_sprite, this.vials, this.collect, null, this);



      //Resetowanie predkosci poruszania gracza na osi x
      this.enemy_sprite.body.velocity.x = 0;

      if (this.cursors.left.isDown) {
        //Idzie w lewo
        this.enemy_sprite.body.velocity.x = -this.enemy.speed;
        //odegraj animacje
        this.enemy_sprite.animations.play('left');
        //
        this.enemy.way = -49;
        this.enemy.trace = -800;

      } else if (this.cursors.right.isDown) {
        this.enemy_sprite.body.velocity.x = this.enemy.speed;
        this.enemy_sprite.animations.play('right');
        this.enemy.way = 49;
        this.enemy.trace = 800;    
      } else {
        this.enemy_sprite.animations.play('idle');
//        this.enemy_sprite.animations.stop();
      }

      if (this.player_fire.isDown && this.player.life) {
        this.throw_shuriken(this.player_sprite);
      }


      this.player_sprite.body.velocity.x = 0;

      if (this.leftKey.isDown) {
        //Idzie w lewo
        this.player_sprite.body.velocity.x = -this.player.speed;

        //odegraj animacje
        this.player_sprite.animations.play('left');
        //
        this.player.way = -49;
        this.player.trace = -800;

      } else if (this.rightKey.isDown) {
        this.player_sprite.body.velocity.x = this.player.speed;
        this.player_sprite.animations.play('right');
        this.player.way = 49;
        this.player.trace = 800;    
      } else {
        this.player_sprite.animations.play('idle');
//        this.player_sprite.animations.stop();
      }  

      if (this.specKey.isDown && this.enemy.life) {
        this.throw_shuriken(this.enemy_sprite);
      } 

      //Pozwolenie na skok jesli dotyka obiektu trwalego 
      if (this.cursors.up.isDown && this.enemy_sprite.body.touching.down && this.enemy.chakra >=5) {
        this.enemy_sprite.body.velocity.y = -this.enemy.str;
        this.jump(this.enemy);
      }
      if (this.upKey.isDown && this.player_sprite.body.touching.down && this.player.chakra >=5) {
        this.player_sprite.body.velocity.y = -this.player.str;
        this.jump(this.player);
      }  
      
      //Escape button 
      if (this.escKey.isDown) {
        this.quitGame();
      }

      //Sprite shuriken kolizja
      this.game.physics.arcade.overlap(this.shurikens, this.enemy_sprite, this.shurikenCollision, null, this);
      this.game.physics.arcade.overlap(this.enemy_shurikens, this.player_sprite, this.shurikenCollision, null, this);


      //Kolizja dla samych shurikenów
      this.game.physics.arcade.overlap(this.enemy_shurikens, this.shurikens, this.shurikenCollision, null, this);

    },

  
  
  
    //Kiedy sprite ma kolizje z diamentem
    collect: function(sprite, vial) {
      vial.kill();
      this.heal_fx.play();
      
      this.aura_animation = this.aura_animations.getFirstExists(false);
      this.aura_animation.reset()
      this.aura_animation.scale.setTo(1.5, 1.5);
      this.aura_animation.reset(sprite.body.x + sprite.body.halfWidth, sprite.body.y + sprite.body.halfHeight+25);
      this.aura_animation.alpha = 0.6;
      this.aura_animation.play('start', 30, false, true);
      

      if (sprite == this.player_sprite) {
        this.player.hp += 10;
        this.player.chakra += 10;
      } else {
        this.enemy.hp += 10;
        this.enemy.chakra += 10;
      }
        
      this.refresh_bar();
    },


    shurikenCollision: function(sprite, jutsu) {

      if (sprite == this.player_sprite) {
        this.attack(this.player);
        this._blood(sprite, jutsu);
      } else if (sprite == this.enemy_sprite) {
        this.attack(this.enemy);
        this._blood(sprite, jutsu);
      } else if (sprite == this.enemy_shurikens || this.shurikens && jutsu == this.enemy_shurikens || this.shurikens) {
        this.shu_animation = this.shu_animations.getFirstExists(false);
        this.shu_animation.reset()
        this.shu_animation.reset(jutsu.body.x + jutsu.body.halfWidth, jutsu.body.y + jutsu.body.halfHeight);
        this.shu_animation.alpha = 0.9;
        this.shu_animation.play('shu_animation', 30, false, true);

        sprite.kill();
        jutsu.kill();
        this.clashSound();
      } 

      jutsu.kill();
      this.refresh_bar();
    },

  
    _blood: function(sprite, jutsu) {
        this.blood_animation = this.blood_animations.getFirstExists(false);
        this.blood_animation.reset()
        this.blood_animation.reset(sprite.body.x + sprite.body.halfWidth, sprite.body.y + sprite.body.halfHeight-10);
        this.blood_animation.alpha = 0.7;
        this.blood_animation.play('start', 30, false, true);
    },

  
    platformsCollision: function(shuriken, platforms) {
      shuriken.kill();
      this.fall_fx.play();
    },


    playersCollison: function (player1, player2) {

    },


    attack: function(target) {
      if (target.hp > 0) {
        target.hp -= this.shuriken_dmg;
        this.stab_fx.play();
        if (target.hp <= 0) {
          target.life = false;
          this.win(target)
        }
      } else {
          target.life = false;
          this.win(target)
      }
    },


    win: function(p) {
      if (p == this.player) {
        this.player_sprite.kill();
      } else if (p == this.enemy) {
        this.enemy_sprite.kill();
      }
      this.winText.text = p.name + " is a winner!, \n Click to restart"
      this.winText.visible = true;
      this.spaceRestart = this.specKey.onDown.addOnce(this._restart,this);
    },


    _restart: function() {
      //zamiast tego dac restart gry lub counter wygranych i reset rozgrywki mapy
      this.winText.visible = false;
      this.spaceRestart.detach();
      this.restart();
    },

    restart: function() {
      this.create();
      //tak zeby sie resetowala gra ale punkty za mecz zostawały
    },


    refresh_bar: function() {
      this.player_hp_bar.render(this.player);
      this.player_chakra_bar.render(this.player);
      this.player_stamina_bar.render(this.player);
      this.player_shuriken_bar.text = this.player.sh_cap;

      this.enemy_hp_bar.render(this.enemy);
      this.enemy_chakra_bar.render(this.enemy);
      this.enemy_stamina_bar.render(this.enemy);
      this.enemy_shuriken_bar.text = this.enemy.sh_cap;
    },


    throw_shuriken: function(sprite) {
      if (sprite === this.player_sprite) {
        if (this.player.sh_cap > 0 && this.player.stamina >= 1 && this.player.life) {
          this.shuriken = this.shurikens.getFirstExists(false);
          if (this.shuriken) {
            this.shuriken.reset(this.player_sprite.x + this.player.way, this.player_sprite.y + 18);
            this.shuriken.body.velocity.x = this.player.trace;
            this.player.stamina -= 1;
            this.player.sh_cap -= 1;
            this.throwSound();
            this.refresh_bar();
          }
        }
      } else if (sprite === this.enemy_sprite) {
          if (this.enemy.sh_cap > 0 && this.enemy.stamina >= 1 && this.enemy.life) {
            this.enemy_shuriken = this.enemy_shurikens.getFirstExists(false);
            if (this.enemy_shuriken) {
            // +45 +25 bo inne wymiary shurikena dla tej postaci
            this.enemy_shuriken.reset(this.enemy_sprite.x+45 + this.enemy.way, this.enemy_sprite.y + 25);
            this.enemy_shuriken.body.velocity.x = this.enemy.trace;
            this.enemy.stamina -= 1;
            this.enemy.sh_cap -= 1;
            this.throwSound();
            this.refresh_bar();
          }
        }
      }
    },

  
    throwSound: function() {
      var x = Math.floor(Math.random() * 3) +1;

      if (x === 1) {
        this.throw_fx_1.play();
      } else {
        this.throw_fx_2.play();
      } 
    },

  
    clashSound: function() {
      //25% na dziwiek clash1 i 75% na clash2
      var x = Math.floor(Math.random() * 4) +1;

      if (x === 1) {
        this.clash1_fx.play();
      } else {
        this.clash2_fx.play();
      } 
    },

  
    jump: function(he) {
      he.stamina -= 1;
      this.jump_fx.play();
      this.refresh_bar();
    },
  
  

    
  
    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};


// "AzraelTycka" - Pomoc w debugowaniu i fazach 
// "" - Troche grafiki 


// Projekt: Phaser.js od zera do gry w 72h
// Linie kodu: 600+15 
// 44.5 z 72h 

// 26.06 5h
// 27.06 9h
// 14.07 6h
// 15.07 2h
// 20.07 4h 
// 22.07 3h
// 24.07 4h
// 25.07 3.5h (Migracja do szablonu ze 'state')
// 26.07 8h (sprity)



// Problemy i upelszenia


// Inne sprity postaci

// Balans

// *Wyswietlanie DMG nad glową gracza 

// *Wymyslic atak specjalny jutsu za chakre
  //Atak specjalny jutsu kazdy gracz ma wlasne np. Amaterasu vs Doton albo Suiton

// *Atak z bliska lub odrzut po kolizji graczy
  //Atak kataną za stamine

// limit czasowy shurikena wyrzucanego a nie ze zabija na hita bo stoi metr od celu !!

// Ekran Menu
  //Play - Author - FB link + Ikona do wylaczania dzwieku albo do regulacji glośnosci
    //Po play ekran z info o sterowaniu

// Licznik rund format 0:0 po wygranej reset rozgrywki i update wyniku

// szybszy skok, wieksza predkosc w powietrzu a nie jak w smole, jak teraz. [] 

// Error przy efekcie zebrania viali jesli jeden sie nie skonczyl

// brak sufitu w mapie



//duckTape, podstawki pod doniczki, kabel do wentylatora