//teste que nao utiliza o session 

// it('successfully logs in', () => {
//     cy.intercept('GET', '**/notes').as('getNotes')
//     cy.login()
//     cy.wait(25000)
//     cy.wait('@getNotes')
   
// })

it('successfully logs in', () => {
    cy.intercept('GET', '**/notes').as('getNotes')
  
    cy.login(
      Cypress.env('USER_EMAIL'),
      Cypress.env('USER_PASSWORD'),
      { cacheSession: false } //passando como false porque quero que siga fluxo normal de Interface
    )
    cy.wait(25000)
    cy.wait('@getNotes')
  })