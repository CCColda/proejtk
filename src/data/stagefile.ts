import { decrypt } from 'xtea';
import * as yaml from 'yaml';
import { Buffer } from 'buffer/';
import { STAGEFILE_MIMES } from './constants';

import { Action, ActionType, Button, StageData, StageFile, StageFileBase } from '../types/stage';

function padBuffer(buffer: Buffer, length: number, fill: number = 0x00) {
	return Buffer.concat([buffer, Buffer.alloc(Math.max(0.0, length - buffer.length), fill)]);
}

function decryptStageData(data: string, size: number, key: string): StageData | null {
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

export async function loadStageFileRaw(path: string): Promise<StageFile | null> {
	const resp = await fetch(path, {
		method: "GET", headers: {
			"Accept": STAGEFILE_MIMES.join(',')
		}
	});

	if (!resp.ok)
		return null;

	try {
		return (
			resp.headers.get("Content-Type")?.match("application/json")
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

export async function decryptStageFile(stagefile: StageFile, key: string): Promise<StageData | null> {
	// todo: 
	// intellisense made me do this
	if (stagefile.encrypted == true) {
		const decrypted = decryptStageData(stagefile.data, stagefile.size, key);

		if (!decrypted)
			return null;

		return decrypted;
	}
	else {
		return stagefile;
	}
};

export function loadLocalStageFileRaw(blob: Blob): Promise<StageFile | null> {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.onload = () => {
			const textData = typeof reader.result == "string"
				? reader.result
				: new TextDecoder().decode(reader.result ?? undefined);

			try {
				return res(JSON.parse(textData));
			} catch (exc) { // TODO: this hurts my eyes
				console.error("JSON parse error", exc);
				try {
					return res(yaml.parse(textData));
				} catch (exc) {
					console.error("YAML parse error", exc);
					return res(null);
				}
			}
		};

		reader.onabort = rej;
		reader.onerror = rej;

		reader.readAsText(blob, "utf-8");
	});
}

export function unbundleAction(action: Button["action"]): Action {
	if (typeof action === "string") {
		const colon = action.indexOf(":");
		const [type, data] = [action.substring(0, colon), action.substring(colon + 1)];
		if (!["game_over", "stage", "invalid"].includes(type))
			return { type: "invalid" };

		const typeAsAction = type as ActionType;

		switch (typeAsAction) {
			case "invalid": return { type: "invalid" };
			case "game_over": return { type: "game_over", message: data };
			case "stage": return { type: "stage", stage: data };
			default: return { type: "invalid" };
		}
	}
	else {
		return action;
	}
}