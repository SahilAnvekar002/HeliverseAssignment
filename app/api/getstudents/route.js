import connectToMongo from "@/middleware/connectToMongo";
import User from "@/models/User";

const handler = async (req) => {
    try {
        let students = await User.find({designation: 'Student'});

        return new Response(JSON.stringify({ students }), {
            status: 200   
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error. Please try again later." }), {
            status: 500   
        });
    }
}

export const GET = connectToMongo(handler);