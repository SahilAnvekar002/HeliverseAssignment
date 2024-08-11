import connectToMongo from "@/middleware/connectToMongo";
import User from "@/models/User";
import CryptoJS from "crypto-js";

const handler = async (req) => {
    try {
        const { email, password } = await req.json();
        
        const user = await User.findOne({email: email});
        
        if(!user){
            return new Response(JSON.stringify({ error: 'Invalid credentials1' }), {
                status: 400   
            });
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.NEXT_PUBLIC_SECRET_KEY);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if(password != decryptedPassword){
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
                status: 400   
            });
        }

        return new Response(JSON.stringify({ success: 'Logged into account successfully', user: user }), {
            status: 200   
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid Input. Please try again!" }), {
            status: 400   
        });
    }
}

export const POST = connectToMongo(handler);