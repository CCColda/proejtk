export default class KeyStorage {
	private static localStorage = window.localStorage;

	private static transformStageName(stage: string) {
		return stage.replace(/[^a-zA-Z0-9_]/g, '_');
	}

	static setKey(stage: string, key: string) {
		this.localStorage.setItem(this.transformStageName(stage), key);
	}

	static getKey(stage: string): string | null {
		return this.localStorage.getItem(this.transformStageName(stage));
	}

	static resetKey(stage: string) {
		this.localStorage.removeItem(this.transformStageName(stage));
	}
};