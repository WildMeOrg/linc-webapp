'use strict';

angular.module('lion.guardians.metadata.controller', ['lion.guardians.metadata.directive'])

.controller('MetadataCtrl', ['$scope', '$window', '$uibModalInstance', 'LincServices', 'NotificationFactory', 'optionsSet', '$timeout', '$q',  'organizations', function ($scope, $window, $uibModalInstance, LincServices, NotificationFactory, optionsSet, $timeout, $q, organizations) {

  $scope.debug = true;
  $scope.optionsSet = optionsSet;
  $scope.optionsSet.isMetadata = true;
  $scope.organizations = organizations;
  var titles = {}; titles['lion'] = 'Lion Metadata'; titles['imageset'] = 'Image Set Metadata';
  $scope.showLionName = (optionsSet.type === 'lion' || (optionsSet.type === 'imageset' && optionsSet.edit === 'edit'));
  $scope.isNew = (optionsSet.edit === 'new');
  // Title
  $scope.title = titles[optionsSet.type];
  $scope.content = 'Form';

  $scope.Cancel = function () {
   $uibModalInstance.dismiss('cancel');
  };

  var Save_metadata = function (){
    var deferred = $q.defer();
    var selected = $scope.selected;

    var eyes_dams = _.includes(selected.eye_damage, "EYE_DAMAGE_LEFT", "EYE_DAMAGE_RIGHT") ? ["EYE_DAMAGE_BOTH"] : selected.eye_damage;
    var ear_marks = _.includes(selected.markings['ear'], "EAR_MARKING_LEFT", "EAR_MARKING_RIGHT") ? ["EAR_MARKING_BOTH"] : selected.markings['ear'];

    var concat = _([]).concat(eyes_dams);
    concat = _(concat).concat(ear_marks);
    concat = _(concat).concat(selected.markings['mount']);
    concat = _(concat).concat(selected.markings['tail']);
    concat = _(concat).concat(selected.broken_teeth);
    if(selected.nose_color != undefined)
      concat = _(concat).concat([selected.nose_color]);
    concat = _(concat).concat(selected.scars);
    var TAGS = JSON.stringify(concat.value());
    if(!concat.value().length) TAGS = "null";

    if(optionsSet.type === 'lion'){
      //Selected Dates
      var lion_sel_data = {
          "owner_organization_id": selected.owner_organization_id,
          "name" : selected.name
      }
      var imageset_sel_data = {
        "date_stamp": selected.date_stamp,
        "latitude": selected.latitude, "longitude": selected.longitude,
        "gender": selected.gender,
        "date_of_birth": selected.date_of_birth,
        "tags": TAGS, 'notes': selected.notes
      }
      // Check Changed Datas
      var lion_data = _.reduce(lion_sel_data, function(result, n, key) {
        if (lion_sel_data[key] && lion_sel_data[key] != optionsSet.data[key]) {
            result[key] = lion_sel_data[key];
        }
        return result;
      }, {});
      var imageset_data = _.reduce(imageset_sel_data, function(result, n, key) {
        if (imageset_sel_data[key] && imageset_sel_data[key] != optionsSet.data[key]) {
            result[key] = imageset_sel_data[key];
        }
        return result;
      }, {});
      if(Object.keys(lion_data).length || Object.keys(imageset_data).length){
        if(optionsSet.edit === 'edit'){
          var id = optionsSet.data.id;
          var data = {"lion": lion_data, "imageset": imageset_data};
          LincServices.SaveLion(id, data, function(){
            deferred.resolve({type: 'save', 'data': data, 'title': 'Save', 'message': "Lion's Metadata saved with success"});
          },
          function(error){
            deferred.reject({'message': "Unable to Save Lion's Metadata"});
          });
        }
        else{
          LincServices.CreateLion(data, function(){
            //deferred.resolve($scope.optionsSet);
            deferred.resolve({type: 'create', 'data': data, 'title': 'Create', 'message': "Lion's Metadata created with success"});
          },
          function(error){
            deferred.reject({'message': "Unable to create new Lion's Metadata"});
          });
        }
      }
      else{
        deferred.resolve({type: 'no_change'});
      }
    }
    else{
      //Selected Dates
      var sel_data = {
        "owner_organization_id": selected.owner_organization_id,
        "date_stamp": selected.date_stamp,
        "latitude": selected.latitude, "longitude": selected.longitude,
        "gender": selected.gender,
        "date_of_birth": selected.date_of_birth,
        "tags": TAGS, 'notes': selected.notes
      }
      if($scope.showLionName){ sel_data.name = selected.name; }
      // Check Changed Datas
      var data = _.reduce(sel_data, function(result, n, key) {
        if (sel_data[key] && sel_data[key] != optionsSet.data[key]) {
            result[key] = sel_data[key];
        }
        return result;
      }, {});
      if(Object.keys(data).length){
        if(optionsSet.edit === 'edit'){
          var id = optionsSet.data.id;
          //var data = {'tags': TAGS};
          LincServices.SaveImageset(id, data, function(){
            deferred.resolve({type: 'save', 'data': data, 'title': 'Save', 'message': "Image Set's Metadata saved with success"});
          },
          function(error){
            deferred.reject({'message': "Unable to Save Image Set's Metadata"});
          });
        }
        else{
          LincServices.CreateImageset(data, function(){
            //deferred.resolve($scope.optionsSet);
            deferred.resolve({type: 'create', 'data': data, 'title': 'Create', 'message': "Image Set's Metadata created with success"});
          },
          function(error){
            deferred.reject({'message': "Unable to create new Image Set's Metadata"});
          });
        }
      }
      else{
        deferred.resolve({type: 'no_change'});
      }
    }
    return deferred.promise;
  };
  // Save and Close
  $scope.SaveClose = function(){
    Save_metadata().then(function(result) {
      if(result.type == 'no_change'){
        NotificationFactory.warning({
          title: "Warning", message: "There is no change in the data",
          position: "right", // right, left, center
          duration: 2000     // milisecond
        });
      }
      else{
        NotificationFactory.success({
          title: result.title, message: result.message,
          position: "right", // right, left, center
          duration: 2000     // milisecond
        });
        $uibModalInstance.close({'data': result.data});
      }
    },
    function(result){
      NotificationFactory.error({
        title: "Error", message: result.message,
        position: 'right', // right, left, center
        duration: 180000   // milisecond
      });
      //$uibModalInstance.dismiss("error");
    });
  }
  // Save
  $scope.Save = function(){
    var deferred = $q.defer();
    //timeout(function() {
       $scope.optionsSet.data = { id: 1, name: 'leão 1', age: 13, thumbnail: "/static/images/square-small/lion1.jpg", gender: 'male', organization: 'Lion Guardians', hasResults: true, pending: false, primary: true, verified: true, selected: false};

        console.log("Save Imagesets");
        NotificationFactory.success({
          title: "Save", message:'Metadata saved with success',
          position: "right", // right, left, center
          duration: 2000     // milisecond
        });
        $scope.metadataId = {id: 2};
        deferred.resolve($scope.optionsSet);
    //}, 1000);
    return deferred.promise;
  }
  $scope.Close = function(){
    console.log("Close UploadImages");
    $scope.metadataId = {id: 2};
    $uibModalInstance.close($scope.metadataId);
  }

  // Gender List
  $scope.genders = [{value: 'male', label: 'Male'}, {value: 'female',label: 'Female'}];
  // Markings List
  $scope.markings = [
    {value: 'ear',  label: 'Ear', allText : 'All Ear Markings',
        items: [ //{value: 'EAR_MARKING_BOTH}', label: 'Both'},
                {value: 'EAR_MARKING_LEFT',  label: 'Left'},
                {value: 'EAR_MARKING_RIGHT', label: 'Right'}
               ]},
    {value: 'mount', label: 'Mouth', allText: 'All Mouth Markings',
        items: [ {value: 'MOUTH_MARKING_BACK',  label: 'Back'},
                 {value: 'MOUTH_MARKING_FRONT', label: 'Front'},
                 {value: 'MOUTH_MARKING_LEFT',  label: 'Left'},
                 {value: 'MOUTH_MARKING_RIGHT', label: 'Right'} ]},
    {value: 'tail', label: 'Tail',  allText: 'All Tail Markings',
        items: [{value: 'TAIL_MARKING_MISSING_TUFT', label: 'Missing Tuft'}]}
  ];
  // Eye Markings
  $scope.eye_damage = [ //{value: 'EYE_DAMAGE_BOTH',  label: 'Both'}
    {value: 'EYE_DAMAGE_LEFT',  label: 'Left'}, {value: 'EYE_DAMAGE_RIGHT', label: 'Right'}];
  // Nose Color
  $scope.nose_color = [{value: undefined, label: 'None'}, {value: 'NOSE_COLOUR_BLACK', label: 'Black'},
    {value: 'NOSE_COLOUR_PATCHY',  label: 'Patchy'}, {value: 'NOSE_COLOUR_PINK', label: 'Pynk'},
    {value: 'NOSE_COLOUR_SPOTTED', label: 'Spotted'}];
  // Broken Teeths
  $scope.broken_teeth = [{value: 'TEETH_BROKEN_CANINE_LEFT', label: 'Canine Left'},
    {value: 'TEETH_BROKEN_CANINE_RIGHT', label: 'Canine Right'}, {value: 'TEETH_BROKEN_INCISOR_LEFT', label: 'Incisor Left'}, {value: 'TEETH_BROKEN_INCISOR_RIGHT', label: 'Incisor Right'}];
  // Scars Markings
  $scope.scars = [{value: 'SCARS_BODY_LEFT', label: 'Body Left'}, {value: 'SCARS_BODY_RIGHT', label: 'Body Right'}, {value: 'SCARS_FACE', label: 'Face'}, {value: 'SCARS_TAIL', label: 'Tail'}];

  if(optionsSet.edit == 'edit'){

    var TAGS = JSON.parse(optionsSet.data.tags);

    var eyes_dams = _.includes(_.intersection(TAGS,['EYE_DAMAGE_BOTH', 'EYE_DAMAGE_LEFT', 'EYE_DAMAGE_RIGHT']), 'EYE_DAMAGE_BOTH') ?  ['EYE_DAMAGE_LEFT', 'EYE_DAMAGE_RIGHT'] : _.intersection(TAGS,['EYE_DAMAGE_BOTH', 'EYE_DAMAGE_LEFT', 'EYE_DAMAGE_RIGHT']);
    var ear_marks = _.includes(_.intersection(TAGS, ['EAR_MARKING_BOTH', 'EAR_MARKING_LEFT', 'EAR_MARKING_RIGHT']),'EAR_MARKING_BOTH') ? ['EAR_MARKING_LEFT', 'EAR_MARKING_RIGHT'] : _.intersection(TAGS, ['EAR_MARKING_BOTH', 'EAR_MARKING_LEFT', 'EAR_MARKING_RIGHT']);

    //optionsSet.data.date_of_birth = (new Date(Date.parse(optionsSet.data.date_of_birth))).toJSON();

    $scope.selected = {
      "name": optionsSet.data.name,
      "date_stamp": optionsSet.data.date_stamp,
      "owner_organization_id": optionsSet.data.owner_organization_id,
      "date_of_birth": optionsSet.data.date_of_birth,
      "latitude": optionsSet.data.latitude,
      "longitude": optionsSet.data.longitude,
      "gender": optionsSet.data.gender,
      "eye_damage": eyes_dams,
      "broken_teeth": _.intersection(TAGS,['TEETH_BROKEN_CANINE_LEFT', 'TEETH_BROKEN_CANINE_RIGHT','TEETH_BROKEN_INCISOR_LEFT', 'TEETH_BROKEN_INCISOR_RIGHT']),
      "nose_color": (_.intersection(TAGS, ['NOSE_COLOUR_BLACK', 'NOSE_COLOUR_PATCHY', 'NOSE_COLOUR_PINK', 'NOSE_COLOUR_SPOTTED']))[0],
      "scars": _.intersection(TAGS, ['SCARS_BODY_LEFT', 'SCARS_BODY_RIGHT', 'SCARS_FACE']),
      "markings":{'ear': ear_marks,'mount': _.intersection(TAGS, ['MOUTH_MARKING_BACK', 'MOUTH_MARKING_FRONT','MOUTH_MARKING_LEFT', 'MOUTH_MARKING_RIGHT']),'tail': _.intersection(TAGS,['TAIL_MARKING_MISSING_TUFT'])},
      "notes": optionsSet.data.notes
    }
    $scope.selected.age = getAge($scope.selected.date_of_birth);
    //$scope.original = angular.copy($scope.selected);
  }
  else
  {
    // Result Datas
    $scope.selected = { name: "", owner_organization_id: "", date_of_birth: new Date(),
                        updated_at: new Date(), latitude:"", longitude: "",
                        gender: "", markings: [], broken_teeth: [], eye_damage: [],
                        nose_color: [], scars: [], notes: "Notes here"
    };
  }
  // Calc Age Function
  function getAge(date) {
    var birthDate = new Date(Date.parse(date));
    var now = new Date();
    function isLeap(year) {
      return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }
    //function isLeap(year) {
    //return(new Date(year, 1, 29).getMonth() == 1)
    //}
    // days since the birthdate
    var days = Math.floor((now.getTime() - birthDate.getTime())/1000/60/60/24);
    var age = 0;
    // iterate the years
    for (var y = birthDate.getFullYear(); y <= now.getFullYear(); y++){
      var daysInYear = isLeap(y) ? 366 : 365;
      if (days >= daysInYear){
        days -= daysInYear;
        age++;
        // increment the age only if there are available enough days for the year.
      }
    }
    return age;
  }
  $scope.Calc_Age = function(){
    $scope.selected.age = getAge($scope.selected.date_of_birth);
  }

}]);
