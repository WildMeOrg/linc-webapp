'use strict';

angular.module('lion.guardians.login.controller', [])
// Login
.controller('LoginCtrl', ['$scope', '$state', '$timeout', '$localStorage', 'NotificationFactory', function ($scope, $state, $timeout, $localStorage, NotificationFactory) {

  $scope.loginData = { email : 'teste@venidera.com' , password : '123123'};
  $scope.dataLoading = false;
  $scope.remember = true;

  $scope.$storage = $localStorage;

  $scope.checkLogged = function(){
    if ($scope.$storage.logged){
      $scope.dataLoading = true;

      $timeout(function() {
        $scope.dataLoading = false;
        $state.go("home");
      }, 1000);

    }
  }

  $scope.login = function() {
    if (!$scope.$storage.logged){
      if (!$scope.loginData.email || !$scope.loginData.password){
        alert('Please fill the email address and password to login.');
      }else{
        $scope.dataLoading = true;
        // Authentication Service
        //$scope.loginData.email; $scope.loginData.password
        //var shaObj = new jsSHA($scope.loginData.email + $scope.loginData.password + $rootScope.secret, "TEXT");
        //var encrypted_pass = shaObj.getHash("SHA-512", "HEX");
        //$localStorage.logged = (result.data.data[0].password == encrypted_pass)
        var result = {email: "teste@venidera.com", password: '123123'}
        var encrypted_pass = result.password;
        $timeout(function () {
          //$scope.$storage.logged = ("123123" == "123123");
          $scope.$storage.logged = (result.password == encrypted_pass)
          $scope.$storage.email = result.email;

          $scope.dataLoading = false;

          if (!$scope.$storage.logged){
            NotificationFactory.error({
              title: 'Login', message: 'Login error.',
              position: 'left', // right, left, center
              duration: 10000   // milisecond
            });
            console.log(error);
          }
          else{
            NotificationFactory.success({
              title: "Login", message:'Successfully connected.',
              position: "right", // right, left, center
              duration: 3000     // milisecond
            });
            $state.go("home");
          }
        }, 1000);
      }
    }
  };

  $scope.checkLogged();

}])
