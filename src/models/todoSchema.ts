import mongoose, { Schema, Document } from 'mongoose';

interface Todo extends Document{
    title: String,
    description: String, 
    isCompleted: Boolean
}

const TodoSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
});

export default mongoose.model<Todo>("Todo", TodoSchema);