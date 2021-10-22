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
