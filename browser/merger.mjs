export default (german, hun) => {
	const hunmatch = Object.assign({}, ...hun.filter((hunline) => hunline.match("<message")).map((hunline) => hunline.match("name=\"(?<key>.*)\">(?<val>[^<]*)<").groups).map(({key, val}) => ({[key]: val})));

	return german.map((line) => {
		if (line.match("<message")) {
			const key = line.match("name=\"(?<key>.*)\">").groups.key;
			const match = hunmatch[key];
			return line.replace(/>(.*)</, match === undefined ? "><" : `>${match}<`);
		}else {
			return line;
		}
	});
};
