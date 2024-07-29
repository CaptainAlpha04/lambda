// Required Modules and imports
import express from 'express';
import dotenv from 'dotenv';
import chatWithMentor from './middleware/mentor.mjs';

// Configuration
dotenv.config();

// Global Variable Declaration
const app = express();
const port = process.env.PORT || 3000;

/* Default Middlewares */
app.use(express.json());

/* Routes */
app.post('/chat', async (req, res) => {
    const { name, prompt } = req.body;
    const response = await chatWithMentor(name, prompt);
    res.send(response);
})

/*Activating Server*/
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})