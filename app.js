const express = require('express')
const createPath = require('./helpers/createPath')
const app = express()
const PORT = 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')

const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
require('dotenv').config()

const ch = require('chalk')
const errorMsg = ch.bgKeyword('white').redBright
const successMsg = ch.bgKeyword('green').white

const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.a1alf18.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const mongoose = require('mongoose')
mongoose
        .connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
        .then(() => console.log(successMsg(`Connected to ${process.env.DB_NAME}`)))
        .catch(err => console.log(errorMsg(err)))

// app.use(express.text())
// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

// const methodOverride = require('method-override')
// app.use(methodOverride('_method'))

app.listen(PORT, err => err ? console.log(err): null)



const indexRoutes = require('./routes/index-routes')

app.use(indexRoutes)



app.use((req, res) => {
    const title = 'Страница не найдена'

    res
        .status(404)
        .render(createPath('error'), { title })
})