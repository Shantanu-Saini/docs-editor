import { verifyToken } from "@/helpers/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import UserModel from "@/models/user.model";

connect();

export async function GET(request: NextRequest) {
    try {
        const user = await verifyToken(request);
        const userId = user.id;
        console.log("userId", userId);
        const userInfo = await UserModel.findById(userId);
        console.log("User information : ", userInfo);

        return NextResponse.json(
            {
                massage: "user info found",
                userInfo: userInfo
            }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching User data" },
            {status: 500}
        )
    }
}