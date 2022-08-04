/**
 * @file
 * Artyom 的实例配置、全局事件侦听
 *  doc: https://docs.ourcodeworld.com/projects/artyom-js/documentation/methods/initialize
 */

import Artyom from "artyom.js";
import { printLog } from "./printLog";
import { commandListener } from "./commandListener";
import "./commands"

const artyom = new Artyom();
const artyomConfig = {
	lang: "zh-CN",
	speed: 2,
	volume: 1,
	mode: "normal",  //正常识别速度
	debug: false,
	// soundex: true,
	continuous: true,
	listen: true,
}


window.addEventListener("load", e => {
	artyom.initialize(artyomConfig).then(function () {
		console.log("Artyom has been correctly initialized");
	}).catch(function () {
		console.error("An error occurred during the initialization");
	});
	artyom.fatality();
});

//在 unload 之前关闭 artyom，用以解决刷新卡顿的问题
window.addEventListener("unload", e => {
	artyom.fatality();
})

//侦听所有指令
artyom.addCommands({
	smart: true,
	indexes: ["*"],
	action: function (i, command) {
		printLog(command, "in");
		//过滤中文标点
		command = command.replace(/[。；，：“”（）、？！《》]/g, "");
		commandListener.onNewCommand(command);
	}
});

// 开始聆听时播放提示音
import startRecordingUri from "/assets/sounds/startRecording.wav";
// import endRecordingUri from "/assets/sounds/endRecording.wav";
const startRecordingSound = new Audio(startRecordingUri);
// const endRecordingSound = new Audio(endRecordingUri);
artyom.when("COMMAND_RECOGNITION_START", function () {
	startRecordingSound.play();
});
artyom.when("COMMAND_RECOGNITION_END", function (status) {
	if (status.code == "continuous_mode_disabled") {
		// artyom.say("停止聆听");
	}
	// endRecordingSound.play();
});

//语音合成前暂停命令识别，合成结束后恢复
artyom.when("SPEECH_SYNTHESIS_START", function () {
	// artyom.fatality();
	artyom.dontObey();
});
artyom.when("SPEECH_SYNTHESIS_END", function () {
	// artyom.initialize(artyomConfig);
	artyom.obey();
});

//捕获 artyom error
artyom.when("ERROR", function (error) {
	if (error.code == "network") {
		alert("无法连接到互联网");
	}
	if (error.code == "audio-capture") {
		alert("未检测到麦克风");
	}
	if (error.code == "not-allowed") {
		alert("无法使用麦克风");
	}
	console.log(error.message);
});

// 捕获输出内容
{
	const say = artyom.say;
	artyom.say = function (text, ...params) {
		printLog(text, "out");
		return say.call(artyom, text, ...params);
	}
}

// 捕获识别内容
/*
artyom.redirectRecognizedTextOutput((recognized, isFinal) => {
	if (isFinal) {
		// Nothing
	} else {
		printLog(recognized, "in");
	}
});
*/
export {
	artyom,
	artyomConfig,
}
