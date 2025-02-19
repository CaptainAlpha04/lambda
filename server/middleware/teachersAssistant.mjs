import { GoogleGenerativeAI } from '@google/generative-ai';
import { safetySettings } from '../gobal/settings.mjs';
import dotenv from 'dotenv';
import chatHistory from '../model/chatHistory.mjs';
import { unHashChats } from '../security/hashFunctions.mjs';
import { saveChatHistory } from '../controller/mentorLogic.mjs';
dotenv.config();

class Mentor {
    constructor() {
        this.ActorSystemInstructs = `You are Neo. ${process.env.MENTOR_SYSTEM_INSTRUCTS}.`; 
        this.chat = null;
    }

    async chatWithMentor(chatMessage, userID) {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        await this.sleep(10000);  // Ensuring a delay

        if (!this.chat) {
            const chatHistory = await this.loadChatHistory(userID);
            const model = genAI.getGenerativeModel({
                model: 'gemini-1.5-pro',
                systemInstruction: this.ActorSystemInstructs,
                safetySettings,
            });
            this.chat = model.startChat({
                history: chatHistory,
            })
        }

        const prompt = chatMessage || `"Start the conversation"`;

        try {
            const result = await this.retryWithBackoff(async () => {
                return await this.chat.sendMessage(prompt);
            });
            
            const response = result.response.text();
            await saveChatHistory(userID, prompt, response);
            return response;

        } catch (error) {
            console.error('Failed to get response:', error);
            return 'Looks like I am having a bad day. Can we try again later?';
        }
    }

//
    async loadChatHistory(userID) {
    try {
        // Find the chat document
        const chatDoc = await chatHistory.findOne();

        if (!chatDoc) {
            return [];
        }

        // Find the user's chat history within the document
        const userChatHistory = chatDoc.chats.find(chat => chat.userID === userID);

        if (userChatHistory && userChatHistory.chat) {
            const decryptedChat = await Promise.all(userChatHistory.chat.map(async (entry) => {
                const userText = await unHashChats(entry.user);
                const mentorText = await unHashChats(entry.mentor);
                return [
                    { role: 'user', parts: [{ text: userText }] },
                    { role: 'model', parts: [{ text: mentorText }] }
                ];
            }));

            // Flatten the nested arrays
            return decryptedChat.flat();
        }
        
        return [];
    } catch (error) {
        console.error('Failed to load chat history:', error);
        return [];
    }
}

// API timeout and retry logic
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async retryWithBackoff(fn, retries = 5, delay = 1000) {
        let attempt = 0;
        while (attempt < retries) {
            try {
                return await fn();
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    attempt++;
                    const backoffDelay = delay * Math.pow(2, attempt);
                    console.warn(`Retrying after ${backoffDelay}ms due to rate limiting...`);
                    await this.sleep(backoffDelay);
                } else {
                    throw error;
                }
            }
        }
        throw new Error('Max retries reached');
    }
}

export default Mentor;
