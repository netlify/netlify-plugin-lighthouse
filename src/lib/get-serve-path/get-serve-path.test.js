import getServePath from './index.js';

describe('getServePath', () => {
  it('returns undefined for dir thats not a string', () => {
    expect(getServePath(2)).toEqual(undefined);
  });

  it('returns undefined for subdir thats not a string', () => {
    expect(getServePath(2, 2)).toEqual(undefined);
  });

  it('returns joined path for serveDir', () => {
    expect(getServePath('example', 'path')).toEqual('example/path');
  });
});
