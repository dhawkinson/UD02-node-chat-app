'use strict';

// node_modules
const expect = require('expect');

// local variables
const {isRealString} = require('./validation');

describe('IS REAL String', () => {

    it('should reject non-string values', () => {
        let res = isRealString(7);
        expect(res).toBeFalsy();
    });

    it('should reject strings that are spaces only', () => {
        let res = isRealString('     ');
        expect(res).toBeFalsy();
    });
    it('should allow string with non-space characters', () => {
        let res = isRealString('  x12   ');
        expect(res).toBeTruthy();
    });
});