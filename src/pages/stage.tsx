import { PATHS } from '../data/constants';
import { loadStageFileRaw } from '../data/stagefile';

import { StageLoaderComponent, StageLoaderResult } from './stageloader';

import styles from "./stage.module.scss";
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const Stage: React.FC<{}> = props => {
	const router = useRouter();

	const stage = useMemo(() => router.query["s"] as string, [router]);

	const loader = async (): Promise<StageLoaderResult> => {
		const result = await loadStageFileRaw(`${PATHS.STAGEFILES}/${stage}`);
		if (!result) {
			return {
				status: 'error',
				message: "# Ilyen oldal nem létezik\n\n_(vagy nem sikerült betölteni)_\n\n\n\n\n\nKeresgélj inkább a [főoldalon 💧](./)"
			};
		}
		return {
			status: 'success',
			stage: result!
		};
	}

	return <StageLoaderComponent loader={loader} stage={stage} />
};

export default Stage;