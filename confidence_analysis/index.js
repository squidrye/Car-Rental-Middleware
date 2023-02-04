const express = require("express");
const router = express.Router();
const axios = require("axios");
const cohere = require('cohere-ai');
// console.log(process.env.key);
cohere.init(process.env.key);
examples = [
    { text: "Example 1Price is a little high than other companies", label: "Negative" },
    { text: "Too many variants in this model", label: "Negative" },
    { text: "There are very low specifications in the base model. ", label: "Negative" },
    { text: " Look wise very stylish", label: "Positive" },
    { text: "Impressive by the interior", label: "Positive" },
    { text: "Ground space is good", label: "Positive" },
    { text: "Van is very comfortable for travel. The built in antennae for the tv is awsome for watching local chanels. Van is very quiet and rides smooth. Regency does a great job on their conversion packages.", label: "Positive" },
    { text: "A little short on leg room but overall very comfortable. Lots of windows, everyone gets a window seat. It looks great, I've been getting loads of compliments", label: "Positive" },
    { text: "Its been a nightmare, Since ive had this car, the water pump, upper control arms, tie rod ends, gas tank, and thermostat had to be replaced in less than 4 months", label: "Negative" },
    { text: "Fuel sucks but comfort and power is awesome!!! Added exhaust and cold air intake to add more horsepower,overall, I would recommend to anyone.", label: "Positive" },
    { text: "Wheels started to corrode, transmission leaked, windshield wiper controls had to be replaced ", label: "Negative" },
    { text: "Mine has color matched 22 chrome wheels...had a side wall puncture", label: "Negative" },
]
const inputs = [
    "it was a great ride, easy to get in touch with lender",
    "damaged vehicle provided, no assurance of safety"
]
router.post('/', async function (req, res) {
    const options = {
        method: 'POST',
        url: 'https://api.cohere.ai/classify',
        headers: {
            accept: 'application/json',
            'Cohere-Version': '2022-12-06',
            'content-type': 'application/json',
            authorization: `Bearer ${process.env.key}`
        },
        data: {
            inputs: inputs,
            examples: examples,
            truncate: 'END'
        }
    };

    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            res.send({ description: response.data.classifications })
        })
        .catch(function (error) {
            console.error(error);
        });
})
module.exports = router;