"use client";

import { Center, Text3D } from "@react-three/drei";
import { useEffect, useRef } from "react";

import { Mesh } from "three";
import dynamic from "next/dynamic";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

const ThreeDLetter = ({ letter, color }: { letter: string; color: string }) => {
  const letterRef = useRef<Mesh>(null);
  const lowerCaseLetterRef = useRef<Mesh>(null!);

  const { ambientIntensity } = useControls({
    ambientIntensity: {
      value: 0.6,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  const { directionalIntensity } = useControls({
    directionalIntensity: {
      value: 10,
      min: 0,
      max: 10,
      step: 0.1,
    },
  });

  useEffect(() => {
    if (!letterRef.current || !lowerCaseLetterRef.current) {
      return;
    }

    letterRef.current.geometry.computeBoundingBox();
    letterRef.current.position.set(
      0,
      letterRef.current.geometry.boundingBox!.max.y / 2,
      0
    );
    letterRef.current.geometry.center();

    lowerCaseLetterRef.current.geometry.computeBoundingBox();
    lowerCaseLetterRef.current.position.set(
      1,
      lowerCaseLetterRef.current.geometry.boundingBox!.max.y / 2,
      0
    );
    lowerCaseLetterRef.current.geometry.center();
  }, []);

  useFrame(() => {
    if (!letterRef.current || !lowerCaseLetterRef.current) {
      return;
    }

    letterRef.current.rotation.y += 0.01;
    lowerCaseLetterRef.current.rotation.y += 0.01;
  });

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        intensity={directionalIntensity}
        castShadow
        position={[5, 5, 5]}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-bias={0.001}
        shadow-top={10}
        shadow-right={10}
        shadow-bottom={-10}
        shadow-left={-10}
      />

      <mesh receiveShadow position={[0, -0.35, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial />
      </mesh>
      <Center>
        <group>
          <Text3D
            castShadow
            ref={letterRef}
            size={0.75}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            font="/typeface/LuckiestGuy-Regular.json"
          >
            {letter}
            <meshStandardMaterial roughness={0.5} color={color} />
          </Text3D>
          <Text3D
            castShadow
            ref={lowerCaseLetterRef}
            size={0.5}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            font="/typeface/Roboto-Regular.json"
          >
            {letter.toLowerCase()}
            <meshStandardMaterial color={color} />
          </Text3D>
        </group>
      </Center>
    </>
  );
};

export default dynamic(() => Promise.resolve(ThreeDLetter), {
  ssr: false,
});
