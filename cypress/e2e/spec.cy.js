describe('App component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urls',
    }).as('fetchURLs');
  });

  it('displays non-api reliant elements on page load', () => {
    // cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
    //   statusCode: 200,
    //   fixture: 'urls',
    // }).as('fetchURLs');
    cy.get('h1').should('contain', 'URL Shortener');
    cy.get('form').should('be.visible');
    cy.get('input').should('have.value', '');
    cy.get('form').children().should('have.length', 2);
  });

  it('displays api data on the page', () => {
    cy.get('.url').should('be.visible');
    cy.get('section').children().should('have.length', 3);
    cy.get('h3').first().should('contain', 'Awesome photo');
    cy.get('a').first().should('contain', 'http://localhost:3001/useshorturl/1');
    cy.get('p').first().should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80');
    cy.get('h3').last().should('contain', 'title');
    cy.get('a').last().should('contain', 'http://localhost:3001/useshorturl/3');
    cy.get('p').last().should('contain', 'https://react.dev/reference/react/useState');
  });
})