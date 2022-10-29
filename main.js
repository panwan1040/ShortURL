const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const ShortUrlmodel = require('./models/shortUrl')
const express = require("express")
const app = express()
require('dotenv').config()
port = process.env.PORT
dburl = process.env.DBURL
app.use(express.urlencoded({ extended: false }))
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'));

mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true})



shortlink = ""

app.get('/',async(req,res)=>{
    // const shortUrls = await ShortUrlmodel.find()
    res.render('./index.ejs',{shortUrls : ""});
    // res.render("./index")
})

app.post('/generators', async(req,res)=>{
    texturl = req.body.texturl
    if(!isURL(texturl)){
      res.render('./index',{shortUrls:false});
    }else{
      const shortUrls = await ShortUrlmodel.findOne({ full: texturl })
      // console.log(shortUrls+"<<<<");
      if(shortUrls == null){
        let newshortUrls = await ShortUrlmodel.create({ full: texturl })
        res.render('./index',{shortUrls:newshortUrls.short});
        // console.log(newshortUrls.short+"dddddddddd");
        // res.redirect('/')
      }else{
        // console.log(shortUrls);
        res.render('./index',{shortUrls:shortUrls.short});
      }
    } 
})


app.get('/tracker', async (req, res) => {
  const shortUrls = await ShortUrlmodel.find()
  res.render('./history',{URLTrackers:shortUrls})
})


app.get('/:shortid', async (req, res) => {
  const shortUrl = await ShortUrlmodel.findOne({ short: req.params.shortid })
  if (shortUrl == null) return res.sendStatus(404)
  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})



app.listen(port,()=>{
    console.log(`App listen port ${port}`);
})




  function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

