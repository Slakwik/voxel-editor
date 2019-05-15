describe('my-settings', () => {
  let page
  let elementPath = `document.querySelector("body > my-app").shadowRoot.querySelector("my-settings")`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  it('should not be added to the dom', async () => {
    const element = await page.evaluate(`${elementPath}`)
    global.assert.isNotOk(element)
  })

  after(async () => {
    await page.close()
  })
})
