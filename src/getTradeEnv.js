const https = require('node:https')
const axios = require('axios')
const { api } = require('./api')
const _pool_id = 'us-east-2_MlnzCFgHk'
require('dotenv').config()
const getTradeEnv = async (req, res) => {
  try {

    const { itemTreeType, gameId } = req.query

    if (!itemTreeType || !gameId) throw new Error('itemTreeType, gameId missing')

    const { data } = await api.get(`/itemTree/${itemTreeType}/?gameId=${gameId}`, {
      headers: {
        'accept': 'application/json',
        // 'Cookie': `__Host-EldoradoIdToken=${process.env.ELDORADO_ID_TOKEN}`,
        'swagger': 'Swager request'
      }
    })
    
    //if (!data.imageLocation) throw new Error('No Image Found')
    return res.status(200).send(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal server error." });
  }
}
module.exports = { getTradeEnv }