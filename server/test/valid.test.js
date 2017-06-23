const expect = require('expect');
const {isReal} = require('../utils/valid')

describe('String Validation', () => {
    it('Should reject non string', () => {
        expect(isReal(2)).toBe(false)
    })
    it('Should reject a bunch of spaces', () => {
        expect(isReal('     ')).toBe(false)
    })
    it('Should approve a real string', () => {
        expect(isReal('JS for lyfe')).toBe(true)
    })
})
