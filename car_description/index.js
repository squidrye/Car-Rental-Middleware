const express = require("express");
const router = express.Router();
const axios = require("axios");
const cohere = require('cohere-ai');
// console.log(process.env.key);
cohere.init(process.env.key);
router.get('/', async function(req,res){
    const make = req.query.make;
    const model = req.query.model;
    const options = {
        method: 'POST',
        url: 'https://api.cohere.ai/generate',
        headers: {
          accept: 'application/json',
          'Cohere-Version': '2022-12-06',
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.key}`
        },
        data: {
          max_tokens: 300,
          model:'command-xlarge-nightly',
          return_likelihoods: 'NONE',
          truncate: 'END',
          prompt: `give description ${make} ${model} in 200 words`
        }
      };
      
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          res.send({description: response.data.generations[0].text})
        })
        .catch(function (error) {
          console.error(error);
        });
})

router.get('/pollution', async function(req,res){
    const make = req.query.make;
    const model = req.query.model;
    const options = {
        method: 'POST',
        url: 'https://api.cohere.ai/generate',
        headers: {
          accept: 'application/json',
          'Cohere-Version': '2022-12-06',
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.key}`
        },
        data: {
          max_tokens: 300,
          model:'command-xlarge-nightly',
          return_likelihoods: 'NONE',
          truncate: 'END',
          prompt: `quantity of pollutant released by ${make} ${model} in 10 words`
        }
      };
      
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          res.send({description: response.data.generations[0].text})
        })
        .catch(function (error) {
          console.error(error);
        });
})
module.exports = router;