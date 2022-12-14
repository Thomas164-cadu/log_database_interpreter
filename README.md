# Trabalho de log BDII

Autor: Carlos Eduardo Thomas

Para executar o projeto:

Configure seu banco no documento db.js no caminho 'src/config/db.js' apontando para um banco local

/*Clone o repositório na sua máquina e rode os seguintes comandos no terminal na pasta clonada;

$ npm install

$ npx sequelize db:migrate:undo //para dar rollback na migration e garantir a criação da tabela

$ npx sequelize db:migrate //para criar a tabela de fato

$ npm run dev

*/

Em seguida adicione 2 tuplas com os valores desejados na tabela de logs.

Feito isso basta colocar a rota na ferramenta de requisições desejada (EX: PostMan) para rota:
http://localhost:3030/log

Então enviar um JSON com o método POST no formato:

{
  "log":"<start T1><T1,1, A,20,500><start T2><commit T1><CKPT (T2)><T2,2, A,20,50><start T3><start T4><commit T2><T4,1, B,55,100>"
}

Contendo o formato padrão especificado pelo professor do log e o retorno será de acordo com o esperado, 
mostrando as alterações feitas e transações que sofreram REDO.
