// LINC is an open source shared database and facial recognition
// system that allows for collaboration in wildlife monitoring.
// Copyright (C) 2016  Wildlifeguardians
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// For more information or to contact visit linclion.org or email tech@linclion.org
'use strict';

angular.module('lion.guardians.side.menu.controller', ['lion.guardians.side.menu.directive'])

.controller('SideMenuCtrl', ['$scope', '$state', 'AuthService', 'NotificationFactory', function ($scope, $state, AuthService, NotificationFactory) {

  $scope.is_modal_open = false;
  $scope.title = 'Menu';
  $scope.content = 'Menu';

  $scope.user = AuthService.user;

  $scope.options = {
    "imageset": {"type": "imageset", "edit": "new"},
    "lions": {"type": "lion", "edit": "new"}
  };

  $scope.goto_imageset = function (Id) {
    $state.go("imageset", { id: Id });
  }
  $scope.goto_lion = function (Id) {
    $state.go("lion", { id: Id });
  }

  $scope.logout = function($hide){
    $hide();
    AuthService.Logout(function(result){
      $state.go("login");
      NotificationFactory.success({
        title: "Logout", message:'Good bye.',
        position: "right", // right, left, center
        duration: 3000     // milisecond
      });
    }, function(){
      $state.go("login");
    });
  }
}]);
