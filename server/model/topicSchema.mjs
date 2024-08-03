import mongoose from "mongoose";

const subTopicSchema = new mongoose.Schema({
    subTopic: String,
    definition: String,
    explanation: String,
    examples: String,
    keyPoints: String,
    diagramLink: String,
    furtherExplanation: String,
});

const topicSchema = new mongoose.Schema({
    grade: String,
    subject: String,
    topic: String,
    subTopic: [subTopicSchema],
});

const Topic = mongoose.model('topic', topicSchema); 
export default Topic;