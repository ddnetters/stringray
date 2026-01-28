import { StringExtractor } from './string-extractor';
import { CheckerFactory, isAsyncChecker, Checker } from './checkers';
import { DeciderFactory } from './deciders';
import { ValidatorInput, ValidatorOutput, ValidationResult } from './types';

const ASYNC_BATCH_SIZE = 10;

export function validateCodebaseStrings(input: ValidatorInput): ValidatorOutput {
  const extractor = new StringExtractor();
  const checker = CheckerFactory.createChecker(input.checker);
  const decider = DeciderFactory.createDecider(input.decider);

  if (isAsyncChecker(checker)) {
    throw new Error(
      `Checker "${input.checker}" is async. Use validateCodebaseStringsAsync() instead.`
    );
  }

  const syncChecker = checker as Checker;
  const stringMatches = extractor.extractStrings(input.files);

  const results: ValidationResult[] = stringMatches.map(match => {
    const checkResult = syncChecker.check(match.content, input.checkerOptions);

    return {
      file: match.file,
      line: match.line,
      start: match.start,
      end: match.end,
      content: match.content,
      valid: checkResult.valid,
      message: checkResult.message,
      details: checkResult.details,
      confidence: checkResult.confidence,
    };
  });

  const summary = decider.decide(results, input.deciderOptions);

  return {
    results,
    summary
  };
}

export async function validateCodebaseStringsAsync(
  input: ValidatorInput
): Promise<ValidatorOutput> {
  const extractor = new StringExtractor();
  const checker = CheckerFactory.createChecker(input.checker);
  const decider = DeciderFactory.createDecider(input.decider);

  const stringMatches = extractor.extractStrings(input.files);

  let results: ValidationResult[];

  if (isAsyncChecker(checker)) {
    // Process async checker in batches to avoid API overload
    results = [];
    for (let i = 0; i < stringMatches.length; i += ASYNC_BATCH_SIZE) {
      const batch = stringMatches.slice(i, i + ASYNC_BATCH_SIZE);
      const batchSettled = await Promise.allSettled(
        batch.map(async (match) => {
          const checkResult = await checker.check(match.content, input.checkerOptions);
          return {
            file: match.file,
            line: match.line,
            start: match.start,
            end: match.end,
            content: match.content,
            valid: checkResult.valid,
            message: checkResult.message,
            details: checkResult.details,
            confidence: checkResult.confidence,
          };
        })
      );
      const batchResults = batchSettled.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        }
        const match = batch[index];
        return {
          file: match.file,
          line: match.line,
          start: match.start,
          end: match.end,
          content: match.content,
          valid: false,
          message: `Check failed: ${result.reason instanceof Error ? result.reason.message : 'unknown error'}`,
        };
      });
      results.push(...batchResults);
    }
  } else {
    // Sync checker - process normally
    results = stringMatches.map((match) => {
      const checkResult = checker.check(match.content, input.checkerOptions);
      return {
        file: match.file,
        line: match.line,
        start: match.start,
        end: match.end,
        content: match.content,
        valid: checkResult.valid,
        message: checkResult.message,
        details: checkResult.details,
        confidence: checkResult.confidence,
      };
    });
  }

  const summary = decider.decide(results, input.deciderOptions);

  return {
    results,
    summary,
  };
}