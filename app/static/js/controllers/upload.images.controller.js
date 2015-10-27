'use strict';

angular.module('lion.guardians.upload.images.controller', ['lion.guardians.upload.images.directive', 'lion.guardians.thumbnail.directive'])

.controller('UploadImagesCtrl', ['$scope', '$window', 'FileUploader', function ($scope, $window, FileUploader) {
  $scope.title = 'Upload Images';
  $scope.content = 'Upload Images<br />Contents!';

  $scope.selectedImageType = "all";
  $scope.ImageTypes = [{"value":"all","label":"All"},
                      {"value":"cv","label":"CV Image"},
                      {"value":"body","label":"Full Body"},
                      {"value":"whisker","label":"Whisker"},
                      {"value":"markings","label":"Markings"},
                      {"value":"id","label":"General Id"}
                     ];
  $scope.selectedProperties = ["public", "cv"];
  $scope.ImageProperties = [{"value":"public","label":"Public"},
                            {"value":"cv","label":"Cover Image"}
                      ];
  var uploader = $scope.uploader = new FileUploader({
    url: 'https://angular-file-upload-cors-srv.appspot.com/upload'
  });

  // FILTERS
  uploader.filters.push({
    name: 'imageFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  });
  // CALLBACKS
  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
    console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
    console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
  };

  console.info('uploader', uploader);
}])