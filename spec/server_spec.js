var frisby = require('frisby');

frisby.create('Should return a message when get in home')
  .get('http://localhost:3000/api/')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes({
    "message": String
  })
  .expectJSON({
    "message": 'Está rodando em /'
  })
  .toss();

frisby.create('Should return the list of beers')
  .get('http://localhost:3000/api/cervejas')
  .expectStatus(200)
  .expectJSON([{
    nome: 'Cerveja1'
  }, {
    nome: 'Cerveja2'
  }, {
    nome: 'Cerveja3'
  }])
  .toss();

frisby.create('Should add a new beer')
  .post('http://localhost:3000/api/cervejas', {
    nome: 'Cerveja4'
  })
  .expectStatus(200)
  .expectJSON({
    nome: 'Cerveja4'
  })
  .toss();
