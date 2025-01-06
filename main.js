const mongoose = require('mongoose');
const ShortUrlmodel = require('./models/shortUrl');
const express = require("express");
const app = express();
require('dotenv').config();

const port = process.env.PORT;
const dburl = process.env.DBURL;

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


// Connect to MongoDB
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Database connection error:', err));

app.get('/', async (req, res) => {
  res.render('index', { shortUrls: [] });
});

app.post('/generators', async (req, res) => {
  let texturl = req.body.texturl;

  if (!texturl.includes("https://")) {
    texturl = "https://" + texturl;
  }

  if (!isURL(texturl)) {
    return res.render('index', { shortUrls: false });
  }

  try {
    const existingShortUrl = await ShortUrlmodel.findOne({ full: texturl });

    if (!existingShortUrl) {
      const newShortUrl = await ShortUrlmodel.create({ full: texturl });
      return res.render('index', { shortUrls: newShortUrl.short });
    }

    return res.render('index', { shortUrls: existingShortUrl.short });
  } catch (err) {
    console.error('Error processing URL:', err);
    res.render('index', { shortUrls: false });
  }
});

app.get('/tracker', async (req, res) => {
  try {
    const shortUrls = await ShortUrlmodel.find();
    res.render('history', { URLTrackers: shortUrls });
  } catch (err) {
    console.error('Error fetching tracking data:', err);
    res.render('history', { URLTrackers: [] });
  }
});

app.get('/topurl', async (req, res) => {
  try {
    const shortUrls = await ShortUrlmodel.find();
    let full = [];
    let countclick = [];

    shortUrls.forEach(item => {
      const baseUrl = getBaseUrl(item.full);
      if (!full.includes(baseUrl)) {
        full.push(baseUrl);
      }
    });

    full.forEach((item, index) => {
      let count = 0;
      shortUrls.forEach(shortUrl => {
        if (getBaseUrl(shortUrl.full) === item) {
          count += shortUrl.clicks;
        }
      });
      countclick.push(count);
    });

    const sortedDict = full.map((item, index) => [item, countclick[index]])
      .sort((a, b) => b[1] - a[1])
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    res.render('topurl', { data: { full, countclick, sortdict: sortedDict } });
  } catch (err) {
    console.error('Error fetching top URLs:', err);
    res.render('topurl', { data: { full: [], countclick: [], sortdict: {} } });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/:shortid', async (req, res) => {
  try {
    const shortUrl = await ShortUrlmodel.findOne({ short: req.params.shortid });

    if (!shortUrl) {
      return res.sendStatus(404);
    }

    shortUrl.clicks++;
    await shortUrl.save();
    res.redirect(shortUrl.full);
  } catch (err) {
    console.error('Error redirecting short URL:', err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

function isURL(str) {
  try {
    new URL(str);  // Improved URL validation
    return true;
  } catch (err) {
    return false;
  }
}

function getBaseUrl(str) {
  try {
    const url = new URL(str);
    return url.origin;
  } catch (err) {
    return '';  // Return empty string for invalid URLs
  }
}
