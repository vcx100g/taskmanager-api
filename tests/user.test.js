const request = require('supertest')

const app = require('../src/app')
const User = require('../src/models/user')

const { userOne, userOneId, setupDatabase } = require('./fixtures/db')

describe('User tests', () => {
    beforeEach(setupDatabase);

    test('Should signup a new user', async () => {
        const newUser = {
            "name": "Luke Wooden",
            "email": "luke.wooden@gmail.com",
            "password": "<fP,>V_x4ax*3KL",
            "age": 41
        }

        const response = await request(app).post('/users').send(newUser).expect(201)

        const user = await User.findById(response.body.user._id)
        expect(user).not.toBeNull()

        expect(response.body).toMatchObject({
            user: {
                name: user.name,
                email: user.email
            },
            token: user.tokens[0].token
        })
    })

    test('Should login a existing user', async () => {
        const response = await request(app).post('/users/login').send({
            "email": "blibii@gmail.com",
            "password": "<fP,>V_x4ax*3KL",
        }).expect(200)

        const user = await User.findById(userOneId)
        expect(response.body.token).toBe(user.tokens[1].token)
    })

    test('Should not login a non exist user', async () => {
        await request(app).post('/users/login').send({
            "email": "some1@gmail.com",
            "password": "<fP,>V_x4ax*3KL",
        }).expect(400)
    })

    test('Should get profile for user', async () => {
        const response = await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
    })

    test('Should delete user account', async () => {
        await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)

        const user = await User.findById(userOneId)
        expect(user).toBeNull()
    })

    test('Should not delete account for unauthenticate user', async () => {
        await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer `)
            .send()
            .expect(401)
    })

    test('Should upload avatar image', async () => {
        await request(app)
            .post('/users/me/avatar')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .attach('avatar', 'tests/fixtures/profile-pic.jpg')
            .expect(200)

        const user = await User.findById(userOneId)
        expect(user.avatar).toEqual(expect.any(Buffer))
    })

    test('Should update valid user field', async () => {
        const name = 'Maggie2141'
        await request(app)
            .patch('/users/me/')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({ name })
            .expect(200)

        const user = await User.findById(userOneId)
        expect(user.name).toBe(name)
    })

    test('Should not update invalid user field', async () => {
        const location = 'Kuala Lumpur'
        await request(app)
            .patch('/users/me/')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({ location })
            .expect(400)
    })
});

