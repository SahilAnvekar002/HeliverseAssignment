import connectToMongo from "@/middleware/connectToMongo";
import User from "@/models/User";

const handler = async (req) => {
    try {
        const { id } = await req.json();
        
        const existingUser = await User.findById(id);
        
        if(!existingUser){
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 400   
            });
        }

        await User.findByIdAndDelete(id);

        return new Response(JSON.stringify({ success: 'User has been deleted successfully' }), {
            status: 200   
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid Input. Please try again!" }), {
            status: 400   
        });
    }
}

export const DELETE = connectToMongo(handler);