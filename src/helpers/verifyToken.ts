import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function verifyToken(request: NextRequest){
    try {
        const token = request.cookies.get('token')?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken;
    } catch (error) {
        return NextResponse.json(
            { message: "Invalid token" },
            { status: 401 }
        )
    }
}