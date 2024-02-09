import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
// import { useThree } from 'react-three-fiber';
import { Box3, Color, Vector3 } from "three";

// const ModelSizeChecker = ({ model }) => {
//   const { camera } = useThree();
//   const boundingBoxRef = useRef();

//   useEffect(() => {
//     if (model && boundingBoxRef.current) {
//       // Calculate the size of the model's bounding box
//       const boundingBox = new Box3().setFromObject(model);
//       const size = new Vector3();
//       boundingBox.getSize(size);

//       // Get the size of the camera frustum
//       const frustumSize =
//         Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * 2;

//       // Calculate the scale factor based on the size of the model and the frustum size
//       const scaleFactor = frustumSize / Math.max(size.x, size.y, size.z);

//       // Apply the scale factor to the model and set its position
//       model.scale.set(scaleFactor, scaleFactor, scaleFactor);
//       model.position.set(0, 0, 0);
//       model.rotation.set(0, 0, 0); // Reset rotation to prevent unintended rotation

//       // Optionally, update camera position based on model size if needed
//       // const cameraPosition = {
//       //   x: camera.position.x,
//       //   y: camera.position.y,
//       //   z: camera.position.z,
//       // };
//       // camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
//     }
//   }, [model, camera]);

//   return <primitive object={model} ref={boundingBoxRef} />;
// };

// export default ModelSizeChecker;

// const ModelSizeChecker = ({ model }) => {
//   const { scene, camera } = useThree();
//   const boundingBoxRef = useRef();

//   useEffect(() => {
//     if (!model || !scene) {
//       return; // Exit early if model or scene is undefined
//     }

//     if (model && boundingBoxRef.current) {
//       // Remove the grid from the scene
//       // scene.background = new Color(0xffffff); // Set background color
//       scene.children = scene.children.filter(
//         (child) => child.type !== "GridHelper"
//       );

//       // Calculate the bounding box of the model
//       const boundingBox = new Box3().setFromObject(model);

//       // Calculate the center of the bounding box
//       const center = new Vector3();
//       boundingBox.getCenter(center);

//       // Calculate the size of the bounding box
//       const size = new Vector3();
//       boundingBox.getSize(size);

//       // Calculate the distance from the center to each edge
//       const distances = [size.x / 2, size.y / 2, size.z / 2];

//       // Find the maximum distance
//       const maxDistance = Math.max(...distances);

//       // Calculate the new position of the camera
//       const newPosition = center.clone().add(new Vector3(0, 0, maxDistance));

//       // Set the position of the camera to focus on the center of the model
//       camera.position.copy(newPosition);
//       camera.lookAt(center);

//       // Scale the model smaller if it doesn't fit within the viewport
//       const viewportHeight =
//         2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * maxDistance;
//       const modelHeight = size.y;
//       const scaleFactor = viewportHeight / modelHeight;
//       model.scale.set(scaleFactor, scaleFactor, scaleFactor);
//       // Position the model at its 2D center and lowest z

//       boundingBox.getCenter(center);
//       const minZ = boundingBox.min.z;
//       model.position.set(center.x, center.y, minZ);

//       // Reset rotation to prevent unintended rotation
//       model.rotation.set(0, 0, 0);
//       // Change the color of the model
//       model.traverse((child) => {
//         if (child.isMesh && child.material) {
//           if (!child.material.color) {
//             // If color property is not defined, create a new Color instance
//             child.material.color = new Color();
//           }
//           // Set model color to red
//           child.material.color.set(0xff0000);
//         }
//       });
//     }
//   }, [model, camera, scene]);

//   return <primitive object={model} ref={boundingBoxRef} />;
// };
const ModelSizeChecker = ({ model }) => {
  const { camera } = useThree();
  const boundingBoxRef = useRef();

  useEffect(() => {
    if (!model || !boundingBoxRef.current) return;

    // Calculate the bounding box of the model
    const boundingBox = new Box3().setFromObject(model);

    // Get the center and size of the bounding box
    const center = new Vector3();
    boundingBox.getCenter(center);
    const size = new Vector3();
    boundingBox.getSize(size);

    // Calculate the distance from the custom center to each edge
    const distances = [size.x / 2, size.y / 2, size.z / 2];

    // Find the maximum distance
    const maxDistance = Math.max(...distances);

    // Calculate the new position of the camera
    const newPosition = center.clone().add(new Vector3(0, 0, maxDistance));

    // Set the position and lookAt of the camera to focus on the custom center
    camera.position.copy(newPosition);
    camera.lookAt(center);

    // Calculate the scale factor to fit the model within the viewport
    const viewportHeight = 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * maxDistance;
    const modelHeight = size.y;
    const scaleFactor = viewportHeight / modelHeight;

    // Set the scale of the model
    model.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Optionally, reset rotation to prevent unintended rotation
    model.rotation.set(0, 0, 0);

    // Optionally, position the model at its 2D center and lowest z
    const minZ = boundingBox.min.z;
    model.position.set(center.x, center.y, minZ);
  });

  return <primitive object={model} ref={boundingBoxRef} />;
};
export default ModelSizeChecker;
