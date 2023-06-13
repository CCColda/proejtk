import { loadLocalStageFileRaw } from "../data/stagefile";
import { STAGEFILE_EXTENSIONS } from "../data/constants";
import { StageFile } from "../types/stage";
import { useMemo, useState } from "react";
import Link from "next/link";

import styles from "./editorfilechooser.module.scss";
import { Button, LinkButton } from "./button";

export type EditorFileChooserComponentProps = {
	callback: (stage: StageFile) => any;
}

const EditorFileChooserComponent: React.FC<EditorFileChooserComponentProps> = (props) => {
	const [radioState, setRadioState] = useState<"new" | "edit">("new");
	const [fileState, setFileState] = useState<null | StageFile>(null);
	const [fileUploadState, setFileUploadState] = useState<string | null>(null);
	const [fileName, setFileName] = useState("");

	const continueValid = useMemo(() => (radioState === "edit" && !!fileState) || (radioState === "new" && fileName !== ""), [fileState, radioState, fileName]);

	const onRadioChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
		setRadioState(ev.currentTarget.value as "new" | "edit");
	};

	const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (ev) => {
		const blob = ev.target.files?.[0];

		if (!blob) return;
		const result = await loadLocalStageFileRaw(blob);

		if (!result) {
			setFileState(null);
			setFileUploadState("Helytelenül formázott fájl");
			return;
		}

		if (result.encrypted) {
			setFileState(null);
			setFileUploadState("Jelszóval védett fájl - nem szerkeszthető");
			return;
		}

		setFileUploadState(null);
		setFileState(result);
		setRadioState("edit");
	};

	const onFileNameChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
		setFileName(ev.currentTarget.value);
	};

	return (
		<>
			<div className={styles.dialog}>
				<h2>Fájl kiválasztása</h2>
				<div className={styles.filechooser}>
					<div className={styles.selection}>
						<input key={radioState} type="radio" name="file_to_edit" id="edit_local_file" value="edit" onChange={onRadioChange} defaultChecked={radioState == "edit"} />
						<label htmlFor="edit_local_file">
							<p> Helyi fájl szerkesztése </p>
							<input type="file" name="" id="" accept={STAGEFILE_EXTENSIONS.join(",")} onChange={onFileUpload} />
							{
								fileUploadState !== null ? <p>{fileUploadState}</p> : <></>
							}
						</label>
					</div>
					<div className={styles.selection}>
						<input key={radioState} type="radio" name="file_to_edit" id="new_file" value="new" onChange={onRadioChange} defaultChecked={radioState == "new"} />
						<label htmlFor="new_file">
							<p>Új fájl szerkesztése</p>
							<div className="filename">
								<input type="text" placeholder='Fájl neve' onChange={onFileNameChange} />
								<span>.yaml</span>
							</div>
						</label>
					</div>
				</div>

				<Button disabled={!continueValid} onClick={_ => {
					props.callback(radioState === "edit"
						? fileState!
						: {
							title: fileName,
							author: "",
							stages: []
						});
				}}>Folytatás</Button>
			</div>


			<div className={styles.buttons}>
				<LinkButton href="/">Főoldal</LinkButton>
			</div>
		</>
	);
};

export default EditorFileChooserComponent;
