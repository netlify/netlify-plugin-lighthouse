import formatMockLog from './format-mock-log.js';

describe('formatMockLog', () => {
  it('should return an array of strings', () => {
    const log = [['one'], ['two'], ['three']];
    const result = formatMockLog(log);
    expect(result).toEqual(['one', 'two', 'three']);
  });

  it('should strip ANSI characters', () => {
    const log = [
      ['\u001b[31mone\u001b[39m'],
      ['\u001b[32mtwo\u001b[39m'],
      ['\u001b[33mthree\u001b[39m'],
    ];
    const result = formatMockLog(log);
    expect(result).toEqual(['one', 'two', 'three']);
  });
});
