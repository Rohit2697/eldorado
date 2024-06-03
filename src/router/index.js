const { Router } = require('express')
const { upload, imageHandler } = require('../image')
const router = Router()

router.get('/getgames/:itemTreeType', require('../getGameIDs').getGames)
router.get('/getTradeEnv', require('../getTradeEnv').getTradeEnv)
router.post('/sellOrder', require('../sellOrder').sellOrder)
router.post('/sellOrders', require('../sellOrders').sellOrders)
router.post('/image', upload.single('image'), imageHandler)

module.exports = { router }