describe('my-dropdown', () => {
  let page
  let elementPath = `document.querySelector("body > my-app").shadowRoot.querySelector("my-appbar").shadowRoot.querySelector("my-dropdown")`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  it('should be added to the dom', async () => {
    const element = await page.evaluate(`${elementPath}`)
    global.assert.isOk(element)
  })

  it('should have its buttons hidden', async () => {
    const classList = await page.evaluate(`document.querySelector("body > my-app").shadowRoot.querySelector("my-appbar").shadowRoot.querySelector("my-dropdown:nth-child(2)").shadowRoot.querySelector("div").classList`)
    global.assert.isTrue(Object.values(classList).includes('hidden'))
  })

  it('should reveal its buttons when clicked', async () => {
    await page.evaluate(`${elementPath}.shadowRoot.querySelector("button").click()`)
    const classList = await page.evaluate(`document.querySelector("body > my-app").shadowRoot.querySelector("my-appbar").shadowRoot.querySelector("my-dropdown:nth-child(2)").shadowRoot.querySelector("div").classList`)
    global.assert.isNotTrue(Object.values(classList).includes('hidden'))
  })

  after(async () => {
    await page.close()
  })
})
