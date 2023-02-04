const express = require("express");
const router = express.Router();
const axios = require("axios");
const cohere = require('cohere-ai');

cohere.init(process.env.key);

router.get('/', async function (req, res) {
    const car1 = req.query.car1;
    const car2 = req.query.car2;
    const model1 = req.query.model1;
    const model2 = req.query.model2;

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
            model: 'command-xlarge-nightly',
            return_likelihoods: 'NONE',
            truncate: 'END',
            prompt: `which is better ${car1} ${model1} or ${car2} ${model2} differentiate`
        }
    };
    axios.request(options).then(
        function (response) {
            console.log(response.data)
            res.send({ description: response.data.generations[0].text })
        }).catch(function (error) {
            console.error(error);
        });
})
module.exports = router;