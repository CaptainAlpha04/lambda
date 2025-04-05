import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { cleanAndParseJSON } from '../../utils/utils';

const gentAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Function to convert form data to personalized narrative
function createPersonalizedInfo(formData) {
  if (!formData) return '';
  
  // Education section
  let education = '';
  if (formData.education?.grade) {
    education += `I am currently in ${formData.education.grade}`;
    if (formData.education.major) {
      education += ` and majoring in ${formData.education.major}`;
    }
    education += '. ';
  }
  
  if (formData.education?.subjects?.length > 0) {
    education += `My favorite subjects are ${formData.education.subjects.join(', ')}. `;
  }
  
  if (formData.education?.gpa) {
    education += `My GPA is in the ${formData.education.gpa} range. `;
  }
  
  // Interests section
  let interests = '';
  if (formData.interests?.hobbies?.length > 0) {
    interests += `In my free time, I enjoy ${formData.interests.hobbies.join(', ')}. `;
  }
  
  if (formData.interests?.strengths?.length > 0) {
    interests += `I believe my strengths are ${formData.interests.strengths.join(', ')}. `;
  }
  
  const experienceLevels = ['no', 'minimal', 'some', 'moderate', 'considerable', 'extensive'];
  if (formData.interests?.experience > 0) {
    const experienceLevel = experienceLevels[Math.min(5, formData.interests.experience)];
    interests += `I have ${experienceLevel} work experience. `;
  }
  
  // Personality section
  let personality = '';
  if (formData.personality?.workStyles?.length > 0) {
    personality += `My preferred work style is ${formData.personality.workStyles.join(', ')}. `;
  }
  
  if (formData.personality?.preferWorkingWith) {
    personality += `I prefer working ${formData.personality.preferWorkingWith}. `;
  }
  
  if (formData.personality?.approachToChallenges) {
    personality += `When facing challenges, I typically ${formData.personality.approachToChallenges}. `;
  }
  
  if (formData.personality?.environment) {
    personality += `I thrive in ${formData.personality.environment} environments. `;
  }
  
  // Preferences section
  let preferences = '';
  if (formData.preferences?.careerImportance?.length > 0) {
    preferences += `In my career, I value ${formData.preferences.careerImportance.join(', ')}. `;
  }
  
  if (formData.preferences?.workLocation) {
    preferences += `I prefer to work ${formData.preferences.workLocation}. `;
  }
  
  if (formData.preferences?.travelPreference) {
    preferences += `Regarding travel for work, I ${formData.preferences.travelPreference}. `;
  }
  
  // Goals section
  let goals = '';
  if (formData.goals?.careerFields?.length > 0) {
    goals += `I'm interested in exploring careers in ${formData.goals.careerFields.join(', ')}. `;
  }
  
  if (formData.goals?.learningStyle) {
    goals += `I learn best through ${formData.goals.learningStyle}. `;
  }
  
  if (formData.goals?.challenges) {
    goals += `Some challenges I'm concerned about in my career path are ${formData.goals.challenges}. `;
  }
  
  if (formData.goals?.additionalInfo) {
    goals += `Additional information about my career goals: ${formData.goals.additionalInfo}`;
  }
  
  // Combine all sections
  return `${education}${interests}${personality}${preferences}${goals}`.trim();
}

export async function POST(request) {
    const { career, data } = await request.json();
    
    try {
        const model = gentAI.getGenerativeModel({
            model: 'gemini-2.0-flash-exp',
            systemInstruction: process.env.CAREER_ROADMAP_SYSTEM_INSTRUCTIONS,
            generationConfig: {
                responseMimeType: 'application/json',
            },
        });

        // generate career roadmap based on input type
        let result;
        
        if (career || !data) {
            // For generalized career search
            result = await model.generateContent("Generalized Career:" + career);
        } else {
            // Convert form data to personalized narrative
            const personalizedInfo = createPersonalizedInfo(data);
            console.log("Personalized info:", personalizedInfo);
            
            // Send the personalized narrative to the API
            result = await model.generateContent(
                "Personalized Data about the student. Generate a personalized career path based on the given information: " + 
                personalizedInfo
            );
        }
        
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