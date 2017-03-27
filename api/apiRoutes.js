const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/search/:searchid', getSearch)

router.get('/code/:codeid/:range', getData)

function sendJSONResponse(res, status, content){
  res.status(status)
  res.json(content)
}

function getSearch(req, res){
}

function getData(req, res){
  axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${req.params.codeid}/data.json?api_key=${process.env.API_KEY}&rows=${req.params.range}`)
      .then((data) => {
        res.status(200)
        res.send(data.data)
      })
      .catch((err) => {
        res.status(404)
        res.send('err')
      })
}

module.exports = router