describe('my-editor', () => {
  let page
  let elementPath = `document.querySelector('body > my-app').shadowRoot.querySelector('my-editor')`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  it('should be added to the dom', async () => {
    const element = await page.evaluate(`${elementPath}.shadowRoot.querySelector('div')`)
    global.assert.isOk(element)
  })

  it('should be resized dynamically', async () => {
    const newSize = { width: 960, height: 540 }
    const expected = newSize
    page.setViewport(newSize)
    const actual = {
      width: await page.evaluate(`${elementPath}.getBoundingClientRect().width`),
      height: await page.evaluate(`${elementPath}.getBoundingClientRect().height`)
    }
    global.assert.strictEqual(JSON.stringify(actual), JSON.stringify(expected))
  })

  it('should have the correct aspect ratio', async () => {
    const expected = await page.evaluate(`window.innerWidth`) /
      await page.evaluate(`window.innerHeight`)
    const actual = await page.evaluate(`${elementPath}.getBoundingClientRect().width`) /
      await page.evaluate(`${elementPath}.getBoundingClientRect().height`)
    global.assert.strictEqual(actual, expected)
  })

  describe('isVoxel()', () => {
    it('should return a boolean', async () => {
      const expectedType = 'boolean'
      const actualType = await page.evaluate(`${elementPath}.isVoxel({ name: 'Sky: 12' })`)
      global.assert.typeOf(actualType, expectedType)
    })

    it('should return true if the object name starts with Voxel', async () => {
      const expected = true
      const actual = await page.evaluate(`${elementPath}.isVoxel({ name: 'Voxel: 10' })`)
      global.assert.strictEqual(actual, expected)
    })

    it('should return false if the object name does not start with Voxel', async () => {
      const expected = false
      const actual = await page.evaluate(`${elementPath}.isVoxel({ name: 'Grid: 4' })`)
      global.assert.strictEqual(actual, expected)
    })
  })

  after(async () => {
    await page.close()
  })
})
