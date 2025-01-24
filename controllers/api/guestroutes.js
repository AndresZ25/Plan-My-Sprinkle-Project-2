const router = require('express').Router();
//  /api/guest
router.get("/test",(req,res)=>{
    res.json({message:"hello from your server"})
})
module.exports = router;