angular.module('login', [])

  .controller('loginCtrl', function ($scope, $ionicModal, $timeout, $http, $state) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {
      username: '',
      password: ''
    };
    $scope.loggingIn = false;

    $scope.doLogin = function () {
      var loginDetails = {
        "email": $scope.loginData.username,
        "password": $scope.loginData.password
      }
      $scope.loggingIn = true;
      $http.post('/public/user/login', loginDetails, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function success(response) {
          $scope.loggingIn = false;
          $scope.loggedInAs = response.data.user.fullName;
          $scope.loginError = null;
          $state.go('home');
        }, function error(resposne) {
          $scope.loginError = "Username or password may be wrong!";
          $scope.loggingIn = false;
        });
    };

  });
