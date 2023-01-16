import makeReplacements from './replacements.js';

describe('replacements', () => {
  it('should make enablePostMessageCommunication replacement', () => {
    const data = '</div></body></html>';
    const replacedContent = makeReplacements(data);
    expect(replacedContent).toContain('</div><script>');
    expect(replacedContent).toContain('</script></body></html>');
  });
});
