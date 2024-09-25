import { Schema, model } from "mongoose";

const Tasks = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const TaskModel = model('Task', Tasks);
export default TaskModel;