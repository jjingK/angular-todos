angular.module('todomvc')
  .directive('todoItem', function() {
    return {
      scope: {
        data: '=', // html:data를 바인딩
        onRemove: '&',  // controller:remove와 바인딩
        onUpdate: '&'
      },
      link: function(scope) {
        scope.remove = function(todoId) { // directive:scope인 remove와 연결
          scope.onRemove({ todoId: todoId }); // 인자는 객체로 넘겨줌 => controller의 remove를 호출
        };
        scope.update = function(todo) {
          console.log('directive update--', todo);
          scope.onUpdate({ todo: todo });
        };
      },
      template:
        '<div class="input-group">' +
          '<span class="input-group-addon">' +
            '<input type="checkbox" ng-model="data.completed" ng-click="update(data)">' +
          '</span>' +
          '<input type="text" class="form-control" ng-model="data.title" ng-blur="update(data)">' +
          '<span class="input-group-btn">' +
          '<button class="btn btn-danger" ng-click="remove(data.id)">Remove</button>' +
          '</span>' +
        '</div>'
    }
  });
