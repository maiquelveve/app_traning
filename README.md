# APP TRANING

## CRIAR BANCO DE DADOS ##
1º - Configure todas as variaveis do .ENV

2º - Execute os comandos:

``````

  - yarn run sequelize db:create

``````

## EXECUTAR AS MIGRATIONS NO BANCO DE DADOS ##

Após executaro o comando anterior com sucesso, executes o comando abaixo:

``````

  - yarn run sequelize db:migrate

``````

## COMOMANDO PARA CRIAR UMA NOVA MIGRATE ##

Para criar uma nova MIGRATE basta executar o comando abaixo com o "nome_da_migrate" no final:

``````

  - yarn run sequelize migration:generate —name nome_da_migrate

``````

## COMOMANDO PARA DESFAZER A ULTIMA MIGRATE EXECUTADA ##

Para DESFAZER a última MIGRATE basta executar o comando abaixo com o "nome_da_migrate" no final:

``````

  - yarn run sequelize db:migrate:undo

``````

  Observação:
    Note que na tabela do seu banco de dados "sequelizemeta" o nome da ultima migrate será removido, possibilitando assim executar as migrates a partir da última migrate executada.


## CONFIGURACAO DA VARIAVEL DE HAMBIENTE NODE_ENV ##

A variavel de hambiente que está no .env chamada "NODE_ENV" poderá receber um dos três valores abaixo:

``````
  1 - development
  2 - test
  3 - productio
``````

Repare que conforme o valor atribuido a ela será criado uma banco com nome diferente e independentes um do outro, pois os bancos terão a mesma estrutura, tabelas e executaram as mesmas migrate, mas não terão a mesma finalidade e nem os mesmos dados.

OBSERVAÇÃO: caso não seja atribuido nenhum valor a essa variável, por default seu valor será "DEVELOPMENT"
