const consoleError = () => jest.spyOn(console, 'error').mockImplementation();

export default consoleError;
