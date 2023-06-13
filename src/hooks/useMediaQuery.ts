import { useEffect, useState } from "react";

export const useMediaQuery = (queryString: string) => {
	const [queryValue, setQueryValue] = useState<boolean | null>(null);

	useEffect(() => {
		const media = window.matchMedia(queryString);

		const changeListener: typeof media.onchange =
			mq => setQueryValue(mq.matches);

		media.addEventListener("change", changeListener);

		return () => media.removeEventListener("change", changeListener);
	}, []);

	return queryValue;
};