const express= require('express');
const hbs= require('hbs');
const fs = require('fs');
var app=express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('View Engine','hbs');


app.use((req,res,next)=> {
  var now = new Date().toString();
  var log=`${now}: ${req.method}: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+ '\n',(err)=>{
    if(err){
      console.log("not able to write the log file");
    }
  })
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// })
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('currentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/',(req,res)=>{
  //res.send('<H1>Hello Express</H1>');
  res.render('root.hbs',{
    welcome:'Welcome to the home page of my website',
    pageTitle: 'Home'
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad',(req,res)=>{

    res.send({
      ErrorMessage:'Unable to open page'
  });
});
app.listen(3000,()=>{
  console.log("Server is up on port 3000");
});
