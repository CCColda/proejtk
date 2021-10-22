import * as React from 'react';
import ReactMarkdown from 'react-markdown';

import { PATHS } from '../data/constants';
import Storage from '../data/storage';
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
