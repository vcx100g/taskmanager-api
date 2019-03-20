const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Task = require('../models/task')

const userSchema = mongoose.Schema({ 
    name: {
        type: String,
        requierd: true,
        trim: true,
        minlength: 6,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 100,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email format is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 100
    },
    age: {
        type: Number,
        default: 0,
        min: 0,
        max: 200,
        validate(value) {
            if (value < 0 || value > 200) {
                throw new Error('Age must greater than 0 and less than 200')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign(
        { _id: user._id.toString() }, 
        process.env.JWT_SECRET
    )

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Email not found!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Invalid password!')
    }

    return user
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// need use standard function, () => {} not work
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({ owner: user._id })

    next()
})

const User = mongoose.model('Users', userSchema);

module.exports = User