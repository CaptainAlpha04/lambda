import multer from 'multer';
import generateNotesClass from "../middleware/contentGenerator.mjs"; 

const upload = multer({ storage: multer.memoryStorage() }); // Store in memory or use diskStorage for actual files

const generateNotes = (app) => {
    app.post('/admin/content/generateNotes', upload.single('book'), async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log("File received:", req.file.originalname);
        console.log("File type:", req.file.mimetype);

        // Pass the file buffer or path to your class
        const generator = new generateNotesClass(req.file);

        res.json({ message: "File processed successfully", file: req.file.originalname });
    });
}

export default generateNotes;
