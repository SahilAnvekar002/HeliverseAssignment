import connectToMongo from "@/middleware/connectToMongo";
import User from "@/models/User";

const handler = async (req, {params}) => {
    try {
        const slug = params.slug
        const students = await User.find({designation : 'Student', classId : slug});

        return new Response(JSON.stringify({ students }), {
            status: 200   
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error. Please try again." }), {
            status: 500   
        });
    }
}

export const GET = connectToMongo(handler);