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
  .controller("ToDoController", function($scope, $ionicPopup, $cordovaVibration){
    //Contains the amount of done toDos;
    $scope.totalDone = 0;
    //Contains the ToDos
    $scope.toDos = [
      {
        title:"Müll rausbringen",
        done: false
      },
      {
        title:"Bild aufhängen",
        done: false
      },
      {
        title:"Staub saugen",
        done: false
      }
    ]

    $scope.checkDone = function (toDo){
      if(toDo.done)
        $cordovaVibration.vibrate(100);
    };

    /**
     * Calculates how many toDos are already done
     **/
    $scope.calculateDone = function (){

      $scope.totalDone = 0;

      for(var i in $scope.toDos)
      {
        if($scope.toDos[i].done)
          $scope.totalDone ++;
      }
    };

    /**
     *	Shows a popout to enter the new toDo's title
     **/
    $scope.createToDo = function ()
    {
      $scope.popupData = {};
      var toDoPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="popupData.newToDoTitle">',
        title: 'Neues ToDo anlegen',
        subTitle: 'Bitte geben Sie den Titel ein',
        scope: $scope,
        buttons: [
          { text: 'Abbrechen'},
          {
            text: '<b>Speichern</b>',
            type: 'button-positive',
            onTap: function(e) {
              if($scope.popupData.newToDoTitle != ""){

                $scope.toDos.push({
                  title: $scope.popupData.newToDoTitle,
                  done: false
                });
              }
            }
          },
        ]
      });
    };

    $scope.addresses = [
      {
        street:"Müll rausbringen",
        number: "12",
        zip:"43543",
        city:"Magdeburg",
        country:"Deutschland"
      }
    ]

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

    $scope.calculateDone();
  });
app.config(function($stateProvider, $urlRouterProvider) {
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
    });
  $urlRouterProvider.otherwise('/login');
});

app.controller('MainCtrl', function($scope) {

});
