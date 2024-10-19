import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PhotoPublishSchema = new Schema({
    title: {
        required: true,
        type: String,
    },
    photo: {
        required: true,
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})


const Photo = mongoose.model('Photo' , PhotoPublishSchema);
export default Photo;