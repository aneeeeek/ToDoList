const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({ 
    todo: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    },
    check: {
        type: Boolean,
        required: true
    }
})

const todo = mongoose.model('todo', todoSchema)
module.exports = todo 
