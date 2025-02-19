import { loadMentor } from '../controller/mentorLogic.mjs';

// Routes for managing mentor chat functionalities
const mentorRoute = (app) => {

    // Standard Chat Route
    app.post('/mentor/chat/:userID', async (req, res) => {
        // Loading the user ID and prompt from the request
        const { userID } = req.params;
        const { prompt } = req.body;
        // Loading Logical Methods
        const mentor = await loadMentor();
        // Chatting with the mentor
        const result = await mentor.chatWithMentor(prompt, userID);
        // Sending the response
        res.send(result);
    })
}

export default mentorRoute;