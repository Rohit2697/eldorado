const https = require('node:https')
const axios = require('axios')
const _pool_id = 'us-east-2_MlnzCFgHk'
const {api}=require('./api')
require('dotenv').config()
//https://www.eldorado.gg/api/orders/me/seller/orders
function GetMyOrders() {

  return new Promise((resolve, reject) => {
    try {
      api.get('/orders/me/seller/orders', {
        headers: {
          'accept': 'application/json',
          'Cookie': `__Host-EldoradoIdToken=${process.env.ELDORADO_ID_TOKEN}`,
          'swagger': 'Swager request'
        }
      }).then(response => resolve(JSON.stringify(response.data.results))).catch(err => reject(err))

    } catch (err) {

      reject(err)
    }
  })

}



GetMyOrders().then(res => console.log(res)).catch(err => console.log(err))