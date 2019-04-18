const THREE = window.THREE

function save (scene) {
  const exporter = new THREE.GLTFExporter()
  const options = { }

  exporter.parse(scene, (gltf) => {
    const gltfJSON = JSON.stringify(gltf)
    window.localStorage.setItem('scene', gltfJSON)
  }, options)
}

export default save
