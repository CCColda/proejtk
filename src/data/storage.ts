export default class Storage {
	private static localStorage = window.localStorage;

	private static transformStageName(stage: string) {
		return stage.replace(/[^a-zA-Z0-9_]/g, '_');
	}

	private static stringifyProgress(progress: [string | number, ...number[]]) {
		return progress.map(v => typeof v == "number" ? `[${v}]` : v).join('/');
	}

	private static parseProgress(progress?: string): [string | number, ...number[]] {
		const numberRegex = /\[([0-9]+)\]/;

		return (progress?.split('/')?.map(v => {
			const match = v.match(numberRegex);
			return match ? Number(match[1]) : v;
		}) ?? []) as [string | number, ...number[]];
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

	static storeProgress(stage: string, progress: [string | number, ...number[]]) {
		this.localStorage.setItem(
			this.transformStageName(stage) + "_progress",
			this.stringifyProgress(progress)
		);
	}

	static getProgress(stage: string) {
		return this.parseProgress(
			this.localStorage.getItem(
				this.transformStageName(stage) + "_progress"
			)
		);
	}

	static clearProgress(stage: string) {
		return this.localStorage.removeItem(this.transformStageName(stage) + "_progress");
	}

	static checkProgress(stage: string) {
		return !!this.localStorage.getItem(this.transformStageName(stage) + "_progress");
	}
};