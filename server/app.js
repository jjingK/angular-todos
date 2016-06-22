var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

var todos = [{
    id: 1,
    title: 'cleaning',
    completed: true
  }, {
    id: 2,
    title: 'studying',
    completed: false
  }, {
    id: 3,
    title: 'working',
    completed: true
  }
];

// 1. 정적 파일 호스팅
// express middleware 기반이고 설정 함수에 미들웨어를 인자로 줌
// 노드는 절대경로 기준이라 상태경로를 절대경로로 설정해줘야 함
app.use(express.static(path.join(__dirname, '../client')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// bodyParser 미들웨어 추가
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 2. rest api 기능
// API - 라우팅
// get lists
app.get('/api/todos', function(req, res) {
  res.json(todos);
});
// add
app.post('/api/todos', function(req, res) {
  // return res.json(req.body);
  var newId = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
  // todo object
  var newTodo = {
    id: newId,
    title: req.body.title,
    completed: false
  };
  // add todo array
  todos.push(newTodo);
  res.json(newTodo);
});

// delete
app.delete('/api/todos/:id', function(req, res) {
  var ids = [];

  if (req.params.id.indexOf(',') > -1) {
    ids = req.params.id.split(',');
  } else {
    ids.push(req.params.id);
  }

  for (var i=0, len=ids.length; i<len; i++) {

    var findIndex = todos.findIndex(function(todo) {
      return todo.id.toString() === ids[i];
    });

    // remove from array
    if (findIndex > -1) {
      todos.splice(findIndex, 1);
    }
  }
  res.json(todos);
});

// put (=update)
app.put('/api/todos/:id', function(req, res) {
  // todo 을 찾는다.
  var findIndex = todos.findIndex(function(todo) {
    return todo.id.toString() === req.params.id;
  });

  // 업데이트를 한다.
  // 업데이트 내용은 바디에서 받음
  if (findIndex > -1) {
    todos[findIndex].title = req.body.title || todos[findIndex].title;
    todos[findIndex].completed = req.body.completed || todos[findIndex].completed;

    if (typeof req.body.completed === 'string') {
      todos[findIndex].completed = (req.body.completed === 'true');
    }
  }
  res.json(todos[findIndex]);
});


app.get('/', function(req, res) {
  res.sendFile('index.html');
});
app.listen(3000, function() {
  console.log('Example app listening on port 3000');
});
