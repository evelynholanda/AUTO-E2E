
//LÓGICA - AMBIENTE CUSTOMIZADO

Cypress.Commands.add('fillSignupFormAndSubmit', (email, password) => {
  cy.visit('/signup')
  cy.get('#email').type(email)
  cy.get('#password').type(password, { log: false })
  cy.get('#confirmPassword').type(password, { log: false })
  cy.contains('button', 'Signup').click()
  cy.get('#confirmationCode').should('be.visible')
})

// Cypress.Commands.add('login', (
//   username = Cypress.env("USER_EMAIL"),
//   password = Cypress.env("USER_PASSWORD")
// ) => {
//   cy.visit('/login')
//   cy.get('#email').type(username)
//   cy.get('#password').type(password, { log: false })
//   cy.contains('button', 'Login').click()
//   cy.contains('h1', 'Your Notes').should('be.visible')
// })


//Modificando o login customizado acima por este, para armazenar sessao
Cypress.Commands.add('login', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD'),
  { cacheSession = true } = {} //objeto com propriedade- se nao passar nada ele faz cache da sessão
) => {
  //função login
  const login = () => {
    cy.visit('/login')
    cy.get('#email').type(username)
    cy.get('#password').type(password, { log: false })
    cy.contains('button', 'Login').click()
    cy.contains('h1', 'Your Notes').should('be.visible')
  }
// condicional se o cache existir utiliza o cy.session, se for true
//se for flase, faz login como era antes
  if (cacheSession) {
    cy.session([username, password], login)
  } else {
    login()
  }
})