// Required Modules
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import generateNotes from './routes/generateNotes.mjs';

// Required Files
import mentorRoute from './routes/mentor.mjs';

// Configuration
dotenv.config();

// Global Variable Declaration
const app = express();
const port = process.env.PORT || 3000;

/* Default Middlewares */
app.use(express.json());
// Connecting to MongoDB database
mongoose.connect(process.env.MONGODB_URI)
.then(() => { console.log('Connected to MongoDB'); })
.catch((err) => console.log(err));

/* Routes */
mentorRoute(app);
generateNotes(app);
/*Activating Server*/
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})