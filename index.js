const PORT = process.env.PORT || 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://plo.vn/an-sach-song-khoe/'

// app.get('/', function (req, res) {
//   res.json('This is my webscraper')
// })

app.get('/', (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)
      const articles = []

      $('.story', html).each(function () {
        //<-- cannot be a function expression
        const title = $(this).text().trim()
        const url = $(this).find('a').attr('href')
        const img = $(this).find('img').attr('data-src')
        articles.push({
          title,
          url,
          img,
        })
      })
      res.json(articles)
    })
    .catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
