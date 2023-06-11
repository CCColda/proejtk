export default class Storage {
	private localStorage: typeof window.localStorage | null = null;

	private transformStageName(stage: string) {
		return stage.replace(/[^a-zA-Z0-9_]/g, '_');
	}

	private stringifyProgress(progress: [string | number, ...number[]]) {
		return progress.map(v => typeof v == "number" ? `[${v}]` : v).join('/');
	}

	private parseProgress(progress?: string): [string | number, ...number[]] {
		const numberRegex = /\[([0-9]+)\]/;

		return (progress?.split('/')?.map(v => {
			const match = v.match(numberRegex);
			return match ? Number(match[1]) : v;
		}) ?? []) as [string | number, ...number[]];
	}

	setStorage(storage: typeof window.localStorage) {
		this.localStorage = storage;
	}

	setKey(stage: string, key: string) {
		this.localStorage?.setItem(this.transformStageName(stage), key);
	}

	getKey(stage: string): string | null {
		return this.localStorage?.getItem(this.transformStageName(stage)) ?? null;
	}

	resetKey(stage: string) {
		this.localStorage?.removeItem(this.transformStageName(stage));
	}

	storeProgress(stage: string, progress: [string | number, ...number[]]) {
		this.localStorage?.setItem(
			this.transformStageName(stage) + "_progress",
			this.stringifyProgress(progress)
		);
	}

	getProgress(stage: string) {
		return this.parseProgress(
			this.localStorage?.getItem(
				this.transformStageName(stage) + "_progress"
			) ?? undefined
		);
	}

	clearProgress(stage: string) {
		return this.localStorage?.removeItem(this.transformStageName(stage) + "_progress");
	}

	checkProgress(stage: string) {
		return !!this.localStorage?.getItem(this.transformStageName(stage) + "_progress");
	}
};