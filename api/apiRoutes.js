const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/search/:searchid', getSearch)

router.get('/code/:codeid/:range', getData)

router.get('/compare/:codeid/:range', getCompare)

function getSearch(req, res){
}

function getData(req, res){
  axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${req.params.codeid}/data.json?api_key=${process.env.API_KEY}&rows=${req.params.range}`)
      .then((data) => {
        let dataset = data.data.dataset_data.data.map((a)=>{ return [a[0],a[1],a[2],a[3],a[4],a[5]]})
        res.status(200)
        res.send(dataset)
      })
      .catch((err) => {
        res.status(404)
        res.send('err')
      })
}

function getCompare(req, res){
  axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${req.params.codeid}/data.json?api_key=${process.env.API_KEY}&rows=${req.params.range}&column_index=4`)
      .then((data) => {
        let dataset = data.data.dataset_data.data
        res.status(200)
        res.send(dataset)
      })
      .catch((err) => {
        res.status(404)
        res.send('err')
      })
}

module.exports = router