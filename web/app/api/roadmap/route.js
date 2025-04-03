import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { cleanAndParseJSON } from '../../utils/utils';

const gentAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(request) {
    const { career } = await request.json();
    
    try {
        const model = gentAI.getGenerativeModel({
            model: 'gemini-2.0-flash-exp',
            systemInstruction: process.env.CAREER_ROADMAP_SYSTEM_INSTRUCTIONS,
            generationConfig: {
                responseMimeType: 'application/json',
            },
        });
    
        const result = await model.generateContent("Generalized Career:" + career);
        const rawText = result.response.text();
        
        try {
            // Use our utility function to clean and parse the JSON
            const parsedData = cleanAndParseJSON(rawText);
            return NextResponse.json(parsedData, { status: 200 });
        } catch (parseError) {
            console.error('JSON parsing error:', parseError);
            return NextResponse.json({ 
                error: 'Failed to parse response as JSON',
                rawResponse: rawText
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Gemini API error:', error);
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }
}