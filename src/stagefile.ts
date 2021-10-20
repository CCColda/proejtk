import { decrypt } from 'xtea';
import * as yaml from 'yaml';
import { StageData, StageFile } from './stage';
import { Buffer } from 'buffer/';

const ACCEPTED_MIME = Object.freeze([
	"application/json", "text/yaml", "text/x-yaml",
	"application/x-yaml", "text/vnd.yaml"
]);

const ERRORS = Object.freeze({
	KEY_NEEDED: 1,
	DECRYPT: 2,
	PARSE: 3,
});

export type LoadStageResult =
	["success", StageData] | [number, {}];

function padBuffer(buffer: Buffer, length: number, fill: number = 0x00) {
	return Buffer.concat([buffer, Buffer.alloc(Math.max(0.0, length - buffer.length), fill)]);
}

export async function loadStageFile(path: string, key?: string): Promise<LoadStageResult> {
	const resp = await fetch(path, {
		method: "GET", headers: {
			"Accept": ACCEPTED_MIME.join(',')
		}
	});

	try {
		const stagefile = resp.headers.get("Content-Type").match("application/json")
			? await resp.json() as StageFile
			: yaml.parse(await resp.text()) as StageFile;

		// todo: 
		// intellisense made me do this
		if (stagefile.encrypted == true) {
			if (!key) {
				return [ERRORS.KEY_NEEDED, {}];
			}

			const keybuffer = Buffer.from(key);
			const keybytexor = keybuffer.reduce((a, b) => a ^ b);

			const xtea_key = padBuffer(keybuffer.slice(0, 16), 16, keybytexor);
			const xtea_iv = padBuffer(keybuffer.slice(16, 24), 8, keybytexor);
			const xtea_data = Buffer.from(stagefile.data, "hex");

			try {
				const decrypted = JSON.parse(
					decrypt(xtea_data, xtea_key, "cbc", xtea_iv, true)
						.toString("utf-8")
						.slice(0, stagefile.size)
				) as StageData;
				return ["success", decrypted];
			}
			catch (exc) {
				console.error("Decrypt error", exc);
				return [ERRORS.DECRYPT, {}];
			}

		}
		else {
			return ["success", stagefile];
		}
	}
	catch (exc) {
		console.error("Parse error", exc);
		return [ERRORS.PARSE, {}];
	}
}