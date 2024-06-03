const https = require('node:https')
const axios = require('axios')
const {api}=require('./api')

require('dotenv').config()
const sellOrder = async (req, res) => {
  try {
    const requiredFields = ["quantity", "amount", "description", "guaranteedDeliveryTime", "offerTitle", "itemId",
      "tradeEnvironmentId", "accountSecretDetails"]
    const keys = Object.keys(req.body)
    // //  console.log(keys)
    if (!requiredFields.every(field => keys.includes(field))) throw new Error('Required Field Missing')

    const { quantity, amount, description, guaranteedDeliveryTime, offerTitle, itemId, tradeEnvironmentId, accountSecretDetails, mainOfferImage } = req.body
    const sellOrderBody =
    {
      "details": {
        "pricing": {
          "quantity": Number(quantity),
          "minQuantity": 1,
          "pricePerUnit": {
            "amount": Number(amount),
            "currency": "USD"
          },
          "volumeDiscounts": []
        },
        "description": description,
        "guaranteedDeliveryTime": guaranteedDeliveryTime,
        "offerTitle": offerTitle
      },
      "augmentedItem": {
        "itemId": itemId,
        "tradeEnvironmentId": tradeEnvironmentId  || null,
        "attributeIdsCsv": null
      },
      "accountSecretDetails": [
        accountSecretDetails
      ]
    }

    if (mainOfferImage) {
      sellOrderBody.details.mainOfferImage = mainOfferImage
    }
    console.log(sellOrderBody)

    const { data } = await api.post('/flexibleOffers/account/', sellOrderBody, {
      headers: {
        'accept': 'application/json',
        //"User-Agent": "Smurfuniverse111-Bot-rJ32kNfvUt",
        'Cookie': `__Host-EldoradoIdToken=${process.env.ELDORADO_ID_TOKEN}`,
        'swagger': 'Swager request'
      }
    })
    res.status(201).send(data)
  } catch (err) {
    // console.log(console.log(JSON.stringify(err)))
    console.log(err.response)
    // if(err.respons){

    // }
    res.status(500).send({
      message: 'internal server error'
    })
  }
}

module.exports = { sellOrder }