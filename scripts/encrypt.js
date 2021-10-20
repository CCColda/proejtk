const fs = require('fs/promises');
const path = require('path');
const xtea = require('xtea');
const yaml = require('yaml');

function padBuffer(buffer, length, fill = 0x00) {
	return Buffer.concat([buffer, Buffer.alloc(Math.max(0.0, length - buffer.length), fill)]);
}

async function loadFileData(filepath) {
	const fileText = await fs.readFile(filepath, "utf-8");
	const fileData = [".yaml", ".yml"].includes(path.extname(filepath))
		? yaml.parse(fileText)
		: JSON.parse(fileText);

	return fileData;
}

async function encrypt(key, filedata) {
	const fileDataJSON = JSON.stringify({
		start: filedata.start,
		stages: filedata.stages
	});

	const keybuffer = Buffer.from(key);
	const keybytexor = keybuffer.reduce((a, b) => a ^ b);

	const xtea_key = padBuffer(keybuffer.slice(0, 16), 16, keybytexor);
	const xtea_iv = padBuffer(Buffer.from(key).slice(16, 24), 8, keybytexor);
	const databuffer = Buffer.from(fileDataJSON, "utf-8");
	const xtea_data = Buffer.concat([databuffer, Buffer.alloc(8 - ((databuffer.length % 8) || 8))]);

	try {
		const encrypted = xtea.encrypt(xtea_data, xtea_key, "cbc", xtea_iv, true).toString("hex");
		return { size: fileDataJSON.length, data: encrypted };
	}
	catch (exc) {
		console.error("Encrypt error", exc);
		return null;
	}
}

if (require.main == module) {
	(async () => {
		const fileData = await loadFileData(process.argv[3]);

		const data = await encrypt(process.argv[2], fileData);

		const yamlObject = {
			author: fileData.author,
			title: fileData.title,
			encrypted: true,
			...data
		};

		await fs.writeFile(process.argv[4], yaml.stringify(yamlObject, { indent: 2, }));
	})();
}