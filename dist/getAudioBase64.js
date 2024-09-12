"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAudioBase64 = exports.getAudioBase64 = void 0;
const assertInputTypes_1 = __importDefault(require("./assertInputTypes"));
const axios_1 = __importDefault(require("axios"));
const splitLongText_1 = __importDefault(require("./splitLongText"));
const getAudioBase64 = (text_1, ...args_1) => __awaiter(void 0, [text_1, ...args_1], void 0, function* (text, { lang = 'en', slow = false, host = 'https://translate.google.com', timeout = 10000 } = {}) {
    (0, assertInputTypes_1.default)(text, lang, slow, host);
    if (typeof timeout !== 'number' || timeout <= 0) {
        throw new TypeError('timeout should be a positive number');
    }
    if (text.length > 200) {
        throw new RangeError(`text length (${text.length}) should be less than 200 characters. Try "getAllAudioBase64(text, [option])" for long text.`);
    }
    const res = yield (0, axios_1.default)({
        method: 'post',
        baseURL: host,
        url: '/_/TranslateWebserverUi/data/batchexecute',
        timeout,
        data: 'f.req=' +
            encodeURIComponent(JSON.stringify([
                [['jQ1olc', JSON.stringify([text, lang, slow ? true : null, 'null']), null, 'generic']],
            ])),
    });
    let result;
    try {
        result = eval(res.data.slice(5))[0][2];
    }
    catch (e) {
        throw new Error(`parse response failed:\n${res.data}`);
    }
    if (!result) {
        throw new Error(`lang "${lang}" might not exist`);
    }
    try {
        result = eval(result)[0];
    }
    catch (e) {
        throw new Error(`parse response failed:\n${res.data}`);
    }
    return result;
});
exports.getAudioBase64 = getAudioBase64;
const getAllAudioBase64 = (text_1, ...args_1) => __awaiter(void 0, [text_1, ...args_1], void 0, function* (text, { lang = 'en', slow = false, host = 'https://translate.google.com', splitPunct = '', timeout = 10000, } = {}) {
    (0, assertInputTypes_1.default)(text, lang, slow, host);
    if (typeof splitPunct !== 'string') {
        throw new TypeError('splitPunct should be a string');
    }
    if (typeof timeout !== 'number' || timeout <= 0) {
        throw new TypeError('timeout should be a positive number');
    }
    const shortTextList = (0, splitLongText_1.default)(text, { splitPunct });
    const base64List = yield Promise.all(shortTextList.map((shortText) => (0, exports.getAudioBase64)(shortText, { lang, slow, host, timeout })));
    const result = [];
    for (let i = 0; i < shortTextList.length; i++) {
        const shortText = shortTextList[i];
        const base64 = base64List[i];
        result.push({ shortText, base64 });
    }
    return result;
});
exports.getAllAudioBase64 = getAllAudioBase64;
