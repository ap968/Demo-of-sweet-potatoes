// First you should have installed node to Demo directory
// npm --save node
// Then GO TO Demo directory and run the server
// node server

// Install express
// npm --save express
var express = require('express');
var app = express();


// You must have sqlite3 installed on the pc
var sqlite3 = require('sqlite3');

/* You must have sqlite3 installed on the pc
cd db
sqlite3 comments.db
CREATE TABLE comments (name VARCHAR, comment VARCHAR);
.tables
.fullschema
INSERT INTO comments VALUES ('Andrew', This is a test comment.');
SELECT * FROM comments;
*/
var db = new sqlite3.Database('db/comments.db');


// Install body parser
// npm --save body parser
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.get('/', function (request, response){
    response.send('Hello, world');
});

app.get('/comments', function (request, response){
    console.log('GET request received at /comments');
    db.all('SELECT * FROM comments', function(err, rows){
        if(err){
            console.log("Error: " + err);
        }
        else{
            response.send(rows);
            //console.log("Rows sent");
        }
    });
});

app.post('/comments', function(request, response){
    console.log('POST request received at /comments');
    db.run('INSERT INTO comments VALUES (?, ?)', 
    [request.body.fullname, request.body.comment], function(err){
        if(err){
            console.log("Error: " + err);
        }
        else{
            response.status(200).redirect('demo.html');
            //console.log("ok");
        }
    });
});

var PORT=3000;
app.listen(PORT, function(){
    console.log("Server is running on port %s", PORT);
});