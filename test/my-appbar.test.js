describe('my-appbar', () => {
  let page
  let elementPath = `document.querySelector('body > my-app').shadowRoot.querySelector('my-appbar')`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  it('is added to the dom', async () => {
    const element = await page.evaluate(`${elementPath}`)
    global.assert.isOk(element)
  })

  it('contains a correct title header', async () => {
    const headerContent = await page.evaluate(`${elementPath}.shadowRoot.querySelector('h2').textContent`)
    global.assert.strictEqual(headerContent, 'Voxel Editor')
  })

  after(async () => {
    await page.close()
  })
})
