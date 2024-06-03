const axios=require('axios')
const api=axios.create({
  baseURL:'https://www.eldorado.gg/api'
})
module.exports={api}