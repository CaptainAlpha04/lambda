import pdf2md from "pdf2md";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const file = body.file; // Base64 string

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Convert Base64 to Buffer
        try {
            const buffer = Buffer.from(file, "base64");
            
            // Debug info
            console.log(`Buffer created with length: ${buffer.length}`);
            
            // Convert PDF to Markdown
            const markdown = await pdf2md(buffer);
            console.log(markdown)            
            return NextResponse.json({ markdown });
        } catch (conversionError) {
            console.error('Specific conversion error:', conversionError);
            return NextResponse.json(
                { error: "Conversion failed", details: conversionError.message },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Request processing error:', error);
        return NextResponse.json(
            { error: "Request processing failed", details: error.message },
            { status: 500 }
        );
    }
}