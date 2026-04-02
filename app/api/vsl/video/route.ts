import { NextResponse } from "next/server";

export async function GET() {
    const videoUrl = process.env.VSL_VIDEO_URL;

    if (!videoUrl) {
        return new NextResponse("Video URL not configured", { status: 500 });
    }

    try {
        const response = await fetch(videoUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch video: ${response.statusText}`);
        }

        // Create a readable stream from the response body
        const stream = response.body;

        return new NextResponse(stream, {
            headers: {
                "Content-Type": response.headers.get("Content-Type") || "video/mp4",
                "Cache-Control": "public, max-age=3600",
                "X-Content-Type-Options": "nosniff",
            },
        });
    } catch (error) {
        console.error("Error streaming video:", error);
        return new NextResponse("Error streaming video", { status: 500 });
    }
}
