import { connect } from "@/dbconfig/dbConfig";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        const user = await UserModel.findOne({ email });

        // no email matched in db
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            )
        }

        // if email found then check password
        const isValidPassword = await bcryptjs.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            )
        }

        // generate user token
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        })

        const resp = NextResponse.json({
            message: "Login succesful",
            success: true
        })

        resp.cookies.set("token", token, {httpOnly: true})
        return resp;
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}