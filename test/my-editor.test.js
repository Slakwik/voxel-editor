describe('my-editor', () => {
  let page
  let elementPath = `document.querySelector('body > my-app').shadowRoot.querySelector('my-editor')`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  it('is added to the dom', async () => {
    const element = await page.evaluate(`${elementPath}`)
    global.assert.isOk(element)
  })

  describe('isCube()', () => {
    it('returns a boolean', async () => {
      const expectedType = 'boolean'
      const actualType = await page.evaluate(`${elementPath}.isCube({ name: 'Sky: 12' })`)
      global.assert.typeOf(actualType, expectedType)
    })

    it('returns true if object name starts with Cube', async () => {
      const expected = true
      const actual = await page.evaluate(`${elementPath}.isCube({ name: 'Cube: 10' })`)
      global.assert.strictEqual(actual, expected)
    })

    it('returns false if object name doesn\'t start with Cube', async () => {
      const expected = false
      const actual = await page.evaluate(`${elementPath}.isCube({ name: 'Grid: 4' })`)
      global.assert.strictEqual(actual, expected)
    })
  })

  after(async () => {
    await page.close()
  })
})
