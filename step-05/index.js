var app = require('./server/server');



var port = 4000;
app.listen(port, function(){
  console.log(`Listening on port on: http://localhost${port}`)
});
