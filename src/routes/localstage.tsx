import * as React from 'react';

import { LOCAL_STAGEFILE, STAGEFILE_EXTENSIONS } from '../data/constants';
import { loadLocalStageFileRaw } from '../data/stagefile';

import StageLoaderRouteComponent from './stageloader';

export default class LocalStageRouteComponent extends StageLoaderRouteComponent {
	private blob: Blob;

	constructor(props: {}) {
		super(props, LOCAL_STAGEFILE, false);
	}

	override async loader() {
		const result = await loadLocalStageFileRaw(this.blob);
		if (!result) {
			this.setState({
				status: 'error',
				stage: null,
				message: "# Helytelenül formázott fájl\n\n\n\n\n\nHa kijavítottad a problémát, [próbáld újra 💧](./?stage_local)"
			});
			return null;
		}

		return result;
	}

	override onEmpty() {
		return <div className="prompt">
			<h1>Fájl megnyitása</h1>
			<input className="input" type="file" accept={[...STAGEFILE_EXTENSIONS].join(',')} onChange={
				ev => {
					this.blob = ev.target.files[0];
					this.load();
				}
			}></input>
		</div>;
	}
};
/*
export default class LocalStageRouteComponent extends React.Component<{}, LocalStageRouteComponentState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			status: 'empty', stage: null
		};
	}

	private async tryLoadFile(blob: Blob) {
		const stagefile = await loadLocalStageFileRaw(blob);

		if (stagefile) {
			if (stagefile.encrypted) {
				const key = KeyStorage.getKey(LOCAL_STAGEFILE);

				if (key) {
					const decrypted = await decryptStageFile(stagefile, key);

					if (decrypted)
						return this.setState({
							status: 'ready', stage: decrypted
						});
					return true;
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
		return false;
	}

	render() {
		switch (this.state.status) {
			case 'empty': {
				return <div className="prompt">
					<h1>Fájl megnyitása</h1>
					<input className="input" type="file" accept={[...STAGEFILE_EXTENSIONS].join(',')} onChange={
						ev => {
							this.tryLoadFile(ev.target.files[0]).then(v =>
								ev.target.classList.toggle("invalid", !v)
							);
						}
					}></input>
				</div>;
			}
			case 'loaded': {
				return <KeyPromptComponent submit={async key => {
					const decrypted = await decryptStageFile(this.state.stage as StageFile, key);

					if (decrypted) {
						KeyStorage.setKey(LOCAL_STAGEFILE, key);

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
					this.setState({ status: 'empty', stage: null });
					return <></>
				}
			}
		}
	}
}; */