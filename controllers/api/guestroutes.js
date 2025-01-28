const router = require('express').Router();
//  /api/guest
router.get("/test",(req,res)=>{
    res.json({message:"hello from your server"})
})
router.post('/create', (req, res) => {
    const eventData = req.body; 
    console.log("Received event data:", eventData);
    res.status(201).json({ message: 'Event created successfully' });
  });
module.exports = router;
