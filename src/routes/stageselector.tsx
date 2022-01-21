import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import { PATHS } from '../data/constants';
import { loadRegistry } from '../data/registryfile';
import { loadStageFileMeta } from '../data/stagefile';

import StageCardComponent from '../components/stagecard';

import { RegistryFile } from '../types/registry';
import { StageFileBase } from '../types/stage';

export type StageSelectorRouteComponentState = {
	stages: { filename: string, base: StageFileBase }[]
};

export default class StageSelectorRouteComponent extends React.Component<{}, StageSelectorRouteComponentState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			stages: []
		};

		loadRegistry(PATHS.REGISTRY).then(async (v) => {
			if (!v) {
				console.error("Failed loading registry");
				return;
			}

			let stages: typeof this.state.stages = [];

			for (const stage of (v as RegistryFile).stages) {
				const base = await loadStageFileMeta(`${PATHS.STAGEFILES}/${stage}`);

				if (base)
					stages.push({ filename: stage, base });
			}

			this.setState({ stages });
		});
	}

	render() {
		return (
			<>
				<div className="titlepanel">
					<h1>Műalkotások</h1>
				</div>
				<div className="contentpanel">
					<div className="stagelist">
						{
							this.state.stages.map(
								(v, i) => <StageCardComponent key={i} stage={v.filename} {...v.base}></StageCardComponent>)
						}
					</div>
					<div className="local">
						<ReactRouterDOM.Link className="button primary localfile" to="?stage_local">Helyi fájl megnyitása</ReactRouterDOM.Link>
					</div>
				</div>
			</>
		);
	}
};