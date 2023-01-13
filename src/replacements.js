/*
 * Adds postMessage functionality for iframe communication
 * 1. We first check if the message origin is on our expected list.
 * 2. Next we listen for a message to tell us which theme the user is using in
 *    the Netlify UI, and we toggle classes so the report matches.
 * 3. Finally we set up an intersection observer to send a message to the parent
 *    window when the report footer is in view (triggers an Amplitude event to
 *    log the report as been "viewed in full").
 */
const enablePostMessageCommunication = {
  source: `</body>`,
  replacement: `<script>
    const handlePostMessageData = (event) => {
      const validOrigins = [
        'http://localhost',
        '--app.netlify.app',
        'https://app.netlify.com',
      ];
      const isValidOrigin = validOrigins.some((origin) =>
        event.origin.includes(origin)
      );
      if (!isValidOrigin) return;

      const theme = event.data;
      const rootEl = document.querySelector('.lh-root');
      if (rootEl && (theme === 'dark' || theme === 'light')) {
        document
          .querySelector('.lh-root')
          ?.classList.toggle('lh-dark', theme === 'dark');
      }

      const observer = new IntersectionObserver((matches) => {
        if (matches[0].isIntersecting) {
          event.source.postMessage(
            'appLighthouseReportFullyScrolled',
            event.origin
          );
        }
      });
      const footerEl = document.querySelector('.lh-footer');
      if (footerEl) observer.observe(footerEl);
    };
    window.addEventListener('message', handlePostMessageData);
  </script></body>`,
};

const replacements = [enablePostMessageCommunication];

const makeReplacements = (str) => {
  return replacements.reduce((acc, { source, replacement }) => {
    return acc.replace(source, replacement);
  }, str);
};

export default makeReplacements;
