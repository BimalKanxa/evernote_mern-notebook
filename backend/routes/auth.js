const express = require("express")
const router = express.Router()

router.get('/', (req, res)=>{
        const obj = {
            name : "bimal",
            number : 10
        }
            res.json(obj)
})



module.exports = router