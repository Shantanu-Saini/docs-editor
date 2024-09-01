import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const resp =  NextResponse.json(
            { message: "Logout Success!!" },
            { status: 200 }
        )

        resp.cookies.set("token",  "",
            {
                httpOnly: true,
                expires : new Date()
            }
        )
        return resp;

    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}