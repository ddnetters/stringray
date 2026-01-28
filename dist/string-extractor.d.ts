import { StringMatch } from './types';
export declare class StringExtractor {
    extractStrings(files: {
        path: string;
        content: string;
    }[]): StringMatch[];
    private extractFromFile;
    private isMarkdownFile;
    private extractMarkdownContent;
    private extractStringLiterals;
}
//# sourceMappingURL=string-extractor.d.ts.map