import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { StageFileBase } from '../stage';

export type StageCardProps = StageFileBase & { stage: string };

const StageCard: React.FC<StageCardProps> = (props) => {
	return <ReactRouterDOM.Link className="stagecard" to={`?stage=${props.stage}`}>
		<p className="title">{props.title ?? props.stage}</p>
		<p className="author">by {props.author ?? "unknown"}</p>
	</ReactRouterDOM.Link>;
};

export default StageCard;