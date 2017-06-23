const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('../utils/message')

describe('Generate Message', () => {
    it('Should generate correct message object', () => {
        const message = generateMessage('Jim', "Ayy lmao");
        expect(message).toBeAn('object');
        expect(message.from).toEqual('Jim')
        expect(message.text).toEqual('Ayy lmao')
        expect(message.createdAt).toBeA('number')
    })
})
describe('Generate location message', () => {
    it('Should generate location object', () => {
        const message = generateLocationMessage('Tony', 10, 10);
        expect(message).toBeAn('object');
        expect(message.from).toEqual('Tony');
        expect(message.url).toEqual(`https://www.google.com/maps?q=10,10`)
    })
})