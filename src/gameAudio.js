class SoundPlayer {
	constructor() {
		this.sounds = {};
	}

	load(soundName, soundPath) {
		this.sounds[soundName] = new Audio(soundPath);
	}

	loadAll(sounds) {
		for (const soundName in sounds) {
			this.load(soundName, sounds[soundName]);
		}
	}

	play(soundName) {
		if (!this.sounds[soundName]) {
			throw new Error("Sound not found");
		}
		this.sounds[soundName].play();
		return new Promise((resolve, reject) => {
			this.sounds[soundName].addEventListener("ended", () => {
				resolve();
			}, {
				once: true,
			});
		});
	}

	stop(soundName) {
		if (!this.sounds[soundName]) {
			throw new Error("Sound not found");
		}
		this.sounds[soundName].pause();
		this.sounds[soundName].currentTime = 0;
	}

	stopAll() {
		for (const soundName in this.sounds) {
			this.stop(soundName);
		}
	}
}


import gameStartedSoundUri from "/assets/sounds/gameStarted.ogg";
import moveCompletedSoundUri from "/assets/sounds/moveCompleted.ogg";
import moveFailedSoundUri from "/assets/sounds/moveFailed.ogg";
import captureSoundUri from "/assets/sounds/capture.ogg";
import checkSoundUri from "/assets/sounds/check.ogg";
import drawSoundUri from "/assets/sounds/draw.ogg";
import winSoundUri from "/assets/sounds/win.ogg";
import loseSoundUri from "/assets/sounds/lose.ogg";

const soundPlayer = new SoundPlayer();
soundPlayer.loadAll({
	"gameStarted": gameStartedSoundUri,
	"moveCompleted": moveCompletedSoundUri,
	"moveFailed": moveFailedSoundUri,
	"capture": captureSoundUri,
	"check": checkSoundUri,
	"draw": drawSoundUri,
	"win": winSoundUri,
	"lose": loseSoundUri,
});

export {
	soundPlayer,
}
