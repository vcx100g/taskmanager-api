const request = require('supertest')

const app = require('../src/app')
const Task = require('../src/models/task')

const { 
    userOne, 
    userOneId, 
    userTwo, 
    userTwoId,
    taskOne, 
    taskTwo,
    taskThree,
    setupDatabase
} = require('./fixtures/db')


describe('Task tests', () => {
    beforeEach(setupDatabase);

    test('Should create task for user', async () => {
        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
            .send({
                desscription: "Testing the game"
            })
            .expect(201)
    
        const task = await Task.findById(response.body._id)
        expect(task).not.toBeNull()
        expect(task.completed).toBe(false)
    })
    
    test('Should create task for user', async () => {
        const response = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
            .send()
            .expect(200)
    
        expect(response.body.length).toEqual(2)
    })

    test('Should not delete users tasks', async () => {
        const response = await request(app)
            .get(`/tasks/${taskOne._id}`)
            .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
            .send()
            .expect(404)

        const task = await Task.findById(taskOne._id)
        expect(task).not.toBeNull()
    })

});

