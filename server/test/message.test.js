const expect = require('expect');
const {generateMessage} = require('../utils/message')

describe('Generate Message', () => {
    it('Should generate correct message object', () => {
        const message = generateMessage('Jim', "Ayy lmao");
        expect(message).toBeAn('object');
        expect(message.from).toEqual('Jim')
        expect(message.text).toEqual('Ayy lmao')
        expect(message.createdAt).toBeA('number')
    })
})