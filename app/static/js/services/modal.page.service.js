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

angular.module('modal.page.service', ['ui.bootstrap.modal'])


.factory('$ModalPage', ["$uibModal", function ($uibModal) {
	return function (dlgData, dlgsettings) {

		if ('templateUrl' in dlgsettings && 'template' in dlgsettings) {
			delete dlgsettings.template;
		}

		dlgsettings.resolve = {};

		_.forEach(dlgData, function(val, name){
			dlgsettings.resolve[name] = val;
		});

		return $uibModal.open(dlgsettings).result;

	};
}]);
