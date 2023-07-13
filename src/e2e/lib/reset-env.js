const resetEnv = () => {
  delete process.env.OUTPUT_PATH;
  delete process.env.PUBLISH_DIR;
  delete process.env.SETTINGS;
  delete process.env.THRESHOLDS;
  delete process.env.URL;
  delete process.env.AUDIT_URL;
  process.env.AUDITS = null;
};

export default resetEnv;
