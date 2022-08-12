/**
 * 游戏设置类
 * @classdesc 提供游戏设置的读写接口
 */
class GameSettings {
	constructor() {
		const settings = {
			showedInputText: false,
		};
		const json = localStorage.getItem("settings") || "{}";
		try {
			Object.assign(settings, JSON.parse(json));
		} catch (e) {
			console.error(e);
		}
		this._settings = settings;
	}

	save() {
		localStorage.setItem("settings", JSON.stringify(this._settings));
	}

	get showedInputText() {
		return this._settings.showedInputText;
	}
	set showedInputText(value) {
		if (typeof value != "boolean") {
			return false;
		}
		this._settings.showedInputText = value;
		return true;
	}
}


const gameSettings = new GameSettings();

window.addEventListener("unload", () => {
	gameSettings.save();
});

export {
	gameSettings,
}
