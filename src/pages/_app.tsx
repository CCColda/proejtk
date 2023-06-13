import { AppProps } from "next/app";
import '../styles/globals.css';
import '../styles/font.css';

import styles from './_app.module.scss';

import Head from "next/head";
import getConfig from "next/config";
import { NextUserConfig } from "@/types/next.config";

import image_urls from "../styles/image_urls.json";
import { CSSProperties } from "react";


const serializeImageURLs = (prefix: string): CSSProperties => {
	return Object.fromEntries(
		Object.entries(image_urls)
			.map(([k, v]) => (["--img-" + k, `url("${v.replace("@", prefix)}")`]))
	);
}

export default function App({ Component, pageProps }: AppProps) {
	const { publicRuntimeConfig: config } = getConfig() as NextUserConfig;

	return (<>
		<Head>
			<title>proejtk</title>
		</Head>
		<main
			className={[styles.content, config.mode == "dev" ? styles.dev : ""].join(" ")}
			style={serializeImageURLs(config.assetPrefix)}>
			<Component {...pageProps}></Component>
		</main>
	</>
	)
}