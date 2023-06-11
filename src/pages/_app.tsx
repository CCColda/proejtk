import { AppProps } from "next/app";
import './globals.css';
import './_app.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className="content">
			<Component {...pageProps}></Component>
		</main>
	)
}