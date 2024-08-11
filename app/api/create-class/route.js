import connectToMongo from "@/middleware/connectToMongo";
import Class from "@/models/Class";

const handler = async (req) => {
    try {
        const { name, startDay, endDay, startTime, endTime } = await req.json();

        let classroom = new Class({ name, startDay, endDay, startTime, endTime });
        
        await classroom.save();

        return new Response(JSON.stringify({ success: 'Class has been created successfully' }), {
            status: 200   
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid Input. Please try again!" }), {
            status: 400   
        });
    }
}

export const POST = connectToMongo(handler);