# first_deno_api

instalar deno na máquina https://deno.land/x/install/

instalar extensão no editor justjavac

**ALGUNS DIFERENCIAIS**

as dependências não são mais instaladas na raiz do projeto na pasta node_modules, elas são importadas de uma url externa 
que batem no que seria o novo npm e ficam cacheadas ao rodar o comando para startar o sever 'deno run --allow-net server.ts'
portanto diferente do node aqui não há node_modules, package.json ou npm

a flag --allow-net no comando para startar o servidor indica para que permita conexão com a internet, existem também 
as flags --allow-write e --allow-read entre outras, o que deixa a aplicação mais segura.
