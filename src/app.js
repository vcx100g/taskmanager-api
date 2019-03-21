const express = require('express')
require('./db/mongoose')

const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()


app.use((req, res, next) => {
    next()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


module.exports = app
