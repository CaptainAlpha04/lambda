import fs from 'fs';
import path from 'path';
import os from 'os';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { safetySettings } from '../global/settings.mjs';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { cleanJSON } from '../lib/jsonCleaner.mjs';
import dotenv from 'dotenv';
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
            this.getChapters(uploadFile);


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

    async getChapters(uploadedFile) {
        // Get chapters from notes
        const chaptersArray = [];

        const chapterResponse = await this.chat.sendMessage([
            {
                fileData: {
                    fileUri: "https://generativelanguage.googleapis.com/v1beta/files/dz5034shnkp7" || uploadedFile.file.uri,
                    mimeType: "application/pdf" || uploadedFile.file.mimeType
                },
            },
            'List all the chapter names from notes strictly in JSON format'
        ]);

        const chapterText = chapterResponse.response.text();

        const cleanedJSON = cleanJSON(chapterText);
        if (Array.isArray(cleanedJSON.chapters)) {
            chaptersArray.push(...cleanedJSON);
        } else {
            console.error("cleanedJSON is not an array:", cleanedJSON);
        }
        console.log(chaptersArray);
        return chaptersArray;
    }
}

export default generateNotesClass;