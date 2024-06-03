const https = require('node:https')
const axios = require('axios')
const _pool_id = 'us-east-2_MlnzCFgHk'
const {api}=require('./api')
require('dotenv').config()

//https://www.eldorado.gg/api/orders/me/seller/orders

const getGames = async (req, res) => {
  try {
    const { itemTreeType } = req.params
    if (!itemTreeType) throw new Error('itemTreeType missing')
    const { data } = await api.get('/itemTree', {
      headers: {
        'accept': 'application/json',
        // "User-Agent":"Smurfuniverse111-Bot-rJ32kNfvUt",
        // 'Cookie': `__Host-EldoradoIdToken=${process.env.ELDORADO_ID_TOKEN}`,
        'swagger': 'Swager request'
      }
    })
    // return res.status(200).send(data)
    return res.status(200).send(data.map(game => {

      return {
        gameId: game.gameId,
        itemTreeID: game.uiJumpToItemTreeId,
        gameName: game.menuGameTitle,
        itemTreeType: game.itemTreeType
      }
    }).filter(game => game.itemTreeType == itemTreeType))
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal server error." });
  }
}
// function GetGame(typeGame) {

//   return new Promise((resolve, reject) => {
//     try {
//       axios.get('https://www.eldorado.gg/api/itemTree', {
//         headers: {
//           'accept': 'application/json',
//           'Cookie': `__Host-EldoradoIdToken=${process.env.ELDORADO_ID_TOKEN}`,
//           'swagger': 'Swager request'
//         }
//       }).then(response => resolve(response.data.map(game => {
//         return {
//           gameId: game.gameId,
//           itemTreeID: game.uiJumpToItemTreeId,
//           gameName: game.menuGameTitle,
//           itemTreeType: game.itemTreeType
//         }
//       }).filter(game => game.itemTreeType == typeGame))).catch(err => reject(err))

//     } catch (err) {

//       reject(err)
//     }
//   })

// }



// GetGame('Account').then(res => console.log(res)).catch(err => console.log(err))

module.exports = {
  getGames
}