import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <primitive object={gltf.scene} />
    </>
  );
}

function ModelViewer({ url }) {
  return (
    <Canvas>
      <Suspense fallback={<div>Loading...</div>}>
        <Model url={url} />
      </Suspense>
    </Canvas>
  );
}

export default ModelViewer;
