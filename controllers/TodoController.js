var bodyParser = require('body-parser');
var url = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');

//connnect database
mongoose.connect('mongodb://localhost:27017/TodoApplication', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//create a schema
var todoSchema = new mongoose.Schema({
  item: String,
});

var Todo = mongoose.model('Todo', todoSchema);

//Test show data
// var data = [
//   {item: 'go to school'},
//   {item: 'listen to music'},
//   {item: 'watch jav, porn-hub'}
// ]

module.exports = function(app) {

  //xem cac cong viec (show)
  app.get('/todo', function(req, res) {
    //get data from mongo
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', {todoList: data});
    });
  });

  //Nhap cac cong viec (insert),
  app.post('/todo', url, function(req, res) {
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  //Xoa cong viec (delete)
  app.delete('/todo/:item', function(req, res) {
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data) { 
      if (err) throw err;
      res.json(data);
    })

  });

};



