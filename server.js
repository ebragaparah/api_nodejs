var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cervejas = [
  { nome: 'Cerveja1' },
  { nome: 'Cerveja2' },
  { nome: 'Cerveja3' }
];

router.use(function(request, response, next) {
  console.log('Algo mudou...');
  next();
});

router.get('/', function(request, response) {
  response.json({ message: 'Está rodando em /' });
});

var cervejasRoute = router.route('/cervejas');
var cervejaRoute = router.route('/cerveja/:id');
var editCervejaRoute = router.route('/cerveja/:id/edit');

cervejasRoute.get(function(request, response) {
  response.json(cervejas);
});

cervejasRoute.post(function(request, response) {
  var cerveja = {
    nome: request.body.nome
  };

  cervejas.push(cerveja);
  response.json(cerveja);
});

cervejaRoute.get(function(request, response) {
  var cerveja = cervejas[request.params.id - 1];
  response.json(cerveja);
});

editCervejaRoute.put(function(request, response) {
  var cerveja = cervejas[request.params.id];

  cerveja.nome = request.body.nome;
  response.json({ message: "Cerveja alterada com sucesso", data: cerveja });
});

cervejaRoute.delete(function(request, response) {
  cervejas.splice(request.params.id, 1);
  response.json(true);
});

app.use('/api', router);
app.listen(port, function() {
  console.log('Insert cerveja on port: ' + port);
});
