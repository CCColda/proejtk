import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { PATHS } from '../constants';
import StageComponentRoute from './stage';
import StageSelectorComponentRoute from './stageselector';

const RouterComponent: React.FC = () => {
	const query = new URLSearchParams(useLocation().search);
	const stage = query.get("stage");

	return <>
		{stage
			? <StageComponentRoute stage={stage} stagefiles={PATHS.STAGEFILES} />
			: <StageSelectorComponentRoute registry={PATHS.REGISTRY} stagefiles={PATHS.STAGEFILES} />
		}
	</>;
};

export default RouterComponent;