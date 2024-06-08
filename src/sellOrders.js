const https = require('node:https')
const axios = require('axios')
const { api } = require('./api')


require('dotenv').config()
const sellOrders = async (req, res) => {
  try {
    const sellOrdersBody = req.body
    if (!sellOrdersBody.length) throw new Error('body missing')
    const result = await Promise.all(sellOrdersBody.map(sellOrderBody => sellOrder(sellOrderBody)))
    res.status(201).send(result)
  } catch (err) {
    if (err.response) {
      console.log(JSON.stringify(err.response.data))
    }
    else console.log(err)
    res.status(500).send({
      message: 'internal server error'
    })
  }
}

const sellOrder = async (orderBody) => {
  try {
    const requiredFields = ["quantity", "amount", "description", "guaranteedDeliveryTime", "offerTitle", "itemId",
      "tradeEnvironmentId", "accountSecretDetails"]
    const keys = Object.keys(orderBody)
    if (!requiredFields.every(field => keys.includes(field))) throw new Error('Required Field Missing')

    const { quantity, amount, description, guaranteedDeliveryTime, mainOfferImage, offerTitle, itemId, tradeEnvironmentId, accountSecretDetails } = orderBody
    const sellOrderBody = {
      "details": {
        "pricing": {
          quantity,
          "minQuantity": 1,
          "pricePerUnit": {
            amount,
            "currency": "USD"
          },
          "volumeDiscounts": []
        },
        description,
        guaranteedDeliveryTime,
        offerTitle
      },
      "augmentedItem": {
        itemId,
        tradeEnvironmentId: tradeEnvironmentId || null,
        "attributeIdsCsv": orderBody.attributeIdsCsv
      },
      accountSecretDetails
    }
    if (mainOfferImage) {
      sellOrderBody.details.mainOfferImage = mainOfferImage
    }
    const { data } = await api.post('/flexibleOffers/account', sellOrderBody, {
      headers: {
        'accept': 'application/json',

        'Cookie': `__Host-EldoradoIdToken=${process.env.ELDORADO_ID_TOKEN}`,
        'swagger': 'Swager request'
      }
    })
    return data
  } catch (err) {
    throw err
  }
}


module.exports = { sellOrders }