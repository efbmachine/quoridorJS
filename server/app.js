let bodyParser = require('body-parser');
var app = require('express')();

var mongoose = require('mongoose');
//set up default mongoose connection
var mongoDB = 'mongodb+srv://user:BlackBalloonz@cluster0-y2yv1.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
var User = require('./UserModel');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.post('/signup',(req,res)=>{
    try{
        User.findOne({name:req.body.name},(user)=>{
            res.statusCode(305)
            res.json({data:{message:"user already exists"}})
        })
        let user = new User(req.body)
        user.save((err,data)=>{
            res.statusCode(200)
            res.json({data:{message:'Created Successfully',
                            id:user._id,
                            name:user.name}})
        })
    }catch(err){
        res.statusCode(500)
        console.log(err)

    }
})

app.post('/login',(req,res)=>{
    try{
        User.findOne({name:req.body.name},(user)=>{
            if(user && req.body.password.trim() == user.password){
                res.statusCode(200)
                res.json({data:{message:"Successfully logged in",
                                id:user._id,
                                name:user.name}})
            }else{
                res.json({data:{message:"User or password is wrong"}})
                res.statusCode(404)
            }
        })
    }catch(err){
        res.json({data:{message:'An error occured with the db please try again'}})
        res.statusCode(500)
    }
})

module.export = app
