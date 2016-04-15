## TODO

-  `server/config/config.js` is incomplete. You must merge the config object in there with the appropriate file depending on what the `NODE_ENV` is. So for instance, if `NODE_ENV` is testing then we should merge config with `config/testing.js` object and then export that merged object in `config.js`;

-  `server/api/api.js` has setup mounted routes for our resources. Its expected a router to exist for each resource.

-  Use a HTTP client to test your api. You should be able to do a get request to all resource and get a success. Remeber to follow the mounted routes from `server/server.js` all the way to the resources' router to determine the route for the resource. We are three routers deep!!



## Promises

```js
// Promisifying native aync code
var fs = require('fs');

var readFile  = function () {
  return new Promise(function (resolve, reject) {
    fs.readFile("./package.json", function (err, file) {
      return err ? reject(err) : resolve(file.toString());
    })
  })
}

//Scenario
//start loading animation func..

reafFile()
  .then(function (file) {
    console.log(file)
  })
  .catch(function (err) {
    console.error(new Error('new error'));
  })
  //some libraries provide this (not native js)
  .finally(function () { //depends on the library
    //update UI (stop loading) no matter what happens up there
  })
```



```js
//whatever you return is passed to the next promise
readFile()
.then(function(file){
  return 'hey'
  })
.then(function(word){
  console.log(word)    //return again if we want

})


//popular pattern:
readFile() //whatever readFile resolves will be fed to logFile & so on
//these functions passed in will consume the resolution of the promise before them
  .then(logfile)
  .then(sendEmail)
  .then(callHome)
  .catch(function (err) {
    //
  })

```


```js
readFile()
.then(logFile, function(err){

})
```


### JWT - JSON Web Tokens
- REST is stateless & every new request to a server it's like it's first time. So if don't send a token every time to the server, you're not going to get access to x protected resource.
- JWT will replace the traditional cookie/session authentication used in traditional web applications.
- It's open standard that is heavily used.
- Don't need cookies or session store (to keep track of sho is signed in).
- JWT will be sent on every request
- Token has to be stored on the client that is requesting resources
