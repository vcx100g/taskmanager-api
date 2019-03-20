const express = require('express')
// const multer = require('multer')

require('./db/mongoose')
// const User = require('./models/user')
// const Task = require('./models/task')

const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()
const port = process.env.PORT


// now run dev using: sudo npm run dev

// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('file must be a Docsx'))
//         }

//         cb(undefined, true)

//         // cb(new Error('file must be a PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })

// const errorMiddleware = (req, res, next) => {
//     throw new Error('From my middleware')
// }

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send({ message: 'image success upload' })
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })


app.use((req, res, next) => {
    next()
})

// app.use((req, res, next) => {
//     return res.status(503).send({ error: 'Server is in maintainance' })
//     next()
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
})

// const main = async () => {
//     const user = await User.findById('5c8fea8c8d5cac5816732f31')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()