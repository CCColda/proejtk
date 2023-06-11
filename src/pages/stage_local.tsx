import { LOCAL_STAGEFILE, STAGEFILE_EXTENSIONS } from '../data/constants';
import { loadLocalStageFileRaw } from '../data/stagefile';
import { useState } from 'react';
import { StageLoaderComponent, StageLoaderResult } from './stageloader';

import styles from "./stage_local.module.scss";

const LocalStage: React.FC<{}> = props => {
	const [blob, setBlob] = useState<Blob | null>(null);
	const loader = async (): Promise<StageLoaderResult> => {
		const result = await loadLocalStageFileRaw(blob!);
		if (!result) {
			return {
				status: 'error',
				message: "# Helytelenül formázott fájl\n\n\n\n\n\nHa kijavítottad a problémát, [próbáld újra 💧](./?stage_local)"
			};
		}

		return {
			status: "success",
			stage: result
		};
	}

	return !blob
		? <div className={styles.prompt}>
			<h1>Fájl megnyitása</h1>
			<input className="input" type="file" accept={[...STAGEFILE_EXTENSIONS].join(',')} onChange={
				ev => {
					if (ev.target.files?.[0])
						setBlob(ev.target.files[0]);
				}
			}></input>
		</div>
		: <StageLoaderComponent loader={loader} stage="local" />
};

export default LocalStage;

