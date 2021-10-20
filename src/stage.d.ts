export type ID = { id: string };
export type OptionalID = { id?: string };


export type Action = OptionalID & (
	{ type: "game_over", message: string } |
	{ type: "stage", stage: string | Stage }
);

export type ActionType = Action["type"];

export type Button = {
	text: string,
	action: Action | string,
};

export type Stage = OptionalID & {
	text: string,
	buttons: Button[],
};

type StageFileBase = {
	title: string,
	author: string,
};

type StageFileData = {
	start?: string,
	stages: (ID & Stage)[],
};

type EncryptedStageFileData = { encrypted: true, size: number, data: string };
interface TextualStageFileData extends StageFileData {
	encrypted?: false
}

export type StageFile = StageFileBase & (EncryptedStageFileData | TextualStageFileData);

export type StageData = StageFileBase & StageFileData;