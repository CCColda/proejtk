import * as React from "react";
import ReactMarkdown from "react-markdown";
import { KeyPromptComponent } from "../components/prompt";
import StageComponent from "../components/stage";
import Storage from "../data/storage";
import { decryptStageFile } from "../data/stagefile";
import { StageData, StageFile } from "../types/stage";

export type StageLoaderRouteComponentState =
	{ status: 'empty', stage: null, message?: null } |
	{ status: 'error', stage: null, message: string } |
	{ status: 'loaded', stage: StageFile, message?: null } |
	{ status: 'ready', stage: StageData, message?: null };

export default class StageLoaderRouteComponent<T extends {} = {}> extends React.Component<T, StageLoaderRouteComponentState> {
	protected stage: string;

	constructor(props: T, stage: string, autoload: boolean = true) {
		super(props);

		this.stage = stage;
		this.state = {
			status: 'empty', stage: null
		};

		if (autoload)
			this.load();
	}

	protected async loader(): Promise<StageFile | null> {
		return null;
	}

	protected onEmpty(): JSX.Element {
		return <div className="prompt">
			<i>Betöltés...</i>
		</div>;
	}

	protected onError(): JSX.Element {
		return <div className="prompt">
			<ReactMarkdown>{this.state.message}</ReactMarkdown>
		</div>;
	}

	protected onLoaded(): JSX.Element {
		return <KeyPromptComponent submit={async (key) => {
			const decrypted = await decryptStageFile(this.state.stage as StageFile, key);

			if (decrypted) {
				Storage.setKey(this.stage, key);

				this.setState({ status: 'ready', stage: decrypted });
			}
		}} />
	}

	protected onReady(): JSX.Element {
		try {
			return <StageComponent stage={this.stage} stagedata={this.state.stage as StageData} />;
		}
		catch (exc) {
			console.error(exc);
			this.setState({ status: 'error', stage: null, message: "# Hiba történt a fájl olvasása közben\n\n\n\n\n\nNézz körbe a [főoldalon 💧](./)" })
		}
	}

	protected async load() {
		const stagefile = await this.loader();

		if (!stagefile)
			return false;

		if (stagefile.encrypted) {
			const key = Storage.getKey(this.stage);

			if (key) {
				const decrypted = await decryptStageFile(stagefile, key);

				if (decrypted) {
					this.setState({
						status: 'ready', stage: decrypted
					});
					return true;
				}
			}

			this.setState({
				status: 'loaded', stage: stagefile
			});
			return true;
		}

		this.setState({
			status: 'ready',
			stage: stagefile
		});
		return true;
	}

	render() {
		switch (this.state.status) {
			case 'empty': { return this.onEmpty(); }
			case 'error': { return this.onError(); }
			case 'loaded': { return this.onLoaded(); }
			case 'ready': { return this.onReady(); }
		}
	}
};