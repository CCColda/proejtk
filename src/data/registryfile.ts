import { RegistryFile } from "../types/registry";

export async function loadRegistry(registryPath: string): Promise<RegistryFile | null> {
	try {
		const resp = await fetch(registryPath, {
			method: "GET", headers: {
				"Accept": "application/json"
			}
		});

		if (!resp.ok) {
			console.error("Response error", resp.status);
			return null;
		}

		return (await resp.json()) as RegistryFile;
	}
	catch (exc) {
		console.error("Parse error", exc);
		return null;
	}
}
