import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import * as yaml from 'yaml';

import { Action, ActionType, Stage, StageFile } from '../types';

// TODO: use css loader

export type AppProps = {
	stagefile: string
};

export type AppState = {
	stage: Stage,
	phone: boolean
};

export default class App extends React.Component<AppProps, AppState> {
	private stageFile?: StageFile;
	private media: MediaQueryList;
	// TODO: private history?: Stage[];

	constructor(props: AppProps) {
		super(props);

		this.media = window.matchMedia("(max-width: 480px)");

		this.state = {
			stage: {
				id: "_loading", "text": "", buttons: []
			},
			phone: this.media.matches
		};

		this.media.onchange = mqle => this.setState({ phone: mqle.matches });

		this.fetchStageFile().then(v => {
			this.stageFile = v;
			this.setState({ stage: this.stageFile.stages[0] })
		});
	}

	private async fetchStageFile(): Promise<StageFile> {
		const resp = await fetch(this.props.stagefile, {
			method: "GET", headers: {
				"Accept": "application/json,text/yaml,text/x-yaml,application/x-yaml,text/vnd.yaml"
			}
		});

		if (resp.headers.get("Content-Type").match("application/json")) {
			return await resp.json();
		}
		else {
			return yaml.parse(await resp.text());
		}
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
					? this.stageFile.stages.find(v => v.id == processedAction.stage)
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