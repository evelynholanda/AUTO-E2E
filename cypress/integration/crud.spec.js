
//====>>> CRUD ANTERIOR A BIBLIOTECA DE UPLOAD
// it('CRUDs a note', () => {
//   //utilizando faker e criando 4 palvras aleatorias  
//     const faker = require('faker')
//     const noteDescription = faker.lorem.words(4)
//   //2 intercept - 1 pra qq notes e outro para notes qq coisa
//     cy.intercept('GET', '**/notes').as('getNotes')
//     cy.intercept('GET', '**/notes/**').as('getNote')
//     cy.login()//nao passa session
//   //pagina de criação outra URL
//     cy.visit('/notes/new')
//     //encontra campo
//     cy.get('#content').type(noteDescription)
//     //encontra botao e ceate
//     cy.contains('button', 'Create').click()
//     //requisicao @getnotes sera disparada
//     cy.wait('@getNotes')
//     //depois encontra pela classe item e esta visivel e que contem texto da anotação que criei
//     cy.contains('.list-group-item', noteDescription)
//       .should('be.visible')
//       .click()
//     cy.wait('@getNote')
//   //cria variavel da nova descrição- novas 4 palavras
//     const updatedNoteDescription = faker.lorem.words(4)
//   //encontra o content e apaga o que tinha e salva
//     cy.get('#content')
//       .clear()
//       .type(updatedNoteDescription)
//     cy.contains('button', 'Save').click()
//     cy.wait('@getNotes')
//   //verifica que a note anterior nao existe mais e a nova esta visivel
//     cy.contains('.list-group-item', noteDescription).should('not.exist')
//     cy.contains('.list-group-item', updatedNoteDescription)
//       .should('be.visible')
//       .click()
//     cy.wait('@getNote')
//     //deleta e volta p pagina inicial e aguarda a requisição acabar
//     cy.contains('button', 'Delete').click()
//     cy.wait('@getNotes')
//   //elemento nao existe mais
//     cy.contains('.list-group-item', updatedNoteDescription).should('not.exist')
//   })


//MATERIAL PARA CONSULTA AUXILIAR DE UPLOADS COM CYPRESS
//https://talkingabouttesting.com/2021/04/15/como-fazer-upload-de-arquivos-com-cypress/
//https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-test-uploading-a-file

it('CRUDs a note', () => {
  const faker = require('faker')
  const noteDescription = faker.lorem.words(4)
  let attachFile = false

  cy.intercept('GET', '**/notes').as('getNotes')
  cy.intercept('GET', '**/notes/**').as('getNote')
  cy.login()

  cy.visit('/notes/new')
  cy.get('#content').type(noteDescription)
//SE FOR TRUE O ATTACH USA O COMANDO DA BIBLIOTECA- ARQUIVOS NA PASTA FIXTURE
//SE FALSE IGNORA 
if (attachFile) {
    cy.get('#file').attachFile('example.json')
  }

  cy.contains('button', 'Create').click()

  cy.wait('@getNotes')
  cy.contains('.list-group-item', noteDescription)
    .should('be.visible')
    .click()
  cy.wait('@getNote')

  const updatedNoteDescription = faker.lorem.words(4)

  cy.get('#content')
    .clear()
    .type(updatedNoteDescription)
//AGORA MUDA A VARIAVEL PRA TRUE
  attachFile = true
//SE FOR TRUE - NA EDIÇÃO FAZ O ATACH DO ARQUIVO
  if (attachFile) {
    cy.get('#file').attachFile('example.json')
  }

  cy.contains('button', 'Save').click()
  cy.wait('@getNotes')

  cy.contains('.list-group-item', noteDescription).should('not.exist')
  cy.contains('.list-group-item', updatedNoteDescription)
    .should('be.visible')
    .click()
  cy.wait('@getNote')
  cy.contains('button', 'Delete').click()
  cy.wait('@getNotes')

  cy.contains('.list-group-item', updatedNoteDescription).should('not.exist')
})
