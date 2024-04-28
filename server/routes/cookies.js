const express = require('express')
const router = express.Router()
const cookiesController = require('../controllers/cookies')

router.route('/')
    .post(cookiesController.createCookie)
    .get(cookiesController.getAllCookies)
    .patch(cookiesController.updateCookie)

module.exports = router