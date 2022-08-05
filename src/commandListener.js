/**
 * 命令侦听器
 */
class CommandListener {
	constructor() {
		this._handlers = new Map();
	}

	addHandler(regexes, handler) {
		if (!Array.isArray(regexes)) {
			throw new Error("regexes must be array");
		}
		if (typeof handler != "function") {
			throw new Error("handler must be function");
		}
		this._handlers.set(regexes, handler);
		return true;
	}

	removeHandler(command) {
		//TODO
	}

	clearCommands() {
		return this._handlers.clear();
	}

	onNewCommand(command) {
		if (typeof command != "string") {
			throw new Error("command must be string");
		}
		for (const [regexes, fn] of this._handlers) {
			let index = 0;
			for (const regex of regexes) {
				const found = command.match(regex);
				if (!found) {
					index++;
					continue;
				}
				fn(index, found);
				return true;
			}
		}
		return false;
	}

}

const commandListener = new CommandListener();

export {
	commandListener,
}
