# BorrowIt!
----------------------------------------------------
In this document, you find information on how to use the *BorrowIt!* Backend REST API. This API is used by the *BorrowIt!* frontend only. In addition, the *BorrowIt!* frontend uses the SmartBackend REST API.

The source code can be found here: [SmartBackend Repository](https://github.com/benedikt-sondermann/smartbackend).

The own userid never needs to be sent because it is retrieved from the access_token, set in the Authorization header.

## Host and Port
* **For production use**: https://sb.pftclan.de:546/api/borrowit
* **For debug purposes**: http://localhost:3000/api/borrowit

## Headers
* `Authorization: Bearer` followed by a space character and the access_token received from SmartBackend REST API


## Profile

### Create Profile
----

  Must be called to add further details to user that has been created before. These two steps need to be performed before:

1. SmartBackend REST API: create a user with email, password and access_token
2. BorrowIt! REST API: add at least one address to the user

  Phone number will be standardized by backend before inserting into database table.

#### URL

  /profile

#### Method

  `PUT`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `lastname=[string]`

   `firstname=[string]`

   `email=[string]`

   `username=[string]`

   `telephone=[string]`

   `currentaddress=[uuid]` (uuid of an address that has already been created)

   `currentlocation=[string]` (any string that is recognized as a location by the Google Geolocation API, e.g. "UOIT Oshawa" or "43.9421137, -78.8969975")

##### Optional:
   `picture=[string]` (URL where the profile picture is located)

#### Success Response

  * **Code:** 201 CREATED <br />
 
#### Error Response

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 942 USERNAME ALREADY IN USE <br />
    **Description:** Parameter `username` must be unique, but is already used by another user

  OR

  * **Code:** 943 
  * 
  * 
  * 
  * NE ALREADY IN USE <br />
    **Description:** Parameter `telephone` must be unique, is already used by another user

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection



### Get Own Profile
-------------------

  Returns information about the profile of the user.

#### URL

  /profile

#### Method

  `GET`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
  None

##### Optional:
  None

#### Success Response

  * **Code:** 200 OK <br />
	**Content:**
		
		[
		  {
		    "id": "0fd8bf88-4f43-11e6-9105-877288ff69cf",
			"lastname": "Sondermann",
		    "firstname": "Benedikt",
		    "email": "benedikt.sondermann@hpe.com",
		    "username": "benedikt.sondermann",
		    "telephone": "+4921029480771",
		    "picture": "https://de.wikipedia.org/wiki/Mustermann",
		    "currentaddress": "ba68e006-5266-11e6-bbf8-6bc0e6da83ad",
		    "push": true,
		    "location": false,
		    "rating": "4.0000000000000000",
		    "addresses": [
		      {
		        "addressid": "d207897a-5265-11e6-ad52-c3ced07dffc7",
		        "street": "Seckenheimer Landstraße",
		        "streetnumber": "4a",
		        "zip": "68163",
		        "city": "Mannheim",
		        "country": "Deutschland"
		      },
		      {
		        "addressid": "ba68e006-5266-11e6-bbf8-6bc0e6da83ad",
		        "street": "Berliner Straße",
		        "streetnumber": "111",
		        "zip": "40880",
		        "city": "Ratingen",
		        "country": "Deutschland"
		      }
		    ],
		    "contacts": [
		      {
		        "username": "emma.musterfrau2",
		        "uid": "9174a7d4-4e79-11e6-9ffd-a3efb8ff8fbc",
		        "picture": "https://de.wikipedia.org/wiki/Mustermann"
		      },
		      {
		        "username": "anita.musterfrau5",
		        "uid": "97700fe4-4e7d-11e6-894a-7705447bc4d3",
		        "picture": "https://de.wikipedia.org/wiki/Mustermann"
		      }
		    ],
		    "requests": [
		      {
		        "requestid": 50,
		        "title": "Regenschirm",
		        "username": "benedikt.sondermann"
		      },
		      {
		        "requestid": 7,
		        "title": "Grillgut",
		        "username": "benedikt.sondermann"
		      },
		      {
		        "requestid": 6,
		        "title": "Dosenöffner",
		        "username": "benedikt.sondermann"
		      }
		    ]
		  }
		]
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection


### Get Foreign Profile
-----------------------

  Returns information about the profile of the user :userid.

#### URL

  /profile/:userid

#### Method

  `GET`
  
#### URL Params

##### Required:
  `userid=[string]` (uuid of the user whose profile is to be returned)

##### Optional:
  None

#### Data Params

##### Required:
  None

##### Optional:
  None

#### Success Response

  * **Code:** 200 OK <br />
	**Content:**

		[
		  {
		    "username": "mcs",
		    "picture": "https://de.wikipedia.org/wiki/Mustermann",
		    "rating": "2.0000000000000000",
		    "requests": [
		      {
		        "requestid": 19,
		        "title": "Sonnencreme",
		        "username": "bso"
		      }
		    ]
		  }
		]
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection




### Add Address
---------------

  Adds an address to the user.

#### URL

  /profile/address/add

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `street=[string]`

   `streetnumber=[string]`

   `zip=[string]`

   `city=[string]`

   `country=[string]`

##### Optional:
   None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection





### Remove Address
------------------

  Removes an address of the user.

#### URL

  /profile/address/remove

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `addressid=[string]`

##### Optional:
   None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection





### Update Current Address
--------------------------

  Sets address `currentaddress` as the new current address of the user.

#### URL

  /profile/address/add

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `currentaddress=[string]` (addressid of the current address)

##### Optional:
   None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection





### Update Main Data (`lastname`, `firstname`, `telephone`)
-----------------------------------------------------------

  Updates lastname, firstname and telephone of the user. Phone number will be standardized by backend before inserting into database table.

#### URL

  /profile/maindata

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `lastname=[string]`

   `firstname=[string]`

   `telephone=[string]`

##### Optional:
   None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection




### Update Picture
------------------

  Updates the user's profile picture.

#### URL

  /profile/picture

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `picture=[string]` (URL where the new profile picture is located)

##### Optional:
   None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection




### Enable Or Disable Push Messages
-----------------------------------

  Sets boolean `push` to TRUE or FALSE. Only if `push` is set to TRUE (which is the default value), the user will receive push notifications when a new request is published by another user nearby. 

#### URL

  /profile/push

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `push=[boolean]`

##### Optional:
   None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection




### Enable Or Disable Usage Of Geolocation
------------------------------------------

  Sets boolean `location` to TRUE or FALSE. The value of this boolean will only be used by the frontend (if `location` is set to FALSE (default value is TRUE), the user will not send the own position to the backend regularly, and a new request always has the currentaddress as its location). 

#### URL

  /profile/location

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `location=[boolean]`

##### Optional:
   None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection




### Update Current Location
---------------------------

  Updates the user's current location (called by the frontend regularly, e.g. every 15 minutes).

#### URL

  /profile/currentlocation

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `currentlocation=[string]` (any string that is recognized as a location by the Google Geolocation API, e.g. "UOIT Oshawa" or "43.9421137, -78.8969975")

##### Optional:
   None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection






### Add Contact
---------------

  Adds a contact to the user.

#### URL

  /profile/contact/add

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `contactid=[string]` (userid of the new contact)

##### Optional:
   None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection


### Remove Contact
------------------

  Removes a contact of the user.

#### URL

  /profile/contact/remove

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `contactid=[string]` (userid of the new contact)

##### Optional:
   None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection


## User

### Get Users
-------------

  Returns information about all users except the user who sent the request to the API. The distance is a value in meters, calculated by the Google Geolocation API (mode: walking). If the destination cannot be reached by walking, the value 40000000 (i.e. 40000 km) is returned.

#### URL

  /user

#### Method

  `GET`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
  None

##### Optional:
  None

#### Success Response

  * **Code:** 200 OK <br />
	**Content:**

		[
		  {
		    "uid": "9174a7d4-4e79-11e6-9ffd-a3efb8ff8fbc",
		    "username": "emma.musterfrau2",
		    "picture": "https://de.wikipedia.org/wiki/Mustermann",
		    "locationotheruser": "UOIT Oshawa, Canada",
		    "ownlocation": "Heidelberg",
		    "distance": 40000000
		  },
		  {
		    "uid": "2b4a8904-4e7b-11e6-9e7e-db9dab563746",
		    "username": "anita.musterfrau2",
		    "picture": "https://de.wikipedia.org/wiki/Mustermann",
		    "locationotheruser": "Mannheim, Germany",
		    "ownlocation": "Heidelberg",
		    "distance": 18356
		  },
		  {
		    "uid": "e1e4bbc8-4fc8-11e6-af24-fbc58358101d",
		    "username": "Bene",
		    "picture": "https://de.wikipedia.org/wiki/Mustermann",
		    "locationotheruser": "43.9421137, -78.8969975",
		    "ownlocation": "Heidelberg",
		    "distance": 40000000
		  },
		  {
		    "uid": "0af865c6-526e-11e6-95a7-b734cfbb2569",
		    "username": "bso",
		    "picture": "https://de.wikipedia.org/wiki/Mustermann",
		    "locationotheruser": "Pastoratsweg 11, 40489 Düsseldorf, Deutschland",
		    "ownlocation": "Heidelberg",
		    "distance": 272209
		  }
		]
 
#### Error Response

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection


### Get Users From Array With Phone Numbers
-------------------------------------------

  Returns information about all users whose phone numbers are sent as `telephone` in array `phonenumbers` (except the user who sent the request to the API). Phone numbers will be standardized by backend before comparing them to the phone numbers from the database.

#### URL

  /user

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `phonenumbers=[array of strings "telephone"]` (array of telephone numbers, e.g. all telephone numbers from the user's device contacts)

##### Optional:
  None

#### Success Response

  * **Code:** 200 OK <br />
	**Content:**

		[
		  {
		    "uid": "2b4a8904-4e7b-11e6-9e7e-db9dab563746",
		    "username": "anita.musterfrau2",
		    "picture": "https://de.wikipedia.org/wiki/Mustermann"
		  },
		  {
		    "uid": "724ec900-4e7b-11e6-a778-1719d18b7989",
		    "username": "anita.musterfrau3",
		    "picture": "https://de.wikipedia.org/wiki/Mustermann"
		  },
		  {
		    "uid": "97700fe4-4e7d-11e6-894a-7705447bc4d3",
		    "username": "anita.musterfrau5",
		    "picture": "https://de.wikipedia.org/wiki/Mustermann"
		  },
		  {
		    "uid": "111bac9a-4e7e-11e6-bc8e-bfdb4053cba8",
		    "username": "anita.musterfrau6",
		    "picture": "https://de.wikipedia.org/wiki/Mustermann"
		  }
		]

#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection


## Request

### Get Requests
----------------

  Returns information about all requests which are currently open (i.e. offered is FALSE and enddate is in the future), except the requests that have been created by the user. Parameter `currentlocation` is used to calculate the distance between the user and the location where the object was requested. The distance is a value in meters, calculated by the Google Geolocation API (mode: walking). If the destination cannot be reached by walking, the value 40000000 (i.e. 40000 km) is returned.

#### URL

  /request

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `currentlocation=[string]` (can be any string that is recognized as a location by the Google Geolocation API, e.g. "UOIT Oshawa" or "43.9421137, -78.8969975")

##### Optional:
  None

#### Success Response

  * **Code:** 200 OK <br />
	**Content:**

		[
		  {
		    "uid": "d0aaff08-321c-11e6-97a3-77ab455a1568",
		    "title": "Regenschirm",
		    "requestid": 25,
		    "category": "Other",
		    "startdate": "2016-07-21T15:31:47.000Z",
		    "enddate": "2016-07-21T21:00:00.000Z",
		    "username": "Anita",
		    "locationotheruser": "Mannheim, Germany",
		    "distance": 18365,
		    "profile": [
		      {
		        "username": "anita.musterfrau11",
		        "picture": "https://de.wikipedia.org/wiki/Mustermann",
		        "rating": "3.5000000000000000"
		      }
		    ]
		  },
		  {
		    "uid": "d0aaff08-321c-11e6-97a3-77ab455a1568",
		    "title": "Sportschuhe Größe 42",
		    "requestid": 24,
		    "category": "Other",
		    "startdate": "2016-07-21T22:00:00.000Z",
		    "enddate": "2016-07-22T13:45:00.000Z",
		    "username": "Anita",
		    "locationotheruser": "Mannheim, Germany",
		    "distance": 18365,
		    "profile": [
		      {
		        "username": "anita.musterfrau11",
		        "picture": "https://de.wikipedia.org/wiki/Mustermann",
		        "rating": "3.5000000000000000"
		      }
		    ]
		  }
		]
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection


### Create Request
------------------

  Creates a new request and returns the requestid.

#### URL

  /request

#### Method

  `PUT`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `title=[string]`

   `description=[string]`

   `location=[string]` (location where the item is needed; can be any string that is recognized as a location by the Google Geolocation API, e.g. "UOIT Oshawa" or "43.9421137, -78.8969975")

   `startdate=[string]`

   `enddate=[string]`

   `category=[string]`

##### Optional:
  None

#### Success Response

  * **Code:** 200 OK <br />
	**Content:**

		[
		  {
		    "requestid": 51
		  }
		]
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection


### Get Request Details
-----------------------

  Returns information about a specific request.

#### URL

  /request/:requestid/details

#### Method

  `POST`
  
#### URL Params

##### Required:
   `requestid=[string]`

##### Optional:
  None

#### Data Params

##### Required:
   `currentlocation=[string]` (can be any string that is recognized as a location by the Google Geolocation API, e.g. "UOIT Oshawa" or "43.9421137, -78.8969975")

##### Optional:
  None

#### Success Response

  * **Code:** 200 OK <br />
	**Content:**

		[
		  {
		    "requestid": 12,
		    "title": "Test",
		    "description": "Testbeschreibung",
		    "borrower": "0fd8bf88-4f43-11e6-9105-877288ff69cf",
		    "category": "kitchen",
		    "enddate": "2016-12-31T22:59:00.000Z",
		    "startdate": "2016-07-22T02:57:23.000Z",
		    "location": "43.9420899, -78.89706869999999",
		    "ended": false,
		    "uid": "0fd8bf88-4f43-11e6-9105-877288ff69cf",
		    "username": "benedikt.sondermann",
		    "rated": false,
		    "distance": 2649
		  }
		]
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection


### Update Request
------------------

  Updates the request `requestid`.

#### URL

  /request/:requestid

#### Method

  `POST`
  
#### URL Params

##### Required:
   `requestid=[string]`

##### Optional:
  None

#### Data Params

##### Required:
   `title=[string]`

   `description=[string]`

   `location=[string]` (location where the item is needed; can be any string that is recognized as a location by the Google Geolocation API, e.g. "UOIT Oshawa" or "43.9421137, -78.8969975")

   `startdate=[string]`

   `enddate=[string]`

   `category=[string]`

##### Optional:
  None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection


### Mark Request As Offered
---------------------------

  Sets the boolean offered to TRUE. This function is called by the lender.

#### URL

  /request/:requestid/offer

#### Method

  `POST`
  
#### URL Params

##### Required:
   `requestid=[string]`

##### Optional:
  None

#### Data Params

##### Required:
  None

##### Optional:
  None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection


### Mark Request As Accepted
----------------------------

  Sets the boolean accepted to TRUE. This function is called by the borrower.

#### URL

  /request/:requestid/accept

#### Method

  `POST`
  
#### URL Params

##### Required:
   `requestid=[string]`

##### Optional:
  None

#### Data Params

##### Required:
  None

##### Optional:
  None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** User is not the borrower of this request.

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection



### Mark Request As Declined
----------------------------

  Sets the boolean accepted to FALSE. This function is called by the borrower.

#### URL

  /request/:requestid/decline

#### Method

  `POST`
  
#### URL Params

##### Required:
   `requestid=[string]`

##### Optional:
  None

#### Data Params

##### Required:
  None

##### Optional:
  None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** User is not the borrower of this request.

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection



## Rating

Add Rating
----------

  Adds a rating for another user, regarding a specific request.

#### URL

  /rating

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
   `rated_user=[string]` (id of the user to be rated)

   `request=[integer]` (id of the request which the rating belongs to)

   `rating=[integer]` (value between 1 and 5)

##### Optional:
  None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection



Get Rating
----------

  Returns the rating of user `userid`. The return value depends on different factors. This is how the rating is calculated:

* Average rating by other users: 50 % (if there is no rating by others, this value will be 1)
* Average rating by asking user: 50 % (if there is no rating by asking user, this value will be 1)
* Add 1 if user is contact
* Round rating to a value in 0.5 steps
* If rating is greater than 5, return 5

#### URL

  /rating/:userid

#### Method

  `GET`
  
#### URL Params

##### Required:
   `roomid=[string]`

##### Optional:
  None

#### Data Params

##### Required:
  None

##### Optional:
  None

#### Success Response

  * **Code:** 200 OK <br />
	**Content:**

		[
		  {
		    "rating": "3.5000000000000000"
		  }
		]
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection


## Chat


Get Chat Rooms
--------------

  Returns all chat rooms which user is member of.

#### URL

  /chat/rooms

#### Method

  `GET`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### Required:
  None

##### Optional:
  None

#### Success Response

  * **Code:** 200 OK <br />
	**Content:**

		[
		  {
		    "roomid": "d039997e-547e-11e6-aeb0-a73c4cbfb9c2",
		    "profile": [
		      {
		        "uid": "0af865c6-526e-11e6-95a7-b734cfbb2569",
		        "username": "bso",
		        "picture": "https://de.wikipedia.org/wiki/Mustermann"
		      }
		    ],
		    "request": [
		      {
		        "title": "Sonnencreme",
		        "requestid": 19,
		        "borrower": "0af865c6-526e-11e6-95a7-b734cfbb2569",
		        "offered": false,
		        "accepted": false
		      }
		    ]
		  },
		  {
		    "roomid": "f501c9e8-52ad-11e6-b7eb-270b6373d945",
		    "profile": [
		      {
		        "uid": "d0aaff08-321c-11e6-97a3-77ab455a1568",
		        "username": "anita.musterfrau11",
		        "picture": "https://de.wikipedia.org/wiki/Mustermann"
		      }
		    ],
		    "request": [
		      {
		        "title": "Ladekabel",
		        "requestid": 1,
		        "borrower": "d0aaff08-321c-11e6-97a3-77ab455a1568",
		        "offered": false,
		        "accepted": false
		      }
		    ]
		  }
		]
 
#### Error Response

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection


Get Chat Room
-------------

  Behavior depends on which parameters have been sent:
 
* If `roomid` is not set (`requestid` must be set):
	* Creates a new chat room for request `requestid`
	* Adds the user and the "borrower" to the new chat room
	* Returns information about the new chat room
* If `roomid` is set:
	* Returns information about the chat room `roomid`

#### URL

  /chat/room

#### Method

  `POST`
  
#### URL Params

##### Required:
  None

##### Optional:
  None

#### Data Params

##### At least one of these parameters is required:
   `roomid=[string]`

   `requestid=[string]`

#### Success Response

  * **Code:** 200 OK <br />
	**Content:** <br />
	If requestid is set (array `messages` is empty):

		{
		  "roomid": "b84ac45e-5754-11e6-87a9-2be0b370865b",
		  "profile": [
		    {
		      "uid": "d0aaff08-321c-11e6-97a3-77ab455a1568",
		      "username": "anita.musterfrau11",
		      "picture": "https://de.wikipedia.org/wiki/Mustermann"
		    }
		  ],
		  "request": [
		    {
		      "title": "Regenschirm",
		      "requestid": 51,
		      "borrower": "d0aaff08-321c-11e6-97a3-77ab455a1568",
		      "offered": false,
		      "accepted": false
		    }
		  ],
		  "messages": []
		}

	If requestid is not set, but roomid is set (array `messages` can have contents):

		{
		  "roomid": "d039997e-547e-11e6-aeb0-a73c4cbfb9c2",
		  "profile": [
		    {
		      "uid": "0af865c6-526e-11e6-95a7-b734cfbb2569",
		      "username": "bso",
		      "picture": "https://de.wikipedia.org/wiki/Mustermann"
		    }
		  ],
		  "request": [
		    {
		      "title": "Sonnencreme",
		      "requestid": 19,
		      "borrower": "0af865c6-526e-11e6-95a7-b734cfbb2569",
		      "offered": false,
		      "accepted": false
		    }
		  ],
		  "messages": [
		    {
		      "username": "benedikt.sondermann",
		      "text": "Hi there I am using our chat",
		      "date": "2016-07-28T04:51:34.466Z"
		    }
		  ]
		}
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one of the aforementioned parameters is required

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection


Add New Message To Chat Room
----------------------------

  Adds the message `text` to chat room `roomid`.

#### URL

  /chat/:roomid/message

#### Method

  `POST`
  
#### URL Params

##### Required:
   `roomid=[string]`

##### Optional:
  None

#### Data Params

##### Required:
   `text=[string]` (the message to be added to the chat)

##### Optional:
  None

#### Success Response

  * **Code:** 204 NO CONTENT
 
#### Error Response

  * **Code:** 400 BAD REQUEST <br />
    **Description:** At least one required parameter missing

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Description:** Authorization header is missing or access_token is not valid

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Description:** All other issues; e.g. issues with database connection
