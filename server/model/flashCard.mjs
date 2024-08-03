import mongoose from "mongoose";

const flashCardSchema = new mongoose.Schema({
    grade: String,
    subject: String,
    topic: String,
    subTopic: String,
    question: String,
    hint: String,
    answer: String,
    KeyPoints: String,
});

const FlashCard = mongoose.model('flashCard', flashCardSchema);
export default FlashCard;