const {Schema, model} = require("mongoose")

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    employee:{
        type: String,
        required: true
    },
    client:{
        type: String,
        required: true
    },
    taskDate:{
        type: String,
        required:true
    },
    status:{
        type: String,
        required:true
    }

},{
    timestamps:true
})

module.exports = model('Task', TaskSchema)
