const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {        
        res.status(200).json({ status: "UP" });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;