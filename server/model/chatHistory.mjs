import mongoose from 'mongoose';

const chatEntrySchema = new mongoose.Schema({
    user: String,
    mentor: String
});

const userChatSchema = new mongoose.Schema({
    userID: String,
    chat: [chatEntrySchema]
});

const chatHistorySchema = new mongoose.Schema({
    chats: [userChatSchema]
});

const chatHistory = mongoose.model('chatHistory', chatHistorySchema);

export default chatHistory;
