import { PATHS } from '../data/constants';
import { loadRegistry } from '../data/registryfile';
import { loadStageFileMeta } from '../data/stagefile';

import { StageCard } from '../components/stagecard';

import { RegistryFile } from '../types/registry';
import { StageFileBase } from '../types/stage';

import styles from "./index.module.css";

import { useEffect, useState } from 'react';

import { TitlePanel } from '@/components/titlepanel';
import { LinkButton } from '@/components/button';
import getConfig from 'next/config';
import { NextUserConfig } from '@/types/next.config';

export type StageSelectorRouteComponentState = {
	stages: { filename: string, base: StageFileBase }[]
};

export default function StageSelector() {
	const config = getConfig() as NextUserConfig;

	const [stages, setStages] = useState<{ filename: string, base: StageFileBase }[]>([]);

	const load = () => loadRegistry((config.publicRuntimeConfig.assetPrefix ?? "") + PATHS.REGISTRY).then(async (v) => {
		if (!v) {
			console.error("Failed loading registry");
			return;
		}

		let loadedStages: typeof stages = [];

		for (const stage of (v as RegistryFile).stages) {
			const base = await loadStageFileMeta(`${config.publicRuntimeConfig.assetPrefix ?? ""}${PATHS.STAGEFILES}/${stage}`);

			if (base)
				loadedStages.push({ filename: stage, base });
		}

		setStages(loadedStages);
	});

	useEffect(() => {
		load();
	}, []);

	return (
		<>
			<TitlePanel text="Műalkotások" />
			<div className={styles.contentpanel}>
				<div className={styles.stagelist}>
					{
						stages.map(
							(v, i) => <StageCard key={i} stage={v.filename} {...v.base} />)
					}
				</div>
				<div className={styles.buttons}>
					<LinkButton href="/stage_local"> Helyi fájl megnyitása </LinkButton>
					<LinkButton href="/editor"> Szerkesztő </LinkButton>
				</div>
			</div>
		</>
	);
}