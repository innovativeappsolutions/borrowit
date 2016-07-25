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

  .run(function ($ionicPlatform, CommunicationService) {
    CommunicationService.initiateConnection();
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)

    });
  })

  .config(['$ionicConfigProvider', '$authProvider', '$stateProvider', '$urlRouterProvider', function ($ionicConfigProvider, $authProvider, $stateProvider, $urlRouterProvider) {
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
    var profileexists = JSON.parse(window.localStorage.getItem("profile"));
    if (profileexists && profileexists.access_token && profileexists.access_token != "") {//!= undefined && window.localStorage.getItem("password") != undefined)
      //$http.defaults.headers.common['Authorization'] = "Bearer "+ profileexists.access_token;
      $urlRouterProvider.otherwise('/');
    }
    else
      $urlRouterProvider.otherwise('/login');
  }])

  .controller('UserMessagesCtrl',
  function ($scope, $rootScope, $state, $stateParams, $ionicActionSheet,
    $ionicPopup, $ionicScrollDelegate, $timeout, $interval, ProfileService, CommunicationService) {

    // this could be on $rootScope rather than in $stateParams
    //$scope.user = ProfileService;

    $scope.input = {
      message: ''
    };

    var messageCheckTimer;

    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
    var footerBar; // gets set in $ionicView.enter
    var scroller;
    var txtInput; // ^^^

    $scope.$on('$ionicView.enter', function () {
      console.log('UserMessages $ionicView.enter');

      //getMessages();
      $timeout(function () {
        viewScroll.scrollBottom();
      }, 0);

      $timeout(function () {
        footerBar = document.body.querySelector('#userMessagesView .bar-footer');
        scroller = document.body.querySelector('#userMessagesView .scroll-content');
        txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);

      messageCheckTimer = $interval(function () {
        // here you could check for new messages if your app doesn't use push notifications or user disabled them
      }, 20000);
    });

    $scope.$on('$ionicView.leave', function () {
      console.log('leaving UserMessages view, destroying interval');
      // Make sure that the interval is destroyed
      if (angular.isDefined(messageCheckTimer)) {
        $interval.cancel(messageCheckTimer);
        messageCheckTimer = undefined;
      }
    });

    $scope.$on('$ionicView.beforeLeave', function () {
      if (!$scope.input.message || $scope.input.message === '') {
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

    $scope.doneLoading = false;

    $scope.$watch('input.message', function (newValue, oldValue) {
    });

    $scope.sendMessage = function (sendMessageForm) {
      var message = {
        text: $scope.textboxes.message.replace(/(<([^>]+)>)/ig, ""),
        date: new Date(),
        username: $scope.profile.username
      };

      // if you do a web service call this will be needed as well as before the viewScroll calls
      // you can't see the effect of this in the browser it needs to be used on a real device
      // for some reason the one time blur event is not firing in the browser but does on devices
      keepKeyboardOpen();

      //MockService.sendMessage(message).then(function(data) {
      $scope.emptyAllFields();

      CommunicationService.sendMessage(message);
      $scope.values.currentChat.messages.push(message); //change to id
      for (var i = 0; i < $scope.chats.length; i++) {
        if ($scope.chats[i].roomid == $scope.values.currentChat.roomid) {
          $scope.chats[i] = $scope.values.currentChat;
        }
      }
      window.localStorage.setItem("chats", JSON.stringify($scope.chats));

      $timeout(function () {
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 0);

      /*$timeout(function() {
        $scope.chats[$scope.values.currentChat].messages.push($scope.getRequestMessage()); //delete this one day
        window.localStorage.setItem("chats", JSON.stringify($scope.chats));
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 2000);*/

      //});
    };

    // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
    function keepKeyboardOpen() {
      console.log('keepKeyboardOpen');
      txtInput.one('blur', function () {
        console.log('textarea blur, focus back on it');
        txtInput[0].focus();
      });
    }

    $scope.getRequestMessage = function () {
      var a = "#/";//$scope.requests[$scope.values.chosenRequest].offered;
      //var b = requests[chosenRequest].accepted;
      return {
        username: ProfileService.toUser.username,
        date: new Date(),
        text: ProfileService.toUser.username +
        ' möchte dir etwas leihen!'
      };
    }

    $scope.onMessageHold = function (e, itemIndex, message) {
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
        buttonClicked: function (index) {
          switch (index) {
            case 0: // Copy Text
              //cordova.plugins.clipboard.copy(message.text);

              break;
            case 1: // Delete
              // no server side secrets here :~)
              $scope.messages.splice(itemIndex, 1);
              $timeout(function () {
                viewScroll.resize();
              }, 0);

              break;
          }

          return true;
        }
      });
    };

    // this prob seems weird here but I have reasons for this in my app, secret!
    $scope.viewProfile = function () {
      window.location = "#/profil_ansicht";
    };

    // I emit this event from the monospaced.elastic directive, read line 480
    $scope.$on('taResize', function (e, ta) {
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

  .controller('LoginCtrl', ['$scope', 'ProfileService', 'CommunicationService', function ($scope, ProfileService, CommunicationService) {
    $scope.registerFirstPart = function () {
      if ($scope.textboxes.username != null &&
        $scope.textboxes.lastname != null &&
        $scope.textboxes.firstname != null &&
        $scope.textboxes.email != null &&
        $scope.textboxes.telephone != null &&
        $scope.textboxes.password != null &&
        $scope.textboxes.passwordrep != null &&
        $scope.textboxes.password == $scope.textboxes.passwordrep) {
        ProfileService.profile.username = $scope.textboxes.username;
        ProfileService.profile.lastname = $scope.textboxes.lastname;
        ProfileService.profile.firstname = $scope.textboxes.firstname;
        ProfileService.profile.email = $scope.textboxes.email;
        ProfileService.profile.telephone = $scope.textboxes.telephone;
        ProfileService.profile.password = $scope.textboxes.password;
        ProfileService.profile.addresses = [];
        ProfileService.profile.currentAddress = 0;
        ProfileService.profile.requests = [];
        window.location = '#/registrierung2';
      }
    }

    $scope.registerSecondPart = function () {
      if ($scope.profile.addresses != null &&
        $scope.profile.addresses.length > 0) {
        ProfileService.profile.push = true;
        ProfileService.profile.location = true;
        CommunicationService.signup("email");
        window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
        //signup("email", $scope.profile.email, $scope.profile.password);
        window.location = '#/';
      }
    }

    $scope.login = function (username, password) {
      ProfileService.profile = JSON.parse(window.localStorage.getItem("profile"));
    };

    $scope.checkLogin = function () {
      if ($scope.textboxes.TextboxEmail && $scope.textboxes.TextboxPassword) {
        CommunicationService.login("email", $scope.textboxes.TextboxEmail, $scope.textboxes.TextboxPassword);
      }
    }

    $scope.facebookLogin = function () {
      CommunicationService.authenticate("facebook");
    }

    $scope.showLoginError = function (wrongPassword) {
      $scope.popupData = {};
      if (wrongPassword)
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

  .controller("ToDoController", function ($scope, $ionicPopup, $cordovaVibration, $cordovaCamera, $cordovaDevice, $cordovaFile, $cordovaContacts, $ionicPlatform, $ionicActionSheet, ImageService, ProfileService, ResultService, CommunicationService) {

    $scope.currentAddressChanged = function () {
      CommunicationService.changeCurrentAddress(ProfileService.profile.currentAddress);
    };

    $scope.pushToggleChange = function () {
      console.log('Push Notification Change', $scope.profile.push);
      ProfileService.profile.push = $scope.profle.push;
      CommunicationService.changePush($scope.profile.push);
      window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
    };

    $scope.locationToggleChange = function () {
      console.log('Location', $scope.profile.location);
      ProfileService.profile.location = $scope.profile.location;
      CommunicationService.changeLocation($scope.profile.location);
      window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
    };

    $scope.images = {
      blackAvatar: "img/icons/black_avatar.png",
      blackHome: "img/icons/black_home.png",
      greyWoman: "img/icons/grey_woman.png",
      whiteBed: "img/icons/white_bed.png",
      whiteCar: "img/icons/white_car_1.png",
      whiteCutlery: "img/icons/white_cutlery_1.png",
      whiteHome: "img/icons/white_home.png",
      whiteJoystick: "img/icons/white_joystick.png",
      whiteKitchen: "img/icons/white_kitchen.png",
      whiteMedal: "img/icons/white_medal.png",
      whiteSoccerBall: "img/icons/white_soccer_ball.png",
      whiteSprout: "img/icons/white_sprout.png"
    };

    $scope.searchEvents = function (startDate, startTime, endDate, endTime) {
      $cordovaCalendar.findEvent({
        title: ev.title,
        startDate: ev.date
      })
    };

    $scope.getMonthNumber = function (month) {
      switch (month.toLowerCase()) {
        case "jan":
          return ".01.";
        case "feb":
          return ".02.";
        case "mar":
          return ".03.";
        case "apr":
          return ".04.";
        case "may":
          return ".05.";
        case "jun":
          return ".06.";
        case "jul":
          return ".07.";
        case "aug":
          return ".08.";
        case "sep":
          return ".09.";
        case "oct":
          return ".10.";
        case "nov":
          return ".11.";
        case "dec":
          return ".12.";
      }
    }

    $scope.prepareStartRequest = function () {
      var newRequest = setRequestFields();
      if ($scope.profile.location && $scope.values.useLocationForRequest) {
        var location = CommunicationService.getGeoLocation();
        location.then(function (result) {
          newRequest.location = result;
          $scope.startRequest(newRequest);
        })
      }
      else {
        for (var i = 0; i < $scope.profile.addresses.length; i++) {
          if ($scope.profile.addresses[i].addressid === $scope.profile.currentAddress) {
            newRequest.location = $scope.profile.addresses[i].street + " " + $scope.profile.addresses[i].streetnumber + ", " + $scope.profile.addresses[i].zip + " " + $scope.profile.addresses[i].city + ", " + $scope.profile.addresses[i].country;
            break;
          }
        }
        $scope.startRequest(newRequest);
      }
    }

    $scope.updateRequestInformations = function (requestid) { //work with id
      var requestToUpdate;
      for (var i = 0; i < $scope.profile.requests.length; i++) {
        if ($scope.profile.requests[i].requestid === requestid) {
          requestToUpdate = $scope.setRequestFields();
          requestToUpdate.requestid = requestid;
          if ($scope.profile.location && $scope.values.useLocationForRequest) {
            var location = CommunicationService.getGeoLocation();
            location.then(function (result) {
              requestToUpdate.location = result;
              CommunicationService.updateRequest(requestid, requestToUpdate.title, requestToUpdate.description, requestToUpdate.location, requestToUpdate.startdate, requestToUpdate.enddate, requestToUpdate.category)
              ProfileService.profile.requests[i] = requestToUpdate;
              window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
            })
          }
          else {
            for (var i = 0; i < $scope.profile.addresses.length; i++) {
              if ($scope.profile.addresses[i].addressid === $scope.profile.currentAddress) {
                requestToUpdate.location = $scope.profile.addresses[i].street + " " + $scope.profile.addresses[i].streetnumber + ", " + $scope.profile.addresses[i].zip + " " + $scope.profile.addresses[i].city + ", " + $scope.profile.addresses[i].country;
                CommunicationService.updateRequest(requestid, requestToUpdate.title, requestToUpdate.description, requestToUpdate.location, requestToUpdate.startdate, requestToUpdate.enddate, requestToUpdate.category)
                ProfileService.profile.requests[i] = requestToUpdate;
                window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
                break;
              }
            }
          }
          break;
        }
      }
      $scope.emptyAllFields();
    }

    $scope.startRequest = function (request) {
      var newReqId = CommunicationService.startRequest(request.title, request.description, request.location, request.startDate, request.endDate, request.category);
      newReqId.then(function (result) {
        request.requestid = result.requestid;
        ProfileService.profile.requests.push({
          requestid: request.requestid,
          title: request.title,
          username: $scope.profile.username
        });
        window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
        $scope.emptyAllFields();
      });
    }

    var setRequestFields = function () {
      var newRequest = {};
      if ($scope.values.sofort) {
        var startDate = new Date().toString().split(' ');
        newRequest.startDate = startDate[2] + $scope.getMonthNumber(startDate[1]) + startDate[3] + " " + startDate[4];
      }
      else {
        var startDate = $scope.textboxes.startDate.toString().split(' ');
        newRequest.startDate = startDate[2] + $scope.getMonthNumber(startDate[1]) + startDate[3] + " " + $scope.textboxes.startTime.toString().split(' ')[4];
      }
      newRequest.title = $scope.textboxes.requestTitle;
      newRequest.description = $scope.textboxes.requestDescription;
      var endDate = $scope.textboxes.closeDate.toString().split(' ');
      newRequest.endDate = endDate[2] + $scope.getMonthNumber(endDate[1]) + endDate[3] + " " + $scope.textboxes.closeTime.toString().split(' ')[4];
      newRequest.category = $scope.textboxes.category;
      newRequest.profile = { username: $scope.profile.username, picture: $scope.profile.picture, rating: $scope.profile.rating };
      return newRequest;
    }

    $scope.deleteProfile = function () {
      window.localStorage.removeItem('profile');
      window.localStorage.removeItem('chats');
      $scope.emptyAllFields();
      window.location = "#/login";
    }

    $scope.addContact = function (person) {
      ProfileService.profile.contacts.push(person);
      CommunicationService.addContact(person.uid);
      window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
    }

    $scope.phoneContacts = [];

    $scope.checkPhoneNumber = function (allNumbers, contactNumber) {
      //for (var i = 0; i < allNumbers.length; i++)
      //if (allNumbers[i].telephone === contactNumber)
      //return true;
      return false;
    }

    $scope.getDeviceContacts = function () {
      function onSuccess(contacts) {
        var allNumbers = [];
        for (var i = 0; i < contacts.length; i++) {
          var contact = contacts[i];
          if (contact.phoneNumbers) {
            for (var j = 0; j < contact.phoneNumbers.length; j++) {
              if (!$scope.checkPhoneNumber(allNumbers, contact.phoneNumbers[j].value.replace(" ", ""))) {
                //var number = {}
                //number.telephone = contact.phoneNumbers[j].value.replace(" ","");
                allNumbers.push({ telephone: contact.phoneNumbers[j].value.replace(" ", "") });
              }
            }
          }
        }
        //var allNumbers = [{telephone: "017634670616"}]
        var loadedContacts = CommunicationService.getContactsFromDevice(allNumbers);
        loadedContacts.then(function (result) {
          $scope.phoneContacts = [];
          for (var i = 0; i < result.length; i++) {
            if (result[i].username != ProfileService.profile.username)
              $scope.phoneContacts.push(result[i]);
          }
        })
      };
      function onError(contactError) {
        ResultService.showError(contactError)
      };
      var options = {};
      options.multiple = true;
      options.fields = ['id', 'displayName', 'name', 'phoneNumbers', 'photos'];
      $cordovaContacts.find(options).then(onSuccess, onError);
    };

    $scope.findContactsBySearchTerm = function (searchTerm) {
      var opts = {
        multiple: true
      };

      try {
        $cordovaContacts.find(opts).then(function (contactsFound) {
          $scope.deviceContacts = contactsFound;
        });
      }
      catch (Exception) {

      }
    };

    $scope.pickContactUsingNativeUI = function () {
      $cordovaContacts.pickContact().then(function (contactPicked) {
        $scope.deviceContact = contactPicked;
      });
    };

    $scope.logout = function () {
      window.localStorage.removeItem("profile");
      window.localStorage.removeItem('chats');
      $scope.emptyAllFields();
      window.location = "#/";
    };

    $scope.emptyAllFields = function () {
      $scope.values = {
        sofort: true,
        currentRequest: {},
        currentPerson: {},
        chosenSortedBy: "startDate",
        chosenCategory: "all",
        currentChat: {},
        actualizeRequest: false,
        requestOffered: false,
        requestAccepted: false,
        useLocationForRequest: true
      };
      $scope.textboxes = {
        startDate: "",
        startTime: "",
        requestTitle: "",
        requestDescription: "",
        endDate: "",
        endTime: "",
        category: "kitchen",
        username: "",
        lastname: "",
        firstname: "",
        email: "",
        telephone: "",
        password: "",
        passwordrep: "",
        TextboxEmail: "",
        TextboxPassword: "",
        message: ""
      };
    };

    $scope.emptyAllFields();

    $scope.viewContact = function (contactid) {
      var loadedContact = CommunicationService.getPerson(contactid);
      loadedContact.then(function (result) {
        $scope.values.currentPerson.username = result.username;
        $scope.values.currentPerson.picture = result.picture;
        $scope.values.currentPerson.rating = result.rating;
        $scope.values.currentPerson.requests = result.requests;
        $scope.values.currentPerson.uid = contactid;
        window.location = "#/kontakt_profil";
      });
    };

    $scope.alreadyContact = function (person) {
      for (var i = 0; i < $scope.profile.contacts.length; i++) {
        if ($scope.profile.contacts[i].username === person.username) {
          return true;
        }
      }
      return false;
    };

    $scope.borrowit = function (request) {
      message = {
        text: ProfileService.profile.username + " möchte dir bezüglich deiner Anfrage >>" + request.title + "<< helfen!",
        date: new Date(),
        username: ProfileService.profile.username
      };
      var offered = CommunicationService.sendBorrowIt(request);
      offered.then(function (result) {
        var chat = $scope.chatExists(request);
        var chatInformations;
        if (chat) {
          chatInformations = getChatInformations(chat.roomid, true);
        }
        else {
          chatInformations = getChatInformations(request.requestid, false);
        }
        chatInformations.then(function (result) {
          CommunicationService.sendMessage($scope.values.currentChat.roomid, message);
          $scope.values.currentChat.messages.push(message);
          for (var i = 0; i < $scope.chats.length; i++) {
            if ($scope.chats[i].roomid == $scope.values.currentChat.roomid) {
              $scope.chats[i] = $scope.values.currentChat;
            }
          }
          window.localStorage.setItem("chats", JSON.stringify($scope.chats));
          window.location = "#/anfragenchat";
        });
        $scope.loadRequests();
      });
    };

    $scope.acceptOffer = function (request) {
      message = {
        text: ProfileService.profile.username + " hat dein Angebot bezüglich seiner Anfrage >>" + request.title + "<< angenommen!",
        date: new Date(),
        username: ProfileService.profile.username
      };
      var accepted = CommunicationService.acceptBorrowIt(request);
      accepted.then(function (result) {
        var chat = $scope.chatExists(request);
        var chatInformations = getChatInformations(chat.roomid, true);
        chatInformations.then(function (result) {
          CommunicationService.sendMessage($scope.values.currentChat.roomid, message);
          $scope.values.currentChat.messages.push(message);
          for (var i = 0; i < $scope.chats.length; i++) {
            if ($scope.chats[i].roomid == $scope.values.currentChat.roomid) {
              $scope.chats[i] = $scope.values.currentChat;
            }
          }
          window.localStorage.setItem("chats", JSON.stringify($scope.chats));
          window.location = "#/anfragenchat";
        })
        $scope.loadRequests();
      });
    };

    $scope.declineOffer = function (request) {
      message = {
        text: ProfileService.profile.username + " hat dein Angebot bezüglich seiner Anfrage >>" + request.title + "<< abgelehnt!",
        date: new Date(),
        username: ProfileService.profile.username
      };
      var accepted = CommunicationService.declineBorrowIt(request);
      accepted.then(function (result) {
        var chat = $scope.chatExists(request);
        var chatInformations = getChatInformations(chat.roomid, true);
        chatInformations.then(function (result) {
          CommunicationService.sendMessage($scope.values.currentChat.roomid, message);
          $scope.values.currentChat.messages.push(message);
          for (var i = 0; i < $scope.chats.length; i++) {
            if ($scope.chats[i].roomid == $scope.values.currentChat.roomid) {
              $scope.chats[i] = $scope.values.currentChat;
            }
          }
          window.localStorage.setItem("chats", JSON.stringify($scope.chats));
          window.location = "#/anfragenchat";
        })
        $scope.loadRequests();
      });
    };

    $scope.actualizeRequest = function () {
      var request = $scope.values.currentRequest
      $scope.textboxes.requestTitle = request.title;
      $scope.textboxes.requestDescription = request.description;
      $scope.textboxes.closeDate = request.endDate;
      $scope.textboxes.closeTime = request.endTime;
      $scope.textboxes.category = request.category;
      $scope.values.actualizeRequest = true;
    };

    $scope.viewChatByRequest = function (request) {
      var chat = $scope.chatExists(request)
      if (chat)
        $scope.viewChat(chat.roomid, true);
      else
        $scope.viewChat(request.requestid, false);
    };

    $scope.chatExists = function (request) {
      for (var i = 0; i < $scope.chats.length; i++)
        if ($scope.chats[i].request.requestid == request.requestid)
          return $scope.chats[i];
      return false;
    }

    $scope.viewChat = function (roomid, exists) {
      var loadedChat = getChatInformations(roomid, exists);
      loadedChat.then(function (result) {
      });
    };

    var getChatInformations = function (roomid, exists) {
      var loadedChat = CommunicationService.openChat(roomid, exists);
      return loadedChat.then(function (result) {
        $scope.values.currentChat.profile = result.profile[0];
        $scope.values.currentChat.request = result.request[0];
        $scope.values.currentChat.messages = [];
        for (var i = 0; i < result.messages.length; i++) {
          $scope.values.currentChat.messages.push(result.messages[i]);
        }
        $scope.values.currentChat.roomid = result.roomid;
        if (!exists) {
          $scope.chats.push($scope.values.currentChat);
        }
      });
    }

    $scope.persons = [];

    $scope.loadContacts = function () {
      var loadedContacts = CommunicationService.getAllPersons();
      loadedContacts.then(function (result) {
        $scope.persons = [];
        for (var i = 0; i < result.length; i++) {
          if (result[i].username != ProfileService.profile.username)
            $scope.persons.push(result[i]);
        }
      });
    };

    $scope.loadCurrentRequest = function (reqid) {
      var loadedRequest = CommunicationService.getCurrentRequest(reqid);
      loadedRequest.then(function (result) {
        $scope.values.currentRequest = result;
      })
    };

    $scope.requests = [];

    $scope.loadRequests = function () {
      var loadedRequests = CommunicationService.getAllRequests();
      loadedRequests.then(function (result) {
        $scope.requests = [];
        for (var i = 0; i < result.length; i++) {
          $scope.requests.push(result[i]);
        }
      })
    };

    var loadedChats = CommunicationService.getAllChats();
    loadedChats.then(function (result) {
      $scope.chats = [];
      for (var i = 0; i < result.length; i++) {
        $scope.chats.push(result[i]);
      }
    });

    $scope.profile = ProfileService.profile;

    $scope.addAddress = function () {
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
        '<option>Kanada</option>' +
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
            onTap: function (e) {
              if ($scope.popupData.newAddressStreet != null &&
                $scope.popupData.newAddressNumber != null &&
                $scope.popupData.newAddressZIP != null &&
                $scope.popupData.newAddressCity != null &&
                $scope.popupData.newAddressCountry != null) {
                var address = {
                  street: $scope.popupData.newAddressStreet,
                  streetnumber: $scope.popupData.newAddressNumber,
                  zip: $scope.popupData.newAddressZIP,
                  city: $scope.popupData.newAddressCity,
                  country: $scope.popupData.newAddressCountry
                };
                var addressid = CommunicationService.addAddress(address);
                addressid.then(function (result) {
                  address.addressid = result;
                  ProfileService.profile.addresses.push(address);
                  window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
                });
              }
            }
          }
        ]
      });
    };

    $scope.removeAddress = function (address) //change to id
    {
      if (ProfileService.profile.addresses.length > 1) {
        ProfileService.profile.currentAddress = ProfileService.profile.addresses[0].addressid;
        for (var i = 0; i < ProfileService.profile.addresses.length; i++) {
          if (ProfileService.profile.addresses[i].addressid == address.addressid) {
            ProfileService.profile.addresses.splice(i, 1);
          }
        }
        window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
        CommunicationService.removeAddress(address.addressid);
      }
      else {
        //Popup ergänzen
      }
    }

    $scope.changeAddress = function (address) {
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
            onTap: function (e) {
              if ($scope.popupData.newAddressStreet != null &&
                $scope.popupData.newAddressNumber != null &&
                $scope.popupData.newAddressZIP != null &&
                $scope.popupData.newAddressCity != null) {

                ProfileService.profile.addresses.push({
                  street: $scope.popupData.newAddressStreet,
                  streetnumber: $scope.popupData.newAddressNumber,
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

    $scope.changePassword = function () {
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
            onTap: function (e) {
              if ($scope.popupData.oldPW == ProfileService.profile.password) {
                if ($scope.popupData.newPW != null && $scope.popupData.newPWrep != null && $scope.popupData.newPW === $scope.popupData.newPWrep) {
                  ProfileService.profile.password = $scope.popupData.newPW;
                  window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
                  ResultService.changedPassword(0);
                }
                else {
                  ResultService.changedPassword(2);
                }
              }
              else {
                ResultService.changedPassword(1);
              }
            }
          },
        ]
      });

      promptPopup.then(function (res) {
        console.log(res);
      });

    };

    $scope.changeProfile = function () {
      $scope.popupData = {};
      popupData.lastname = $scope.profile.lastname;
      popupData.firstname = $scope.profile.firstname;
      popupData.telephone = $scope.profile.telephone;
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
        '<input type="tel" placeholder="Telefonnummer" ng-model="popupData.telephone">' +
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
            onTap: function (e) {
              if ($scope.popupData.lastname != null &&
                $scope.popupData.firstname != null &&
                $scope.popupData.telephone != null) {
                ProfileService.profile.lastname = $scope.popupData.lastname;
                ProfileService.profile.firstname = $scope.popupData.firstname;
                ProfileService.profile.telephone = $scope.popupData.telephone;
                window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
                CommunicationService.changeProfileInfos(ProfileService.profile.lastname, ProfileService.profile.firstname, ProfileService.profile.telephone);
              }
              else {
                ResultService.changedProfile(1);
              }
            }
          },
        ]
      });

      promptPopup.then(function (res) {
        console.log(res);
      });

    };

    $scope.changePage = function (page) {
      this.nav.push(ItemDetailsPage, {
        item: item
      });
    }

    $ionicPlatform.ready(function () {
      // Enable to debug issues.
      window.plugins.OneSignal.setLogLevel({ logLevel: 4, visualLevel: 4 });

      var notificationOpenedCallback = function (jsonData) {
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
      };

      window.plugins.OneSignal.init("c9607961-b043-486d-9449-0587764bb739",
        { googleProjectNumber: "40863005073" },
        notificationOpenedCallback);

      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(true); // TODO set to false

      document.addEventListener("pause", function () {
        CommunicationService.sendLocationToServer();
      }, false);
      document.addEventListener("resume", function () {
        //code for action on resume
        CommunicationService.sendLocationToServer();
      }, false)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      $scope.$apply();
      $scope.getDeviceContacts();
    });

    $scope.urlForImage = function (imageName) {
      var trueOrigin = cordova.file.dataDirectory + imageName;
      return trueOrigin;
    }

    $scope.addMedia = function () {
      $scope.hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Take photo' },
          { text: 'Photo from library' }
        ],
        titleText: 'Add images',
        cancelText: 'Cancel',
        buttonClicked: function (index) {
          $scope.addImage(index);
          /*$scope.hideSheet();
          ProfileService.profile.picture = "img/icons/grey_woman.png";
          $scope.profile = ProfileService.profile;*/
          //$scope.$apply();
        }
      });
    }

    $scope.addImage = function (type) {
      $scope.hideSheet();
      ImageService.handleMediaDialog(type).then(function () {
        $scope.$apply();
      });
    }
  })

  //factories

  .factory('ImageService', function ($cordovaCamera, ProfileService, $q, $cordovaFile) {
    //var image = 'http://ionicframework.com/img/docs/venkman.jpg';
    //var IMAGE_STORAGE_KEY = 'image';
    makeid = function () {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < 15; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    optionsForType = function (type) {
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
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: source,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        correctOrientation: true
      };
    }

    saveMedia = function (type) {
      return $q(function (resolve, reject) {
        //window.localStorage.setItem(IMAGE_STORAGE_KEY, image);
        var options = optionsForType(type);

        $cordovaCamera.getPicture(options).then(function (imageUrl) {
          ProfileService.profile.picture = imageUrl;//cordova.file.dataDirectory + imageData;
          /*var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
          var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
          var newName = makeid() + name;
          $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
            .then(function(info) {
              ProfileService.storeImage(newName);
              resolve();
            }, function(e) {
              reject();
            });*/
        });
      })
    }
    return {
      handleMediaDialog: saveMedia,
      makeid: makeid
    }
  })

  .factory('ProfileService', function () {
    var profile;

    if (JSON.parse(window.localStorage.getItem("profile")) != undefined) {
      profile = JSON.parse(window.localStorage.getItem("profile"));
    }
    else {
      profile =
        {
          username: "",
          lastname: "",
          firstname: "",
          email: "",
          telephone: "",
          password: "",
          addresses: [],
          currentAddress: 0,
          picture: "img/icons/black_avatar.png",
          contacts: [],
          rating: 5,
          salt: 0,
          requests: [],
          access_token: "",
          push: true,
          location: true
        }
    }

    var image;
    var IMAGE_STORAGE_KEY = 'image';

    addImage = function (img) {
      image = img;
      profile.picture = image;
      window.localStorage.setItem("profile", JSON.stringify(profile));
    };

    return {
      profile: profile,
      storeImage: addImage
    }
  })

  .factory('ResultService', function ($ionicPopup) {
    changedPassword = function (result) {
      switch (result) {
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

    changedProfile = function (result) {
      switch (result) {
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

    showResult = function (result) {
      var content = "";
      switch (result) {
        case 42:
          content = "Das Passwort wurde erfolgreich geändert";
          break;
        case 242:
          content = "Die Benutzerdaten wurden erfolgreich geändert";
          break;
        case 73:
          content = "Der Kontakt wurde erfolgreich hinzugefügt";
          break;
        case 7399:
          content = "Danke für deine Hilfe!";
          break;
        case 43:
          content = "Schön, dass deine Anfrage erfolgreich war!";
          break;
        case 22:
          content = "Deine Anfrage wurde veröffentlicht!";
          break;
      }
      var promptPopup = $ionicPopup.prompt({
        title: content,
        buttons: [
          {
            text: 'OK',
            type: 'button-borrowitblau'
          }
        ]
      });
    }

    showError = function (error) {
      switch (error) {
        case 400: break; //fehlender Parameter
        case 401: break; //nicht authorisiert
        case 404: break; //not found
        case 500: break; //interner Fehler (DB nicht erreichbar z.B.)
        case 942: break; //Username vergeben
        case 943: break; //Telefonnummer vergeben
        default: break;
      }
    }

    return {
      changedPassword: changedPassword,
      changedProfile: changedProfile,
      showError: showError
    }
  })

  .factory('CommunicationService', ['$http', '$auth', '$cordovaGeolocation', '$timeout', 'ResultService', 'ProfileService', function ($http, $auth, $cordovaGeolocation, $timeout, ResultService, ProfileService) {
    HOST = "https://sb.pftclan.de";
    PORT = 546;
    var HOST = "http://localhost";
    var PORT = "3000"
    var URLBACKEND = HOST + ":" + PORT + "/api/smartbackend/";
    var URLBORROWIT = HOST + ":" + PORT + "/api/borrowit/";
    var salt;

    initiateConnection = function (token) {
      $http.defaults.headers.common['Authorization'] = "Bearer " + ProfileService.profile.access_token;
    }

    sha512 = function (password, salt) {
      var hash = window.CryptoJS.HmacSHA512(password, salt).toString(); /** Hashing algorithm sha512 */
      return hash;
    };

    createSalt = function () {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < 64; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    var addAddress = function (address) {
      return $http({ method: "POST", url: URLBORROWIT + "profile/address/add", data: { street: address.street, streetnumber: address.streetnumber, zip: address.zip, city: address.city, country: address.country } })
        .then(function (result) {
          //man könnte ne Bestätigung zeigen
          var addressid = result.data[0].addressid;
          return addressid;
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    };

    removeAddress = function (addressid) {
      $http({ method: "POST", url: URLBORROWIT + "profile/address/remove", data: { addressid: addressid } })
        .then(function (result) {
          //man könnte ne Bestätigung zeigen
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    };

    changeCurrentAddress = function (currentaddress) {
      $http({ method: "POST", url: URLBORROWIT + "profile/address/currentaddress", data: { currentaddress: currentaddress } })
        .then(function (result) {
          //man könnte ne Bestätigung zeigen
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    };

    changeProfilePicture = function (currentaddress) {
      $http({ method: "POST", url: URLBORROWIT + "profile/address/currentaddress", data: { currentaddress: currentaddress } })
        .then(function (result) {
          //man könnte ne Bestätigung zeigen
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    };

    var getAllPersons = function () {
      return $http({ method: "GET", url: URLBORROWIT + "user" })
        .then(function (result) {
          var contacts = result.data;
          console.log("Juhu");
          return contacts;
        }, function (error) {
          console.log("Mist");
          ResultService.showError(error);
          // toSomething
        });
    };

    var getContactsFromDevice = function (phoneContacts) {
      return $http({ method: "POST", url: URLBORROWIT + "user", data: { phonenumbers: phoneContacts } })
        .then(function (result) {
          var contacts = result.data;
          console.log("Juhu");
          return contacts;
        }, function (error) {
          console.log("Mist");
          ResultService.showError(error);
          // toSomething
        });
    };

    var getPerson = function (userid) {
      return $http({ method: "GET", url: URLBORROWIT + "profile/" + userid })
        .then(function (result) {
          var person = result.data[0];
          console.log("Juhu");
          return person;
        }, function (error) {
          console.log("Mist");
          ResultService.showError(error);
          // toSomething
        });
    }

    var getAllChats = function () {
      return $http({ method: "GET", url: URLBORROWIT + "chat/rooms" })
        .then(function (result) {
          var chats = result.data;
          console.log("Juhu");
          return chats;
        }, function (error) {
          console.log("Mist");
          ResultService.showError(error);
          // toSomething
        });
    };

    var openChat = function (roomid, exists) {
      if (exists) {
        return $http({ method: "POST", url: URLBORROWIT + "chat/room", data: { roomid: roomid } })
          .then(function (result) {
            var chats = result.data;
            console.log("Juhu");
            return chats;
          }, function (error) {
            console.log("Mist");
            ResultService.showError(error);
            // toSomething
          });
      }
      else {
        return $http({ method: "POST", url: URLBORROWIT + "chat/room", data: { requestid: roomid } })
          .then(function (result) {
            var chats = result.data;
            console.log("Juhu");
            return chats;
          }, function (error) {
            console.log("Mist");
            ResultService.showError(error);
            // toSomething
          });
      }
    };

    sendMessage = function (roomid, message) {
      $http({ method: "PUT", url: URLBORROWIT + "chat/" + roomid, data: { text: message.text, date: message.date } })
        .then(function (result) {
          //man könnte ne Bestätigung zeigen
          //var addressid = result.data[0];
          //return addressid;
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    };

    updateChat = function () {

    };

    var sendBorrowIt = function () {
      return $http({ method: "POST", url: URLBORROWIT + "request" + reqid + "/offer" })
        .then(function (result) {
          console.log("Juhu");
        }, function (error) {
          console.log("Mist");
          ResultService.showError(error);
          // toSomething
        });
    };

    var acceptBorrowIt = function () {
      return $http({ method: "POST", url: URLBORROWIT + "request" + reqid + "/accept" })
        .then(function (result) {
          console.log("Juhu");
        }, function (error) {
          console.log("Mist");
          ResultService.showError(error);
          // toSomething
        });
    };

    var declineBorrowIt = function () {
      return $http({ method: "POST", url: URLBORROWIT + "decline" + reqid + "/offer" })
        .then(function (result) {
          console.log("Juhu");
        }, function (error) {
          console.log("Mist");
          ResultService.showError(error);
          // toSomething
        });
    };

    sendLocationToServer = function () {
      //alle 15 Minuten
      while (true) {
        $timeout(function () {
          if (ProfileService.profile.location) {
            var location = getGeoLocation();
            location.then(function (result) {
              var geolocation = result;
              $http({ method: "PUT", url: URLBORROWIT + "location", data: { location: geolocation } })
                .then(function (result) {
                  //man könnte ne Bestätigung zeigen
                  //var addressid = result.data[0];
                  //return addressid;
                }, function (error) {
                  ResultService.showError(error);
                  // toSomething
                });
            })
          }
        }, 900000)
      }
    };

    var getGeoLocation = function () {
      var posOptions = { timeout: 10000, enableHighAccuracy: true };
      return $cordovaGeolocation.getCurrentPosition(posOptions)
        .then(function (position) {
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          return lat + ", " + long;
        }, function (err) {
          ResultService.showError(err);
        });
    };

    getAddressLocation = function () {
      var location = "";
      for (var i = 0; i < ProfileService.profile.addresses.length; i++) {
        if (ProfileService.profile.addresses[i].addressid === ProfileService.profile.currentAddress) {
          location = ProfileService.profile.addresses[i].street + " " + ProfileService.profile.addresses[i].streetnumber + ", " + ProfileService.profile.addresses[i].zip + " " + ProfileService.profile.addresses[i].city + ", " + ProfileService.profile.addresses[i].country;
          return location
        }
      }
    }

    var startRequest = function (title, description, location, startdate, enddate, category) {
      return $http({ method: "PUT", url: URLBORROWIT + "request", data: { title: title, description: description, location: location, startdate: startdate, enddate: enddate, category: category } })
        .then(function (result) {
          //man könnte ne Bestätigung zeigen
          var addressid = result.data[0];
          return addressid;
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    };

    updateRequest = function (reqid, title, description, location, startdate, enddate, category) {
      $http({ method: "POST", url: URLBORROWIT + "request/" + reqid, data: { title: title, description: description, location: location, startdate: startdate, enddate: enddate, category: category } })
        .then(function (result) {
          //man könnte ne Bestätigung zeigen
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    };

    deleteRequest = function () {

    };

    changeProfileInfos = function (lastname, firstname, telephone) {
      $http({ method: "POST", url: URLBORROWIT + "profile/maindata", data: { lastname: lastname, firstname: firstname, telephone: telephone } })
        .then(function (result) {
          //man könnte ne Bestätigung zeigen
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    };

    changeProfilePicture = function (picture) {
      //upload picture and get URL
      var pictureURl
      $http({ method: "POST", url: URLBORROWIT + "profile/picture", data: { picture: pictureURl } })
        .then(function (result) {
          //man könnte ne Bestätigung zeigen
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    };

    addContact = function (contactid) {
      $http({ method: "POST", url: URLBORROWIT + "profile/contact/add", data: { contactid: contactid } })
        .then(function (result) {
          //man könnte ne Bestätigung zeigen
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    };

    changePush = function (push) {
      $http({ method: "POST", url: URLBORROWIT + "profile/push", data: { push: push } })
        .then(function (result) {
          //man könnte ne Bestätigung zeigen
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    };

    changeLocation = function (location) {
      $http({ method: "POST", url: URLBORROWIT + "profile/location", data: { location: location } })
        .then(function (result) {
          //man könnte ne Bestätigung zeigen
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    };

    addRating = function (contactid, reqid, rating) {
      $http({ method: "POST", url: URLBORROWIT + "rating", data: { rated_user: contactid, request: reqid, rating: rating } })
        .then(function (result) {
          //man könnte ne Bestätigung zeigen
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    };

    var getCurrentRequest = function (reqid) {
      if (ProfileService.profile.location) {
        var location = getGeoLocation();
        return location.then(function (result) {
          var geolocation = result;
          return $http({ method: "POST", url: URLBORROWIT + "request/" + reqid, data: { currentlocation: geolocation } })
            .then(function (result) {
              var request = result.data[0];
              var startdate = request.startdate.split('T')[0].split('-');
              var starttime = request.startdate.split('T')[1].split('.')[0].split(':');
              request.startdate = startdate[2] + "." + startdate[1] + "." + startdate[0] + " " + starttime[0] + ":" + starttime[1];
              var enddate = request.enddate.split('T')[0].split('-');
              var endtime = request.enddate.split('T')[1].split('.')[0].split(':');
              request.enddate = enddate[2] + "." + enddate[1] + "." + enddate[0] + " " + endtime[0] + ":" + endtime[1];
              console.log("Juhu");
              return request;
            }, function (error) {
              console.log("Mist");
              ResultService.showError(error);
              // toSomething
            });
        })
      }
      else {
        var location = getAddressLocation();
        return $http({ method: "POST", url: URLBORROWIT + "request/" + reqid, data: { currentlocation: location } })
          .then(function (result) {
            var request = result.data[0];
            var startdate = request.startdate.split('T')[0].split('-');
            var starttime = request.startdate.split('T')[1].split('.')[0].split(':');
            request.startdate = startdate[2] + "." + startdate[1] + "." + startdate[0] + " " + starttime[0] + ":" + starttime[1];
            var enddate = request.enddate.split('T')[0].split('-');
            var endtime = request.enddate.split('T')[1].split('.')[0].split(':');
            request.enddate = enddate[2] + "." + enddate[1] + "." + enddate[0] + " " + endtime[0] + ":" + endtime[1];
            console.log("Juhu");
            return request;
          }, function (error) {
            console.log("Mist");
            ResultService.showError(error);
            // toSomething
          });
      }
    }

    var getAllRequests = function () {
      if (ProfileService.profile.location) {
        var location = getGeoLocation();
        return location.then(function (result) {
          var geolocation = result;
          return $http({ method: "POST", url: URLBORROWIT + "request", data: { currentlocation: geolocation } })
            .then(function (result) {
              var requests = result.data;
              console.log("Juhu");
              return requests;
            }, function (error) {
              console.log("Mist");
              ResultService.showError(error);
              // toSomething
            });
        })
      }
      else {
        var location = getAddressLocation();
        return $http({ method: "POST", url: URLBORROWIT + "request", data: { currentlocation: location } })
          .then(function (result) {
            var requests = result.data;
            console.log("Juhu");
            return requests;
          }, function (error) {
            console.log("Mist");
            ResultService.showError(error);
            // toSomething
          });
      }
    }

    signup = function (provider) {
      salt = ProfileService.profile.email;
      $auth.removeToken();
      ProfileService.profile.password = sha512(ProfileService.profile.password, salt);  // THERE IS NO GUARANTEE THAT THE SALT IS CORRECT MAY ITS A RANDOM SALT FOR SAFTEY IF EMAIL ISNT CORRECT
      //ProfileService.profile.salt = salt;
      $http({ method: "POST", url: URLBACKEND + "auth/signup", params: { email: ProfileService.profile.email, password: ProfileService.profile.password } })
        .then(function (result) {
          ProfileService.profile.access_token = result.data.access_token;
          $http.defaults.headers.common['Authorization'] = "Bearer " + ProfileService.profile.access_token;
          $http({
            method: "PUT", url: URLBORROWIT + "profile", data: {
              lastname: ProfileService.profile.lastname,
              firstname: ProfileService.profile.firstname,
              email: ProfileService.profile.email,
              username: ProfileService.profile.username,
              telephone: ProfileService.profile.telephone,
              picture: ProfileService.profile.picture,
              currentaddress: ProfileService.profile.currentAddress,
              addresses: ProfileService.profile.addresses
            }
          })
            .then(function (result) {
              console.log("Juhu");
              //ProfileService.profile.access_token = result.data.access_token;
              //$http.defaults.headers.common['Authorization'] = "Bearer "+ ProfileService.profile.access_token;
            }, function (error) {
              console.log("Mist");
              ResultService.showError(error);
              // toSomething
            });
        }, function (error) {
          ResultService.showError(error);
          // toSomething
        });
    }

    login = function (provider, email, password) {
      if (provider === "email") {
        //SENT EMAIL TO SERVER GET A SALT
        $auth.removeToken();
        var salt = email;
        ProfileService.profile.password = sha512(password, salt);  // THERE IS NO GUARANTEE THAT THE SALT IS CORRECT MAY ITS A RANDOM SALT FOR SAFTEY IF EMAIL ISNT CORRECT
        ProfileService.profile.email = email;
        $http({ method: "POST", url: URLBACKEND + "auth/email", params: { email: ProfileService.profile.email, password: ProfileService.profile.password } })
          .then(function (result) {
            ProfileService.profile.access_token = result.data.access_token;
            $http.defaults.headers.common['Authorization'] = "Bearer " + ProfileService.profile.access_token;
            $http({ method: "GET", url: URLBORROWIT + "profile" })
              .then(function (result) {
                console.log("Juhu");
                ProfileService.profile.username = result.data[0].username;
                ProfileService.profile.lastname = result.data[0].lastname;
                ProfileService.profile.firstname = result.data[0].firstname;
                ProfileService.profile.telephone = result.data[0].telephone;
                ProfileService.profile.addresses = result.data[0].addresses;
                ProfileService.profile.currentAddress = result.data[0].currentaddress;
                ProfileService.profile.picture = result.data[0].picture;
                ProfileService.profile.contacts = result.data[0].contacts;
                ProfileService.profile.rating = result.data[0].rating;
                ProfileService.profile.requests = result.data[0].requests;
                ProfileService.profile.push = result.data[0].push;
                ProfileService.profile.location = result.data[0].location;
                window.localStorage.setItem("profile", JSON.stringify(ProfileService.profile));
                window.plugins.OneSignal.getIds(function (ids) {
                  console.log('getIds: ' + JSON.stringify(ids));
                  //alert("userId = " + ids.userId + ", pushToken = " + ids.pushToken);
                  if (ids !== undefined && ids.userId !== undefined) {
                    var deviceId = ids.userId;
                    // TODO send userId (or pushToken?) to backend POST to /api/smartbackend/push/register
                    sendDeviceId(deviceId);
                  }
                });
              }, function (error) {
                console.log("Mist");
                ResultService.showError(error);
                // toSomething
              });
            window.location = '#/';
          }, function (error) {
            ResultService.showError(error);
            console.log(error.data);
          })
      }
    }

    sendDeviceId = function (deviceId) {
      $http({ method: "POST", url: URLBACKEND + "push/register", data: { deviceid: deviceId } })
        .then(function (result) {

        }, function (error) {
          ResultService.showError(error);
        })
    }

    authenticate = function (provider) {
      if (provider === "facebook") {
        $auth.removeToken();
        $auth.authenticate(provider).then(function (response) {
          console.log($auth.getToken());
          console.log($auth.getPayload());
          $http({ method: "GET", url: URLBACKEND + "auth/" + provider + "/", params: { id_token: $auth.getToken() } })
            .then(
            function (result) {
              console.log('yes im ok');
              ProfileService.profile.access_token = $auth.getToken();

            }, function (error) {
              console.log('Error: ' + error);
              ResultService.showError(error);
            }
            )
            .catch(function (response) {
              userService.SocialLoginFailed();
            });
        })
      }
    }

    return {
      signup: signup,
      login: login,
      authenticate: authenticate,
      initiateConnection: initiateConnection,
      getAllPersons: getAllPersons,
      getPerson: getPerson,
      getContactsFromDevice: getContactsFromDevice,
      getAllRequests: getAllRequests,
      getCurrentRequest: getCurrentRequest,
      addAddress: addAddress,
      removeAddress: removeAddress,
      changeCurrentAddress: changeCurrentAddress,
      addContact: addContact,
      addRating: addRating,
      changeProfileInfos: changeProfileInfos,
      changePush: changePush,
      changeLocation: changeLocation,
      startRequest: startRequest,
      updateRequest: updateRequest,
      deleteRequest: deleteRequest,
      sendLocationToServer: sendLocationToServer,
      getGeoLocation: getGeoLocation,
      getAllChats: getAllChats,
      openChat: openChat,
      sendMessage: sendMessage,
      sendBorrowIt: sendBorrowIt,
      acceptBorrowIt: acceptBorrowIt
    }
  }])

  .factory('MockService', ['$http', '$q',
    function ($http, $q) {
      var me = {};

      me.getUserMessages = function (d) {
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

        setTimeout(function () {
          deferred.resolve(getMockMessages());
        }, 1500);

        return deferred.promise;
      };

      me.getMockMessage = function () {
        return {
          username: 'Venkman',
          date: new Date(),
          text: '<div class="button-bar">' +
          '<a class="button button-block button-balanced icon ion-checkmark" ng-click=""></a>' +
          '<a class="button button-block button-assertive icon ion-close" ng-click=""></a>' +
          '</div>' +
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        };
      }

      return me;
    }
  ])

  // fitlers
  .filter('nl2br', ['$filter',
    function ($filter) {
      return function (data) {
        if (!data) return data;
        return data.replace(/\n\r?/g, '<br />');
      };
    }
  ])

  .filter('searchContent', function () {
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

  .filter('searchContact', function () {
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

  .filter('filterRequests', function () {
    return function (items, category) {
      var filtered = [];
      switch (category) {
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

  .filter('chooseCategoryImage', function () {
    return function (items, category) {
      var filtered = [];
      var obj = {};
      switch (category) {
        case "kitchen":
          filtered = items.whiteKitchen;
          break;
        case "food":
          filtered = items.whiteCutlery;
          break;
        case "sport":
          filtered = items.whiteSoccerBall;
          break;
        case "freetime":
          filtered = items.whiteJoystick;
          break;
        case "car":
          filtered = items.whiteCar;
          break;
        case "home":
          filtered = items.whiteHome;
          break;
        case "garden":
          filtered = items.whiteSprout;
          break;
        default:
          filtered = items.whiteMedal;
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
    function ($timeout) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          $timeout(function () {
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
              angular.element(autolinks[i]).bind('click', function (e) {
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
    function ($timeout, $window, config) {
      'use strict';

      return {
        require: 'ngModel',
        restrict: 'A, C',
        link: function (scope, element, attrs, ngModel) {

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
            boxOuter = !borderBox ? { width: 0, height: 0 } : {
              width: parseInt(taStyle.getPropertyValue('border-right-width'), 10) +
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
            angular.forEach(copyStyle, function (val) {
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
              $timeout(function () {
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

          scope.$view(function () {
            return ngModel.$modelValue;
          }, function (newValue) {
            forceAdjust();
          });

          scope.$on('elastic:adjust', function () {
            initMirror();
            forceAdjust();
          });

          $timeout(adjust);

          /*
           * destroy
           */

          scope.$on('$destroy', function () {
            $mirror.remove();
            $win.unbind('resize', forceAdjust);
          });
        }
      };
    }
  ])

function onProfilePicError(ele) {
  ele.src = 'img/icons/black_avatar.png'; // set a fallback
}

function getMockMessages() {
  return { "messages": [], "unread": 0 };
}

// configure moment relative time


!function (a, b) { "function" == typeof define && define.amd ? define([], function () { return a.returnExportsGlobal = b() }) : "object" == typeof exports ? module.exports = b() : a.Autolinker = b() } (this, function () { var a = function (b) { a.Util.assign(this, b), this.matchValidator = new a.MatchValidator }; return a.prototype = { constructor: a, urls: !0, email: !0, twitter: !0, newWindow: !0, stripPrefix: !0, className: "", htmlCharacterEntitiesRegex: /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;)/gi, matcherRegex: function () { var a = /(^|[^\w])@(\w{1,15})/, b = /(?:[\-;:&=\+\$,\w\.]+@)/, c = /(?:[A-Za-z][-.+A-Za-z0-9]+:(?![A-Za-z][-.+A-Za-z0-9]+:\/\/)(?!\d+\/?)(?:\/\/)?)/, d = /(?:www\.)/, e = /[A-Za-z0-9\.\-]*[A-Za-z0-9\-]/, f = /\.(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/, g = /[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]?!:,.;]*[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]]/; return new RegExp(["(", a.source, ")", "|", "(", b.source, e.source, f.source, ")", "|", "(", "(?:", "(", c.source, e.source, ")", "|", "(?:", "(.?//)?", d.source, e.source, ")", "|", "(?:", "(.?//)?", e.source, f.source, ")", ")", "(?:" + g.source + ")?", ")"].join(""), "gi") } (), charBeforeProtocolRelMatchRegex: /^(.)?\/\//, link: function (b) { var c = this, d = this.getHtmlParser(), e = this.htmlCharacterEntitiesRegex, f = 0, g = []; return d.parse(b, { processHtmlNode: function (a, b, c) { "a" === b && (c ? f = Math.max(f - 1, 0) : f++), g.push(a) }, processTextNode: function (b) { if (0 === f) for (var d = a.Util.splitAndCapture(b, e), h = 0, i = d.length; i > h; h++) { var j = d[h], k = c.processTextNode(j); g.push(k) } else g.push(b) } }), g.join("") }, getHtmlParser: function () { var b = this.htmlParser; return b || (b = this.htmlParser = new a.HtmlParser), b }, getTagBuilder: function () { var b = this.tagBuilder; return b || (b = this.tagBuilder = new a.AnchorTagBuilder({ newWindow: this.newWindow, truncate: this.truncate, className: this.className })), b }, processTextNode: function (a) { var b = this; return a.replace(this.matcherRegex, function (a, c, d, e, f, g, h, i, j) { var k = b.processCandidateMatch(a, c, d, e, f, g, h, i, j); if (k) { var l = b.createMatchReturnVal(k.match, k.matchStr); return k.prefixStr + l + k.suffixStr } return a }) }, processCandidateMatch: function (b, c, d, e, f, g, h, i, j) { var k, l = i || j, m = "", n = ""; if (c && !this.twitter || f && !this.email || g && !this.urls || !this.matchValidator.isValidMatch(g, h, l)) return null; if (this.matchHasUnbalancedClosingParen(b) && (b = b.substr(0, b.length - 1), n = ")"), f) k = new a.match.Email({ matchedText: b, email: f }); else if (c) d && (m = d, b = b.slice(1)), k = new a.match.Twitter({ matchedText: b, twitterHandle: e }); else { if (l) { var o = l.match(this.charBeforeProtocolRelMatchRegex)[1] || ""; o && (m = o, b = b.slice(1)) } k = new a.match.Url({ matchedText: b, url: b, protocolUrlMatch: !!h, protocolRelativeMatch: !!l, stripPrefix: this.stripPrefix }) } return { prefixStr: m, suffixStr: n, matchStr: b, match: k } }, matchHasUnbalancedClosingParen: function (a) { var b = a.charAt(a.length - 1); if (")" === b) { var c = a.match(/\(/g), d = a.match(/\)/g), e = c && c.length || 0, f = d && d.length || 0; if (f > e) return !0 } return !1 }, createMatchReturnVal: function (b, c) { var d; if (this.replaceFn && (d = this.replaceFn.call(this, this, b)), "string" == typeof d) return d; if (d === !1) return c; if (d instanceof a.HtmlTag) return d.toString(); var e = this.getTagBuilder(), f = e.build(b); return f.toString() } }, a.link = function (b, c) { var d = new a(c); return d.link(b) }, a.match = {}, a.Util = { abstractMethod: function () { throw "abstract" }, assign: function (a, b) { for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]); return a }, extend: function (b, c) { var d = b.prototype, e = function () { }; e.prototype = d; var f; f = c.hasOwnProperty("constructor") ? c.constructor : function () { d.constructor.apply(this, arguments) }; var g = f.prototype = new e; return g.constructor = f, g.superclass = d, delete c.constructor, a.Util.assign(g, c), f }, ellipsis: function (a, b, c) { return a.length > b && (c = null == c ? ".." : c, a = a.substring(0, b - c.length) + c), a }, indexOf: function (a, b) { if (Array.prototype.indexOf) return a.indexOf(b); for (var c = 0, d = a.length; d > c; c++)if (a[c] === b) return c; return -1 }, splitAndCapture: function (a, b) { if (!b.global) throw new Error("`splitRegex` must have the 'g' flag set"); for (var c, d = [], e = 0; c = b.exec(a);)d.push(a.substring(e, c.index)), d.push(c[0]), e = c.index + c[0].length; return d.push(a.substring(e)), d } }, a.HtmlParser = a.Util.extend(Object, { htmlRegex: function () { var a = /[0-9a-zA-Z][0-9a-zA-Z:]*/, b = /[^\s\0"'>\/=\x01-\x1F\x7F]+/, c = /(?:".*?"|'.*?'|[^'"=<>`\s]+)/, d = b.source + "(?:\\s*=\\s*" + c.source + ")?"; return new RegExp(["(?:", "<(!DOCTYPE)", "(?:", "\\s+", "(?:", d, "|", c.source + ")", ")*", ">", ")", "|", "(?:", "<(/)?", "(" + a.source + ")", "(?:", "\\s+", d, ")*", "\\s*/?", ">", ")"].join(""), "gi") } (), parse: function (a, b) { b = b || {}; for (var c, d = b.processHtmlNode || function () { }, e = b.processTextNode || function () { }, f = this.htmlRegex, g = 0; null !== (c = f.exec(a));) { var h = c[0], i = c[1] || c[3], j = !!c[2], k = a.substring(g, c.index); k && e(k), d(h, i.toLowerCase(), j), g = c.index + h.length } if (g < a.length) { var l = a.substring(g); l && e(l) } } }), a.HtmlTag = a.Util.extend(Object, { whitespaceRegex: /\s+/, constructor: function (b) { a.Util.assign(this, b), this.innerHtml = this.innerHtml || this.innerHTML }, setTagName: function (a) { return this.tagName = a, this }, getTagName: function () { return this.tagName || "" }, setAttr: function (a, b) { var c = this.getAttrs(); return c[a] = b, this }, getAttr: function (a) { return this.getAttrs()[a] }, setAttrs: function (b) { var c = this.getAttrs(); return a.Util.assign(c, b), this }, getAttrs: function () { return this.attrs || (this.attrs = {}) }, setClass: function (a) { return this.setAttr("class", a) }, addClass: function (b) { for (var c, d = this.getClass(), e = this.whitespaceRegex, f = a.Util.indexOf, g = d ? d.split(e) : [], h = b.split(e); c = h.shift();)-1 === f(g, c) && g.push(c); return this.getAttrs()["class"] = g.join(" "), this }, removeClass: function (b) { for (var c, d = this.getClass(), e = this.whitespaceRegex, f = a.Util.indexOf, g = d ? d.split(e) : [], h = b.split(e); g.length && (c = h.shift());) { var i = f(g, c); -1 !== i && g.splice(i, 1) } return this.getAttrs()["class"] = g.join(" "), this }, getClass: function () { return this.getAttrs()["class"] || "" }, hasClass: function (a) { return -1 !== (" " + this.getClass() + " ").indexOf(" " + a + " ") }, setInnerHtml: function (a) { return this.innerHtml = a, this }, getInnerHtml: function () { return this.innerHtml || "" }, toString: function () { var a = this.getTagName(), b = this.buildAttrsStr(); return b = b ? " " + b : "", ["<", a, b, ">", this.getInnerHtml(), "</", a, ">"].join("") }, buildAttrsStr: function () { if (!this.attrs) return ""; var a = this.getAttrs(), b = []; for (var c in a) a.hasOwnProperty(c) && b.push(c + '="' + a[c] + '"'); return b.join(" ") } }), a.MatchValidator = a.Util.extend(Object, { invalidProtocolRelMatchRegex: /^[\w]\/\//, hasFullProtocolRegex: /^[A-Za-z][-.+A-Za-z0-9]+:\/\//, uriSchemeRegex: /^[A-Za-z][-.+A-Za-z0-9]+:/, hasWordCharAfterProtocolRegex: /:[^\s]*?[A-Za-z]/, isValidMatch: function (a, b, c) { return b && !this.isValidUriScheme(b) || this.urlMatchDoesNotHaveProtocolOrDot(a, b) || this.urlMatchDoesNotHaveAtLeastOneWordChar(a, b) || this.isInvalidProtocolRelativeMatch(c) ? !1 : !0 }, isValidUriScheme: function (a) { var b = a.match(this.uriSchemeRegex)[0]; return "javascript:" !== b && "vbscript:" !== b }, urlMatchDoesNotHaveProtocolOrDot: function (a, b) { return !(!a || b && this.hasFullProtocolRegex.test(b) || -1 !== a.indexOf(".")) }, urlMatchDoesNotHaveAtLeastOneWordChar: function (a, b) { return a && b ? !this.hasWordCharAfterProtocolRegex.test(a) : !1 }, isInvalidProtocolRelativeMatch: function (a) { return !!a && this.invalidProtocolRelMatchRegex.test(a) } }), a.AnchorTagBuilder = a.Util.extend(Object, { constructor: function (b) { a.Util.assign(this, b) }, build: function (b) { var c = new a.HtmlTag({ tagName: "a", attrs: this.createAttrs(b.getType(), b.getAnchorHref()), innerHtml: this.processAnchorText(b.getAnchorText()) }); return c }, createAttrs: function (a, b) { var c = { href: b }, d = this.createCssClass(a); return d && (c["class"] = d), this.newWindow && (c.target = "blank"), c }, createCssClass: function (a) { var b = this.className; return b ? b + " " + b + "-" + a : "" }, processAnchorText: function (a) { return a = this.doTruncate(a) }, doTruncate: function (b) { return a.Util.ellipsis(b, this.truncate || Number.POSITIVE_INFINITY) } }), a.match.Match = a.Util.extend(Object, { constructor: function (b) { a.Util.assign(this, b) }, getType: a.Util.abstractMethod, getMatchedText: function () { return this.matchedText }, getAnchorHref: a.Util.abstractMethod, getAnchorText: a.Util.abstractMethod }), a.match.Email = a.Util.extend(a.match.Match, { getType: function () { return "email" }, getEmail: function () { return this.email }, getAnchorHref: function () { return "mailto:" + this.email }, getAnchorText: function () { return this.email } }), a.match.Twitter = a.Util.extend(a.match.Match, { getType: function () { return "twitter" }, getTwitterHandle: function () { return this.twitterHandle }, getAnchorHref: function () { return "https://twitter.com/" + this.twitterHandle }, getAnchorText: function () { return "@" + this.twitterHandle } }), a.match.Url = a.Util.extend(a.match.Match, { urlPrefixRegex: /^(https?:\/\/)?(www\.)?/i, protocolRelativeRegex: /^\/\//, protocolPrepended: !1, getType: function () { return "url" }, getUrl: function () { var a = this.url; return this.protocolRelativeMatch || this.protocolUrlMatch || this.protocolPrepended || (a = this.url = "http://" + a, this.protocolPrepended = !0), a }, getAnchorHref: function () { var a = this.getUrl(); return a.replace(/&amp;/g, "&") }, getAnchorText: function () { var a = this.getUrl(); return this.protocolRelativeMatch && (a = this.stripProtocolRelativePrefix(a)), this.stripPrefix && (a = this.stripUrlPrefix(a)), a = this.removeTrailingSlash(a) }, stripUrlPrefix: function (a) { return a.replace(this.urlPrefixRegex, "") }, stripProtocolRelativePrefix: function (a) { return a.replace(this.protocolRelativeRegex, "") }, removeTrailingSlash: function (a) { return "/" === a.charAt(a.length - 1) && (a = a.slice(0, -1)), a } }), a });

