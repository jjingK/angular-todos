angular.module('todomvc')
  .directive('todoFilter', function() {
    return {
      scope: {
        status: '=',
        clear: '&'
      },
      link: function(scope) {
        scope.clearCompleted = function() {
          scope.clear();
        };
      },
      template:
      '<div class="btn-group">' +
        '<button class="btn btn-default" ng-click="status={completed: true}">Completed</button>' +
        '<button class="btn btn-default" ng-click="status={completed: false}">Active</button>' +
        '<button class="btn btn-default" ng-click="status={}">All</button>' +
        '<button class="btn btn-default" ng-click="clearCompleted()">Clear Completed</button>' +
      '</div>'
    }
  });
