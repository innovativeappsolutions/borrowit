//angular.module('starter', ['ionic','starter.controllers','starter.services','ngCordova'])
//
//  .run(function($ionicPlatform) {
//    $ionicPlatform.ready(function() {
//      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//      // for form inputs)
//      if(window.cordova && window.cordova.plugins.Keyboard) {
//        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//      }
//      if(window.StatusBar) {
//        StatusBar.styleDefault();
//      }
//    });
//  });
//
//angular.module('starter.controllers', [])
//
//  .controller('MainCtrl', function($scope, Events,$ionicPlatform,$cordovaCalendar,$timeout) {
//
//    $ionicPlatform.ready(function() {
//      Events.get().then(function(events) {
//        console.log("events", JSON.stringify(events));
//        $scope.events = events;
//      });
//    });
//
//    $scope.addEvent = function(event,idx) {
//      console.log("add ",event);
//
//      Events.add(event).then(function(result) {
//        console.log("done adding event, result is "+result);
//        if(result === 1) {
//          //update the event
//          $timeout(function() {
//            $scope.events[idx].status = true;
//            $scope.$apply();
//          });
//        } else {
//          //For now... maybe just tell the user it didn't work?
//        }
//      });
//
//
//    };
//
//  });
//
//angular.module('starter.services', [])
//
//  .factory('Events', function($q,$cordovaCalendar) {
//
//    //kind of a hack
//    var incrementDate = function (date, amount) {
//      var tmpDate = new Date(date);
//      tmpDate.setDate(tmpDate.getDate() + amount);
//      tmpDate.setHours(13);
//      tmpDate.setMinutes(0);
//      tmpDate.setSeconds(0);
//      tmpDate.setMilliseconds(0);
//      return tmpDate;
//    };
//
//    var incrementHour = function(date, amount) {
//      var tmpDate = new Date(date);
//      tmpDate.setHours(tmpDate.getHours() + amount);
//      return tmpDate;
//    };
//
//    //create fake events, but make it dynamic so they are in the next week
//    var fakeEvents = [];
//    fakeEvents.push(
//      {
//        "title":"Meetup on Ionic",
//        "description":"We'll talk about beer, not Ionic.",
//        "date":incrementDate(new Date(), 1)
//      }
//    );
//    fakeEvents.push(
//      {
//        "title":"Meetup on Beer",
//        "description":"We'll talk about Ionic, not Beer.",
//        "date":incrementDate(new Date(), 2)
//      }
//    );
//    fakeEvents.push(
//      {
//        "title":"Ray's Birthday Bash",
//        "description":"Celebrate the awesomeness of Ray",
//        "date":incrementDate(new Date(), 4)
//      }
//    );
//    fakeEvents.push(
//      {
//        "title":"Code Review",
//        "description":"Let's tear apart Ray's code.",
//        "date":incrementDate(new Date(), 5)
//      }
//    );
//
//    var getEvents = function() {
//      var deferred = $q.defer();
//
//      /*
//       Logic is:
//       For each, see if it exists an event.
//       */
//      var promises = [];
//      fakeEvents.forEach(function(ev) {
//        //add enddate as 1 hour plus
//        ev.enddate = incrementHour(ev.date, 1);
//        console.log('try to find '+JSON.stringify(ev));
//        promises.push($cordovaCalendar.findEvent({
//          title:ev.title,
//          startDate:ev.date
//        }));
//      });
//
//      $q.all(promises).then(function(results) {
//        console.log("in the all done");
//        //should be the same len as events
//        for(var i=0;i<results.length;i++) {
//          fakeEvents[i].status = results[i].length === 1;
//        }
//        deferred.resolve(fakeEvents);
//      });
//
//      return deferred.promise;
//    }
//
//    var addEvent = function(event) {
//      var deferred = $q.defer();
//
//      $cordovaCalendar.createEvent({
//        title: event.title,
//        notes: event.description,
//        startDate: event.date,
//        endDate:event.enddate
//      }).then(function (result) {
//        console.log('success');console.dir(result);
//        deferred.resolve(1);
//      }, function (err) {
//        console.log('error');console.dir(err);
//        deferred.resolve(0);
//      });
//
//      return deferred.promise;
//
//    }
//
//    return {
//      get:getEvents,
//      add:addEvent
//    };
//
//  });

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova', 'angularMoment', 'satellizer', 'ngCookies'])

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

  .config(['$ionicConfigProvider', '$authProvider', '$stateProvider', '$urlRouterProvider', function ( $ionicConfigProvider, $authProvider, $stateProvider, $urlRouterProvider) {
    $authProvider.facebook({
      clientId: '1577756505877617',
      responseType: 'token'
    });

    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'LoginCtrl'
      })
      .state('registrierung', {
        url: '/registrierung',
        templateUrl: 'registrierung.html',
        controller: 'LoginCtrl'
      })
      .state('registrierung2', {
        url: '/registrierung2',
        templateUrl: 'registrierung2.html',
        controller: 'LoginCtrl'
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
      .state('adressen', {
        url: '/adressen',
        templateUrl: 'adressen.html'
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
      .state('kontakt_hinzufuegen_name', {
        url: '/kontakt_hinzufuegen_name',
        templateUrl: 'kontakt_hinzufuegen_name.html'
      })
      .state('kontakt_hinzufuegen_ort', {
        url: '/kontakt_hinzufuegen_ort',
        templateUrl: 'kontakt_hinzufuegen_ort.html'
      })
      .state('kontakt_hinzufuegen_geraet', {
        url: '/kontakt_hinzufuegen_geraet',
        templateUrl: 'kontakt_hinzufuegen_geraet.html'
      })
      .state('chat', {
        url: '/chat',
        templateUrl: 'chat.html'
      })
      .state('anfragenchat', {
        url: '/anfragenchat',
        templateUrl: 'anfragenchat.html',
        controller: 'UserMessagesCtrl'
      });
    //profile = JSON.parse(window.localStorage.getItem("profile"));
    if(JSON.parse(window.localStorage.getItem("profile")))//!= undefined && window.localStorage.getItem("password") != undefined)
      $urlRouterProvider.otherwise('/');
    else
      $urlRouterProvider.otherwise('/login');
  }])

  .controller('UserMessagesCtrl',
    function($scope, $rootScope, $state, $stateParams, MockService,
             $ionicActionSheet,
             $ionicPopup, $ionicScrollDelegate, $timeout, $interval, ProfileService) {

      // mock acquiring data via $stateParams
      $scope.toUser = ProfileService.toUser;

      // this could be on $rootScope rather than in $stateParams
      //$scope.user = ProfileService;

      $scope.input = {
        message: localStorage['userMessage-' + $scope.toUser.username] || ''
      };

      var messageCheckTimer;

      var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
      var footerBar; // gets set in $ionicView.enter
      var scroller;
      var txtInput; // ^^^

      $scope.$on('$ionicView.enter', function() {
        console.log('UserMessages $ionicView.enter');

        //getMessages();
        $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);

        $timeout(function() {
          footerBar = document.body.querySelector('#userMessagesView .bar-footer');
          scroller = document.body.querySelector('#userMessagesView .scroll-content');
          txtInput = angular.element(footerBar.querySelector('textarea'));
        }, 0);

        messageCheckTimer = $interval(function() {
          // here you could check for new messages if your app doesn't use push notifications or user disabled them
        }, 20000);
      });

      $scope.$on('$ionicView.leave', function() {
        console.log('leaving UserMessages view, destroying interval');
        // Make sure that the interval is destroyed
        if (angular.isDefined(messageCheckTimer)) {
          $interval.cancel(messageCheckTimer);
          messageCheckTimer = undefined;
        }
      });

      $scope.$on('$ionicView.beforeLeave', function() {
        if (!$scope.input.message || $scope.input.message === '') {
          localStorage.removeItem('userMessage-' + $scope.toUser.username);
        }
      });

      /*function getMessages() {
        // the service is mock but you would probably pass the toUser's GUID here
        MockService.getUserMessages({
          toUserId: $scope.toUser.username
        }).then(function(data) {
          $scope.doneLoading = true;
          $scope.messages = data.messages;

          $timeout(function() {
            viewScroll.scrollBottom();
          }, 0);
        });
      }*/

      $scope.$watch('input.message', function(newValue, oldValue) {
        console.log('input.message $watch, newValue ' + newValue);
        if (!newValue) newValue = '';
        localStorage['userMessage-' + $scope.toUser.username] = newValue;
      });

      $scope.sendMessage = function(sendMessageForm) {
        var message = {
          text: $scope.input.message
        };

        // if you do a web service call this will be needed as well as before the viewScroll calls
        // you can't see the effect of this in the browser it needs to be used on a real device
        // for some reason the one time blur event is not firing in the browser but does on devices
        keepKeyboardOpen();

        //MockService.sendMessage(message).then(function(data) {
        $scope.input.message = '';

        message.id = new Date().getTime(); // :~)
        message.date = new Date();
        message.username = $scope.profile.username;
        message.picture = $scope.profile.picture;

        $scope.chats[$scope.values.actualChat].messages.push(message);
        window.localStorage.setItem("chats", JSON.stringify($scope.chats));

        $timeout(function() {
          keepKeyboardOpen();
          viewScroll.scrollBottom(true);
        }, 0);

        $timeout(function() {
          $scope.chats[$scope.values.actualChat].messages.push(MockService.getMockMessage());
          window.localStorage.setItem("chats", JSON.stringify($scope.chats));
          keepKeyboardOpen();
          viewScroll.scrollBottom(true);
        }, 2000);

        //});
      };

      // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
      function keepKeyboardOpen() {
        console.log('keepKeyboardOpen');
        txtInput.one('blur', function() {
          console.log('textarea blur, focus back on it');
          txtInput[0].focus();
        });
      }

      $scope.onMessageHold = function(e, itemIndex, message) {
        console.log('onMessageHold');
        console.log('message: ' + JSON.stringify(message, null, 2));
        $ionicActionSheet.show({
          buttons: [{
            text: 'Copy Text',
            type: 'button-borrowitblau'
          }, {
            text: 'Delete Message',
            type: 'button-borrowitgrau'
          }],
          buttonClicked: function(index) {
            switch (index) {
              case 0: // Copy Text
                //cordova.plugins.clipboard.copy(message.text);

                break;
              case 1: // Delete
                // no server side secrets here :~)
                $scope.messages.splice(itemIndex, 1);
                $timeout(function() {
                  viewScroll.resize();
                }, 0);

                break;
            }

            return true;
          }
        });
      };

      // this prob seems weird here but I have reasons for this in my app, secret!
      $scope.viewProfile = function(msg) {
        if (msg.username === $scope.profile.username) {
          vindow.location = "#/profil_ansicht";
        } else {
          // go to other users profile
        }
      };

      // I emit this event from the monospaced.elastic directive, read line 480
      $scope.$on('taResize', function(e, ta) {
        console.log('taResize');
        if (!ta) return;

        var taHeight = ta[0].offsetHeight;
        console.log('taHeight: ' + taHeight);

        if (!footerBar) return;

        var newFooterHeight = taHeight + 10;
        newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

        footerBar.style.height = newFooterHeight + 'px';
        scroller.style.bottom = newFooterHeight + 'px';
      });

    })

  .controller('LoginCtrl',['$scope', '$http','$auth', 'ProfileService', function($scope, $http, $auth, ProfileService) {
    var HOST = "https://sb.pftclan.de";
    var PORT = 546;
    var URL = HOST + ":" + PORT + "/api/smartbackend/";
    var salt;

    sha512 = function(password, salt){
      var hash = window.CryptoJS.HmacSHA512(password, salt).toString(); /** Hashing algorithm sha512 */
      return hash;
    };

    createSalt = function() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < 64; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    signup = function(provider){
      salt = ProfileService.profile.email;
      ProfileService.profile.password = sha512(ProfileService.profile.password, salt);  // THERE IS NO GUARANTEE THAT THE SALT IS CORRECT MAY ITS A RANDOM SALT FOR SAFTEY IF EMAIL ISNT CORRECT
      ProfileService.profile.salt = salt;
      $http({method: "POST", url:URL + "auth/signup", params:{email:ProfileService.profile.email,password: ProfileService.profile.password}})
        .then(function(result) {
          ProfileService.profile.access_token = result.data.access_token;
          $http.defaults.headers.common['Authorization'] = "Bearer "+ ProfileService.profile.access_token;
        },function(error) {
          // toSomething
        })
    }

    login = function(provider){
      if(provider==="email"){
        //SENT EMAIL TO SERVER GET A SALT
        ProfileService.profile.password = sha512(ProfileService.profile.password,  ProfileService.profile.salt);  // THERE IS NO GUARANTEE THAT THE SALT IS CORRECT MAY ITS A RANDOM SALT FOR SAFTEY IF EMAIL ISNT CORRECT
        $http({method: "POST", url:URL + "auth/email", params:{email:ProfileService.profile.email,password: ProfileService.profile.password}})
          .then(function(result) {
            ProfileService.profile.access_token = result.data.access_token;
            $http.defaults.headers.common['Authorization'] = "Bearer "+ ProfileService.profile.access_token;
          },function(error) {
            // toSomething
          })
      }
    }

    authenticate = function(provider){
      if(provider==="facebook"){
        $auth.authenticate(provider).then(function(response) {
          console.log($auth.getToken());
          console.log($auth.getPayload());
          $http({method: "GET", url:URL + "auth/" + provider + "/", params:{id_token: $auth.getToken()}})
            .then(function(result) {
                console.log('yes im ok');
              },function(error) {
                console.log('Error: ' + error);
              }
            )
            .catch(function(response) {
              userService.SocialLoginFailed();
            });
        })
      }
    }


    $scope.textboxes = {

    }

    $scope.registerFirstPart = function()
    {
      if($scope.textboxes.username != null &&
        $scope.textboxes.lastname != null &&
        $scope.textboxes.firstname != null &&
        $scope.textboxes.email != null &&
        $scope.textboxes.telefon != null &&
        $scope.textboxes.password != null &&
        $scope.textboxes.passwordrep != null &&
        $scope.textboxes.password == $scope.textboxes.passwordrep)
      {
        ProfileService.profile.username = $scope.textboxes.username;
        ProfileService.profile.lastname = $scope.textboxes.lastname;
        ProfileService.profile.firstname = $scope.textboxes.firstname;
        ProfileService.profile.email = $scope.textboxes.email;
        ProfileService.profile.telefon = $scope.textboxes.telefon;
        ProfileService.profile.password = $scope.textboxes.password;
        ProfileService.profile.addresses = [];
        ProfileService.profile.actualAddress = 0;
        window.location = '#/registrierung2';
      }
    }

    $scope.registerSecondPart = function()
    {
      if($scope.profile.addresses != null &&
        $scope.profile.addresses.length > 0)
      {
        window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
        //signup("email", $scope.profile.email, $scope.profile.password);
        window.location = '#/';
      }
    }

    $scope.login = function(username, password) {
      //ProfileService.profile.username = username;
      //ProfileService.profile.password = password;
      //window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
      ProfileService.profile = JSON.parse(window.localStorage.getItem("profile"));
    };

    $scope.checkLogin = function() {

      //$http.get("https://api.example.com/profile", { params: { "api_key": "some_key_here" } })
        //.success(function(data) {
          //if(data.username == $scope.TextboxUsernameLogin && data.password == $scope.TextboxPasswordLogin) {
            $scope.login($scope.textboxes.TextboxEmail, $scope.textboxes.TextboxPassword);
            window.location = '#/';
          //}
          //else
            //showLoginError(true);
        //})
        //.error(function(data) {
          //showLoginError(false);
        //});
    }

    $scope.showLoginError = function(wrongPassword)
    {
      $scope.popupData = {};
      if(wrongPassword)
        var showLoginErrorPopup = $ionicPopup.show({
          template: 'Dein Benutzername und/oder dein Passwort ist falsch. Bitte versuche es erneut',
          title: 'Fehler beim Anmelden',
          scope: $scope,
          buttons: [
            {
              text: 'OK',
              type: 'button-borrowitblau'
            }
          ]
        });
      else
        var showLoginErrorPopup = $ionicPopup.show({
          template: 'Du hast keine Verbindung zum Server. Bitte überprüfe deine Verbindung zum Internet',
          title: 'Fehler beim Anmelden',
          scope: $scope,
          buttons: [
            {
              text: 'OK',
              type: 'button-borrowitblau'
            }
          ]
        });
    };
  }])

  .controller("ToDoController", function($scope, $ionicPopup, $cordovaVibration, $cordovaCamera, $cordovaDevice, $cordovaFile, $cordovaContacts, $ionicPlatform, $ionicActionSheet, ImageService, ProfileService, ResultService){
    /*$scope.addContact = function() {
      $cordovaContacts.save($scope.contactForm).then(function(result) {
        // Contact saved
      }, function(err) {
        // Contact error
      });
    };*/
    $scope.searchEvents = function(startDate, startTime, endDate, endTime) {
      $cordovaCalendar.findEvent({
        title:ev.title,
        startDate:ev.date
      })
    }

    $scope.startRequest = function() {
      var newRequest;
      if($scope.values.sofort)
      {
        newRequest.startDate = new Date();
      }
      else
      {
        newRequest.startDate = $scope.textboxes.startDate;
        newRequest.startTime = $scope.textboxes.startTime;
      }
      newRequest.title = $scope.textboxes.requestTitle;
      newRequest.description = $scope.textboxes.requestDescription;
      newRequest.endDate = $scope.textboxes.endDate;
      newRequest.endTime = $scope.textboxes.endTime;
      newRequest.category = $scope.textboxes.category;
    }

    $scope.deleteProfile = function() {
      window.localStorage.removeItem('profile');
      window.location = "#/login";
    }

    $scope.addContact = function(person){
      ProfileService.profile.contacts.push(person);
    }

    $scope.getAllContacts = function() {
      $cordovaContacts.find().then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
        //var devConts = allContacts;
        $scope.deviceContacts = contactsFound;
      });
      for(var i = 0; i < devConts.length; i++)
      {
        //ask Backend, if devConts[i].phoneNumbers already is signed up
      }
    };

    $scope.findContactsBySearchTerm = function (searchTerm) {
      var opts = {
        multiple: true
      };

      $cordovaContacts.find(opts).then(function (contactsFound) {
        $scope.deviceContacts = contactsFound;
      });
    }

    $scope.pickContactUsingNativeUI = function () {
      $cordovaContacts.pickContact().then(function (contactPicked) {
        $scope.deviceContact = contactPicked;
      });
    }


    $scope.logout = function() {
      window.localStorage.removeItem("profile");
    };

    $scope.values = {
      sofort : true,
      chosenRequest : 0,
      chosenPerson : 0,
      chosenSortedBy : "startDate",
      chosenCategory : "all",
      actualChat: 0
    };

    $scope.watchRequest = function(request)
    {
      $scope.values.chosenRequest = request;
    }

    $scope.watchRequestById = function(requestID)
    {
      for(var i = 0; i < $scope.requests.length; i++) {
        if($scope.requests[i].id == requestID) {
          $scope.values.chosenRequest = $scope.requests[i].value;
        }
      }
    }

    $scope.watchContact = function(contactname)
    {
      for(var i = 0; i < $scope.persons.length; i++)
      {
        if(contactname === $scope.persons[i].username) {
          $scope.values.chosenPerson = i;
          break;
        }
      }
      window.location = "#/kontakt_profil";
    }

    $scope.alreadyContact = function(person)
    {
      var isContact = false;
      for(var i = 0; i < $scope.profile.contacts.length; i++)
      {
        if($scope.profile.contacts[i].username === person.username)
        {
          isContact = true;
          break;
        }
      }
      return isContact;
    }

    $scope.borrowit = function(request) {
      $scope.requests[request.value].borrowed = true;
      window.location = "#/"
    }


    $scope.watchChat = function(reqID)
    {
      var request;
      for(var i = 0; i < $scope.requests.length; i++) {
        if ($scope.requests[i].id == reqID) {
          $scope.values.chosenRequest = i;
          request = $scope.requests[i];
          break;
        }
      }
      if(!$scope.checkChatStarted(reqID))
      {
        $scope.chats.push({
          requestid: reqID,
          title: request.title,
          profile: request.profile,
          value: $scope.chats.length,
          messages: []
        })
        $scope.values.actualChat = $scope.chats.length - 1;
      }
      ProfileService.toUser.username = request.profile.username;
      ProfileService.toUser.picture = request.profile.picture;
    }

    $scope.checkChatStarted = function(reqID)
    {
      var started = false;
      for(var i = 0; i < $scope.chats.length; i++)
      {
        if($scope.chats[i].requestid == reqID)
        {
          started = true;
          $scope.values.actualChat = i;
          break;
        }
      }
      return started;
    }

    $scope.persons = [
      {
        username: "JennyS",
        rating: 4,
        picture: "img/icons/grey_woman.png",
        requests: [{id: "igujcgapiudcjksd", title: "Gesucht: Schaufel", requested: true}, {id: "hf8923ü4whofnüsdioacnce489ogiaehrljg", title: "Pfanne bitte!", requested: true}],
        value: 0
      },
      {
        username: "BeneS",
        rating: 5,
        picture: "img/icons/black_avatar.png",
        requests: [{id: "puif8657oti8f6tz", title: "Waffeleisen benötigt", requested: true}],
        value: 1
      },
      {
        username: "DennisR",
        rating: 2,
        picture: "img/icons/black_avatar.png",
        requests: [{id: "oihajsfiohsdfhs", title: "Grillkohle benötigt", requested: false}],
        value: 2
      },
      {
        username: "PeterP",
        rating: 1,
        picture: "img/icons/black_home.png",
        requests: [{id: "jhfkskdfbcjxkenru", title: "Gesucht: Plastikbesteck", requested: false},{id: "ioüwhdfioüasdfpjiasdasuidh", title: "Gesucht: Plastikbecher", requested: true}],
        value: 3
      }
    ]

    $scope.requests = [
      {
        id: "puif8657oti8f6tz",
        title: "Waffeleisen benötigt",
        description: "Ich möchte mir ein Waffeleisen ausleihen. Ich habe ein tolles neues Rezept. Sehr gerne kannst du auch eine Waffel haben.",
        profile: {username: "BeneS", picture: "img/icons/black_avatar.png", rating: 5},
        place: "Düsseldorf",
        startDate: "30.06.2016",
        endDate: "31.06.2016",
        category: "food",
        value: 0,
        borrowed: false
      },
      {
        id: "oihajsfiohsdfhs",
        title: "Grillkohle benötigt",
        description: "Ich möchte meine Nachbarschaft zum Grillen einladen, habe aber die Grillkohle vergessen. Du kannst gerne dazukommen, wenn du welche mitbringst. Für Grillgut ist gesorgt.",
        profile: {username: "DennisR", picture: "img/icons/black_avatar.png", rating: 2},
        place: "Saarland",
        startDate: "01.07.2016",
        endDate: "01.07.2016",
        category: "food",
        value: 1,
        borrowed: false
      },
      {
        id: "igujcgapiudcjksd",
        title: "Gesucht: Schaufel",
        description: "Ich habe festgestellt, dass mein Garten dringend mal umgegraben werden muss. Dafür benötige ich eine Schaufel. Danke im Voraus :)",
        profile: {username: "JennyS", picture: "img/icons/grey_woman.png", rating: 4},
        place: "Irgendwo im Nirgendwo",
        startDate: "01.07.2016",
        endDate: "01.07.2016",
        category: "home",
        value: 2,
        borrowed: false
      },
      {
        id: "jhfkskdfbcjxkenru",
        title: "Gesucht: Plastikbesteck",
        description: "Ich habe festgestellt, dass ich für meine Gartenparty kein Besteck habe. Wer kann mir was leihen?",
        profile: {username: "PeterP", picture: "img/icons/black_home.png", rating: 1},
        place: "Nimmerland",
        startDate: "01.06.2016",
        endDate: "01.07.2016",
        category: "food",
        value: 3,
        borrowed: false
      },
      {
        id: "ioüwhdfioüasdfpjiasdasuidh",
        title: "Gesucht: Plastikbecher",
        description: "Ich habe festgestellt, dass ich für meine Gartenparty keine Becher habe. Wer kann mir was leihen?",
        profile: {username: "PeterP", picture: "img/icons/black_home.png", rating: 1},
        place: "Nimmerland",
        startDate: "01.06.2016",
        endDate: "01.07.2016",
        category: "food",
        value: 4,
        borrowed: false
      },
      {
        id: "zf889234fhüq03e9uag4",
        title: "Tischtennisschläger leihen",
        description: "Ich bräuchte Schläger zum Spielen",
        profile: {username: "MarcS.", picture: "img/icons/black_avatar.png", rating: 5},
        place: "Ratingen",
        startDate: "01.05.2016",
        endDate: "01.09.2016",
        category: "food",
        value: 5,
        borrowed: false
      },
      {
        id: "hf8923ü4whofnüsdioacnce489ogiaehrljg",
        title: "Pfanne bitte!",
        description: "Ich möchte gerne kochen",
        profile: {username: "JennyS", picture: "img/icons/black_avatar.png", rating: 5},
        place: "Ratingen",
        startDate: "14.06.2016",
        endDate: "01.07.2017",
        category: "food",
        value: 6,
        borrowed: true
      }
    ];

    if (JSON.parse(window.localStorage.getItem("chats")) != undefined) {
      $scope.chats = JSON.parse(window.localStorage.getItem("chats"));
      //$scope.chats = [];
      //window.localStorage.setItem("chats", JSON.stringify($scope.chats));
    }
    else
      $scope.chats = [];

    $scope.profile = ProfileService.profile;

    $scope.addAddress = function ()
    {
      $scope.popupData = {};
      var addAddressPopup = $ionicPopup.show({
        template:
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
        '<label class = "item item-input item-select item-light">' +
          '<div class = "input-label">' +
            'Land' +
          '</div>' +
          '<select ng-model="popupData.newAddressCountry">' +
            '<option ng-selected="selected">Deutschland</option>' +
            '<option>Schweiz</option>' +
            '<option>Österreich</option>' +
            '<option>Bayern</option>' +
            '<option>Köln</option>' +
          '</select>' +
        '</label>',
        title: 'Neue Adresse anlegen',
        scope: $scope,
        buttons: [
          {
            text: 'Abbrechen',
            type: 'button-borrowitgrau'
          },
          {
            text: '<b>Anlegen</b>',
            type: 'button-borrowitblau',
            onTap: function(e) {
              if($scope.popupData.newAddressStreet != null &&
                $scope.popupData.newAddressNumber != null &&
                $scope.popupData.newAddressZIP != null &&
                $scope.popupData.newAddressCity != null &&
                $scope.popupData.newAddressCountry != null){

                ProfileService.profile.addresses.push({
                  text: $scope.popupData.newAddressStreet + " " + $scope.popupData.newAddressNumber,
                  value: ProfileService.profile.addresses.length,
                  street: $scope.popupData.newAddressStreet,
                  number: $scope.popupData.newAddressNumber,
                  zip: $scope.popupData.newAddressZIP,
                  city: $scope.popupData.newAddressCity,
                  country: $scope.popupData.newAddressCountry
                });
                window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
              }
            }
          },
        ]
      });
    };

    $scope.deleteAddress = function(address)
    {
      if(address + 1 == ProfileService.profile.addresses.length)
      {
        ProfileService.profile.actualAddress--;
      }
      ProfileService.profile.addresses.splice(address,1);
      for (var i = 0; i < ProfileService.profile.addresses.length; i++)
      {
        ProfileService.profile.addresses[i].value = i;
      }
      window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
    }

    $scope.changeAddress = function(address)
    {
      $scope.popupData = {};
      chosenAddress = $scope.addresses[address].street
      var addAddressPopup = $ionicPopup.show({
        template:
        '<div class="item item-input-inset">' +
          '<label class="item item-input-wrapper">' +
            '<input type="text" placeholder="Straße" ng-model="popupData.newAddressStreet"/>' +
          '</label>' +
          '<label class="item item-input-wrapper">' +
            '<input type="text" content=chosenAddress.number ng-model="popupData.newAddressNumber"/>' +
          '</label>' +
        '</div>' +
        '<div class="item item-input-inset">' +
          '<label class="item item-input-wrapper">' +
           '<input type="text" content=chosenAddress.ZIP ng-model="popupData.newAddressZIP"/>' +
          '</label>' +
          '<label class="item item-input-wrapper">' +
            '<input type="text" content=chosenAddress.city ng-model="popupData.newAddressCity"/>' +
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
          {
            text: 'Abbrechen',
            type: 'button-borrowitgrau'
          },
          {
            text: '<b>Anlegen</b>',
            type: 'button-borrowitblau',
            onTap: function(e) {
              if($scope.popupData.newAddressStreet != null &&
                $scope.popupData.newAddressNumber != null &&
                $scope.popupData.newAddressZIP != null &&
                $scope.popupData.newAddressCity != null){

                ProfileService.profile.addresses.push({
                  text: $scope.popupData.newAddressStreet + " " + $scope.popupData.newAddressNumber,
                  value: address,
                  street: $scope.popupData.newAddressStreet,
                  number: $scope.popupData.newAddressNumber,
                  zip: $scope.popupData.newAddressZIP,
                  city: $scope.popupData.newAddressCity,
                  country: $scope.popupData.newAddressCountry
                });
                window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
              }
            }
          },
        ]
      });
    };

    $scope.changePassword = function() {
      $scope.popupData = {};
      var promptPopup = $ionicPopup.prompt({
        template:
        '<label class="item item-input"><input type="password" placeholder="Altes Passwort" ng-model="popupData.oldPW"></label></br>' +
        '<label class="item item-input"><input type="password" placeholder="Neues Passwort" ng-model="popupData.newPW"></label></br>' +
        '<label class="item item-input"><input type="password" placeholder="Neues Passwort wdh." ng-model="popupData.newPWrep"></label>',
        title: 'Passwort ändern',
        scope: $scope,
        buttons: [
          {
            text: 'Abbrechen',
            type: 'button-borrowitgrau'
          },
          {
            text: '<b>Ändern</b>',
            type: 'button-borrowitblau',
            onTap: function(e) {
              if($scope.popupData.oldPW == ProfileService.profile.password)
              {
                if($scope.popupData.newPW != null && $scope.popupData.newPWrep != null && $scope.popupData.newPW === $scope.popupData.newPWrep) {
                  ProfileService.profile.password = $scope.popupData.newPW;
                  window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
                  ResultService.changedPassword(0);
                }
                else
                {
                  ResultService.changedPassword(2);
                }
              }
              else
              {
                ResultService.changedPassword(1);
              }
            }
          },
        ]
      });

      promptPopup.then(function(res) {
        console.log(res);
      });

    };

    $scope.changeProfile = function() {
      $scope.popupData = {};
      var promptPopup = $ionicPopup.prompt({
        title: 'Profil ändern',
        template:
          '<label class="item item-input">' +
            '<input type="text" placeholder="Nachname" ng-model="popupData.lastname">' +
          '</label>' +
          '<label class="item item-input">' +
            '<input type="text" placeholder="Vorname" ng-model="popupData.firstname">' +
          '</label>' +
          '<label class="item item-input">' +
          '<input type="email" placeholder="E-Mail" ng-model="popupData.email">' +
          '</label>' +
          '<label class="item item-input">' +
          '<input type="tel" placeholder="Telefonnummer" ng-model="popupData.telefon">' +
          '</label>',
        scope: $scope,
        buttons: [
          {
            text: 'Abbrechen',
            type: 'button-borrowitgrau'
          },
          {
            text: '<b>Ändern</b>',
            type: 'button-borrowitblau',
            onTap: function(e) {
              if($scope.popupData.lastname != null &&
                $scope.popupData.firstname != null &&
                $scope.popupData.email != null &&
                $scope.popupData.telefon != null){
                ProfileService.profile.lastname = $scope.popupData.lastname;
                ProfileService.profile.firstname = $scope.popupData.firstname;
                ProfileService.profile.email = $scope.popupData.email;
                ProfileService.profile.telefon = $scope.popupData.telefon;
                window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
                ResultService.changedProfile(0);
              }
              else
              {
                ResultService.changedProfile(1);
              }
            }
          },
        ]
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
          $scope.profile = ProfileService.profile;
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

  .factory('ImageService', function($cordovaCamera, ProfileService, $q, $cordovaFile) {
    //var image = 'http://ionicframework.com/img/docs/venkman.jpg';
    //var IMAGE_STORAGE_KEY = 'image';
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
        //window.localStorage.setItem(IMAGE_STORAGE_KEY, image);
        var options = optionsForType(type);

        $cordovaCamera.getPicture(options).then(function(imageUrl) {
          var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
          var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
          var newName = makeid() + name;
          $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
            .then(function(info) {
              ProfileService.storeImage(newName);
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
  })

  .factory('ProfileService', function() {
    var profile;

    if(JSON.parse(window.localStorage.getItem("profile")) != undefined)
      profile = JSON.parse(window.localStorage.getItem("profile"));
    else {
      profile =
      {
        username: "",
        lastname: "",
        firstname: "",
        email: "",
        telefon: "",
        password: "",
        addresses: [],
        actualAddress: 0,
        picture: "img/icons/black_avatar.png",
        contacts: [{
            username: "JennyS",
            rating: 4,
            picture: "img/icons/grey_woman.png",
            value: 0
          },
          {
            username: "BeneS",
            rating: 5,
            picture: "img/icons/black_avatar.png",
            value: 0
          }],
        rating: 3,
        salt: 0,
        requests: [{id: "zf889234fhüq03e9uag4", title: "Tischtennisschläger leihen", requested: true}, {id: "hf8923ü4whofnüsdioacnce489ogiaehrljg", title: "Pfanne bitte!", requested: false}],
        access_token: "jskdvsldvks"
      }
    }

    toUser = {
      picture: 'img/icons/black_avatar.png',
      username: 'Unknown'
    }

    var image;
    var IMAGE_STORAGE_KEY = 'image';

    addImage = function(img) {
      image = img;
      profile.picture = image;
      window.localStorage.setItem("profile", JSON.stringify(profile));
    };

    return {
      profile: profile,
      toUser: toUser,
      storeImage: addImage
    }
  })

  .factory('ResultService', function($ionicPopup) {
    changedPassword = function(result)
    {
      switch(result)
      {
        case 0:
          var promptPopup = $ionicPopup.prompt({
            title: 'Passwort erfolgreich geändert',
            buttons: [
              {
                text: 'OK',
                type: 'button-borrowitblau'
              }
            ]
          });
          break;
        case 1:
          var promptPopup = $ionicPopup.prompt({
            title: 'Altes Passwort falsch',
            buttons: [
              {
                text: 'OK',
                type: 'button-borrowitblau'
              }
            ]
          });
          break;
        case 2:
          var promptPopup = $ionicPopup.prompt({
            title: 'Die Passwörter sind nicht gleich',
            buttons: [
              {
                text: 'OK',
                type: 'button-borrowitblau'
              }
            ]
          });
          break;
      }
    }

    changedProfile = function(result)
    {
      switch(result)
      {
        case 0:
          var promptPopup = $ionicPopup.prompt({
            title: 'Profil erfolgreich geändert',
            buttons: [
              {
                text: 'OK',
                type: 'button-borrowitblau'
              }
            ]
          });
          break;
        case 1:
          var promptPopup = $ionicPopup.prompt({
            title: 'Mindestens ein Feld ist falsch ausgefüllt',
            buttons: [
              {
                text: 'OK',
                type: 'button-borrowitblau'
              }
            ]
          });
          break;
      }
    };

    return {
      changedPassword: changedPassword,
      changedProfile: changedProfile
    }
  })

  /*.factory('CommunicationService',['$http', '$auth', function($http, $auth, ResultService, ProfileService)
  {
    var HOST = "https://sb.pftclan.de";
    var PORT = 546;
    var URL = HOST + ":" + PORT + "/api/smartbackend/";
    var salt;

    sha512 = function(password, salt){
      var hash = window.CryptoJS.HmacSHA512(password, salt).toString(); /** Hashing algorithm sha512 */
      /*return hash;
    };

    createSalt = function() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < 64; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    signup = function(provider){
      salt = ProfileService.profile.email;
      ProfileService.profile.password = sha512(ProfileService.profile.password, salt);  // THERE IS NO GUARANTEE THAT THE SALT IS CORRECT MAY ITS A RANDOM SALT FOR SAFTEY IF EMAIL ISNT CORRECT
      ProfileService.profile.salt = salt;
      $http({method: "POST", url:URL + "auth/signup", params:{email:ProfileService.profile.email,password: ProfileService.profile.password}})
        .then(function(result) {
          ProfileService.profile.access_token = result.data.access_token;
          $http.defaults.headers.common['Authorization'] = "Bearer "+ ProfileService.profile.access_token;
        },function(error) {
          // toSomething
        })
    }

    login = function(provider){
      if(provider==="email"){
        //SENT EMAIL TO SERVER GET A SALT
        ProfileService.profile.password = sha512(ProfileService.profile.password,  ProfileService.profile.salt);  // THERE IS NO GUARANTEE THAT THE SALT IS CORRECT MAY ITS A RANDOM SALT FOR SAFTEY IF EMAIL ISNT CORRECT
        $http({method: "POST", url:URL + "auth/email", params:{email:ProfileService.profile.email,password: ProfileService.profile.password}})
          .then(function(result) {
            ProfileService.profile.access_token = result.data.access_token;
            $http.defaults.headers.common['Authorization'] = "Bearer "+ ProfileService.profile.access_token;
          },function(error) {
            // toSomething
          })
      }
    }

    authenticate = function(provider){
      if(provider==="facebook"){
        $auth.authenticate(provider).then(function(response) {
          console.log($auth.getToken());
          console.log($auth.getPayload());
          $http({method: "GET", url:URL + "auth/" + provider + "/", params:{id_token: $auth.getToken()}})
            .then(function(result) {
                console.log('yes im ok');
              },function(error) {
                console.log('Error: ' + error);
              }
            )
            .catch(function(response) {
              userService.SocialLoginFailed();
            });
        })
      }
    }

    return {
      signup:signup,
      login:login,
      authenticate:authenticate
    }
  }])*/

  .factory('MockService', ['$http', '$q',
    function($http, $q) {
      var me = {};

      me.getUserMessages = function(d) {
        /*
         var endpoint =
         'http://www.mocky.io/v2/547cf341501c337f0c9a63fd?callback=JSON_CALLBACK';
         return $http.jsonp(endpoint).then(function(response) {
         return response.data;
         }, function(err) {
         console.log('get user messages error, err: ' + JSON.stringify(
         err, null, 2));
         });
         */
        var deferred = $q.defer();

        setTimeout(function() {
          deferred.resolve(getMockMessages());
        }, 1500);

        return deferred.promise;
      };

      me.getMockMessage = function() {
        return {
          username: 'Venkman',
          date: new Date(),
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        };
      }

      return me;
    }
  ])

  // fitlers
  .filter('nl2br', ['$filter',
    function($filter) {
      return function(data) {
        if (!data) return data;
        return data.replace(/\n\r?/g, '<br />');
      };
    }
  ])

  .filter('searchContent', function(){
    return function (items, query) {
      var filtered = [];
      if (query) {
        var letterMatch = new RegExp(query.toLowerCase());
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (letterMatch.test(item.profile.username.toLowerCase()) || letterMatch.test(item.title.toLowerCase())) {
            filtered.push(item);
          }
        }
      } else {
        filtered = items;
      }
      return filtered;
    };
  })

  .filter('searchContact', function(){
    return function (items, query) {
      var filtered = [];
      if (query) {
        var letterMatch = new RegExp(query.toLowerCase());
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (letterMatch.test(item.username.toLowerCase())) {
            filtered.push(item);
          }
        }
      } else {
        filtered = items;
      }
      return filtered;
    };
  })

  .filter('filterRequests', function(){
    return function (items, category) {
      var filtered = [];
      switch(category) {
        case "all":
          filtered = items;
          break;
        default:
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.category === category) {
              filtered.push(item);
            }
          }
          break;
      }
      return filtered;
    };
  })

  //constant
  .constant('msdElasticConfig', {
    append: ''
  })

  // directives
  .directive('autolinker', ['$timeout',
    function($timeout) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          $timeout(function() {
            var eleHtml = element.html();

            if (eleHtml === '') {
              return false;
            }

            var text = Autolinker.link(eleHtml, {
              className: 'autolinker',
              newWindow: false
            });

            element.html(text);

            var autolinks = element[0].getElementsByClassName('autolinker');

            for (var i = 0; i < autolinks.length; i++) {
              angular.element(autolinks[i]).bind('click', function(e) {
                var href = e.target.href;
                console.log('autolinkClick, href: ' + href);

                if (href) {
                  //window.open(href, '_system');
                  window.open(href, 'blank');
                }

                e.preventDefault();
                return false;
              });
            }
          }, 0);
        }
      }
    }
  ])

  .directive('msdElastic', [
    '$timeout', '$window', 'msdElasticConfig',
    function($timeout, $window, config) {
      'use strict';

      return {
        require: 'ngModel',
        restrict: 'A, C',
        link: function(scope, element, attrs, ngModel) {

          // cache a reference to the DOM element
          var ta = element[0],
            $ta = element;

          // ensure the element is a textarea, and browser is capable
          if (ta.nodeName !== 'TEXTAREA' || !$window.getComputedStyle) {
            return;
          }

          // set these properties before measuring dimensions
          $ta.css({
            'overflow': 'hidden',
            'overflow-y': 'hidden',
            'word-wrap': 'break-word'
          });

          // force text reflow
          var text = ta.value;
          ta.value = '';
          ta.value = text;

          var append = attrs.msdElastic ? attrs.msdElastic.replace(/\\n/g, '\n') : config.append,
            $win = angular.element($window),
            mirrorInitStyle = 'position: absolute; top: -999px; right: auto; bottom: auto;' +
              'left: 0; overflow: hidden; -webkit-box-sizing: content-box;' +
              '-moz-box-sizing: content-box; box-sizing: content-box;' +
              'min-height: 0 !important; height: 0 !important; padding: 0;' +
              'word-wrap: break-word; border: 0;',
            $mirror = angular.element('<textarea tabindex="-1" ' +
              'style="' + mirrorInitStyle + '"/>').data('elastic', true),
            mirror = $mirror[0],
            taStyle = getComputedStyle(ta),
            resize = taStyle.getPropertyValue('resize'),
            borderBox = taStyle.getPropertyValue('box-sizing') === 'border-box' ||
              taStyle.getPropertyValue('-moz-box-sizing') === 'border-box' ||
              taStyle.getPropertyValue('-webkit-box-sizing') === 'border-box',
            boxOuter = !borderBox ? {width: 0, height: 0} : {
              width:  parseInt(taStyle.getPropertyValue('border-right-width'), 10) +
              parseInt(taStyle.getPropertyValue('padding-right'), 10) +
              parseInt(taStyle.getPropertyValue('padding-left'), 10) +
              parseInt(taStyle.getPropertyValue('border-left-width'), 10),
              height: parseInt(taStyle.getPropertyValue('border-top-width'), 10) +
              parseInt(taStyle.getPropertyValue('padding-top'), 10) +
              parseInt(taStyle.getPropertyValue('padding-bottom'), 10) +
              parseInt(taStyle.getPropertyValue('border-bottom-width'), 10)
            },
            minHeightValue = parseInt(taStyle.getPropertyValue('min-height'), 10),
            heightValue = parseInt(taStyle.getPropertyValue('height'), 10),
            minHeight = Math.max(minHeightValue, heightValue) - boxOuter.height,
            maxHeight = parseInt(taStyle.getPropertyValue('max-height'), 10),
            mirrored,
            active,
            copyStyle = ['font-family',
              'font-size',
              'font-weight',
              'font-style',
              'letter-spacing',
              'line-height',
              'text-transform',
              'word-spacing',
              'text-indent'];

          // exit if elastic already applied (or is the mirror element)
          if ($ta.data('elastic')) {
            return;
          }

          // Opera returns max-height of -1 if not set
          maxHeight = maxHeight && maxHeight > 0 ? maxHeight : 9e4;

          // append mirror to the DOM
          if (mirror.parentNode !== document.body) {
            angular.element(document.body).append(mirror);
          }

          // set resize and apply elastic
          $ta.css({
            'resize': (resize === 'none' || resize === 'vertical') ? 'none' : 'horizontal'
          }).data('elastic', true);

          /*
           * methods
           */

          function initMirror() {
            var mirrorStyle = mirrorInitStyle;

            mirrored = ta;
            // copy the essential styles from the textarea to the mirror
            taStyle = getComputedStyle(ta);
            angular.forEach(copyStyle, function(val) {
              mirrorStyle += val + ':' + taStyle.getPropertyValue(val) + ';';
            });
            mirror.setAttribute('style', mirrorStyle);
          }

          function adjust() {
            var taHeight,
              taComputedStyleWidth,
              mirrorHeight,
              width,
              overflow;

            if (mirrored !== ta) {
              initMirror();
            }

            // active flag prevents actions in function from calling adjust again
            if (!active) {
              active = true;

              mirror.value = ta.value + append; // optional whitespace to improve animation
              mirror.style.overflowY = ta.style.overflowY;

              taHeight = ta.style.height === '' ? 'auto' : parseInt(ta.style.height, 10);

              taComputedStyleWidth = getComputedStyle(ta).getPropertyValue('width');

              // ensure getComputedStyle has returned a readable 'used value' pixel width
              if (taComputedStyleWidth.substr(taComputedStyleWidth.length - 2, 2) === 'px') {
                // update mirror width in case the textarea width has changed
                width = parseInt(taComputedStyleWidth, 10) - boxOuter.width;
                mirror.style.width = width + 'px';
              }

              mirrorHeight = mirror.scrollHeight;

              if (mirrorHeight > maxHeight) {
                mirrorHeight = maxHeight;
                overflow = 'scroll';
              } else if (mirrorHeight < minHeight) {
                mirrorHeight = minHeight;
              }
              mirrorHeight += boxOuter.height;
              ta.style.overflowY = overflow || 'hidden';

              if (taHeight !== mirrorHeight) {
                ta.style.height = mirrorHeight + 'px';
                scope.$emit('elastic:resize', $ta);
              }

              scope.$emit('taResize', $ta); // listen to this in the UserMessagesCtrl

              // small delay to prevent an infinite loop
              $timeout(function() {
                active = false;
              }, 1);

            }
          }

          function forceAdjust() {
            active = false;
            adjust();
          }

          /*
           * initialise
           */

          // listen
          if ('onpropertychange' in ta && 'oninput' in ta) {
            // IE9
            ta['oninput'] = ta.onkeyup = adjust;
          } else {
            ta['oninput'] = adjust;
          }

          $win.bind('resize', forceAdjust);

          scope.$watch(function() {
            return ngModel.$modelValue;
          }, function(newValue) {
            forceAdjust();
          });

          scope.$on('elastic:adjust', function() {
            initMirror();
            forceAdjust();
          });

          $timeout(adjust);

          /*
           * destroy
           */

          scope.$on('$destroy', function() {
            $mirror.remove();
            $win.unbind('resize', forceAdjust);
          });
        }
      };
    }
  ])

function onProfilePicError(ele) {
  this.ele.src = ''; // set a fallback
}

function getMockMessages() {
  return {"messages":[],"unread":0};
}

// configure moment relative time


!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.returnExportsGlobal=b()}):"object"==typeof exports?module.exports=b():a.Autolinker=b()}(this,function(){var a=function(b){a.Util.assign(this,b),this.matchValidator=new a.MatchValidator};return a.prototype={constructor:a,urls:!0,email:!0,twitter:!0,newWindow:!0,stripPrefix:!0,className:"",htmlCharacterEntitiesRegex:/(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;)/gi,matcherRegex:function(){var a=/(^|[^\w])@(\w{1,15})/,b=/(?:[\-;:&=\+\$,\w\.]+@)/,c=/(?:[A-Za-z][-.+A-Za-z0-9]+:(?![A-Za-z][-.+A-Za-z0-9]+:\/\/)(?!\d+\/?)(?:\/\/)?)/,d=/(?:www\.)/,e=/[A-Za-z0-9\.\-]*[A-Za-z0-9\-]/,f=/\.(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/,g=/[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]?!:,.;]*[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]]/;return new RegExp(["(",a.source,")","|","(",b.source,e.source,f.source,")","|","(","(?:","(",c.source,e.source,")","|","(?:","(.?//)?",d.source,e.source,")","|","(?:","(.?//)?",e.source,f.source,")",")","(?:"+g.source+")?",")"].join(""),"gi")}(),charBeforeProtocolRelMatchRegex:/^(.)?\/\//,link:function(b){var c=this,d=this.getHtmlParser(),e=this.htmlCharacterEntitiesRegex,f=0,g=[];return d.parse(b,{processHtmlNode:function(a,b,c){"a"===b&&(c?f=Math.max(f-1,0):f++),g.push(a)},processTextNode:function(b){if(0===f)for(var d=a.Util.splitAndCapture(b,e),h=0,i=d.length;i>h;h++){var j=d[h],k=c.processTextNode(j);g.push(k)}else g.push(b)}}),g.join("")},getHtmlParser:function(){var b=this.htmlParser;return b||(b=this.htmlParser=new a.HtmlParser),b},getTagBuilder:function(){var b=this.tagBuilder;return b||(b=this.tagBuilder=new a.AnchorTagBuilder({newWindow:this.newWindow,truncate:this.truncate,className:this.className})),b},processTextNode:function(a){var b=this;return a.replace(this.matcherRegex,function(a,c,d,e,f,g,h,i,j){var k=b.processCandidateMatch(a,c,d,e,f,g,h,i,j);if(k){var l=b.createMatchReturnVal(k.match,k.matchStr);return k.prefixStr+l+k.suffixStr}return a})},processCandidateMatch:function(b,c,d,e,f,g,h,i,j){var k,l=i||j,m="",n="";if(c&&!this.twitter||f&&!this.email||g&&!this.urls||!this.matchValidator.isValidMatch(g,h,l))return null;if(this.matchHasUnbalancedClosingParen(b)&&(b=b.substr(0,b.length-1),n=")"),f)k=new a.match.Email({matchedText:b,email:f});else if(c)d&&(m=d,b=b.slice(1)),k=new a.match.Twitter({matchedText:b,twitterHandle:e});else{if(l){var o=l.match(this.charBeforeProtocolRelMatchRegex)[1]||"";o&&(m=o,b=b.slice(1))}k=new a.match.Url({matchedText:b,url:b,protocolUrlMatch:!!h,protocolRelativeMatch:!!l,stripPrefix:this.stripPrefix})}return{prefixStr:m,suffixStr:n,matchStr:b,match:k}},matchHasUnbalancedClosingParen:function(a){var b=a.charAt(a.length-1);if(")"===b){var c=a.match(/\(/g),d=a.match(/\)/g),e=c&&c.length||0,f=d&&d.length||0;if(f>e)return!0}return!1},createMatchReturnVal:function(b,c){var d;if(this.replaceFn&&(d=this.replaceFn.call(this,this,b)),"string"==typeof d)return d;if(d===!1)return c;if(d instanceof a.HtmlTag)return d.toString();var e=this.getTagBuilder(),f=e.build(b);return f.toString()}},a.link=function(b,c){var d=new a(c);return d.link(b)},a.match={},a.Util={abstractMethod:function(){throw"abstract"},assign:function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a},extend:function(b,c){var d=b.prototype,e=function(){};e.prototype=d;var f;f=c.hasOwnProperty("constructor")?c.constructor:function(){d.constructor.apply(this,arguments)};var g=f.prototype=new e;return g.constructor=f,g.superclass=d,delete c.constructor,a.Util.assign(g,c),f},ellipsis:function(a,b,c){return a.length>b&&(c=null==c?"..":c,a=a.substring(0,b-c.length)+c),a},indexOf:function(a,b){if(Array.prototype.indexOf)return a.indexOf(b);for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},splitAndCapture:function(a,b){if(!b.global)throw new Error("`splitRegex` must have the 'g' flag set");for(var c,d=[],e=0;c=b.exec(a);)d.push(a.substring(e,c.index)),d.push(c[0]),e=c.index+c[0].length;return d.push(a.substring(e)),d}},a.HtmlParser=a.Util.extend(Object,{htmlRegex:function(){var a=/[0-9a-zA-Z][0-9a-zA-Z:]*/,b=/[^\s\0"'>\/=\x01-\x1F\x7F]+/,c=/(?:".*?"|'.*?'|[^'"=<>`\s]+)/,d=b.source+"(?:\\s*=\\s*"+c.source+")?";return new RegExp(["(?:","<(!DOCTYPE)","(?:","\\s+","(?:",d,"|",c.source+")",")*",">",")","|","(?:","<(/)?","("+a.source+")","(?:","\\s+",d,")*","\\s*/?",">",")"].join(""),"gi")}(),parse:function(a,b){b=b||{};for(var c,d=b.processHtmlNode||function(){},e=b.processTextNode||function(){},f=this.htmlRegex,g=0;null!==(c=f.exec(a));){var h=c[0],i=c[1]||c[3],j=!!c[2],k=a.substring(g,c.index);k&&e(k),d(h,i.toLowerCase(),j),g=c.index+h.length}if(g<a.length){var l=a.substring(g);l&&e(l)}}}),a.HtmlTag=a.Util.extend(Object,{whitespaceRegex:/\s+/,constructor:function(b){a.Util.assign(this,b),this.innerHtml=this.innerHtml||this.innerHTML},setTagName:function(a){return this.tagName=a,this},getTagName:function(){return this.tagName||""},setAttr:function(a,b){var c=this.getAttrs();return c[a]=b,this},getAttr:function(a){return this.getAttrs()[a]},setAttrs:function(b){var c=this.getAttrs();return a.Util.assign(c,b),this},getAttrs:function(){return this.attrs||(this.attrs={})},setClass:function(a){return this.setAttr("class",a)},addClass:function(b){for(var c,d=this.getClass(),e=this.whitespaceRegex,f=a.Util.indexOf,g=d?d.split(e):[],h=b.split(e);c=h.shift();)-1===f(g,c)&&g.push(c);return this.getAttrs()["class"]=g.join(" "),this},removeClass:function(b){for(var c,d=this.getClass(),e=this.whitespaceRegex,f=a.Util.indexOf,g=d?d.split(e):[],h=b.split(e);g.length&&(c=h.shift());){var i=f(g,c);-1!==i&&g.splice(i,1)}return this.getAttrs()["class"]=g.join(" "),this},getClass:function(){return this.getAttrs()["class"]||""},hasClass:function(a){return-1!==(" "+this.getClass()+" ").indexOf(" "+a+" ")},setInnerHtml:function(a){return this.innerHtml=a,this},getInnerHtml:function(){return this.innerHtml||""},toString:function(){var a=this.getTagName(),b=this.buildAttrsStr();return b=b?" "+b:"",["<",a,b,">",this.getInnerHtml(),"</",a,">"].join("")},buildAttrsStr:function(){if(!this.attrs)return"";var a=this.getAttrs(),b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c+'="'+a[c]+'"');return b.join(" ")}}),a.MatchValidator=a.Util.extend(Object,{invalidProtocolRelMatchRegex:/^[\w]\/\//,hasFullProtocolRegex:/^[A-Za-z][-.+A-Za-z0-9]+:\/\//,uriSchemeRegex:/^[A-Za-z][-.+A-Za-z0-9]+:/,hasWordCharAfterProtocolRegex:/:[^\s]*?[A-Za-z]/,isValidMatch:function(a,b,c){return b&&!this.isValidUriScheme(b)||this.urlMatchDoesNotHaveProtocolOrDot(a,b)||this.urlMatchDoesNotHaveAtLeastOneWordChar(a,b)||this.isInvalidProtocolRelativeMatch(c)?!1:!0},isValidUriScheme:function(a){var b=a.match(this.uriSchemeRegex)[0];return"javascript:"!==b&&"vbscript:"!==b},urlMatchDoesNotHaveProtocolOrDot:function(a,b){return!(!a||b&&this.hasFullProtocolRegex.test(b)||-1!==a.indexOf("."))},urlMatchDoesNotHaveAtLeastOneWordChar:function(a,b){return a&&b?!this.hasWordCharAfterProtocolRegex.test(a):!1},isInvalidProtocolRelativeMatch:function(a){return!!a&&this.invalidProtocolRelMatchRegex.test(a)}}),a.AnchorTagBuilder=a.Util.extend(Object,{constructor:function(b){a.Util.assign(this,b)},build:function(b){var c=new a.HtmlTag({tagName:"a",attrs:this.createAttrs(b.getType(),b.getAnchorHref()),innerHtml:this.processAnchorText(b.getAnchorText())});return c},createAttrs:function(a,b){var c={href:b},d=this.createCssClass(a);return d&&(c["class"]=d),this.newWindow&&(c.target="blank"),c},createCssClass:function(a){var b=this.className;return b?b+" "+b+"-"+a:""},processAnchorText:function(a){return a=this.doTruncate(a)},doTruncate:function(b){return a.Util.ellipsis(b,this.truncate||Number.POSITIVE_INFINITY)}}),a.match.Match=a.Util.extend(Object,{constructor:function(b){a.Util.assign(this,b)},getType:a.Util.abstractMethod,getMatchedText:function(){return this.matchedText},getAnchorHref:a.Util.abstractMethod,getAnchorText:a.Util.abstractMethod}),a.match.Email=a.Util.extend(a.match.Match,{getType:function(){return"email"},getEmail:function(){return this.email},getAnchorHref:function(){return"mailto:"+this.email},getAnchorText:function(){return this.email}}),a.match.Twitter=a.Util.extend(a.match.Match,{getType:function(){return"twitter"},getTwitterHandle:function(){return this.twitterHandle},getAnchorHref:function(){return"https://twitter.com/"+this.twitterHandle},getAnchorText:function(){return"@"+this.twitterHandle}}),a.match.Url=a.Util.extend(a.match.Match,{urlPrefixRegex:/^(https?:\/\/)?(www\.)?/i,protocolRelativeRegex:/^\/\//,protocolPrepended:!1,getType:function(){return"url"},getUrl:function(){var a=this.url;return this.protocolRelativeMatch||this.protocolUrlMatch||this.protocolPrepended||(a=this.url="http://"+a,this.protocolPrepended=!0),a},getAnchorHref:function(){var a=this.getUrl();return a.replace(/&amp;/g,"&")},getAnchorText:function(){var a=this.getUrl();return this.protocolRelativeMatch&&(a=this.stripProtocolRelativePrefix(a)),this.stripPrefix&&(a=this.stripUrlPrefix(a)),a=this.removeTrailingSlash(a)},stripUrlPrefix:function(a){return a.replace(this.urlPrefixRegex,"")},stripProtocolRelativePrefix:function(a){return a.replace(this.protocolRelativeRegex,"")},removeTrailingSlash:function(a){return"/"===a.charAt(a.length-1)&&(a=a.slice(0,-1)),a}}),a});

