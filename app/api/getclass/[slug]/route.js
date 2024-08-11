import connectToMongo from "@/middleware/connectToMongo";
import Class from "@/models/Class";

const handler = async (req, {params}) => {
    try {
        const slug = params.slug
        const classroom = await Class.findById(slug);

        return new Response(JSON.stringify({ classroom }), {
            status: 200   
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error. Please try again." }), {
            status: 500   
        });
    }
}

export const GET = connectToMongo(handler);