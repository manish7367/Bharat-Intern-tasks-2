const express=require('express')
const mongoose=require('mongoose')
const Article=require('./models/article')
const articleRouter=require('./routes/articles')

const app=express()

mongoose.connect('mongodb://127.0.0.1:27017/blogwebsite',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log('Connection Successful....'))
.catch((err)=>console.log(err));

app.set('view engine','ejs')

app.use(express.json())

app.use(express.urlencoded({extended:true}))


app.get('/',async(req,res)=>{
  const articles=await Article.find().sort({createdAt:'desc'})
  res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRouter)

app.use(express.static('public'))


app.listen(8080)