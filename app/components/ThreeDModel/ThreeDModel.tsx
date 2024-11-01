import { OrbitControls, useGLTF } from "@react-three/drei";

import { Mesh } from "three";
import dynamic from "next/dynamic";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

const ThreeDModel = ({ modelName }: { modelName: string }) => {
  const { nodes, materials } = useGLTF(`/models/${modelName}`);

  const appleGeometry = (nodes.Sphere as Mesh).geometry;

  const rotation = useControls({
    rotation: {
      value: {
        x: 0.86,
        y: 0.55,
        z: 0,
      },
      step: 0.01,
    },
  });

  useFrame(() => {
    if (!appleGeometry) {
      return;
    }

    appleGeometry.rotateY(0.01);
  });

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight
        intensity={5}
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

      <group
        position={[0, 0, 0]}
        rotation={[
          rotation.rotation.x,
          rotation.rotation.y,
          rotation.rotation.z,
        ]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={appleGeometry}
          material={materials.Apple}
        />
      </group>
    </>
  );
};

export default dynamic(() => Promise.resolve(ThreeDModel), {
  ssr: false,
});
