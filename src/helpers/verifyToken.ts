import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function verifyToken(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            console.log("Token Not verified!!!");
            return null;
        }
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken;
    } catch (error:any) {
        console.error("Token verification failed:", error.message);
        return null;
    }
}
