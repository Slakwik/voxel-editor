describe('index', () => {
  let page

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  it('should have the correct page title', async () => {
    global.assert.strictEqual(await page.title(), 'Voxel Editor')
  })

  after(async () => {
    await page.close()
  })
})
