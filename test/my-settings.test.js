describe('my-settings', () => {
  let page
  let elementPath = `document.querySelector("body > my-app").shadowRoot.querySelector("my-settings")`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  it('should not be added to the dom at startup', async () => {
    const element = await page.evaluate(`${elementPath}`)
    global.assert.isNotOk(element)
  })

  it('should be added when the settings button is clicked', async () => {
    await page.evaluate('document.querySelector("body > my-app").shadowRoot.querySelector("my-appbar").shadowRoot.querySelector("my-dropdown:nth-child(3)").shadowRoot.querySelector("button").click()')
    await page.evaluate('document.querySelector("body > my-app").shadowRoot.querySelector("my-appbar").shadowRoot.querySelector("my-dropdown:nth-child(3)").shadowRoot.querySelector("div > button").click()')
    const settingsWindow = await page.evaluate('document.querySelector("body > my-app").shadowRoot.querySelector("my-settings")')
    global.assert.isOk(settingsWindow)
  })

  it('should load the current user settings', async () => {
    const actual = await page.evaluate(`${elementPath}.settings`)
    const expected = { antiAliasing: true, pbrMaterials: true, skyBackground: true }
    global.assert.strictEqual(JSON.stringify(actual), JSON.stringify(expected))
  })

  it('should save settings after change a was made', async () => {
    await page.evaluate('document.querySelector("body > my-app").shadowRoot.querySelector("my-appbar").shadowRoot.querySelector("my-dropdown:nth-child(3)").shadowRoot.querySelector("button").click()')
    await page.evaluate('document.querySelector("body > my-app").shadowRoot.querySelector("my-appbar").shadowRoot.querySelector("my-dropdown:nth-child(3)").shadowRoot.querySelector("div > button").click()')
    await page.evaluate('document.querySelector("body > my-app").shadowRoot.querySelector("my-settings").shadowRoot.querySelector("div > input[type=checkbox]").click()')
    const expected = '{"antiAliasing":false,"pbrMaterials":true,"skyBackground":true}'
    const actual = await page.evaluate(`window.localStorage.getItem('settings')`)
    global.assert.strictEqual(actual, expected)
  })

  after(async () => {
    await page.close()
  })
})
