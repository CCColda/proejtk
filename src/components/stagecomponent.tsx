import ReactMarkdown from 'react-markdown';

import { Action, ActionType, Stage, StageData } from '../types/stage';
import { useEffect, useMemo, useState } from 'react';

import { useForceUpdate, useSelectiveForceUpdate } from '@/hooks/useForceUpdate';

import styles from "./stagecomponent.module.scss";
import { useStorage } from '@/hooks/useStorage';
import { Button, LinkButton } from './button';

export type StageComponentProps = {
	stage: string,
	stagedata: StageData,
};

export type StageComponentState = {
	stage: Stage,
	progress_loaded: boolean,
	phone: boolean,
};

const processAction = (action: string | Action): Action | null => {
	if (typeof action == "string") {
		const [type, data] = action.split(':');
		switch (type.toLowerCase() as ActionType) {
			case "game_over": {
				return { type: "game_over", message: data };
			}
			case "stage": {
				return { type: "stage", stage: data };
			}
			default: {
				console.error(`Unknown action: "${type}"`);
				return null;
			}
		}
	}

	return action;
}

const gameOverStage = (gameOver: { id?: string, message: string }): Stage => {
	return {
		id: gameOver.id,
		text: gameOver.message,
		buttons: []
	};
}

export const StageComponent: React.FC<StageComponentProps> = props => {
	const media = window.matchMedia("(max-width: 480px)");
	const [stage, setStage] = useState<Stage | null>(null);
	const [progress_loaded, setProgressLoaded] = useState<boolean>(false);
	const [phone, setPhone] = useState<boolean>(false);
	const [update, forceUpdate] = useSelectiveForceUpdate();
	const storage = useStorage();

	const [progress, setProgress] = useState<[string | number, ...number[]]>([0]);

	const load = () => {
		const progress = storage.getProgress(props.stage);

		if (progress.length > 0) {
			const startingStage = typeof progress[0] == "string"
				? props.stagedata.stages.find(v => v.id == progress[0])
				: props.stagedata.stages[progress[0]];;

			if (!startingStage)
				return;

			let tempStage: Stage = startingStage;

			progress_loop:
			for (const item of progress.slice(1) as number[]) {
				const action = processAction(tempStage.buttons[item].action);
				switch (action?.type) {
					case "stage": {
						tempStage = action.stage as Stage;
						break;
					}
					case "game_over": {
						tempStage = gameOverStage(action);
						break progress_loop;
					}
				}
			}

			return { stage: tempStage, progress };
		}
		return null;
	};

	const save = () => {
		storage.storeProgress(props.stage, progress);
	}

	const wipe = () => {
		storage.clearProgress(props.stage);
	}

	const restart = () => {
		const newStage: Stage = (
			props.stagedata.start
				? props.stagedata.stages.find(v => v.id == props.stagedata.start)
				: null
		)
			?? props.stagedata.stages[0];

		setStage(newStage);

		setProgress([newStage.id ?? 0]);
	}

	const doAction = (buttonid: number, action: string | Action) => {
		const processedAction = processAction(action);
		if (!processedAction) return;

		switch (processedAction.type) {
			case "game_over": {
				if (processedAction.id)
					setProgress([processedAction.id]);
				else
					setProgress([...progress, buttonid]);

				setStage(gameOverStage(processedAction));
				break;
			}
			case "stage": {
				try {
					const newStage = typeof processedAction.stage == "string"
						? props.stagedata.stages.find(v => v.id == processedAction.stage)
						: processedAction.stage;

					if (newStage?.id)
						setProgress([newStage.id]);
					else
						setProgress([...progress, buttonid]);

					if (newStage)
						setStage(newStage);
				}
				catch (exc) {
					console.error(exc);
				}
				break;
			}
		}
	};

	const renderButtons = (list: number[]) =>
		<>
			{list.map(
				(v, i) => {
					if (!stage)
						return <></>;
					if (stage.buttons.length <= v)
						return <></>;

					const data = stage.buttons[v];
					return <button
						key={v}
						className={styles.sidebutton}
						onClick={ev => doAction(i, data.action)}>
						<ReactMarkdown>{data.text}</ReactMarkdown>
					</button>;
				}
			)}
		</>;

	useEffect(() => {
		const loaded = load();
		setProgress(loaded?.progress ?? [stage?.id ?? 0]);

		media.onchange = mqle => setPhone(mqle.matches);

		setStage(loaded?.stage ??
			(
				props.stagedata.start
					? props.stagedata.stages.find(v => v.id == props.stagedata.start)
					: null
			)
			?? props.stagedata.stages[0]);

		setProgressLoaded(!!loaded);
	}, []);

	const hasProgress = useMemo(() => storage.checkProgress(props.stage), [storage, update]);

	console.log(hasProgress, props.stage, storage.checkProgress(props.stage));

	return stage && <div className={styles.stage}>
		<div className={styles.header}>
			{
				progress_loaded
					? <p className={styles.progressreminder}> Itt hagytad abba legutóbb </p>
					: <></>
			}
		</div>
		<div className={styles.main}>
			<div className={styles.panels}>
				<div className={styles.sidepanel}>
					{
						phone
							? <></>
							: renderButtons([0, 2])
					}
				</div>
				<div className={styles.event_panel}>
					<ReactMarkdown>{stage.text}</ReactMarkdown>
				</div>
				<div className={styles.sidepanel}>
					{
						phone
							? renderButtons([0, 1, 2, 3])
							: renderButtons([1, 3])
					}
				</div>
			</div>
		</div>
		<div className={styles.footer}>
			<Button classes={[styles.footerbutton, styles.save]} title="Mentés" onClick={ev => { save(); forceUpdate(); }}></Button>
			{hasProgress
				? <>
					<Button classes={[styles.footerbutton, styles.recyclebin]} title="Mentés törlése" onClick={ev => { wipe(); forceUpdate(); }}></Button>
					<Button classes={[styles.footerbutton, styles.checkpoint]} title="Előző mentés újratöltése" onClick={ev => {
						const loaded = load();
						if (!loaded)
							return;

						setProgress(loaded.progress);
						setStage(loaded.stage);
					}}></Button>
				</>
				: <></>}
			<Button classes={[styles.footerbutton, styles.restart]} title="Újrakezdés" onClick={ev => restart()}></Button>
			<LinkButton classes={[styles.footerbutton, styles.home]} title="Főoldal" href="/"></LinkButton>
		</div>
	</div>
}
