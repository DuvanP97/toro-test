const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(user);
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;