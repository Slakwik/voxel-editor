describe('my-app', () => {
  let page
  let elementPath = `document.querySelector('body > my-app')`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  it('is added to the dom', async () => {
    const element = await page.evaluate(`${elementPath}`)
    global.assert.isOk(element)
  })

  it('covers the whole page width', async () => {
    const expected = await page.viewport().width
    const actual = await page.evaluate(`${elementPath}.getBoundingClientRect().width`)
    global.assert.strictEqual(actual, expected)
  })

  it('covers the whole page height', async () => {
    const expected = await page.viewport().height
    const actual = await page.evaluate(`${elementPath}.getBoundingClientRect().height`)
    global.assert.strictEqual(actual, expected)
  })

  it('starts with build mode selected', async () => {
    const expected = 'build-mode'
    const actual = await page.evaluate(`${elementPath}.mode`)
    global.assert.strictEqual(actual, expected)
  })

  it('starts with the color yellow selected', async () => {
    const expected = 'hsl(60, 90%, 60%)'
    const actual = await page.evaluate(`${elementPath}.color`)
    global.assert.strictEqual(actual, expected)
  })

  after(async () => {
    await page.close()
  })
})
