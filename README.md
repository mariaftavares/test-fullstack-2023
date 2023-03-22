
# Infoware 

## Informações para executar aplicação

```
Backend:
1. Entre na pasta server e digite o comando npm install 
2. Após digitar o comando crie um arquivo .env com as mesmas informações do arquivo .env.example
3. Digite o comando docker-compose up -d para criar o banco de dados no docker 
4. Depois execute o comando npm run knex:database para rodar as migrations e seeds
5. Por ultimo execute o comando npm run dev para startar o servidor

```
```
Frontend:
1. Após já ter iniciado seu servidor, entre na pasta client e execute o comando npm install 
Atenção: Caso altere a porta em que o servidor esta rodando é necessario que atualize essa informação no arquivo src/services/api , alterando a porta da url.
2. Depois de instalar as depedencias execute o comando npm run serve para iniciar a aplicação
### Usuários
- Foi criado no seed dois tipos de usuários, o usuário do tipo user e o admin, segue as informações para realizar o login:
- Admin:
  email: admin@admin.com
  senha: admin@123
- User:
  email:user@user.com
  senha:user@123  
```