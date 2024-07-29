import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function chatWithMentor(name, prompt) {
    
    const systemInstructions  = `Your name is ${name}. ${process.env.SYSTEM_INSTRUCTS}`; 

    const mentor = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        systemInstructions: systemInstructions,
    })
    const chat = mentor.startChat();
    const response = await chat.sendMessage(prompt);
    console.log(response.response.text());
}

export default chatWithMentor;