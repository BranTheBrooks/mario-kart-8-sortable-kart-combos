const keys = [
	"Driver",
	"Body",
	"Tire",
//	"Glider",
	"Speed Ground",
	"Speed Water",
	"Speed Air",
	"Speed AG",
	"Accel",
	"Weight",
	"Handle Ground",
	"Handle Water",
	"Handle Air",
	"Handle AG",
	"Tract",
	"Mini-Turbo",
	"Inside Drift",
];

const sort = key => {
	combos.sort((a, b) => b[key] - a[key]);
};

const shorten = () => {
	const short = [];
	for (i = 0; i < 300; i++) {
		short.push(combos[i]);
	}
	return short;
};

const count = () => {
	let x = 0;
	for (i = 0; i < combos.length; i++) {
		x++;
	}
	console.log(x);
};

const minimum = array => {
	let newkey = "Min(" + array[0];
	for (i = 1; i < array.length; i++) {
		newkey = newkey + ", " + array[i];
	}
	newkey = newkey + ")";
	for (c = 0; c < combos.length; c++) {
		const combo = combos[c];
		let stats = [];
		for (a = 0; a < array.length; a++) {
			const key = array[a];
			stats.push(combo[key]);
		}
		const stat = Math.min(...stats);
		combos[c][newkey] = stat;
	}
	keys.push(newkey);

	sort(newkey);
	display();
};

const combine = array => {
	let newkey = "Sum(" + array[0];
	for (i = 1; i < array.length; i++) {
		newkey = newkey + ", " + array[i];
	}
	newkey = newkey + ")";

	for (c = 0; c < combos.length; c++) {
		const combo = combos[c];
		let stat = 0;
		for (a = 0; a < array.length; a++) {
			const key = array[a];
			stat += combo[key];
		}
		combos[c][newkey] = stat;
	}
	keys.push(newkey);

	sort(newkey);
	display();
};

const wrapper = document.querySelector(".wrapper");

const display = () => {

	const sortBy = key => {
		sort(key);
		display();
	};

	const oldTable = document.querySelector("table");
	if (wrapper.contains(oldTable)) {
		oldTable.remove();
	};

	const table = document.createElement("table");

	const header = document.createElement("tr");
	for (c = 0; c < 3; c++) {
		const key = keys[c];
		const cell = document.createElement("th");
		cell.append(key);
		header.append(cell);
	}
	for (c = 4; c < keys.length; c++) {
		const key = keys[c];
		const cell = document.createElement("th");
		const button = document.createElement("button");
		button.onclick = () => sortBy(key);
		button.append(key);
		cell.append(button);
		header.append(cell);
	}
	header.classList.add("key-row");
	table.append(header);

	const list = shorten();
	for (r = 0; r < list.length; r++) {
		const combo = list[r];
		const row = document.createElement("tr");

		for (c = 0; c < keys.length; c++) {
			const key = keys[c];
			const cell = document.createElement("td");
			cell.append(combo[key]);
			row.append(cell);
		}

		row.classList.add(combo["Driver"]);
		table.append(row);
	}
	wrapper.append(table);
};

const populateForm = () => {
	const form = document.querySelector("form");

	const boxList = document.querySelector(".box-list")

	for (i = 3; i < keys.length; i++) {
		const key = keys[i];

		const item = document.createElement("li");

		const box = document.createElement("input");
		box.type = "checkbox";
		box.name = key;
		box.value = key;
		box.id = key;
		box.classList.add("box");
		item.append(box);

		const label = document.createElement("label");
		label.setAttribute("for", key)
		label.append(key);
		item.append(label);

		boxList.append(item);
	}

	const onSubmit = () => {
		const boxes = document.querySelectorAll(".box");
		const checkedBoxes = [];
		for (i = 0; i < boxes.length; i++) {
			const box = boxes[i];
			if (box["checked"]) {
				checkedBoxes.push(box["value"]);
			}
		}

		const columnType = document.querySelector(".radio:checked").value;

		if (columnType === "minimum") {
			minimum(checkedBoxes);
		} else {
			combine(checkedBoxes);
		}
	};

	const formButton = document.querySelector(".form-button");

	formButton.onclick = () => {
		if (form.style.display === "block") {
			form.style.display = "none";
			formButton.innerText = "Create New Column";
		} else {
			form.style.display = "block";
			formButton.innerText = "Hide";
		}

	};

	form.addEventListener("submit", event => event.preventDefault());
	form.addEventListener("submit", onSubmit);
}

populateForm();

display();
