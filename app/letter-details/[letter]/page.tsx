"use client";

import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { Leva } from "leva";
import ThreeDLetter from "@/app/components/ThreeDLetter/ThreeDLetter";
import ThreeDModel from "@/app/components/ThreeDModel/ThreeDModel";
import { capitalLetters } from "@/app/data";
import { useControls } from "leva";

const toneMappingOptions = {
  NoToneMapping: THREE.NoToneMapping,
  LinearToneMapping: THREE.LinearToneMapping,
  ReinhardToneMapping: THREE.ReinhardToneMapping,
  CineonToneMapping: THREE.CineonToneMapping,
  ACESFilmicToneMapping: THREE.ACESFilmicToneMapping,
  CustomToneMapping: THREE.CustomToneMapping,
  AgXToneMapping: THREE.AgXToneMapping,
  NeutralToneMapping: THREE.NeutralToneMapping,
};

const colorSpaceOptions: Record<string, THREE.ColorSpace> = {
  SRGBColorSpace: THREE.SRGBColorSpace,
  LinearSRGBColorSpace: THREE.LinearSRGBColorSpace,
  DisplayP3ColorSpace: THREE.DisplayP3ColorSpace,
  LinearDisplayP3ColorSpace: THREE.LinearDisplayP3ColorSpace,
};

THREE.ColorManagement.enabled = true;

const LetterDetails = ({ params }: { params: { letter: string } }) => {
  const { letter } = params;
  const letterObj = capitalLetters.find(
    (letterObj) => letterObj.letter === letter
  );

  const { toneMapping } = useControls({
    toneMapping: {
      options: toneMappingOptions,
      value: THREE.LinearToneMapping,
    },
  });

  const { colorSpace } = useControls({
    colorSpace: {
      options: colorSpaceOptions,
      value: THREE.LinearSRGBColorSpace,
    },
  });

  return (
    <section className="flex flex-col items-center gap-4 p-8">
      <div className="threed-letter-container">
        <Leva hidden />
        <Canvas
          camera={{ position: [0, 0.4, 1.4], fov: 50 }}
          gl={{
            toneMapping: toneMapping,
            outputColorSpace: colorSpace,
          }}
          shadows="soft"
        >
          <ThreeDLetter letter={letterObj!.letter} color={letterObj!.color} />
        </Canvas>
      </div>
      <div className="p-2">
        <p className="text-5xl font-luckyguy">{letterObj?.text}</p>
      </div>
      <div className="flex justify-start gap-8 items-center w-full">
        <div className="model-container cursor-pointer">
          <Canvas camera={{ position: [0, 0.4, 6] }}>
            <ThreeDModel modelName={letterObj!.model} />
          </Canvas>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="relative w-[300px] h-[200px]">
            <Image
              src="https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"
              alt="apples"
              fill
            />
          </div>
          <div className="relative w-[300px] h-[200px]">
            <Image
              src="https://domf5oio6qrcr.cloudfront.net/medialibrary/11525/0a5ae820-7051-4495-bcca-61bf02897472.jpg"
              alt="apples"
              fill
            />
          </div>
          <div className="relative w-[300px] h-[200px]">
            <Image
              src="https://images.immediate.co.uk/production/volatile/sites/10/2018/02/955f37aa-1ab9-445c-95a8-47129954f66e-2756327.jpg"
              alt="apples"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetterDetails;
