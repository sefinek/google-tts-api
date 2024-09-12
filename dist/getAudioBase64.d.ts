interface Option {
    lang?: string;
    slow?: boolean;
    host?: string;
    timeout?: number;
}
export declare const getAudioBase64: (text: string, { lang, slow, host, timeout }?: Option) => Promise<string>;
interface LongTextOption extends Option {
    splitPunct?: string;
}
export declare const getAllAudioBase64: (text: string, { lang, slow, host, splitPunct, timeout, }?: LongTextOption) => Promise<{
    shortText: string;
    base64: string;
}[]>;
export {};
//# sourceMappingURL=getAudioBase64.d.ts.map