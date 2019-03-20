const mongoose = require('mongoose')

const mongoURL = process.env.MONGODB_URL

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// const wilson = new User({
//     name: 'Wilson Ong',
//     email: 'wilson.ong.tian.zhi@gmail.com',
//     password: 'A,2Q~]h9',
//     age: 6
// })

// wilson.save().then((user) => {
//     console.log(user);
// }).catch((error) => {
//     console.log(error);
// })

// const task = new Task({ 
//     description: 'Write sci-fi story', 
//     completed: false
// });

// task.save().then((task) => {
//     console.log(task);
// }).catch((error) => {
//     console.log(error);
// })

