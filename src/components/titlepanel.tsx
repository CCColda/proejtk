import styles from './titlepanel.module.css';

export const TitlePanel: React.FC<{ text: string }> = props => {
	return <div className={styles.titlepanel}>
		<h1>{props.text}</h1>
	</div>
}