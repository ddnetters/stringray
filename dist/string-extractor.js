"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringExtractor = void 0;
class StringExtractor {
    extractStrings(files) {
        const results = [];
        for (const file of files) {
            const matches = this.extractFromFile(file.path, file.content);
            results.push(...matches);
        }
        return results;
    }
    extractFromFile(filePath, content) {
        const matches = [];
        const lines = content.split('\n');
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const lineNumber = lineIndex + 1;
            if (this.isMarkdownFile(filePath)) {
                matches.push(...this.extractMarkdownContent(filePath, line, lineNumber));
            }
            matches.push(...this.extractStringLiterals(filePath, line, lineNumber));
        }
        return matches;
    }
    isMarkdownFile(filePath) {
        return /\.(md|mdx)$/i.test(filePath) || /README/i.test(filePath);
    }
    extractMarkdownContent(filePath, line, lineNumber) {
        const matches = [];
        if (line.trim() && !line.startsWith('#') && !line.startsWith('```')) {
            matches.push({
                file: filePath,
                line: lineNumber,
                start: 0,
                end: line.length,
                content: line.trim()
            });
        }
        return matches;
    }
    extractStringLiterals(filePath, line, lineNumber) {
        const matches = [];
        const patterns = [
            { regex: /"([^"\\]|\\.)*"/g, type: 'double' },
            { regex: /'([^'\\]|\\.)*'/g, type: 'single' },
            { regex: /`([^`\\]|\\.)*`/g, type: 'backtick' }
        ];
        for (const pattern of patterns) {
            let match;
            while ((match = pattern.regex.exec(line)) !== null) {
                const content = match[0].slice(1, -1);
                if (content.length > 0) {
                    matches.push({
                        file: filePath,
                        line: lineNumber,
                        start: match.index,
                        end: match.index + match[0].length,
                        content: content
                    });
                }
            }
        }
        return matches;
    }
}
exports.StringExtractor = StringExtractor;
//# sourceMappingURL=string-extractor.js.map