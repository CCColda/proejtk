import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Action, ActionType, Stage, StageData } from '../stage';

import { loadStageFile } from '../stagefile';

// TODO: use css loader

export type AppProps = {
	stagefile: string
};

export type AppState = {
	stage: Stage,
	phone: boolean,
	keyprompt: boolean,
};

export default class App extends React.Component<AppProps, AppState> {
	private stageData?: StageData;
	private media: MediaQueryList;
	private key: string | null;
	// TODO: private history?: Stage[];

	constructor(props: AppProps) {
		super(props);

		this.media = window.matchMedia("(max-width: 480px)");

		this.key = window.localStorage.getItem("key") ?? null;

		this.state = {
			stage: {
				id: "(loading)", "text": "", buttons: []
			},
			phone: this.media.matches,
			keyprompt: false
		};

		this.media.onchange = mqle => this.setState({ phone: mqle.matches });

		loadStageFile(this.props.stagefile, this.key).then(([e, v]) => {
			if (e == "success") {
				this.stageData = v as StageData;
				this.setState({ stage: this.stageData.stages[0] })
			}
			else {
				this.setState({ keyprompt: true });
			}
		});
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

	private renderKeyPrompt() {
		let inputRefNode: HTMLInputElement;
		let submitRefNode: HTMLButtonElement;
		return <div id="prompt">
			<h1>{!this.key ? "A feloldáshoz jelszó szükséges" : "Helytelen jelszó"}</h1>
			<form onSubmit={async (ev) => {
				ev.preventDefault();
				this.key = inputRefNode.value;
				submitRefNode.disabled = true;

				const [e, v] = await loadStageFile(this.props.stagefile, this.key)
				submitRefNode.disabled = false;

				if (e == "success") {
					// TODO: manage per stagefile
					window.localStorage.setItem("key", this.key);

					this.stageData = v as StageData;

					this.setState({ stage: this.stageData.stages[0], keyprompt: false });
				}
				else {
					inputRefNode.value = "";
				}
			}}>
				<input type="password" placeholder="Jelszó" ref={node => inputRefNode = node}></input>
				<button type="submit" ref={node => submitRefNode = node}>Feloldás</button>
			</form>
		</div>;
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
		const processedAction = App.processAction(action);
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
				const newStage = typeof processedAction.stage == "string"
					? this.stageData.stages.find(v => v.id == processedAction.stage)
					: processedAction.stage;

				if (newStage) {
					this.setState({
						stage: newStage
					});
				}
				break;
			}
		}
	}

	render() {
		return <>
			{this.state.keyprompt ? this.renderKeyPrompt() : <></>}
			<div id="header">

			</div>
			<div id="main">
				<div id="panels">
					<div className="sidepanel">
						{
							this.state.phone
								? <></>
								: this.renderButtons([0, 2])
						}
					</div>
					<div id="event_panel">
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
			<div id="footer">

			</div>
		</>
	}
}