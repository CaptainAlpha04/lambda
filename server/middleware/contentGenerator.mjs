import fs from 'fs';
import path from 'path';
import os from 'os';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { safetySettings } from '../global/settings.mjs';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { cleanJSON, convert2Array } from '../lib/jsonfx.mjs';
import mongoose from 'mongoose';
import FlashCards from '../model/flashCard.mjs';
import MCQs from '../model/mcqSchema.mjs';
import dotenv from 'dotenv';
dotenv.config();

class generateNotesClass {
    constructor(file, grade, subject) {
        this.grade = grade;
        this.subject = subject;
        this.init(file);
        this.SystemInstructs = process.env.NOTES_GENERATOR_SYSTEM_INSTUCT;
        this.chat = null;
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-exp',
            systemInstruction: this.SystemInstructs,
            safetySettings
        });

        this.chat = model.startChat();
    }

    async init(file) {
        this.notes = file.buffer;
        this.notesName = file.originalname;
        // Use OS temp directory instead of hardcoded '/tmp'
        this.filePath = path.join(os.tmpdir(), this.notesName);

        try {
            // Create temp directory if it doesn't exist
            fs.mkdirSync(path.dirname(this.filePath), { recursive: true });

            // Save file locally in temp folder
            fs.writeFileSync(this.filePath, this.notes);
            console.log(`File saved at: ${this.filePath}`);

            const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY);

            // Upload the file from local storage
            const uploadFile = await fileManager.uploadFile(this.filePath, {
                mimeType: 'application/pdf',
                displayName: this.notesName  // Fixed: was using undefined this.fileName
            });

            console.log("File uploaded successfully:", uploadFile);

            // Generate notes
            this.controller(uploadFile);

        } catch (error) {
            console.error("Error processing file:", error);
        } finally {
            try {
                // Check if file exists before attempting to delete
                if (fs.existsSync(this.filePath)) {
                    fs.unlinkSync(this.filePath);
                    console.log(`File deleted: ${this.filePath}`);
                }
            } catch (deleteError) {
                console.error("Error deleting file:", deleteError);
            }
        }
    }

    // Controls the flow of note generation
    async controller(uploadedFile) {
        // Get chapters from notes
        const chaptersArray = await this.getChapters(uploadedFile);
        const chapters = chaptersArray[0];

        for (let chapter of chapters) {

            // Get sub-chapters from notes for each chapter
            const subtopicsArray = await this.getSubChapter(uploadedFile, chapter);
            const subtopics = subtopicsArray[0];

            for (let subtopic of subtopics) {

                // Generate Notes from each topic
                const notes = await this.getNotes(uploadedFile, chapter, subtopic);
                console.log(notes);

                // Generate FlashCards from each topic
                const flashCards = await this.getFlashCards(uploadedFile, chapter, subtopic);
                console.log(flashCards);

                // Generate MCQs from each topic
                const mcqs = await this.getMCQs(uploadedFile, chapter, subtopic);
                console.log(mcqs);

                try {
                    const flashcardsToSave = flashCards.flashcards.map(card => ({
                        chapter,
                        subtopic,
                        grade: this.grade,
                        subject: this.subject,
                        ...card
                    }));
                    await FlashCards.insertMany(flashcardsToSave);
                    console.log(`Saved ${flashcardsToSave.length} flashcards for ${subtopic}`);
                } catch (err) {
                    console.error("Error saving flashcards:", err);
                }

               // Save MCQs
try {
    const mcqsToSave = mcqs.mcqs.map(mcq => ({
        chapter,
        subtopic,
        grade: this.grade,
        subject: this.subject,
        ...mcq,
        options: mcq.options.map(opt => ({
            option: opt.option,
            isCorrect: opt.isCorrect
        }))
    }));
    await MCQs.insertMany(mcqsToSave);
    console.log(`Saved ${mcqsToSave.length} MCQs for ${subtopic}`);
} catch (err) {
    console.error("Error saving MCQs:", err);
}
            }
        }
        return;
    }

    // returns and array with list of all the chapters. 
    async getChapters(uploadedFile) {
        try {
            // Request chapter list from the model
            const chapterResponse = await this.chat.sendMessage([
                {
                    fileData: {
                        fileUri: uploadedFile.file.uri,
                        mimeType: uploadedFile.file.mimeType
                    },
                },
                'List all the chapters from notes'
            ]);

            // Parse response to JSON
            const chapterText = chapterResponse.response.text();
            const parsedJSON = cleanJSON(chapterText);

            let chapterTitles = [];

            // Extract chapter titles based on response format
            if (Array.isArray(parsedJSON.chapters)) {
                chapterTitles = parsedJSON.chapters.map(item => item.chapter);
            } else if (typeof parsedJSON.chapters === 'object' && parsedJSON.chapters !== null) {
                const transformedChapters = convert2Array(parsedJSON.chapters);
                if (transformedChapters && transformedChapters.length) {
                    chapterTitles = transformedChapters.map(item => item.chapter || item.title || item);
                }
            } else {
                throw new Error("Failed to extract chapters from document");
            }

            console.log(`Extracted ${chapterTitles.length} chapters from document`);
            return [chapterTitles]; // Keep existing array structure for compatibility
        } catch (error) {
            console.error("Error extracting chapters:", error);
            return [];
        }
    }

    // returns and array with list of all the sub chapters.
    async getSubChapter(uploadedFile, chapter) {

        try {
            // Request sub-chapter list from the model
            const subChapterResponse = await this.chat.sendMessage([
                {
                    fileData: {
                        fileUri: uploadedFile.file.uri,
                        mimeType: uploadedFile.file.mimeType
                    },
                },
                `List the sub-topics or headings (if any) from the chapter: ${chapter}, otherwise return empty array`
            ]);

            // Parse response to JSON
            const subChapterText = subChapterResponse.response.text();
            const parsedJSON = cleanJSON(subChapterText);
            console.log(parsedJSON)

            let subChapterTitles = [];

            // Extract sub-chapter titles based on response format
            if (Array.isArray(parsedJSON.subtopics)) {
                subChapterTitles = parsedJSON.subtopics.map(item => item.subtopic);
            } else if (typeof parsedJSON.subtopics === 'object' && parsedJSON.subtopics !== null) {
                const transformedsubtopics = convert2Array(parsedJSON.subtopics);
                if (transformedsubtopics && transformedsubtopics.length) {
                    subChapterTitles = transformedsubtopics.map(item => item.subChapter || item.title || item || item.subtopic);
                }
            } else {
                throw new Error("Failed to extract sub-chapters from document");
            }

            console.log(`Extracted ${subChapterTitles.length} sub-chapters from document`);
            return [subChapterTitles]; // Keep existing array structure for compatibility
        } catch (error) {
            console.error("Error extracting sub-chapters:", error);
            return [];
        }
    }

    // Generate notes from the content
    async getNotes(uploadedFile, chapter, subtopic) {
        try {
            const notesResponse = await this.chat.sendMessage([
                {
                    fileData: {
                        fileUri: uploadedFile.file.uri,
                        mimeType: uploadedFile.file.mimeType
                    },
                },
                `Generate extensive notes of each every topic discussed with in with examples and additional details for the sub-topic: ${subtopic}, from the chapter: ${chapter}.
                Make the notes long, effective, informative, and engaging with proper examples, analogeis etc where applicable. Make the notes based on Bloom Taxonmony and CLOs and PLOs. 
                Return in JSON format with a "topic" field and a "notes" array containing objects with "title" and "content" fields.`
            ]);

            const notesText = notesResponse.response.text();
            const parsedJSON = cleanJSON(notesText);
            let formattedNotes = [];

            if (Array.isArray(parsedJSON.notes)) {
                formattedNotes = parsedJSON.notes.map(note => ({
                    title: note.title || subtopic,
                    content: note.content || note.text || note
                }));
            } else if (typeof parsedJSON.notes === 'object' && parsedJSON.notes !== null) {
                const transformedNotes = convert2Array(parsedJSON.notes);
                formattedNotes = transformedNotes.map(note => ({
                    title: note.title || subtopic,
                    content: note.content || note.text || note
                }));
            } else if (Array.isArray(parsedJSON)) {
                formattedNotes = parsedJSON.map(note => ({
                    title: note.title || subtopic,
                    content: note.content || note.text || note
                }));
            } else {
                formattedNotes = [{
                    title: subtopic,
                    content: parsedJSON.content || parsedJSON.text || JSON.stringify(parsedJSON)
                }];
            }

            formattedNotes = formattedNotes.filter(note => note && note.content);

            if (formattedNotes.length === 0) {
                throw new Error("Failed to extract properly formatted notes");
            }

            console.log(`Extracted ${formattedNotes.length} notes for "${subtopic}" from chapter "${chapter}"`);

            if (formattedNotes[0]) {
                console.log(`First note title: "${formattedNotes[0].title}"`);
                console.log(`First note content preview: "${formattedNotes[0].content}"`);
            }

            return {
                topic: parsedJSON.topic || chapter,
                notes: formattedNotes
            };
        } catch (error) {
            console.error(`Error extracting notes for "${subtopic}":`, error);
            return {
                topic: subtopic,
                notes: []
            };
        }
    }

    async getFlashCards(uploadedFile, chapter, subtopic) {
        try {
            const notesResponse = await this.chat.sendMessage([
                {
                    fileData: {
                        fileUri: uploadedFile.file.uri,
                        mimeType: uploadedFile.file.mimeType
                    },
                },
                `Generate 30 flash cards with hints for the sub-topic: ${subtopic}, from the chapter: ${chapter}. 
                The Flash Cards must be tricky, engaging, and informative. Return in JSON format with a "topic" field and a "flashcards" array containing objects with "question", "answer", and "hint" fields.`
            ]);

            const notesText = notesResponse.response.text();
            const parsedJSON = cleanJSON(notesText);
            console.log(parsedJSON);
            let formattedFlashCards = [];

            if (Array.isArray(parsedJSON.flashcards)) {
                formattedFlashCards = parsedJSON.flashcards.map(fcard => ({
                    question: fcard.question || fcard.problem || fcard.title,
                    answer: fcard.answer || fcard.solution || fcard.text,
                    hint: fcard.hint || fcard.clue || fcard.hints
                }));

            } else if (typeof parsedJSON.flashcards === 'object' && parsedJSON.flashcards !== null) {
                const transformedFlashCards = convert2Array(parsedJSON.flashcards);
                formattedFlashCards = transformedFlashCards.map(fcard => ({
                    question: fcard.question || fcard.problem || fcard.title,
                    answer: fcard.answer || fcard.solution || fcard.text,
                    hint: fcard.hint || fcard.clue || fcard.hints
                }));

            } else if (Array.isArray(parsedJSON)) {
                formattedFlashCards = parsedJSON.map(fcard => ({
                    question: fcard.question || fcard.problem || fcard.title,
                    answer: fcard.answer || fcard.solution || fcard.text,
                    hint: fcard.hint || fcard.clue || fcard.hints
                }));

            } else {
                formattedFlashCards = [{
                    question: parsedJSON.question || parsedJSON.problem || parsedJSON.title,
                    answer: parsedJSON.answer || parsedJSON.solution || parsedJSON.text,
                    hint: parsedJSON.hint || parsedJSON.clue || parsedJSON.hints
                }];
            }

            formattedFlashCards = formattedFlashCards.filter(fcard => fcard && fcard.question && fcard.answer);

            if (formattedFlashCards.length === 0) {
                throw new Error("Failed to extract properly Formatted FlashCards");
            }

            console.log(`Extracted ${formattedFlashCards.length} flash cards for "${subtopic}" from chapter "${chapter}"`);

            if (formattedFlashCards[0]) {
                console.log(`First flash Card question: "${formattedFlashCards[0].question}"`);
                console.log(`First flash Card answer preview: "${formattedFlashCards[0].answer}"`);
                console.log(`First flash Card hint: "${formattedFlashCards[0].hint}"`);
            }

            return {
                topic: subtopic || chapter,
                flashcards: formattedFlashCards
            };
        } catch (error) {
            console.error(`Error extracting flashCards for "${subtopic}":`, error);
            return {
                topic: subtopic,
                flashcards: []
            };
        }
    }

    async getMCQs(uploadedFile, chapter, subtopic) { 
        try {
            // Request MCQs from the AI model
            const mcqResponse = await this.chat.sendMessage([
                {
                    fileData: {
                        fileUri: uploadedFile.file.uri,
                        mimeType: uploadedFile.file.mimeType
                    },
                },
                `Generate multiple-choice questions (MCQs) for the sub-topic: ${subtopic}, from the chapter: ${chapter}. 
                Include 5-10 well-formed MCQs with 4 options each, varying in difficulty based on bloom taxonomy.
                Return in JSON format with a "topic" field and an "mcqs" array containing objects with 
                "question", "options" (as an array of strings), and "correct_option" fields. make the MCQs tricky, engaging that test the understanding and critical analysis of the topic.`
            ]);
    
            // Parse and process the response
            const parsedJSON = cleanJSON(mcqResponse.response.text());
            let formattedMCQs = [];
    
            // Extract MCQs from different possible response structures
            if (parsedJSON.mcqs && Array.isArray(parsedJSON.mcqs)) {
                formattedMCQs = parsedJSON.mcqs.map(mcq => ({
                    question: mcq.question,
                    options: mcq.options.map(option => ({
                        option,  // option text
                        isCorrect: option === mcq.correct_option  // mark as correct based on comparison
                    })),
                    correct_option: mcq.correct_option
                }));
            } else if (typeof parsedJSON.mcqs === 'object' && parsedJSON.mcqs !== null) {
                const transformedMCQs = convert2Array(parsedJSON.mcqs);
                if (transformedMCQs?.length) {
                    formattedMCQs = transformedMCQs.map(mcq => ({
                        question: mcq.question,
                        options: mcq.options.map(option => ({
                            option,  // option text
                            isCorrect: option === mcq.correct_option  // mark as correct based on comparison
                        })),
                        correct_option: mcq.correct_option
                    }));
                }
            } else if (Array.isArray(parsedJSON)) {
                formattedMCQs = parsedJSON.map(mcq => ({
                    question: mcq.question,
                    options: mcq.options.map(option => ({
                        option,  // option text
                        isCorrect: option === mcq.correct_option  // mark as correct based on comparison
                    })),
                    correct_option: mcq.correct_option
                }));
            } else if (parsedJSON.questions && Array.isArray(parsedJSON.questions)) {
                formattedMCQs = parsedJSON.questions.map(mcq => ({
                    question: mcq.question,
                    options: mcq.options.map(option => ({
                        option,  // option text
                        isCorrect: option === mcq.correct_option || option === mcq.answer  // mark correct option based on answer field
                    })),
                    correct_option: mcq.correct_option || mcq.answer
                }));
            }
    
            // Validate MCQs
            formattedMCQs = formattedMCQs.filter(mcq =>
                mcq?.question &&
                Array.isArray(mcq.options) &&
                mcq.options.length > 1 &&
                mcq.correct_option
            );
    
            if (!formattedMCQs.length) {
                throw new Error("No valid MCQs generated");
            }
    
            console.log(`Generated ${formattedMCQs.length} MCQs for "${subtopic}" in "${chapter}"`);
    
            return {
                topic: parsedJSON.topic || subtopic,
                mcqs: formattedMCQs
            };
        } catch (error) {
            console.error(`Error generating MCQs for "${subtopic}":`, error);
            return {
                topic: subtopic,
                mcqs: []
            };
        }
    }
    

}


export default generateNotesClass;