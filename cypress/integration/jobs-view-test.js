describe('Jobs View', () => {

  beforeEach(() => {
    cy.fixture('../fixtures/job-data.json')
    .then((jobs) => {
      cy.intercept('https://spacetruckersapi.herokuapp.com/api/v1/jobs', {
        body: jobs,
        statusCode: 200
      })
    });
    cy.visit('http://localhost:3000/')
  });

  describe('Page Load View', () => {

    it('Should display the company name on load', () => {
      cy.get('h1').contains('Space Truckers')
    });

    it('Should display all jobs on load', () => {
      cy.get('.job-container')
        .find('.card').should('have.length', 3)
    });

    it('Should load individual job data into each Card', () => {
      cy.get('.card').get('#1')
        .get('h3').contains('Mars')
        .get('.date').contains('11:10:2195')
        .get('.pay').contains(50000000)
        .get('.fluff').contains('Mars is a barren planet with little resources after it was used up by hyper capitalists in the early 21st century.')
    });
  });

  // describe('Job Booking', () => {
  //
  //   it('Should change the job value to booked when the booked button is clicked', () => {
  //     cy.get('#book2')
  //       .click()
  //       .get('.card').get('#2')
  //       .get('.booked').contains('Job booked')
  //   });
  // });

  // describe('Delete Booking', () => {
  //
  //   it('Should delete a job when the delete button is clicked', () => {
  //   cy.get('#delete3')
  //     .click()
  //     .get('.card').should('have.length', 3)
  //   });
  // });
});
