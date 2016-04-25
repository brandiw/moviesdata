var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser  = require('body-parser');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true })); //Missing ';'
app.use(bodyParser.json());

//Missing closing ')'
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
}); //Missing }) to close app.get


app.post('/favorites', function(req, res){
  if(!req.query.name || !req.query.oid){
    res.send("Error");
    return; //Missing ';'
  } //Remember to enclose your if statements in {}.

  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.query);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.set('port', (process.env.PORT || 3000));

//The function is app.listen, not app.list. You may have confused this for AngularJS.
app.listen(3000, function(){
  console.log("Listening on port 3000");
});
