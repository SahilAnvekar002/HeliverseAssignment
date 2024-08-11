import connectToMongo from "@/middleware/connectToMongo";
import User from "@/models/User";
import CryptoJS from "crypto-js";

const handler = async (req) => {
    try {
        const { fname, lname, username, email, password, designation } = await req.json();
        
        const existingUser = await User.findOne({email: email});
        
        if(existingUser){
            return new Response(JSON.stringify({ error: 'User with this email already exists' }), {
                status: 400   
            });
        }

        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_SECRET_KEY).toString();

        let user = new User({ fname, lname, username, email, password: encryptedPassword, designation });
        
        await user.save();

        return new Response(JSON.stringify({ success: 'User has been created successfully' }), {
            status: 200   
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid Input. Please try again!" }), {
            status: 400   
        });
    }
}

export const POST = connectToMongo(handler);