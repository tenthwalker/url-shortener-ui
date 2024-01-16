describe('App component', () => {
  it('displays non-api reliant elements on page load', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urls',
    }).as('fetchURLs');
    cy.get('h1').should('contain', 'URL Shortener');
    cy.get('form').should('be.visible');
    cy.get('input').should('have.value', '');
    cy.get('form').children().should('have.length', 2);
  });
})