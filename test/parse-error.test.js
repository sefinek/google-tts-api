const { describe, it, mock } = require('node:test');
const assert = require('node:assert/strict');

const axios = mock.fn();
axios.default = axios;
const axiosPath = require.resolve('axios');
require.cache[axiosPath] = { id: axiosPath, filename: axiosPath, loaded: true, exports: axios };

const googleTTS = require('../dist/index');

const resolveWith = value => axios.mock.mockImplementation(async () => value);
const rejectWith = err => axios.mock.mockImplementation(async () => {
	throw err;
});

describe('parse base64 text', () => {
	it('HTTP request failed', async () => {
		rejectWith(new Error('Network Error'));

		await assert.rejects(() => googleTTS.getAudioBase64('test'), /Network Error/);
	});

	it('parse failed (Part 1)', async () => {
		resolveWith({ data: 'UNEXPECT RETURN VALUE' });

		await assert.rejects(() => googleTTS.getAudioBase64('test'), /parse response failed/);
	});

	it('parse failed (Part 2)', async () => {
		const data = `)]}'

[["wrb.fr","jQ1olc","UNEXPECT VALUE",null,null,null,"generic"]
,["di",27]
,["af.httprm",27,"3172555329265361983",8]
]`;
		resolveWith({ data });

		await assert.rejects(() => googleTTS.getAudioBase64('test'), /parse response failed/);
	});

	it('language does not exist', async () => {
		const data = `)]}'

[["wrb.fr","jQ1olc",null,null,null,null,"generic"]
,["di",27]
,["af.httprm",27,"3172555329265361983",8]
]`;
		resolveWith({ data });

		await assert.rejects(() => googleTTS.getAudioBase64('test', { lang: 'CAT-LANG' }), /lang "CAT-LANG" might not exist/);
	});
});
