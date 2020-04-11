## simple-express-server
A dockerize nodejs + express with following functionality:
* jwt for url security
* can login
  - POST Request
  - /api/v1/users/login
* can create user
  - POST Request
  - /api/v1/users/
* can get all users
  - GET Request
  - /api/v1/users/
* can update users
  - PUT Request
  - /api/v1/users/{id}
* can delete user
  - DELETE Request
  - /api/v1/users/{id}
* has basic Swagger UI (Inprogress)
  - /api-docs

### Requirements
* Npm
* Docker

### Build
* docker-compose build

### Deploy 
* docker-compose up

### UnDeploy
* docker-compose down
