import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function generateDefinition(query) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = `Provide a concise, classroom-appropriate definition for: ${query}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new Error("Failed to generate definition");
  }
}

export async function generateResponse(prompt){
  try {
    // For text-only input
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json", // Enforce JSON response
        temperature: 0.5 // Adjust for creativity vs accuracy
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Clean the response text (remove markdown formatting)
    const text = response.text()
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    return text;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate response');
  }
}