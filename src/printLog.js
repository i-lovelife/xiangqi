// 在页面中打印日志
function printLog(log, type) {
	const logsList = document.querySelector('#logs-list');
	let prefix = "";
	let className = "log";
	switch (type) {
		case "in":
			prefix = "input: ";
			className = "input-log";
			break;
		case "out":
			prefix = "output: ";
			className = "output-log";
			break;
	}

	const li = createListItem({
		innerHTML: prefix + log,
		classList: ["list-group-item", className],
	});
	logsList.appendChild(li);
	li.scrollIntoView();
}


function createListItem({
	innerHTML = "",
	classList = [],
	dataset = {},
}) {
	const li = document.createElement("li");
	li.setAttribute("role", "option");
	li.className = "list-group-item";
	li.innerHTML = innerHTML;
	classList.forEach(item => li.classList.add(item));
	for (const key in dataset) {
		li.dataset[key] = dataset[key];
	}
	return li;
}

export {
	printLog,
}
