c4App.controller('visualizerController', function($scope, $http) {
  $scope.neat = "Jee whiz";
  $scope.title = "d3 Demo";
       $scope.d3Data = [
         {name: "Greg", score:98},
         {name: "Ari", score:96},
         {name: "Loser", score: 48}
       ];
       $scope.d3OnClick = function(item){
         alert(item.name);
       };

});
