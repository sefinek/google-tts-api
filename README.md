# 📢 Google TTS API
Google TTS (Text-To-Speech) for [Node.js](https://nodejs.org) without any vulnerabilities. For free without any API keys!

![@sefinek/google-tts-api.png](https://img.shields.io/npm/dt/@sefinek/google-tts-api?maxAge=3600)
![@sefinek/google-tts-api.png](https://img.shields.io/github/last-commit/sefinek24/google-tts-api)
![@sefinek/google-tts-api.png](https://img.shields.io/github/languages/code-size/sefinek24/google-tts-api)


## 📥 Installation
```bash
$ npm install --save google-tts-api
$ npm install -D typescript @types/node # Only for TypeScript
```


## 🤔 Usage
| Method              | Options (all optional)                          | Return Type                                         | Handle Long Text |
|---------------------|-------------------------------------------------|-----------------------------------------------------|:----------------:|
| `getAudioUrl`       | `lang`, `slow`, `host`                          | `string`                                            |                  |
| `getAudioBase64`    | `lang`, `slow`, `host`, `timeout`               | `Promise<string>`                                   |                  |
| `getAllAudioUrls`   | `lang`, `slow`, `host`, `splitPunct`            | `{ shortText: string; url: string; }[]`             |        ✅         |
| `getAllAudioBase64` | `lang`, `slow`, `host`, `timeout`, `splitPunct` | `Promise<{ shortText: string; base64: string; }[]>` |        ✅         |

### Options (all optional)
| Option       | Type      | Default                      | Description                                                                                                                 |
|--------------|-----------|------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| `lang`       | `string`  | en                           | See all available language code at https://cloud.google.com/speech/docs/languages                                           |
| `slow`       | `boolean` | false                        | Use the slow audio speed if set `slow` to `true`                                                                            |
| `host`       | `string`  | https://translate.google.com | You can change the `host` if the default host could not work in your region (e.g. https://translate.google.com.cn).         |
| `timeout`    | `number`  | 10000 (ms)                   | (Only for `getAudioBase64` and `getAllAudioBase64`) Set timeout for the HTTP request.                                       |
| `splitPunct` | `string`  |                              | (Only for `getAllAudioUrls` and `getAllAudioBase64`) Set the punctuation to split the long text to short text. (e.g. "，、。") |


## 💻 Examples
### 1. `getAudioUrl(text, [option])`
```js
import * as googleTTS from '@sefinek/google-tts-api'; // ES6 or TypeScript
const googleTTS = require('@sefinek/google-tts-api'); // CommonJS

// Get audio URL
const url = googleTTS.getAudioUrl('Hello world!', {
  lang: 'en',
  slow: false,
  host: 'https://translate.google.com',
});
console.log(url); // https://translate.google.com/translate_tts?...
```

### 2. `getAudioBase64(text, [option])`
```js
import * as googleTTS from '@sefinek/google-tts-api'; // ES6 or TypeScript
const googleTTS = require('@sefinek/google-tts-api'); // CommonJS

// Get base64 text
googleTTS
  .getAudioBase64('Hello world!', {
    lang: 'en',
    slow: false,
    host: 'https://translate.google.com',
    timeout: 10000,
  })
  .then(console.log) // base64 text
  .catch(console.error);
```

### 3. `getAllAudioUrls(text, [option])` (For text longer than 200 characters)
```js
import * as googleTTS from '@sefinek/google-tts-api'; // ES6 or TypeScript
const googleTTS = require('@sefinek/google-tts-api'); // CommonJS

const results = googleTTS.getAllAudioUrls('LONG_TEXT_...', {
  lang: 'en',
  slow: false,
  host: 'https://translate.google.com',
  splitPunct: ',.?',
});
console.log(results);
// [
//   { shortText: '...', url: '...' },
//   { shortText: '...', url: '...' },
//   ...
// ];
```

### 4. `getAllAudioBase64(text, [option])` (For text longer than 200 characters)
```js
import * as googleTTS from '@sefinek/google-tts-api'; // ES6 or TypeScript
const googleTTS = require('@sefinek/google-tts-api'); // CommonJS

googleTTS
  .getAllAudioBase64('LONG_TEXT_...', {
    lang: 'en',
    slow: false,
    host: 'https://translate.google.com',
    timeout: 10000,
    splitPunct: ',.?',
  })
  .then(console.log)
  // [
  //   { shortText: '...', base64: '...' },
  //   { shortText: '...', base64: '...' },
  //   ...
  // ];
  .catch(console.error);
```

#### [More examples](https://github.com/sefinek24/google-tts-api/tree/master/example)


## 📑 License
MIT