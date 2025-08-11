const mockUtils = {
  build: {
    failPlugin: jest.fn(),
    failBuild: jest.fn(),
  },
  status: {
    show: jest.fn(),
  },
  cache: {
    save: jest.fn(),
    restore: jest.fn(),
  },
};

export default mockUtils;
