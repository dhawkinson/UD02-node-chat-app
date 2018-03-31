'use strict';

// node_modules
const expect = require('expect');

// local variables
const {generateMessage, generateLocationMessage} = require('./message');

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

describe('GENERATE location message', () => {
    it('should generate the correct location object', () => {
        let from = 'Home';
        let latitude = 47.7635863;
        let longitude = -122.30371749999998;
        let url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        let message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
    });
});