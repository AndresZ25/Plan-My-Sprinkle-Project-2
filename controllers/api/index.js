const router = require('express').Router();
const guestroutes = require("./guestroutes");
router.use("/guest",guestroutes)
module.exports = router;