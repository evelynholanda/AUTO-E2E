# Testes _end-to-end_ com Cypress

# _Setup_

1. Comece criando um diretório chamado `testes-e2e-com-cypress/`
2. Via terminal de linha de comando, visite o diretório recém criado (`cd testes-e2e-com-cypress/`)
3. Execute o comando `git init`
4. Na raiz do projeto, crie um arquivo oculto chamado `.gitignore` com o seguinte conteúdo:

```.gitignore
.DS_Store
cypress.env.json
cypress/screenshots/
cypress/videos/
node_modules/
```

5. Ainda na raiz do projeto, crie um arquivo chamado `README.md` com o seguinte conteúdo:

```md
# Testes _end-to-end_ com Cypress

TBD.
```

6. Execute o comando `npm init -y`
7. Execute o comando `npm install cypress@8.2.0 --save-dev` (ou `npm i cypress@8.2.0 -D` para a versão curta)
8. Também na raiz do projeto, crie um arquivo chamado `cypress.env.json` e outro chamado `cypress.env.example.json`. Inicialize ambos como um objeto vazio (`{}`)
9. Execute o comando `npx cypress open` para abrir o Cypress pela primeira vez
10. Por fim, com o Cypress _Runner_ aberto, delete os exemplos criados automaticamente e feche-o.

> **Obs.:** Quando inicializado pela primeira vez, o Cypress automaticamente cria o arquivo `cypress.json` e o diretório `cypress/` com os sub-diretórios `fixtures/`, `integration/`, `plugins/` e `support/`, com seus respetivos arquivos (com exceção dos exemplos que acabamos de deletar.)



TBD.

Steps Para compreensao:
1- Configurações Iniciais
2- Instalação da analise estatica do código com ESLint.
No terminal de linha de comando, no diretório testes-e2e-com-cypress/, execute o comando npm install eslint@7.32.0 --save-dev (ou npm i eslint@7.32.0 -D para a versão curta)

- Logo após, execute o comando npx eslint --init e escolhas as opções que fizerem sentido para você (se não souber o que escolher, assita a aula onde executo tal comando e veja as opções que escolhi, ou então, simplesmente copie a versão final do meu arquivo .eslintrc.json, conforme abaixo)

// .eslintrc.json

{
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-trailing-spaces": [
            "error"
        ]
    }
}

3- Instalar plugin estlink
No terminal de linha de comando, no diretório testes-e2e-com-cypress/, execute o comando npm install eslint-plugin-cypress@2.11.3 --save-dev (ou npm i eslint-plugin-cypress@2.11.3 -D para a versão curta)
Logo após, dentro do diretório cypress/, crie outro arquivo chamado .eslintrc.json com o seguinte conteúdo:
{
  "extends": [
    "plugin:cypress/recommended"
  ]
}

4- Mudando as condigurações no pakage.json
No arquivo package.json, crie um script chamado lint com o valor eslint cypress/**/*.js
Ainda no mesmo arquivo, crie um script chamado lint:fix com o valor eslint cypress/**/*.js --fix
Por fim, execute o comando npm run lint para analisar o código existente estaticamente, e caso necessário, execute também o comando npm run lint:fix

5- Testando o fluxo de Sign up da aplicação Scratch é composto de 3 etapas:

Crie uma conta trial no Mailosaur (um server será criado automaticamente)
Acesse a aba API e crie uma Server API Key (Create a key)
Obs. 2: Caso você prefira, pode seguir os passos a partir da documentação oficial do Mailosaur.

Guarde os valores Server ID e API Key (clique em Reveal Key para revelar sua Key)
Atualize o conteúdo do arquivo cypress.env.json com o seguinte, substituindo os valores das variáveis que iniciam com MAILOSAUR_ pelos valores obtidos a partir do seu server no Mailosaur:
{
  "USER_PASSWORD": "s3Cre7P@sSw0rd",
  "MAILOSAUR_SERVER_ID": "your-mailosaur-id-here",
  "MAILOSAUR_API_KEY": "your-mailosaur-api-key-here"
}
Obs. 3: Não precisa mudar o valor do USER_PASSWORD.

Atualize também o conteúdo do arquivo cypress.env.example.json com o seguinte:
{
  "USER_PASSWORD": "s3Cre7P@sSw0rd",
  "MAILOSAUR_SERVER_ID": "your-mailosaur-id-here",
  "MAILOSAUR_API_KEY": "your-mailosaur-api-key-here"
}
Obs. 4: Neste arquivo, pode deixar os valores conforme acima. Não exponha dados sensíveis neste arquivo visto que ele será versionado. A idéia é ele ser um arquivo de exemplo, conforme seu nome sugere.

O Sign up depende de um email ainda não cadastrado e para isso iremos utilizar o faker. Além disso, também precisamos instalar o cypress-mailosaur. Portanto, no terminal de linha de comando, na raiz do projeto, execute o comando npm install cypress-mailosaur@2.3.3 faker@5.5.3 --save-dev (ou npm i cypress-mailosaur@2.3.3 faker@5.5.3 -D para a versão curta)
No arquivo cypress/support/index.js, importe o cypress-mailosaur (import 'cypress-mailosaur')
No diretório cypress/integration/, crie um arquivo chamado signup.spec.js com o seguinte conteúdo:
// cypress/integration/signup.spec.js

it('successfully signs up using confirmation code sent via email', () => {
  const faker = require('faker')
  const emailAddress = `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
  const password = Cypress.env('USER_PASSWORD')

  cy.intercept('GET', '**/notes').as('getNotes')
  cy.visit('/signup')
  cy.get('#email').type(emailAddress)
  cy.get('#password').type(password, { log: false })
  cy.get('#confirmPassword').type(password, { log: false })
  cy.contains('button', 'Signup').click()
  cy.get('#confirmationCode').should('be.visible')

  cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
    sentTo: emailAddress
  }).then(message => {
    const confirmationCode = message.html.body.match(/\d{6}/)[0]
    cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)

    cy.wait('@getNotes')
    cy.contains('h1', 'Your Notes').should('be.visible')
  })
})
Perceba que no teste estamos navegando para a página de Sign up pela URL relativa /signup, portanto, adicione a propriedade baseUrl ao arquivo cypress.json com o valor https://notes-serverless-app.com. Dessa forma, quando o comando cy.visit('/signup) for executado, a URL relativa de /signup será concatenada com o valor da baseUrl, resultando na visita ao endereço completo (https://notes-serverless-app.com/signup).

Execute o teste recém criado com o comando npx cypress run --spec cypress/integration/signup.spec.js

Obs. 5: Siga adiante para o exercício extra quando o teste estiver passando.

Obs. 6: Caso o teste falhe devido ao timeout default do Cypress (de 4000 milissegundos) não ser o suficiente em seu ambiente, adicione ao arquivo cypress.json a propriedade defaultCommandTimeout com um valor não maior que 30000 milissegundos). Sugiro tentar 10000, se não for o suficiente, 15000 e assim por diante.

Obs. 7: Dependendo das configurações do seu computador, ao utilizar o Cypress Runner, ou ao rodar os testes em modo headless, é possível que você se depare com o erro Cypress detected policy settings on your computer that may cause issues. Caso isso ocorra, consulte a documentação oficial do Cypress e analise as possíveis soluções para o seu caso específico.


6- Configurar a propriedade base URL cypress.json e rodar o teste p fazer testes.
npx cypress run --specf cypress/integration/signup.spec.js
Pode validar com o video no cypress/videos
OBS: se teste falhar por conta de TIMEOT mudar ate 30000 milesegundos
OBS: Se o problema for POLICY- verificar documentação do cypress p identificar o erro e seguir as instruções

7- Fazer o session - mais ainda é experimental- Neste caso a sessao do usuário fica salva no login anterior

8- fazer o CRUD com arquivo:
No diretório cypress/integration/, crie um arquivo chamado crud.spec.js com o seguinte conteúdo:

// cypress/integration/crud.spec.js

it('CRUDs a note', () => {
  const faker = require('faker')
  const noteDescription = faker.lorem.words(4)

  cy.intercept('GET', '**/notes').as('getNotes')
  cy.intercept('GET', '**/notes/**').as('getNote')
  cy.login()

  cy.visit('/notes/new')
  cy.get('#content').type(noteDescription)
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

executar coando para testar: npx cypress run --spec cypress/integration/crud.spec.js

8- cypress-file-upload
instalar nova biblioteca cypress-file-upload
Seguindo os passos:

No terminal de linha de comando, na raiz do projeto, execute o comando npm install cypress-file-upload@5.0.8 --save-dev (ou npm i cypress-file-upload@5.0.8 -D para a versão curta)
No arquivo cypress/support/index.js, importe o cypress-file-upload (import 'cypress-file-upload')
Agora, no arquivo cypress/integration/crud.spec.js, modifique-o para o seguinte:
// cypress/integration/crud.spec.js

it('CRUDs a note', () => {
  const faker = require('faker')
  const noteDescription = faker.lorem.words(4)
  let attachFile = false

  cy.intercept('GET', '**/notes').as('getNotes')
  cy.intercept('GET', '**/notes/**').as('getNote')
  cy.login()

  cy.visit('/notes/new')
  cy.get('#content').type(noteDescription)

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

  attachFile = true

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

execute comando: npx cypress run --spec cypress/integration/crud.spec.js
