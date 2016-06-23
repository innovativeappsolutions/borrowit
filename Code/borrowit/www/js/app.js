// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'login.html'
      })
      .state('registrierung', {
        url: '/registrierung',
        templateUrl: 'registrierung.html'
      })
      .state('registrierung2', {
        url: '/registrierung2',
        templateUrl: 'registrierung2.html'
      })
      .state('anfrage_einsehen', {
        url: '/anfrage_einsehen',
        templateUrl: 'anfrage_einsehen.html'
      })
      .state('anfrage_erstellen', {
        url: '/anfrage_erstellen',
        templateUrl: 'anfrage_erstellen.html'
      })
      .state('profil_ansicht', {
        url: '/profil_ansicht',
        templateUrl: 'profil_ansicht.html'
      })
      .state('profil_einstellungen', {
        url: '/profil_einstellungen',
        templateUrl: 'profil_einstellungen.html'
      })
      .state('profil_aktivitaeten', {
        url: '/profil_aktivitaeten',
        templateUrl: 'profil_aktivitaeten.html'
      })
      .state('profil_anfrage', {
        url: '/profil_anfrage',
        templateUrl: 'profil_anfrage.html'
      })
      .state('kontakte', {
        url: '/kontakte',
        templateUrl: 'kontakte.html'
      })
      .state('kontakt_profil', {
        url: '/kontakt_profil',
        templateUrl: 'kontakt_profil.html'
      })
      .state('kontakt_hinzufuegen', {
        url: '/kontakt_hinzufuegen',
        templateUrl: 'kontakt_hinzufuegen.html'
      })
      .state('chat', {
        url: '/chat',
        templateUrl: 'chat.html'
      })
      .state('anfragenchat', {
        url: '/anfragenchat',
        templateUrl: 'anfragenchat.html'
      });
    $urlRouterProvider.otherwise('/login');
  })

  .controller("ToDoController", function($scope, $ionicPopup, $cordovaVibration, $cordovaCamera, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, FileService, ImageService){
    $scope.addresses = [
      { text: "Am Teckenberg 51", value: 1, street: "Am Teckenberg", number: "51", zip: "40883", city: "Ratingen", country:"Deutschland" },
      { text: "Berliner Straße 111", value: 2, street: "Berliner Straße", number: "111", zip: "40880", city: "Ratingen", country:"Deutschland" }
    ];

    $scope.data = {
      address: 1
    };

    $scope.checkboxes = {
      sofort : true
    };

    $scope.addAddress = function ()
    {
      $scope.popupData = {};
      var addAddressPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="popupData.newToDoTitle">' +
        '<div class="item item-input-inset">' +
          '<label class="item item-input-wrapper">' +
            '<input type="text" placeholder="Straße" ng-model="popupData.newAddressStreet"/>' +
          '</label>' +
          '<label class="item item-input-wrapper">' +
            '<input type="text" placeholder="Hausnummer" ng-model="popupData.newAddressNumber"/>' +
          '</label>' +
        '</div>' +
        '<div class="item item-input-inset">' +
          '<label class="item item-input-wrapper">' +
            '<input type="text" placeholder="PLZ" ng-model="popupData.newAddressZIP"/>' +
          '</label>' +
          '<label class="item item-input-wrapper">' +
            '<input type="text" placeholder="Ort" ng-model="popupData.newAddressCity"/>' +
          '</label>' +
        '</div>' +
        '<label class = "item item-input item-select item-light" ng-model="popupData.newAddressCountry">' +
          '<div class = "input-label">' +
            'Land' +
          '</div>' +
          '<select>' +
            '<option selected>Deutschland</option>' +
            '<option>Schweiz</option>' +
            '<option>Österreich</option>' +
            '<option>Bayern</option>' +
            '<option>Köln</option>' +
          '</select>' +
        '</label>',
        title: 'Neue Adresse anlegen',
        scope: $scope,
        buttons: [
          { text: 'Abbrechen'},
          {
            text: '<b>Anlegen</b>',
            type: 'button-positive',
            onTap: function(e) {
              if($scope.popupData.newAddressStreet != null &&
                $scope.popupData.newAddressNumber != null &&
                $scope.popupData.newAddressZIP != null &&
                $scope.popupData.newAddressCity != null){

                $scope.addresses.push({
                  text: $scope.popupData.newAddressStreet + " " + $scope.popupData.newAddressNumber,
                  value: $scope.addresses.length + 1,
                  street: $scope.popupData.newAddressStreet,
                  number: $scope.popupData.newAddressNumber,
                  zip: $scope.popupData.newAddressZIP,
                  city: $scope.popupData.newAddressCity,
                  country: $scope.popupData.newAddressCountry
                });
              }
            }
          },
        ]
      });
    };

    $scope.changePassword = function() {

      var promptPopup = $ionicPopup.prompt({
        title: 'Title',
        template: '<label class="item item-input"><input type="text" placeholder="Altes Passwort"></label></br>' +
        '<label class="item item-input"><input type="text" placeholder="Neues Passwort"></label></br>' +
        '<label class="item item-input"><input type="text" placeholder="Neues Passwort wdh."></label>'
      });

      promptPopup.then(function(res) {
        console.log(res);
      });

    };

    $scope.changePage = function(page)
    {
      this.nav.push(ItemDetailsPage, {
        item: item
      });
    }

    $ionicPlatform.ready(function() {
      $scope.images = FileService.images();
      $scope.$apply();
    });

    $scope.urlForImage = function(imageName) {
      var trueOrigin = cordova.file.dataDirectory + imageName;
      return trueOrigin;
    }

    $scope.addMedia = function() {
      $scope.hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Take photo' },
          { text: 'Photo from library' }
        ],
        titleText: 'Add images',
        cancelText: 'Cancel',
        buttonClicked: function(index) {
          $scope.addImage(index);
        }
      });
    }

    $scope.addImage = function(type) {
      $scope.hideSheet();
      ImageService.handleMediaDialog(type).then(function() {
        $scope.$apply();
      });
    }
  })

  //factories
  .factory('FileService', function($cordovaCamera, $q, $cordovaFile) {
    var images;
    var IMAGE_STORAGE_KEY = 'images';

    getImages = function() {
      var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
      if (img) {
        images = JSON.parse(img);
      } else {
        images = [];
      }
      return images;
    };

    addImage = function(img) {
      images.push(img);
      window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
    };

    return {
      storeImage: addImage,
      images: getImages
    }
  })

  .factory('ImageService', function($cordovaCamera, FileService, $q, $cordovaFile) {

    makeid = function() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    optionsForType = function(type) {
      var source;
      switch (type) {
        case 0:
          source = Camera.PictureSourceType.CAMERA;
          break;
        case 1:
          source = Camera.PictureSourceType.PHOTOLIBRARY;
          break;
      }
      return {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: source,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };
    }

    saveMedia = function(type) {
      return $q(function(resolve, reject) {
        var options = optionsForType(type);

        $cordovaCamera.getPicture(options).then(function(imageUrl) {
          var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
          var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
          var newName = makeid() + name;
          $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
            .then(function(info) {
              FileService.storeImage(newName);
              resolve();
            }, function(e) {
              reject();
            });
        });
      })
    }
    return {
      handleMediaDialog: saveMedia
    }
  });


