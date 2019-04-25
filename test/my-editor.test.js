describe('my-editor', () => {
  let page
  let elementPath = `document.querySelector('body > my-app').shadowRoot.querySelector('my-editor')`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  // This test doesn't fail if my-editor constructor is commented out. Why?
  // Is it the editor updates that cause evaluate to fail?
  it('should be added to the dom', async () => {
    const element = await page.evaluate(`${elementPath}`)
    global.assert.isOk(element)
  })

  describe('isCube()', () => {
    it('should return a boolean', async () => {
      const expectedType = 'boolean'
      const actualType = await page.evaluate(`${elementPath}.isCube({ name: 'Sky: 12' })`)
      global.assert.typeOf(actualType, expectedType)
    })

    it('should return true if the object name starts with Cube', async () => {
      const expected = true
      const actual = await page.evaluate(`${elementPath}.isCube({ name: 'Cube: 10' })`)
      global.assert.strictEqual(actual, expected)
    })

    it('should return false if the object name does not start with Cube', async () => {
      const expected = false
      const actual = await page.evaluate(`${elementPath}.isCube({ name: 'Grid: 4' })`)
      global.assert.strictEqual(actual, expected)
    })
  })

  after(async () => {
    await page.close()
  })
})
