const express = require('express')
const app = express()
const cors = require('cors')
const { router } = require('./src/router/index')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
app.use('/', router)

app.listen(8080, () => console.log(`Server is running on port:8080`))