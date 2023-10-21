"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
	OrbitControls,
	Preload,
	useGLTF,
	Html,
	useProgress,
} from "@react-three/drei";

const CanvasLoader = () => {
	const { progress } = useProgress();
	return (
		<Html
			as="div"
			center
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<span className="canvas-loader"></span>
			<p
				style={{
					fontSize: 14,
					color: "#F1F1F1",
					fontWeight: 800,
					marginTop: 40,
				}}
			>
				{progress.toFixed(2)}%
			</p>
		</Html>
	);
};

const Key = ({ isMobile }: { isMobile: boolean }) => {
	const key = useGLTF("/key-white.glb");

	return (
		<mesh>
			<hemisphereLight intensity={2} groundColor="black" />
			<spotLight
				position={[-20, 50, 10]}
				angle={0.12}
				penumbra={1}
				intensity={1}
				castShadow
				shadow-mapSize={1024}
			/>
			<pointLight intensity={1} />
			<primitive
				object={key.scene}
				scale={isMobile ? 3 : 4}
				position={[0, 0, 0]}
				rotation={[-0.01, -150.2, -0.1]}
			/>
		</mesh>
	);
};

const KeyCanvas = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Add a listener for changes to the screen size
		const mediaQuery = window.matchMedia("(max-width: 500px)");

		// Set the initial value of the `isMobile` state variable
		setIsMobile(mediaQuery.matches);

		// Define a callback function to handle changes to the media query
		const handleMediaQueryChange = (event: MediaQueryListEvent) => {
			setIsMobile(event.matches);
		};

		// Add the callback function as a listener for changes to the media query
		mediaQuery.addEventListener("change", handleMediaQueryChange);

		// Remove the listener when the component is unmounted
		return () => {
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
		};
	}, []);

	return (
		<Canvas
			frameloop="demand"
			shadows
			dpr={[1, 2]}
			camera={{ position: [20, 3, 5], fov: 25 }}
			gl={{ preserveDrawingBuffer: true }}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls
					autoRotate
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
				<Key isMobile={isMobile} />
			</Suspense>

			<Preload all />
		</Canvas>
	);
};

export default KeyCanvas;
