import chatHistory from "../model/chatHistory.mjs";
import { hashChats } from "../security/hashFunctions.mjs";
import Mentor from "../middleware/mentor.mjs";

// Loading mentor class
export async function loadMentor() {
    try {
        const mentor = new Mentor();
        return mentor;
    } catch (error) {
        console.error('Error loading mentor:', error);
        return null;
    }
}

// Method to save Chat History with mentor
export async function saveChatHistory(userID, userMessage, mentorMessage) {
    try {
        // Find the chat document
        let chatDoc = await chatHistory.findOne();

        // If no chat document exists, create one
        if (!chatDoc) {
            chatDoc = new chatHistory({ chats: [] });
        }

        // Find the user's chat history within the document
        let userChatHistory = chatDoc.chats.find(chat => chat.userID === userID);

        // If no chat history is found for the user, create a new one
        if (!userChatHistory) {
            userChatHistory = { userID: userID, chat: [] };
            chatDoc.chats.push(userChatHistory);
        }

        // Hash the messages
        const userMessageHash = await hashChats(userMessage);
        const mentorMessageHash = await hashChats(mentorMessage);

        // Add the new chat entry to the user's chat history
        userChatHistory.chat.push({ user: userMessageHash, mentor: mentorMessageHash });

        // Save the updated chat document to the database
        await chatDoc.save();
        console.log('Chat history updated for', userID);
    } catch (error) {
        console.error('Failed to save chat history:', error);
    }
}