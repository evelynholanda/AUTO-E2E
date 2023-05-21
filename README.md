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