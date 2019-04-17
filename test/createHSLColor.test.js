import createHSLColor from './createHSLColor.js'

describe('createColorArray()', () => {
  it('returns "hsl(10, 10%, 10%)" for the params (10, 10, 10)', () => {
    const expected = 'hsl(10, 10%, 10%)'
    const actual = createHSLColor(10, 10, 10)
    chai.assert.equal(expected, actual) // eslint-disable-line
  })
})
