import { connect } from "@/dbconfig/dbConfig";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email, password } = reqBody;

        // if user already exist
        const isExistingUser = await UserModel.findOne({ email });
        if (isExistingUser) {
            return NextResponse.json(
                { message: "User already exist" },
                { status: 400 }
            )
        }

        // check password length
        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters" },
                { status: 400 }
            )
        }

        // encrypt user password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json(
            { message: "Account created successfully" },
            { status: 201 }
        )
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}