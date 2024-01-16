describe('App component', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urls',
    }).as('fetchURLs');
    cy.visit('http://localhost:3000');
  });

  it('displays non-api reliant elements on page load', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urls',
    }).as('fetchURLs');
    cy.get('h1').should('contain', 'URL Shortener');
    cy.get('form').should('be.visible');
    cy.get('input').should('have.value', '');
    cy.get('button').should('be.visible');
    cy.get('form').children().should('have.length', 3);
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

  it('takes in new form data, then clears inputs on submission', () => {
    cy.get('input').should('have.value', '');
    cy.get('input').first().type('new');
    cy.get('input').first().should('have.value', 'new');
    cy.get('input').last().type('https://docs.cypress.io/api/commands/type');
    cy.get('input').last().should('have.value', 'https://docs.cypress.io/api/commands/type');
    cy.get('button').click();
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      fixture: 'new',
    }).as('postURL');
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'postpost',
    }).as('fetchURLs');
    cy.get('input').should('have.value', '');
  });

  it('posts new data to the page', () => {
    cy.get('input').should('have.value', '');
    cy.get('input').first().type('new');
    cy.get('input').first().should('have.value', 'new');
    cy.get('input').last().type('https://docs.cypress.io/api/commands/type');
    cy.get('input').last().should('have.value', 'https://docs.cypress.io/api/commands/type');
    cy.get('button').click();
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      fixture: 'new',
    }).as('postURL');
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'postpost',
    }).as('fetchURLs');
    cy.get('input').should('have.value', '');
    cy.get('h3').last().should('contain', 'new');
    cy.get('a').last().should('contain', 'http://localhost:3001/useshorturl/4');
    cy.get('p').last().should('contain', 'https://docs.cypress.io/api/commands/type');
  });
});