const bookController = require('../bookSchema/bookSchema')
const createBook = async function (req, res) {
    try {
        let data = req.body
        let { bookName, authorName, category, subCategory,price,count } = req.body
        if (!data) {
            return res.status(400).send({ status: false, message: 'dataRequired' })
        }
        if (!bookName) {
            return res.status(400).send({ status: false, message: 'bookNameRequired' })
        }
        if (!authorName) {
            return res.status(400).send({ status: false, message: 'AuthorNameRequired' })
        } if (!category) {
            return res.status(400).send({ status: false, message: 'NameRequired' })
        }
        if (!price) {
            return res.status(400).send({ status: false, message: 'PriceRequired' })
        } 
        if (!count) {
            return res.status(400).send({ status: false, message: 'quantityRequired' })
        }
        let bookData = await bookController.create(data)
        res.status(201).send({ status: true, message: 'bookCreatedSuccessfully', data: bookData })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
//.................................get books..........................................
const getbooks = async function (req, res) {
    try {
        let getBookData = await bookController.find({},{_id:0,category:0})
        res.status(200).send({ status: true, message: getBookData })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
//................................get books by filter..................................
const getBookByFilter = async function (req, res) {
    try {
        let data = req.query
        //let { bookName, category, authorName } = data
        if (data) {
            let getData = await bookController.find(data)
            res.status(200).send({ status: true, message: getData })

        } else {
            res.status(404).send({ status: false, message: 'please provide the valid filter' })
        }

    } catch (err) {
        res.status(500).send({ staus: false, message: err.message })
    }
}

module.exports = { createBook, getbooks, getBookByFilter}