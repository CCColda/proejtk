import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import { StageFileBase } from '../types/stage';

import "../styles/button.css";
import "../styles/card.css";

export type StageCardProps = StageFileBase & { stage: string };

const StageCard: React.FC<StageCardProps> = (props) => {
	return <ReactRouterDOM.Link className="card button secondary" to={`?stage=${props.stage}`}>
		<span className="title">{props.title ?? props.stage}</span>
		<span className="author">by {props.author ?? "unknown"}</span>
	</ReactRouterDOM.Link>;
};

export default StageCard;