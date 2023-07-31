const express=require('express')
const bodyParser=require('body-parser')
const router =require('./routes/route')
const mongoose=require('mongoose')
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb+srv://ranguvenugopal2455:Venu%402455@cluster0.cecsyp0.mongodb.net/',{
    useNewUrlParser:true
}).then(()=>console.log('mongooseDB is connected'))
.catch(err=>console.log(err))
app.use('/',router)
app.listen(process.env.PORT||3000,function(){
    console.log('express app running on port'+(process.env.PORT||3000))
})
//mongodb+srv://ranguvenugopal2455:<password>@cluster0.hbbytsx.mongodb.net