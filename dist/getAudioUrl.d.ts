interface Option {
    lang?: string;
    slow?: boolean;
    host?: string;
}
export declare const getAudioUrl: (text: string, { lang, slow, host }?: Option) => string;
interface LongTextOption extends Option {
    splitPunct?: string;
}
export declare const getAllAudioUrls: (text: string, { lang, slow, host, splitPunct, }?: LongTextOption) => {
    shortText: string;
    url: string;
}[];
export {};
//# sourceMappingURL=getAudioUrl.d.ts.map