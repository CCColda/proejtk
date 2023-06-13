import ReactMarkdown from "react-markdown";

import { KeyPromptComponent } from "./prompt";
import { decryptStageFile } from "../data/stagefile";
import { StageData, StageFile } from "../types/stage";
import { useEffect, useState } from "react";
import { useStorage } from "@/hooks/useStorage";
import { StageComponent } from "@/components/stagecomponent";

type StageLoaderRouteComponentState =
	{ status: 'empty', stage: null, message?: null } |
	{ status: 'error', stage: null, message: string } |
	{ status: 'loaded', stage: StageFile, message?: null } |
	{ status: 'ready', stage: StageData, message?: null };

export type StageLoaderResult =
	{ status: 'success', stage: StageFile } |
	{ status: 'error', message: string };

export type StageLoaderComponentProps = {
	stage: string,
	loader: MaybePromise<() => StageLoaderResult>
};

export const StageLoaderComponent: React.FC<StageLoaderComponentProps> = props => {
	const [state, setState] = useState<StageLoaderRouteComponentState>({ status: "empty", stage: null });
	const storage = useStorage();

	useEffect(() => console.log(state), [state]);

	const load = async () => {
		const result = await props.loader();

		if (result.status !== "success")
			return false;

		const stagefile = result.stage;

		if (stagefile.encrypted) {
			const key = storage.getKey(props.stage);

			if (key) {
				const decrypted = await decryptStageFile(stagefile, key);

				if (decrypted) {
					setState({
						status: 'ready',
						stage: decrypted
					});
					return true;
				}
			}

			setState({
				status: 'loaded', stage: stagefile
			});
			return true;
		}

		setState({ status: "ready", stage: stagefile });

		return true;
	};

	useEffect(() => { props.stage && load() }, [props.stage]);

	switch (state.status) {
		case 'empty': {
			return <div className="prompt">
				<ReactMarkdown>Betöltés...</ReactMarkdown>
			</div>
		}
		case 'error': {
			return <div className="prompt">
				<ReactMarkdown>{state.message}</ReactMarkdown>
			</div>
		}
		case 'loaded': {
			return <KeyPromptComponent submit={async (key) => {
				const decrypted = await decryptStageFile(state.stage as StageFile, key);

				if (decrypted) {
					storage.setKey(props.stage, key);

					setState({ status: 'ready', stage: decrypted });
				}
			}} />
		}
		case 'ready': {
			try {
				return <StageComponent stage={props.stage} stagedata={state.stage as StageData} />;
			}
			catch (exc) {
				console.error(exc);
				setState({ status: 'error', stage: null, message: "# Hiba történt a fájl olvasása közben\n\n\n\n\n\nNézz körbe a [főoldalon 💧](./)" })
			}
		}
	}
};
