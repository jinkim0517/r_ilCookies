const cookie = require('../models/cookie.js')
const Cookie = require('../models/cookie.js')
const asyncHandler = require('express-async-handler')

const getAllCookies = asyncHandler(async (req, res) => {
    // Get all cookies from MongoDB
    const cookies = await Cookie.find().lean()

    // If no cookies 
    if (!cookies?.length) {
        return res.status(400).json({ message: 'No cookies found' })
    }
    res.json(cookies)
})

const createCookie = asyncHandler(async (req, res) => {
    const { name, picturePath, description, price } = req.body

    // Confirm data
    if (!name || !picturePath || !description || !price) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await Cookie.findOne({ name }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate name' })
    }

    const cookieObject = { name, picturePath, description, price }

    // Create and store new user 
    const cookie = await Cookie.create(cookieObject)

    if (cookie) { //created 
        res.status(201).json({ message: `New cookie ${name} created` })
    } else {
        res.status(400).json({ message: 'Invalid cookie data received' })
    }
})

const updateCookie = asyncHandler(async (req, res) => {
    const { id, name, picturePath, description, price } = req.body

    // Confirm data 
    if (!id || !name || !picturePath || !description || !price) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the user exist to update?
    const cookie = await Cookie.findById(id).exec()

    if (!cookie) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await Cookie.findOne({ name }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate name' })
    }

    cookie.name = name
    cookie.picturePath = picturePath
    cookie.description = description
    cookie.price = price

    const updatedCookie = await cookie.save()

    res.json({ message: `${updatedCookie.name} updated` })
})

module.exports = {
    getAllCookies,
    createCookie,
    updateCookie
}