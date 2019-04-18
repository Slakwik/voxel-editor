const THREE = window.THREE

function load () {
  const loader = new THREE.GLTFLoader()

  const sceneJSON = window.localStorage.getItem('scene')

  return new Promise((resolve) => {
    loader.parse(sceneJSON, '', (gltf) => {
      resolve(gltf.scene)
    })
  })
}

export default load
