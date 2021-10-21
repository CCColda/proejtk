import { decrypt } from 'xtea';
import * as yaml from 'yaml';
import { StageData, StageFile, StageFileBase } from './stage';
import { Buffer } from 'buffer/';
import { ERRORS } from './constants';

const ACCEPTED_MIME = Object.freeze([
	"application/json", "text/yaml", "text/x-yaml",
	"application/x-yaml", "text/vnd.yaml"
]);

export type LoadStageResult =
	["success", StageData] | [number, {}];

function padBuffer(buffer: Buffer, length: number, fill: number = 0x00) {
	return Buffer.concat([buffer, Buffer.alloc(Math.max(0.0, length - buffer.length), fill)]);
}

export function decryptStageData(data: string, size: number, key: string): StageData | null {
	const keybuffer = Buffer.from(key);
	const keybytexor = keybuffer.reduce((a, b) => a ^ b);

	const xtea_key = padBuffer(keybuffer.slice(0, 16), 16, keybytexor);
	const xtea_iv = padBuffer(keybuffer.slice(16, 24), 8, keybytexor);
	const xtea_data = Buffer.from(data, "hex");

	try {
		const decrypted = JSON.parse(
			decrypt(xtea_data, xtea_key, "cbc", xtea_iv, true)
				.toString("utf-8")
				.slice(0, size)
		) as StageData;

		return decrypted;
	}
	catch (exc) {
		console.error("Decrypt error", exc);
		return null;
	}
}

async function loadStageFileRaw(path: string): Promise<StageFile | null> {
	const resp = await fetch(path, {
		method: "GET", headers: {
			"Accept": ACCEPTED_MIME.join(',')
		}
	});

	if (!resp.ok)
		return null;

	try {
		return (
			resp.headers.get("Content-Type").match("application/json")
				? await resp.json()
				: yaml.parse(await resp.text())
		) as StageFile;
	}
	catch (exc) {
		console.error("Parse error", exc);
		return null;
	}
}

export async function loadStageFileMeta(path: string): Promise<StageFileBase | null> {
	const stagefile = await loadStageFileRaw(path);

	if (!stagefile)
		return null;

	return {
		author: stagefile.author,
		title: stagefile.title,
	};
}

export async function loadStageFile(path: string, key?: string): Promise<LoadStageResult> {
	const stagefile = await loadStageFileRaw(path);

	if (!stagefile)
		return [ERRORS.PARSE, {}];

	// todo: 
	// intellisense made me do this
	if (stagefile.encrypted == true) {
		if (!key)
			return [ERRORS.KEY_NEEDED, {}];

		const decrypted = decryptStageData(stagefile.data, stagefile.size, key);

		if (!decrypted)
			return [ERRORS.DECRYPT, {}];

		return ["success", decrypted];
	}
	else {
		return ["success", stagefile];
	}
}