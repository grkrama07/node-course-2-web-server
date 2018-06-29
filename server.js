const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//Static Webserver
//__dirname is path till parent of public
//hbs handlbar registering files / funtions
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


//registering middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err)
        {console.log("Unable to append to server.log")}
    });
    next();
});

//another example
/*app.use((req, res, next) => {
    res.render('maintenance.hbs',{
        pageTitle: 'Maintenance'
    })
});*/

//moved it below because maintenace page won't be displayed if we try to access HELP page
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    
    res.render('home.hbs', {
        name: 'Karthik',
        pageTitle: 'Home',
    });

    /*res.send({
        name: 'karthik',
        like: ['reading','sleeping']
    });*/
});

app.get('/about', (req, res) => {
    //res.send('<h1>ABOUT PAGE</h1>')
    res.render('about.hbs', {
        pageTitle: 'About Page @ 1',
     });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Site Under Constructon',
        errorCode: 102
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});