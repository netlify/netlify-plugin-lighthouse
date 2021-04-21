describe('Generates Lighthouse reports', () => {
  it('Verify report on root path', () => {
    cy.visit('/reports/lighthouse.html');
    cy.contains('Performance');
  });

  it('Verify report on route1', () => {
    cy.visit('/route1/reports/route1.html');
    cy.contains('Performance');
  });

  it('Verify report on route2', () => {
    cy.visit('/route2/reports/lighthouse.html');
    cy.contains('Performance');
  });
});
