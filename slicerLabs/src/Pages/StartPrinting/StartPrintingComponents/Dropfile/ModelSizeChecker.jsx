import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
// import { useThree } from 'react-three-fiber';
import { Box3, Vector3 } from 'three';

const ModelSizeChecker = ({ model }) => {
  const { camera } = useThree();
  const boundingBoxRef = useRef();

  useEffect(() => {
    if (model && boundingBoxRef.current) {
      // Calculate the size of the model's bounding box
      const boundingBox = new Box3().setFromObject(model);
      const size = new Vector3();
      boundingBox.getSize(size);

      // Get the size of the camera frustum
      const frustumSize =
        Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * 2;

      // Calculate the scale factor based on the size of the model and the frustum size
      const scaleFactor = frustumSize / Math.max(size.x, size.y, size.z);

      // Apply the scale factor to the model and set its position
      model.scale.set(scaleFactor, scaleFactor, scaleFactor);
      model.position.set(0, 0, 0);
      model.rotation.set(0, 0, 0); // Reset rotation to prevent unintended rotation

      // Optionally, update camera position based on model size if needed
      // const cameraPosition = {
      //   x: camera.position.x,
      //   y: camera.position.y,
      //   z: camera.position.z,
      // };
      // camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    }
  }, [model, camera]);

  return <primitive object={model} ref={boundingBoxRef} />;
};

export default ModelSizeChecker;
