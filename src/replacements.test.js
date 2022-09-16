const { enablePostMessageCommunication } = require('./replacements');

describe('replacements', () => {
  it('should make enablePostMessageCommunication replacement', () => {
    const data = '</div></body></html>';
    const replacedContent = enablePostMessageCommunication(data);
    expect(replacedContent).toContain('</div><script>');
    expect(replacedContent).toContain('</script></body></html>');
  });
});
