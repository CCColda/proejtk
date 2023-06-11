import { StageFile } from '../types/stage';
import EditorFileChooserComponent from '../components/editorfilechooser';
import EditorComponent from '../components/editor';
import { useState } from 'react';
import { TitlePanel } from '@/components/titlepanel';

const EditorPageComponent: React.FC<{}> = (props) => {
	const [stageFile, setStageFile] = useState<null | StageFile>(null);

	const onFileChosen = (stage: StageFile) => {
		setStageFile(stage);
	};

	return <>
		<TitlePanel text="Szerkesztő" />

		{
			stageFile === null
				? <EditorFileChooserComponent callback={onFileChosen} />
				: <EditorComponent stageFile={stageFile} />
		}
	</>;
};


export default EditorPageComponent;
