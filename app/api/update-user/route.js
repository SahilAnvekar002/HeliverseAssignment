import connectToMongo from "@/middleware/connectToMongo";
import User from "@/models/User";
import CryptoJS from "crypto-js";

const handler = async (req) => {
    try {
        const { id, fname, lname, username, email, password } = await req.json();
        
        const existingUser = await User.findOne({_id: id});
        
        if(!existingUser){
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404   
            });
        }

        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_SECRET_KEY).toString();

        await User.findByIdAndUpdate(id, {fname, lname, username, email, password: encryptedPassword})
        const updatedUser = await User.findById(id);

        return new Response(JSON.stringify({ success: 'User has been updated successfully', user: updatedUser}), {
            status: 200   
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid Input. Please try again!" }), {
            status: 400   
        });
    }
}

export const POST = connectToMongo(handler);