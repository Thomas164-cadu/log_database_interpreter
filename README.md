# Trabalho de log BDII

Autor: Carlos Eduardo Thomas

Para executar o projeto:

*Clone o repositório na sua máquina e rode os seguintes comandos no terminal na pasta clonada;
$ npm install
$ npm start

Feito isso basta colocar a rota na ferramenta de requisições desejada para rota:
http://localhost:3030/log

Então enviar um JSON com o método POST no formato:

{
  "descricao":"<start T1><T1,1, A,20,500><start T2><commit T1><CKPT (T2)><T2,2, A,20,50><start T3><start T4><commit T2><T4,1, B,55,100>"
}

Contendo o formato padrão especificado pelo professor do log e o retorno será de acordo com o esperado.
