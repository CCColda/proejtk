import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import LocalStageRouteComponent from './routes/localstage';
import StageRouteComponent from './routes/stage';
import StageSelectorRouteComponent from './routes/stageselector';

const RouterComponent: React.FC = () => {
	const query = new URLSearchParams(ReactRouterDOM.useLocation().search);
	const stage = query.get("stage");
	const stage_local = query.has("stage_local");

	const safeStage = stage && decodeURIComponent(stage).replace(/[^a-zA-Z0-9_\.\- ]/g, '_');

	return <>
		{stage
			? <StageRouteComponent stage={safeStage} />
			: (
				stage_local
					? <LocalStageRouteComponent />
					: <StageSelectorRouteComponent />
			)
		}
	</>;
};

export default RouterComponent;