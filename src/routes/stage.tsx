import * as React from 'react';
import ReactMarkdown from 'react-markdown';

import { PATHS } from '../data/constants';
import KeyStorage from '../data/keystorage';
import { decryptStageFile, loadStageFileRaw } from '../data/stagefile';

import StageComponent from '../components/stage';
import { KeyPromptComponent } from '../components/prompt';

import { StageData, StageFile } from '../types/stage';
import StageLoaderRouteComponent from './stageloader';

export type StageRouteComponentProps =
	{ stage: string };

export default class StageRouteComponent extends StageLoaderRouteComponent<StageRouteComponentProps> {
	constructor(props: StageRouteComponentProps) {
		super(props, props.stage, true);
	}

	override loader() {
		const result = loadStageFileRaw(`${PATHS.STAGEFILES}/${this.props.stage}`);
		if (!result) {
			this.setState({
				status: 'error',
				stage: null,
				message: "# Ilyen oldal nem létezik\n\n_(vagy nem sikerült betölteni)_\n\n\n\n\n\nKeresgélj inkább a [főoldalon 💧](./)"
			});
			return null;
		}
		return result;
	}
};

/*
export default class StageRouteComponent extends React.Component<StageRouteComponentProps, StageRouteComponentState> {
constructor(props: StageRouteComponentProps) {
	super(props);

	this.state = {
		status: 'empty', stage: null
	};

	this.loadFile();
}

private async loadFile() {
	const stagefile = await loadStageFileRaw(`${PATHS.STAGEFILES}/${this.props.stage}`);

	if (!stagefile) {
		return this.setState({
			status: 'error',
			stage: null,
			message: "# Ilyen oldal nem létezik\n\n_(vagy nem sikerült betölteni)_\n\n\n\n\n\nKeresgélj inkább a [főoldalon 💧](./)"
		});
	}

	if (stagefile.encrypted) {
		const key = KeyStorage.getKey(this.props.stage);

		if (key) {
			const decrypted = await decryptStageFile(stagefile, key);

			if (decrypted)
				return this.setState({
					status: 'ready', stage: decrypted
				});
		}

		return this.setState({
			status: 'loaded', stage: stagefile
		});
	}

	this.setState({
		status: 'ready',
		stage: stagefile
	});
}

render() {
	switch (this.state.status) {
		case 'empty': {
			return <div className="prompt">
				<i>Betöltés...</i>
			</div>;
		}
		case 'error': {
			return <div className="prompt">
				<ReactMarkdown>{this.state.message}</ReactMarkdown>
			</div>;
		}
		case 'loaded': {
			return <KeyPromptComponent submit={async (key) => {
				const decrypted = await decryptStageFile(this.state.stage as StageFile, key);

				if (decrypted) {
					KeyStorage.setKey(this.props.stage, key);

					this.setState({ status: 'ready', stage: decrypted });
				}
			}} />;
		}
		case 'ready': {
			try {
				return <StageComponent stagedata={this.state.stage} />;
			}
			catch (exc) {
				console.error(exc);
				this.setState({ status: 'error', stage: null, message: "# Hiba történt a fájl olvasása közben\n\n\n\n\n\nNézz körbe a [főoldalon 💧](./)" })
			}
		}
	}
}
};
*/