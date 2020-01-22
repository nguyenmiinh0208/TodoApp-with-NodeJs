var express = require('express');
var app = express();

var todoController = require('./controllers/TodoController');

//set up template
app.set('view engine', 'ejs');

//static file (file css, js)
app.use(express.static('./public'));

todoController(app);

//listen port
app.listen(4444);
console.log('Server running on port 4444');