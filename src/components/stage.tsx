import * as React from 'react';
import ReactMarkdown from 'react-markdown';

import { Action, ActionType, Stage, StageData } from '../types/stage';

// TODO: use css loader

export type StageComponentProps = {
	stagedata: StageData,
};

export type StageComponentState = {
	stage: Stage,
	phone: boolean,
};

export default class StageComponent extends React.Component<StageComponentProps, StageComponentState> {
	private media: MediaQueryList;

	constructor(props: StageComponentProps) {
		super(props);

		this.media = window.matchMedia("(max-width: 480px)");
		this.state = {
			stage:
				(
					this.props.stagedata.start
					&& this.props.stagedata.stages.find(v => v.id == this.props.stagedata.start)
				)
				?? this.props.stagedata.stages[0],
			phone: this.media.matches
		};

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
						onClick={ev => this.doAction(data.action)}>
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

	private doAction(action: string | Action) {
		const processedAction = StageComponent.processAction(action);
		if (!processedAction) return;

		switch (processedAction.type) {
			case "game_over": {
				this.setState({
					stage: {
						id: processedAction.id,
						text: processedAction.message,
						buttons: []
					}
				});
				break;
			}
			case "stage": {
				try {
					const newStage = typeof processedAction.stage == "string"
						? this.props.stagedata.stages.find(v => v.id == processedAction.stage)
						: processedAction.stage;

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

	render() {
		return <div className="stage">
			<div className="header">

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
						<p className="dev_stage_id">{this.state.stage.id ?? ""}</p>
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

			</div>
		</div>
	}
}
