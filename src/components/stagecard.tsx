import * as React from 'react';
import { Link } from 'react-router-dom';
import { StageFileBase } from '../stage';

export type StageCardProps = StageFileBase & { stage: string };

const StageCard: React.FC<StageCardProps> = (props) => {
	return <Link className="stagecard" to={`?stage=${props.stage}`}>
		<p className="title">{props.title ?? props.stage}</p>
		<p className="author">by {props.author ?? "unknown"}</p>
	</Link>;
};

export default StageCard;