const bodyParser = require('body-parser');
const express = require("express")
const app = express()
require('dotenv').config()
port = process.env.PORT
dburl = process.env.DBURL

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: true }));

data = { 
    texturl: "",
    isurl:false
}

app.get('/',(req,res)=>{
    res.render('./pages/index.ejs',data);
    // res.render("./index")
})

app.post('/generator',(req,res)=>{
    // res.render('./pages/index.ejs');
    texturl = req.body.texturl
    data = { 
        texturl: texturl,
        isurl:isURL(texturl)
    }
    res.render('./pages/index.ejs',data)

})



// 


// 















app.listen(port,()=>{
    console.log(`App listen port ${port}`);
})

// connect mongoDB
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = dburl;
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database connect!");
    var dbo = db.db("urlDB");


// obj
    var myobj = { name: "Company Inc", address: "Highway 37" };


// insert
    // dbo.collection("customers").insertOne(myobj, function(err, res) {
    //   if (err) throw err;
    //   console.log("1 document inserted");
    //   db.close();

    // });
  });


  function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }