import connectToMongo from "@/middleware/connectToMongo";
import Class from "@/models/Class";

const allowedOrigins = ['https://heliverse-assignment-one.vercel.app'];

const handler = async (req) => {
    try {

        // CORS handling
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // Handle preflight OPTIONS request
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        const classes = await Class.find({});

        return new Response(JSON.stringify({ classes }), {
            status: 200
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error. Please try again." }), {
            status: 500
        });
    }
}

export const GET = connectToMongo(handler);