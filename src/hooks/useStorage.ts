import Storage from "@/data/storage";
import { useEffect, useState } from "react";

export const useStorage = () => {
	const [storage, setStorage] = useState<Storage>(new Storage());

	useEffect(() => {
		const newStorage = new Storage();
		newStorage.setStorage(window.localStorage);

		setStorage(newStorage);
	}, []);

	return storage;
};