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

export type StageFile = {
	stages: (ID & Stage)[],
};