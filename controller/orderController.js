const bookController = require('../bookSchema/bookSchema')
const orderController = require('../bookSchema/orderSchema')
const mongoose = require('mongoose')

let userOrder = async function (req, res) {
  try {
    let data = req.body
    let arr = data.items
    let totalPrice = []
    let totalQuantity = []
    let books = []
    for (let i = 0; i < arr.length; i++) {

      let bookQuantity = await bookController.find({ _id: arr[i].bookId })
      // console.log(bookQuantity[0]._id.toString())
      //if (!bookQuantity[0]._id.toString() === arr[i].bookId) return res.status(400).send({ status: false, message: "provide the valid bookId" })
      books.push(bookQuantity)
      if (bookQuantity == []) return res.status(400).send({ status: false, message: "provide the valid bookId" })
      if (arr[i].quantity == 0) {
        return res.status(400).send({ status: false, message: 'please provide the quantity' })
      }
      if (bookQuantity[0].count >= arr[i].quantity) {
        let bookIdentity = await bookController.findOneAndUpdate({ _id: arr[i].bookId }, { $inc: { count: -arr[i].quantity } }, { new: true })
        totalPrice.push(bookIdentity.price * arr[i].quantity)
        totalQuantity.push(arr[i].quantity)

      } else {
        return res.status(404).send({ status: false, message: `check the avaliable quantity` })
      }

    }
    let tlPrice = 0;
    totalPrice.forEach(x => {
      tlPrice += x;
    });
    let dsPrice = tlPrice * 0.1
    totalAmount = tlPrice - dsPrice
    let tlQuantity = 0;
    totalQuantity.forEach(x => { tlQuantity += x })

    data = {
      discountPrice: dsPrice,
      totalPrice: totalAmount,
      totalQuantity: tlQuantity,

    }
    let orderDetails = await orderController.create(data)
    return res.status(201).send({ staus: true, data: orderDetails, books })
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}
module.exports = { userOrder }