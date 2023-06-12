import { useState } from "react";

export type UseArrayOp<T> = {
	reset: (newArr: T[]) => void,
	set: (i: number, newItem: T) => void,
	insert: (i: number, newItem: T) => void,
	push: (newItem: T) => void,
	pop: (n: number) => void,
	pop_front: (n: number) => void,
	clear: () => void
}

export const useArray = <T>(initial: T[] = []): [T[], UseArrayOp<T>] => {
	const [arr, setArr] = useState<T[]>(initial);

	return [arr, {
		reset: (newArr: T[]) => setArr(newArr),
		set: (i: number, newItem: T) => setArr([...arr.slice(0, i), newItem, ...arr.slice(i + 1)]),
		insert: (i: number, newItem: T) => setArr([...arr.slice(0, i), newItem, ...arr.slice(i)]),
		push: (newItem: T) => setArr([...arr, newItem]),
		pop: (n: number = 1) => setArr(arr.slice(0, -n)),
		pop_front: (n: number = 1) => setArr(arr.slice(n)),
		clear: () => setArr([])
	}];
};