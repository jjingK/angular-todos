// 서비스 모듈
angular.module('todomvc')
  .factory('todoStorage', function($http) {
     var stroage = {
       todos: '',
       get: function(callback) {
         $http.get('/api/todos')
            .then(function successCallback(response) {
              stroage.todos = response.data; // 비동기라 언제 끝날지 모름
              callback(null, stroage.todos); // 콜백함수를 등록해서 넘겨줌
              // callback(null, angular.copy(response.data, stroage.todos));
            }, function errorCallback(response) {

            });
       },
       post: function(newTodoTitle) {
         $http.post('/api/todos', { title: newTodoTitle })
           .then(function successCallback(response) {
              stroage.todos.push(response.data);
           }, function errorCallback(response) {

           });
       },
       // 텍스트 필드가 변경 되었을때, 체크가 변경되었을 때
       put: function(todo) {
         console.log('put', todo);
         $http.put('/api/todos/' + todo.id, todo)
           .then(function successCallback(response) {

           }, function errorCallback(response) {

           });
       },
       delete: function(todoId) {
         $http.delete('/api/todos/' + todoId)
           .then(function successCallback(response) {
            angular.copy(response.data, stroage.todos);
            //  callback(null);
           }, function errorCallback(response) {

           });
       },
       clear: function(callback) {
         // id 만 따로 뽑아서 삭제 가능한 API를 호출
         var ids = [];
         var todos = stroage.todos.filter(function(todo) {
           return todo.completed;
         });
         todos.forEach(function(todo) {
           ids.push(todo.id);
         });
         // /api/todos/1,2,3
         $http.delete('/api/todos/' + ids)
            .then(function successCallback(response) {
              // stroage.todos = response.data;
              callback(null, response.data);
            }, function errorCallback() {

            });
       }
     };
     return stroage;
  });
