import { Stage, StageFile } from "../types/stage"
import ReactMarkdown from 'react-markdown';

import styles from "./editor.module.scss";
import { useMemo, useState } from "react";

export type EditorComponentProps = {
	stageFile: StageFile
}

type UnbundledStage = Stage & { hierarchy: string[] };

type StageComponentProps = {
	stage: UnbundledStage,
	callback: (hierarchy: string[]) => any
}

const unbundleStages = (stages: UnbundledStage[]): UnbundledStage[] =>
	stages.flatMap(stage => {
		const actionStages = stage.buttons
			.flatMap(({ action }, i) => {
				if (typeof action === "string")
					return null;

				if (action.type === "stage" && typeof action.stage !== "string") {
					return unbundleStages([{ hierarchy: [...stage.hierarchy, `${i}`], ...action.stage }]);
				}

				return null;
			})
			.filter(v => v !== null) as UnbundledStage[];

		const flattenedStage: UnbundledStage = {
			hierarchy: stage.hierarchy,
			id: stage.id,
			text: stage.text,
			buttons: stage.buttons.map((button, i) => ({
				text: button.text,
				action: (
					typeof button.action !== "string" &&
					button.action.type === "stage" &&
					typeof button.action.stage !== "string"
				)
					? { type: "stage", stage: [stage.hierarchy, `${i}`].join("/") }
					: button.action
			}))
		}

		return [flattenedStage, ...actionStages];
	})

const StageComponent: React.FC<StageComponentProps> = ({ stage, callback }) => {
	return <button className="button primary stage" onClick={_ => callback(stage.hierarchy)}>
		{stage.hierarchy.join("/")}
	</button>
};

const EditorComponent: React.FC<EditorComponentProps> = (props) => {
	const [topLevelStages, setTopLevelStages] = useState<Stage[]>(props.stageFile.encrypted == true ? [] : props.stageFile.stages);
	const stages = useMemo(() => unbundleStages(topLevelStages.map(v => ({ hierarchy: [v.id], ...v } as UnbundledStage))), [topLevelStages]);


	const [selectedStageID, setSelectedStageID] = useState<string[]>([]);
	const selectedStage = useMemo(() => stages.find(v =>
		v.hierarchy.length == selectedStageID.length &&
		v.hierarchy.every((w, i) => selectedStageID[i] == w)
	), [stages, selectedStageID]);

	const renderButtons = (indicies: number[]) => {
		return <>
			{
				indicies.map(v => {
					const text = selectedStage!.buttons[v]?.text;
					const modifiedStages = topLevelStages;
					return <input
						key={v}
						type="text"
						defaultValue={text}
						placeholder={`${v}. gomb`}
						onChange={ev => {
							// todo
							setTopLevelStages(modifiedStages)
						}
						} />
				}
				)
			}
		</>
	};

	return <>
		<div className={styles.editor}>
			<div className={styles.stages}>
				{
					stages.map((v, i) => <StageComponent key={i} callback={() => setSelectedStageID(v.hierarchy)} stage={v} />)
				}
			</div>

			{
				selectedStageID.length > 0
					? <div className={styles.stage_preview}>
						<div className={styles.main}>
							<div className={styles.panels}>
								<div className={styles.sidepanel}>
									{
										renderButtons([0, 2])
									}
								</div>
								<div className={styles.event_panel}>
									<ReactMarkdown>{selectedStage!.text}</ReactMarkdown>
								</div>
								<div className={styles.sidepanel}>
									{
										renderButtons([1, 3])
									}
								</div>
							</div>
						</div>
					</div>
					: <></>
			}
		</div>


	</>;
};

export default EditorComponent;