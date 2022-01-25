import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import * as ReactRouterDOM from 'react-router-dom';
import Storage from '../data/storage';

import { Action, ActionType, Stage, StageData } from '../types/stage';

import "../styles/stage.css";
import "../styles/sidebutton.css";

export type StageComponentProps = {
	stage: string,
	stagedata: StageData,
};

export type StageComponentState = {
	stage: Stage,
	progress_loaded: boolean,
	phone: boolean,
};

export default class StageComponent extends React.Component<StageComponentProps, StageComponentState> {
	private media: MediaQueryList;
	private progress: [string | number, ...number[]];

	constructor(props: StageComponentProps) {
		super(props);

		const loaded = this.load();

		this.media = window.matchMedia("(max-width: 480px)");
		this.state = {
			stage: loaded?.stage ??
				(
					this.props.stagedata.start
					&& this.props.stagedata.stages.find(v => v.id == this.props.stagedata.start)
				)
				?? this.props.stagedata.stages[0],
			phone: this.media.matches,
			progress_loaded: !!loaded,
		};
		this.progress = loaded?.progress ?? [this.state.stage.id ?? 0];

		this.media.onchange = mqle => this.setState({ phone: mqle.matches });
	}

	private renderButtons(list: number[]) {
		return <>
			{list.map(
				(v, i) => {
					if (this.state.stage.buttons.length <= v)
						return <></>;

					const data = this.state.stage.buttons[v];
					return <button
						key={i}
						className="sidebutton"
						onClick={ev => this.doAction(i, data.action)}>
						<ReactMarkdown>{data.text}</ReactMarkdown>
					</button>;
				}
			)}
		</>;
	}

	private static processAction(action: string | Action): Action | null {
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

	private static makeGameOverStage(gameOver: { id?: string, message: string }): Stage {
		return {
			id: gameOver.id,
			text: gameOver.message,
			buttons: []
		};
	}

	private doAction(buttonid: number, action: string | Action) {
		const processedAction = StageComponent.processAction(action);
		if (!processedAction) return;

		switch (processedAction.type) {
			case "game_over": {
				if (processedAction.id)
					this.progress = [processedAction.id];
				else
					this.progress.push(buttonid);

				this.setState({
					stage: StageComponent.makeGameOverStage(processedAction)
				});
				break;
			}
			case "stage": {
				try {
					const newStage = typeof processedAction.stage == "string"
						? this.props.stagedata.stages.find(v => v.id == processedAction.stage)
						: processedAction.stage;

					if (newStage.id)
						this.progress = [newStage.id];
					else
						this.progress.push(buttonid);

					if (newStage) {
						this.setState({
							stage: newStage
						});
					}
				}
				catch (exc) {
					console.error(exc);
				}
				break;
			}
		}
	}

	private save() {
		Storage.storeProgress(this.props.stage, this.progress);
	}

	private wipe() {
		Storage.clearProgress(this.props.stage);
	}

	private restart() {
		this.setState({
			stage:
				(
					this.props.stagedata.start
					&& this.props.stagedata.stages.find(v => v.id == this.props.stagedata.start)
				)
				?? this.props.stagedata.stages[0],
		});

		this.progress = [this.state.stage.id ?? 0];
	}

	private load() {
		const progress = Storage.getProgress(this.props.stage);

		if (progress.length > 0) {
			let tempStage: Stage = typeof progress[0] == "string"
				? this.props.stagedata.stages.find(v => v.id == progress[0])
				: this.props.stagedata.stages[progress[0]];

			progress_loop:
			for (const item of progress.slice(1) as number[]) {
				const action = StageComponent.processAction(tempStage.buttons[item].action);
				switch (action.type) {
					case "stage": {
						tempStage = action.stage as Stage;
						break;
					}
					case "game_over": {
						tempStage = StageComponent.makeGameOverStage(action);
						break progress_loop;
					}
				}
			}

			return { stage: tempStage, progress };
		}
		return null;
	}

	render() {
		return <div className="stage">
			<div className="header">
				{
					this.state.progress_loaded
						? <p className="progressreminder"> Itt hagytad abba legutóbb </p>
						: <></>
				}
			</div>
			<div className="main">
				<div className="panels">
					<div className="sidepanel">
						{
							this.state.phone
								? <></>
								: this.renderButtons([0, 2])
						}
					</div>
					<div className="event_panel">
						<ReactMarkdown>{this.state.stage.text}</ReactMarkdown>
					</div>
					<div className="sidepanel">
						{
							this.state.phone
								? this.renderButtons([0, 1, 2, 3])
								: this.renderButtons([1, 3])
						}
					</div>
				</div>
			</div>
			<div className="footer">
				<button className="button save" title="Mentés" onClick={ev => { this.save(); this.forceUpdate(); }}></button>
				{Storage.checkProgress(this.props.stage)
					? <>
						<button className="button recyclebin" title="Mentés törlése" onClick={ev => { this.wipe(); this.forceUpdate(); }}></button>
						<button className="button checkpoint" title="Előző mentés újratöltése" onClick={ev => { this.progress = this.load().progress; this.forceUpdate(); }}></button>
					</>
					: <></>}
				<button className="button restart" title="Újrakezdés" onClick={ev => this.restart()}></button>
				<ReactRouterDOM.Link className="button home" title="Főoldal" to="?"></ReactRouterDOM.Link>
			</div>
		</div>
	}
}
