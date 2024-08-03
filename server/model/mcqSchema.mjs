import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema({
    grade: String,
    subject: String,
    topic: String,
    subTopic: String,
    question: String,
    options: [
        {
            option: String,
            isCorrect: Boolean
        }
    ]
});

const Mcq = mongoose.model('mcq', mcqSchema);
export default Mcq;