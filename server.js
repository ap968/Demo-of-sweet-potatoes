// First you should have installed node to Demo directory

// Then you have to create a package for json (package.json)
// npm init

// Install express and save it to your project
// npm install --save express
// You will then see the node_modules

// Then run the server
// node server

// Then GO TO Demo directory and run the server
// node server

// Then you have to run the server file (without the extension .js)
// node server

// npm --save node
// Then GO TO Demo directory and run the server
// node server

// Import the necessary module from node for the app (express) 
// Then use express to initialize the app
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

// routes, as to test from the root page that the server is working
app.get('/', function (request, response){
    response.send('Hello, world');
});

//
app.get('/comments', function (request, response){
    console.log('GET request received at /comments');
    db.all('SELECT * FROM comments', function(err, rows){
        if(err){
            console.log("Error: " + err);
        }
        else{
            // console.log("Rows sent");
            response.send(rows);
            // console.log("Rows sent");
        }
    });
});

// A POST request is used when the client sends data to the server
// i.e. when the user submits the form to the server to be processed
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

// Make server listen for rewuests on port 3000
// and display a message if the server is listening
var PORT=3000;
app.listen(PORT, function(){
    console.log("Server is running on port %s", PORT);
});