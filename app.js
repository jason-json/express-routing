var express = require('express');
var bodyParser =  require('body-parser');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));


app.get('/', function(req, res){
    res.render('index');
});

app.get('/contact', function(req, res){
    res.render('contact', {qs: req.query});
});

app.post('/contact', urlencodedParser, function(req, res){
    console.log(req.body);
    res.render('contact-success',{ data: req.body});
});

app.get('/profile/:name',function(req, res){
    if(req.params.name === 'json'){
        console.log(req.params.name);
        throw new Error('dfsd');
    }else{
        var data = {age: 22, job: 'miweb', hobbies : ['eating','skateborading','nba']};
        res.render('profile', {person: req.params.name, data: data});

    }

});

app.use((req, res, next) => {
    const error = new Error('404 Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.listen(5000);