import { ERRORS } from "./constants";
import { RegistryFile } from "./registry";

export type LoadRegistryResult = ["success", RegistryFile] | [number, {}];

export async function loadRegistry(registryPath: string): Promise<LoadRegistryResult> {
	try {
		const resp = await fetch(registryPath, {
			method: "GET", headers: {
				"Accept": "application/json"
			}
		});

		if (!resp.ok) {
			console.error("Response error", resp.status);
			return [ERRORS.RESPONSE, {}];
		}

		return ["success", (await resp.json()) as RegistryFile];
	}
	catch (exc) {
		console.error("Parse error", exc);
		return [ERRORS.PARSE, {}];
	}
}
