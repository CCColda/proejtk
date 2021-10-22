import * as React from 'react';

export type KeyPromptComponentProps = {
	submit: (key: string) => Promise<any>;
};

export const KeyPromptComponent: React.FC<KeyPromptComponentProps> = (props) => {
	let inputRefNode: HTMLInputElement;
	let submitRefNode: HTMLButtonElement;

	return <div className="prompt">
		<h1>A feloldáshoz jelszó szükséges</h1>
		<form onSubmit={async (ev) => {
			ev.preventDefault();
			const key = inputRefNode.value;
			submitRefNode.disabled = true;

			await props.submit(key);
			submitRefNode.disabled = false;

			inputRefNode.value = "";
		}}>
			<input className="input" type="password" placeholder="Jelszó" ref={node => inputRefNode = node}></input>
			<button className="input" type="submit" ref={node => submitRefNode = node}>Feloldás</button>
		</form>
	</div>
};