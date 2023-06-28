const lighthouse = (mockResult) =>
  jest.unstable_mockModule('lighthouse', () => {
    return {
      default: () => Promise.resolve(mockResult),
    };
  });

export default lighthouse;
