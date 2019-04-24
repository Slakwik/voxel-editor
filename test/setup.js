const puppeteer = require('puppeteer')
const chai = require('chai')

const options = {
  timeout: 20000,
  headless: false,
  slowMo: 200,
  defaultViewport: {
    width: 1920,
    height: 1080
  }
}

before(async () => {
  global.browser = await puppeteer.launch(options)
  global.assert = chai.assert
})

after(async () => {
  await global.browser.close()
  global.browser = puppeteer.browser
  global.assert = chai.assert
})
