import { Action, Button, ID, Stage, StageFile } from "../types/stage"
import ReactMarkdown from 'react-markdown';

import styles from "./editor.module.scss";
import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { unbundleAction } from "@/data/stagefile";
import { useArray } from "@/hooks/useArray";
import { Button as ButtonComponent } from "./button";
import saveAs from "file-saver";
import { stringify } from "yaml";

export type EditorComponentProps = {
	stageFile: StageFile
}

type UnbundledStage = Stage & ID;


type StageEditComponentProps = {
	preview: boolean,
	stage: UnbundledStage,
	stageIDs: string[],
	onEdit: (stageData: UnbundledStage) => void,
	onRename: (newName: string) => void,
	onDelete: () => void,
	onView: (stage: string) => void,
}

type StageEditButtonProps = {
	preview: boolean,
	button: Button | null,
	possibleStages: string[],
	onEdit: (buttonData: Button) => void,
	onView: (stage: string) => void,
}

const unbundleStages = (stages: UnbundledStage[]): UnbundledStage[] =>
	stages.flatMap(stage => {
		const actionStages = stage.buttons
			.flatMap(({ action }, i) => {
				if (typeof action === "string")
					return null;

				if (action.type === "stage" && typeof action.stage !== "string") {
					return unbundleStages([{ ...action.stage, id: stage.id + "/" + i }]);
				}

				return null;
			})
			.filter(v => v !== null) as UnbundledStage[];

		const flattenedStage: UnbundledStage = {
			id: stage.id,
			text: stage.text,
			buttons: stage.buttons.map((button, i) => ({
				text: button.text,
				action: (
					typeof button.action !== "string" &&
					button.action.type === "stage" &&
					typeof button.action.stage !== "string"
				)
					? { type: "stage", stage: `${stage.id}/${i}` }
					: button.action
			}))
		}

		return [flattenedStage, ...actionStages];
	})


const StageEditButton: React.FC<StageEditButtonProps> = props => {
	const targetAction: Action = props.button
		? unbundleAction(props.button.action)
		: { type: "invalid" };

	const targetStage = (targetAction?.type == "stage" ? targetAction?.stage as string | null : targetAction?.type) ?? "invalid";

	const basicActions = ["invalid", "game_over"];
	const possibleButtons = [...basicActions, ...props.possibleStages];

	const [text, setText] = useState(props.button?.text ?? "");
	const [gameOverText, setGameOverText] = useState(() => {
		if (!props.button?.action)
			return "";

		const unbundled = unbundleAction(props.button.action);
		if (unbundled.type != "game_over")
			return "";

		return unbundled.message;
	});

	const [selectedAction, setSelectedAction] = useState(targetStage);

	const composedButtonData = useMemo((): Button => ({
		text,
		action: selectedAction == "invalid"
			? { type: "invalid" }
			: (selectedAction == "game_over"
				? { type: "game_over", message: gameOverText }
				: { type: "stage", stage: selectedAction })
	}), [text, selectedAction, gameOverText]);

	const valid = useMemo(() => checkButtonValidity(composedButtonData), [composedButtonData]);

	useEffect(() => {
		props.onEdit(composedButtonData);
	}, [composedButtonData]);

	const onTextChange: ChangeEventHandler<HTMLTextAreaElement> = ev => {
		setText(ev.target.value);
	};

	const onActionChange: ChangeEventHandler<HTMLSelectElement> = ev => {
		setSelectedAction(ev.target.value);
	}

	const onGameOverTextChange: ChangeEventHandler<HTMLTextAreaElement> = ev => {
		setGameOverText(ev.target.value);
	};

	return props.preview
		? <div className={styles.stageeditbutton}>
			<button
				className={styles.sidebutton}
			>
				<ReactMarkdown>{props.button?.text ?? ""}</ReactMarkdown>
			</button>
		</div>
		: <div className={[styles.stageeditbutton, !valid ? styles.invalid : ""].join(" ")}>
			<textarea
				className={styles.textarea}
				spellCheck={false}
				defaultValue={props.button?.text}
				placeholder="Aa"
				onChange={onTextChange} />
			<div className={styles.actionedit}>
				<select defaultValue={targetStage} onChange={onActionChange}>
					{
						possibleButtons.map(v =>
							<option key={v} value={v}>{v}</option>)
					}
				</select>
				{
					selectedAction == "game_over"
						? <textarea className={styles.textarea} spellCheck={false} onChange={onGameOverTextChange} defaultValue={gameOverText}></textarea>
						: (selectedAction != "invalid"
							? <ButtonComponent onClick={_ => props.onView(selectedAction)}>Ugrás</ButtonComponent>
							: <></>)
				}
			</div>
		</div>
};

const checkButtonValidity = (button: Button) => button.text.trim() != "" && unbundleAction(button.action).type != "invalid";

const checkIDValidity = (id: string, otherIDs: string[]) => id.length > 0 && id.match(/^[a-z0-9_\.\-]*$/) && !otherIDs.includes(id);

const StageEditComponent: React.FC<StageEditComponentProps> = props => {
	const [text, setText] = useState(props.stage.text);
	const [buttons, buttonsOp] = useArray<Button>([
		...props.stage.buttons,
		...Array(4 - props.stage.buttons.length).fill({ action: { type: "invalid" }, text: "" } as Button)
	]);
	const [newID, setNewID] = useState(props.stage.id);
	const newIDValid = useMemo(() => checkIDValidity(newID, props.stageIDs), [newID, props.stageIDs]);

	const composedStageData = useMemo((): UnbundledStage => ({
		id: props.stage.id,
		text,
		buttons: buttons.filter(checkButtonValidity)
	}), [text, buttons]);

	useEffect(() => {
		props.onEdit(composedStageData);
	}, [composedStageData]);

	const renderButtons = (indicies: number[]) => {
		return <>
			{
				indicies
					.filter(v => !props.preview || props.stage.buttons[v])
					.map((v, i) => <StageEditButton
						key={`${props.stage.id}_${v}_${i}`}
						preview={props.preview}
						button={props.stage.buttons[v]}
						possibleStages={props.stageIDs.filter(v => v != props.stage.id)}
						onEdit={data => {
							buttonsOp.set(v, data);
						}}
						onView={props.onView} />)
			}
		</>
	};

	const onTextEdit: ChangeEventHandler<HTMLTextAreaElement> = ev => {
		setText(ev.target.value ?? "");
	}

	return <div className={[styles.stage_preview, props.preview ? styles.preview : styles.edit].join(" ")}>
		<div className={styles.stageactions}>
			<span className={[styles.rename, newIDValid ? "" : styles.invalid].join(" ")}>
				<p>id:</p>
				<input type="text" onChange={ev => setNewID(ev.target.value)} defaultValue={props.stage.id}></input>
				<ButtonComponent onClick={_ => newIDValid && props.onRename(newID)} disabled={!newIDValid}>Átnevezés</ButtonComponent>
			</span>
			<ButtonComponent onClick={_ => props.onDelete()} classes={[styles.delete]}>Törlés</ButtonComponent>
		</div>
		<div className={styles.panels}>
			<div className={styles.sidepanel}>
				{
					renderButtons([0, 2])
				}
			</div>
			<div className={styles.eventpanel}>
				{
					props.preview
						? <ReactMarkdown>{text}</ReactMarkdown>
						: <textarea className={styles.textarea} spellCheck={false} placeholder="Aa" defaultValue={text} onChange={onTextEdit}></textarea>
				}
			</div>
			<div className={styles.sidepanel}>
				{
					renderButtons([1, 3])
				}
			</div>
		</div>
	</div>
};


type StageItemComponentProps = {
	selected?: boolean,
	stage: UnbundledStage,
	callback: (id: string) => any
}

const StageItemComponent: React.FC<StageItemComponentProps> = props => {
	const stageID = "stage_" + props.stage.id;
	return <div className={styles.stageradio}>
		<input
			type="radio"
			name="stage"
			id={stageID}
			value={props.stage.id}
			onChange={ev => { if (ev.target.value == props.stage.id) props.callback(props.stage.id) }}
			defaultChecked={props.selected} />
		<label htmlFor={stageID}>
			{props.stage.id}
		</label>
	</div>
};

const EditorComponent: React.FC<EditorComponentProps> = (props) => {
	const [preview, setPreview] = useState(false);
	const [stages, stagesOp] = useArray<UnbundledStage>([]);
	const [selectedStageID, setSelectedStageID] = useState<string | null>(null);

	const [newStageID, setNewStageID] = useState<string>("");
	const newStageValid = useMemo(() => checkIDValidity(newStageID, stages.map(v => v.id)), [newStageID, stages]);

	useEffect(() => {
		if (props.stageFile.encrypted)
			return;
		stagesOp.reset(unbundleStages(props.stageFile.stages));
	}, [props.stageFile]);

	return <>
		<div className={styles.page}>
			<div className={styles.editor}>
				<div className={styles.stages}>
					<div className={styles.stagelist} key={selectedStageID}>
						{
							stages.map((v, i) => <StageItemComponent key={i} callback={(id) => setSelectedStageID(id)} stage={v} selected={selectedStageID == v.id} />)
						}
					</div>
					<div className={[styles.newstage, !newStageValid ? styles.invalid : ""].join(" ")}>
						<input key={selectedStageID} type="text" name="" id="" placeholder="Aa" defaultValue={newStageID} onChange={ev => setNewStageID(ev.target.value)} />
						<ButtonComponent onClick={_ => {
							if (!newStageValid)
								return;

							stagesOp.push({
								id: newStageID,
								buttons: [],
								text: ""
							});

							setSelectedStageID(`${newStageID}`);
							setNewStageID("");
						}} disabled={!newStageValid}>+</ButtonComponent>
					</div>
				</div>
				<div className={styles.main}>
					{
						selectedStageID !== null
							? <StageEditComponent
								key={selectedStageID}
								stage={stages.find(v => v.id == selectedStageID)!}
								preview={preview}
								stageIDs={stages.map(v => v.id)}
								onEdit={stage => {
									stagesOp.set(stages.findIndex(v => v.id == selectedStageID), stage);
								}}
								onRename={newName => {
									const modifiedStages = stages.map(stage => ({
										id: stage.id == selectedStageID ? newName : stage.id,
										text: stage.text,
										buttons: stage.buttons.map(button => {
											const unbundled = unbundleAction(button.action);

											return {
												text: button.text,
												action: (unbundled.type == "stage" && unbundled.stage == selectedStageID)
													? { type: "stage", stage: newName } as Action
													: button.action
											}
										})
									}));

									setSelectedStageID(newName);
									stagesOp.reset(modifiedStages);
								}}
								onDelete={() => {
									const modifiedStages = stages
										.filter(stage => stage.id != selectedStageID)
										.map(stage => ({
											...stage,
											buttons: stage.buttons.filter(button => {
												const unbundled = unbundleAction(button.action);

												return !(unbundled.type == "stage" && unbundled.stage == selectedStageID);
											})
										}));

									setSelectedStageID(null);
									stagesOp.reset(modifiedStages);
								}}
								onView={stage => setSelectedStageID(stage)}
							/>
							: <></>
					}
					<div className={styles.bottompanel}>
						<div className={styles.preview}>
							<input type="checkbox" name="" id="preview" onChange={ev => setPreview(ev.target.checked)} />
							<label htmlFor="preview">
								Előnézet
							</label>
						</div>
						<ButtonComponent onClick={_ => {
							const stagefile = {
								...props.stageFile,
								stages
							} as StageFile;
							const blob = new Blob([stringify(stagefile)], { type: "text/vnd.yaml;charset=utf-8" });
							saveAs(blob, props.stageFile.title.replace(/[^0-9a-z_\-]/gi, "_") + ".yaml");
						}}>Mentés</ButtonComponent>
					</div>
				</div>

			</div>
		</div >


	</>;
};

export default EditorComponent;