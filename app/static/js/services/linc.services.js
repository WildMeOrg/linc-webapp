angular.module('lion.guardians.services', [])

.factory('LincServices', ['$http', '$cacheFactory', '$q', '$cookies', 'NotificationFactory', function($http, $cacheFactory, $q, $cookies, NotificationFactory) {
  // cache
  var $httpcache = $cacheFactory.get('$http');
  // default get
  var HTTPCachedGet = function (url, config){
    var cache = $httpcache.get(url);
    var deferred = $q.defer();
    if(cache && cache.length>1){
      var responde = JSON.parse(cache[1]);
      deferred.resolve(responde);
    }
    else{
      angular.merge(config, {cache: true});
      $http.get(url, config)
      .success(function (response) {deferred.resolve(response);})
      .error(function (error) {deferred.reject(error);});
    }
    return deferred.promise;
  };

  var databases = {};
      databases['lions'] =         {label: 'Lions', url: '/lions'};
      databases['organizations'] = {label: 'Organizations',  url: '/organizations'};
      databases['imagesets'] =     {label: 'Imagesets', url: '/imagesets'};
      databases['images'] =        {label: 'Images', url: '/images'};
  // Get All Imagesets List
  var GetAllImageSets = function (id) {
    var deferred = $q.defer();
    var url = databases['imagesets'].url + '/list';
    HTTPCachedGet(url, {}).then(function (results) {
      deferred.resolve(results.data);
    },
    function (error) {
      NotificationFactory.error({
        title: "Error", message: 'Unable to load Imagesets data',
        position: 'right', // right, left, center
        duration: 5000   // milisecond
      });
      deferred.reject(error);
    });
    return deferred.promise;
  };
  // Get All Lions List
  var GetAllLions = function (id) {
    var deferred = $q.defer();
    var url = databases['lions'].url + '/list';
    HTTPCachedGet(url, {}).then(function (results) {
      deferred.resolve(results.data);
    },
    function (error) {
      NotificationFactory.error({
        title: "Error", message: 'Unable to load Lions datas',
        position: 'right', // right, left, center
        duration: 5000   // milisecond
      });
      deferred.reject(error);
    });
    return deferred.promise;
  };
  // Get All Organizations List
  var GetAllOrganizations = function (id) {
    var deferred = $q.defer();
    var url = databases['organizations'].url + '/list';
    HTTPCachedGet(url, {}).then(function (results) {
      deferred.resolve(results.data);
    },
    function (error) {
      NotificationFactory.error({
        title: "Error", message: 'Unable to load Lions data',
        position: 'right', // right, left, center
        duration: 5000   // milisecond
      });
      deferred.reject(error);
    });
    return deferred.promise;
  };
  // Get Imageset by Id
  var GetImageSet= function (id) {
    var deferred = $q.defer();
    var url = databases['imagesets'].url + '/' + id;
    HTTPCachedGet(url, {}).then(function (results) {
      deferred.resolve(results.data);
    },
    function (error) {
      NotificationFactory.error({
        title: "Error", message: 'Unable to load Imageset data',
        position: 'right', // right, left, center
        duration: 5000   // milisecond
      });
      deferred.reject(error);
    });
    return deferred.promise;
  };
  // Get Lion by Id
  var GetLion = function (id) {
    var deferred = $q.defer();
    var url = databases['lions'].url + '/' + id;
    HTTPCachedGet(url, {}).then(function (results) {
       deferred.resolve(results.data);
    },
    function (error) {
      NotificationFactory.error({
        title: "Error", message: 'Unable to load Lion data',
        position: 'right', // right, left, center
        duration: 5000   // milisecond
      });
      deferred.reject(error);
    });
    return deferred.promise;
  };
  // Get Lion History Locations
  var GetLocations = function (id) {
    var deferred = $q.defer();
    var url = databases['lions'].url + '/' + id + '/locations';
    HTTPCachedGet(url,{ignoreLoadingBar: true}).then(function (results) {
        deferred.resolve(results.data);
    },
    function (error) {
      NotificationFactory.error({
        title: "Error", message: 'Unable to load History Locations data',
        position: 'right', // right, left, center
        duration: 5000   // milisecond
      });
      deferred.reject(error);
    });
    return deferred.promise;
  };
  // Clean Caches
  var ClearAllCaches = function (fn) { $httpDefaultCache.removeAll(); };
  var ClearAllImagesetsCaches = function () { $httpcache.remove('/imagesets/list'); };
  var ClearImagesetProfileCache = function (id) { $httpcache.remove('/imagesets/' + id); };
  // Http without cache
  var HTTP = function (metod, url, data, config, success, error) {
    if(metod == 'GET'){ $http.get(url, config).then(success, error); }
    else{ var req = { method: metod, url: url, data: data, headers: { 'Content-Type': 'application/json'}, config: config}; $http(req).then(success, error); }
  }
  // Post Imageset (CV Request)
  var RequestCV = function (imageset_id, data, success) {
    var cookies = {'_xsrf': $cookies.get('_xsrf')};
    angular.merge(data, cookies);
    return HTTP('POST', '/imagesets/' + imageset_id + '/cvrequest', data, {}, success,
    function (error) {
      NotificationFactory.error({
        title: "Error", message: 'Request failed',
        position: 'right', // right, left, center
        duration: 5000   // milisecond
      });
      console.log(error);
    });
  };
  // Put ImageSet (Update Imageset)
  var PutImageSet = function (imageset_id, data, success){
    var cookies = {'_xsrf': $cookies.get('_xsrf')};
    angular.merge(data, cookies);
    return HTTP('PUT', '/imagesets/' + imageset_id, data, {}, success,
    function(error){
      NotificationFactory.error({
        title: "Error", message: 'Unable to Save ImageSet Datas',
        position: 'right', // right, left, center
        duration: 180000   // milisecond
      });
      console.log(error);
    });
  }
    // Post ImageSet - New Imageset
    var PostImageset = function (dados, success){
      var cookies = {'_xsrf': $cookies.get('_xsrf')};
      angular.merge(data, cookies);
      return HTTP('POST', '/imagesets', data, {}, success,
      function(error){
        NotificationFactory.error({
          title: "Error", message: "Unable to Post ImageSet's Data",
          position: 'right', // right, left, center
          duration: 180000   // milisecond
        });
        console.log(error);
      });
    };
  // Put Lion (Update Lion)
  var PutLion = function (lion_id, data, success){
    var cookies = {'_xsrf': $cookies.get('_xsrf')};
    angular.merge(data, cookies);
    return HTTP('PUT', '/lions/' + lion_id, data, {}, success,
    function(error){
      NotificationFactory.error({
        title: "Error", message: 'Unable to Save Lion Datas',
        position: 'right', // right, left, center
        duration: 180000   // milisecond
      });
      console.log(error);
    });
  }
    // Post Lion - New Lion
    var PostLion = function (dados, success){
      var cookies = {'_xsrf': $cookies.get('_xsrf')};
      angular.merge(data, cookies);
      return HTTP('POST', '/lion', data, {}, success,
      function(error){
        NotificationFactory.error({
          title: "Error", message: "Unable to Post Lion's Data",
          position: 'right', // right, left, center
          duration: 180000   // milisecond
        });
        console.log(error);
      });
    };







  var GetCVResults = function (cvresults_id) {
    var deferred = $q.defer();
    var url = '/cvresults/' + cvresults_id + '/list';
    HTTP('GET', url, null, {ignoreLoadingBar: true},
    function (results){
      var data = results.data.data.table;
      var associated_id = results.data.data.associated.id;
      var cvresults = _.map(data, function(element, index) {
        var elem = {};
        if(associated_id == element.id) elem["associated"] = true;
        else elem["associated"] = false;
        return _.extend({}, element, elem);
      });
      deferred.resolve(cvresults);
    }, function(error){
      NotificationFactory.error({
        title: "Error", message: 'Unable to load CV Results List',
        position: 'right', // right, left, center
        duration: 5000   // milisecond
      });
      deferred.reject(error);
    });
    return deferred.promise;
  };
  // Post CVResults - Request CV Results
  var PostCVResults = function (cvrequest_id, success){
    var cookies = {'_xsrf': $cookies.get('_xsrf')};
    var data = {"cvrequest_id":cvrequest_id};
    angular.merge(data, cookies);
    return HTTP('POST', '/cvresults', data, {}, success,
    function(error){
      NotificationFactory.error({
        title: "Error", message: 'Unable to Post CV Results',
        position: 'right', // right, left, center
        duration: 180000   // milisecond
      });
      console.log(error);
    });
  };
  // Put CVResults - Update Request CV Results
  var PutCVResults = function (cvrequest_id, success){
    var data = {'_xsrf': $cookies.get('_xsrf')};
    //var data = {"cvrequest_id":cvrequest_id};
    //angular.merge(data, cookies);
    return HTTP('PUT', '/cvresults/' + cvrequest_id, data, {}, success,
    function(error){
      NotificationFactory.error({
        title: "Error", message: 'Unable to Post CV Results',
        position: 'right', // right, left, center
        duration: 180000   // milisecond
      });
      console.log(error);
    });
  };
  // Delete CVRequest / CVResults
  var DeleteCVRequest = function (cvrequest_id, success){
    var data = {'_xsrf': $cookies.get('_xsrf')};
    //var data = {"cvrequest_id":cvrequest_id};
    //angular.merge(data, cookies);
    return HTTP('DELETE', '/cvrequest/' + cvrequest_id, data, {}, success,
    function(error){
      NotificationFactory.error({
        title: "Error", message: 'Unable to Delete CV Results/CVRequest',
        position: 'right', // right, left, center
        duration: 180000   // milisecond
      });
      console.log(error);
    });
  };

  var Login = function (data, success, error){
    var cookies = {'_xsrf': $cookies.get('_xsrf')};
    //var data = {"input_data": input_data};
    angular.merge(data, cookies);
    return HTTP('POST', '/login', data, {}, success, error);
  };

  var dataFactory = {};
  // List of ImageSets , Lions and Organizations
  dataFactory.Organizations = GetAllOrganizations;
  dataFactory.ImageSets = GetAllImageSets;
  dataFactory.Lions = GetAllLions;
  // ImageSet to ImageSet Profile
  dataFactory.ImageSet = GetImageSet;
  // Lion to lion Profile
  dataFactory.Lion = GetLion;
  // Location History
  dataFactory.LocationHistory = GetLocations;
  // Clean Caches
  dataFactory.ClearAllCaches = ClearAllCaches;
  dataFactory.ClearAllImagesetsCaches = ClearAllImagesetsCaches;
  dataFactory.ClearImagesetProfileCache = ClearImagesetProfileCache;
  // CV Request (Post Imageset w/ /request)
  dataFactory.requestCV = RequestCV;
  // Update Imageset
  dataFactory.Associate = PutImageSet;
  dataFactory.SaveImageset = PutImageSet;
  dataFactory.CreateImageset = PostImageset;

  // Update Lion
  dataFactory.SaveLion = PutLion;
  dataFactory.CreateLion = PostLion;

  // Get List of CV Results
  dataFactory.getCVResults = GetCVResults;
  // Post CV Results - Request Results
  dataFactory.postCVResults = PostCVResults;
  // Update Request CV Results
  dataFactory.putCVResults = PutCVResults;
  // Delete CV Results and CV Request
  dataFactory.deleteCVRequest = DeleteCVRequest;

    //dataFactory.getImageGalleries = GetImages;

  dataFactory.Login = Login;
  return dataFactory;
}])

;
