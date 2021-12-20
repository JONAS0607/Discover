(function () {
	var cnv = document.querySelector('canvas');
	var ctx = cnv.getContext('2d');
	var LEFT = 65;
	var UP = 87;
	var RIGHT = 68;
	var DOWN = 83;

	var ENTER = 13;
	var SPACE = 32;

	var MV_LEFT = false;
	var SHOOT = false;
	var MV_RIGHT = false;
	var SPACE_IS_DOWN = false;
	//---------VARIÁVEIS ESTADOS
	var LOADING = 0,
		PLAYING = 1,
		PAUSED = 2,
		OVER = 3;
	var game_state = LOADING;
	//---------FIM VARIÁVEIS ESTADOS
	//---------------ARRAYS
	var sprites = [];
	var assets_to_load = [];
	var missiles = [];
	var aliens = [];
	var messages = [];

	//--  variáveis uteis
	var alien_frequency = 100; // frequencia de criação de aliens
	var alien_timer = 0;
	var shots = 0;
	var hits = 0;
	var accuracy = 0;
	var score_to_win = 70;
	var FIRE = 0,
		EXPLOSION = 1;
	//--fim aliens uteis

	//sprites

	var background = new Sprite(0, 56, 400, 500, 0, 0);
	sprites.push(background);
	var defender = new Sprite(0, 0, 30, 50, 185, 450);
	sprites.push(defender);
	//mensagem inicial da tela
	var start_message = new Object_message(
		cnv.height / 2,
		'PRESS ENTER',
		'#F00',
		20,
	);
	messages.push(start_message);
	//mensagem de pause
	var pause_message = new Object_message(cnv.height / 2, 'PAUSED', '#F00', 20);
	pause_message.visible = false;
	messages.push(pause_message);

	//mensagem gameover
	var game_over_message = new Object_message(cnv.height / 2, '', '#F00', 20);
	game_over_message.visible = false;
	messages.push(game_over_message);

	//placar
	var score_message = new Object_message(10, '', '#0f0', 15);
	update_score();
	messages.push(score_message);
	//images
	var img = new Image();
	img.addEventListener('load', loadHandler, false);
	img.src = './img/img.png';
	assets_to_load.push(img);

	//contador de recursos
	var loaded_assets = 0;

	//--------------------
	window.addEventListener(
		'keydown',
		function (e) {
			var key = e.keyCode;
			switch (key) {
				case LEFT:
					MV_LEFT = true;
					break;
				case RIGHT:
					MV_RIGHT = true;
					break;
				case SPACE:
					if (!SPACE_IS_DOWN) {
						SHOOT = true;
						SPACE_IS_DOWN = true;
					}
					break;
			}
		},
		false,
	);
	window.addEventListener(
		'keyup',
		function (e) {
			var key = e.keyCode;
			// console.log(key);
			switch (key) {
				case LEFT:
					MV_LEFT = false;
					break;
				case RIGHT:
					MV_RIGHT = false;
					break;
				case SPACE:
					if (SPACE_IS_DOWN) {
						SPACE_IS_DOWN = false;
						// SHOOT = false;
					}
					break;
				case ENTER:
					if (game_state !== OVER) {
						if (game_state !== PLAYING) {
							game_state = PLAYING;
							start_message.visible = false;
							pause_message.visible = false;
						} else {
							game_state = PAUSED;
							pause_message.visible = true;
						}
					}
					break;
			}
		},
		false,
	);
	//---------------FUNÇÕES

	function loadHandler() {
		loaded_assets++;
		if (loaded_assets === assets_to_load.length) {
			img.removeEventListener('load', loadHandler, false);
			//inicia o jogo
			game_state = PAUSED;
		}
	}
	function loop() {
		window.requestAnimationFrame(loop, cnv);
		switch (game_state) {
			case LOADING:
				console.log('loading...');
				break;
			case PLAYING:
				update();
				break;
			case OVER:
				end_game();
				break;
		}
		render();
	}

	function update() {
		if (MV_LEFT && !MV_RIGHT) {
			defender.vx = -5;
		}
		if (MV_RIGHT && !MV_LEFT) {
			defender.vx = 5;
		}
		if (!MV_RIGHT && !MV_LEFT) {
			defender.vx = 0;
		}
		//--dispara o missile
		if (SHOOT) {
			fire_missile();
			SHOOT = false;
		}
		//--fim dispara o missile

		//--Atualiza posição dos missiles
		for (var i in missiles) {
			var missile = missiles[i];
			missile.y += missile.vy;
			if (missile.y < -missile.img_h) {
				remove_object(missile, sprites);
				remove_object(missile, missiles);
				update_score();
				i--;
			}
		}
		//increment alien timer
		alien_timer++;
		//criação do alien, caso timer se iguale a frequencia

		// console.log(`array aliens : ${aliens.length}`);
		if (alien_timer === alien_frequency) {
			make_alien();
			alien_timer = 0;
			// ajuste na frequencia de criação de aliens
			if (alien_frequency > 70) {
				alien_frequency--;
			}
		}

		//--fim Atualiza posição dos missiles
		//--posição dos aliens
		for (var i in aliens) {
			var alien = aliens[i];

			if (alien.state !== alien.EXPLODED) {
				alien.y += alien.vy;
				if (alien.state === alien.CRAZY) {
					if (alien.x > cnv.width - alien.img_w || alien.x < 0) {
						alien.vx *= -1;
					}
					alien.x += alien.vx;
				}
			}
			// if (alien.y > cnv.height + alien.img_h) {
			// 	remove_object(alien, sprites);
			// 	remove_object(alien, aliens);
			// 	i--;
			// }
			//CONFERE SE O ALIEN CHEGOU A TERRA
			if (alien.y > cnv.height + alien.img_h) {
				game_state = OVER;
				// game_over_message.visible = true;
			}
			//CONFERE SE ALGUM ALIEN COLIDIU COM A NAVE
			if (collide(alien, defender)) {
				destroy_alien(alien);
				remove_object(defender, sprites);
				game_state = OVER;
			}

			// VERIFICA COLISÃO missile e alien

			for (var j in missiles) {
				var missile = missiles[j];
				if (collide(missile, alien) && alien.state !== alien.EXPLODED) {
					destroy_alien(alien);
					hits++;
					update_score();
					if (parseInt(hits) === score_to_win) {
						game_state = OVER;
						// DESTROI TODOS OS ALIENS
						for (var k in aliens) {
							var alien_k = aliens[k];
							destroy_alien(alien_k);
						}
					}
					remove_object(missile, sprites);
					remove_object(missile, missiles);
					j--;
					i--;
				}
			}

			//FIM VERIFICA COLISÃO
		}
		//--fim posição dos aliens
		//--limita a posição da nave na canvas
		defender.x = Math.max(
			0,
			Math.min(cnv.width - defender.img_w, defender.x + defender.vx),
		);
		//-- Fim limita a posição da nave na canvas
	}
	//EFEITOS SONOROS
	function play_sound(sound_type) {
		var sound = document.createElement('audio');
		if (sound_type == EXPLOSION) {
			sound.src = './sound/explosion.ogg';
		} else {
			sound.src = './sound/fire.ogg';
		}
		sound.addEventListener(
			'canplaythrough',
			function () {
				sound.play();
			},
			false,
		);
	}
	//Game over function
	function end_game() {
		if (hits < score_to_win) {
			game_over_message.txt = 'EARTH DESTROYED!';
		} else {
			game_over_message.txt = 'EARTH SAVED!';
			game_over_message.color = '#00f';
		}
		game_over_message.visible = true;
		setTimeout(() => {
			location.reload(); //atualiza a pagina
		}, 3000);
	}
	//atualiza placar
	function update_score() {
		if (shots == 0) {
			accuracy = 100;
		} else {
			accuracy = Math.floor((hits / shots) * 100);
		}
		//ajuste no texto para não mudar na tela
		if (accuracy < 100) {
			accuracy = accuracy.toString();
			if (accuracy.length < 2) {
				accuracy = '  ' + accuracy;
			} else {
				accuracy = ' ' + accuracy;
			}
		}
		hits = hits.toString();
		if (hits.length < 2) {
			hits = '0' + hits;
		}
		score_message.txt = `HITS: ${hits} - ACCURACY: ${accuracy}%`;
	}
	//--Cria alien
	function make_alien() {
		var alien_pos_random = Math.floor(Math.random() * 8) * 50;
		var alien = new Alien(30, 0, 50, 50, alien_pos_random, -50);
		alien.vy = 0.5;
		//OTIMIZA ALIEN
		if (Math.floor(Math.random() * 11) > 7) {
			alien.state = alien.CRAZY;
			alien.vx = 1.5;
		}
		if (Math.floor(Math.random() * 11) > 5) {
			alien.vy = 1.1;
		}
		sprites.push(alien);
		aliens.push(alien);
	}
	function destroy_alien(alien) {
		alien.state = alien.EXPLODED;
		alien.explode();
		play_sound(EXPLOSION);
		setTimeout(() => {
			remove_object(alien, sprites);
			remove_object(alien, aliens);
		}, 1000);
	}
	//--Fim Cria alien
	//--CRIA O MISSILE
	function fire_missile() {
		var missile = new Sprite(
			136,
			12,
			8,
			13,
			defender.center_x() - 4,
			defender.y - 13,
		);
		missile.vy = -8;
		sprites.push(missile);
		missiles.push(missile);
		play_sound(FIRE);
		shots++;
	}
	//--FIM CRIA O MISSILE
	//REMOVE OBJETOS DO JOGO
	function remove_object(object_to_remove, array) {
		var i = array.indexOf(object_to_remove);
		if (i !== -1) {
			array.splice(i, 1);
		}
	}
	//FIM REMOVE OBJETOS DO JOGO
	function render() {
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		//exibe os sprites
		if (sprites.length !== 0) {
			for (var i in sprites) {
				var spr = sprites[i];
				ctx.drawImage(
					img,
					spr.img_x,
					spr.img_y,
					spr.img_w,
					spr.img_h,
					Math.floor(spr.x),
					Math.floor(spr.y),
					spr.img_w,
					spr.img_h,
				);
			}
		}
		//exibe os textos
		if (messages.length !== 0) {
			for (var i in messages) {
				var msg = messages[i];
				if (msg.visible) {
					ctx.font = msg.font;
					ctx.fillStyle = msg.color;
					ctx.textBaseline = msg.baseline;
					msg.x = (cnv.width - ctx.measureText(msg.txt).width) / 2;
					ctx.fillText(msg.txt, msg.x, msg.y);
				}
			}
		}
	}

	loop();
})();
