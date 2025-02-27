import fs from 'fs';
import path, { parse } from 'path';
import os from 'os';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { safetySettings } from '../global/settings.mjs';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { cleanJSON, convert2Array } from '../lib/jsonfx.mjs';
import dotenv from 'dotenv';
import { checkPrime } from 'crypto';
dotenv.config();

class generateNotesClass {
    constructor(file) {
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

        return;
    }

    async getChapters(uploadedFile) {
        // Get chapters from notes
        const chaptersArray = [];

        const chapterResponse = await this.chat.sendMessage([
            {
                fileData: {
                    fileUri:  uploadedFile.file.uri,
                    mimeType: uploadedFile.file.mimeType
                },
            },
            'List all the chapter names from notes with key as Unit 1. Unit 2 etc'
        ]);
            
        // convert chapterResponse to JSON
        const chapterText = chapterResponse.response.text();
        console.log(chapterText);
        const parsedJSON = cleanJSON(chapterText);
        console.log(parsedJSON);
        
        const totalChapters = Object.keys(parsedJSON.chapters).length;
        console.log(`Total number of chapters: ${totalChapters}`);
        console.log(parsedJSON.chapters['Unit 1'] || parsedJSON.chapters['Chapter 1'])

        // Transform the chapters array into a cleaner Array format
        if (parsedJSON && parsedJSON.chapters) {
            const transformedChapters = convert2Array(parsedJSON.chapters);
            if (transformedChapters) {
                chaptersArray.push({ chapters: transformedChapters });
            }
        } else {
            console.error("Invalid JSON structure:", parsedJSON);
        }
        
        console.log(chaptersArray);
        return chaptersArray
    }
}

export default generateNotesClass;