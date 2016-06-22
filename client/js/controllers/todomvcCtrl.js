// 컨트롤러 선언
angular.module('todomvc')
  .controller('TodomvcCtrl', function($scope, todoStorage) { // html:ng-controller 에 정의 된 값을 사용하겠다고 정의 | 디펜던시 디렉션..스토리지값을 가져올 수 있다.
    $scope.message = 'Hello world!!';  // 스코프 변수에 담아 인터폴레이션을 통해 값을 가져올 수 있다.

    // todo lists - untility 구분
    todoStorage.get(function(err, data) {
      if (err) throw err;
      console.log('get datas: ', data);
      $scope.todos = data;
    });
    $scope.status = {};

    $scope.add = function(newTodoTitle) {
      if (!newTodoTitle) return;

      if (newTodoTitle.trim().length === 0) {
        return;
      }
      todoStorage.post(newTodoTitle);
      $scope.newTodoTitle = '';
    };

    $scope.remove = function(todoId) {
      todoStorage.delete(todoId);
    };

    $scope.clearCompleted = function() {
      todoStorage.clear(function(err, data) {
        if (err) throw err;
        $scope.todos = data;
      });
    };

    $scope.update = function(todo) {
      todoStorage.put(todo);
    };

    // 서비스 로직 분리 전 코드
    // $scope.todos = [{
    //     id: 1,
    //     title: 'cleaning',
    //     completed: true
    //   }, {
    //     id: 2,
    //     title: 'studying',
    //     completed: false
    //   }, {
    //     id: 3,
    //     title: 'working',
    //     completed: true
    //   }
    // ];
    // $scope.add = function(newTodoTitle) {
    //   console.log('add', newTodoTitle);
    //
    //   // id
    //   var newId = $scope.todos.length === 0 ? 1 : $scope.todos[$scope.todos.length -1].id + 1;
    //   // todo object
    //   var newTodo = {
    //     id: newId,
    //     title: newTodoTitle,
    //     completed: false
    //   };
    //   // add todo array
    //   $scope.todos.push(newTodo);
    //   $scope.newTodoTitle = '';
    // };
    //
    // $scope.remove = function(todoId) {
    //   console.log('remove', todoId);
    //
    //   // find index
    //   var findIndex = $scope.todos.findIndex(function(todo) {
    //     return todo.id === todoId;
    //   });
    //
    //   // remove from array
    //   if (findIndex > -1) {
    //     $scope.todos.splice(findIndex, 1);
    //   }
    // };
    //
    // $scope.clearCompleted = function() {
    //   console.log('clearCompleted');
    //   var todos = $scope.todos.filter(function(todo) {
    //     return !todo.completed;
    //   });
    //
    //   $scope.todos = todos;
    // };

  });
