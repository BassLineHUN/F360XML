import merger from "./merger.mjs";

// https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function upload() {
	if (["#ger", "#hun"].every((id) => document.querySelector(id).files[0] !== undefined)){
		document.querySelector("button").disabled = false;
	}
}
const readfile = (file) => {
	return new Promise((res, rej) => {
		var reader = new FileReader();

		reader.onload = (e) => res(e.target.result);

		reader.readAsText(file);
	});
}

function process() {
	const files = ["#ger", "#hun"].map((id) => document.querySelector(id).files[0]);

	Promise.all(files.map((f) => readfile(f))).then(([german, hun]) => {
		const result = merger(german.split("\n"), hun.split("\n")).join("\n");
		download("res.xml", result);
	})
}

[...document.querySelectorAll("input[type=file]")].forEach((i) => i.addEventListener("change", upload));
[...document.querySelectorAll("button")].forEach((b) => b.addEventListener("click", process));
