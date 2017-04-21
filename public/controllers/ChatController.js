myapp.controller('ChatController', function($scope,$stateParams,$state,chatSRV,loaderSRV) {
loaderSRV.start();
      chatSRV.search()
      .success(function(data){
        $scope.chats=data;
        loaderSRV.end();
      })


       $scope.openChat= function(messageId){
    $state.go("message", {messageId:messageId});
  }

});