"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAudioUrls = exports.getAudioUrl = void 0;
const assertInputTypes_1 = __importDefault(require("./assertInputTypes"));
const splitLongText_1 = __importDefault(require("./splitLongText"));
const url_1 = __importDefault(require("url"));
const getAudioUrl = (text, { lang = 'en', slow = false, host = 'https://translate.google.com' } = {}) => {
    (0, assertInputTypes_1.default)(text, lang, slow, host);
    if (text.length > 200) {
        throw new RangeError(`text length (${text.length}) should be less than 200 characters. Try "getAllAudioUrls(text, [option])" for long text.`);
    }
    return (host +
        '/translate_tts' +
        url_1.default.format({
            query: {
                ie: 'UTF-8',
                q: text,
                tl: lang,
                total: 1,
                idx: 0,
                textlen: text.length,
                client: 'tw-ob',
                prev: 'input',
                ttsspeed: slow ? 0.24 : 1,
            },
        }));
};
exports.getAudioUrl = getAudioUrl;
const getAllAudioUrls = (text, { lang = 'en', slow = false, host = 'https://translate.google.com', splitPunct = '', } = {}) => {
    (0, assertInputTypes_1.default)(text, lang, slow, host);
    if (typeof splitPunct !== 'string') {
        throw new TypeError('splitPunct should be a string');
    }
    return (0, splitLongText_1.default)(text, { splitPunct }).map((shortText) => ({
        shortText,
        url: (0, exports.getAudioUrl)(shortText, { lang, slow, host }),
    }));
};
exports.getAllAudioUrls = getAllAudioUrls;
