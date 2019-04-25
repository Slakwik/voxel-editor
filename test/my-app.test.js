describe('my-app', () => {
  let page
  let elementPath = `document.querySelector('body > my-app')`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  it('should be added to the dom', async () => {
    const element = await page.evaluate(`${elementPath}`)
    global.assert.isOk(element)
  })

  it('should cover the whole page width', async () => {
    const expected = await page.viewport().width
    const actual = await page.evaluate(`${elementPath}.getBoundingClientRect().width`)
    global.assert.strictEqual(actual, expected)
  })

  it('should cover the whole page height', async () => {
    const expected = await page.viewport().height
    const actual = await page.evaluate(`${elementPath}.getBoundingClientRect().height`)
    global.assert.strictEqual(actual, expected)
  })

  it('should start with build mode selected', async () => {
    const expected = 'build-mode'
    const actual = await page.evaluate(`${elementPath}.mode`)
    global.assert.strictEqual(actual, expected)
  })

  it('should start with the color yellow selected', async () => {
    const expected = 'hsl(60, 90%, 60%)'
    const actual = await page.evaluate(`${elementPath}.color`)
    global.assert.strictEqual(actual, expected)
  })

  after(async () => {
    await page.close()
  })
})
