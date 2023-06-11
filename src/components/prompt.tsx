import styles from "./prompt.module.scss";
import { Button } from './button';
import { useRef, useState } from 'react';

export type KeyPromptComponentProps = {
	submit: (key: string) => Promise<any>;
};

export const KeyPromptComponent: React.FC<KeyPromptComponentProps> = (props) => {
	let inputRefNode = useRef<HTMLInputElement>(null);

	const [disabled, setDisabled] = useState(false);

	return <div className={styles.prompt}>
		<h1>A feloldáshoz jelszó szükséges</h1>
		<form>
			<input className={styles.input} type="password" placeholder="Jelszó" ref={inputRefNode}></input>
			<Button classes={[styles.input]} disabled={disabled} onClick={async (ev) => {
				if (!inputRefNode.current)
					return;

				ev.preventDefault();
				const key = inputRefNode.current.value;

				setDisabled(true);

				await props.submit(key);
				setDisabled(false);

				if (inputRefNode.current)
					inputRefNode.current.value = "";
			}}>Feloldás</Button>
		</form>
	</div>
};