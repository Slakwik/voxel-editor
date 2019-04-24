describe('my-palette', () => {
  let page
  let elementPath = `document.querySelector('body > my-app').shadowRoot.querySelector('my-palette')`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  describe('createColorArray()', () => {
    it('returns "hsl(10, 10%, 10%)" for the params (10, 10, 10)', async () => {
      const expected = 'hsl(10, 10%, 10%)'
      const actual = await page.evaluate(`${elementPath}.createHSLColor(10, 10, 10)`)
      global.assert.strictEqual(actual, expected)
    })
  })

  after(async () => {
    await page.close()
  })
})
