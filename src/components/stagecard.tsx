import { StageFileBase } from '../types/stage';
import { LinkButton } from './button';

import styles from "./stagecard.module.scss";

export type StageCardProps = StageFileBase & { stage: string };

export const StageCard: React.FC<StageCardProps> = (props) => {
	return <LinkButton priority='secondary' href={`stage?s=${props.stage}`} classes={[styles.stagecard]}>
		<span className={styles.title}>{props.title ?? props.stage}</span>
		<span className={styles.author}>by {props.author ?? "unknown"}</span>
	</LinkButton>;
};