const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const app = require('../src/app')
const User = require('../src/models/user')

const userOndId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOndId,
    "name": "SusieGirl111",
    "email": "blibii@gmail.com",
    "password": "<fP,>V_x4ax*3KL",
    "age": 3,
    "tokens": [{
        token: jwt.sign({ _id: userOndId }, process.env.JWT_SECRET)
    }]
}


beforeEach(async () => {
    await User.deleteMany({})
    await new User(userOne).save()
});

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        "name": "Luke Wooden",
        "email": "luke.wooden@gmail.com",
        "password": "<fP,>V_x4ax*3KL",
        "age": 41
    }).expect(201)
})

test('Should login a existing user', async () => {
    await request(app).post('/users/login').send({
        "email": "blibii@gmail.com",
        "password": "<fP,>V_x4ax*3KL",
    }).expect(200)
})

test('Should not login a non exist user', async () => {
    await request(app).post('/users/login').send({
        "email": "some1@gmail.com",
        "password": "<fP,>V_x4ax*3KL",
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})