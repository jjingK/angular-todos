// 서비스 모듈 - API 적용 전
angular.module('todomvc')
  .factory('todoStorage', function() {
     var stroage = {
       status: {},
       todos: [{
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
       ],
       get: function() {
         return stroage.todos;
       },
       post: function(newTodoTitle) {
         console.log('post', newTodoTitle);

         // id
         var newId = stroage.todos.length === 0 ? 1 : stroage.todos[stroage.todos.length -1].id + 1;
         // todo object
         var newTodo = {
           id: newId,
           title: newTodoTitle,
           completed: false
         };
         // add todo array
         stroage.todos.push(newTodo);
       },
       delete: function(todoId) {
         // find index
         var findIndex = stroage.todos.findIndex(function(todo) {
           return todo.id === todoId;
         });

         // remove from array
         if (findIndex > -1) {
           stroage.todos.splice(findIndex, 1);
         }
       },
       clear: function() {
         var todos =  stroage.todos.filter(function(todo) {
           return !todo.completed;
         });
         stroage.todos = todos;
         return todos;
       }
     };
     return stroage;
  });
