import { useState } from "react";

export const useForceUpdate = () => {
	const [v, setV] = useState(0);

	return () => setV(v + 1);
}

export const useSelectiveForceUpdate = (): [number, () => void] => {
	const [v, setV] = useState(0);

	return [v, () => setV(v + 1)];
}