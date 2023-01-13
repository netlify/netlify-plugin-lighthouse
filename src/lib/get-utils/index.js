// This function checks to see if we're running within the Netlify Build system,
// and if so, we use the util functions. If not, we're likely running locally
// so fall back using console.log to emulate the output.

const getUtils = ({ utils }) => {
  // If available, fails the Netlify build with the supplied message
  // https://docs.netlify.com/integrations/build-plugins/create-plugins/#error-reporting
  const failBuild =
    utils?.build?.failBuild ||
    ((message, { error } = {}) => {
      console.error(message, error && error.message);
      process.exitCode = 1;
    });

  // If available, displays the summary in the Netlify UI Deploy Summary section
  // https://docs.netlify.com/integrations/build-plugins/create-plugins/#logging
  const show = utils?.status?.show || (({ summary }) => console.log(summary));

  return { failBuild, show };
};

export default getUtils;
