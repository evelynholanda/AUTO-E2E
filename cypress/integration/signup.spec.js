// codigo expondo dados sensíveis

// it('successfully signs up using confirmation code sent via email', () => {
//     const faker = require('faker')
//     const emailAddress = `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
//     const password = Cypress.env('USER_PASSWORD')
  
//     cy.intercept('GET', '**/notes').as('getNotes')
//     cy.visit('/signup')//neste caso precisa configurar a base URL no cypress.json
//    
//identificando os elementos email, password, confirma password, acha botao
//     cy.get('#email').type(emailAddress)
//     cy.get('#password').type(password, { log: false })//nao loga o password , nao deixa visivel
//     cy.get('#confirmPassword').type(password, { log: false })
//     cy.contains('button', 'Signup').click()// contains para encontrar o botao e clicar nele
//     cy.get('#confirmationCode').should('be.visible')//direciona para pegar o codigo com mailossauro
  
//PEGANDO INFORMAÇÃOES DE EMAILS DO SERVIDOR DA OUTRA APLICAÇÃO
//     cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
//       sentTo: emailAddress
//     }).then(message => {//COM ESSA RESPOSTA ENCADEIA COM ESTA FUNÇÃO
//       
//MESSAGE É O ARGUMENTO DA FUNÇÃO
//       
//FUNÇÃO- PREENCHIMNTO DO FORMULARIO PARA SER DIRECIONADO A PAGINA DE NOTAS JA LOGADO
//       const confirmationCode = message.html.body.match(/\d{6}/)[0]//MATCH PARA PEGAR OS PRIMEIROS 6 DIGITOS
//       cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)


//ESPERA A REQUISIÇÃO ACABAR E DEPOIS VERIFICA COM CONTAINS SE TEM H1 COM TEXTO E ESTA VISIVEL
//       cy.wait('@getNotes')
//       cy.contains('h1', 'Your Notes').should('be.visible')
//     })
//   })


//codigo sem expor os dados fazendo session
it('successfully signs up using confirmation code sent via email', () => {//faz testes com sucesso atraves codigo confirmação que foi enviado por email
    
    //declarando vbariaveis
    const faker = require('faker')//biblioteca faker que gera dados aleatórios/randomicos
    const emailAddress = `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`//usa o faker para gerar uuid aleatorio
    const password = Cypress.env('USER_PASSWORD')// pegar da variavel de ambiente do USER_PASSWORD do arquivo cypress.ev que nap esta sendo versionado, mas ainda assim expoe o dado sensivel no log do cypress

    cy.intercept('GET', '**/notes').as('getNotes')//quando cao logado a aplicação faz a busca pra ve se você tem anotações
   //intercepta, chama a request de gnotes e la em baixo diz: espera ela acabar
    cy.fillSignupFormAndSubmit(emailAddress, password)


    cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
        sentTo: emailAddress
    }).then(message => {
        const confirmationCode = message.html.body.match(/\d{6}/)[0]
        cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)

        cy.wait('@getNotes')//o arroba é um alias (apelido) para a request getnotes
        cy.contains('h1', 'Your Notes').should('be.visible')
    })
})