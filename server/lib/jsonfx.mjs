/**
 * Cleans and parses JSON string content
 * @param {string} content - The JSON string to clean
 * @returns {Object|null} Parsed JSON object or null if invalid
 */
export function cleanJSON(content) {
    try {
        // Handle case where content is already an object
        if (typeof content === 'object') {
            return content;
        }

        // Remove any whitespace and newlines
        let cleanContent = content.trim();

        // If the content is wrapped in backticks, remove them
        cleanContent = cleanContent.replace(/^```json\s*|\s*```$/g, '');

        // Parse the cleaned content
        const parsedJSON = JSON.parse(cleanContent);

        // Optional: Transform the chapters array into a cleaner format
        if (parsedJSON.chapters) {
            const cleanChapters = parsedJSON.chapters.reduce((acc, chapter) => {
                const [unit, title] = Object.entries(chapter)[0];
                acc[unit] = title;
                return acc;
            }, {});
            
            return { chapters: cleanChapters };
        }

        return parsedJSON;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}

// converts a JSON objects to an array
export function convert2Array(objects) {
    if (!Array.isArray(objects)) {
        return null;
    }
    
    return objects.reduce((acc, object) => {
        const [key, value] = Object.entries(object)[0];
        acc[value] = key;
        return acc;
    }, {});
}
