import { Mesh } from '../vendor/three/build/three.module.js';
import { GLTFLoader } from '../vendor/three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from '../vendor/three/examples/jsm/exporters/GLTFExporter.js';
import { BufferGeometryUtils } from '../vendor/three/examples/jsm/utils/BufferGeometryUtils.js';

// Exports the content of the scene to the computer.
function exportScene(scene) {
  const exporter = new GLTFExporter();
  const options = {};

  const voxels = scene.children.filter(
    child => child.name.slice(0, 5) === 'Voxel'
  );
  const mergedVoxels = mergeMeshes(voxels);

  exporter.parse(
    mergedVoxels,
    gltfScene => {
      const jsonScene = JSON.stringify(gltfScene);
      const modelData = URL.createObjectURL(
        new window.Blob([jsonScene], { type: 'text/plain' })
      );
      const modelName = 'model.gltf';
      download(modelData, modelName);
    },
    options
  );
}

// Takes and array of meshes and merges them into a single mesh
// while preserving their individual positions and materials.
function mergeMeshes(meshes) {
  const geometries = [];
  const materials = [];

  for (let i = 0; i < meshes.length; i++) {
    geometries.push(meshes[i].geometry.clone().applyMatrix(meshes[i].matrix));
    materials.push(meshes[i].material.clone());
  }

  const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
    geometries,
    true
  );
  const mergedMesh = new Mesh(mergedGeometry, materials);

  return mergedMesh;
}

// Takes a scene and saves it content to local storage in glTF string format.
function saveScene(scene) {
  const exporter = new GLTFExporter();
  const options = {};

  const voxels = scene.children.filter(
    child => child.name.slice(0, 5) === 'Voxel'
  );

  exporter.parse(
    voxels,
    gltfScene => {
      const jsonScene = JSON.stringify(gltfScene);
      window.localStorage.setItem('scene', jsonScene);
    },
    options
  );
}

// Takes a scene and loads scene content into it from local storage.
function loadScene(scene) {
  const loader = new GLTFLoader();

  const jsonScene = window.localStorage.getItem('scene');

  loader.parse(jsonScene, '', gltf => {
    const loadedScene = gltf.scene;

    const oldVoxels = scene.children.filter(
      child => child.name.slice(0, 5) === 'Voxel'
    );
    scene.remove(...oldVoxels);

    const newVoxels = loadedScene.children;
    scene.add(...newVoxels);
  });
}

// Takes a screenshot of the specified renderer.
function screenshot(renderer) {
  const imageData = renderer.domElement.toDataURL('image/png');
  const imageName = 'screenshot.png';
  download(imageData, imageName);
}

// Creates a file with the specified data and name,
// and downloads it to the computer.
function download(data, fileName) {
  const a = document.createElement('a');
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export { saveScene, loadScene, exportScene, screenshot };
