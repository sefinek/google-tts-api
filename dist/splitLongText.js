"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SPACE_REGEX = '\\s\\uFEFF\\xA0';
const DEFAULT_PUNCTUATION_REGEX = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
const splitLongText = (text, { maxLength = 200, splitPunct = '' } = {}) => {
    const isSpaceOrPunct = (s, i) => {
        const regex = new RegExp('[' + SPACE_REGEX + DEFAULT_PUNCTUATION_REGEX + splitPunct + ']');
        return regex.test(s.charAt(i));
    };
    const lastIndexOfSpaceOrPunct = (s, left, right) => {
        for (let i = right; i >= left; i--) {
            if (isSpaceOrPunct(s, i))
                return i;
        }
        return -1;
    };
    const result = [];
    const addResult = (text, start, end) => {
        result.push(text.slice(start, end + 1));
    };
    let start = 0;
    for (;;) {
        if (text.length - start <= maxLength) {
            addResult(text, start, text.length - 1);
            break;
        }
        let end = start + maxLength - 1;
        if (isSpaceOrPunct(text, end) || isSpaceOrPunct(text, end + 1)) {
            addResult(text, start, end);
            start = end + 1;
            continue;
        }
        end = lastIndexOfSpaceOrPunct(text, start, end);
        if (end === -1) {
            const str = text.slice(start, start + maxLength);
            throw new Error('The word is too long to split into a short text:' +
                `\n${str} ...` +
                '\n\nTry the option "splitPunct" to split the text by punctuation.');
        }
        addResult(text, start, end);
        start = end + 1;
    }
    return result;
};
exports.default = splitLongText;
