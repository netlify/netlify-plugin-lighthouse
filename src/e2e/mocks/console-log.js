const consoleLog = () => jest.spyOn(console, 'log').mockImplementation();

export default consoleLog;
