jest.unstable_mockModule('chalk', () => {
  return {
    default: {
      magenta: (m) => m,
    },
  };
});

const mockedExpress = () => ({
  use: jest.fn(),
  listen: jest.fn(),
});
const mockStatic = jest.fn();
Object.defineProperty(mockedExpress, 'static', { value: mockStatic });

jest.unstable_mockModule('express', () => {
  return {
    default: mockedExpress,
  };
});
const getServer = (await import('./index.js')).default;

describe('getServer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a mock server if audit URL is defined', () => {
    const mockListen = jest.fn();
    console.log = jest.fn();

    const { server } = getServer({ auditUrl: '/' });
    expect(server.listen).toBeDefined();
    server.listen(mockListen);
    expect(mockListen).toHaveBeenCalled();
    expect(console.log.mock.calls[0][0]).toEqual('Scanning url /');

    expect(server.close).toBeDefined();
    expect(server.close()).toBeUndefined();
    expect(server.url).toEqual('/');
  });

  it('throws an error if no audit URL and no serveDir', () => {
    expect(() => getServer({})).toThrow('Empty publish dir');
  });

  it('returns an express server if no audit URL and a serveDir', () => {
    const { server } = getServer({ serveDir: 'dir' });
    expect(mockStatic).toHaveBeenCalled();

    // Check we log when we start serving directory
    server.listen(jest.fn());
    expect(console.log.mock.calls[0][0]).toEqual(
      'Serving and scanning site from directory dir',
    );

    expect(server.url).toEqual('http://localhost:5100');

    // Check close method closes the given instance
    const close = jest.fn();
    server.close({ close });
    expect(close).toHaveBeenCalled();
  });
});
