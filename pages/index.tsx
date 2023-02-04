/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

const Home: NextPage = () => {
	const [imageUrl, setImageUrl] = useState<string>('');
	const [response, setResponse] = useState<any>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImageUrl(e.target.value);
	};

	const handleClick = async () => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_HOSTNAME}/api/generate?imageUrl=${imageUrl}`
		);
		const json = await res.json();
		console.log(json);
		setResponse(json);
	};

	return (
		<>
			<Head>
				<title>Alt Image Generator</title>
				<meta name="description" content="Alt image generator" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="main">
				<div className={styles.container}>
					<h1 className={styles.h1}> Alt Image Generator</h1>

					<input
						type="text"
						className={styles.input}
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
					<Link
						className={styles.highlight}
						href="#"
						onClick={handleClick}
					>
						Generate Alt Text
					</Link>
				</div>

				<div className={styles.imgContainer}>
					{imageUrl && (
						<img
							className={styles.img}
							style={{
								objectFit: 'contain',
							}}
							src={imageUrl}
							alt="Image from URL"
						/>
					)}
					{response && (
						<span className={styles.res}>
							<p className={styles.p}>{response}</p>
						</span>
					)}
				</div>
			</main>
		</>
	);
};

export default Home;
