angular.module('lion.guardians.linc.data.factory', [])

.factory('LincDataFactory', [ 'LincServices',function(LincServices) {
  var initialized = false;
  var lions_filters = {
      'LionAge': {},
      'name_or_id': '', 'tag_features': '', 'location': {'latitude':'','longitude': '', 'radius': ''}, 'reverse': false, 'predicate': 'id',
      'PerPage': 0, 'currentPage': 0, 'isAgeCollapsed': true,
      'isOrgCollapsed': true, 'isNameIdCollapsed': false, 'isGenderCollapsed' : true,
      'isFeaturesCollapsed' : true, 'isLocationCollapsed': true, 'organization': [], 'genders': []
  };
  var imagesets_filters = {
      'LionAge': {},
      'name_or_id': '', 'tag_features': '', 'location': {'latitude':'','longitude': '', 'radius': ''}, 'reverse': false, 'predicate': 'id',
      'PerPage': 0, 'currentPage': 0, 'isAgeCollapsed': true,
      'isOrgCollapsed': true, 'isNameIdCollapsed': false, 'isGenderCollapsed' : true,
      'isFeaturesCollapsed' : true, 'isLocationCollapsed': true, 'organization': [], 'genders': []
  };
  var lions_cvreq_filters = {
      'LionAge': {},
      'name_or_id': '', 'tag_features': '', 'location': {'latitude':'','longitude': '', 'radius': ''}, 'reverse': false, 'predicate': 'id',
      'PerPage': 0, 'currentPage': 0, 'isAgeCollapsed': true,
      'isOrgCollapsed': true, 'isNameIdCollapsed': false, 'isGenderCollapsed' : true,
      'isFeaturesCollapsed' : true, 'isLocationCollapsed': true, 'organization': [], 'genders': []
  };
  var default_organizations = [];
  var default_genders = [];
  var default_age = {};
  if(!initialized){
    LincServices.Organizations().then(function (organizations){
      default_organizations =  _.map(organizations, function(element) {
        return _.extend({}, element, {checked: true});
      });
      lions_filters.organizations = angular.copy(default_organizations);
      imagesets_filters.organizations = angular.copy(default_organizations);
      lions_cvreq_filters.organizations = angular.copy(default_organizations);
    });
    default_genders = [{'name': 'male', 'label': 'Male', 'checked': true},{'name': 'female', 'label': 'Female', 'checked': true}, {'name': 'unknown', 'label': 'Unknown', 'checked': true}];
    lions_filters.genders = angular.copy(default_genders);
    imagesets_filters.genders = angular.copy(default_genders);
    lions_cvreq_filters.genders = angular.copy(default_genders);
    default_age = { 'min': 0, 'max': 30, 'options': {'ceil': 32, 'floor': 0 }};
    lions_filters.LionAge = angular.copy(default_age);
    imagesets_filters.LionAge = angular.copy(default_age);
    lions_cvreq_filters.LionAge = angular.copy(default_age);
  };
  return {
    get_defaults (){
      return ({"organizations": default_organizations, "genders": default_genders, "LionAge": default_age, "name_or_id": '', "tag_features" : '', 'location': {}, 'isAgeCollapsed': true,
      'isOrgCollapsed': true, 'isNameIdCollapsed': false, 'isGenderCollapsed' : true,
      'isFeaturesCollapsed' : true, 'isLocationCollapsed': true});
    },
    get_lions_filters: function () {
      return (lions_filters);
    },
    set_lions_filters: function (filter) {
      lions_filters = filter;
    },
    get_imagesets_filters: function () {
      return (imagesets_filters);
    },
    set_imagesets_filters: function (filter) {
      imagesets_filters = filter;
    },
    get_lions_cvreq_filters: function () {
      return (lions_cvreq_filters);
    },
    set_lions_cvreq_filters: function (filter) {
      lions_cvreq_filters = filter;
    }
  };
}])

.factory('LincApiDataFactory', [ 'LincApiServices',function(LincApiServices) {
  var initialized = false;
  var settings = {
      'Selected_tab': 'users',
      'users': {
        'reverse': false,
        'predicative': 'id',
        'Selecteds': [],
        'Mode': ''
      },
      'organizations': {
        'reverse': false,
        'predicative': 'id',
        'Selecteds': [],
        'Mode': ''
      },
      'lions': {
        'reverse': false,
        'predicative': 'id',
        'Selecteds': [],
        'Mode': ''
      },
      'imagesets': {
        'reverse': false,
        'predicative': 'id',
        'Selecteds': [],
        'Mode': ''
      },
      'images': {
        'reverse': false,
        'predicative': 'id',
        'Selecteds': [],
        'Mode': '',
        'currentPage': 0
      },
      'cvrequests': {
        'reverse': false,
        'predicative': 'id',
        'Selecteds': [],
        'Mode': ''
      },
      'cvresults': {
        'reverse': false,
        'predicative': 'id',
        'Selecteds': [],
        'Mode': ''
      }
  }

  return {
    get_settings: function () {
      return (settings);
    },
    set_settings: function (source) {
      settings = source;
    }
  };
}]);
