const express = require('express')
// const app = express() 
const router = express.Router()

router.get('/', (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    res.send("Server is Up and Running").status(200)
})



module.exports = router
