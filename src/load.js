const THREE = window.THREE

function load () {
  const loader = new THREE.GLTFLoader()

  const jsonScene = window.localStorage.getItem('scene')

  return new Promise((resolve) => {
    loader.parse(jsonScene, '', (gltf) => {
      resolve(gltf.scene)
    })
  })
}

export default load
