import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import '../styles/editor.css';
import '../styles/button.css';

import { LOCAL_STAGEFILE, STAGEFILE_EXTENSIONS } from '../data/constants';
import { loadLocalStageFileRaw } from '../data/stagefile';
import { StageFile } from '../types/stage';

export type EditorComponentProps = {
};


const EditorComponent: React.FC<EditorComponentProps> = (props) => {
	const [radioState, setRadioState] = React.useState<"new" | "edit">("new");
	const [fileState, setFileState] = React.useState<null | StageFile>(null);
	const [fileUploadState, setFileUploadState] = React.useState<string | null>(null);
	const [fileName, setFileName] = React.useState("");

	const continueValid = React.useMemo(() => (radioState === "edit" && !!fileState) || (radioState === "new" && fileName !== ""), [fileState, radioState, fileName]);

	const onRadioChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
		setRadioState(ev.currentTarget.value as "new" | "edit");
	};

	const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (ev) => {
		const blob = ev.target.files[0];
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
	};

	const onFileNameChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
		setFileName(ev.currentTarget.value);
	};

	return (
		<>
			<div className="titlepanel">
				<h1>Szerkesztő</h1>
			</div>

			<div className="dialog">
				<h2>Fájl kiválasztása</h2>
				<div className="filechooser">
					<div className="selection">
						<input type="radio" name="file_to_edit" id="edit_local_file" value="edit" onChange={onRadioChange} />
						<label htmlFor="edit_local_file">
							<p> Helyi fájl szerkesztése </p>
							<input type="file" name="" id="" accept={STAGEFILE_EXTENSIONS.join(",")} onChange={onFileUpload} />
							{
								fileUploadState !== null ? <p>{fileUploadState}</p> : <></>
							}
						</label>
					</div>
					<div className="selection">
						<input type="radio" name="file_to_edit" id="new_file" value="new" onChange={onRadioChange} defaultChecked />
						<label htmlFor="new_file">
							<p>Új fájl szerkesztése</p>
							<div className="filename">
								<input type="text" placeholder='Fájl neve' onChange={onFileNameChange} />
								<span>.yaml</span>
							</div>
						</label>
					</div>
				</div>

				<button className="button primary continue" disabled={!continueValid}>Folytatás</button>
			</div>


			<div className="buttons">
				<ReactRouterDOM.Link className="button primary homepage" to="./">Főoldal</ReactRouterDOM.Link>
			</div>
		</>
	);
};

export default EditorComponent;
