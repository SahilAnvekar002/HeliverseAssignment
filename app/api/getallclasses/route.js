import connectToMongo from "@/middleware/connectToMongo";
import Class from "@/models/Class";

const handler = async (req) => {
    try {

        const classes = await Class.find({});

        return new Response(JSON.stringify({ classes }), {
            status: 200,
            headers: {
                'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error. Please try again." }), {
            status: 500
        });
    }
}

export const GET = connectToMongo(handler);