describe('my-color-button', () => {
  let page
  let elementPath = `document.querySelector("body > my-app").shadowRoot.querySelector("my-sidebar").shadowRoot.querySelector("my-palette").shadowRoot.querySelector("my-color-button")`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  it('should be added to the dom', async () => {
    const element = await page.evaluate(`${elementPath}`)
    global.assert.isOk(element)
  })

  it('should have the correct color', async () => {
    const expected = await page.evaluate(`${elementPath}.color`)
    const actual = await page.evaluate(`${elementPath}.shadowRoot.querySelector('style').textContent.split(' ').slice(3,6).join(' ').slice(0, 16)`)
    global.assert.strictEqual(actual, expected)
  })

  after(async () => {
    await page.close()
  })
})
