import mongoose from "mongoose";

const longQuestionSchema = new mongoose.Schema({
    grade: String,
    subject: String,
    topic: String,
    subTopic: String,
    question: String,
    definition: String,
    explanation: String,
    diagram: String,
});

const LongQuestion = mongoose.model('longQuestion', longQuestionSchema);
export default LongQuestion;