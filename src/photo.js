function takePhoto (renderer) {
  const image = renderer.domElement.toDataURL('image/png')
  const fileName = 'photo.png'

  const a = document.createElement('a')
  a.href = image
  a.download = fileName
  a.click()
}

export default takePhoto
