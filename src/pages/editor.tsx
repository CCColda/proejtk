import { StageFile } from '../types/stage';
import EditorFileChooserComponent from '../components/editorfilechooser';
import EditorComponent from '../components/editor';
import { useState } from 'react';
import { TitlePanel } from '@/components/titlepanel';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import styles from "./editor.module.scss";

const EditorPageComponent: React.FC<{}> = (props) => {
	const [stageFile, setStageFile] = useState<null | StageFile>(null);
	const phone = useMediaQuery("(max-width: 480px) or (max-height: 500px)");

	const onFileChosen = (stage: StageFile) => {
		setStageFile(stage);
	};

	return <>
		<TitlePanel text="Szerkesztő" />
		{phone
			? <div className={styles.unsupported}>
				<p>A szerkesztő kis képernyőkön nem támogatott.</p>
				<p>Kérlek válts asztali módra.</p>
			</div>
			: (stageFile === null
				? <EditorFileChooserComponent callback={onFileChosen} />
				: <EditorComponent stageFile={stageFile} />)
		}
	</>;
};


export default EditorPageComponent;
