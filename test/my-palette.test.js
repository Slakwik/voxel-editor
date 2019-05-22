describe('my-palette', () => {
  let page
  let elementPath = `document.querySelector("body > my-app").shadowRoot.querySelector("my-sidebar").shadowRoot.querySelector("my-palette")`

  before(async () => {
    page = await global.browser.newPage()
    await page.goto('http://localhost:8081')
  })

  it('should be added to the dom', async () => {
    const element = await page.evaluate(`${elementPath}`)
    global.assert.isOk(element)
  })

  describe('createHSLColor()', () => {
    it('should return a string', async () => {
      const expectedType = 'string'
      const actualType = await page.evaluate(`${elementPath}.createHSLColor(10, 10, 10)`)
      global.assert.typeOf(actualType, expectedType)
    })

    it('should return a valid color', async () => {
      const createdColor = await page.evaluate(`${elementPath}.createHSLColor(100, 10, 10)`)
      await page.evaluate(`document.body.style.backgroundColor = "${createdColor}"`)
      const evaluatedColor = await page.evaluate(`document.body.style.backgroundColor`)
      global.assert.strictEqual(evaluatedColor, 'rgb(25, 28, 23)')
    })

    it('should return "hsl(10, 10%, 10%)" for the parameters (10, 10, 10)', async () => {
      const expected = 'hsl(10, 10%, 10%)'
      const actual = await page.evaluate(`${elementPath}.createHSLColor(10, 10, 10)`)
      global.assert.strictEqual(actual, expected)
    })
  })

  describe('createColorArray()', () => {
    it('should return an array', async () => {
      const expectedType = 'array'
      const actualType = await page.evaluate(`${elementPath}.createColorArray(10, 10, 10)`)
      global.assert.typeOf(actualType, expectedType)
    })

    it('should return 36 colors when hueStepLength is set to 10', async () => {
      const expectedLength = 36
      const result = await page.evaluate(`${elementPath}.createColorArray(10, 0, 0)`)
      global.assert.lengthOf(result, expectedLength)
    })

    it('should return unique colors', async () => {
      const colorArray = await page.evaluate(`${elementPath}.createColorArray(10, 10, 10)`)
      const colorSet = new Set(colorArray)
      global.assert.strictEqual(colorArray.length, colorSet.size)
    })
  })

  describe('decreaseSaturation()', () => {
    it('should decrease the saturation property by 10', async () => {
      const expected = await page.evaluate(`${elementPath}.saturation`) - 10
      await page.evaluate(`${elementPath}.decreaseSaturation()`)
      const actual = await page.evaluate(`${elementPath}.saturation`)
      global.assert.strictEqual(actual, expected)
    })

    it('should not decrease the saturation property past 0', async () => {
      await page.evaluate(`${elementPath}.saturation = 0`)
      const expected = await page.evaluate(`${elementPath}.saturation`)
      await page.evaluate(`${elementPath}.decreaseSaturation()`)
      const actual = await page.evaluate(`${elementPath}.saturation`)
      global.assert.strictEqual(actual, expected)
    })
  })

  describe('increaseSaturation()', () => {
    it('should increase the saturation property by 10', async () => {
      const expected = await page.evaluate(`${elementPath}.saturation`) + 10
      await page.evaluate(`${elementPath}.increaseSaturation()`)
      const actual = await page.evaluate(`${elementPath}.saturation`)
      global.assert.strictEqual(actual, expected)
    })

    it('should not increase the saturation property past 100', async () => {
      await page.evaluate(`${elementPath}.saturation = 100`)
      const expected = await page.evaluate(`${elementPath}.saturation`)
      await page.evaluate(`${elementPath}.increaseSaturation()`)
      const actual = await page.evaluate(`${elementPath}.saturation`)
      global.assert.strictEqual(actual, expected)
    })
  })

  describe('decreaseLightness()', () => {
    it('should decrease the lightness property by 10', async () => {
      const expected = await page.evaluate(`${elementPath}.lightness`) - 10
      await page.evaluate(`${elementPath}.decreaseLightness()`)
      const actual = await page.evaluate(`${elementPath}.lightness`)
      global.assert.strictEqual(actual, expected)
    })

    it('should not decrease the lightness property past 0', async () => {
      await page.evaluate(`${elementPath}.lightness = 0`)
      const expected = await page.evaluate(`${elementPath}.lightness`)
      await page.evaluate(`${elementPath}.decreaseLightness()`)
      const actual = await page.evaluate(`${elementPath}.lightness`)
      global.assert.strictEqual(actual, expected)
    })
  })

  describe('increaseLightness()', () => {
    it('should increase the lightness property by 10', async () => {
      const expected = await page.evaluate(`${elementPath}.lightness`) + 10
      await page.evaluate(`${elementPath}.increaseLightness()`)
      const actual = await page.evaluate(`${elementPath}.lightness`)
      global.assert.strictEqual(actual, expected)
    })

    it('should not increase the lightness property past 100', async () => {
      await page.evaluate(`${elementPath}.lightness = 100`)
      const expected = await page.evaluate(`${elementPath}.lightness`)
      await page.evaluate(`${elementPath}.increaseLightness()`)
      const actual = await page.evaluate(`${elementPath}.lightness`)
      global.assert.strictEqual(actual, expected)
    })
  })

  describe('updatePalette()', () => {
    it('should update the colors in the palette', async () => {
      const old = await page.evaluate(`${elementPath}.colors`)
      await page.evaluate(`${elementPath}.saturation = 50`)
      await page.evaluate(`${elementPath}.lightness = 50`)
      await page.evaluate(`${elementPath}.updatePalette()`)
      const updated = await page.evaluate(`${elementPath}.colors`)
      global.assert.notEqual(old, updated)
    })
  })

  after(async () => {
    await page.close()
  })
})
