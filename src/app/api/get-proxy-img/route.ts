import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
    try {
        const imageUrl = request.nextUrl.searchParams.get('imageUrl');
        if (!imageUrl) {
            return NextResponse.json({ error: 'No image URL provided' }, { status: 400 });
        }

        // Fetch image from URL
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer' // response data is treated as binary data
        });

        // Converting image buffer to a base64 string
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');

        // Determine the type of the image (e.g., 'image/jpeg', 'image/png')
        const contentType = response.headers['content-type'];

        const dataUrl = `data:${contentType};base64,${base64Image}`;

        return NextResponse.json({ data_url: dataUrl }, { status: 200 });

    } catch (error) {
        console.error('Error fetching and converting image:', error);
        return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 });
    }
}
