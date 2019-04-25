describe('my-appbar', () => {
  let page
  let elementPath = `document.querySelector('body > my-app').shadowRoot.querySelector('my-appbar')`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  it('should be added to the dom', async () => {
    const element = await page.evaluate(`${elementPath}`)
    global.assert.isOk(element)
  })

  it('should contain a header with the correct title', async () => {
    const headerContent = await page.evaluate(`${elementPath}.shadowRoot.querySelector('h2').textContent`)
    global.assert.strictEqual(headerContent, 'Voxel Editor')
  })

  after(async () => {
    await page.close()
  })
})
