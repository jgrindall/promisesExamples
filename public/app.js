"use strict";
var testPromise, promiseCount, log, button;

promiseCount = 0;

log = function(s){
	var li = document.createElement('li');
	li.innerHTML = s;
	document.getElementById('log').appendChild(li);
};

testPromise = function() {
    var thisPromiseCount = promiseCount++;
    var delay = Math.random() * 5000 + 3000;
    log('Started ' + thisPromiseCount);
	var promise = new Promise(function(resolve, reject) {
        log(thisPromiseCount +' Promise started');
        setTimeout(function() {
            resolve(thisPromiseCount);
        }, delay);
    });
    promise.then(function(val) {
        log('Promise fulfilled ' + val);
    });
    promise.catch(function() {
    	console.log('promise was rejected');
    });
    log('Promise made ' + thisPromiseCount);
}

button = document.getElementById("button");

button.addEventListener("click", function(){
	testPromise();
});


///////



'use strict';

// A-> $http function is implemented in order to follow the standard Adapter pattern
function $http(url){

  // A small example of object
  var core = {

    // Method that performs the ajax request
    ajax : function (method, url, args) {

      // Creating a promise
      var promise = new Promise( function (resolve, reject) {

        // Instantiates the XMLHttpRequest
        var client = new XMLHttpRequest();
        var uri = url;

        if (args && (method === 'POST' || method === 'PUT')) {
          uri += '?';
          var argcount = 0;
          for (var key in args) {
            if (args.hasOwnProperty(key)) {
              if (argcount++) {
                uri += '&';
              }
              uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
            }
          }
        }

        client.open(method, uri);
        client.send();

        client.onload = function () {
          if (this.status == 200) {
            // Performs the function "resolve" when this.status is equal to 200
            resolve(this.response);
          } else {
            // Performs the function "reject" when this.status is different than 200
            reject(this.statusText);
          }
        };
        client.onerror = function () {
          reject(this.statusText);
        };
      });

      // Return the promise
      return promise;
    }
  };

  // Adapter pattern
  return {
    'get' : function(args) {
      return core.ajax('GET', url, args);
    },
    'post' : function(args) {
      return core.ajax('POST', url, args);
    },
    'put' : function(args) {
      return core.ajax('PUT', url, args);
    },
    'delete' : function(args) {
      return core.ajax('DELETE', url, args);
    }
  };
};
// End A

// B-> Here you define its functions and its payload
var mdnAPI = 'https://developer.mozilla.org/en-US/search.json';
var payload = {
  'topic' : 'js',
  'q'     : 'Promise'
};

var callback = {
  success : function(data){
     console.log(1, 'success', JSON.parse(data));
  },
  error : function(data){
     console.log(2, 'error', JSON.parse(data));
  }
};
// End B

// Executes the method call
$http(mdnAPI)
  .get(payload)
  .then(callback.success)
  .catch(callback.error);



var promise1 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve(2);
    }, 10000);
});

var promise2 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve(7);
    }, 2000);
});

var allPromise = Promise.all([promise1, promise2]);

allPromise.then(function(val){
    console.log(val);
});



var fetchData = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            var data = {
                            users: [
                                { name: 'Jack', age: 22 },
                                { name: 'Tom', age: 21 },
                                { name: 'Isaac', age: 21 },
                                { name: ' Iain', age: 20 }
                            ]
                        };
            resolve(data);
        }, 5000);
    });
}


var prepareDataForCsv = function(data) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            data.users[0].age *= 100;
            resolve(data);
        }, 1000);
    });
};

var writeToCsv = function(data) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if(data.users[3].name === "Iain"){
                reject(new Error("not Iain"));
            }
            else{
                data.users[0].name = "John";
                resolve(data);
            }
        }, 1000);
    });
};

fetchData().then(function(data) {
    return prepareDataForCsv(data);
}).then(function(data) {
    return writeToCsv(data);
}).then(function(data) {
    console.log('your csv has been saved ', data);
}).catch(function(error) {
    console.log('something went wrong', error);
});;



