import mongoose from "mongoose";

const shortQuestionSchema = new mongoose.Schema({
    grade: String,
    subject: String,
    topic: String,
    subTopic: String,
    question: String,
    answer: String,
    diagram: String,
});

const ShortQuestion = mongoose.model('shortQuestion', shortQuestionSchema);
export default ShortQuestion;