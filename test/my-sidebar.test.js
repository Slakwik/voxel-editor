describe('my-sidebar', () => {
  let page
  let elementPath = `document.querySelector('body > my-app').shadowRoot.querySelector('my-sidebar')`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  it('should be added to the dom', async () => {
    const element = await page.evaluate(`${elementPath}`)
    global.assert.isOk(element)
  })

  it('should contain three mode buttons', async () => {
    const expected = 3
    const actual = await page.evaluate(`${elementPath}.shadowRoot.querySelectorAll('input[type=image]').length`)
    global.assert.strictEqual(actual, expected)
  })

  after(async () => {
    await page.close()
  })
})
