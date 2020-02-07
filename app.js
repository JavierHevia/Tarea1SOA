//////////////////////
  // npm run dev //
/////////////////////

var request = require("request"); 

var http = require('http');

var express = require('express');
var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit:'10mb'}))

app.get('/', function (req, res) {
    res.send('Hola Mundo!');
});

//Nos regresa el token correspondiente con nuestros datos.
app.get('/newToken', function (req, res) {
 
    //creamos un objeto con sus respectivos campos
    var options = {
        method: 'POST',
        url: 'https://api.softwareavanzado.world/index.php?option=token&api=oauth2', // url que nos proporciona la api
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        form: {
            grant_type: 'client_credentials',
            client_id: 'javierhc22@gmail.com',
            client_secret: '201313898',
        }
    };

    //enviamos la petición como un post.
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
       
        res.send(body); // imprimimos todo lo que nos devuelve a la pagina
        //console.log(body);
    });
});

//nos hace una petición de todos los contactos
app.get('/lista', function (req, res) {

    var options = {
        method: 'GET',
        url: 'https://api.softwareavanzado.world/component/contact/category/4-uncategorised?Itemid=0', // url dada por la api
        headers: { 'content-type': 'application/json' } 
    };
   
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
          res.send(body); // manda todo la respuesta a la pagina
      });
});

//creamos un formulario para poder hacer un post el cual va a contener name y cadid que son los datos que necesitamos.
var formulario = '<form method="post" action="/Insertar">'
    + '<label for="Name">Name</label> &nbsp'
    + '<input type="text" Name="Name" id="Name">'

    + ' &nbsp<label for="edad">Cadid</label> &nbsp'
    + '<input type="text" name="Cadid" id="Cadid">'  

    + '</br></br><input type="submit" value="Insertar"/>'
    + '</form>';
 
var cabecera = '<h1>Insertar Usuario</h1>';

//hacemos un get a la dirección y nos aparecerá un formulario para llenar
app.get('/InsertarJ', function (req, res) {
    res.send('<html><body>'
            + cabecera
            + formulario
            + '</html></body>'
    );
});

// hacemos un post con insertar y recibimos los datos a insetar en al api
app.post('/Insertar', function (req, res) {

    var nombre=req.body.Name; // recibimos el texto de nuestro campo Name del form
    var cadid=req.body.Cadid; // recibimos el texto de nuestro campo Cadid del form


    var options = {
        method: 'POST',
        url: 'https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal',
        headers: { 'content-type': 'application/application/x-www-form-urlencoded', 'Authorization': 'Bearer c3634e6e383a050c644a8538cbb5225d9e18a02a' },
        form: {
            name : "\""+ nombre +"\"",
            catid : cadid
        }
    };
   
    request(options, function (error, response, body) {
        if (error) throw new Error(error);        
          res.send(body); // mandamos a imprimir todo a la pagina
      });
});

app.listen(3000, function () {
    console.log('Trabajando................... http://localhost:3000/');
});