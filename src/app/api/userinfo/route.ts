import { verifyToken } from "@/helpers/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import UserModel from "@/models/user.model";

connect();

export async function GET(request: NextRequest) {
    try {
        const user = await verifyToken(request);
        if (!user) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }
        console.log("userinfo : user : ", user);

        const userId = user.id;
        if (!userId) {
            console.error("User ID not found in token");
            return NextResponse.json(
                { message: "User ID not found" },
                { status: 400 }
            );
        }
        console.log("userinfo : userId : ", userId);

        const userInfo = await UserModel.findById(userId);
        if (!userInfo) {
            console.error("User not found in database");
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        console.log("userinfo : userInfo : ", userInfo);

        return NextResponse.json(
            {
                message: "User info found",
                userInfo: userInfo
            }
        );
    } catch (error: any) {
        console.error("Error fetching user data:", error.message);
        return NextResponse.json(
            { message: "Error fetching User data" },
            { status: 500 }
        );
    }
}
