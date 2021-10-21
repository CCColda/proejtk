import * as React from 'react';
import { Link } from 'react-router-dom';
import { RegistryFile } from '../registry';
import { loadRegistry } from '../registryfile';
import { StageFileBase } from '../stage';
import { loadStageFileMeta } from '../stagefile';
import StageCardComponent from './stagecard';

export type StageSelectorComponentProps = {
	registry: string,
	stagefiles: string,
};

export type StageSelectorComponentState = {
	stages: { filename: string, base: StageFileBase }[]
};

export default class StageSelectorComponentRoute extends React.Component<StageSelectorComponentProps, StageSelectorComponentState> {
	constructor(props: StageSelectorComponentProps) {
		super(props);

		this.state = {
			stages: []
		};

		loadRegistry(this.props.registry).then(async ([c, v]) => {
			if (c != "success") {
				console.error("Failed loading registry", v);
				return;
			}

			let stages: typeof this.state.stages = [];

			for (const stage of (v as RegistryFile).stages) {
				const base = await loadStageFileMeta(`${this.props.stagefiles}/${stage}`);

				if (base)
					stages.push({ filename: stage, base });
			}

			this.setState({ stages });
		});
	}

	render() {
		return (
			<div className="stageselector">
				<h1>Műalkotások</h1>
				<div className="stagelist">
					{
						this.state.stages.map(
							(v, i) => <StageCardComponent key={i} stage={v.filename} {...v.base}></StageCardComponent>)
					}
				</div>
			</div>
		);
	}
};