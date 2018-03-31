'use strict';

// node_modules
const expect = require('expect');

// local variables
const {generateMessage} = require('./message');

describe('GENERATE message', () => {
    it('should generate the correct message object', () => {
        let from = 'Joyce';
        let text = 'The message from Joyce';
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
    });
});