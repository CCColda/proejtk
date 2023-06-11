export const PATHS = Object.freeze({
	REGISTRY: "registry.json",
	SCHEMA: "schema.json",
	STAGEFILES: "stagefiles"
});

export const STAGEFILE_MIMES = Object.freeze([
	"application/json", "text/yaml", "text/x-yaml",
	"application/x-yaml", "text/vnd.yaml"
]);

export const STAGEFILE_EXTENSIONS = Object.freeze([
	".json", ".yaml", ".yml"
]);

export const LOCAL_STAGEFILE = "local";