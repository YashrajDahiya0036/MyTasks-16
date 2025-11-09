import {NextRequest, NextResponse} from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import connectDB from "@/lib/mongodb";
import Event from '@/database/event.model';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        let event;

        try {
            event = Object.fromEntries(formData.entries());
        } catch (e) {
            return NextResponse.json({ message: 'Invalid JSON data format'}, { status: 400 })
        }

        const file = formData.get('image') as File;

        if(!file) return NextResponse.json({ message: 'Image file is required'}, { status: 400 })

        const tags = JSON.parse(formData.get('tags') as string);
        const agenda = JSON.parse(formData.get('agenda') as string);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvent' }, (error, results) => {
                if(error) return reject(error);
                resolve(results);
            }).end(buffer);
        });

        event.image = (uploadResult as { secure_url: string }).secure_url;

        const createdEvent = await Event.create({
            ...event,
            tags: tags,
            agenda: agenda,
        });

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Event Creation Failed', error: e instanceof Error ? e.message : 'Unknown'}, { status: 500 })
    }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Connect to database
    await connectDB();

    // Query all events
    const events = await Event.find({}).lean();

    // Return successful response
    return NextResponse.json(
      { message: 'Events fetched successfully', events },
      { status: 200 }
    );
  } catch (error) {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching events:', error);
    }

    return NextResponse.json(
      { message: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
