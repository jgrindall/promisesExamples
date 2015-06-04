var express = require("express");

var app = express();

var port = Number(process.env.PORT || 5501);

app.use(express.static(__dirname+"/public/"));

app.render = function(res, path){
	res.sendFile(path);
};

app.get('', function(req, res) {
	app.render(res, "/index.html");
});

app.listen(port, function() {
  console.log("Listening on " + port);
});




  

