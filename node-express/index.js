const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const User = require('./models/user')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('60f98ffa418e80798a9eda64')
        req.user = user
        next()
    } catch (e) {
        console.log(e)
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = 'mongodb+srv://wladios:bnqVMAA2Lb1Q2OSr@cluster0.34yzy.mongodb.net/shop?retryWrites=true&w=majority'
    
        mongoose.connect(url, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false 
        })

        const candidate = await User.findOne()
        if (!candidate) {
            const user = new User({
                email: 'vladyslav@gmail.com',
                name: 'vladyslav',
                cart: {items: []}
            })
            await user.save()
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start()