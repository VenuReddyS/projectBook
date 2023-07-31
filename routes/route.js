const express=require('express')
const router=express.Router();
const {createUser,login}=require('../controller/userController')
const {createBook,getbooks,getBookByFilter}=require('../controller/bookController')
const{userOrder}=require('../controller/orderController')
//userapis
router.post('/register',createUser)
router.post('/login',login)
//book apis
router.post('/books',createBook)
router.get('/getbooks',getbooks)
router.get('/getfilter',getBookByFilter)
router.post('/userorder',userOrder)

module.exports = router