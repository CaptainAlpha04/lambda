/**
 * Cleans and parses JSON text from Gemini API responses
 * Handles common issues like code blocks, escape characters, and double-encoded JSON
 * 
 * @param {string} text - The raw text from the Gemini API
 * @returns {Object} The parsed JSON object
 * @throws {Error} If the text cannot be parsed as JSON
 */
export function cleanAndParseJSON(text) {
    // Step 1: Remove markdown code blocks
    let cleanedText = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
    
    // Step 2: Try parsing directly
    try {
      return JSON.parse(cleanedText);
    } catch (initialError) {
      console.log("Initial JSON parsing failed, attempting additional cleaning...");
      
      // Step 3: Check if it's double-encoded (string within string)
      if (cleanedText.startsWith('"') && cleanedText.endsWith('"')) {
        try {
          // First unescape the string, then parse as JSON
          const unescapedText = JSON.parse(cleanedText);
          return JSON.parse(unescapedText);
        } catch (doubleEncodeError) {
          console.log("Double-encoded parsing failed, continuing with cleanup...");
        }
      }
      
      // Step 4: More aggressive cleaning
      cleanedText = cleanedText
        .replace(/\\n/g, ' ') // Replace newlines with spaces
        .replace(/\\"/g, '"') // Fix escaped quotes
        .replace(/\\\\/g, '\\') // Fix escaped backslashes
        .replace(/\t/g, ' ') // Replace tabs with spaces
        .replace(/\r/g, ''); // Remove carriage returns
      
      // Step 5: Fix common JSON structural issues
      // Remove trailing commas in arrays/objects which are invalid in JSON
      cleanedText = cleanedText
        .replace(/,\s*]/g, ']')
        .replace(/,\s*}/g, '}');
      
      // Step 6: Final parse attempt
      try {
        return JSON.parse(cleanedText);
      } catch (finalError) {
        // If all attempts fail, throw with details
        const error = new Error('Failed to parse JSON after cleanup');
        error.originalText = text;
        error.cleanedText = cleanedText;
        error.originalError = initialError;
        error.finalError = finalError;
        throw error;
      }
    }
  }